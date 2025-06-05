const Turno = require('./../mock/entities/turno.entity.js');
//const Paciente = require('./../mock/entities/paciente.entity.js'); // si se quiere validar tipo
const pacientesModel = require('./pacientes.models.js');
// importar el token
const jwt = require("jsonwebtoken");

class TurnosModel {
  constructor() {
    this.data = [];
    this.id = 1;

    this.data.push(
      {
        id: this.id++,
        fecha: "2025-09-21",
        hora: "12:30",
        motivo: "Consulta general",
        pacienteId: 1
      },
      {
        id: this.id++,
        fecha: "2025-09-22",
        hora: "10:00",
        motivo: "Control",
        pacienteId: 2
      },
      {
        id: this.id++,
        fecha: "2025-09-23",
        hora: "14:15",
        motivo: "Revisión",
        pacienteId: 3
      },
      {
        id: this.id++,
        fecha: "2025-09-24",
        hora: "09:00",
        motivo: "Consulta especialista",
        pacienteId: 4
      },
      {
        id: this.id++,
        fecha: "2025-09-25",
        hora: "11:45",
        motivo: "Vacunación",
        pacienteId: 5
      }
    );
  }

  // Crear nuevo turno
  create({ fecha, hora, motivo, pacienteId }) {
    return new Promise(async (resolve, reject) => {
      try {
        const pacienteExistente = await pacientesModel.getPacienteById(pacienteId);

        if (!pacienteExistente) {
          return reject(new Error("Paciente no encontrado"));
        }

        // Creamos un nuevo turno usando solo el ID del paciente
        const nuevoTurno = {
          id: this.id++,
          fecha,
          hora,
          motivo,
          pacienteId
        };

        this.data.push(nuevoTurno);
        resolve(nuevoTurno);

      } catch (error) {
        reject(error);
      }
    });
  }




  // Actualizar turno por id de turno
  update(id, nuevoTurno) {
    return new Promise((resolve, reject) => {
      const turnoExistente = this.data.find((t) => t.id == id);
      if (!turnoExistente) {
        reject(new Error("Turno no encontrado"))
      } else {
        turnoExistente.fecha = nuevoTurno.fecha;
        turnoExistente.hora = nuevoTurno.hora;
        turnoExistente.motivo = nuevoTurno.motivo;
        turnoExistente.paciente = nuevoTurno.paciente;

        resolve(turnoExistente);
      }
    });
  }



  // Eliminar turno por id de turno

  delete(id) {
    return new Promise((resolve, reject) => {
      const index = this.data.findIndex((t) => t.id == id);
      if (index === -1) {
        reject(new Error("Turno no encontrado"));
      } else {
        this.data.splice(index, 1);
        resolve(`Turno con ID ${id} eliminado exitosamente`);
      }
    });
  }

  list() {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.data.length === 0) {
          reject(new Error("La lista de turnos está vacía"));
          return;
        }

        const turnosConPacientes = [];

        for (const turno of this.data) {
          try {
            const paciente = await pacientesModel.getPacienteById(turno.pacienteId);
            turnosConPacientes.push({
              ...turno,
              paciente,
            });
          } catch (error) {
            turnosConPacientes.push({
              ...turno,
              paciente: null, // No se encontró el paciente
            });
          }
        }

        resolve(turnosConPacientes);
      } catch (err) {
        reject(err); // cualquier otro error inesperado
      }
    });
  }

  getByPacienteId(idPaciente) {
    return new Promise(async (resolve, reject) => {
      try {
        const idNum = Number(idPaciente);
        const turnosPaciente = this.data.filter((t) => t.pacienteId === idNum);

        if (turnosPaciente.length === 0) {
          reject(new Error(`No se encontraron turnos para el paciente con ID ${idPaciente}`));
          return;
        }

        const turnosConPaciente = [];

        for (const turno of turnosPaciente) {
          try {
            const paciente = await pacientesModel.getPacienteById(turno.pacienteId);
            turnosConPaciente.push({
              ...turno,
              paciente,
            });
          } catch (error) {
            turnosConPaciente.push({
              ...turno,
              paciente: null,
            });
          }
        }

        resolve(turnosConPaciente);
      } catch (err) {
        reject(err);
      }
    });
  }



}


module.exports = new TurnosModel();

