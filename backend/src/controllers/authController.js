// backend/src/controllers/authController.js
const crypto    = require('crypto');
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const Usuario   = require('../models/Usuario');
const { registrarAuditoria } = require('../utils/auditoria'); // Importar función auditoría
require('dotenv').config();

/**
 * Registro de usuario (usa bcrypt para el hash)
 */
async function register(req, res) {
  const { nombres, apellidos, email, telefono, password } = req.body;
  if (!nombres || !apellidos || !email || !telefono || !password) {
    return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar email único
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.status(409).json({ msg: 'El correo ya está registrado' });
    }

    // Hashear la contraseña con bcrypt
    const password_hash = await bcrypt.hash(password, 10);

    // Crear usuario con rol por defecto 'cliente'
    const nuevo = await Usuario.create({
      nombres,
      apellidos,
      email,
      telefono,
      password_hash,
      rol: 'cliente'
    });

    // REGISTRO DE AUDITORÍA sin pasar usuario (se resuelve en util)
    await registrarAuditoria({
      usuario_id: nuevo.id,
      accion: 'CREAR',
      entidad: 'usuario',
      entidad_id: nuevo.id,
      detalles: {
        nombres,
        apellidos,
        email,
        telefono,
        rol: 'cliente'
      }
    });

    return res.status(201).json({ msg: 'Usuario registrado con éxito' });
  } catch (err) {
    console.error('Error al registrar:', err);
    return res.status(500).json({ msg: 'Error al registrar el usuario' });
  }
}

/**
 * Login híbrido SHA-256 ↔ bcrypt, y generación de JWT con rol
 */
async function login(req, res) {
  const { user, password } = req.body;
  if (!user || !password) {
    return res.status(400).json({ msg: 'Faltan campos' });
  }

  try {
    // Buscar por email o username
    const where = user.includes('@')
      ? { email: user }
      : { username: user };

    const u = await Usuario.findOne({ where });
    if (!u) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    const hashStored = u.password_hash;
    let passwordMatch = false;

    // 1) Si el hash almacenado es bcrypt (empieza con $2)
    if (hashStored.startsWith('$2')) {
      passwordMatch = await bcrypt.compare(password, hashStored);
    } else {
      // 2) Si es SHA-256 (legacy)
      const shaHash = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex');
      passwordMatch = shaHash === hashStored;

      // 3) Migrar a bcrypt on-the-fly
      if (passwordMatch) {
        const newBcrypt = await bcrypt.hash(password, 10);
        u.password_hash = newBcrypt;
        await u.save();
      }
    }

    if (!passwordMatch) {
      return res.status(401).json({ msg: 'Contraseña incorrecta' });
    }

    // Generar JWT incluyendo rol
    const token = jwt.sign(
      { id: u.id, rol: u.rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({
      token,
      rol:      u.rol,
      nombres:  u.nombres,
      apellidos:u.apellidos
    });
  } catch (err) {
    console.error('Error en login:', err);
    return res.status(500).json({ msg: 'Error en el servidor' });
  }
}

module.exports = { register, login };
