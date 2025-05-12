// frontend/src/pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Auth/Login';

import { AuthContext }     from '../contexts/AuthContext';
import { CartContext }     from '../contexts/CartContext';
import { PurchaseContext } from '../contexts/PurchaseContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { login }           = useContext(AuthContext);
  const { clearCart }       = useContext(CartContext);
  const { clearPurchases }  = useContext(PurchaseContext);

  const handleLogin = async e => {
    e.preventDefault();
    const form     = e.target;
    const usuario  = form.usuario.value;
    const password = form.password.value;

    // Validación mínima
    if (!usuario || !password) {
      setError('Faltan campos');
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Envía user y password tal como lo lee tu authController
        body: JSON.stringify({ user: usuario, password })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || 'Credenciales inválidas');
        return;
      }

      // 1) Actualiza el contexto de autenticación
      login(data.token, { rol: data.rol, nombres: data.nombres });

      // 2) Limpia carrito y compras de sesiones anteriores
      clearCart();
      clearPurchases();

      // 3) Redirige según rol
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
