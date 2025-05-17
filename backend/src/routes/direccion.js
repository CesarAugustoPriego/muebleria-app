const router = require('express').Router();
const auth   = require('../middleware/auth');
const ctrl   = require('../controllers/direccionController');

// Middleware para permitir sólo rol cliente
function soloCliente(req, res, next) {
  if (req.user?.rol === 'cliente') {
    return next();
  }
  return res.status(403).json({ msg: 'Acceso restringido solo para clientes' });
}

router.get('/',    auth, soloCliente, ctrl.listarDirecciones);
router.post('/',   auth, soloCliente, ctrl.crearDireccion);
router.put('/:id', auth, soloCliente, ctrl.actualizarDireccion);

module.exports = router;
