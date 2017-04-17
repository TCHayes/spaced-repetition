import React from 'react';

export default function LoginPage() {
    return(
      <div className='login-container'>
       <h1 className='main-title'>Periodic Repitition</h1>
       <h3 className="slogan">A Simple Way to Learn the Periodic Table using Spaced Repitition</h3>
       <button className="loginBtn loginBtn--google">
        <a href={'/api/auth/google'}>Login with Google</a>
       </button>
      </div>
    )
}
