'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Videojuego extends Model {
    static associate(models) {
      // define association here
    }

    // Definimos estadosValidos como propiedad estática
    static get estadosValidos() {
      return ['completado', 'jugando', 'pendiente'];
    }
  }

  Videojuego.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('completado', 'jugando', 'pendiente'),
      allowNull: false,
      defaultValue: 'pendiente'
    },
    categoria: {
      type: DataTypes.STRING
    },
    tiempoJugado: {
      type: DataTypes.INTEGER
    },
    calificacion: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Videojuego',
    tableName: 'Videojuegos',
    timestamps: true
  });

  return Videojuego;
};
