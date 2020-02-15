import React from "react";

import LoginForm from "../Components/LoginForm";

export default function Login() {
    return (
        <div className='welcome'>
            <h1>Log In</h1>
            <div className='login-page'>
                <LoginForm/>
            </div>
        </div>
    );
}