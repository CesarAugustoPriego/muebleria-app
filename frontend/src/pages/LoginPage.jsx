import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Auth/Login';

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const user = form.usuario.value;
    const password = form.password.value;

    try {
      const res = await fetch('/api/auth/login', { // 🔧 URL corregida
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || 'Error desconocido'); // 🔴 Captura mensaje del backend
        return;
      }

      // Guardar token
      localStorage.setItem('token', data.token);
      localStorage.setItem('rol', data.rol);
      localStorage.setItem('nombres', data.nombres);

      // Redirigir según rol
      if (data.rol === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <>
      <Login onSubmit={handleLogin} error={error} />
      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
          {error}
        </div>
      )}
    </>
  );
}