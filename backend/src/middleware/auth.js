// backend/src/middleware/auth.js
module.exports = (req, res, next) => {
  // TODO: reemplazar con verificación JWT real
  req.user = { id: 1 };
  next();
};
