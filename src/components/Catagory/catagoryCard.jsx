import React from 'react';
import Classes from '../header/header.module.css';
import { Link } from 'react-router-dom';


function CatagoryCard({ data }) {
  return (
    <div className={Classes.catagory}>
      <Link to={`/catagory/${data.category}`}> {/* You can specify the link dynamically */}
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.image} alt={data.title} />
        <p>Shop Now</p>
      </Link>
    </div>
  );
}

export default CatagoryCard;
