const express = require('express');
const { obtenerModelos } = require('../controllers/modeloController');

const router = express.Router();
router.get('/', obtenerModelos);

module.exports = router;
