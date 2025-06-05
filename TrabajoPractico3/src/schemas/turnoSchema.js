const Joi = require('joi');
const pacienteSchema = require('./pacienteSchema.js');

const turnoSchema = {

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