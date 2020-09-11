import React from 'react'
import CurrencyFormat from "react-currency-format"
import './SubTotal.css'
import { useStateValue } from './StateProvider';
import { getBasketPrice } from './Reducer';
import {useHistory} from 'react-router-dom';


function SubTotal() {

    const history = useHistory();
    const[{basket},dispatch] = useStateValue();

    return <div className="subtotal">
        <CurrencyFormat
            renderText={(value) => (
                <>
                    <p>
                        Subtotal ({basket?.length} items):
                        <strong>{value}</strong>
                    </p>
                    <small className="subtotal__gift"><input type="checkbox" />This order contains a gift</small>
                </>
            )}
            decimalScale={2}
            value={getBasketPrice(basket)} 
            displayType={"text"}
            thousandSeperator={true}
            prefix={'$'}
        />

        <button onClick={e=> history.push('/checkout')}>Proceed To Checkout</button>
    </div>

}

export default SubTotal
