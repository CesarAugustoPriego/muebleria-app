const { DataTypes } = require('sequelize');
const sequelize     = require('../config/database');

const Producto = sequelize.define('Producto', {
  id:             { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre:         { type: DataTypes.STRING },
  descripcion:    { type: DataTypes.TEXT },
  imagen_url:     { type: DataTypes.STRING },
  existencia:     { type: DataTypes.INTEGER },
  precio_unitario:{ type: DataTypes.DECIMAL(10,2) },
  fk_categoria:   { type: DataTypes.INTEGER },
  fk_modelo:      { type: DataTypes.INTEGER }
}, {
  tableName: 'producto',
  timestamps: false
});

// ← Definimos las asociaciones necesarias:
Producto.associate = db => {
  Producto.belongsTo(db.Modelo_mueble, {
    as: 'modelo',       // alias exacto que usaremos en include
    foreignKey: 'fk_modelo'
  });
  Producto.belongsTo(db.Categoria, {
    as: 'categoria',    // si necesitas acceder directo a categoría
    foreignKey: 'fk_categoria'
  });
};

module.exports = Producto;