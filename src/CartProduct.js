import React from 'react'
import './CartProduct.css'
import { useStateValue } from './StateProvider';


function CartProduct({id, image, title, price, rating , hidebutton }) {

    const[{basket},dispatch] = useStateValue();

    const removeFromBasket =() =>{
        dispatch({
            type:'REMOVE_FROM_BASKET',
            id:id
        })
    }

    return (
    
        
        <div className="cartproduct">
            <img className='cartproduct__image' src={image} />
            <div className='cartproduct__info'>
                <p className='cartproduct__title'>{title}</p>
                <p className='cartproduct__price'><small>$</small><strong>{price}</strong></p>
                <div className='cartproduct__rating'>
                    {Array(rating).fill().map((_, i) => (
                        <p>⭐️</p>
                    ))
                    }
                </div>
                {!hidebutton && (
                <button onClick={removeFromBasket}>Remove From Cart</button>)}
            </div>
        </div>
   
    )
}

export default CartProduct
