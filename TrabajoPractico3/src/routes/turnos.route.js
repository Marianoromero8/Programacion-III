const express = require('express');
const router = express.Router();
const turnosController = require('../controllers/API/turnos.controller');

router.get('/:idPaciente', turnosController.getTurnosByPaciente);
router.delete('/:idTurno', turnosController.cancelarTurno);

module.exports = router;