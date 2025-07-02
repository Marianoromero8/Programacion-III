const express = require('express');
const router = express.Router();

// Importar rutas
const videojuegoRoutes = require('./videojuegos.routes');

// Ruta de prueba
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rutas de videojuegos
router.use('/videojuegos', videojuegoRoutes);

module.exports = router;
