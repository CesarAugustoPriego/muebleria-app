// backend/src/routes/carrito.js
const router = require('express').Router();
const auth   = require('../middleware/auth');
const ctrl   = require('../controllers/carritoController');

// Obtener el carrito activo (o crearlo)
router.get('/', auth, ctrl.verCarrito);

// Agregar un producto al carrito
router.post('/agregar', auth, ctrl.agregarAlCarrito);

// Actualizar la cantidad o eliminar (si qty < 1)
router.put('/detalle/:id', auth, ctrl.actualizarCantidad);

// --- NUEVA RUTA: Checkout ---
// Cierra el carrito, crea la venta y los detalles, limpia el carrito
router.post('/checkout', auth, ctrl.checkout);

module.exports = router;
