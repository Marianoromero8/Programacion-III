// con entities

const Videojuego = require('../mock/entities/videojuego.entity');

class VideojuegosModel {
  constructor() {
    this.videojuegos = [];
    this.contadorId = 1;

    this.agregar('The Witcher 3', 'completado', 'RPG', 120, 10);
    this.agregar('Hollow Knight', 'jugando', 'Metroidvania', 45, 9);
    this.agregar('Celeste', 'pendiente', 'Plataformas', 0, 0);
  }

  agregar(nombre, estado, categoria, tiempoJugado, calificacion) {
    const juego = new Videojuego(nombre, estado, categoria, tiempoJugado, calificacion, this.contadorId++);
    this.videojuegos.push(juego);
    return juego;
  }

  list() {
    return this.videojuegos;
  }

  getById(id) {
    return this.videojuegos.find(j => j.id === id);
  }

  delete(id) {
    const index = this.videojuegos.findIndex(j => j.id === id);
    if (index === -1) return false;
    this.videojuegos.splice(index, 1);
    return true;
  }

  actualizarEstado(id, nuevoEstado) {
    const juego = this.getById(id);
    if (!juego) return null;

    const estadosValidos = ['completado', 'jugando', 'pendiente'];
    if (!estadosValidos.includes(nuevoEstado)) throw new Error('Estado inválido');

    juego.estado = nuevoEstado;
    return juego;
  }

  agregarTiempo(id, horas) {
    const juego = this.getById(id);
    if (!juego) throw new Error('Juego no encontrado');
    if (typeof horas !== 'number' || horas <= 0) throw new Error('Horas inválidas');

    juego.tiempoJugado += horas;
    return juego;
}


  actualizarCalificacion(id, calificacion) {
    if (calificacion < 0 || calificacion > 10) throw new Error('Calificación fuera de rango');

    const juego = this.getById(id);
    if (!juego) return null;

    juego.calificacion = calificacion;
    return juego;
  }
}

module.exports = new VideojuegosModel();

