import React from 'react';
import {SERVER_ROOT} from '../config';

export default function LoginPage() {
    return <a href={`${SERVER_ROOT}/auth/google`}>Login with Google</a>;
}
