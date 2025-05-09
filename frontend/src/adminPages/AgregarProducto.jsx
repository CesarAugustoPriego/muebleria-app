import React, { useState } from 'react';
import './AgregarProducto.css';
import Navbar from '../components/Auth/Navbar';

const AgregarProducto = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre,
      precio,
      categoria,
      imagen
    };

    console.log('Producto agregado:', nuevoProducto);

    setNombre('');
    setPrecio('');
    setCategoria('');
    setImagen(null);
  };

  return (
    <div className="agregar-producto-page">
      <Navbar />
      <div className="form-container">
        <h2>Agregar Nuevo Producto</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre del Mueble:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </label>

          <label>
            Costo:
            <input
              type="text"
              inputMode="decimal"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </label>

          <label>
            Categoría:
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="Camas">Camas</option>
              <option value="Literas">Literas</option>
              <option value="Escritorios">Escritorios</option>
              <option value="Armarios">Armarios</option>
              <option value="Tocadores">Tocadores</option>
              <option value="Sofás">Sofás</option>
              <option value="Mesas de centro">Mesas de centro</option>
              <option value="Libreros">Libreros</option>
              <option value="Centros de entretenimiento">Centros de entretenimiento</option>
              <option value="Comedores">Comedores</option>
              <option value="Cocinas Integrales">Cocinas Integrales</option>
              <option value="Alacenas">Alacenas</option>
            </select>
          </label>

          <label>
            Imagen del Producto:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImagen(e.target.files[0])}
              required
            />
          </label>

          <button type="submit">Agregar al catálogo</button>
        </form>
      </div>
    </div>
  );
};

export default AgregarProducto;
