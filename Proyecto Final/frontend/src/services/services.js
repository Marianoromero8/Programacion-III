import axios from 'axios'

const URL = 'http://localhost:3001';

export const getAll = () => axios.get(`${URL}`)
export const getById = () => axios.get(`${URL}/videogame/:id`)
export const createVideogame = () => axios.post(`${URL}/form-create`)
export const editVideogame = () => axios.patch(`${URL}/videogame/:id`)
