const express = require('express');
const router  = express.Router();
const auth = require('../middleware/auth');
const { getMonitorData } = require('../controllers/monitorController');

function soloMonitor(req, res, next) {
  if (req.user && req.user.rol === 'monitor') {
    return next();
  }
  return res.status(403).json({ msg: 'Acceso restringido solo para monitor' });
}

router.get('/', auth, soloMonitor, getMonitorData);

module.exports = router;
