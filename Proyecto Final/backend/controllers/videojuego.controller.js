const { Videojuego } = require('../models');

// con paginacion
const getVideojuegosConPaginacion = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Videojuego.findAndCountAll({
      limit,
      offset,
      order: [['id', 'ASC']],
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      videojuegos: rows,
      totalPages,
      page,
      total: count,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los videojuegos', message: error.message });
  }
};

// Ruta: GET /api/videojuegos/all
const getAllVideojuegosSinPaginacion = async (req, res) => {
  try {
    const videojuegos = await Videojuego.findAll({
      order: [['id', 'ASC']],
    });
    res.json({ videojuegos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener todos los videojuegos', message: error.message });
  }
};

const getVideojuegoById = async (req, res) => {
  try {
    const id = req.params.id;
    const videojuego = await Videojuego.findByPk(id);
    if (!videojuego) return res.status(404).json({ error: 'Videojuego no encontrado' });
    res.json({ videojuego });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el videojuego', message: error.message });
  }
};

const createVideojuego = async (req, res) => {
  try {
    const { nombre, estado, categoria, tiempoJugado, calificacion } = req.body;

    if (!Videojuego.estadosValidos.includes(estado)) {
      return res.status(400).json({ error: `Estado inválido. Opciones: ${Videojuego.estadosValidos.join(', ')}` });
    }

    const nuevoVideojuego = await Videojuego.create({ nombre, estado, categoria, tiempoJugado, calificacion });
    res.status(201).json({ message: 'Videojuego creado', videojuego: nuevoVideojuego });
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el videojuego', message: error.message });
  }
};

const updateVideojuego = async (req, res) => {
  try {
    const id = req.params.id;
    const videojuego = await Videojuego.findByPk(id);
    if (!videojuego) return res.status(404).json({ error: 'Videojuego no encontrado' });

    const { nombre, estado, categoria, tiempoJugado, calificacion } = req.body;

    if (estado && !Videojuego.estadosValidos.includes(estado)) {
      return res.status(400).json({ error: `Estado inválido. Opciones: ${Videojuego.estadosValidos.join(', ')}` });
    }

    await videojuego.update({ nombre, estado, categoria, tiempoJugado, calificacion });
    res.json({ message: 'Videojuego actualizado', videojuego });
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el videojuego', message: error.message });
  }
};

const deleteVideojuego = async (req, res) => {
  try {
    const id = req.params.id;
    const videojuego = await Videojuego.findByPk(id);
    if (!videojuego) return res.status(404).json({ error: 'Videojuego no encontrado' });

    await videojuego.destroy();
    res.json({ message: 'Videojuego eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el videojuego', message: error.message });
  }
};

module.exports = {
  getVideojuegosConPaginacion,
  getAllVideojuegosSinPaginacion,
  getVideojuegoById,
  createVideojuego,
  updateVideojuego,
  deleteVideojuego
};
