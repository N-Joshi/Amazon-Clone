import React from 'react'
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import {Link, useHistory} from 'react-router-dom'; 
import { useStateValue } from './StateProvider';
import {auth} from './firebase';


function Header() {

    const[{basket,user},dispatch] = useStateValue();
    const history = useHistory()

    const handleAuth = () =>{
        if(user){
            auth.signOut()
            history.push('/')
        }
    }

    return (
        <div className='header'>
            <Link to="/">
             <img  className="header_logo" src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'/>
             </Link>
             <div className="header_search">
                    <input className="header_searchInput" type="text"/>
                    {/**Logo*/}
                    <SearchIcon className="header_searchIcon"/>
             </div>
            
            <div className="header_nav">
            <Link to={!user && '/login'}>
                <div onClick={handleAuth} className="header__option">
                    <span className="header_option_line1">{user ? `Hello , ${user.email}` : 'Hello Guest'}</span>
                   <span className="header_option_line2">{user ? 'Sign Out':'Sign In'}</span>
                </div>
            </Link>
            <Link to={!user ? '/login':'/orders'}>
                <div className="header__option">
                    <span className="header_option_line1">Return</span>
                    <span className="header_option_line2">& Orders</span>
                </div>
            </Link>
                <div className="header__option">
                    <span className="header_option_line1">Your</span>
                    <span className="header_option_line2">Prime</span>
                </div>

                <Link to="/cart">
                <div className="header_optionBasket">
                    <ShoppingCartOutlinedIcon/>
                    <span className="header_option_line2 header_basketCount">{basket?.length}</span>
                </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
