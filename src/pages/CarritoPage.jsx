// src/pages/CarritoPage.jsx
import React, { useState } from 'react';
import Navbar from '../components/Auth/Navbar';        // 1) Importa Navbar
import cama1 from '../assets/img/cama1.jpg';
import centro1 from '../assets/img/centro1.jpg';
import './CarritoPage.css';

const CarritoPage = () => {
  const [carrito, setCarrito] = useState([
    { id: 1, nombre: 'Cama Individual Moderna', precio: 4499, cantidad: 1, imagen: cama1 },
    { id: 2, nombre: 'Centro de Entretenimiento', precio: 3299, cantidad: 2, imagen: centro1 },
  ]);

  const eliminarItem = id => setCarrito(carrito.filter(item => item.id !== id));
  const cambiarCantidad = (id, qty) => {
    if (qty < 1) return;
    setCarrito(carrito.map(item => item.id === id ? { ...item, cantidad: qty } : item));
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const manejarPago = () => alert('⚠️ Antes de proceder al pago, revisa tu carrito.');

  return (
    <>
      <Navbar />                             {/* 2) Incluye Navbar */}
      <div className="carrito-container">
        <h2>🛒 Tu Carrito</h2>
        {carrito.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            <div className="carrito-items">
              {carrito.map(item => (
                <div key={item.id} className="carrito-item">
                  <img src={item.imagen} alt={item.nombre} />
                  <div className="item-info">
                    <h4>{item.nombre}</h4>
                    <p>${item.precio.toLocaleString()} MXN</p>
                    <div className="cantidad-control">
                      <label>Cantidad:</label>
                      <input
                        type="number"
                        min="1"
                        value={item.cantidad}
                        onChange={e => cambiarCantidad(item.id, parseInt(e.target.value))}
                      />
                    </div>
                    <button className="eliminar" onClick={() => eliminarItem(item.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="resumen-carrito">
              <h3>Total: ${total.toLocaleString()} MXN</h3>
              <button className="pago-btn" onClick={manejarPago}>Proceder al pago</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CarritoPage;
