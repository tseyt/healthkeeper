import React from 'react';

export default function Header({loggedIn}){
    return(
        <header className='sidenav'>
            {/* <a className='logo' href='/'><img alt="logo" className="designed-logo" src={Logo}></img></a> */}
            <nav >
                {!loggedIn && <a href='/'>Home</a>}
                {!loggedIn && <a href='#'>Log Out</a>}
            </nav>
        </header>
    )
}