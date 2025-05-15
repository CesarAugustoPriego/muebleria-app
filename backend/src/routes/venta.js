// backend/src/routes/venta.js

const express   = require('express');
const router    = express.Router();
const auth      = require('../middleware/auth');
const ventaCtrl = require('../controllers/ventaController');

// Middleware para restringir rutas sólo a administradores
function isAdmin(req, res, next) {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ msg:'Acceso denegado: admin requerido' });
  }
  next();
}

// Listar ventas de un usuario (o todas si eres admin)
// Cliente ve sólo sus ventas; Admin ve todas
router.get('/', auth, ventaCtrl.listarVentas);

// Sólo admin puede cambiar estado
router.put('/:id/estado', auth, isAdmin, ventaCtrl.actualizarEstado);

module.exports = router;
