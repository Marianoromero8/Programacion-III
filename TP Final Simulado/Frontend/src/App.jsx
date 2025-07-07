/* import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/videojuegos')
      .then(res => res.json())
      .then(data => {
        console.log('Datos cargados:', data);
        setJuegos(data);
      })
      .catch(err => console.error('Error al obtener videojuegos:', err));
  }, []);

  return (
    <div>
      <h1>Lista de Videojuegos</h1>
      <ul>
        {juegos.length === 0 ? (
          <li>Cargando juegos...</li>
        ) : (
          juegos.map(j => (
            <li key={j.nombre}>
              <strong>{j.nombre}</strong> - {j.estado} - {j.categoria} - {j.tiempoJugado}h - {j.calificacion}/10
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App; */

// usando ReactRouter

import { Routes, Route } from 'react-router-dom';
import Lista from './pages/lista';
import Home from './pages/home'; // Pagina de inicio
import Formulario from './pages/formulario';
import NavBar from './components/navbar'; // Para la baarra con las rutas
import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lista" element={<Lista />} />
        <Route path="/formulario" element={<Formulario />} />
      </Routes>
    </>
  );
}

export default App;
