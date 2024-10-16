//requerir modelo actor

const { Actor } = require('../models/actor.js')

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
  res.status(500).send('Hubo un error en el server')
 }
}
module.exports = {
 addActor
}
