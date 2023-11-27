import { useNavigate,useParams } from 'react-router-dom';
import React, { useState, useEffect ,useReducer} from 'react';
import { Card, CardContent, TextField, Button } from '@material-ui/core';
const ProductDetails=()=>{
    const [products, setProducts] = useState([]);
    const { id } = useParams();
    const[quantity,setQuantity]=useState('');
    const navigate=useNavigate();
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
      const handleQuantity=(event)=>{
            setQuantity(event.target.value);
      }
      const handleOrder=(name)=>{
        navigate(`/Order/${name}/${quantity}`)

  }
      return(

        <Card>
         {products.map((product) => (   
      <CardContent>
        <TextField
          label="Product Name"
          value={product.name}
          fullWidth
        />
        <TextField
          label="Category"
          value={product.category}
          fullWidth
        />
        <TextField
          label="Price"
          type="number"
          className='price'
          value={product.price}
          fullWidth
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          value={product.description}
          fullWidth
        />
         
         <TextField
          label="AvailableItem"
          type="number"
          // multiline
          // rows={4}
          value={product.availableItems}
          fullWidth
        />
          <img
          src={product.imageURL || 'alternate-image-url'}
          alt={product.name}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
        <TextField
        lable="Quantity"
        type="number"
        value={quantity }
        onChange={(event)=>handleQuantity(event)}
        />

        <Button variant="contained" color="primary" onClick={() => handleOrder(product.name)}>
         PlaceOrder
        </Button>
      </CardContent>
      ))}
    </Card>

     ); 

}
export default  ProductDetails;