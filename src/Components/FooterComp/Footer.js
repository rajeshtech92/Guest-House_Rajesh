import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, Modal } from '@mui/material';
import axios from 'axios';
import logo from '../ImageCom/logo.png';
import './Footer.css';
import { FooterImage } from '../ApiStore/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
function Footer() {
  const [images, setImages] = useState([]);
  const [logoImage, setLogoImage] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetching images from the API
    axios.get(FooterImage)
      .then(response => {
        // Filtering images based on contentId (e.g., contentId 17, 18, 19)
        const filteredImages = response.data.filter(image => 
          image.contentId === 20 || image.contentId === 21 || image.contentId === 22
        );
        // Filtering the logo image based on contentId
        const logo = response.data.find(image => image.contentId === 73);
        setImages(filteredImages);
        if (logo) {
          setLogoImage(`data:image/jpeg;base64,${logo.contentData}`);
        }
        setImages(filteredImages);
        console.log(response);
      })
      .catch(error => {
        console.error("There was an error fetching the images!", error);
      });
  }, []);

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <Box className="kf-footer" sx={{ padding: '70px 0 0 0' }}>
      <Grid container spacing={3} className="container" style={{ background: 'black' }}>
        
		<Grid item xs={12} sm={6} md={3}>
          <Box className="kf-logo element-anim-1 scroll-animate animate__active animate__animated" data-animate="active" sx={{ visibility: 'visible' }}>
            <a href="">
              <img src={logoImage} alt="Footer Logo" style={{ maxWidth: '70%', width: 'auto', maxHeight: '100px' }} />
            </a>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box className="kf-f-hours element-anim-1 scroll-animate animate__active animate__animated" data-animate="active" sx={{ visibility: 'visible' }}>
            <Typography variant="h5">Business hours</Typography>
            <ul>
              <li>
                Monday - Friday
                <em>LUNCH: 11 AM - 3 PM</em>
                <em>DINNER: 5 PM - 10 PM</em>
                Saturday - Sunday: 11 AM - 10 PM
              </li>
            </ul>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box className="kf-f-contact element-anim-1 scroll-animate animate__active animate__animated" data-animate="active" sx={{ visibility: 'visible' }}>
            <Typography variant="h5">Contact Us</Typography>
            <ul>
      <li>
        <em><FontAwesomeIcon icon={faLocationDot} /> Location :</em>
        2215 US-1 SOUTH, North Brunswick Township, NJ 08902
      </li>
      <li>
        <em><FontAwesomeIcon icon={faPhone} /> Phone Number :</em>
        (732) 398-9022
      </li>
    </ul>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box className="kf-f-gallery element-anim-1 scroll-animate animate__active animate__animated" data-animate="active" sx={{ visibility: 'visible' }}>
            <Typography variant="h5">Gallery</Typography>
            <ul>
              {images.map((image, index) => (
                <li key={index} onClick={() => handleOpen(image)}>
                  <img
                    className="d-block w-100"
                    style={{ objectFit: 'cover', height: '60px', width: '30px', cursor: 'pointer' }}
                    src={`data:image/jpeg;base64,${image.contentData}`} // Assuming base64 data
                    alt={image.title}
                  />
                  <Typography>
                    <h3>{image.title}</h3>
                    <p>{image.description}</p>
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>
        </Grid>
      </Grid>

      <Grid container className="container" style={{ background: 'black' }}>
        <Grid item xs={12} className="align-center">
          <Box className="kf-copyright element-anim-1 scroll-animate animate__active animate__animated" data-animate="active" sx={{ visibility: 'visible' }}>
            Copyright © 2024 Guru Palace. All Rights Reserved. | Crafted by{' '}
            <a href="" target="blank">
              ePower POS
            </a>
          </Box>
        </Grid>
      </Grid>

      <Modal open={open} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ outline: 'none', height: '500px', width: '600px' }}>
          {selectedImage && (
            <img
              src={`data:image/jpeg;base64,${selectedImage.contentData}`}
              alt={selectedImage.title}
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default Footer;
