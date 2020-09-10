import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from './firebase'
import './Login.css'

function Login() {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault()
        auth
            .signInWithEmailAndPassword(email, password)
            .then((auth) => {
                history.push('/')

            })
            .catch((error => alert(error.message)))

    }

    const register = e => {
        e.preventDefault()
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) {
                    history.push('/')
                }
            }).catch(error => alert(error.message))
    }

    return (

        <div className="login">
            <Link to="/">
                <img className="login_img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" />
            </Link>

            <div className="login__container">
                <h1>Login</h1>
                <form>
                    <h5>Email</h5>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button type='submit' onClick={signIn} className="login_signin">Sign In</button>
                </form>
                <p>
                    By continuing, you agree to Amazon's Clone Conditions of Use and Privacy Notice.
            </p>
            </div>

            <div class="a-divider a-divider-break"><h5>New to Amazon?</h5></div>
            <button onClick={register} className="login_register">Create Your Amazon Account</button>

            <div className="login__testUser">
                <h3>Feel free to register and try the app (no sensitive data collected) 😌 , or you can use the following test credentials 😄</h3>
                <br></br>
                <span><strong>Email : </strong> hellowguest@gmail.com</span>
                <br></br>
                <span><strong>Password :  </strong> hellow@guest</span>
            </div>
        </div>
    )
}

export default Login
