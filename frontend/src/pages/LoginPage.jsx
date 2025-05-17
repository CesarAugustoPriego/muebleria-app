// frontend/src/pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar            from '../components/Auth/Navbar';
import Login             from '../components/Auth/Login';

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
    const usuario  = form.usuario.value.trim();
    const password = form.password.value.trim();

    if (!usuario || !password) {
      setError('Faltan campos');
      return;
    }

    try {
      // 1) Autenticación: obtenemos sólo el token
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: usuario, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || 'Credenciales inválidas');
        return;
      }

      // 2) Cargamos el perfil completo desde el backend
      const perfilRes = await fetch('/api/usuario/perfil', {
        headers: { Authorization: `Bearer ${data.token}` }
      });
      const perfil = await perfilRes.json();
      if (!perfilRes.ok) {
        throw new Error(perfil.msg || 'Error al cargar perfil');
      }

      // 3) Guardamos token + perfil en el contexto (y localStorage)
      login(data.token, perfil);

      // 4) Limpiamos carrito y compras de otras sesiones
      clearCart();
      clearPurchases();

      // 5) Redirigimos según rol
      if (perfil.rol === 'admin') {
        navigate('/admin/dashboard');
      } else if (perfil.rol === 'monitor') {
        navigate('/monitor');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error de conexión con el servidor');
    }
  };

  return (
    <>
      <Navbar />
      <Login onSubmit={handleLogin} error={error} />
      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
          {error}
        </div>
      )}
    </>
  );
}
