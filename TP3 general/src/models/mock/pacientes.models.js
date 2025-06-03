const Persona = require('./../mock/entities/paciente.entity.js');
const Config = require("./../../config/config.js");
// importar el token
const jwt = require("jsonwebtoken");
//import Persona from './../mock/entities/paciente.entity.js'
// en package.json cambiamos "type" de "commonjs" a "module" para usar por import

// ya tengo el npm i jsonwebtoken, falta el encryct

class PacientesModel {
  constructor() {
    this.data = [];
    this.data.push(
      new Persona(
        "123456787",
        "Sergio",
        "Antozzi",
        "email@gmail.com",
        "12345",
        1
      )
    );
    this.id = 2;
  }

  // aca va el findByEmail y la validacion

  findByEmail(email, password) {
    return new Promise((resolve, reject) => {
      const paciente = this.data.find(
        (p) => p.email === email && p.password === password
      );
      // El checkeo de email y password se hace con Joi 
      if (!paciente) {
        reject(new Error("El paciente no existe o credenciales incorrectas"))
      } else {
        resolve(paciente);
      }
    });
  }

  // TODO: debo cambiar el validate ?? (este validate es para el login para obtener el token)
  validateLogin(email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const userFound = await this.findByEmail(email, password);

        if (!userFound || userFound.password == null) {
          throw new Error("Email o password incorrectos");
        }

        //payload, secreto, tiempo de expiracion
        const payload = {
          //userId: userFound._id,
          userId: userFound.id,
          userEmail: userFound.email,
        };
        //console.log("palabra secreta, pacientes model:", Config.secreteWord);

        const token = jwt.sign(payload, Config.secreteWord, {
          expiresIn: Config.expiresIn,
        });
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  }

  /* createModel(dni, nombre, apellido, email, password) {
    return new Promise((resolve, reject) => {
      // Verificar duplicado de email
      const pacienteExistente = this.data.find(p => p.email === email);
      if (pacienteExistente !== undefined) {
        reject(new Error("Ya existe un paciente con ese email"));
      } else {
        const nuevoPaciente = new Persona(dni, nombre, apellido, email, password, this.id);

        this.id++;
        this.data.push(nuevoPaciente);
        resolve(nuevoPaciente);
      }


    });
  } */

  // si no quiero que haya un dni duplicado
  createModel(dni, nombre, apellido, email, password) {
    return new Promise((resolve, reject) => {
      const pacienteExistente = this.data.find(p => p.email === email || p.dni === dni);

      if (pacienteExistente) {
        if (pacienteExistente.email === email) {
          reject(new Error("Ya existe un paciente con ese email"));
          return;
        }
        if (pacienteExistente.dni === dni) {
          reject(new Error("Ya existe un paciente con ese DNI"));
          return;
        }
      }

      // Si no hay duplicados, creamos y guardamos
      const nuevoPaciente = new Persona(dni, nombre, apellido, email, password, this.id);
      this.id++;
      this.data.push(nuevoPaciente);
      resolve(nuevoPaciente);
    });
  }



  // actualiza los datos del cliente con id = id

  update(id, paciente) {
    return new Promise((resolve, reject) => {
      const pacienteEncontrado = this.data.find((p) => p.id == id);
      if (!pacienteEncontrado) {
        reject(new Error("No se encuentra el paciente con el ID proporcionado"));
      } else {
        // Verificar email único (excluyendo el paciente actual)
        const emailDuplicado = this.data.find(
          (p) => p.email === paciente.email && p.id != id
        );
        if (emailDuplicado) {
          reject(new Error("El email ya está registrado por otro paciente"));
        } else {
          // Actualizar datos (suponiendo que Joi ya validó que paciente tiene todos los campos)
          pacienteEncontrado.dni = paciente.dni;
          pacienteEncontrado.email = paciente.email;
          pacienteEncontrado.nombre = paciente.nombre;
          pacienteEncontrado.apellido = paciente.apellido;

          resolve(pacienteEncontrado);
        }
      }
    });
  }




  // elimina el cliente con id = id

  delete(id) {
    return new Promise((resolve, reject) => {
      const pacienteEncontrado = this.data.find((p) => p.id == id);

      if (!pacienteEncontrado) {
        reject(new Error("No se encuentra el paciente con el ID proporcionado"));
      } else {
        const pos = this.data.indexOf(pacienteEncontrado);
        this.data.splice(pos, 1);
        resolve(pacienteEncontrado);
      }
    });
  }

  // devuelve la lista completa en un arreglo de strings
  list() {
    return new Promise((resolve, reject) => {
      if (this.data.length > 0) {
        resolve(this.data);
      } else {
        reject(new Error("La lista está vacia"));
      }
    });
  }


  // si quiero obtener el paciente del mock

  getPacienteById(id) {
    return new Promise((resolve, reject) => {
      const paciente = this.data.find((p) => p.id == id);
      if (!paciente) {
        reject(new Error("Paciente no encontrado"));
      } else {
        const { password, ...pacienteSinPassword } = paciente;
        resolve(pacienteSinPassword);
      }
    });
  }
}

module.exports = new PacientesModel();
