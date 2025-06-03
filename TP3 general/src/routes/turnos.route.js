const { Router } = require('express');
const turnosController = require('../controllers/API/turnos.controller.js');
// TODO: Necesito el token para turnos?
const  {verifyTokenMiddleware}  = require('../middlewares/verifyToken.middleware.js');
const turnoSchema = require('./../schemas/turnoSchema.js');
const validate = require('./../middlewares/validate.js');

// normal API
const rutaTurnos = Router();

// Listar todos los turnos
rutaTurnos.get('/', verifyTokenMiddleware,turnosController.list);

// Crear un nuevo turno
rutaTurnos.post('/', verifyTokenMiddleware, validate(turnoSchema.create) ,turnosController.create);

// Actualizar un turno por ID del turno
//rutaTurnos.put('/:id', verifyTokenMiddleware, validate(turnoSchema.idParam, "params"), validate(turnoSchema.update) , turnosController.update);

// Eliminar un turno por ID del turno
rutaTurnos.delete('/:id', verifyTokenMiddleware, validate(turnoSchema.idParam, "params") ,turnosController.delete);

// Obtener todos los turnos de un paciente por ID de paciente
rutaTurnos.get('/:idPaciente', verifyTokenMiddleware , validate(turnoSchema.idParamPaciente, "params") ,turnosController.getByPaciente);

// normal
module.exports = rutaTurnos;
