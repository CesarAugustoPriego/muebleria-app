import React from 'react';
import Login from '../components/Auth/Registro';

export default function RegistroPage() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Registro</h2>
        <form className="login-form">
          <input type="text" placeholder="Nombre" className="login-input" />
          <input type="text" placeholder="Apellidos" className="login-input" />
          <input type="email" placeholder="Correo electrónico" className="login-input" />
          <input type="tel" placeholder="Teléfono" className="login-input" />
          <input type="password" placeholder="Contraseña" className="login-input" />
          <button type="submit" className="login-button">Registrarse</button>
          <a href="/login" className="forgot-password">¿Ya tienes cuenta? Inicia sesión aquí</a>
        </form>
      </div>
    </div>
  );
}
