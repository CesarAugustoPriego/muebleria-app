// src/controllers/usuarioController.js
const { Usuario } = require('../models');

exports.getPerfil = async (req, res) => {
  try {
    // req.user.id y req.user.rol vienen de tu auth middleware
    const u = await Usuario.findByPk(req.user.id, {
      attributes: [
        'id',
        'username',
        'nombres',
        'apellidos',
        'rol',
        'email',
        'telefono',
        'direccion',
        'fecha_registro'
      ]
    });
    if (!u) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Devuelve todo el objeto user; el front elegirá cómo mostrarlo
    return res.json(u);
  } catch (err) {
    console.error('Get perfil error:', err);
    return res.status(500).json({ msg: 'Error al cargar perfil' });
  }
};
