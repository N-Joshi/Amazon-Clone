import React from 'react'
import './Checkout.css'
import SubTotal from './SubTotal'
import { useStateValue } from './StateProvider';
import CartProduct from './CartProduct';
import FlipMove from 'react-flip-move';

function Checkout() {

    const[{basket,user},dispatch] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__banner" src="https://i1.wp.com/www.scriberr.in/wp-content/uploads/2020/06/Offer-page-banner.png?fit=820%2C312&ssl=1"/>
                <div  className="check__basket">
                    {basket.length > 0 ? <h3 className="checkout__title">Hey {user?.email}, your Shopping Basket</h3> : <h3 className="checkout__title">Oh no !! Your Cart Looks Empty</h3>}
                    {basket.map(item=>(
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
            <div className="checkout__right">
                <SubTotal/>
            </div>
        </div>
    )
}

export default Checkout
