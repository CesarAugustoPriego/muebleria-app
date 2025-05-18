// backend/src/routes/comentarios.js
const { Router }         = require('express');
const { obtenerComentarios, guardarComentario } = require('../controllers/comentarioController');

const ruta = Router();
ruta.get('/', obtenerComentarios);
ruta.post('/', guardarComentario);

module.exports = ruta;
