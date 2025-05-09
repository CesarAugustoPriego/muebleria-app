import React, { useState, useEffect } from 'react';
import './DashboardAdmin.css';
import Navbar from '../components/Auth/Navbar'; // Si usas un navbar compartido

const DashboardAdmin = () => {
  const [compras, setCompras] = useState([]);
  const [ingresosMensuales, setIngresosMensuales] = useState(0);
  const [ingresosSemanales, setIngresosSemanales] = useState(0);
  const [ingresosAnuales, setIngresosAnuales] = useState(0);

  useEffect(() => {
    // Simulación de compras de ejemplo para el Dashboard
    // Dentro del array de datosDeCompras (simulación):
const datosDeCompras = [
    {
      id: 1,
      nombre: 'Sofá Moderno',
      usuario: 'Juan Pérez',
      fecha: '2025-05-01 14:30',
      estado: 'Pedido',
      metodoPago: 'Tarjeta de Crédito',
      monto: 5000.0,
      direccion: 'Calle Falsa 123, CDMX',
    },
    {
      id: 2,
      nombre: 'Librero Minimalista',
      usuario: 'Ana García',
      fecha: '2025-05-02 10:15',
      estado: 'Enviado',
      metodoPago: 'PayPal',
      monto: 2500.0,
      direccion: 'Recoger en tienda',
    },
    {
      id: 3,
      nombre: 'Mesa de Centro Estilo Vintage',
      usuario: 'Carlos López',
      fecha: '2025-04-15 09:45',
      estado: 'Entregado',
      metodoPago: 'Efectivo',
      monto: 3500.0,
      direccion: 'Av. Reforma 456, Monterrey',
    },
  ];
  

    setCompras(datosDeCompras);

    // Calcular los ingresos totales para mes, semana y año
    const hoy = new Date();
    const ingresosMensuales = datosDeCompras.filter(compra => {
      const fechaCompra = new Date(compra.fecha);
      return fechaCompra.getMonth() === hoy.getMonth() && fechaCompra.getFullYear() === hoy.getFullYear();
    }).reduce((acc, compra) => acc + compra.monto, 0);

    const ingresosSemanales = datosDeCompras.filter(compra => {
      const fechaCompra = new Date(compra.fecha);
      const semanaActual = Math.floor((hoy - fechaCompra) / (7 * 24 * 60 * 60 * 1000));
      return semanaActual <= 1;
    }).reduce((acc, compra) => acc + compra.monto, 0);

    const ingresosAnuales = datosDeCompras.filter(compra => {
      const fechaCompra = new Date(compra.fecha);
      return fechaCompra.getFullYear() === hoy.getFullYear();
    }).reduce((acc, compra) => acc + compra.monto, 0);

    setIngresosMensuales(ingresosMensuales);
    setIngresosSemanales(ingresosSemanales);
    setIngresosAnuales(ingresosAnuales);
  }, []);

  const cambiarEstado = (id, nuevoEstado) => {
    const nuevasCompras = compras.map(compra =>
      compra.id === id ? { ...compra, estado: nuevoEstado } : compra
    );
    setCompras(nuevasCompras);
  };

  return (
    <div className="dashboard-admin">
      <Navbar />
      <div className="dashboard-container">
        <h2>Dashboard del Administrador</h2>

        {/* Sección de Ingresos - Desglose por mes, semana y año */}
        <div className="ingresos-container">
          <h3>Ingresos</h3>
          <div className="ingresos-cards">
            <div className="ingresos-card">
              <h4>Ingresos de Este Mes</h4>
              <p>${ingresosMensuales.toFixed(2)}</p>
            </div>
            <div className="ingresos-card">
              <h4>Ingresos de Esta Semana</h4>
              <p>${ingresosSemanales.toFixed(2)}</p>
            </div>
            <div className="ingresos-card">
              <h4>Ingresos del Año</h4>
              <p>${ingresosAnuales.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="acciones-container">
          <button className="agregar-producto-btn" onClick={() => window.location.href = '/admin/agregar-producto'}>
            Agregar Producto al Catálogo
          </button>
        </div>

        <div className="compras-container">
          <h3>Compras Realizadas</h3>
          <table>
          <thead>
  <tr>
    <th>ID</th>
    <th>Producto</th>
    <th>Usuario</th>
    <th>Fecha</th>
    <th>Dirección de Entrega</th>
    <th>Estado</th>
    <th>Método de Pago</th>
    <th>Monto</th>
    <th>Acción</th>
  </tr>
</thead>
<tbody>
  {compras.map(compra => (
    <tr key={compra.id}>
      <td>{compra.id}</td>
      <td>{compra.nombre}</td>
      <td>{compra.usuario}</td>
      <td>{compra.fecha}</td>
      <td>{compra.direccion}</td>
      <td>
        <select
          value={compra.estado}
          onChange={(e) => cambiarEstado(compra.id, e.target.value)}
        >
          <option value="Pedido">Pedido</option>
          <option value="Enviado">Enviado</option>
          <option value="En reparto">En reparto</option>
          <option value="Entregado">Entregado</option>
        </select>
      </td>
      <td>{compra.metodoPago}</td>
      <td>${compra.monto.toFixed(2)}</td>
      <td>
        <button onClick={() => alert(`Compra ${compra.id} actualizada`)}>Actualizar</button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
