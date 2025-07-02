const express = require('express');
const router = express.Router();
const {
  getVideojuegosConPaginacion,
  getAllVideojuegosSinPaginacion,
  getVideojuegoById,
  createVideojuego,
  updateVideojuego,
  deleteVideojuego
} = require('../controllers/videojuego.controller');
const videojuegoSchema = require('../schemas/videojuegos.schemas');
const validate = require('../middleware/validate');

const { verifyTokenMiddleware } = require('../middleware/verifyTokenMiddleware');

// GET /api/videojuegos - Obtener videojuegos con paginación
router.get('/', verifyTokenMiddleware, getVideojuegosConPaginacion);

// GET /api/videojuegos/all - Obtener todos los videojuegos
router.get('/all', verifyTokenMiddleware, getAllVideojuegosSinPaginacion);

// GET /api/videojuegos/:id - Obtener un videojuego por su ID
router.get('/:id', verifyTokenMiddleware, validate(videojuegoSchema.idParam, 'params'), getVideojuegoById);

// POST /api/videojuegos - Crear un nuevo videojuego
router.post('/', verifyTokenMiddleware, validate(videojuegoSchema.create), createVideojuego);

// PATCH /api/videojuegos/:id - Actualizar un videojuego existente (Actualizar parcialmente un videojuego)
router.patch('/:id', verifyTokenMiddleware, validate(videojuegoSchema.idParam, 'params'),  validate(videojuegoSchema.update), updateVideojuego);

// DELETE /api/videojuegos/:id - Eliminar un videojuego
router.delete('/:id', verifyTokenMiddleware, validate(videojuegoSchema.idParam, 'params'), deleteVideojuego);

module.exports = router;

