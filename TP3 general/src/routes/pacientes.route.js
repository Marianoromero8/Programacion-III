const {Router} = require('express');
const pacientesController = require('../controllers/API/pacientes.controller.js')
const  {verifyTokenMiddleware}  = require('../middlewares/verifyToken.middleware.js');

const validate = require('./../middlewares/validate.js');
const pacienteSchema = require('./../schemas/pacienteSchema.js');

const rutaPacientes = Router();

// ruta del token
// las validaciones se hacen antes de ingresar al contorlador
// agregamos algo en el medio entre la ruta y el controlador, con un token JWT

// Listar todos los pacientes
rutaPacientes.get('/', verifyTokenMiddleware, pacientesController.list);
// Obtener paciente por id
rutaPacientes.get('/:id',  verifyTokenMiddleware, validate(pacienteSchema.idParam, "params") ,pacientesController.getById)
//login de un paciente administrador con validateJOI
rutaPacientes.post('/login', validate(pacienteSchema.login) ,pacientesController.login)
// crear un paciente con validateJOI
rutaPacientes.post('/',verifyTokenMiddleware, validate(pacienteSchema.create) ,pacientesController.create);
// actualizar un paciente por id con validateJOI
rutaPacientes.put('/:id',verifyTokenMiddleware, validate(pacienteSchema.idParam, "params") ,validate(pacienteSchema.create) ,pacientesController.update);
// eliminar un paciente por id
rutaPacientes.delete('/:id',verifyTokenMiddleware, validate(pacienteSchema.idParam, "params"), pacientesController.delete);


//Otras rutas CRUD


module.exports = rutaPacientes;