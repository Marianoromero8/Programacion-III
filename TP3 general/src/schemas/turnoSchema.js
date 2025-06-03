// esta en Controladores con Express casos validacion con JOI

// schemas/turnoSchema.js
const Joi = require('joi');
const pacienteSchema = require('./../schemas/pacienteSchema.js');

const turnoSchema = {

    /* create: Joi.object({
        // ^inicio de cadena, 4 digitos, - obligatorio, 2 digitos, etc, $ fin de cadena
        fecha: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),

        hora: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),

        motivo: Joi.string().min(1).required(),

        // si son todos los datos menos la password en el simplificado
        //paciente: pacienteSchema.simplificado.required()

        // si quiero tanto solo el id o los datos anteriores
        paciente: Joi.alternatives().try(
            // opción 1: solo ID
            Joi.object({
                id: Joi.number().integer().required()
            }),

            // opción 2: paciente completo
            pacienteSchema.simplificado
        ).required()
    }), */

    create: Joi.object({
        fecha: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
        hora: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
        motivo: Joi.string().min(1).required(),

        pacienteId: Joi.number().integer().positive().required()
    }),


    update: Joi.object({
        fecha: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),

        hora: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),

        motivo: Joi.string().min(1).required(),

        // si son todos los datos menos la password en el simplificado
        //paciente: pacienteSchema.simplificado.required()

        // si quiero tanto solo el id o los datos anteriores
        paciente: Joi.alternatives().try(
            // opción 1: solo ID
            Joi.object({
                id: Joi.number().integer().required()
            }),

            // opción 2: paciente completo( sin el password)
            pacienteSchema.simplificado
        ).required()
    }),

    idParam: Joi.object({
        id: Joi.number().integer().positive().required()
    }),

    idParamPaciente: Joi.object({
        idPaciente: Joi.number().integer().positive().required()
    }),
};

module.exports = turnoSchema;