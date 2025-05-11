// backend/src/routes/metodo.js
const router = require('express').Router();
const auth   = require('../middleware/auth');
const ctrl   = require('../controllers/metodoController');

router.get('/',    auth, ctrl.listarMetodos);
router.post('/',   auth, ctrl.crearMetodo);
router.delete('/:id', auth, ctrl.eliminarMetodo);  // ← aquí

module.exports = router;
