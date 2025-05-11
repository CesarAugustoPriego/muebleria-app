// routes/carrito.js
const router = require('express').Router();
const auth   = require('../middleware/auth');
const ctrl   = require('../controllers/carritoController');

router.get ('/',            auth, ctrl.verCarrito);
router.post('/agregar',     auth, ctrl.agregarAlCarrito);
router.put ('/detalle/:id', auth, ctrl.actualizarCantidad);

module.exports = router;
