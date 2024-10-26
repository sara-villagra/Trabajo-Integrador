const express = require('express')
const router = express.Router()
const db = require('../conexion/database')
const contenidoController = require('../controllers/contenidoController.js')

// Routes for CRUD
//Obtener todos los contenido:

router.get('/', contenidoController.getAllContenido)
//Obtener contenido por su id:

router.get('/:id', contenidoController.getContenidoById)

//Obtener contenido por titulo
router.get('/name/:titulo', contenidoController.getContenidoByTitulo)

//obtener contenido por genero
router.get('/genero/:id_genero', contenidoController.getContenidoByGenero)
//obtener contenido con sus acotores

router.get(
 '/:id_contenido/actores',
 contenidoController.getContenidoWithActores
)

//obtener contenido por categoria

router.get(
 '/categorias/:id_categoria',
 contenidoController.getContenidoByCategorias
)
//obtener contenido por nombre genero
router.get(
 '/genero/nombre/:nombre',
 contenidoController.getContenidoByGeneronombre
)

//post nuevo contenido
router.post('/', contenidoController.addContenido)

//actualizar contenido
router.put('/:id_contenido', contenidoController.upContenido)

//actualizar contenido parcialmente (temporada)
router.patch('/:id_contenido', contenidoController.updateTemporada)

//Eliminar contenido
router.delete('/:id_contenido', contenidoController.deleteContenido)

module.exports = router
