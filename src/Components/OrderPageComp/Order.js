import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material'; // Import LinearProgress here
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import './Order.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import logo from '../ImageCom/logo.png'; // Importing the logo image
import moment from 'moment'; // Optional, for date formatting
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@mui/material/Button';
function Order() {
  const [imageData, setImageData] = useState(null);
  const [heading1, setHeading1] = useState("");
  const [text1, setText1] = useState("");
  const [heading2, setHeading2] = useState("");
  const [heading3, setHeading3] = useState("");
  const [heading4, setHeading4] = useState("");
  const [loading, setLoading] = useState(true); // New loading state
  const [startDate, setStartDate] = useState(new Date());
  const [futureDate, setFutureDate] = useState(moment().add(30, 'days').toDate());
  const handleDateChange = (date) => {
    setStartDate(date);
    setFutureDate(moment(date).add(30, 'days').toDate());
  };

  const formattedFutureDate = moment(futureDate).format('MMMM D, YYYY');
  const formattedFutureTime = moment(futureDate).format('h:mm A');

  useEffect(() => {
    axios.get('https://guesthouse-api-dje8gvcwayfdfmbr.eastus-01.azurewebsites.net/api/Contents')
      .then(response => {
        const data = response.data;

        const filteredImage = data.find(
          (item) => 
            item.contentId === 67 && 
            item.pageId === 1064 && 
            item.sectionId === 2029 && 
            item.controlId === 2
        );

        const filteredHeading1 = data.find(
          (item) => item.contentId === 68 && item.pageId === 1064 && item.sectionId === 2030 && item.controlId === 1
        );

        const filteredText1 = data.find(
          (item) => item.contentId === 69 && item.pageId === 1064 && item.sectionId === 2030 && item.controlId === 5
        );
        const filteredHeading2 = data.find(
          (item) => item.contentId === 70 && item.pageId === 1064 && item.sectionId === 2030 && item.controlId === 1
        );
        const filteredHeading3 = data.find(
          (item) => item.contentId === 71 && item.pageId === 1064 && item.sectionId === 2031 && item.controlId === 1
        );
        const filteredHeading4 = data.find(
          (item) => item.contentId === 72 && item.pageId === 1064 && item.sectionId === 2031 && item.controlId === 1
        );


        setHeading1(filteredHeading1 ? filteredHeading1.contentData : "");
        setText1(filteredText1 ? filteredText1.contentData : "");
        setHeading2(filteredHeading2 ? filteredHeading2.contentData : "");
        setHeading3(filteredHeading3 ? filteredHeading3.contentData : "");
        setHeading4(filteredHeading4 ? filteredHeading4.contentData : "");

        setImageData(filteredImage);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false); // Hide loader once the data is fetched
      });
  }, []);

  return (
    <div className='order-bg'>
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <img src={logo} alt="Logo" style={{ marginBottom: '10px', width: '110px', height: '120px' }} /> {/* Display the logo */}
           <Box sx={{ width: '110px'}}>
      <LinearProgress color="success" style={{height:'1px'}}/>
    </Box>
        </div>
      ) : (
        <>
          <Grid container className="navigation-grid" alignItems="center" justifyContent="center" spacing={2}>
          <Grid container className="navigation-grid" alignItems="center" justifyContent="center" spacing={2}>
        <Grid item xs={0}>
          <div className="nav-item" title="" tabIndex="10">Sign In</div>
        </Grid>
        <Grid item xs={0}>
          <div className="nav-item" title="Review your order" tabIndex="20">My Order $0.00</div>
        </Grid>
        <Grid item xs={0}>
          <div className="nav-item" title="Review your order" tabIndex="30">0 Item(s)</div>
        </Grid>
        <Grid item xs={0}>
          <div className="nav-item" title="Go to the checkout page" tabIndex="40">Checkout</div>
        </Grid>
        <Grid item xs={0}>
          <div className="nav-item" title="Visit the help page" tabIndex="50">Help</div>
        </Grid>
        <Grid item xs={0}>
          <div className="nav-item" title="Back to store website" tabIndex="60">Return to Store Site</div>
        </Grid>     
      </Grid>
          </Grid>

          <div className="images">
            {imageData ? (
              <div className="grids">
                <img
                  src={`data:image/jpeg;base64,${imageData.contentData}`}
                  alt={imageData.title}
                />
                <Typography>
                  <h3>{imageData.title}</h3>
                  <p>{imageData.description}</p>
                </Typography>
              </div>
            ) : (
              <Typography style={{color:'white'}}>No image available</Typography>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '2rem', maxWidth: 3465 }}>
              <Grid item xs={12}>
                <Typography variant="h4" className="heading">
                  {heading1}
                </Typography>
                <Grid item xs={12} style={{ color: 'black',marginLeft: '20px' }}>
                  <Typography variant="body1">
                    {text1}
                  </Typography>
                </Grid>
              </Grid>

              <CardActionArea>
                <CardMedia />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <Grid item xs={12}>
                      <Typography variant="h4" className="StartOrder">
                        {heading2}
                      </Typography>
                    </Grid>
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    <Grid item xs={12}>
                      <Typography variant="h5" className="" style={{textAlign:'center'}}>
                        {heading3}
                      </Typography>
                    </Grid>
                  </Typography>
                  <br></br>
                  <div style={{textAlign:'center',marginRight:'132px'}}>
                    <input type="radio" id="radio1" name="radioGroup" />
                    <label htmlFor="radio1" style={{marginLeft:'7px'}}>Carryout</label>
                  </div>
                  <br></br>
                  <Typography gutterBottom variant="h5" component="div">
                    <Grid item xs={12}>
                      <Typography variant="h5" className="" style={{textAlign:'center', marginLeft:'106px'}}>
                        {heading4}
                      </Typography>
                    </Grid>
                  </Typography>
                  <br></br>
                  <div style={{textAlign:'center',marginRight:'112px'}}>
                    <input type="radio" id="radio1" name="radioGroup" />
                    <label htmlFor="radio1" style={{marginLeft:'6px'}}>A future time</label>
                  </div>
                  <br></br>
                  <div className="card">
                  <h2 className="card-title">Select Date & Time</h2>
                  <div className="datepicker-container">
                   <DatePicker
                   selected={startDate}
                   onChange={handleDateChange}
                   showTimeSelect
                  dateFormat="Pp"
                 />
                </div>
                <div className="future-date-time">
               <p className="card-date">Future Date: {formattedFutureDate}</p>
              <p className="card-time">Future Time: {formattedFutureTime}</p>
             </div>
              </div>
              <div className='greens'>
              <Button className='buttons'>START YOUR ORDER</Button>
              </div>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

export default Order;
