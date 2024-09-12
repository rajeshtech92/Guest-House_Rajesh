import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOrder } from './OrderContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import './Cart.css';

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { menuItemName, quantity: initialQuantity, price } = location.state || {};
  const [itemQuantity, setItemQuantity] = useState(initialQuantity || 1);
  const { addToOrder } = useOrder();

  const handleQuantityChange = (e) => {
    setItemQuantity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Ordered ${itemQuantity} of ${menuItemName} at price ₹${price}`);
  };

  const handleAddToOrder = () => {
    addToOrder({ menuItemName, itemQuantity, price });
    navigate("/summary");
    console.log('Add to Order clicked');
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
  };

  return (
    <>
      <AppBar position="static" sx={{ width: '100%', marginTop: '0' }} className="bg">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
          <Button color="inherit">New Order</Button>
          <Button color="inherit">Past Order</Button>
        </Toolbar>
      </AppBar>

      <form onSubmit={handleSubmit}>
        <div className="card" style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5' }}>
          <h4>
            Selected Your Menu Item : {menuItemName ? menuItemName : 'No Menu Selected'}
          </h4>

          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {menuItemName ? (
                  <Card sx={{ marginBottom: '20px', maxWidth: '600px', margin: 'auto' }}>
                    <CardContent>
                      <Typography variant="body2" align="right">
                        Quantity: {itemQuantity} | Price: ₹{price}
                      </Typography>
                      <div id="quantityholdera">
                        <div id="quantity-holder">
                          <label id="quantity-label" htmlFor="quantity-input">
                            Quantity
                          </label>
                          <input
                            name="quantity"
                            type="number"
                            id="quantity-input"
                            value={itemQuantity}
                            onChange={handleQuantityChange}
                            min="1"
                            style={{ border: '1px solid green', width: '50px', textAlign: 'center' }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Typography variant="h6" color="textSecondary">
                    No item selected.
                  </Typography>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <ul
            className="button-holder"
            style={{
              listStyle: 'none',
              padding: 0,
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <li style={{ marginRight: '10px' }}>
              <input
                type="button"
                name="AddToCart"
                value="Add To Order"
                id="AddToCart"
                className="rounded green button"
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  borderRadius: '5px',
                  padding: '10px 20px',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                }}
                onClick={handleAddToOrder}
              />
            </li>
            <li>
              <input
                type="button"
                name="Cancel"
                value="Cancel"
                id="Cancel"
                className="rounded red button"
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '5px',
                  padding: '10px 20px',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={handleCancel}
              />
            </li>
          </ul>
        </div>
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Button variant="contained" color="primary" type="submit">
            Place Order
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Cart;
