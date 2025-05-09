const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
require('dotenv').config();

exports.login = async (req, res) => {
  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).json({ msg: 'Faltan campos' });
  }

  const where = user.includes('@') ? { email: user } : { username: user };
  const u = await Usuario.findOne({ where });

  if (!u) {
    return res.status(404).json({ msg: 'Usuario no encontrado' });
  }

  const hash = crypto.createHash('sha256').update(password).digest('hex');

  if (hash !== u.password_hash) {
    return res.status(401).json({ msg: 'Contraseña incorrecta' });
  }

  const token = jwt.sign(
    { id: u.id, rol: u.rol },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({
    token,
    rol: u.rol,
    nombres: u.nombres,
    apellidos: u.apellidos
  });
};
