// backend/src/routes/contacto.js
const { Router }            = require('express');
const { enviarContacto }    = require('../controllers/contactoController');

const ruta = Router();
ruta.post('/', enviarContacto);

module.exports = ruta;