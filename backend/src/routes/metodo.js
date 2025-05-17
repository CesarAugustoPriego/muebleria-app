const router = require('express').Router();
const auth   = require('../middleware/auth');
const ctrl   = require('../controllers/metodoController');

// Middleware para permitir sólo rol cliente
function soloCliente(req, res, next) {
  if (req.user?.rol === 'cliente') {
    return next();
  }
  return res.status(403).json({ msg: 'Acceso restringido solo para clientes' });
}

router.get('/',    auth, soloCliente, ctrl.listarMetodos);
router.post('/',   auth, soloCliente, ctrl.crearMetodo);
router.delete('/:id', auth, soloCliente, ctrl.eliminarMetodo);

module.exports = router;
