import React from 'react';
import { catagory } from '../../components/Catagory/AllInfo'; // Ensure this matches your export
import CatagoryCard from '../../components/Catagory/catagoryCard.jsx'; // Correct capitalization
import Classes from '../header/header.module.css';
// import './bootstrap.css';

function Category() {
  return (
    <section className={`${Classes.category_container} container py-4`}>
      <div className="row justify-content-center">
        {catagory.map((info) => (
          <div key={info.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <CatagoryCard data={info} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Category;
