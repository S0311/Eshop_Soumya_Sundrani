
import React, { useState, useEffect } from 'react';
import { Card, CardContent,Button } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const UserProducts = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOption, setSortOption] = useState('default');
  const [products, setProducts] = useState([]);

  const history = useNavigate();

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


  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleSortChange = (event, newSortOption) => {
    setSortOption(newSortOption);
  };

  const fetchCategories = async () => {
    // Fetch categories from the backend API
    // Update the state with the fetched categories
  };

  const fetchProducts = async () => {
    // Fetch products from the backend API based on selectedCategory and sortOption
    // Update the state with the fetched products
  };

  const handleProductClick = (productId) => {
    // Handle product click, e.g., redirect to product details page
   // history.push(`/products/${productId}`);
  };
  const onBuyButtonClick=(productId)=>{
    history(`/productDetails/${productId}`)

  }

  // Render Product Cards based on the state

  return (
    <div>
      <ToggleButtonGroup
        value={selectedCategory}
        exclusive
        onChange={handleCategoryChange}
        aria-label="product categories"
      >
        {categories.map((category) => (
          <ToggleButton key={category.id} value={category.id} aria-label={category.name}>
            {category.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <ToggleButtonGroup
        value={sortOption}
        exclusive
        onChange={handleSortChange}
        aria-label="sort options"
      >
        <ToggleButton value="default">Default</ToggleButton>
        <ToggleButton value="priceHighToLow">Price High to Low</ToggleButton>
        <ToggleButton value="priceLowToHigh">Price Low to High</ToggleButton>
        <ToggleButton value="newest">Newest</ToggleButton>
      </ToggleButtonGroup>

      <div>
        {products.map((product) => (
          <Card>
            <CardContent key={product.id} onClick={() => handleProductClick(product.id)}>
              {/* Display product information */}
              <h1>{product.name}</h1>
        <p>{product.description}</p>
        <img
          src={product.imageURL || 'alternate-image-url'}
          alt={product.name}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
        <p>Price: {product.price}</p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onBuyButtonClick(product.id)}
        >Buy</Button>
              {/* Add other product details */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserProducts;
