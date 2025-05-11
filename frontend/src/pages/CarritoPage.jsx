// src/pages/CarritoPage.jsx
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Auth/Navbar'
import './CarritoPage.css'

export default function CarritoPage() {
  const [carrito, setCarrito] = useState(null)

  // 1) DIRECCIONES
  const [direcciones, setDirecciones] = useState([])
  const [direccion, setDireccion] = useState({
    nombre: '', calle: '', ciudad: '', estado: '', cp: '', telefono: '', referencia: ''
  })
  const [direccionGuardada, setDireccionGuardada] = useState(false)
  const [mensajeDireccion, setMensajeDireccion] = useState('')

  // 2) MÉTODOS DE PAGO
  const [metodos, setMetodos] = useState([])
  const [metodoPago, setMetodoPago] = useState('')
  const [detallesPago, setDetallesPago] = useState({
    numero: '', expiracion: '', cvv: '', email: ''
  })
  const [pagoGuardado, setPagoGuardado] = useState(false)
  const [mensajePago, setMensajePago] = useState('')

  // 3) ESTADO GENERAL
  const [mensajeFinal, setMensajeFinal] = useState('')
  const token = localStorage.getItem('token')
  const API = 'http://localhost:4000/api'

  // Al montar, traemos: carrito, direcciones y métodos
  useEffect(() => {
    // 3.1) carrito
    fetch(`${API}/carrito`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(setCarrito)
      .catch(console.error)

    // 3.2) direcciones
    fetch(`${API}/direcciones`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(dirs => {
        setDirecciones(dirs || [])
        if (dirs.length) {
          const d = dirs[0] // usamos la primera como “activa”
          setDireccion({
            nombre:    d.nombre_recibe,
            calle:     d.calle,
            ciudad:    d.ciudad,
            estado:    d.estado,
            cp:        d.cp,
            telefono:  d.telefono,
            referencia:d.referencia || ''
          })
          setDireccionGuardada(true)
          setMensajeDireccion('📦 Dirección cargada del servidor.')
        }
      })
      .catch(console.error)

    // 3.3) métodos de pago
    fetch(`${API}/metodos`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(mps => {
        setMetodos(mps || [])
        if (mps.length) {
          const m = mps[0]
          setMetodoPago(m.tipo === 'transferencia' ? 'paypal' : m.tipo)
          if (m.tipo === 'tarjeta') {
            setDetallesPago({
              numero:     m.titular || '',
              expiracion: '',
              cvv:        '',
              email:      ''
            })
          } else if (m.tipo === 'transferencia') {
            setDetallesPago({
              numero:     '',
              expiracion: '',
              cvv:        '',
              email:      m.titular || ''
            })
          }
          setPagoGuardado(true)
          setMensajePago('💳 Método de pago cargado del servidor.')
        }
      })
      .catch(console.error)
  }, [])

  if (!carrito) return <p>Cargando carrito…</p>

  // — Carrito: cantidad/eliminar
  const cambiarCantidad = (id, qty) => {
    fetch(`${API}/carrito/detalle/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ cantidad: qty })
    })
      .then(() => fetch(`${API}/carrito`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json()).then(setCarrito)
      )
      .catch(console.error)
  }
  const eliminarItem = id => cambiarCantidad(id, 0)

  // — Cálculo de total
  const total = carrito.detalles.reduce(
    (sum, d) => sum + d.producto.precio_unitario * d.cantidad,
    0
  )

  // — Guardar o actualizar Dirección
  const guardarDireccion = async () => {
    if (!direccion.nombre || !direccion.calle || !direccion.ciudad || !direccion.cp) {
      return alert('Completa nombre, calle, ciudad y código postal.')
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
          telefono:      direccion.telefono,
          referencia:    direccion.referencia
        })
      })
      const body = await res.json()
      if (!res.ok) throw new Error(body.msg || 'Error guardando dirección')
      setDireccionGuardada(true)
      setMensajeDireccion('📦 Dirección guardada en el servidor.')
    } catch (e) {
      alert('❌ ' + e.message)
    }
  }

  // — Guardar o actualizar Método de Pago
  const guardarMetodoPago = async () => {
    if (!metodoPago) return alert('Selecciona un método de pago.')
    const payload = { tipo: metodoPago === 'paypal' ? 'transferencia' : metodoPago }
    if (metodoPago === 'tarjeta') {
      const { numero, expiracion, cvv } = detallesPago
      if (!numero || !expiracion || !cvv) {
        return alert('Completa los datos de la tarjeta.')
      }
      payload.token_last4 = numero.slice(-4)
      payload.titular     = numero
    }
    if (metodoPago === 'paypal') {
      if (!detallesPago.email) {
        return alert('Introduce tu correo de PayPal.')
      }
      payload.titular = detallesPago.email
    }
    // efectivo no requiere datos

    try {
      const res = await fetch(`${API}/metodos`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
      const body = await res.json()
      if (!res.ok) throw new Error(body.msg || 'Error guardando método')
      setPagoGuardado(true)
      setMensajePago('💳 Método de pago guardado en el servidor.')
    } catch (e) {
      alert('❌ ' + e.message)
    }
  }

  // — Checkout final
  const manejarPago = async () => {
    if (!direccionGuardada || !pagoGuardado) {
      return alert('Guarda dirección y método de pago primero.')
    }
    try {
      const res = await fetch(`${API}/carrito/checkout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Error en checkout')
      setMensajeFinal('✅ Tu compra se ha procesado correctamente.')
    } catch (e) {
      alert('❌ ' + e.message)
    }
  }

  return (
    <>
      <Navbar />
      <div className="carrito-container">
        <h2>🛒 Tu Carrito</h2>

        {carrito.detalles.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            {/* Items */}
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

            {/* Dirección */}
            <div className="direccion-section">
              <h3>📦 Dirección de envío</h3>
              <input
                type="text" placeholder="Nombre completo"
                value={direccion.nombre}
                onChange={e => setDireccion({ ...direccion, nombre: e.target.value })}
              />
              <input
                type="text" placeholder="Calle"
                value={direccion.calle}
                onChange={e => setDireccion({ ...direccion, calle: e.target.value })}
              />
              <input
                type="text" placeholder="Ciudad"
                value={direccion.ciudad}
                onChange={e => setDireccion({ ...direccion, ciudad: e.target.value })}
              />
              <input
                type="text" placeholder="Estado"
                value={direccion.estado}
                onChange={e => setDireccion({ ...direccion, estado: e.target.value })}
              />
              <input
                type="text" placeholder="Código postal"
                value={direccion.cp}
                onChange={e => setDireccion({ ...direccion, cp: e.target.value })}
              />
              <input
                type="tel" placeholder="Teléfono"
                value={direccion.telefono}
                onChange={e => setDireccion({ ...direccion, telefono: e.target.value })}
              />
              <input
                type="text" placeholder="Referencia (opcional)"
                value={direccion.referencia}
                onChange={e => setDireccion({ ...direccion, referencia: e.target.value })}
              />
              <button className="guardar-btn" onClick={guardarDireccion}>
                Guardar dirección
              </button>
              {mensajeDireccion && <p className="mensaje-confirmacion">{mensajeDireccion}</p>}
            </div>

            {/* Método de pago */}
            <div className="metodo-pago-section">
              <h3>💳 Método de pago</h3>
              <select
                value={metodoPago}
                onChange={e => {
                  setMetodoPago(e.target.value)
                  setDetallesPago({ numero:'', expiracion:'', cvv:'', email:'' })
                }}
              >
                <option value="">Selecciona un método</option>
                {metodos.map(m =>
                  <option key={m.id} value={ m.tipo==='transferencia'?'paypal':m.tipo }>
                    { m.tipo === 'tarjeta'
                        ? `Tarjeta ••••${m.token_last4}`
                        : m.tipo === 'transferencia'
                          ? `PayPal (${m.titular})`
                          : 'Efectivo (Pago al recibir)'
                    }
                  </option>
                )}
                <option value="nuevo">+ Agregar nuevo método</option>
              </select>

              {metodoPago === 'tarjeta' || metodoPago === 'nuevo' && (
                <>
                  <input
                    type="text" placeholder="Número de tarjeta"
                    value={detallesPago.numero}
                    onChange={e => setDetallesPago({ ...detallesPago, numero: e.target.value })}
                  />
                  <input
                    type="text" placeholder="MM/AA"
                    value={detallesPago.expiracion}
                    onChange={e => setDetallesPago({ ...detallesPago, expiracion: e.target.value })}
                  />
                  <input
                    type="text" placeholder="CVV"
                    value={detallesPago.cvv}
                    onChange={e => setDetallesPago({ ...detallesPago, cvv: e.target.value })}
                  />
                </>
              )}
              {metodoPago === 'paypal' && (
                <input
                  type="email" placeholder="Correo de PayPal"
                  value={detallesPago.email}
                  onChange={e => setDetallesPago({ ...detallesPago, email: e.target.value })}
                />
              )}
              {metodoPago === 'efectivo' && <p>Se pagará al recibir.</p>}

              <button className="guardar-btn" onClick={guardarMetodoPago}>
                Guardar método de pago
              </button>
              {mensajePago && <p className="mensaje-confirmacion">{mensajePago}</p>}
            </div>

            {/* Resumen + Checkout */}
            <div className="resumen-carrito">
              <h3>Total: ${total.toLocaleString()} MXN</h3>
              <button className="pago-btn" onClick={manejarPago}>
                Proceder al pago
              </button>
              {mensajeFinal && <p className="mensaje-confirmacion">{mensajeFinal}</p>}
            </div>
          </>
        )}
      </div>
    </>
  )
}
