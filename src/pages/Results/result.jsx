import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { product_url } from '../../Api/endpoint';
import classes from '../../components/header/header.module.css';
import ProductCard from '../../components/product/productcard.jsx';

export default function Result() {
    const [results, setResults] = useState([]); // Corrected useState
    const { catagoryname } = useParams();

    useEffect(() => {
        axios
            .get(`https://fakestoreapi.com/products/category/${catagoryname}`)
            .then((res) => {
                console.log(res);
                setResults(res.data); // Correct state update
            })
            .catch((error) => {
                console.error('There was an error fetching the data:', error);
            });
    }, [catagoryname]); // Added dependency array with `catagoryname` to refetch data if it changes

    return (
        <div>
            <Layout>
                <section>
                    <h1 style={{ padding: "30px" }}>Results</h1>
                    <p style={{ padding: "30px" }}>Category / {catagoryname}</p>
                    <hr />
                    <div className={classes.products_container}>
                        {results.map((product) => (
                            <ProductCard 
                            key={product.id} 
                            product={product}
                            renderAdd = {true}
                            renddisc = {false}
                            />
                        ))}
                    </div>
                </section>
            </Layout>
        </div>
    );
}
