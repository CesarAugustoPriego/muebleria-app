// backend/src/controllers/authController.js
const crypto   = require('crypto');
const jwt      = require('jsonwebtoken');
const Usuario  = require('../models/Usuario');
require('dotenv').config();

exports.register = async (req, res) => {
  // Ahora recibimos "nombres" y "apellidos" tal como los envía tu formulario
  const { nombres, apellidos, email, telefono, password } = req.body;

  if (!nombres || !apellidos || !email || !telefono || !password) {
    return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar si el correo ya existe
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.status(409).json({ msg: 'El correo ya está registrado' });
    }

    // Hashear la contraseña
    const password_hash = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    // Crear usuario en la base usando los mismos nombres de columna
    const nuevo = await Usuario.create({
      nombres,       // antes: nombres: nombre
      apellidos,     // antes: apellidos: apellido
      email,
      telefono,
      password_hash,
      rol: 'cliente'
    });

    return res.status(201).json({ msg: 'Usuario registrado con éxito' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Error al registrar el usuario' });
  }
};

exports.login = async (req, res) => {
  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).json({ msg: 'Faltan campos' });
  }

  try {
    const where = user.includes('@')
      ? { email: user }
      : { username: user };

    const u = await Usuario.findOne({ where });
    if (!u) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    const hash = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    if (hash !== u.password_hash) {
      return res.status(401).json({ msg: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: u.id, rol: u.rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({
      token,
      rol: u.rol,
      nombres: u.nombres,
      apellidos: u.apellidos
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Error en el servidor' });
  }
};
