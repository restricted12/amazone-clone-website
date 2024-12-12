import React, { useContext } from 'react';
import Layout from '../../components/layout/layout';
import { DataContext } from '../../components/DataProvider/Data';
import ProductCard from '../../components/product/productcard';
import { Link } from 'react-router-dom';
import CurrencyFormat from '../../components/currency/currency';
import Classes from '../../components/header/header.module.css';
import { Type } from '../../utilities/action.type';
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";


function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  // Fix: Ensure the reduce function returns the accumulated value
  const total = basket.reduce((amount, item) => {
    return amount + item.price * item.amount;
  }, 0); // Initial value is 0

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <Layout>
      <section className={Classes.container}>
        <div className={Classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Oops! No item in your cart</p>
          ) : (
            basket?.map((item, i) => (
              <section key={i}  className={Classes.cart_product}>
                <ProductCard
                  product={item}
                  renddisc={true}
                  flex={true}
                  renderAdd={false}
                />
                <div className={Classes.buttton_container}>
                  <button className={Classes.btn_add} onClick={() => increment(item)}><FaChevronUp size = {20}/></button>
                  <span>{item.amount}</span>
                  <button className={Classes.btn_add}onClick={() => decrement(item.id)}><FaChevronDown size = {20}/></button>
                </div>
              </section>
            ))
          )}
        </div>

        {basket?.length !== 0 && (
          <div className={Classes.subtotal}>
            <div>
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue to checkout</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
