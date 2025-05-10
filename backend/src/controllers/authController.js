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
  console.log("Buscando usuario con:", where);

  const u = await Usuario.findOne({ where });

  if (!u) {
    console.log("Usuario no encontrado");
    return res.status(404).json({ msg: 'Usuario no encontrado' });
  }

  const hash = crypto.createHash('sha256').update(password).digest('hex');

  console.log("Contraseña ingresada (hash):", hash);
  console.log("Contraseña en base de datos:", u.password_hash);

  if (hash !== u.password_hash) {
    console.log("Contraseña incorrecta");
    return res.status(401).json({ msg: 'Contraseña incorrecta' });
  }

  const token = jwt.sign(
    { id: u.id, rol: u.rol },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  console.log("Login exitoso para:", u.email);

  res.json({
    token,
    rol: u.rol,
    nombres: u.nombres,
    apellidos: u.apellidos
  });
};


//Función para register.
exports.register = async (req, res) => {
  const { nombres, apellidos, email, telefono, password } = req.body;

  if (!nombres || !apellidos || !email || !telefono || !password) {
    return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
  }

  try {

    const existente = await Usuario.findOne({ where: { email } });
    if (existente) {
      return res.status(409).json({ msg: 'El correo ya está registrado' });
    }

    const password_hash = crypto.createHash('sha256').update(password).digest('hex');

    const nuevoUsuario = await Usuario.create({
      nombres,
      apellidos,
      email,
      telefono,
      password_hash,
      rol: 'cliente'
    });

    res.status(201).json({ msg: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al registrar el usuario' });
  }
};