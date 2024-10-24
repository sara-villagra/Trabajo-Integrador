const express = require('express')
const router = express.Router()
const db = require('../conexion/database')
const actoresController = require('../controllers/actoresController.js')
// get a actor por contenido

router.get('/actor/:id_actores', actoresController.getActoresConContenido)
//post nuevo actor
router.post('/actor', actoresController.addActor)

module.exports = router
