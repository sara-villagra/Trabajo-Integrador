//const router = require('express').Router()
const { Contenido } = require('../models/contenido')

const getAllContenido = async (req, res) => {
 try {
  const contenido = await Contenido.findAll()
  if (!contenido) {
   res.status(404).send('No hay contenido disponible')
  } else {
   console.log(contenido)
   res.status(200).json(contenido)
  }
 } catch (error) {
  console.error('Error al obtener los datos:', error)
  res.status(500).send('Error en el servidor')
 }
}
//**Obtener un contenido por ID**

const getContenidoById = async (req, res) => {
 try {
  const { id } = req.params
  const contenido = await Contenido.findByPk(id)
  if (!contenido) {
   res.status(404).send('Contenido no encontrado')
  } else {
   res.status(200).json(contenido)
  }
 } catch (error) {
  console.error('Error al obtener los datos:', error)
  res.status(500).send('Error en el servidor')
 }
}

//Filtrar contenidos por titulo

const getContenidoByTitulo = async (req, res) => {
 try {
  const { titulo } = req.params
  const contenido = await Contenido.findAll({ where: { titulo } })
  if (!contenido) {
   res.status(404).send('No hay contenido con ese título')
  } else {
   res.status(200).json(contenido)
  }
 } catch (error) {
  console.error('Error al obtener los datos:', error)
  res.status(500).send('Error en el servidor')
 }
}

//Agregar un nuevo contenido

const addContenido = async (req, res) => {
 try {
  const {
   poster,
   titulo,
   id_categoria,
   resumen,
   gen,
   id_busqueda,
   temporada,
   duracion,
   trailer
  } = req.body
  const contenido = await Contenido.create({
   poster,
   titulo,
   id_categoria,
   resumen,
   gen,
   id_busqueda,
   temporada,
   duracion,
   trailer
  })
  if (!contenido) {
   res.status(400).send('No se pudo crear el contenido')
   return
  } else {
   res
    .status(201)
    .json({ messagge: 'se agrego un nuevo contenido con exito', contenido })
  }
 } catch (error) {
  console.error('Error al crear el contenido:', error)
  res.status(500).send('Error en el servidor')
 }
}

// Actualizar temporada d cotenido
const updateTemporada = async (req, res) => {
 try {
  const { id_contenido } = req.params
  const { temporada } = req.body

  const [updateContenido] = await Contenido.update(
   { temporada },
   { where: { id_contenido } }
  )
  if (!updateContenido) {
   res.status(404).send('Contenido no encontrado')
   return
  } else {
   const contenidoActualizado = await Contenido.findByPk(id_contenido)
   res.status(200).json({
    message: 'Temporada actualizada correctamente',
    contenidoActualizado
   })
  }
 } catch (error) {
  console.error('Error al actualizar la temporada:', error)
  res.status(500).send('Error en el servidor')
 }
}
//Actualizar un contenido
const upContenido = async (req, res) => {
 try {
  const { id_contenido } = req.params
  const {
   poster,
   titulo,
   id_categoria,
   resumen,
   gen,
   id_busqueda,
   temporada,
   duracion,
   trailer
  } = req.body

  const [updateContenido] = await Contenido.update(
   {
    poster,
    titulo,
    id_categoria,
    resumen,
    gen,
    id_busqueda,
    temporada,
    duracion,
    trailer
   },
   { where: { id_contenido } }
  )
  if (!updateContenido) {
   res.status(404).send('Contenido no encontrado')
   return
  } else {
   const contenidoActualizado = await Contenido.findByPk(id_contenido)
   res.status(200).json({
    message: 'Contenido actualizado correctamente',
    contenidoActualizado
   })
  }
 } catch (error) {
  console.error('Error al actualizar el contenido:', error)
  res.status(500).send('Error en el servidor')
  //console.error('Error al actualizar el contenido:', error)
  //res.status(500).send('Error', error)
 }
}
//eliminar contenido
const deleteContenido = async (req, res) => {
 try {
  const { id_contenido } = req.params
  const deleteConten = await Contenido.findByPk(id_contenido)
  if (!deleteConten) {
   return res.status(404).json({ messagge: 'Contenido no encontrado' })
  } else {
   await deleteConten.destroy()
   res.status(204).json({ messagge: 'Contenido eliminado con éxito' })
  }
 } catch (error) {
  res.status(500).send({ messagge: 'error en la petición' })
 }
}
module.exports = {
 getAllContenido,
 getContenidoById,
 getContenidoByTitulo,
 addContenido,
 upContenido,
 deleteContenido,
 updateTemporada
}
