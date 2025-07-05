// dentro de una clase
const { Videojuego } = require('./index');

class VideojuegoModel {

  async getAllVideojuegosModel() {
    return await Videojuego.findAll({ order: [['id', 'ASC']] });
  }

  async getVideojuegosPaginadosModel(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Videojuego.findAndCountAll({
      limit,
      offset,
      order: [['id', 'ASC']]
    });

    return {
      videojuegos: rows,
      totalPages: Math.ceil(count / limit),
      total: count,
      page
    };
  }

  async getVideojuegoByIdModel(id) {
    const videojuego = await Videojuego.findByPk(id);
    if (!videojuego) throw new Error('Videojuego no encontrado');
    return videojuego;
  }

  async createVideojuegoModel(data) {
    if (!Videojuego.estadosValidos.includes(data.estado)) {
      throw new Error(`Estado inválido. Opciones: ${Videojuego.estadosValidos.join(', ')}`);
    }
    return await Videojuego.create(data);
  }

  async updateVideojuegoModel(id, data) {
    const videojuego = await this.getVideojuegoByIdModel(id);
    if (data.estado && !Videojuego.estadosValidos.includes(data.estado)) {
      throw new Error(`Estado inválido. Opciones: ${Videojuego.estadosValidos.join(', ')}`);
    }
    await videojuego.update(data);
    return videojuego;
  }

  async deleteVideojuegoModel(id) {
    const videojuego = await this.getVideojuegoByIdModel(id);
    await videojuego.destroy();
    return videojuego;
  }
}

module.exports = new VideojuegoModel();
