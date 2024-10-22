const express = require('express')
const router = express.Router()
const db = require('../conexion/database')
//controlador busqueda
const busquedaController = require('../controllers/busquedaController')

//post nueva busqueda
router.post('/busqueda', busquedaController.addBusqueda)
module.exports = router
