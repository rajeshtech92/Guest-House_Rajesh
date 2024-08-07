import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Slider.css';

const Slider = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetching images from the API
    axios.get('https://localhost:44341/api/Contents')
      .then(response => {
        // Assuming response.data is an array of image objects
        setImages(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the images!", error);
      });
  }, []);

  return (
    <div className="slider-container" style={{ padding: 0, margin: 0 }}>
      <Carousel>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              style={{ objectFit: 'cover', height: '550px' }}
              src={`data:image/jpeg;base64,${image.contentData}`} // Assuming base64 data
              alt={image.title}
            />
            <Carousel.Caption>
              <h3>{image.title}</h3>
              <p>{image.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
