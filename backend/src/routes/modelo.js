// backend/src/routes/modelo.js
const express = require('express');
const { obtenerModelos, obtenerModelosPorCategoria } = require('../controllers/modeloController');

const router = express.Router();

// Ruta para obtener todos los modelos
router.get('/', obtenerModelos);

// Nueva ruta para obtener solo los modelos de una categoría concreta
// Ejemplo: GET /api/modelos/categoria/3
router.get('/categoria/:categoriaId', obtenerModelosPorCategoria);

module.exports = router;
