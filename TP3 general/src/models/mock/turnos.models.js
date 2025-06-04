const Turno = require('./../mock/entities/turno.entity.js');
//const Paciente = require('./../mock/entities/paciente.entity.js'); // si se quiere validar tipo
const pacientesModel = require('./pacientes.models.js');
// importar el token
const jwt = require("jsonwebtoken");

class TurnosModel {
  // constructor() {
  //   this.data = []; // Lista de turnos
  //   this.id = 1;     // ID autoincremental de turnos
  //   // Agregar un turno de ejemplo con pacienteId = 1
  //   this.data.push({
  //     id: this.id++,
  //     fecha: "2025-09-21",
  //     hora: "12:30",
  //     motivo: "Consulta",
  //     pacienteId: 1
  //   });
  // }
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

  /* list() {
    return new Promise((resolve, reject) => {
      // TODO: Ver si lo tengo que hacer, si es asi cambiar en el controlador
      if (this.data.length > 0) {
        resolve(this.data);
        // TODO: Meto la data en un for y luego me envie el paciente 
      } else {
        reject(new Error("La lista turnos está vacia"));
      }
    });
  } */

  /* async list() {
    if (this.data.length === 0) {
      throw new Error("La lista de turnos está vacía");
    }
    // tomamos una lista vacia y luego en un bucle for creamos una lista nueva dandole el paciente
    const turnosConPacientes = [];
    for (const turno of this.data) {
      try {
        const paciente = await this.pacientesModel.getPacienteById(turno.pacienteId);
        turnosConPacientes.push({
          ...turno,
          paciente,
        });
      } catch (error) {
        // Si no se encuentra el paciente, puedes manejarlo así:
        turnosConPacientes.push({
          ...turno,
          paciente: null, // o puedes hacer un continue para saltarlo
        });
      }
    }

    return turnosConPacientes;
  } */

  // para ver si puedo poner el paciente en general y no solo el pacienteId
  /* async list() {
    if (this.data.length === 0) {
      throw new Error("La lista de turnos está vacía");
    }

    const turnosConPacientes = [];

    // for (const turno of this.data) {
    //   try {
    //     const paciente = await this.pacientesModel.getPacienteById(turno.pacienteId);
    //     turnosConPacientes.push({
    //       ...turno,
    //       paciente,
    //     });
    //   } catch (error) {
    //     // Si no se encuentra el paciente, lo asignamos como null
    //     turnosConPacientes.push({
    //       ...turno,
    //       paciente: null,
    //     });
    //   }
    // }

    for (const turno of this.data) {
      try {
        const paciente = await this.pacientesModel.getPacienteById(turno.pacienteId);
        console.log("Paciente encontrado:", paciente); // 👈 esto
        turnosConPacientes.push({
          ...turno,
          paciente,
        });
      } catch (error) {
        console.log("Error al obtener paciente:", error.message); // 👈 esto también
        turnosConPacientes.push({
          ...turno,
          paciente: null,
        });
      }
    }

    return turnosConPacientes;
  } */

  // para ver si puedo poner el paciente en general y no solo el pacienteId
  async list() {
    if (this.data.length === 0) {
      throw new Error("La lista de turnos está vacía");
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
          paciente: null,
        });
      }
    }

    return turnosConPacientes;
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

