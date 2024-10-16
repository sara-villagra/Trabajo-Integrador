// Model for Actor
const { sequelize } = require('../conexion/database.js')
const { DataTypes } = require('sequelize')

const Actor = sequelize.define(
 'Actor',
 {
  id_actores: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   autoIncrement: true,
   allowNull: false,
   unique: true
  },
  nombre: {
   type: DataTypes.STRING(100),
   allowNull: false
  },
  apellido: {
   type: DataTypes.STRING(100),
   allowNull: false
  }
 },
 {
  tableName: 'actores',
  timestamps: false
 }
)

module.exports = { Actor }
