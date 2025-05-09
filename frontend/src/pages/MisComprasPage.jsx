import React from 'react';
import Navbar from '../components/Auth/Navbar';
import cama1 from '../assets/img/cama1.jpg';  // Usamos la misma imagen del carrito
import centro1 from '../assets/img/centro1.jpg';  // Usamos la misma imagen del carrito
import './MisComprasPage.css';

const comprasEjemplo = [
  {
    id: 1,
    fecha: '2025-05-03',
    total: 7798,
    estado: 'Enviado',  // Estado del pedido
    productos: [
      { nombre: 'Cama Individual Moderna', cantidad: 1, precio: 4499, imagen: cama1 },
      { nombre: 'Centro de Entretenimiento', cantidad: 1, precio: 3299, imagen: centro1 },
    ],
  },
  {
    id: 2,
    fecha: '2025-04-25',
    total: 3299,
    estado: 'En Proceso',
    productos: [
      { nombre: 'Centro de Entretenimiento', cantidad: 1, precio: 3299, imagen: centro1 },
    ],
  },
];

const MisComprasPage = () => {
  return (
    <>
      <Navbar />
      <div className="mis-compras-container">
        <h2>📦 Mis Compras</h2>
        {comprasEjemplo.length === 0 ? (
          <p>No tienes compras registradas.</p>
        ) : (
          comprasEjemplo.map((compra) => (
            <div key={compra.id} className="compra-card">
              <h3>Compra #{compra.id} - {compra.fecha}</h3>
              <p><strong>Estado del Pedido:</strong> {compra.estado}</p>
              <div className="productos">
                {compra.productos.map((prod, i) => (
                  <div key={i} className="producto">
                    <img src={prod.imagen} alt={prod.nombre} />
                    <div className="producto-info">
                      <h4>{prod.nombre}</h4>
                      <p>{prod.cantidad} x ${prod.precio.toLocaleString()} MXN</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="total">Total: ${compra.total.toLocaleString()} MXN</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MisComprasPage;
