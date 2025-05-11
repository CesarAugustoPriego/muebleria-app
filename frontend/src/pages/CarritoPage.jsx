import React, { useEffect, useState } from 'react';
import Navbar from '../components/Auth/Navbar';
import './CarritoPage.css';

export default function CarritoPage() {
  const [carrito, setCarrito] = useState(null);
  const [dirGuardada, setDirGuardada] = useState(false);
  const [pagoGuardado, setPagoGuardado] = useState(false);
  const [mensajeFinal, setMensajeFinal] = useState('');
  const token = localStorage.getItem('token');
  const API = 'http://localhost:4000/api';

  // 1) Carga el carrito
  const cargar = () => {
    fetch(`${API}/carrito`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setCarrito)
      .catch(console.error);
  };
  useEffect(cargar, []);

  if (!carrito) return <p>Cargando carrito…</p>;

  // 2) Actualizar/eliminar cantidad
  const cambiarCantidad = (id, qty) => {
    fetch(`${API}/carrito/detalle/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ cantidad: qty })
    })
      .then(() => cargar())
      .catch(console.error);
  };
  const eliminarItem = id => cambiarCantidad(id, 0);

  // 3) Total
  const total = carrito.detalles.reduce(
    (sum, d) => sum + d.producto.precio_unitario * d.cantidad,
    0
  );

  // 4) Pago (solo local por ahora)
  const manejarPago = () => {
    if (!dirGuardada || !pagoGuardado) {
      return alert('⚠️ Guarda antes dirección y método de pago');
    }
    setMensajeFinal('✅ Pago realizado correctamente.');
  };

  return (
    <>
      <Navbar />
      <div className="carrito-container">
        <h2>🛒 Tu Carrito</h2>
        {carrito.detalles.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            <div className="carrito-items">
              {carrito.detalles.map(d => (
                <div key={d.id} className="carrito-item">
                  <img
                    src={`http://localhost:4000${d.producto.imagen_url}`}
                    alt={d.producto.nombre}
                  />
                  <div className="item-info">
                    <h4>{d.producto.nombre}</h4>
                    <p>${d.producto.precio_unitario.toLocaleString()} MXN</p>
                    <div className="cantidad-control">
                      <label>Cantidad:</label>
                      <input
                        type="number"
                        min="1"
                        value={d.cantidad}
                        onChange={e =>
                          cambiarCantidad(d.id, +e.target.value || 1)
                        }
                      />
                    </div>
                    <button
                      className="eliminar"
                      onClick={() => eliminarItem(d.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* DIRECCIÓN (igual que antes) */}
            <div className="direccion-section">
              <h3>📦 Dirección de envío</h3>
              {/* ... inputs ... */}
              <button
                className="guardar-btn"
                onClick={() => setDirGuardada(true)}
              >
                Guardar dirección
              </button>
              {dirGuardada && (
                <p className="mensaje-confirmacion">
                  📦 Dirección guardada correctamente
                </p>
              )}
            </div>

            {/* MÉTODO DE PAGO (igual que antes) */}
            <div className="metodo-pago-section">
              <h3>💳 Método de pago</h3>
              {/* ... selects/inputs ... */}
              <button
                className="guardar-btn"
                onClick={() => setPagoGuardado(true)}
              >
                Guardar método de pago
              </button>
              {pagoGuardado && (
                <p className="mensaje-confirmacion">
                  💳 Método guardado correctamente
                </p>
              )}
            </div>

            {/* RESUMEN */}
            <div className="resumen-carrito">
              <h3>Total: ${total.toLocaleString()} MXN</h3>
              <button className="pago-btn" onClick={manejarPago}>
                Proceder al pago
              </button>
              {mensajeFinal && (
                <p className="mensaje-confirmacion">{mensajeFinal}</p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
