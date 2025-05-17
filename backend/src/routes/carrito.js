const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/carritoController');

// Middleware para permitir sólo rol cliente
function soloCliente(req, res, next) {
  if (req.user?.rol === 'cliente') {
    return next();
  }
  return res.status(403).json({ msg: 'Acceso restringido solo para clientes' });
}

// Obtener el carrito activo (o crearlo) - sólo cliente
router.get('/', auth, soloCliente, ctrl.verCarrito);

// Agregar un producto al carrito - sólo cliente
router.post('/agregar', auth, soloCliente, ctrl.agregarAlCarrito);

// Actualizar la cantidad o eliminar (si qty < 1) - sólo cliente
router.put('/detalle/:id', auth, soloCliente, ctrl.actualizarCantidad);

// Checkout - sólo cliente
router.post('/checkout', auth, soloCliente, ctrl.checkout);

module.exports = router;
