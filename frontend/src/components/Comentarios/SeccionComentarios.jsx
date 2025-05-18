// frontend/src/components/SeccionComentarios.jsx
import { useEffect, useState } from 'react';
import FormularioComentario from './FormularioComentario';
import ListaComentarios     from './ListaComentarios';

export default function SeccionComentarios() {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    fetch('/api/comentarios')
      .then(r => r.json())
      .then(setComentarios)
      .catch(console.error);
  }, []);

  const alAgregar = nuevo => {
    setComentarios([nuevo, ...comentarios]);
  };

  return (
    <section id="opiniones" className="section">
      <h2>Lo que dicen nuestros clientes</h2>

      <FormularioComentario onExito={alAgregar} />

      <ListaComentarios datos={comentarios} />
    </section>
  );
}
