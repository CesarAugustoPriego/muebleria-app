// backend/src/controllers/monitorController.js
const sequelize = require('../config/database');
const { QueryTypes } = require('sequelize');

exports.getMonitorData = async (req, res) => {
  try {
    // 1) Estadísticas globales de MySQL
    const [statusRows] = await sequelize.query(`
      SHOW GLOBAL STATUS
      WHERE Variable_name IN (
        'Threads_connected',
        'Uptime',
        'Queries',
        'Slow_queries',
        'Bytes_sent',
        'Bytes_received'
      );
    `);

    const stats = {};
    statusRows.forEach(r => {
      stats[r.Variable_name] = Number(r.Value);
    });

    // 2) Top 5 consultas más frecuentes
    const [digestRows] = await sequelize.query(`
      SELECT
        DIGEST_TEXT  AS query,
        COUNT_STAR   AS count
      FROM performance_schema.events_statements_summary_by_digest
      ORDER BY COUNT_STAR DESC
      LIMIT 5;
    `);

    const topQueries = digestRows.map(r => ({
      query: r.query,
      count: r.count
    }));

    // 3) Usuarios totales
    const [{ totalUsuarios }] = await sequelize.query(
      'SELECT COUNT(*) AS totalUsuarios FROM usuario', { type: QueryTypes.SELECT }
    );

    // 4) Ventas del último mes y monto total
    const [{ totalVentas, montoTotal }] = await sequelize.query(`
      SELECT COUNT(*) AS totalVentas, COALESCE(SUM(total),0) AS montoTotal
      FROM venta
      WHERE fecha >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    `, { type: QueryTypes.SELECT });

    // 5) Tablas más grandes
    const tablas = await sequelize.query(`
      SELECT table_name AS nombre, ROUND(data_length/1024/1024,2) AS data_mb
      FROM information_schema.tables
      WHERE table_schema = DATABASE()
      ORDER BY data_mb DESC
      LIMIT 5
    `, { type: QueryTypes.SELECT });


    // 6) Respuesta completa
    return res.json({
      threadsConnected: stats.Threads_connected,
      uptime:           stats.Uptime,
      totalQueries:     stats.Queries,
      slowQueries:      stats.Slow_queries,
      bytesSent:        stats.Bytes_sent,
      bytesReceived:    stats.Bytes_received,
      topQueries,
      totalUsuarios,
      totalVentas,
      montoTotal,
      tablas
    });
  }
  catch (error) {
    console.error('Error en monitorController:', error);
    return res.status(500).json({ error: 'Error obteniendo métricas de MySQL' });
  }
};
