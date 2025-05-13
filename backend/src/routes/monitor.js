// backend/src/routes/monitor.js
const express = require('express');
const router  = express.Router();
const { getMonitorData } = require('../controllers/monitorController');

// Ya no aplicamos requireAuth ni requireMonitorRole aquí,
// solo devolvemos las métricas directamente.
router.get('/', getMonitorData);

module.exports = router;
