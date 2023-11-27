import React, { useState, useEffect ,useReducer} from 'react';
import { Card, CardContent, TextField, Button } from '@material-ui/core';
//import DataContext from '../Reducer/DataContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,useParams } from 'react-router-dom';

import { initialState, reducer } from '../Reducer/Reduce';
const EditProduct=({data})=>{
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const[manufacturer,setManufacture]=useState('');
  const[availableItems,setAvailableItems]=useState('');
  const[stringImageURL,setImageURL]=useState('');
  const navigate = useNavigate();
 
//   console.log('ID:'+ id);
const { id } = useParams();
//console.log('ID:'+id);
const Token=data;
//console.log('Token:'+ data);

  

    const handleProductNameChange = (event,product) => {
        const updatedProducts = products.map((p) =>
        p.id === product.id ? { ...p, name: event.target.value } : p
      );
      setProducts(updatedProducts);
      };

      const handleProductPriceChange = (event,product) => {
        // Assuming you have a function to update the state of products
        const updatedProducts = products.map((p) =>
          p.id === product.id ? { ...p, price: event.target.value } : p
        );
      
        // Call the function to update the state with the new products array
        setProducts(updatedProducts);
      }; 
    
      const handleCategoryChange = (event,product) => {
        const updatedProducts = products.map((p) =>
        p.id === product.id ? { ...p, category: event.target.value } : p
      );
      setProducts(updatedProducts);
      };
    
    //   const handlePriceChange = (productId,event) => {
    //     setProducts(productId,event.target.value);
    //   };
    
      const handleDescriptionChange = (event,product) => {
        const updatedProducts = products.map((p) =>
        p.id === product.id ? { ...p, description: event.target.value } : p
      );
      setProducts(updatedProducts);
      };
      const handleManufactureChange = (event,product) => {

        const updatedProducts = products.map((p) =>
        p.id === product.id ? { ...p, manufacturer: event.target.value } : p
      );
      setProducts(updatedProducts);
      };
      const handleAvailableItemsChange = (event,product) => {
        const updatedProducts = products.map((p) =>
        p.id === product.id ? { ...p, availableItems: event.target.value } : p
      );
      setProducts(updatedProducts);
      };
      const handleImageUrlChange = (event,product) => {

       const updatedProducts = products.map((p) =>
        p.id === product.id ? { ...p, imageUrl: event.target.value } : p
      );
      setProducts(updatedProducts);
      };
      

      const handleEditButtonClick= async(product)=>{

        try {
      const response = await fetch(`http://localhost:8080/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+  Token,
          
        },
        body: JSON.stringify({
          'name': product.name,
          'category':product.category,
          'price':product.price,
          'description':product.description,
          'manufacturer':product.manufacturer,
          'availableItems':product.availableItems,
          'imageUrl':product.imageUrl

         // 'role': role

          //   'password' : password
          // productName, category, price, description
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
         // Read the error message as text
         
       // setError(errorMessage || 'Failed to create a new user.');
        return;
      }
      else{
        //dispatch({ type: 'AdminAddedProduct'})
       // setSuccessMethod(true);
       setProducts([]);
         navigate('/products');
       
         toast.success('Product added successfully!');
         
        
         

           
        
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
    useEffect(() => {
        // Assuming you have an API endpoint for fetching products
        const apiUrl = `http://localhost:8080/api/products/${id}`;
    
        const fetchProducts = async () => {
          try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setProducts([data]);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProducts();
      }, [id]);
     return(

        <Card>
         {products.map((product) => (   
      <CardContent>
        <h1 title='ModifyProduct'>Modify Product</h1>
        <TextField
          label="Product Name"
          value={product.name}
          onChange={(event)=>handleProductNameChange(event,product)}
          fullWidth
        />
        <TextField
          label="Category"
          value={product.category}
          onChange={(event)=>handleCategoryChange(event,product)}
          fullWidth
        />
        <TextField
          label="Price"
          type="number"
          className='price'
          value={product.price}
          onChange={(event)=>handleProductPriceChange(event,product)}
          fullWidth
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          value={product.description}
          onChange={(event)=>handleDescriptionChange(event,product)}
          fullWidth
        />
         <TextField
          label="Manufacturer"
          // multiline
          // rows={4}
          value={product.manufacturer}
          onChange={(event)=>handleManufactureChange(event,product)}
          fullWidth
        />
         <TextField
          label="AvailableItem"
          type="number"
          // multiline
          // rows={4}
          value={product.availableItems}
          onChange={(event)=>handleAvailableItemsChange(event,product)}
          fullWidth
        />
         <TextField
          //label="imageUrl"
          // multiline
          // rows={4}
          value={product.imageUrl}
          onChange={(event)=>handleImageUrlChange(event,product)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={() => handleEditButtonClick(product)}>
         Modify Products
        </Button>
      </CardContent>
      ))}
    </Card>

     ); 

}
export default EditProduct;