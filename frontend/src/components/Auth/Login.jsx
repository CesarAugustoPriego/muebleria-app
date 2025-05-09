import React from 'react';
import './Auth.css';
import heroBackground from '../../assets/img/imghero-bg.png'; // Mantenemos la imagen de fondo difusa
import logo from '../../assets/img/Logo.png'; // Logo

export default function Login({ onSubmit }) {
  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
      }}
    >
      <div className="login-box">
        <div className="logo-container">
          <img src={logo} alt="Logo de la empresa" className="logo" />
        </div>
        <h2 className="login-title">Inicia sesión</h2>
        <form className="login-form" onSubmit={onSubmit}>
          <input type="text" name="usuario" placeholder="Correo electronico" className="login-input" />
          <input type="password" name="password" placeholder="Contraseña" className="login-input" />
          <button type="submit" className="login-button">Entrar</button>
        </form>
        <a href="/registro" className="forgot-password">¿No tienes cuenta? Regístrate aquí</a>
      </div>
    </div>
  );
}
