const express = require('express');
const upload = require('../middleware/upload');
const {
  crearProducto,
  obtenerProductos,
  eliminarProducto    // <-- importamos
} = require('../controllers/productoController');

const router = express.Router();

router.post('/', upload.single('imagen'), crearProducto);
router.get('/', obtenerProductos);
router.delete('/:id', eliminarProducto);   // <-- añadimos la ruta DELETE

module.exports = router;
