// frontend/src/components/ListaComentarios.jsx
export default function ListaComentarios({ datos }) {
  return (
    <div className="lista-opiniones">
      {datos.map(c => (
        <div key={c.id} className="tarjeta-opinion">
          <p className="texto">“{c.comentario}”</p>
          <p className="autor">— {c.nombre_cliente}</p>
        </div>
      ))}
    </div>
  );
}
