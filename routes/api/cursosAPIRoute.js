const express = require('express');
const router = express.Router();
const cursosAPIController = require('../../src/controllers/api/cursosAPIController');

//Rutas
//Listado de todos los actores
router.get('/', cursosAPIController.list);
//Detalle del actor
router.get('/:id', cursosAPIController.detail);

module.exports = router;