const videojuegosModel = require('../models/videojuego.modelConLogica.js');

class VideojuegosController {

  async list(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const paginacion = await videojuegosModel.getVideojuegosPaginadosModel(page, limit);
      res.status(200).json(paginacion);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los videojuegos', message: error.message });
    }
  }


  async all(req, res) {
    try {
      const videojuegos = await videojuegosModel.getAllVideojuegosModel();
      res.status(200).json({ videojuegos });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener todos los videojuegos', message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const videojuego = await videojuegosModel.getVideojuegoByIdModel(req.params.id);
      res.status(200).json({ videojuego });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const nuevo = await videojuegosModel.createVideojuegoModel(req.body);
      res.status(201).json({ message: 'Videojuego creado', videojuego: nuevo });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const actualizado = await videojuegosModel.updateVideojuegoModel(req.params.id, req.body);
      res.status(200).json({ message: 'Videojuego actualizado', videojuego: actualizado });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const eliminado = await videojuegosModel.deleteVideojuegoModel(req.params.id);
      res.status(200).json({ message: 'Videojuego eliminado', videojuego: eliminado });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new VideojuegosController();
