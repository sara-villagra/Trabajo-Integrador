const express = require('express')
const router = express.Router()
const db = require('../conexion/database')
const actoresController = require('../controllers/actoresController.js')

//post nuevo actor
router.post('/actor', actoresController.addActor)

module.exports = router
