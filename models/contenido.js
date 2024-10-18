// Model for Contenido
const { sequelize } = require('../conexion/database.js')
const { DataTypes } = require('sequelize')
const { Categoria } = require('./categoria.js')

const Contenido = sequelize.define(
 'Contenido',
 {
  id_contenido: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   autoIncrement: true,
   allowNull: false,
   unique: true
  },
  poster: {
   type: DataTypes.STRING(100),
   allowNull: true,
   default: 1
  },
  titulo: {
   type: DataTypes.STRING(100),
   allowNull: false
  },
  id_categoria: {
   type: DataTypes.INTEGER,
   references: {
    model: Categoria,
    key: 'id_categoria'
   }
  },
  resumen: {
   type: DataTypes.TEXT,
   allowNull: false
  },
  gen: {
   type: DataTypes.STRING(100),
   allowNull: false
  },
  temporada: {
   type: DataTypes.STRING(20),
   allowNull: true,
   default: 'N/A'
  },
  duracion: {
   type: DataTypes.STRING(100),
   allowNull: true,
   default: 'N/A,'
  },
  trailer: {
   type: DataTypes.STRING(100),
   allowNull: false
  }
 },
 {
  tableName: 'contenido',
  timestamps: false
 }
)
// // Definir las relaciones
Categoria.hasMany(Contenido, {
 foreignKey: 'id_categoria'
})

Contenido.belongsTo(Categoria, {
 foreignKey: 'id_categoria'
})

module.exports = { Contenido }
