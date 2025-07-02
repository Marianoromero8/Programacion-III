const { Router } = require('express');
const turnosController = require('../controllers/API/turnos.controller.js');
const  {verifyTokenMiddleware}  = require('../middlewares/verifyToken.middleware.js');
const turnoSchema = require('../schemas/turnoSchema.js');
const validate = require('../middlewares/validate.js');

const rutaTurnos = Router();

// Listar todos los turnos
rutaTurnos.get('/', verifyTokenMiddleware,turnosController.list);

// Crear un nuevo turno
rutaTurnos.post('/', verifyTokenMiddleware, validate(turnoSchema.create) ,turnosController.create);

// Eliminar un turno por ID del turno
rutaTurnos.delete('/:id', verifyTokenMiddleware, validate(turnoSchema.idParam, "params") ,turnosController.delete);

// Obtener todos los turnos de un paciente por ID de paciente
rutaTurnos.get('/:idPaciente', verifyTokenMiddleware , validate(turnoSchema.idParamPaciente, "params") ,turnosController.getByPaciente);

module.exports = rutaTurnos;
