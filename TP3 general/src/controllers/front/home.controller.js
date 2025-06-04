const pacientesModel = require("../../models/mock/pacientes.models.js");
const turnosModel = require("../../models/mock/turnos.models.js")

const home = async (req, res) => {
    res.render("home", {
        title: "home",
        message: "Bienvenido a Clinica Cuidar"
    });
};

const login = async (req, res) => {
    res.render("login", {
        title: "login",
        message: "Para logearse ingrese el email y password"
    });
};

const pacientes = async (req, res) => {
    try {
        const pacientes = await pacientesModel.list();
        res.render("pacientes", {
            title: "Pacientes",
            message: "Pacientes registrados",
            pacientes: pacientes,
            error: null
        });
    } catch (error) {
        res.render("pacientes", {
            title: "Pacientes",
            message: "Error al cargar pacientes",
            pacientes: [],
            error: "Error al cargar pacientes"
        });
    }
};


const turnos = async (req, res) => {
    try {
        const turnos = await turnosModel.list();
        res.render("turnos", {
            title: "turnos",
            message: "Turnos registrados",
            turnos: turnos,
            error: null
        })
    } catch (error) {
        res.render("turnos", {
            title: "lista de turnos",
            message: "error",
            pacientes: [],
            error: "Error al cargar turnos"
        });
    }
};


module.exports = {
    home,
    login,
    pacientes,
    turnos
};