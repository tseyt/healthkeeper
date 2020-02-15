import React from 'react'


export default function Login(){
    return (
        <div className='login-comp'>
            <form onSubmit= >
                <label htmlFor='loginEmail'> Email </label>
                <input type='email' name='loginEmail' placeholder='email'/>
                <label htmlFor='loginPassword'> Password </label>
                <input type='password' name='loginPassword' placeholder="password"/>
                <button>Login</button>
            </form>
        </div>
    )
}