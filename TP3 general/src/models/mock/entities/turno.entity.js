const Identificador = require("./identificador.entity");
const Paciente = require("./paciente.entity");

class Turno extends Identificador {

    constructor(fecha, hora, paciente, motivo = "", id = 0) {
        super(id);
        this.fecha = fecha;       // Fecha en formato 'YYYY-MM-DD'
        this.hora = hora;         // Hora en formato 'HH:mm'
        this.paciente = paciente; // Instancia de Paciente
        this.motivo = motivo;     
    }
}

module.exports = Turno;
