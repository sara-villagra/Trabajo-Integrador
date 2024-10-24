//const router = require('express').Router()
const { Contenido } = require('../models/contenido')
const { Genero } = require('../models/genero.js')
const { Contenido_Genero } = require('../models/contenido_genero.js')
const { Actor } = require('../models/actor.js')
const { Op } = require('sequelize')
const getAllContenido = async (req, res) => {
 try {
  const contenido = await Contenido.findAll()
  if (!contenido) {
   res.status(404).json({ message: 'No hay contenido disponible' })
  } else {
   res.status(200).json(contenido)
  }
 } catch (error) {
  res.status(500).json({ message: 'Error en el servidor', error })
 }
}
//**Obtener un contenido por ID**

const getContenidoById = async (req, res) => {
 try {
  const { id } = req.params
  const contenido = await Contenido.findByPk(id)
  if (!contenido) {
   res.status(404).json({ message: 'Contenido no encontrado' })
  } else {
   res.status(200).json(contenido)
  }
 } catch (error) {
  res.status(500).send('Error en el servidor', error)
 }
}

//Filtrar contenidos por titulo

const getContenidoByTitulo = async (req, res) => {
 try {
  const { titulo } = req.params
  const contenido = await Contenido.findAll({ where: { titulo } })
  if (!contenido) {
   res.status(404).json({ message: 'No hay contenido con ese título' })
  } else {
   res.status(200).json(contenido)
  }
 } catch (error) {
  res.status(500).json({ message: 'Error en el servidor', error })
 }
}
//filtar contenido por genero
const getContenidoByGenero = async (req, res) => {
 try {
  const { id_genero } = req.params
  const genero = await Genero.findByPk(id_genero)
  if (!genero) {
   res.status(404).json({ message: 'Genero no encontrado' })
   return
  }
  const contenidoGenero = await Contenido_Genero.findAll({
   where: { id_genero: id_genero }
  })
  const contenido = await Promise.all(
   contenidoGenero.map(async (contenidoGenero) => {
    const contenido = await Contenido.findByPk(contenidoGenero.id_contenido)
    return contenido
   })
  )
  if (!contenido) {
   res.status(404).json({ message: 'No hay contenido con ese genero' })
  } else {
   res.status(200).json(contenido)
  }
 } catch (error) {
  res.status(500).send({ message: 'Error en el servidor', error })
 }
}
//Filtar contenido por nombre de genero. Primero verificamos que exista en la tabla genero, luego buscamos en la tabla intermedia que contenido tiene el id del genero,finalmente filtamos contenidos
const getContenidoByGeneronombre = async (req, res) => {
 try {
  const { nombre } = req.params

  // Buscar el género por su nombre
  const genero = await Genero.findOne({
   where: { nombre: { [Op.like]: `%${nombre}%` } }
  })

  if (!genero) {
   return res.status(404).json({ message: 'Género no encontrado' })
  }

  // Usar el id_genero del género encontrado para buscar contenidos
  const contenidoGenero = await Contenido_Genero.findAll({
   where: { id_genero: genero.id_genero }
  })

  // Mapear los contenidos asociados
  const contenido = await Promise.all(
   contenidoGenero.map(async (cont) => {
    return await Contenido.findByPk(cont.id_contenido)
   })
  )

  // Verificar si no se encontraron contenidos
  if (contenido.length === 0) {
   return res.status(404).json({ message: 'No hay contenido con ese género' })
  }

  // Enviar los contenidos encontrados
  res.status(200).json(contenido)
 } catch (error) {
  res.status(500).send({ message: 'Error en el servidor', error })
 }
}
//filtar todos un contenidos con sus actores
const getContenidoWithActores = async (req, res) => {
 try {
  const { id_contenido } = req.params
  const contenido = await Contenido.findByPk(id_contenido, {
   include: [{ model: Actor }]
  })
  if (!contenido) {
   res.status(404).json({ message: 'Contenido no encontrado' })
  } else {
   res.status(200).json(contenido)
  }
 } catch (error) {
  res.status(500).send({ message: 'Error en el servidor', error })
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
   temporada,
   duracion,
   trailer
  })
  if (!contenido) {
   res.status(400).json({ message: 'No se pudo crear el contenido' })
   return
  } else {
   res
    .status(201)
    .json({ messagge: 'se agrego un nuevo contenido con exito', contenido })
  }
 } catch (error) {
  res.status(500).send('Error en el servidor', error)
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
  res.status(500).send('Error en el servidor', error)
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
 getContenidoByGenero,
 getContenidoByGeneronombre,
 getContenidoWithActores,
 addContenido,
 upContenido,
 deleteContenido,
 updateTemporada
}
