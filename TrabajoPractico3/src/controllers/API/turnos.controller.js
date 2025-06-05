const turnosModel = require('./../../models/mock/turnos.models.js');
const Turno = require('./../../models/mock/entities/turno.entity.js');
const Paciente = require('./../../models/mock/entities/paciente.entity.js'); // Necesario si usamos paciente completo
const pacientesModel = require('../../models/mock/pacientes.models.js');

class TurnosController {

    async list(req, res) {
        try {
            const turnos = await turnosModel.list();;
            res.status(200).json(turnos);
        } catch (error) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    async create(req, res) {
        try {
            const { fecha, hora, motivo, pacienteId } = req.body;

            if (!pacienteId) {
                return res.status(400).json({ error: "Paciente no válido o no definido" });
            }

            const turno = await turnosModel.create({ fecha, hora, motivo, pacienteId });
            res.status(201).json(turno);

        } catch (error) {
            if (error.message === "Paciente no encontrado") {
                res.status(404).json({ error: error.message });
                //return;
            } else {
                res.status(500).json({ error: error.message });
            }

        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            await turnosModel.delete(id);
            res.status(200).json({ message: "Turno eliminado" });
        } catch (error) {
            if (error.message === "Turno no encontrado") {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const { fecha, hora, motivo, paciente } = req.body;

            const pacienteExistente = await pacientesModel.getById(paciente.id);
            if (!pacienteExistente) {
                res.status(404).json({ error: 'Paciente no encontrado' });
                return;
            }

            const pacienteInstancia = new Paciente(
                paciente.dni,
                paciente.nombre,
                paciente.apellido,
                paciente.email,
                paciente.id
            );

            const turnoActualizado = new Turno(fecha, hora, pacienteInstancia, motivo);
            await turnosModel.update(id, turnoActualizado);

            res.status(200).json({ message: "Turno actualizado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener turnos por ID de paciente
    async getByPaciente(req, res) {
        try {
            const idPaciente = req.params.idPaciente;
            const turnos = await turnosModel.getByPacienteId(idPaciente);
            res.status(200).json(turnos); 
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new TurnosController();
