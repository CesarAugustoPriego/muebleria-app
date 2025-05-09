const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id:            { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email:         { type: DataTypes.STRING, unique: true },
  username:      { type: DataTypes.STRING, unique: true },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  rol:           { type: DataTypes.ENUM('cliente','admin'), defaultValue: 'cliente' },
  nombres:       DataTypes.STRING,
  apellidos:     DataTypes.STRING,
  telefono:      DataTypes.STRING,
  direccion:     DataTypes.STRING,
  fecha_registro:{ type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'usuario',
  timestamps: false
});

module.exports = Usuario;
