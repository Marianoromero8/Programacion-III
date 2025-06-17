import './App.css'
import { useEffect, useState } from 'react'
import ListaTarjeta from './components/ListaTarjetas/ListaTarjeta'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'

function App() {

  const [personas, setPersonas] = useState([])

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const response = await axios.get("http://localhost:3000")
        console.log("Respuesta API:", response.data)
        setPersonas(response.data)
      } catch (error) {
        return ("Error! no se llaman a las personas")
      }
    }

    fetchPersonas()
  }, [])

  return (

    <Routes>

      <Route path='/' element={<ListaTarjeta personas={personas} />} />

    </Routes>

  )
}

export default App
