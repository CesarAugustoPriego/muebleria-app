import React from 'react';
import Login from '../components/Auth/Login';

export default function LoginPage() {
  const handleLogin = e => {
    e.preventDefault();
    // aquí tu lógica de login
  };

  return <Login onSubmit={handleLogin} />;
}
