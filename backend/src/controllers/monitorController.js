// backend/src/controllers/monitorController.js
const sequelize = require('../config/database');

exports.getMonitorData = async (req, res) => {
  try {
    // 1) Estadísticas globales
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

    // convertir a objeto para acceso fácil
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

    // 3) Devolvemos todo
    return res.json({
      threadsConnected: stats.Threads_connected,
      uptime:            stats.Uptime,
      totalQueries:      stats.Queries,
      slowQueries:       stats.Slow_queries,
      bytesSent:         stats.Bytes_sent,
      bytesReceived:     stats.Bytes_received,
      topQueries
    });
  }
  catch (error) {
    console.error('Error en monitorController:', error);
    return res.status(500).json({ error: 'Error obteniendo métricas de MySQL' });
  }
};
