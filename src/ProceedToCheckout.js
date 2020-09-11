import React, { useState, useEffect } from 'react';
import './ProceedToCheckout.css'
import { useStateValue } from './StateProvider';
import CartProduct from './CartProduct';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketPrice } from './Reducer';
import axios from './axios';
import { useHistory, Prompt, Redirect } from 'react-router-dom';
import { db } from './firebase';
import { Link } from '@material-ui/core';

function ProceedToCheckout() {

    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true)
    const [processing, setProcessing] = useState("")
    const [succeeded, setSucceeded] = useState(false)
    const [clientSecret, setClientSecret] = useState(true)

    useEffect(() =>{
        //create stripe secret
        const getClientSecret = async () =>{
            const response = await axios({
                method:'post',
                //stripe expects the total in a currencies subunits
                url:`/payments/create?total=${getBasketPrice(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret()
    },[basket])

    console.log('The secret is',clientSecret)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async event => {
        //Stripe Integration
        event.preventDefault();
        setProcessing(true) 
        
        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement),
                billing_details :{
                    email:'xys@gmail.com',
                    name :'Naman',
                    address:{
                        city:'Bangalore',
                        country:'US',
                        line1:'xyz',
                        state:'Karnataka'
                    }
                }
            }
        }).then(({paymentIntent}) =>{

            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket:basket,
                    amount:paymentIntent.amount,
                    created:paymentIntent.created
                })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type:'EMPTY_BASKET'
            })

            history.replace('/orders');
        })
    }

    const handleChange = event => {
        setDisabled(event.empty)
        setError(event.error ? event.error.message : "")
    }

    return (
        <>
        { user ? <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout ({basket?.length} items)
            </h1>
                {/**Delivery Section */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123,ABC</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>
                {/**Review Section */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items</h3>
                    </div>
                    <div className="payment__items">
                        {/**Products*/}
                        {basket.map(item => (
                            <CartProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                {/**Payment Section */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/**Stripe Payment*/}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}
                              options={{
                                hidePostalCode: true,
                                style: {
                                    base: {
                                     iconColor: '#666EE8',
                                     color: '#31325F',
                                     lineHeight: '40px',
                                     fontWeight: 300,
                                     fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                                     fontSize: '15px',
                                   
                                     '::placeholder': {
                                       color: '#CFD7E0',
                                      },
                                     }, 
                                    } 
                              }}/>
                            <div className="payment__pricecontainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total : {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketPrice(basket)}
                                    displayType={"text"}
                                    thousandSeperator={true}
                                    prefix={'$'}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now" }</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div> : <><Prompt message="Please Login First" /> <Redirect to='/login'/> </>}
        </>
    )
}

export default ProceedToCheckout
