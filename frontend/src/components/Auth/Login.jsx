import React, { useState } from 'react';
import './Auth.css';
import heroBackground from '../../assets/img/imghero-bg.png';
import logo from '../../assets/img/Logo.png';

export default function Login({ onSubmit, error }) {
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });
  const [errores, setErrores] = useState({});
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    if (!formData.usuario) nuevosErrores.usuario = 'Este campo es obligatorio';
    if (!formData.password) nuevosErrores.password = 'Este campo es obligatorio';

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
    } else {
      setErrores({});
      onSubmit(e); // envía el form al componente padre
    }
  };

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
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="usuario"
            placeholder="Correo electrónico o usuario"
            className="login-input"
            onChange={handleChange}
          />
          {errores.usuario && <span className="input-error">{errores.usuario}</span>}

          <div className="password-field">
            <input
              type={mostrarPassword ? 'text' : 'password'}
              name="password"
              placeholder="Contraseña"
              className="login-input"
              onChange={handleChange}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setMostrarPassword(prev => !prev)}
            >
              {mostrarPassword ? 'Ocultar' : 'Ver'}
            </button>
          </div>
          {errores.password && <span className="input-error">{errores.password}</span>}

          <button type="submit" className="login-button">Entrar</button>
        </form>
        {error && <span className="input-error">{error}</span>}
        <a href="/registro" className="forgot-password">¿No tienes cuenta? Regístrate aquí</a>
      </div>
    </div>
  );
}