import React, { useState, useEffect } from 'react';
import './AgregarProducto.css';
import Navbar from '../components/Auth/Navbar';

export default function AgregarProducto() {
  const [categorias, setCategorias] = useState([]);
  const [modelos, setModelos]       = useState([]);

  useEffect(() => {
    fetch('/api/categorias').then(r => r.json()).then(setCategorias);
    fetch('/api/modelos').then(r => r.json()).then(setModelos);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const fd = new FormData();
    fd.append('nombre', form.nombre.value);
    fd.append('descripcion', form.descripcion.value);
    fd.append('precio', form.precio.value);
    fd.append('existencia', form.existencia.value);
    fd.append('fk_categoria', form.fk_categoria.value);
    fd.append('fk_modelo', form.fk_modelo.value);
    fd.append('imagen', form.imagen.files[0]);

    const res = await fetch('/api/productos', { method: 'POST', body: fd });
    if (res.ok) {
      alert('✅ Agregado');
      form.reset();
    } else {
      alert('❌ Error');
    }
  };

  return (
    <div className="agregar-producto-page">
      <Navbar />
      <div className="form-container">
        <h2>Agregar Producto</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre<input name="nombre" required /></label>
          <label>Descripción<textarea name="descripcion" required /></label>
          <label>Precio<input name="precio" type="number" step="0.01" required /></label>
          <label>Stock<input name="existencia" type="number" required /></label>
          <label>
            Categoría
            <select name="fk_categoria" required>
              <option value="">--</option>
              {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </label>
          <label>
            Modelo
            <select name="fk_modelo" required>
              <option value="">--</option>
              {modelos.map(m => <option key={m.id} value={m.id}>{m.modelo}</option>)}
            </select>
          </label>
          <label>Imagen<input name="imagen" type="file" accept="image/*" required /></label>
          <button type="submit">Guardar Producto</button>
        </form>
      </div>
    </div>
  );
}
