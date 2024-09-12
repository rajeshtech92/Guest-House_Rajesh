import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import './MenuOrder.css'; // Import external CSS for hover effect
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom'; 
const MenuOrder = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]); // State to store menu items from API
  const [submenuPrices, setSubmenuPrices] = useState([]); // State to store submenu prices from API
  const [rowsPerPage] = useState(5); // Pagination - number of rows per page
  const [page] = useState(0); // Current page for pagination
  const [activeLink, setActiveLink] = useState(null);
  const [menuData, setMenuData] = useState([]);

  // Fetch menu data from Menu API
  useEffect(() => {
    axios
      .get("https://guesthouse-api-dje8gvcwayfdfmbr.eastus-01.azurewebsites.net/api/Menu")
      .then((response) => {
        setMenuData(response.data);
        if (response.data.length > 0) {
          setActiveLink(response.data[0].menuId);
        }
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, []);

  useEffect(() => {
    if (activeLink) {
      // Fetch menu items
      axios
        .get("https://guesthouse-api-dje8gvcwayfdfmbr.eastus-01.azurewebsites.net/api/MenuItem")
        .then((response) => {
          const filteredItems = response.data.filter(
            (item) => item.menuId === activeLink
          );
          setMenuItems(filteredItems);
        })
        .catch((error) => {
          console.error("Error fetching menu items:", error);
        });

      // Fetch submenu prices
      axios
        .get("https://guesthouse-api-dje8gvcwayfdfmbr.eastus-01.azurewebsites.net/api/SubmenuPrice")
        .then((response) => {
          const filteredPrices = response.data.filter(
            (price) => price.menuId === activeLink
          );
          setSubmenuPrices(filteredPrices);
        })
        .catch((error) => {
          console.error("Error fetching submenu prices:", error);
        });
    }
  }, [activeLink]);

  const handleMenuItemClick = (item, priceData) => {
    console.log('Menu item clicked:', item, priceData);
    
    // Navigate to the cart page with quantity and price
    navigate("/cart", { state: { 
      menuItemName: item.menuItemName, 
      quantity: item.quantity || 1, // Default quantity is 1
      price: priceData ? priceData.price : 0 
    }});
  };
  
  return (
    <>
      {/* AppBar on top */}
      <AppBar
        position="static"
        sx={{ width: '100%', marginTop: '0' }} // Full width and top position
        className="bg" // Apply background color from CSS if needed
      >
        <Toolbar>
          {/* Categories with hover menu */}
          <Box className="category-menu">
            <Typography color="inherit" className="category-title">
              CATEGORIES
            </Typography>
            <Box className="category-dropdown">
              {/* Dynamically render menu items on hover */}
              <div className="item-name" style={{ visibility: 'visible' }}>
                {menuData.map((menu) => (
                  <a
                    key={menu.menuId}
                    href="#"
                    className={activeLink === menu.menuId ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveLink(menu.menuId);
                    }}
                  >
                    {menu.menuName}
                  </a>
                ))}
              </div>
            </Box>
          </Box>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Cart Button */}
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>

          {/* New Order Button */}
          <Button color="inherit">New Order</Button>

          {/* Past Order Button */}
          <Button color="inherit">Past Order</Button>
        </Toolbar>
      </AppBar>

      {/* Cart Section below AppBar */}
      <div className="card" style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5' }}>
        {/* Dynamically display the selected menu name */}
        <h4>
          Please Select Your MenuItem :{' '}
          {menuData.find((menu) => menu.menuId === activeLink)?.menuName || 'No Menu Selected'}
        </h4>

        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {menuItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {
                // Find the corresponding submenu price using menuItemId
                const priceData = submenuPrices.find((price) => price.menuItemId === item.menuItemId);
                return (
                  <Card
                    key={item.menuItemId}
                    sx={{ marginBottom: '20px', maxWidth: '600px', margin: 'auto' }}
                    onClick={() => handleMenuItemClick(item, priceData)} // Corrected click handler
                    style={{ cursor: 'pointer' }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {item.menuItemName}
                      </Typography>
                      <Typography variant="body2" align="right">
                        Price: ₹{priceData ? priceData.price : 'N/A'}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default MenuOrder;
