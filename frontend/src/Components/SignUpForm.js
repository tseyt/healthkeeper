import React from 'react'

export default function SignUp(){
    return (
        <div>
            <form>
                <label htmlFor='createUsername'> Username </label>
                <input type='username' name='createUsername' placeholder='Username'/>
                <label htmlFor='createEmail'> Enter Email </label>
                <input type='email' name='createEmail' placeholder='Email'/>
                <label htmlFor='createPassword'> Create Password </label>
                <input type='password' name='createPassword' placeholder="Password"/>
                <button>Sign Up</button>
            </form>
        </div>
    )
}