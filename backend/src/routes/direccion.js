// backend/src/routes/direccion.js
const router = require('express').Router();
const auth   = require('../middleware/auth');
const ctrl   = require('../controllers/direccionController');

router.get('/',    auth, ctrl.listarDirecciones);
router.post('/',   auth, ctrl.crearDireccion);
router.put('/:id', auth, ctrl.actualizarDireccion);

module.exports = router;
