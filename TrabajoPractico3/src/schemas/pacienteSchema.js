const Joi = require('joi');

const pacienteSchema = {

    create: Joi.object({
        dni: Joi.string().pattern(/^\d+$/, 'números').min(8).max(20).required().messages({
                'string.pattern.name': 'El DNI debe contener solo números',
            }),
        nombre: Joi.string().required().min(3).max(100),
        apellido: Joi.string().required().min(3).max(100),
        email: Joi.string().email().required().min(3).max(100),
        password: Joi.string().required().min(5).max(100).messages({
                'string.pattern.name': 'El password debe tener 5 o más números',
            }),
    }),

    update: Joi.object({
        dni: Joi.string().required().min(8).max(20),
        nombre: Joi.string().required().min(3).max(100),
        apellido: Joi.string().required().min(3).max(100),
        email: Joi.string().email().required().min(3).max(100),
        password: Joi.string().required().min(5).max(100),
    }),

    login: Joi.object({
        email: Joi.string().email().required().min(3).max(100),
        password: Joi.string().required().min(5).max(100),
    }),
    // TODO: hacerlo tmb para buscar por un id, actualizar por id, buscar turno por paciente id y buscar por turno
    idParam: Joi.object({
        id: Joi.number().integer().positive().required()
    }),

    simplificado: Joi.object({
        id: Joi.number().integer().required(),
        dni: Joi.string().required().min(8).max(20),
        nombre: Joi.string().required().min(3).max(100),
        apellido: Joi.string().required().min(3).max(100),
        email: Joi.string().email().required().min(3).max(100),
    }),
};

module.exports = pacienteSchema;