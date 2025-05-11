const { DataTypes } = require('sequelize');
const sequelize     = require('../config/database');

const DireccionEnvio = sequelize.define('DireccionEnvio', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fk_usuario: { type: DataTypes.INTEGER, allowNull: false },
  nombre_recibe: { type: DataTypes.STRING, allowNull: false },
  calle: { type: DataTypes.STRING, allowNull: false },
  ciudad: { type: DataTypes.STRING, allowNull: false },
  estado: { type: DataTypes.STRING },
  cp: { type: DataTypes.STRING, allowNull: false },
  telefono: { type: DataTypes.STRING }
}, {
  tableName: 'direccion_envio',
  timestamps: false
});

module.exports = DireccionEnvio;
