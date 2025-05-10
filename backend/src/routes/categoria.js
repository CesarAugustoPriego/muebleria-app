const express = require('express');
const { obtenerCategorias } = require('../controllers/categoriaController');

const router = express.Router();
router.get('/', obtenerCategorias);

module.exports = router;
