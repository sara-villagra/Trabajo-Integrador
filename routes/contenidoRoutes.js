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

router.post('/', contenidoController.addContenido)

router.put('/:id_contenido', contenidoController.upContenido)

router.delete('/:id_contenido', contenidoController.deleteContenido)

module.exports = router
