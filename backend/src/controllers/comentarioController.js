// backend/src/controllers/comentarioController.js
const { QueryTypes } = require('sequelize');
const db = require('../config/database');

// GET /api/comentarios
exports.obtenerComentarios = async (req, res) => {
  try {
    const comentarios = await db.query(
      'SELECT id, nombre_cliente, comentario, fecha_creacion ' +
      'FROM comentarios ORDER BY fecha_creacion DESC',
      { type: QueryTypes.SELECT }
    );
    res.json(comentarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener comentarios' });
  }
};

// POST /api/comentarios
exports.guardarComentario = async (req, res) => {
  const { nombre_cliente, comentario } = req.body;
  try {
    // Insert
    await db.query(
      'INSERT INTO comentarios (nombre_cliente, comentario) VALUES (?, ?)',
      {
        replacements: [nombre_cliente, comentario],
        type: QueryTypes.INSERT
      }
    );

    // Recuperar creado
    const [nuevo] = await db.query(
      'SELECT id, nombre_cliente, comentario, fecha_creacion ' +
      'FROM comentarios WHERE id = LAST_INSERT_ID()',
      { type: QueryTypes.SELECT }
    );

    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al guardar comentario' });
  }
};
