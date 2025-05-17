const express = require('express');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const {
  crearProducto,
  obtenerProductos,
  eliminarProducto,
  getProductosPorModelo,
  obtenerTopVendidos
} = require('../controllers/productoController');

const router = express.Router();

// Crear producto con imagen - requiere autenticación y, idealmente, rol admin
router.post('/', auth, upload.single('imagen'), crearProducto);

// Listar todos los productos - pública o protegida según necesidad
router.get('/', obtenerProductos);

// Listar productos de un modelo concreto - pública
router.get('/modelo/:modeloId', getProductosPorModelo);

// Lista de los 3 productos más vendidos - pública
router.get('/top-vendidos', obtenerTopVendidos);

// Eliminar producto por ID - requiere autenticación y, idealmente, rol admin
router.delete('/:id', auth, eliminarProducto);

module.exports = router;
