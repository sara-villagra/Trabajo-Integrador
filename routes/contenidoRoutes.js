const express = require('express')
const router = express.Router()
const db = require('../conexion/database')
const contenidoController = require('../controllers/contenidoController.js')
// Routes for CRUD
router.get('/', contenidoController.getAllContenido)
// Get all conten)

router.get('/:id', contenidoController.getContenidoById)
//get por titulo

router.get('/name/:titulo', contenidoController.getContenidoByTitulo)
//post contenido
router.post('/', contenidoController.addContenido)
//actualizar contenido
router.put('/:id_contenido', contenidoController.upContenido)
//actualizar temporada

router.patch('/:id_contenido', contenidoController.updateTemporada)
//eliminar contenido
router.delete('/:id_contenido', contenidoController.deleteContenido)

module.exports = router
