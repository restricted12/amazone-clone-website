import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Productcard from '../../components/product/productcard.jsx';
import Classes from '../../components/header/header.module.css';
import Loader from '../../pages/loader/loader.jsx';

function Product() {
  // State declarations
  const [product, setProduct] = useState([]); // Products array
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => {
        setProduct(res.data); // Update products
        setIsLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error('Error fetching data:', error); // Log errors
        setIsLoading(false); // Stop loading even if there's an error
      });
  }, []);

  return (
    <section className={Classes.product__container}>
      {isLoading ? (
        // Show loader while loading
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh', // Adjust height to center the loader properly
          }}
        >
          <Loader />
        </div>
      ) : (
        // Display products after loading
        product.map((singleProduct) => (
          <Productcard 
          product={singleProduct} 
          key={singleProduct.id}
          renderAdd={true} />
        ))
      )}
    </section>
  );
}

export default Product;
