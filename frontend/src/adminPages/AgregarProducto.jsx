// frontend/src/adminPages/AgregarProducto.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './AgregarProducto.css';
import Navbar from '../components/Auth/Navbar';
import { AuthContext } from '../contexts/AuthContext';

export default function AgregarProducto() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [categorias, setCategorias]             = useState([]);
  const [todosModelos, setTodosModelos]         = useState([]);
  const [modelosFiltrados, setModelosFiltrados] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [modeloSeleccionado, setModeloSeleccionado]       = useState('');
  const [preview, setPreview]                   = useState(null);
  const [error, setError]                       = useState('');

  // Carga inicial de categorías y modelos
  useEffect(() => {
    fetch('/api/categorias')
      .then(r => r.json())
      .then(setCategorias)
      .catch(console.error);

    fetch('/api/modelos')
      .then(r => r.json())
      .then(setTodosModelos)
      .catch(console.error);
  }, []);

  // Filtrar modelos cuando cambia la categoría
  useEffect(() => {
    if (!categoriaSeleccionada) {
      setModelosFiltrados([]);
      setModeloSeleccionado('');
      return;
    }
    const filtrados = todosModelos.filter(
      m => String(m.fk_categoria) === categoriaSeleccionada
    );
    setModelosFiltrados(filtrados);
    setModeloSeleccionado('');
  }, [categoriaSeleccionada, todosModelos]);

  const handleCategoriaChange = e => {
    setCategoriaSeleccionada(e.target.value);
  };

  const handleModeloChange = e => {
    setModeloSeleccionado(e.target.value);
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    const form = e.target;
    const fd   = new FormData();
    fd.append('nombre', form.nombre.value);
    fd.append('descripcion', form.descripcion.value);
    fd.append('precio', form.precio.value);
    fd.append('existencia', form.existencia.value);
    fd.append('fk_categoria', categoriaSeleccionada);
    fd.append('fk_modelo', modeloSeleccionado);
    fd.append('imagen', form.imagen.files[0]);

    try {
      const res = await fetch('/api/producto', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          // ¡No añadas Content-Type! El browser se encarga
        },
        body: fd
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.msg || `Error ${res.status}`);
      }

      alert('✅ Producto agregado');
      form.reset();
      setPreview(null);
      setCategoriaSeleccionada('');
      setModelosFiltrados([]);
      setModeloSeleccionado('');
      navigate('/admin/productos');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="agregar-producto-page">
      <Navbar />
      <div className="form-container">
        <h2>Agregar Producto</h2>
        {error && <p className="error">ERROR: {error}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>
            Nombre
            <input type="text" name="nombre" required />
          </label>

          <label>
            Descripción
            <textarea name="descripcion" required />
          </label>

          <label>
            Precio
            <input type="number" name="precio" step="0.01" required />
          </label>

          <label>
            Stock
            <input type="number" name="existencia" required />
          </label>

          <label>
            Categoría
            <select
              name="fk_categoria"
              value={categoriaSeleccionada}
              onChange={handleCategoriaChange}
              required
            >
              <option value="" disabled>-- Selecciona categoría --</option>
              {categorias.map(c => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </label>

          <label>
            Modelo
            <select
              name="fk_modelo"
              value={modeloSeleccionado}
              onChange={handleModeloChange}
              disabled={!modelosFiltrados.length}
              required
            >
              <option value="" disabled>
                {!categoriaSeleccionada
                  ? '-- Primero elige categoría --'
                  : modelosFiltrados.length
                  ? '-- Selecciona modelo --'
                  : '-- Sin modelos disponibles --'}
              </option>
              {modelosFiltrados.map(m => (
                <option key={m.id} value={m.id}>
                  {m.modelo}
                </option>
              ))}
            </select>
          </label>

          <label>
            Imagen
            <input
              type="file"
              name="imagen"
              accept="image/*"
              required
              onChange={handleImageChange}
            />
          </label>

          {preview && (
            <div className="preview-container">
              <img src={preview} alt="Vista previa" className="preview-image" />
            </div>
          )}

          <button type="submit">Guardar Producto</button>
        </form>
      </div>
    </div>
  );
}
