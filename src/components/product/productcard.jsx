import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import Currencyformat from '../currency/currency.jsx';
import Classes from '../../components/header/header.module.css';
import { Link } from 'react-router-dom';
import Loader from '../../pages/loader/loader.jsx';
import { DataContext } from '../DataProvider/Data.jsx';
import { Type } from '../../utilities/action.type.js';

function Productcard({ product, flex, renddisc, renderAdd }) {
  // Always call hooks at the top level
  const [state, dispatch] = useContext(DataContext);

  if (!product) {
    // Show the loader in a properly styled container
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50vh', // Adjust to center the loader in the view
        }}
      >
        <Loader />
      </div>
    );
  }

  const { image, title, id, rating, price, description } = product;

  const addtocart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };

  return (
    <div className={`${Classes.card__container} ${flex ? Classes.product__flexed : ''}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renddisc && description && <div>{description}</div>} {/* Only render description if renddisc is true */}
        <div className={Classes.rating}>
          {/* Rating */}
          <Rating value={rating?.rate || 0} precision={0.1} readOnly />
          {/* Number of ratings */}
          <small>{rating?.count || 0}</small>
        </div>
        <div>
          {/* Price */}
          <Currencyformat amount={price || 0} />
        </div>
        {renderAdd && 
        <button className={Classes.button} onClick={addtocart}>
          Add to Cart
        </button>}
      </div>
    </div>
  );
}

export default Productcard;
