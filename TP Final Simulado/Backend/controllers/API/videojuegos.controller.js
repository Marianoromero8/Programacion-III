const model = require('../../models/mock/videojuegos.model');
const Videojuego = require('../../models/mock/entities/videojuego.entity');

class VideojuegoController {
  // GET /api/videojuegos
  list(req, res) {
    const juegos = model.list();
    res.json(juegos);
  }

  // GET /api/videojuegos/:id
  getById(req, res) {
    const id = parseInt(req.params.id);
    const juego = model.getById(id);
    if (!juego) {
      return res.status(404).json({ error: 'Videojuego no encontrado' });
    }
    res.json(juego);
  }

  // POST /api/videojuegos
  create(req, res) {
    const { nombre, estado, categoria, tiempoJugado, calificacion } = req.body;

    try {
      const nuevoJuego = model.agregar(nombre, estado, categoria, tiempoJugado, calificacion);
      res.status(201).json(nuevoJuego);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // PUT /api/videojuegos/:id/estado
  updateEstado(req, res) {
    const id = parseInt(req.params.id);
    const { estado } = req.body;

    try {
      const juegoActualizado = model.actualizarEstado(id, estado);
      if (!juegoActualizado) return res.status(404).json({ error: 'No encontrado' });

      res.json(juegoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  //entrada en postman
  // {
  // "estado": "completado"
  // }

  // PUT /api/videojuegos/:id/tiempo
  addTiempo(req, res) {
    const id = parseInt(req.params.id);
    const { horas } = req.body;

    try {
      const juegoActualizado = model.agregarTiempo(id, horas);
      res.json(juegoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  //entrada en postman
  // {
  // "horas": 5
  // }

  // PUT /api/videojuegos/:id/calificacion
  updateCalificacion(req, res) {
    const id = parseInt(req.params.id);
    const { calificacion } = req.body;

    try {
      const juegoActualizado = model.actualizarCalificacion(id, calificacion);
      if (!juegoActualizado) return res.status(404).json({ error: 'No encontrado' });

      res.json(juegoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  //entrada en postman
  // {
  // "calificacion": 10
  // }

  // DELETE /api/videojuegos/:id
  delete(req, res) {
    const id = parseInt(req.params.id);
    const eliminado = model.delete(id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Videojuego no encontrado' });
    }
    res.json({ mensaje: 'Videojuego eliminado correctamente' });
  }
}

module.exports = new VideojuegoController();

