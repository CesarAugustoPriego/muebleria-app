// backend/src/routes/producto.js
const express = require('express');
const upload = require('../middleware/upload');
const {
  crearProducto,
  obtenerProductos,
  eliminarProducto,
  getProductosPorModelo  // importamos la nueva función
} = require('../controllers/productoController');

const router = express.Router();

// Crear producto con imagen
router.post('/', upload.single('imagen'), crearProducto);

// Listar todos los productos
router.get('/', obtenerProductos);

// Listar productos de un modelo concreto
// Ejemplo: GET /api/productos/modelo/3
router.get('/modelo/:modeloId', getProductosPorModelo);

// Eliminar producto por ID
router.delete('/:id', eliminarProducto);

module.exports = router;
