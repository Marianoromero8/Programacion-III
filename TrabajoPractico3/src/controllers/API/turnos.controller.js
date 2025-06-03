const turnos = [];

exports.getTurnosByPaciente = (req, res) => {
    const { idPaciente } = req.params;
    const resultado = turnos.filter(t => t.idPaciente === idPaciente);
    res.json(resultado);
};

exports.cancelarTurno = (req, res) => {
    const { idTurno } = req.params;
    const index = turnos.findIndex(t => t.id === idTurno);
    if (index >= 0) {
        turnos.splice(index, 1);
        res.json({ mensaje: 'Turno cancelado' });
    } else {
        res.status(404).json({ error: 'Turno no encontrado' });
    }
};