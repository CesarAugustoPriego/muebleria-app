// frontend/src/components/FormularioComentario.jsx
import { useState } from 'react';

export default function FormularioComentario({ onExito }) {
  const [nombre_cliente, setNombre] = useState('');
  const [comentario, setComentario] = useState('');
  const [estado, setEstado] = useState('normal'); // 'normal' | 'enviando' | 'exito' | 'error'

  const alEnviar = async e => {
    e.preventDefault();
    if (!nombre_cliente.trim() || !comentario.trim()) return;

    setEstado('enviando');
    try {
      const respuesta = await fetch('/api/comentarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre_cliente, comentario })
      });
      const dato = await respuesta.json();
      setEstado('exito');
      setNombre('');
      setComentario('');
      onExito(dato);
    } catch {
      setEstado('error');
    }
  };

  return (
    <form className="form-opinion" onSubmit={alEnviar}>
      <input
        name="nombre_cliente"
        type="text"
        placeholder="Tu nombre"
        value={nombre_cliente}
        onChange={e => setNombre(e.target.value)}
        required
      />
      <textarea
        name="comentario"
        placeholder="Tu opinión"
        value={comentario}
        onChange={e => setComentario(e.target.value)}
        rows={4}
        required
      />
      <button type="submit"
        className='btn primary'
        disabled={estado === 'enviando'}>
        {estado === 'enviando' ? 'Enviando…' : 'Enviar opinión'}
      </button>

      {estado === 'exito' && <p className="mensaje-exito">¡Gracias por tu opinión!</p>}
      {estado === 'error' && <p className="mensaje-error">Error al enviar, vuelve a intentar.</p>}
    </form>
  );
}
