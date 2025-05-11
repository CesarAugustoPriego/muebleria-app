// backend/src/routes/venta.js
const router = require('express').Router();
const auth   = require('../middleware/auth');
const ctrl   = require('../controllers/ventaController');

router.get('/', auth, ctrl.listarVentas);

module.exports = router;
