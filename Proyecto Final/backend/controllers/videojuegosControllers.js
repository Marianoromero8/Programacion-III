const Videogame = require("../models/videogameModel")

const getVideogames = async (req, res) => {
    try{
        const callVideogames = await Videogame.findAll()
        res.status(200).json(callVideogames)
    } catch(error) {
        res.status(500).json({error: error.message})
    }
}

const getVideogameById = async (req, res) => {
    const { id } = req.params
    try{
        const videogame = await Videogame.findByPk(id)
        if(!videogame){
            return res.status(404).json({error: 'Videogame not found'})
        }
        res.status(200).json(videogame)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

const createVideogame = async (req, res) => {
    const {title, description, state, category, rating, time} = req.body 

    if(!title || !state || !category || !rating || !time){
        return res.status(400).json({error: 'Empty field'})
    }
    try{
        const newVideogame = await Videogame.create({
            title,
            description,
            category,
            rating,
            state,
            time
        })
        res.status(201).json(newVideogame)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

const updateVideogame = async (req, res) => {
    const { id } = req.params

    try{
        const videogame = await Videogame.findByPk(id)

        if(!videogame){
            return res.status(404).json({error: 'Videogame not found'})        
        }

        await videogame.update(req.body)

        res.status(200).json(videogame)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {getVideogames, getVideogameById, createVideogame, updateVideogame}