const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { verifyTokenMiddleware } = require('../middleware/verifyTokenMiddleware');
const validate = require('../middleware/validate');
const videojuegoSchema = require('../schemas/videojuegos.schemas');

const router = express.Router();

// TODO: En el readme aclarar que como es una aplicacion para una sola persona no es necesario complicar esta parte

// en caso contrario hay que dividir esto en entity, controlador, modelo y dejar aca solo la ruta
const users = [
  {
    id: 1,
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD_HASH,
  },
];

// POST /login - login y generación de token con expiración
router.post(
  '/login',
  validate(videojuegoSchema.login),
  async (req, res) => {
    const { username, password } = req.body;
    // si tuviera que poner un modelo la funcion find deberia llevarme a un modelo con la logica que busque al usuario en la base de datos
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('Falta JWT_SECRET en el .env');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  }
);

// GET /validate - validar token usando middleware
router.get('/validate', verifyTokenMiddleware, (req, res) => {
  res.json({
    valid: true,
    user: req.user,
  });
});

module.exports = router;
