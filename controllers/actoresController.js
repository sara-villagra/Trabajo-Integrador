//requerir modelo actor

const { Actor } = require('../models/actor.js')
const { Contenido } = require('../models/contenido.js')
//filtar actor con sus contenidos

const getActoresConContenido = async (req, res) => {
 try {
  const { id_actores } = req.params

  // Buscar actor
  const actor = await Actor.findByPk(id_actores, {
   include: [{ model: Contenido }]
  })

  // Validar
  if (!actor) return res.status(404).json({ message: 'Actor no encontrado' })

  res.json(actor)
 } catch (error) {
  res.status(500).json({ message: 'Error del servidor', error })
 }
}

// Crear un nuevo actor
const addActor = async (req, res) => {
 try {
  const { nombre, apellido } = req.body

  // Crear actor
  const actor = await Actor.create({
   nombre,
   apellido
  })
  // validar
  if (!actor) return res.status(400).send('No se pudo crear el actor')

  res
   .status(201)
   .json({ messagge: 'se agrego un nuevo actor con exito', actor })
 } catch (error) {
  res.status(500).json({ message: 'Error del servidor', error })
 }
}
module.exports = {
 addActor,
 getActoresConContenido
}
