import React from 'react';
import CarouselComponent from '../../components/courasole/courasole.jsx';
import Catagory from '../../components/Catagory/catagory.jsx';
import Product from '../../components/product/product.jsx';
import Layout from '../../components/layout/layout.jsx';

export default function Landing() {
  return (
    <Layout>
      <CarouselComponent />
      <Catagory />
      <Product />
    </Layout>
  );
}
