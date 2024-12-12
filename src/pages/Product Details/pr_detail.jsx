import React, { useState, useEffect } from 'react';
import Layout from '../../../src/components/layout/layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/product/productcard';
import Product_url from '../../Api/endpoint';
import Loader from '../../pages/loader/loader.jsx'; // Import the Loader component

export default function PrDetail() {
  const { ProductId } = useParams();
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state to true
  const [product, setProduct] = useState(null); // Initialize product as null

  useEffect(() => {
    setIsLoading(true); // Set loading to true before fetching data
    axios
      .get(`https://fakestoreapi.com/products/${ProductId}`) // Fetch product by ID
      .then((res) => {
        setProduct(res.data); // Set the single product data
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('There was an error fetching the data:', error);
        setIsLoading(false); // Ensure loading is false even if there's an error
      });
  }, [ProductId]); // Add ProductId as a dependency

  return (
    <div>
      <Layout>
        {isLoading ? (
          <Loader /> // Show the Loader component while data is loading
        ) : product ? (
          <ProductCard 
          product={product} 
          flex={true} 
          renddisc={true}
          renderAdd={true} 
          /> // Pass flex and renddisc props to ProductCard
        ) : (
          <p>Product not found.</p> // Show a fallback message if the product is not found
        )}
      </Layout>
    </div>
  );
}
