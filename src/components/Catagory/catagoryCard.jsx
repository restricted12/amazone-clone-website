import React from 'react';
import Classes from '../header/header.module.css';
import { Link } from 'react-router-dom';
import '../bootstrap.css';

function CatagoryCard({ data }) {
  return (
    <div className={`${Classes.catagory} card text-center p-3 shadow-sm h-100 d-flex flex-column align-items-center`}> 
      <Link to={`/catagory/${data.category}`} className="text-decoration-none text-dark w-100"> 
        <span>
          <h2 className="h5 mt-2">{data.title}</h2>
        </span>
        <img src={data.image} alt={data.title} className="img-fluid rounded w-100" style={{ maxHeight: '200px', objectFit: 'cover' }} />
        <p className="btn btn-primary mt-2">Shop Now</p>
      </Link>
    </div>
  );
}

export default CatagoryCard;
