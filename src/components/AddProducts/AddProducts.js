// src/components/AddProduct/AddProduct.js
import React, { useState ,useContext,useReducer} from 'react';
import { Card, CardContent, TextField, Button } from '@material-ui/core';
//import DataContext from '../Reducer/DataContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { initialState, reducer } from '../Reducer/Reduce';

const AddProduct = ({data}) => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const[manufacturer,setManufacture]=useState('');
  const[availableItems,setAvailableItems]=useState('');
  const[stringImageURL,setImageURL]=useState('');
  const token=data;
  const[setSuccess,setSuccessMethod]=useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  //console.log('Role:'+ data);
  //const { state } = useContext(DataContext);+
 // const {state ,dispatch } = useContext(DataContext);
 // console.log('Role:'+ state);

  //const role=data;
 // console.log('Role:'+ role)

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleManufactureChange = (event) => {
    setManufacture(event.target.value);
  };
  const handleAvailableItemsChange = (event) => {
    setAvailableItems(event.target.value);
  };
  const handleImageUrlChange = (event) => {
    setImageURL(event.target.value);
  };
 
const handleAddProduct = async() => {
    // Add your logic to send the product data to the server (e.g., via API)
   // console.log('Adding product:', { productName, category, price, description });
    try {
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token,
          
        },
        body: JSON.stringify({
          'name': productName,
          'category':category,
          'price':price,
          'description':description,
          'manufacturer':manufacturer,
          'availableItems':availableItems,
          'imageUrl':stringImageURL

         // 'role': role

          //   'password' : password
          // productName, category, price, description
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Read the error message as text
       // setError(errorMessage || 'Failed to create a new user.');
        return;
      }
      else{
        //dispatch({ type: 'AdminAddedProduct'})
        setSuccessMethod(true);
       
         toast.success('Product added successfully!');
         navigate('/products');
         
        
         

           
        
      }

      const data = await response.json();
      // console.log('User successfully created:', data);

      // Redirect user to the home page or login page after successful signup
      // You can use useHistory() for programmatic navigation
    } catch (error) {
      // toast.error('Error Occured',{
      //   position: toast.POSITION.TOP_RIGHT,
      // })
     // console.error('Error during signup:', error);
      //setError('An unexpected error occurred.');
    }
    // Reset form fields after submitting
    setProductName('');
    setCategory('');
    setPrice('');
    setDescription('');
    setAvailableItems('');
    setManufacture('');
    setImageURL('');
    
   
   
  };

  return (
    
    <Card>
      {setSuccess?<ToastContainer />:''}
      <CardContent>
        <h1 title='AddNewProduct'>Add New Product</h1>
        <TextField
          label="Product Name"
          value={productName}
          onChange={handleProductNameChange}
          fullWidth
        />
        <TextField
          label="Category"
          value={category}
          onChange={handleCategoryChange}
          fullWidth
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={handlePriceChange}
          fullWidth
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={handleDescriptionChange}
          fullWidth
        />
         <TextField
          label="Manufacturer"
          // multiline
          // rows={4}
          value={manufacturer}
          onChange={handleManufactureChange}
          fullWidth
        />
         <TextField
          label="AvailableItem"
          type="number"
          // multiline
          // rows={4}
          value={availableItems}
          onChange={handleAvailableItemsChange}
          fullWidth
        />
         <TextField
          label="imageUrl"
          // multiline
          // rows={4}
          value={stringImageURL}
          onChange={handleImageUrlChange}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddProduct;
