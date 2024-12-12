import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../src/pages/landing/landing.jsx'
import SignIn from '../src/pages/Auth/signup.jsx'
import Payment from '../src/pages/payment/payment.jsx'
import Order from '../src/pages/Orders/order.jsx'
import Cart from '../src/pages/cart/cart.jsx'
import Results from './pages/Results/result.jsx';
import Pr_detail from '../src/pages/Product Details/pr_detail.jsx'
import Auth from '../src/pages/Auth/signup.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProtectedRoute from './components/protectedRoute/protectedroute.jsx';

function RouterPage() {
    const stripePromise = loadStripe(
        'pk_test_51QRCliE7TNyW6DLwnWAgUlSGjVPtdzFOJ8pwLdC6oefEHYv05liZKpxUFQ8cs8rv3yCEcAJoyiZ9Pt7C5ihGXBxZ00d59dSV1H'
    );

    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/auth' element={<Auth />} />
                    <Route
                      path='/payments' element={
                        <ProtectedRoute
                            msg={"you must login to pay"}
                            redirect={"/payments"}>
                            <Elements stripe={stripePromise}>
                                <Payment />
                            </Elements>
                        </ProtectedRoute>}
                    />
                    <Route
                        path="/orders"
                        element={
                            <ProtectedRoute
                                msg={"you must login to see orders"}
                                redirect={"/orders"}>
                                <Elements stripe={stripePromise}>
                                    <Order />
                                </Elements>
                            </ProtectedRoute>
                        }
                    />

                    <Route path='/cart' element={<Cart />} />
                    <Route path='/products/:ProductId' element={<Pr_detail />} />
                    <Route path='/catagory/:catagoryname' element={<Results />} />
                </Routes>
            </Router>
        </div>
    )
}

export default RouterPage;
