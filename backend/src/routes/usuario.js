// src/routes/usuario.js
const express        = require('express');
const router         = express.Router();
const authMW         = require('../middleware/auth');
const usuarioCtrl    = require('../controllers/usuarioController');

router.get('/perfil', authMW, usuarioCtrl.getPerfil);

module.exports = router;
