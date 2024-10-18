const { sequelize } = require('../conexion/database.js')
const { DataTypes } = require('sequelize')
const { Genero } = require('./genero.js')
const { Contenido } = require('./contenido.js')
const Contenido_Genero = sequelize.define(
 'Contenido_Genero',
 {
  id_contenido_genero: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   autoIncrement: true,
   allowNull: false,
   unique: true
  },
  id_contenido: {
   type: DataTypes.INTEGER,
   references: {
    model: Contenido,
    key: 'id_contenido'
   }
  },
  id_genero: {
   type: DataTypes.INTEGER,
   references: {
    model: Genero,
    key: 'id_genero'
   }
  }
 },
 {
  tableName: 'contenido_genero',
  timestamps: false
 }
)
// // Definir las relaciones
Contenido.belongsToMany(Genero, {
 through: 'Contenido_Genero',
 foreignKey: 'id_contenido'
})

Genero.belongsToMany(Contenido, {
 through: 'Contenido_Genero',
 foreignKey: 'id_genero'
})

module.exports = { Contenido_Genero }
