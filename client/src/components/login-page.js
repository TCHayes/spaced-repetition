import React from 'react';

export default function LoginPage() {
    return(
       <button className="loginBtn loginBtn--google">
        <a href={'/api/auth/google'}>Login with Google</a>
       </button>
}
