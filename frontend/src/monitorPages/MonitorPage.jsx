import React, { useEffect, useState } from 'react';
import { Bar, Line }                  from 'react-chartjs-2';
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

export default function MonitorPage() {
  const [data,  setData]  = useState(null);
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
  if (!data)  return <p className="monitor-loading">Cargando métricas…</p>;

  return (
    <div className="monitor-container">
      <h1>Dashboard de Monitoreo MySQL</h1>

      <div className="cards">
        <div className="card">
          <strong>{data.threadsConnected}</strong>
          <span>Conexiones activas</span>
        </div>
        <div className="card">
          <strong>{data.totalQueries}</strong>
          <span>Consultas totales</span>
        </div>
        <div className="card">
          <strong>{data.slowQueries}</strong>
          <span>Consultas lentas</span>
        </div>
        <div className="card">
          <strong>{data.uptime}s</strong>
          <span>Tiempo activo</span>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <Bar
            data={{
              labels: ['Bytes enviados', 'Bytes recibidos'],
              datasets: [{
                label: 'Transferencia (bytes)',
                data: [data.bytesSent, data.bytesReceived],
                borderWidth: 1
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
              }]
            }}
            options={{ responsive: true }}
          />
        </div>
      </div>

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
    </div>
  );
}
