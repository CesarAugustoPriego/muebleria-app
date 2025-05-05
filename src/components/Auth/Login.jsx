import React from 'react';
import './Auth.css';

export default function Login({ onSubmit }) {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          {/* Aquí se puede agregar el logo de la empresa en el futuro */}
          <img src="/path-to-your-logo.png" alt="Logo" className="logo" />
        </div>
        <h2 className="login-title">Inicia sesión</h2>
        <form className="login-form" onSubmit={onSubmit}>
          <input type="text" name="usuario" placeholder="Usuario" className="login-input" />
          <input type="password" name="password" placeholder="Contraseña" className="login-input" />
          <button type="submit" className="login-button">Entrar</button>
        </form>
        <a href="/registro" className="forgot-password">¿No tienes cuenta? Regístrate aquí</a>
      </div>
    </div>
  );
}
