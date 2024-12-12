import React, { useContext, useState } from 'react';
import Layout from '../../components/layout/layout';
import classes from './payment.module.css';
import { DataContext } from '../../components/DataProvider/Data';
import Productcard from '../../components/product/productcard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Currencyformat from '../../components/currency/currency';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../utilities/firebase';
import { useNavigate } from 'react-router-dom';


export default function Payment() {
  const [{ user, basket }] = useContext(DataContext);
 

  // Total amount calculation
  const total = basket.reduce((amount, item) => amount + item.price * item.amount, 0);

  // Total items count calculation
  const totalitems = basket?.reduce((amount, item) => item.amount + amount, 0) || 0;

  // Stripe hooks
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [carderror, setcarderror] = useState(null); // Card error state
  const [processing, setprocessing] = useState(false);

  const handlechange = (e) => {
    // Handle changes to CardElement and display errors
    e?.error?.message ? setcarderror(e?.error?.message) : setcarderror(null);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setprocessing(true);
      
      // POST request to backend payment API
      const response = await axios.post(
        `http://127.0.0.1:5001/clone-19120/us-central1/api/payment/create?total=${total * 100}`
      );
      console.log(response);
      console.log(response.data)

      // Get client secret from response
      const clientsecret = response.data?.clinet_secret;
     

      // Confirm Card Payment with Stripe
      const { paymentIntent } = await stripe.confirmCardPayment(clientsecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
     

      // Add order details to Firestore
      await db.collection('users') .doc(user.uid
      ).collection('orders').doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
       
       


      // Reset processing state
      setprocessing(false);

      alert('Payment Successful!');
    } catch (error) {
      console.error('Payment Error:', error.message);
      setprocessing(false);
    }
    navigate('/orders',{state:{msg:"you have placed new order !!"}});
  };

  return (
    <div>
      <Layout>
        <div className={classes.payment_header}>
          Checkout ({totalitems}) items
        </div>
        <section className={classes.payment}>
          <div className={classes.flex}>
            <h3>Delivery Address</h3>
            <div>
              <div>{user?.email}</div>
              <div>123 React Street</div>
              <div>Addis Ababa</div>
            </div>
          </div>

          <hr />

          <div className={classes.flex}>
            <h3>Review Item And Delivery</h3>
            <div>
              {basket?.map((item) => (
                <Productcard product={item} flex={true} key={item.id} />
              ))}
            </div>
          </div>
          <hr />

          <div className={classes.flex}>
            <h3>Payment Methods</h3>
            <div className={classes.payment_card_container}>
              <div className={classes.payment_details}>
                <form onSubmit={handlePayment}>
                  {/* Show card error if any */}
                  {carderror && (
                    <small style={{ color: 'red', marginBottom: '5px' }}>
                      {carderror}
                    </small>
                  )}
                  <CardElement onChange={handlechange} />
                  {/* Price section */}
                  <div className={classes.payment_price}>
                    <div>
                      <span
                        style={{
                          display: 'flex',
                          gap: '10px',
                          fontWeight: 'bold',
                        }}
                      >
                        <p>Total Order |</p> <Currencyformat amount={total} />
                      </span>
                    </div>
                    <button type="submit" disabled={processing}>
                      {processing ? (
                        <div className={classes.loader}>
                          <ClipLoader color="black" size={12} />
                          <p>Please wait...</p>
                        </div>
                      ) : (
                        'Pay Now'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}
