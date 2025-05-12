const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/auth');
const ventaCtrl = require('../controllers/ventaController');

// Antes tenías '/ventas' aquí; lo cambiamos a '/'
router.get('/', auth, ventaCtrl.listarVentas);

module.exports = router;
