const Joi = require('joi');

const videojuegoSchema = {

    login: Joi.object({
        username: Joi.string().required().min(3).max(100).messages({
            'string.empty': 'El nombre de usuario es obligatorio',
            'string.min': 'El nombre de usuario debe tener al menos 3 caracteres',
        }),
        password: Joi.string().required().min(5).max(100).messages({
            'string.empty': 'La contraseña es obligatoria',
            'string.min': 'La contraseña debe tener al menos 5 caracteres',
        }),
    }),

    create: Joi.object({
        nombre: Joi.string().required().min(2).max(100),

        estado: Joi.string()
            .valid('completado', 'jugando', 'pendiente')
            .default('pendiente')
            .messages({
                'any.only': 'El estado debe ser completado, jugando o pendiente',
            }),

        categoria: Joi.string().min(3).max(50).optional(),

        tiempoJugado: Joi.number().integer().min(0).optional()
            .messages({
                'number.base': 'El tiempo jugado debe ser un número entero',
                'number.min': 'El tiempo jugado no puede ser negativo',
            }),

        calificacion: Joi.number().integer().min(0).max(10).optional()
            .messages({
                'number.base': 'La calificación debe ser un número entero',
                'number.min': 'La calificación mínima es 0',
                'number.max': 'La calificación máxima es 10',
            }),
    }),
    // como es para patch los campos son opcionales
    update: Joi.object({
        nombre: Joi.string().min(2).max(100).optional(),

        estado: Joi.string()
            .valid('completado', 'jugando', 'pendiente')
            .optional()
            .messages({
                'any.only': 'El estado debe ser completado, jugando o pendiente',
            }),

        categoria: Joi.string().min(3).max(50).optional(),

        tiempoJugado: Joi.number().integer().min(0).optional()
            .messages({
                'number.base': 'El tiempo jugado debe ser un número entero',
                'number.min': 'El tiempo jugado no puede ser negativo',
            }),

        calificacion: Joi.number().integer().min(0).max(10).optional()
            .messages({
                'number.base': 'La calificación debe ser un número entero',
                'number.min': 'La calificación mínima es 0',
                'number.max': 'La calificación máxima es 10',
            }),
    }),
    // para validar el id en la ruta en postman
    idParam: Joi.object({
        id: Joi.number().integer().positive().required()
            .messages({
                'number.base': 'El ID debe ser un número',
                'number.positive': 'El ID debe ser un número positivo',
            }),
    }),
};

module.exports = videojuegoSchema;
