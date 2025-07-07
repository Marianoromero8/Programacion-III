'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Videojuegos', [
      {
        nombre: 'The Legend of Zelda: Breath of the Wild',
        estado: 'completado',
        categoria: 'Aventura',
        tiempoJugado: 120,
        calificacion: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Among Us',
        estado: 'jugando',
        categoria: 'Multijugador',
        tiempoJugado: 25,
        calificacion: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Minecraft',
        estado: 'pendiente',
        categoria: 'Sandbox',
        tiempoJugado: 0,
        calificacion: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Cyberpunk 2077',
        estado: 'jugando',
        categoria: 'RPG',
        tiempoJugado: 40,
        calificacion: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'God of War',
        estado: 'completado',
        categoria: 'Acción',
        tiempoJugado: 50,
        calificacion: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Hades',
        estado: 'jugando',
        categoria: 'Roguelike',
        tiempoJugado: 30,
        calificacion: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Stardew Valley',
        estado: 'pendiente',
        categoria: 'Simulación',
        tiempoJugado: 0,
        calificacion: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Fortnite',
        estado: 'jugando',
        categoria: 'Battle Royale',
        tiempoJugado: 60,
        calificacion: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Dark Souls III',
        estado: 'completado',
        categoria: 'RPG',
        tiempoJugado: 80,
        calificacion: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Animal Crossing: New Horizons',
        estado: 'pendiente',
        categoria: 'Simulación',
        tiempoJugado: 0,
        calificacion: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Overwatch',
        estado: 'jugando',
        categoria: 'Shooter',
        tiempoJugado: 45,
        calificacion: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Resident Evil Village',
        estado: 'completado',
        categoria: 'Survival Horror',
        tiempoJugado: 55,
        calificacion: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Videojuegos', null, {});
  }
};


