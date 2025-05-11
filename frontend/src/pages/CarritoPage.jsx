// src/pages/CarritoPage.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Auth/Navbar';
import './CarritoPage.css';

export default function CarritoPage() {
  const [carrito, setCarrito] = useState(null);

  // Estado para Dirección
  const [direccion, setDireccion] = useState({
    nombre: '', calle: '', ciudad: '', estado: '', cp: '', telefono: ''
  });
  const [direccionGuardada, setDireccionGuardada] = useState(false);
  const [mensajeDireccion, setMensajeDireccion] = useState('');

  // Estado para Método de Pago
  const [metodoPago, setMetodoPago] = useState('');
  const [detallesPago, setDetallesPago] = useState({
    numero: '', expiracion: '', cvv: '', email: ''
  });
  const [pagoGuardado, setPagoGuardado] = useState(false);
  const [mensajePago, setMensajePago] = useState('');

  const [mensajeFinal, setMensajeFinal] = useState('');
  const token = localStorage.getItem('token');
  const API   = 'http://localhost:4000/api';

  // 1) Cargar carrito
  const cargar = () => {
    fetch(`${API}/carrito`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(setCarrito)
      .catch(console.error);
  };
  useEffect(cargar, []);

  if (!carrito) return <p>Cargando carrito…</p>;

  // 2) Actualizar o eliminar ítem
  const cambiarCantidad = (id, qty) => {
    fetch(`${API}/carrito/detalle/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ cantidad: qty })
    }).then(cargar).catch(console.error);
  };
  const eliminarItem = id => cambiarCantidad(id, 0);

  // 3) Total
  const total = carrito.detalles.reduce(
    (sum, d) => sum + d.producto.precio_unitario * d.cantidad,
    0
  );

  // 4) Guardar dirección en el servidor
  const guardarDireccion = async () => {
    if (!direccion.nombre || !direccion.calle || !direccion.ciudad || !direccion.cp) {
      alert('Por favor completa nombre, calle, ciudad y código postal.');
      return;
    }
    try {
      const res = await fetch(`${API}/direcciones`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre_recibe: direccion.nombre,
          calle:         direccion.calle,
          ciudad:        direccion.ciudad,
          estado:        direccion.estado,
          cp:            direccion.cp,
          telefono:      direccion.telefono
        })
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.msg || 'Error guardando dirección');
      setDireccionGuardada(true);
      setMensajeDireccion('📦 Dirección guardada en el servidor.');
    } catch (e) {
      alert('❌ ' + e.message);
    }
  };

  // 5) Guardar método de pago en el servidor
  const guardarMetodoPago = async () => {
    if (metodoPago === '') {
      alert('Selecciona un método de pago.');
      return;
    }
    // Prepara payload
    let payload = { tipo: metodoPago };
    if (metodoPago === 'tarjeta') {
      const { numero, expiracion, cvv } = detallesPago;
      if (!numero || !expiracion || !cvv) {
        alert('Completa los datos de la tarjeta.');
        return;
      }
      payload.token_last4 = numero.slice(-4);
      payload.titular     = numero; 
    }
    if (metodoPago === 'paypal') {
      if (!detallesPago.email) {
        alert('Introduce tu correo de PayPal.');
        return;
      }
      payload.tipo        = 'transferencia'; // mapea PayPal a “transferencia”
      payload.titular     = detallesPago.email;
    }
    // efectivo no necesita datos extra

    try {
      const res = await fetch(`${API}/metodos`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.msg || 'Error guardando método');
      setPagoGuardado(true);
      setMensajePago('💳 Método de pago guardado en el servidor.');
    } catch (e) {
      alert('❌ ' + e.message);
    }
  };

  // 6) Procesar pago (checkout)
  const manejarPago = async () => {
    if (!direccionGuardada || !pagoGuardado) {
      alert('Guarda tu dirección y método de pago antes de continuar.');
      return;
    }
    try {
      const res = await fetch(`${API}/carrito/checkout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Error en checkout');
      setMensajeFinal('✅ Tu compra se ha procesado correctamente.');
    } catch (e) {
      alert('❌ ' + e.message);
    }
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
                        onChange={e => cambiarCantidad(d.id, +e.target.value || 1)}
                      />
                    </div>
                    <button className="eliminar" onClick={() => eliminarItem(d.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* === Dirección de envío === */}
            <div className="direccion-section">
              <h3>📦 Dirección de envío</h3>
              <input
                type="text"
                placeholder="Nombre completo"
                value={direccion.nombre}
                onChange={e => setDireccion({ ...direccion, nombre: e.target.value })}
              />
              <input
                type="text"
                placeholder="Calle"
                value={direccion.calle}
                onChange={e => setDireccion({ ...direccion, calle: e.target.value })}
              />
              <input
                type="text"
                placeholder="Ciudad"
                value={direccion.ciudad}
                onChange={e => setDireccion({ ...direccion, ciudad: e.target.value })}
              />
              <input
                type="text"
                placeholder="Estado"
                value={direccion.estado}
                onChange={e => setDireccion({ ...direccion, estado: e.target.value })}
              />
              <input
                type="text"
                placeholder="Código postal"
                value={direccion.cp}
                onChange={e => setDireccion({ ...direccion, cp: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={direccion.telefono}
                onChange={e => setDireccion({ ...direccion, telefono: e.target.value })}
              />
              <button className="guardar-btn" onClick={guardarDireccion}>
                Guardar dirección
              </button>
              {mensajeDireccion && (
                <p className="mensaje-confirmacion">{mensajeDireccion}</p>
              )}
            </div>

            {/* === Método de Pago === */}
            <div className="metodo-pago-section">
              <h3>💳 Método de pago</h3>
              <select
                value={metodoPago}
                onChange={e => {
                  setMetodoPago(e.target.value);
                  setDetallesPago({ numero:'', expiracion:'', cvv:'', email:'' });
                }}
              >
                <option value="">Selecciona un método</option>
                <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                <option value="paypal">PayPal</option>
                <option value="efectivo">Efectivo</option>
              </select>

              {metodoPago === 'tarjeta' && (
                <>
                  <input
                    type="text"
                    placeholder="Número de tarjeta (16 dígitos)"
                    value={detallesPago.numero}
                    onChange={e => setDetallesPago({ ...detallesPago, numero: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="MM/AA"
                    value={detallesPago.expiracion}
                    onChange={e => setDetallesPago({ ...detallesPago, expiracion: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={detallesPago.cvv}
                    onChange={e => setDetallesPago({ ...detallesPago, cvv: e.target.value })}
                  />
                </>
              )}
              {metodoPago === 'paypal' && (
                <input
                  type="email"
                  placeholder="Correo de PayPal"
                  value={detallesPago.email}
                  onChange={e => setDetallesPago({ ...detallesPago, email: e.target.value })}
                />
              )}
              {metodoPago === 'efectivo' && (
                <p>Seleccionaste pago en efectivo. Se pagará al recibir.</p>
              )}

              <button className="guardar-btn" onClick={guardarMetodoPago}>
                Guardar método de pago
              </button>
              {mensajePago && (
                <p className="mensaje-confirmacion">{mensajePago}</p>
              )}
            </div>

            {/* === Resumen y Pago === */}
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
