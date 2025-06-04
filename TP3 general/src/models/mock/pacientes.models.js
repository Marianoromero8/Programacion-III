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
    this.id = 1;

    this.data.push(
      {
        id: this.id++,
        dni: "123456787",
        nombre: "Sergio",
        apellido: "Antozzi",
        email: "email@gmail.com",
        password: "12345"
      },
      {
        id: this.id++,
        dni: "987456321",
        nombre: "Jose",
        apellido: "Perez",
        email: "jose@gmail.com",
        password: "98765"
      },
      {
        id: this.id++,
        dni: "456123789",
        nombre: "Ana",
        apellido: "Gomez",
        email: "ana@gmail.com",
        password: "45678"
      },
      {
        id: this.id++,
        dni: "789456123",
        nombre: "Luis",
        apellido: "Martinez",
        email: "luis@gmail.com",
        password: "78912"
      },
      {
        id: this.id++,
        dni: "321654987",
        nombre: "Marta",
        apellido: "Lopez",
        email: "marta@gmail.com",
        password: "32165"
      }
    );
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

  validateLogin(email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        // Lista de emails que tienen permiso para iniciar sesión
        const adminEmails = ["email@gmail.com"];

        // Verifica si el email está en la lista
        if (!adminEmails.includes(email)) {
          throw new Error("Acceso restringido a administradores");
        }

        const userFound = await this.findByEmail(email, password);

        if (!userFound || userFound.password == null) {
          throw new Error("Email o password incorrectos");
        }

        //payload, secreto, tiempo de expiracion
        const payload = {
          userId: userFound.id,
          userEmail: userFound.email,
        };

        const token = jwt.sign(payload, Config.secreteWord, {
          expiresIn: Config.expiresIn,
        });
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  }

  // si no quiero que haya un dni o email duplicado
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
