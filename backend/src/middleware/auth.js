// backend/src/middleware/auth.js

require('dotenv').config();
const jwt = require('jsonwebtoken');

/**
 * auth middleware
 * - Espera un header Authorization con formato "Bearer <token>"
 * - Verifica y decodifica el JWT
 * - Anexa req.user = { id, rol }
 * - Responde 401 si falta o es inválido
 */
function auth(req, res, next) {
  // Tomar header (case-insensitive)
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  // Esperamos "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
    return res.status(401).json({ msg: 'Invalid token format' });
  }

  const token = parts[1];
  try {
    // Verificar y extraer payload
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload.id || !payload.rol) {
      return res.status(401).json({ msg: 'Token payload invalid' });
    }
    // Anexar usuario al request
    req.user = { id: payload.id, rol: payload.rol };
    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    return res.status(401).json({ msg: 'Invalid or expired token' });
  }
}

module.exports = auth;
