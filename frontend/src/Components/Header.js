import React from 'react';
import Logo from '../img/Logo.png';

export default function Header({loggedIn}){
    return(
        <header>
            <a className='logo' href='/'><img alt="logo" className="designed-logo" src={Logo}></img></a>
            <nav >
                {loggedIn && <a href='/'>Home</a>}
                {loggedIn && <a href='#'>Log Out</a>}
                {!loggedIn &&<a href='/login'>Login</a>}
                {!loggedIn && <a href='/sign-up'>Sign Up</a>}
            </nav>
        </header>
    )
}