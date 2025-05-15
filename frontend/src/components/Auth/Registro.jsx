import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Auth.css';
import heroBackground from '../../assets/img/imghero-bg.png';
import logo from '../../assets/img/Logo.png';

export default function Registro() {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validarDatos = () => {
    const { nombres, apellidos, email, telefono, password } = formData;

    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telRegex = /^\d{10}$/;

    if (!nombres || !apellidos || !email || !telefono || !password) {
      return 'Todos los campos son obligatorios';
    }

    if (!soloLetras.test(nombres)) {
      return 'El nombre solo debe contener letras';
    }

    if (!soloLetras.test(apellidos)) {
      return 'Los apellidos solo deben contener letras';
    }

    if (!emailRegex.test(email)) {
      return 'Correo electrónico inválido';
    }

    if (!telRegex.test(telefono)) {
      return 'El teléfono debe tener exactamente 10 dígitos numéricos';
    }

    if (password.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validacion = validarDatos();
    if (validacion) {
      setError(validacion);
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || 'Error desconocido');
      } else {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        window.location.href = '/login';
      }
    } catch (err) {
      console.error('Error en el registro:', err);
      setError('Error de conexión al servidor');
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
        <h2 className="login-title">Crea tu cuenta</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="registro-section">
            <input type="text" name="nombres" placeholder="Nombre" className="login-input" onChange={handleChange} />
            <input type="text" name="apellidos" placeholder="Apellidos" className="login-input" onChange={handleChange} />
          </div>
          <input type="email" name="email" placeholder="Correo electrónico" className="login-input" onChange={handleChange} />
          <input type="tel" name="telefono" placeholder="Teléfono" className="login-input" onChange={handleChange} />

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
              {mostrarPassword
                ? <FaEyeSlash />
                : <FaEye />
              }
            </button>
          </div>
          {error.password && <span className="input-error">{error.password}</span>}


          <button type="submit" className="login-button">Registrarse</button>
          <a href="/login" className="forgot-password">¿Ya tienes cuenta? Inicia sesión aquí</a>
          {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}