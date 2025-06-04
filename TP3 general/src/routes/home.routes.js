const {Router} = require('express');
// para el frontend
const{home, login, pacientes, turnos} = require("../controllers/front/home.controller.js")

const rutaHome = Router();

//Otras rutas CRUD

rutaHome.get('/', home) //localhost:3000/
rutaHome.get('/login', login) //localhost:3000/login
rutaHome.get('/pacientes', pacientes) //localhost:3000/pacientes
rutaHome.get('/turnos', turnos) //localhost:3000/turnos

module.exports = rutaHome;




