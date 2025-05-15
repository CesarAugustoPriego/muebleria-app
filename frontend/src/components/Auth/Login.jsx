// frontend/src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Auth.css';
import heroBackground from '../../assets/img/imghero-bg.png';
import logo from '../../assets/img/Logo.png';


export default function Login({ onSubmit, error }) {
  const [formData, setFormData] = useState({ usuario: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = {};
    if (!formData.usuario) errs.usuario = 'Obligatorio';
    if (!formData.password) errs.password = 'Obligatorio';

    if (Object.keys(errs).length) {
      setErrors(errs);
    } else {
      setErrors({});
      onSubmit(e);  // invoca handleLogin de LoginPage
    }
  };

  return (
    <div className="login-container" style={{
      backgroundImage: `url(${heroBackground})`,
      backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)'
    }}>
      <div className="login-box">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h2 className="login-title">Inicia sesión</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="usuario"
            placeholder="Usuario o correo"
            className="login-input"
            onChange={handleChange}
            value={formData.usuario}
          />
          {errors.usuario && <span className="input-error">{errors.usuario}</span>}

          <div className="password-field">
            <input
              type={showPwd ? 'text' : 'password'}
              name="password"
              placeholder="Contraseña"
              className="login-input"
              onChange={handleChange}
              value={formData.password}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPwd(p => !p)}
            >
              {showPwd
                ? <FaEyeSlash  />
                : <FaEye  />
              }
            </button>
          </div>
          {errors.password && <span className="input-error">{errors.password}</span>}

          <button type="submit" className="login-button">Entrar</button>
          {error && <span className="input-error">{error}</span>}
        </form>
        <a href="/registro" className="forgot-password">
          ¿No tienes cuenta? Regístrate aquí
        </a>
      </div>
    </div>
  );
}
