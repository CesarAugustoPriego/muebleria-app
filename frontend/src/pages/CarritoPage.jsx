// src/pages/CarritoPage.jsx
import React, { useState } from 'react';
import Navbar from '../components/Auth/Navbar';
import cama1 from '../assets/img/cama1.jpg';
import centro1 from '../assets/img/centro1.jpg';
import './CarritoPage.css';

const CarritoPage = () => {
  const [carrito, setCarrito] = useState([
    { id: 1, nombre: 'Cama Individual Moderna', precio: 4499, cantidad: 1, imagen: cama1 },
    { id: 2, nombre: 'Centro de Entretenimiento', precio: 3299, cantidad: 2, imagen: centro1 },
  ]);

  const [direccion, setDireccion] = useState({
    nombre: '', calle: '', ciudad: '', estado: '', codigoPostal: '', telefono: ''
  });
  const [direccionGuardada, setDireccionGuardada] = useState(false);
  const [mensajeDireccion, setMensajeDireccion] = useState('');

  const [metodoPago, setMetodoPago] = useState('');
  const [detallesPago, setDetallesPago] = useState({});
  const [pagoGuardado, setPagoGuardado] = useState(false);
  const [mensajePago, setMensajePago] = useState('');

  const [mensajeFinal, setMensajeFinal] = useState('');

  const eliminarItem = id => setCarrito(carrito.filter(item => item.id !== id));
  const cambiarCantidad = (id, qty) => {
    if (qty < 1) return;
    setCarrito(carrito.map(item => item.id === id ? { ...item, cantidad: qty } : item));
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const guardarDireccion = () => {
    setDireccionGuardada(true);
    setMensajeDireccion('📦 La dirección se ha guardado correctamente.');
  };

  const guardarMetodoPago = () => {
    setPagoGuardado(true);
    setMensajePago('💳 El método de pago se ha guardado correctamente.');
  };

  const manejarPago = () => {
    if (!direccionGuardada || !pagoGuardado) {
      alert('⚠️ Por favor guarda tu dirección y método de pago antes de continuar.');
      return;
    }
    setMensajeFinal('✅ El pago se ha realizado correctamente.');
  };

  return (
    <>
      <Navbar />
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
                    <button className="eliminar" onClick={() => eliminarItem(item.id)}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Dirección */}
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
    placeholder="Estado"
    value={direccion.estado}
    onChange={e => setDireccion({ ...direccion, estado: e.target.value })}
  />
  <input
    type="text"
    placeholder="Ciudad o municipio"
    value={direccion.ciudad}
    onChange={e => setDireccion({ ...direccion, ciudad: e.target.value })}
  />
  <input
    type="text"
    placeholder="Código postal"
    value={direccion.cp}
    onChange={e => setDireccion({ ...direccion, cp: e.target.value })}
  />
  <input
    type="text"
    placeholder="Calle"
    value={direccion.calle}
    onChange={e => setDireccion({ ...direccion, calle: e.target.value })}
  />
  <input
    type="tel"
    placeholder="Teléfono"
    value={direccion.telefono}
    onChange={e => setDireccion({ ...direccion, telefono: e.target.value })}
  />
  <input
    type="text"
    placeholder="Referencia (opcional)"
    value={direccion.referencia}
    onChange={e => setDireccion({ ...direccion, referencia: e.target.value })}
  />
  <button className="guardar-btn" onClick={guardarDireccion}>Guardar dirección</button>
  {mensajeDireccion && <p className="mensaje-confirmacion">{mensajeDireccion}</p>}
</div>


            {/* Método de Pago */}
            <div className="metodo-pago-section">
              <h3>💳 Método de Pago</h3>
              <select onChange={e => { setMetodoPago(e.target.value); setDetallesPago({}); }}>
                <option value="">Selecciona un método</option>
                <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                <option value="paypal">PayPal</option>
                <option value="efectivo">Efectivo</option>
              </select>

              {metodoPago === 'tarjeta' && (
                <>
                  <input type="text" placeholder="Número de tarjeta (16 dígitos)" onChange={e => setDetallesPago({ ...detallesPago, numero: e.target.value })} />
                  <input type="text" placeholder="MM/AA" onChange={e => setDetallesPago({ ...detallesPago, expiracion: e.target.value })} />
                  <input type="text" placeholder="CVV" onChange={e => setDetallesPago({ ...detallesPago, cvv: e.target.value })} />
                </>
              )}
              {metodoPago === 'paypal' && (
                <input type="email" placeholder="Correo de PayPal" onChange={e => setDetallesPago({ ...detallesPago, email: e.target.value })} />
              )}
              {metodoPago === 'efectivo' && <p>Seleccionaste pago en efectivo. Se pagará al recibir.</p>}

              <button className="guardar-btn" onClick={guardarMetodoPago}>Guardar Método de Pago</button>
              {mensajePago && <p className="mensaje-confirmacion">{mensajePago}</p>}
            </div>

            {/* Total y Pago */}
            <div className="resumen-carrito">
              <h3>Total: ${total.toLocaleString()} MXN</h3>
              <button className="pago-btn" onClick={manejarPago}>Proceder al pago</button>
              {mensajeFinal && <p className="mensaje-confirmacion">{mensajeFinal}</p>}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CarritoPage;