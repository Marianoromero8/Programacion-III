const express = require('express');
const routes = require('../src/routes/personas');
const cors = require('cors')

const server = express();


server.use(cors())
server.use(express.json()); 
server.use('/', routes);

module.exports = server;