const express = require('express');
const router = express.Router();
const VideojuegosController = require('../controllers/videojuego.controllerSinLogica');
const videojuegoSchema = require('../schemas/videojuegos.schemas');
const validate = require('../middleware/validate');
const { verifyTokenMiddleware } = require('../middleware/verifyTokenMiddleware');

// GET /api/videojuegos - Obtener videojuegos con paginación
router.get('/', verifyTokenMiddleware, VideojuegosController.list);

// GET /api/videojuegos/all - Obtener todos los videojuegos
router.get('/all', verifyTokenMiddleware, VideojuegosController.all);

// GET /api/videojuegos/:id - Obtener un videojuego por su ID
router.get('/:id', verifyTokenMiddleware, validate(videojuegoSchema.idParam, 'params'), VideojuegosController.getById);

// POST /api/videojuegos - Crear un nuevo videojuego
router.post('/', verifyTokenMiddleware, validate(videojuegoSchema.create), VideojuegosController.create);

// PATCH /api/videojuegos/:id - Actualizar un videojuego existente
router.patch('/:id', verifyTokenMiddleware, validate(videojuegoSchema.idParam, 'params'), validate(videojuegoSchema.update), VideojuegosController.update);

// DELETE /api/videojuegos/:id - Eliminar un videojuego
router.delete('/:id', verifyTokenMiddleware, validate(videojuegoSchema.idParam, 'params'), VideojuegosController.delete);

module.exports = router;
