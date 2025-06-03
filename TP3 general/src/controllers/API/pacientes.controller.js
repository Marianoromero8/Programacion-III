const pacientesModel = require('./../../models/mock/pacientes.models.js')
const Paciente = require('./../../models/mock/entities/paciente.entity.js')
//const pacienteSchema = require('./../schemas/pacienteSchema.js')
//const validate = require('../middleware/validate');

class PacientesController {

    // TODO: aca agregar funcion login con el token de validacion
    async login(req, res) {
        try {
            // const email es lo mismo que req.body.email, lo mismo para password
            const { email, password } = req.body;

            const token = await pacientesModel.validateLogin(email, password);

            //res.status(200).json(token);
            // para ver si puedo hacer el front end con localstorage
            res.status(200).json({ data: token });




        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    async list(req, res) {
        try {
            const pacientes = await pacientesModel.list();
            res.status(200).json(pacientes);
        } catch (error) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;
            const paciente = await pacientesModel.getPacienteById(id);
            res.status(200).json(paciente);
        } catch (error) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    async create(req, res) {
        try {
            const { dni, nombre, apellido, email, password } = req.body;

            const nuevoPaciente = await pacientesModel.createModel(dni, nombre, apellido, email, password);
            res.status(201).json(nuevoPaciente);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const pacienteBorrado = await pacientesModel.delete(id);
            res.status(200).json({ message: `Paciente con id ${id} eliminado correctamente`, paciente: pacienteBorrado });
        } catch (error) {
            if (error.message === "No se encuentra el paciente con el ID proporcionado") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Error interno del servidor" });
            }
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const pacienteData = req.body;

            const pacienteActualizado = await pacientesModel.update(id, pacienteData);
            res.status(200).json(pacienteActualizado);
        } catch (error) {
            if (error.message === "El email ya está registrado por otro paciente") {
                res.status(400).json({ error: error.message });
            } else if (error.message === "No se encuentra el paciente con el ID proporcionado") {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Error interno del servidor" });
            }
        }
    }

}

module.exports = new PacientesController();




