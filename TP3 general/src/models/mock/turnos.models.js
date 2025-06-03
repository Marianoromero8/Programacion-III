const Turno = require('./../mock/entities/turno.entity.js');
//const Paciente = require('./../mock/entities/paciente.entity.js'); // si se quiere validar tipo
const pacientesModel = require('./pacientes.models.js');
// importar el token
const jwt = require("jsonwebtoken");

class TurnosModel {
  constructor() {
    this.data = []; // Lista de turnos
    this.id = 1;     // ID autoincremental de turnos
    //   TODO: Tiene que ser el pacienteID asi
    // this.data.push(
    //   {
    //     fecha: "2025-09-21",
    //     hora: "12:30",
    //     motivo: "Consulta",
    //     pacienteId: 1

    //   }
    // )
  }

  // Crear nuevo turno
  // TODO: CREAR EL TURNO SOLO CON EL ID DEL PACIENTE, LUEGO IR A GETPACIENTEBYID ( del pacientes.modelo) y obtener todo el paciente

  // este tiene un objeto paciente en el res, el siguiente tiene solo un pacienteId
  /* create({ fecha, hora, motivo, pacienteId }) {
    return new Promise(async (resolve, reject) => {
      try {
        const pacienteExistente = await pacientesModel.getPacienteById(pacienteId);
        if (!pacienteExistente) {
          reject(new Error("Paciente no encontrado"));
        } else {
          // Clonar sin la password: con ... clonamos y luego eliminamos el password de la copia
          const pacienteSinPassword = { ...pacienteExistente };
          delete pacienteSinPassword.password;

          const nuevoTurno = new Turno(fecha, hora, pacienteSinPassword, motivo);
          nuevoTurno.id = this.id++;
          this.data.push(nuevoTurno);
          resolve(nuevoTurno);
        }
      } catch (error) {
        reject(error);
      }
    });
  } */

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
  // Como las validaciones de los campos las maneja el update del JOI las sacamos
  // como es en memoria no es necesario hacerlo por promesa
  // pero para practicar cuando usemos una base de datos
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
    return new Promise((resolve, reject) => {
      // TODO: Ver si lo tengo que hacer, si es asi cambiar en el controlador
      if (this.data.length > 0) {
        resolve(this.data);
      } else {
        reject(new Error("La lista turnos está vacia"));
      }
    });
  }

  /* list() {
    return new Promise((resolve) => {
      resolve(this.data);  // Devuelve la lista, aunque esté vacía
    });
  } */




  // Obtener todos los turnos de un paciente por su ID

  /* getByPacienteId(idPaciente) {
    return new Promise((resolve, reject) => {
      console.log("Buscando turnos para ID:", idPaciente);
      console.log("Turnos:", this.data);
      console.log("Tipo de idPaciente:", typeof idPaciente);
      const turnosPaciente = this.data.filter((t) => t.paciente && t.paciente.id == idPaciente);
      //const turnosPaciente = this.data.filter((t) => t.paciente.id == idPaciente);
      if (turnosPaciente.length === 0) {
        reject(new Error(`No se encontraron turnos para el paciente con ID ${idPaciente}`));
      } else {
        resolve(turnosPaciente);
      }
    });
  } */

  // este usa un pacienteId pasandolo a string asi no tiene que usar el objeto paciente y buscar su id
  getByPacienteId(idPaciente) {
    return new Promise((resolve, reject) => {
      // paso el idPaciente a un string y lo uso como metodo de busqueda
      const idStr = String(idPaciente);
      const turnosPaciente = this.data.filter((t) => t.pacienteId === idStr);

      if (turnosPaciente.length === 0) {
        reject(new Error(`No se encontraron turnos para el paciente con ID ${idPaciente}`));
      } else {
        resolve(turnosPaciente);
      }
    });
  }

}


module.exports = new TurnosModel();

