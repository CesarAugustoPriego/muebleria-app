const express = require('express');
const { getAuditoria } = require('../controllers/auditoriaController');
const auth = require('../middleware/auth');
const router = express.Router();

// Middleware para restringir acceso sólo a monitores
function soloMonitor(req, res, next) {
  console.log('User en soloMonitor:', req.user);
  if (req.user?.rol === 'monitor') {
    return next();
  }
  return res.status(403).json({ msg: 'Acceso restringido solo para monitor' });
}

// Orden: primero auth para validar token, luego soloMonitor para verificar rol
router.get('/', auth, soloMonitor, getAuditoria);

module.exports = router;
