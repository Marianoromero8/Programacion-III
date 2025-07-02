const express = require('express');
const router = express.Router();
const personasController = require('../controllers/personas.controller.js');

router.get('/', personasController.getPersonas);

module.exports = router;
