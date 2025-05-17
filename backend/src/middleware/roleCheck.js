/**
 * Middleware para validar si el usuario tiene un rol permitido para la ruta.
 * @param {Array<string>} allowedRoles - Lista de roles permitidos para acceder.
 */
function roleCheck(allowedRoles = []) {
  return (req, res, next) => {
    const userRole = req.user?.rol;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ msg: 'Acceso denegado: permiso insuficiente' });
    }
    next();
  };
}

module.exports = roleCheck;
