import React from 'react';
import './Auth.css';
import heroBackground from '../../assets/img/imghero-bg.png';
import logo from '../../assets/img/Logo.png';

export default function Registro({ onSubmit }) {
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
        <h2 className="login-title">Crea tu cuenta</h2>
        <form className="login-form" onSubmit={onSubmit}>
          <div className="registro-section">
            <input type="text" name="nombre" placeholder="Nombre" className="login-input" />
            <input type="text" name="apellidos" placeholder="Apellidos" className="login-input" />
          </div>
          <input type="email" name="correo" placeholder="Correo electrónico" className="login-input" />
          <input type="tel" name="telefono" placeholder="Teléfono" className="login-input" />
          <input type="password" name="password" placeholder="Contraseña" className="login-input" />
          <button type="submit" className="login-button">Registrarse</button>
          <a href="/login" className="forgot-password">¿Ya tienes cuenta? Inicia sesión aquí</a>
        </form>
      </div>
    </div>
  );
}
