import React, { useEffect, useState } from 'react';
import Navbar from '../components/Auth/Navbar';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';
import './MonitorPage.css';

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

// Función para formato de tiempo en hh:mm:ss
function formatTime(s) {
  const hrs = Math.floor(s / 3600);
  const min = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${hrs}h ${min}m ${sec}s`;
}

export default function MonitorPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/monitor')
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch(err => setError(err.message));
  }, []);

  if (error) return <p className="monitor-error">Error: {error}</p>;
  if (!data) return <p className="monitor-loading">Cargando métricas…</p>;

  return (
    <>
      <Navbar />
      <div className="monitor-container" style={{ marginTop: '60px' }}>
        <h1>Dashboard de Monitoreo MySQL y Mueblería</h1>

        <div className="cards">
          <div className="card">
            <strong>{data.threadsConnected}</strong>
            <span>Conexiones activas</span>
          </div>
          <div className="card">
            <strong>{data.totalQueries}</strong>
            <span>Consultas totales</span>
          </div>
          <div className={`card ${data.slowQueries > 10 ? "alerta" : ""}`}>
            <strong>{data.slowQueries}</strong>
            <span>Consultas lentas {data.slowQueries > 10 && "⚠️"}</span>
          </div>
          <div className="card">
            <strong>{formatTime(data.uptime)}</strong>
            <span>Tiempo activo</span>
          </div>
          <div className="card">
            <strong>{data.totalUsuarios}</strong>
            <span>Usuarios registrados</span>
          </div>
          <div className="card">
            <strong>{data.totalVentas}</strong>
            <span>Ventas (últimos 30 días)</span>
          </div>
          <div className="card">
            <strong>${Number(data.montoTotal).toLocaleString()}</strong>
            <span>Monto total (últimos 30 días)</span>
          </div>
        </div>

        <div className="section-divider"></div>

        <div className="charts-row">
          <div className="chart-card">
            <Bar
              data={{
                labels: ['Bytes enviados', 'Bytes recibidos'],
                datasets: [{
                  label: 'Transferencia (bytes)',
                  data: [data.bytesSent, data.bytesReceived],
                  borderWidth: 1,
                  backgroundColor: ['#74b9ff', '#55efc4'],
                }]
              }}
              options={{ responsive: true }}
            />
          </div>
          <div className="chart-card">
            <Line
              data={{
                labels: data.topQueries.map((_, i) => `#${i + 1}`),
                datasets: [{
                  label: 'Top 5 Consultas',
                  data: data.topQueries.map(q => q.count),
                  tension: 0.3,
                  fill: false,
                  borderColor: "#6366f1",
                  pointBorderWidth: 3,
                  pointRadius: 5,
                  backgroundColor: "#a5b4fc"
                }]
              }}
              options={{ responsive: true }}
            />
          </div>
        </div>

        <div className="section-divider"></div>

        <section className="top-list">
          <h2>Detalle de las 5 Consultas más frecuentes</h2>
          <ul>
            {data.topQueries.map((q, i) => (
              <li key={i}>
                <strong>{q.count}x</strong> {q.query}
              </li>
            ))}
          </ul>
        </section>

        <section className="top-list">
          <h2>Tablas más grandes de la base de datos</h2>
          <ul>
            {data.tablas.map((tabla, i) => (
              <li key={i}>
                <strong title={tabla.nombre}>{tabla.nombre}:</strong> {tabla.data_mb} MB
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
