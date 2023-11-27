
import React,{useContext,useNavigate} from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './NavBar.css';
//import DataContext from '../Reducer/DataContext';

const NavBar = ({ isLoggedIn, isAdmin, handleLogout }) => {
  //const { state } = useContext(DataContext);
  //const {state ,dispatch } = useContext(DataContext);
  // const navigate=useNavigate();
  //  const handleLogout=()=>{
  //   navigate('/');
  //  }
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <ShoppingCartIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          upGrad Eshop
        </Typography>

        {isLoggedIn ? (
          <>
            <input type="text" placeholder="Search" />
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            {isAdmin && (
              <Button color="inherit" component={Link} to="/add-products">
                Add Products
              </Button>
            )}
            {!isAdmin && (
              <Button color="inherit" component={Link} to="/productss">
                ProductDetails
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
