const { sequelize } = require('../conexion/database.js')
const { DataTypes } = require('sequelize')
const { Actor } = require('./actor.js')
const { Contenido } = require('./contenido.js')
const Contenido_Actores = sequelize.define(
 'Contenido_Actores',
 {
  id_contenido_actores: {
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
  id_actores: {
   type: DataTypes.INTEGER,
   references: {
    model: Actor,
    key: 'id_actores'
   }
  }
 },
 {
  tableName: 'contenido_actores',
  timestamps: false
 }
)
// // Definir las relaciones
Contenido.belongsToMany(Actor, {
 through: 'Contenido_Actores',
 foreignKey: 'id_contenido'
})

Actor.belongsToMany(Contenido, {
 through: 'Contenido_Actores',
 foreignKey: 'id_actores'
})

module.exports = { Contenido_Actores }
