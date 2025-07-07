const Identificador = require('./identificador.entity');

class Videojuego extends Identificador {
  static estadosValidos = ['completado', 'jugando', 'pendiente'];

  constructor(nombre, estado, categoria, tiempoJugado, calificacion, id = 0) {
    super(id);

    if (!Videojuego.estadosValidos.includes(estado)) {
      throw new Error(`Estado inválido. Debe ser uno de: ${Videojuego.estadosValidos.join(', ')}`);
    }

    this.nombre = nombre;
    this.estado = estado;
    this.categoria = categoria;
    this.tiempoJugado = tiempoJugado;
    this.calificacion = calificacion;
  }
}

module.exports = Videojuego;
