import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import './Locationbar.css';

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function Locationbar(props) {
  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <HideOnScroll {...props}>
          <AppBar style={{ background: 'black' }}>
            <Toolbar>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <div className='Location'>
                    <span style={{ color: '#b99272' }}>
                      <i className='far fa-clock'></i> OPEN 7 DAYS :
                    </span> 
                    M-F LUNCH 11 AM - 3 PM | DINNER: 5 PM - 10 PM |<br />
                    SAT-SUN 11 AM - 10 PM
                  </div>
                </Typography>
                <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <div className='LOCATION'>
                    <span style={{ color: '#b99272' }}>
                      <i className="fas fa-map-marker-alt"></i> LOCATION :
                    </span> 
                    2215 US-1 SOUTH, NORTH BRUNSWICK TOWNSHIP, NJ
                  </div>
                </Typography>
                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                  <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    <div className='Location'>
                      <span style={{ color: '#b99272' }}>
                        <i className='far fa-clock'></i> OPEN 7 DAYS :
                      </span> 
                      M-F LUNCH 11 AM - 3 PM | DINNER: 5 PM - 10 PM |<br />
                      SAT-SUN 11 AM - 10 PM
                    </div>
                    <div className='LOCATION'>
                      <span style={{ color: '#b99272' }}>
                        <i className="fas fa-map-marker-alt"></i> LOCATION :
                      </span> 
                      2215 US-1 SOUTH, NORTH BRUNSWICK TOWNSHIP, NJ
                    </div>
                  </Typography>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar />
      </React.Fragment>
    </div>
  );
}

export default Locationbar;
