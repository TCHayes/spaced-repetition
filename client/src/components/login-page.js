import React from 'react';

export default function LoginPage() {
    return(
      <div className='login-container'>
       <div className='main-heading'>
        <p className='login-paragraph'>
          <span className="p-element">04</span>
          <span className="m">P</span>eriodic</p>
        <p className='second'>
          <span className="r-element">75</span>
          <span className="s">Re</span>petition</p>
       </div>
       <h3 className="slogan">A Simple Way to Learn the Periodic Table using Spaced Repetition</h3>
       <button className="loginBtn loginBtn--google">
        <a href={'/api/auth/google'}>Login with Google</a>
       </button>
       <button className="btn-auth btn-github large">
        <a href={'/api/auth/github'}>Login with Github</a>
       </button>
      </div>
    )
}
