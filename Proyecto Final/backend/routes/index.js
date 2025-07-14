const express = require('express');
const { getVideogames, getVideogameById, createVideogame, updateVideogame } = require('../controllers/videojuegosControllers');
const router = express.Router();

router.get('/', getVideogames)
router.get('/videogame/:id', getVideogameById)
router.post('/form-create', createVideogame)
router.patch('/videogame/:id', updateVideogame)

module.exports = router;
