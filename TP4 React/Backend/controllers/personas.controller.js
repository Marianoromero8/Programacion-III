const personasModel = require('../models/personas.model.js');

const getPersonas = (req, res) => {
  res.json(personasModel);
};

module.exports = {
  getPersonas
};
