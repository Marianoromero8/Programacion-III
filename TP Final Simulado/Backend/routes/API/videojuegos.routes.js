const { Router } = require('express');
const videojuegosController = require('../../controllers/API/videojuegos.controller.js');
// const { verifyTokenMiddleware } = require('../../middlewares/verifyToken.middleware.js');
// const validate = require('../../middlewares/validate.js');
// const videojuegoSchema = require('../../schemas/videojuegoSchema.js');

const rutaVideojuegos = Router();

// Listar todos los videojuegos
//rutaVideojuegos.get('/', verifyTokenMiddleware, videojuegosController.list);
rutaVideojuegos.get('/', videojuegosController.list);

// Obtener por ID
//rutaVideojuegos.get('/:id', verifyTokenMiddleware, validate(videojuegoSchema.idParam, "params"), videojuegosController.getById);
rutaVideojuegos.get('/:id', videojuegosController.getById);

// Crear videojuego
//rutaVideojuegos.post('/', verifyTokenMiddleware, validate(videojuegoSchema.create), videojuegosController.create);
rutaVideojuegos.post('/', videojuegosController.create);

// Actualizar estado
//rutaVideojuegos.put('/:id/estado', verifyTokenMiddleware, validate(videojuegoSchema.idParam, "params"), validate(videojuegoSchema.estado), videojuegosController.updateEstado);
rutaVideojuegos.put('/:id/estado', videojuegosController.updateEstado);


// Sumar tiempo
//rutaVideojuegos.put('/:id/tiempo', verifyTokenMiddleware, validate(videojuegoSchema.idParam, "params"), validate(videojuegoSchema.tiempo), videojuegosController.addTiempo);
rutaVideojuegos.put('/:id/tiempo', videojuegosController.addTiempo);

// Actualizar calificación
//rutaVideojuegos.put('/:id/calificacion', verifyTokenMiddleware, validate(videojuegoSchema.idParam, "params"), validate(videojuegoSchema.calificacion), videojuegosController.updateCalificacion);
rutaVideojuegos.put('/:id/calificacion', videojuegosController.updateCalificacion);

// Eliminar videojuego
//rutaVideojuegos.delete('/:id', verifyTokenMiddleware, validate(videojuegoSchema.idParam, "params"), videojuegosController.delete);
rutaVideojuegos.delete('/:id', videojuegosController.delete);

module.exports = rutaVideojuegos;
