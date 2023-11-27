import React, { useState,useReducer } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Login.css';
import { initialState, reducer } from '../Reducer/Reduce';
import { useNavigate } from 'react-router-dom';


const Login = ({ state, dispatch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //const [state, dispatch] = useReducer(reducer, initialState);
   const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format. Please enter a valid email address.');
      return;
    }

    // Basic password length validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Clear any previous error
    setError('');
    try {
      const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         
            'username': email,
            'password' : password
         
          // firstName,
          // lastName,
          // email,
          // password,
          // contactNumber,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); 
       // toast.error('Something Went Wrong Please try Later!', {
         // position: toast.POSITION.TOP_RIGHT,
        //});
        
        //setError(errorMessage || 'Failed to create a new user.');
        return;
      }
      else{
        
        const data = await response.json();
      //console.debug(data);
        const role = data.role[0];
        const values = role['authority'];
        const token = data.token;
        //console.log('Token'+token);
       
        if(values==='ADMIN'){
          dispatch({ type: 'AdminLogin',payload:token})
           navigate('/products');
          
              // LoginSuccess(data);

        }
        else{
          dispatch({ type: 'UserLogin'})
          navigate('/productss')

        }
        
      //  toast.success('Welcome to eshop',{position: toast.POSITION.TOP_RIGHT,});      
          // console.log(role);
          // console.log(values);

      }

      
      
       //setlogin(true);
       

      // console.log('User successfully created:', data);

      // Redirect user to the home page or login page after successful signup
      // You can use useHistory() for programmatic navigation
    } catch (error) {
     // console.error('Error during signup:', error);
      setError('An unexpected error occurred.');
    }

    // If validation passes, call handleLogin
    //handleLogin(state,);
   // Navigate('/add-products');
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} required />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" onClick={handleSubmit}>Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
