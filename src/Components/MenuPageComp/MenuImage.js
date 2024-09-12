import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderProfile from '../HeaderComp/HeaderProfile';
import Footer from '../FooterComp/Footer';
import './MenuImage.css'; // Assuming you have a separate CSS file for styling
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import logo from '../ImageCom/logo.png';

const MenuImage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetching images from the API
    axios.get('https://guesthouse-api-dje8gvcwayfdfmbr.eastus-01.azurewebsites.net/api/Contents')
      .then(response => {
        const filteredImages = response.data.filter(image => 
          image.contentId === 34 || image.contentId === 35 || image.contentId === 36
        );
        setImages(filteredImages);
        console.log(filteredImages);
      })
      .catch(error => {
        console.error("There was an error fetching the images!", error);
      })
      .finally(() => {
        setLoading(false); // Hide loader once the data is fetched
      });
  }, []);

  console.log("images", images);

  return (
    <div className="menu-image-container">
      {loading ? (
        // Show loader until the data is fully fetched
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <img src={logo} alt="Logo" style={{ marginBottom: '10px', width: '110px', height: '120px' }} /> {/* Display the logo */}
          <Box sx={{ width: '110px' }}>
            <LinearProgress color="success" style={{ height: '1px' }} />
          </Box>
        </div>
      ) : (
        // Show content only after loading is done
        <>
          <HeaderProfile />
          <span style={{color:'white'}}>other content!!</span><br />
          <span style={{color:'white'}}>other content!!</span><br />
          <span style={{color:'white'}}>other content!!</span>
          <div className="image-grid">
            {images.map((image, index) => (
              <div key={index} className="grid-image">
                <img
                  src={`data:image/jpeg;base64,${image.contentData}`}
                  alt={image.title}
                />
                <Typography component="div">
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                </Typography>
              </div>
            ))}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default MenuImage;
