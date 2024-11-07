//const router = require('express').Router()
const { Contenido } = require('../models/contenido')
const { Genero } = require('../models/genero.js')
const { Contenido_Genero } = require('../models/contenido_genero.js')
const { Contenido_Actores } = require('../models/contenido_actores.js')
const { ContenidoBusqueda } = require('../models/contenido_busqueda.js')
const { Actor } = require('../models/actor.js')
const { Categoria } = require('../models/categoria.js')
const { Op } = require('sequelize')

/**
 * @swagger
 * paths:
 *   /contenido:
 *     get:
 *       summary: Obtiene todos los contenidos
 *       description: Este endpoint recupera todos los registros de contenido disponibles en la base de datos.
 *       tags:
 *         - Contenido
 *       responses:
 *         '200':
 *           description: Lista de contenidos obtenida exitosamente.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Contenido'
 *         '404':
 *           description: No hay contenido disponible
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: No hay contenido disponible
 *         '500':
 *           description: Error en el servidor
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Error en el servidor
 *                   error:
 *                     type: string
 */

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

/**
 * @swagger
 * /contenido/{id_contenido}:
 *   get:
 *     summary: Obtiene un contenido por ID
 *     description: Este endpoint recupera un registro de contenido específico de la base de datos utilizando su ID.
 *     tags:
 *       - Contenido
 *     parameters:
 *       - in: path
 *         name: id_contenido
 *         required: true
 *         description: ID del contenido que se desea obtener
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Contenido obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_contenido:
 *                   type: integer
 *                   description: ID del contenido
 *                 poster:
 *                   type: string
 *                   description: URL del póster del contenido
 *                 titulo:
 *                   type: string
 *                   description: Título del contenido
 *                 id_categoria:
 *                   type: integer
 *                   description: ID de la categoría del contenido
 *                 resumen:
 *                   type: string
 *                   description: Resumen del contenido
 *                 temporada:
 *                   type: integer
 *                   description: Temporada del contenido (si aplica)
 *                 duracion:
 *                   type: integer
 *                   description: Duración del contenido en minutos
 *                 trailer:
 *                   type: string
 *                   description: URL del trailer del contenido
 *       '404':
 *         description: Contenido no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contenido no encontrado
 *       '500':
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error en el servidor
 *                 error:
 *                   type: string
 */

//**Obtener un contenido por ID**
const getContenidoById = async (req, res) => {
 try {
  const { id_contenido } = req.params
  const contenido = await Contenido.findByPk(id_contenido)
  if (!contenido) {
   res.status(404).json({ message: 'Contenido no encontrado' })
  } else {
   res.status(200).json(contenido)
  }
 } catch (error) {
  res.status(500).send('Error en el servidor', error)
 }
}
/**
 * @swagger
 * paths:
 *  /contenido/name/{titulo}:
 *     get:
 *       summary: Obtiene un contenido por título
 *       description: Este endpoint recupera un registro de contenido específico de la base de datos utilizando su título.
 *       tags:
 *         - Contenido
 *       parameters:
 *         - in: path
 *           name: titulo
 *           required: true
 *           description: Título del contenido que se desea obtener
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Contenido obtenido exitosamente.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Contenido'
 *         '404':
 *           description: No hay contenido con ese título
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: No hay contenido con ese título
 *         '500':
 *           description: Error en el servidor
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Error en el servidor
 *                   error:
 *                     type: string
 */
//Filtrar contenidos por titulo
const getContenidoByTitulo = async (req, res) => {
 try {
  const { titulo } = req.params
  const contenido = await Contenido.findAll({
   where: {
    titulo: {
     [Op.like]: `%${titulo}%`
    }
   }
  })
  if (contenido.length === 0) {
   res.status(404).json({ message: 'No hay contenido con ese título' })
  } else {
   res.status(200).json(contenido)
  }
 } catch (error) {
  res.status(500).json({ message: 'Error en el servidor', error })
 }
 //   const { titulo } = req.params
 //   const contenido = await Contenido.findAll({ where: { titulo } })
 //   if (!contenido) {
 //    res.status(404).json({ message: 'No hay contenido con ese título' })
 //   } else {
 //    res.status(200).json(contenido)
 //   }
 //  } catch (error) {
 //   res.status(500).json({ message: 'Error en el servidor', error })
}

/**
 * @swagger
 * paths:
 *   /contenido/genero/{id_genero}:
 *     get:
 *       summary: Obtiene contenidos por género
 *       description: Este endpoint recupera registros de contenido específicos de la base de datos utilizando el identificador de género.
 *       tags:
 *         - Contenido
 *       parameters:
 *         - in: path
 *           name: id_genero
 *           required: true
 *           description: Identificador del género para filtrar los contenidos
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Contenido obtenido exitosamente.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Contenido'
 *         '404':
 *           description: No hay contenido con ese género o género no encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: No hay contenido con ese género
 *         '500':
 *           description: Error en el servidor
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Error en el servidor
 *                   error:
 *                     type: string
 */
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

/**
 * @swagger
 * paths:
 *   /contenido/genero/nombre/{nombre}:
 *     get:
 *       summary: Obtiene contenidos por nombre de género
 *       description: Este endpoint recupera registros de contenido específicos de la base de datos utilizando el nombre del género.
 *       tags:
 *         - Contenido
 *       parameters:
 *         - in: path
 *           name: nombre
 *           required: true
 *           description: Nombre del género para filtrar los contenidos
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Contenido obtenido exitosamente.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Contenido'
 *         '404':
 *           description: No hay contenido con ese género o género no encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: No hay contenido con ese género
 *         '500':
 *           description: Error en el servidor
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Error en el servidor
 *                   error:
 *                     type: string
 */
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
/**
 * @swagger
 * paths:
 *   /contenido/{id_contenido}/actores:
 *     get:
 *       summary: Obtiene contenido junto con sus actores
 *       description: Este endpoint recupera un registro de contenido junto con los actores asociados en la base de datos.
 *       tags:
 *         - Contenido
 *       parameters:
 *         - in: path
 *           name: id_contenido
 *           required: true
 *           description: ID del contenido para filtrar los actores asociados
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Contenido y actores obtenidos exitosamente.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id_contenido:
 *                     type: integer
 *                     example: 1
 *                   titulo:
 *                     type: string
 *                     example: "Ejemplo de Contenido"
 *                   actores:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Actor'
 *         '404':
 *           description: Contenido no encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: 'Contenido no encontrado'
 *         '500':
 *           description: Error en el servidor
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: 'Error en el servidor'
 *                   error:
 *                     type: string
 */
//filtrar todos un contenidos con sus actores
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

/**
 * @swagger
 * paths:
 *   /contenido/categorias/{id_categoria}:
 *     get:
 *       summary: Filtrar contenido por categoría
 *       description: Obtiene una lista de contenidos filtrados por su categoría utilizando el ID de la categoría.
 *       tags:
 *         - Contenido
 *       parameters:
 *         - in: path
 *           name: id_categoria
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID de la categoría para filtrar el contenido
 *       responses:
 *         '200':
 *           description: Contenido encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Contenido'  # Asegúrate de que este esquema esté definido
 *         '404':
 *           description: No hay contenido con esa categoría
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "No hay contenido con esa categoría"
 *         '500':
 *           description: Error en el servidor
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Error en el servidor"
 *                   error:
 *                     type: string
 */
//filtrar contenido por su categorias
const getContenidoByCategorias = async (req, res) => {
 try {
  const { id_categoria } = req.params

  // Verificar si hay categorías
  const contenidoCategorias = await Categoria.findAll({
   where: { id_categoria }
  })

  // Cambiar la verificación de contenidoCategorias
  if (contenidoCategorias.length === 0) {
   return res
    .status(404)
    .json({ message: 'No hay contenido con esa categoría' })
  }

  // Usar el id_categoria para buscar contenidos
  const contenido = await Contenido.findAll({
   where: { id_categoria } // Aquí debe estar la relación correcta
  })

  // Verificar si no se encontraron contenidos
  if (contenido.length === 0) {
   return res
    .status(404)
    .json({ message: 'No hay contenido con esa categoría' })
  }

  res.status(200).json(contenido)
 } catch (error) {
  res.status(500).send({ message: 'Error en el servidor', error })
 }
}

/**
 * @swagger
 * paths:
 *   /contenido:
 *     post:
 *       summary: Agregar un nuevo contenido
 *       description: Crea un nuevo contenido con los datos proporcionados en el cuerpo de la solicitud.
 *       tags:
 *         - Contenido
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 poster:
 *                   type: string
 *                   example: "https://link-al-poster.com/poster.jpg"
 *                 titulo:
 *                   type: string
 *                   example: "Título del contenido"
 *                 id_categoria:
 *                   type: integer
 *                   example: 1
 *                 resumen:
 *                   type: string
 *                   example: "Breve descripción del contenido"
 *                 temporada:
 *                   type: integer
 *                   example: 1
 *                 duracion:
 *                   type: integer
 *                   example: 120
 *                 trailer:
 *                   type: string
 *                   example: "https://link-al-trailer.com/trailer.mp4"
 *       responses:
 *         '201':
 *           description: Contenido creado con éxito
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Se agregó un nuevo contenido con éxito"
 *                   contenido:
 *                     $ref: '#/components/schemas/Contenido'
 *         '400':
 *           description: No se pudo crear el contenido
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "No se pudo crear el contenido"
 *         '500':
 *           description: Error en el servidor
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Error en el servidor"
 *                   error:
 *                     type: string
 */
//Agregar un nuevo contenido
const addContenido = async (req, res) => {
 try {
  const {
   poster,
   titulo,
   id_categoria,
   resumen,
   temporada,
   duracion,
   trailer
  } = req.body
  const contenido = await Contenido.create({
   poster,
   titulo,
   id_categoria,
   resumen,
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
  res.status(500).send({ message: 'Error en el servidor', error })
 }
}

/**
 * @swagger
 * paths:
 *   /contenido/{id_contenido}:
 *     patch:
 *       summary: Actualizar la temporada de un contenido
 *       description: Actualiza el campo de temporada de un contenido específico según su ID.
 *       tags:
 *         - Contenido
 *       parameters:
 *         - in: path
 *           name: id_contenido
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID del contenido a actualizar
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 temporada:
 *                   type: integer
 *                   example: 2
 *                   description: Nueva temporada del contenido
 *       responses:
 *         '200':
 *           description: Temporada actualizada correctamente
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Temporada actualizada correctamente"
 *                   contenidoActualizado:
 *                     $ref: '#/components/schemas/Contenido'
 *         '404':
 *           description: Contenido no encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *                 example: "Contenido no encontrado"
 *         '500':
 *           description: Error en el servidor
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Error en el servidor"
 *                   error:
 *                     type: string
 */
// Actualizar temporada d contenido
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

/**
 * @swagger
 * paths:
 *   /contenido/{id_contenido}:
 *     put:
 *       summary: Actualizar un contenido completo
 *       description: Actualiza todos los campos de un contenido específico según su ID.
 *       tags:
 *         - Contenido
 *       parameters:
 *         - in: path
 *           name: id_contenido
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID del contenido a actualizar
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 poster:
 *                   type: string
 *                   example: "https://link.to.poster.jpg"
 *                   description: URL del póster del contenido
 *                 titulo:
 *                   type: string
 *                   example: "Nuevo Título"
 *                   description: Título del contenido
 *                 id_categoria:
 *                   type: integer
 *                   example: 3
 *                   description: ID de la categoría nuevo
 *                 resumen:
 *                   type: string
 *                   example: "Un resumen actualizado del contenido."
 *                   description: Resumen del contenido
 *                 temporada:
 *                   type: integer
 *                   example: 2
 *                   description: Número de temporada del contenido actualizado
 *                 duracion:
 *                   type: integer
 *                   example: 120
 *                   description: Duración en minutos
 *                 trailer:
 *                   type: string
 *                   example: "https://link.to.trailer.mp4"
 *                   description: URL del trailer
 *       responses:
 *         '200':
 *           description: Contenido actualizado correctamente
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Contenido actualizado correctamente"
 *                   contenidoActualizado:
 *                     $ref: '#/components/schemas/Contenido'
 *         '404':
 *           description: Contenido no encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *                 example: "Contenido no encontrado"
 *         '500':
 *           description: Error en el servidor
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Error en el servidor"
 *                   error:
 *                     type: string
 */
//Actualizar un contenido
const upContenido = async (req, res) => {
 try {
  const { id_contenido } = req.params
  const {
   poster,
   titulo,
   id_categoria,
   resumen,
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
  res.status(500).send({ message: 'Error en el servidor', error })
 }
}

/**
 * @swagger
 * paths:
 *   /contenido/{id_contenido}:
 *     delete:
 *       summary: Eliminar un contenido
 *       description: Elimina un contenido específico de la base de datos usando su ID.
 *       tags:
 *         - Contenido
 *       parameters:
 *         - in: path
 *           name: id_contenido
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID del contenido a eliminar
 *       responses:
 *         '204':
 *           description: Contenido eliminado con éxito
 *         '404':
 *           description: Contenido no encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Contenido no encontrado"
 *         '500':
 *           description: Error en la petición
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "error en la petición"
 */
//eliminar contenido

const deleteContenido = async (req, res) => {
 try {
  const { id_contenido } = req.params

  // Verificar primero si el contenido existe
  const deleteConten = await Contenido.findByPk(id_contenido)
  if (!deleteConten) {
   return res.status(404).json({ message: 'Contenido no encontrado' })
  }

  // Si existe, elimina primero las referencias en las tablas relacionadas a contenido:
  await Contenido_Actores.destroy({ where: { id_contenido } })
  await ContenidoBusqueda.destroy({ where: { id_contenido } })
  await Contenido_Genero.destroy({ where: { id_contenido } })

  // Luego elimina el contenido
  await deleteConten.destroy()
  res.status(200).json({
   message: 'Contenido eliminado con éxito'
  })
 } catch (error) {
  res.status(500).json({ message: 'Error en la petición', error })
 }
}

module.exports = {
 getAllContenido,
 getContenidoById,
 getContenidoByTitulo,
 getContenidoByGenero,
 getContenidoByCategorias,
 getContenidoByGeneronombre,
 getContenidoWithActores,
 addContenido,
 upContenido,
 updateTemporada,
 deleteContenido
}
