const express = require('express');
const { getAuditoria } = require('../controllers/auditoriaController');
const auth = require('../middleware/auth');
const router = express.Router();

function soloMonitor(req, res, next) {
  // Para depuración, imprime el usuario y rol
  console.log('User en soloMonitor:', req.user);
  if (req.user && req.user.rol === 'monitor') {
    return next();
  }
  return res.status(403).json({ msg: 'Acceso restringido solo para monitor' });
}

// OJO: Primero auth, luego soloMonitor, luego el controlador
router.get('/', auth, soloMonitor, getAuditoria);

module.exports = router;
