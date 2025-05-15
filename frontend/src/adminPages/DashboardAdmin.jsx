import React, { useState, useEffect } from 'react';
import Navbar from '../components/Auth/Navbar';
import './DashboardAdmin.css';

const API_BASE = 'http://localhost:4000/api';

export default function DashboardAdmin() {
  const [compras, setCompras] = useState([]);
  const [stats, setStats]     = useState({ mes: 0, semana: 0, ano: 0 });
  const token = localStorage.getItem('token');

  // 1) Traer ventas al montar
  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_BASE}/ventas`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setCompras(data);
    })();
  }, [token]);

  // 2) Calcular estadísticas cuando cambian las compras
  useEffect(() => {
    const hoy = new Date();
    let mes = 0, sem = 0, ano = 0;

    compras.forEach(c => {
      const f     = new Date(c.fecha),
            total = parseFloat(c.total);
      if (f.getFullYear() === hoy.getFullYear()) ano += total;
      if (f.getMonth()    === hoy.getMonth())    mes += total;
      if ((hoy - f) / (1000 * 60 * 60 * 24) <= 7) sem += total;
    });

    setStats({ mes, semana: sem, ano });
  }, [compras]);

  // 3) Solo actualiza UI al cambiar el select
  const handleEstadoChange = (id, nuevo) => {
    setCompras(prev =>
      prev.map(c => c.id === id ? { ...c, estado: nuevo } : c)
    );
  };

  // 4) Guarda el estado en el servidor al clicar “Guardar”
  const guardarEstado = async (id) => {
    try {
      const compra = compras.find(c => c.id === id);
      const res = await fetch(`${API_BASE}/ventas/${id}/estado`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ estado: compra.estado })
      });
      const json = await res.json();
      if (!res.ok) return alert(json.msg || 'Error actualizando estado');
      alert('Estado actualizado correctamente');
    } catch (e) {
      console.error(e);
      alert('Error al conectar con el servidor');
    }
  };

  const opciones = [
    { value: 'pedido',     label: 'Pedido'    },
    { value: 'enviado',    label: 'Enviado'   },
    { value: 'en reparto', label: 'En reparto'},
    { value: 'entregado',  label: 'Entregado' }
  ];

  return (
    <div className="dashboard-admin">
      <Navbar />

      {/* Botones de acción */}
      <div className="acciones-container" style={{ margin: '1rem 0', display: 'flex', gap: '1rem' }}>
        <button
          className="btn btn-primary"
          onClick={() => window.location.href = '/admin/agregar-producto'}
        >
          Agregar Producto al Catálogo
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => window.location.href = '/admin/productos'}
        >
          Ver Productos Existentes
        </button>
      </div>

      <h2>Dashboard Admin</h2>

      <div className="ingresos-cards">
        <div><h4>Mes</h4><p>${stats.mes.toFixed(2)}</p></div>
        <div><h4>Semana</h4><p>${stats.semana.toFixed(2)}</p></div>
        <div><h4>Año</h4><p>${stats.ano.toFixed(2)}</p></div>
      </div>

      <table className="tabla-compras">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Fecha</th>
            <th>Dirección</th>
            <th>Estado</th>
            <th>Pago</th>
            <th>Monto</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {compras.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.usuario.nombres} {c.usuario.apellidos}</td>
              <td>{new Date(c.fecha).toLocaleString()}</td>
              <td>
                {c.direccionDeVenta
                  ? `${c.direccionDeVenta.calle}, ${c.direccionDeVenta.ciudad}`
                  : 'Recoger'}
              </td>
              <td>
                <select
                  value={c.estado}
                  onChange={e => handleEstadoChange(c.id, e.target.value)}
                >
                  {opciones.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </td>
              <td>{c.metodoDeVenta.tipo}</td>
              <td>${parseFloat(c.total).toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => guardarEstado(c.id)}
                >
                  Guardar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
