import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './Login';
import {auth} from './firebase'
import { useStateValue } from './StateProvider';
import ProceedToCheckout from './ProceedToCheckout';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import Orders from './Orders';

const promise = loadStripe('pk_test_51HPvbFDAl1EjfowuiZ4cCwS6QaKNDSnBxC0Zt7lvl3tyQC8iG4yZXFlKK59oXtutENZE66aI6GdHAd40qQ0nFOfr00oOMC35DM')

function App() {

  const[{},dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser =>{
      console.log('The user is >>>>' , authUser)
      if(authUser){
        //user just logged in or is logged in
        dispatch({
          type:'SET_USER',
          user:authUser
        })
      }else{
        //user logged out
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })
  }, [])

  return (

    <Router>
      <div className="app">
        <Switch>
        <Route path="/login">
            <Login/>
        </Route>
        <Route path="/cart">
            <Header />
            <Checkout />
        </Route>
        <Route path="/checkout">
            <Header />
            <Elements stripe={promise}>
              <ProceedToCheckout />
            </Elements>
        </Route>
        <Route path="/orders">
            <Header />
            <Orders/>
        </Route>
        <Route path="/">
            <Header />
            <Home />
        </Route>
       
        </Switch>
      </div>
    </Router>
  );
}

export default App;
