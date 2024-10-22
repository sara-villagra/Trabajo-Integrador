const { Busqueda } = require('../models/busqueda.js')

//crear nueva busqueda
const addBusqueda = async (req, res) => {
 try {
  const { palabras_de_busqueda } = req.body
  console.log(palabras_de_busqueda)
  //validar
  if (!palabras_de_busqueda)
   return res.status(400).send('No se ingresaron las palabras de busqueda')

  const busqueda = await Busqueda.create({
   palabras_de_busqueda
  })
  if (!busqueda) return res.status(400).send('No se pudo crear la busqueda')

  res.status(201).send(busqueda)
 } catch (error) {
  res.status(500).json({ error: 'Error al crear la busqueda', error })
 }
}
module.exports = {
 addBusqueda
}
