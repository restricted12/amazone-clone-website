import React from 'react';
import { catagory } from '../../components/Catagory/AllInfo'; // Ensure this matches your export
import CategoryCard from '../../components/Catagory/catagoryCard.jsx'; // Correct capitalization
import Classes from '../header/header.module.css';

function Category() {
  return (
    <section className={Classes.category_container}>
      {catagory.map((info) => (
        <CategoryCard key={info.id} data={info} />
      ))}
    </section>
  );
}

export default Category;
