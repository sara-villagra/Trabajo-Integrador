const express = require('express')
const router = express.Router()
const db = require('../conexion/database')
const contenido_actoresController = require('../controllers/contenido_actoresController.js')

router.post(
 '/:id_contenido/actor/:id_actores',
 contenido_actoresController.conectarActorConContenido
)
module.exports = router
