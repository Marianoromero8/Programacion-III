const {Router} = require('express');
// estos son con el anterior ejs no el de gianluca
//const {home} = require('../controllers/home/home.controller.js')
//const {pacientes} = require('./../controllers/home/pacientes.controller.js')
const{home, login, pacientes, turnos} = require("../controllers/front/home.controller.js")

const rutaHome = Router();

//Otras rutas CRUD

rutaHome.get('/', home) //localhost:3000/
rutaHome.get('/login', login) //localhost:3000/login
rutaHome.get('/pacientes', pacientes) //localhost:3000/pacientes
rutaHome.get('/turnos', turnos) //localhost:3000/turnos

module.exports = rutaHome;

// rutaHome.get('/pacientes', (req, res) => {
//   res.render("pacientes", {
//     title: "Pacientes",
//     message: "Listado de pacientes"
//   });
// });

// rutaHome.get('/turnos', (req, res) => {
//   res.render("turnos", {
//     title: "Turnos",
//     message: "Listado de turnos"
//   });
// });



