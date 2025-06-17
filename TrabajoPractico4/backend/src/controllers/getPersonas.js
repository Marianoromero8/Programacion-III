const personas = require("../models/modelPersona") 

const getPersonas = (req, res) => {
    res.json(personas) 
}

module.exports = { getPersonas }