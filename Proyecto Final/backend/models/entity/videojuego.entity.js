const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Videojuego = sequelize.define('Videojuego', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM('completado', 'jugando', 'pendiente'),
      allowNull: false,
      defaultValue: 'pendiente',
    },
    categoria: {
      type: DataTypes.STRING,
    },
    tiempoJugado: {
      type: DataTypes.INTEGER,
    },
    calificacion: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'Videojuegos',
    timestamps: true,
  });

  // Propiedad estática de estados válidos
  Videojuego.estadosValidos = ['completado', 'jugando', 'pendiente'];

  return { Videojuego };
};
