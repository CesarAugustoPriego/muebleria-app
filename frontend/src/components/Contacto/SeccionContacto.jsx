// frontend/src/components/Contacto/SeccionContacto.jsx
import React, { useState } from 'react';

export default function SeccionContacto() {
  const [nombre, setNombre]   = useState('');
  const [correo, setCorreo]   = useState('');
  const [asunto, setAsunto]   = useState('');
  const [mensaje, setMensaje] = useState('');
  const [status, setStatus]   = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, asunto, mensaje })
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.msg);
      setStatus('sent');
      setNombre(''); setCorreo(''); setAsunto(''); setMensaje('');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className="section contacto">
      <h2>Contacto</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="contacto-nombre">Tu nombre</label>
        <input
          id="contacto-nombre"
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />

        <label htmlFor="contacto-correo">Tu correo</label>
        <input
          id="contacto-correo"
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
          required
        />

        <label htmlFor="contacto-asunto">Asunto</label>
        <input
          id="contacto-asunto"
          type="text"
          placeholder="Asunto"
          value={asunto}
          onChange={e => setAsunto(e.target.value)}
          required
        />

        <label htmlFor="contacto-mensaje">Mensaje</label>
        <textarea
          id="contacto-mensaje"
          placeholder="Mensaje"
          rows="4"
          value={mensaje}
          onChange={e => setMensaje(e.target.value)}
          required
        />

        <button
          type="submit"
          className="btn primary"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Enviando…' : 'Enviar'}
        </button>

        {status === 'sent'  && <p className="mensaje-exito">¡Mensaje enviado!</p>}
        {status === 'error' && <p className="mensaje-error">Error al enviar.</p>}
      </form>
    </section>
  );
}
