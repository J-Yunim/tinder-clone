import React, { useEffect, useState } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import IconButton from '@material-ui/core/IconButton';
import GoogleLogin from 'react-google-login';
import { Modal } from 'antd';

import LoginWithEmail from './Login'
import Register from './Register'
import { logoutUser } from "./actions/authActions";

import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [loginWithEmail, setloginWithEmail] = useState(false)
    const [register, setRegister] = useState(false)
    return(
        <div className={`login-page`}>
            <img className='login-logo' src='https://upload.wikimedia.org/wikipedia/commons/e/e1/TinderIcon-2017.svg' alt='' />
            {register? 
            <Register />
            :loginWithEmail?
            <LoginWithEmail/>
            :<div className="login-entries">
                <h1>GET STARTED</h1>
                <p>By clicking Log In, you agree to our <a className='login-link' href="">Terms</a>. Learn how we process our data in our <a className='login-link' href="">Privacy Policy</a> and <a className='login-link' href="">Cookie Policy</a>.</p>
                <GoogleLogin
                    render={renderProps => (
                        <button className='login-submit' onClick={renderProps.onClick} disabled={renderProps.disabled}>LOG IN WITH GOOGLE</button>
                    )}
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    buttonText="Login With Google"
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
                <button className="login-submit" type='button'>LOG IN WITH FACEBOOK</button>
                <button className="login-submit" type='button' onClick={()=>{setloginWithEmail(true)}}>LOG IN WITH EMAIL</button>
                <p className='login-link' onClick={()=>{setRegister(true)}}>New to Tinder? Create an account!</p>
                <h1>GET THE APP!</h1>
            </div>}
        </div>
    )
}

const LogoutPage = (props) => {

    const {setLogout} = props

    const dispatch = useDispatch();
    
   
    const handleOk = () => {
        setLogout(false);
        logoutUser(dispatch);
    };

    const handleCancel = () => {
        setLogout(false);
    };

    return (
        <div className={`login-page`}>
            <h1>Confirm to log out?</h1>
            <div className="confirm-buttons">
            <button type='button' onClick={handleCancel}>Cancel</button>
            <button type='button' onClick={handleOk}>Log Out</button>
            </div>
        </div>
    )
}


function Header() {
    const [login, setLogin] = useState(false)
    const [logout, setLogout] = useState(false)

    const {isAuthenticated,user} = useSelector(state => state.auth);

 useEffect(() => {
        if(isAuthenticated){
            setLogin(false)
        }
    }, [isAuthenticated])

    return (
        <div class='header'>
            <div className="header-login">
                <Link to='/profile'>
                    <IconButton>
                        <PersonIcon fontSize='large' className='header-icon' />
                    </IconButton>
                </Link>
                {isAuthenticated? 
                <button className="login-button logout-button" type='button' onClick={()=>setLogout(true)}><span className='show'><span className="align">{(`Hi,${user?.name}`).length > 20?(`Hi,${user?.name}`):(`Hi,${user?.name}`).slice(0,17)+'...' }</span></span></button>
                :<button className="login-button" type='button' onClick={()=>setLogin(true)}>LOG IN</button>
            }
            <div className={login||logout?`stretch-box`:'stretch-box-inactive'} onClick={()=>{setLogin(false); setLogout(false)}} />
                {login && <LoginPage />}
                {logout && <LogoutPage setLogout={setLogout} />}
            </div>
            <Link to='/'>
            <img className='header-logo' src='https://upload.wikimedia.org/wikipedia/commons/e/e1/TinderIcon-2017.svg' alt='' />
            </Link>
            <IconButton>
                <ForumIcon fontSize='large' className='header-icon' />
            </IconButton>
        </div>
    )
}

export default Header
