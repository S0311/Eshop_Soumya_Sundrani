

import React, { useState, useEffect ,useReducer} from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Button, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import EditProduct from '../EditProduct/editProduct';


const AdminProduct = ({data}) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const[editsucess,setEditSuccess]=useState(false);
  const navigate = useNavigate();
  const Token=data;
 

  // useEffect(() => {
  //   const apiUrl = 'https://your-api.com/products';

  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch(apiUrl);
  //       const data = await response.json();
  //       setProducts(data);
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //     }
  //   // Fetch product details from the backend API
  //   // /products/{id} endpoint

  //   // Example:
  //   // fetchProductDetails();
  // }, []});
  //debugger;
  useEffect(() => {
    // Assuming you have an API endpoint for fetching products
    const apiUrl = 'http://localhost:8080/api/products';

    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);


  const fetchProductDetails = async () => {
    // Fetch product details from the backend API based on the product ID
    // Update the state with the fetched product details
  };

  const handleQuantityChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value, 10) || 0;
    setQuantity(productId, newQuantity);
  };

  const onBuyButtonClick= (productId,quantity) => {
    navigate(`/productDetails/${productId}`)

    // Handle buy button click, e.g., redirect to checkout page
    console.log(`Buying ${quantity} units of product ${id}`);
    // You can implement the redirection logic here
  };

  const handleEditButtonClick=(productId,event)=>{
    // <EditProduct id={productId}/>
    const id=productId
navigate(`/product/${productId}`)
  }
 
  const handleDeleteButtonClick=(productId,event)=>{
    // <EditProduct id={productId}/>
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");

    if (isConfirmed) {
      handleConfirmButtonClick(productId);
    }
  }

  const  handleConfirmButtonClick=async(productId)=>{
    try {
      const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+  Token,
          
        },
        
      });

      if (!response.ok) {
        const errorMessage = await response.text();
         // Read the error message as text
         
       // setError(errorMessage || 'Failed to create a new user.');
        return;
      }
      else{
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
        //dispatch({ type: 'AdminAddedProduct'})
       // setSuccessMethod(true);
      //  setProducts([]);
      //    navigate('/products');
       
        // toast.success('Product added successfully!');
         
        
         

           
        
      }

      const data = await response.json();
      // console.log('User successfully created:', data);

      // Redirect user to the home page or login page after successful signup
      // You can use useHistory() for programmatic navigation
    } catch (error) {}}


  // Render product details based on the state

  return (
    <Card>
    {products.map((product) => (
      <CardContent key={product.id}>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <img
          src={product.imageURL || 'alternate-image-url'}
          alt={product.name}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
        <p>Price: {product.price}</p>
        <TextField
          type="number"
          label="Quantity"
          value={product.quantity} // Assuming each product has its own quantity state
          onChange={(event) => handleQuantityChange(product.id, event)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => onBuyButtonClick(product.id, product.quantity)}
        >
          Buy
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEditButtonClick(product.id)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDeleteButtonClick(product.id)}
        >
          Delete
        </Button>
      </CardContent>
    ))}
  </Card>
  );
};

export default AdminProduct;
