// lista sin poder cambiar los estados

/* import { useEffect, useState } from 'react';

function Lista() {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/videojuegos')
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener datos del servidor');
        return res.json();
      })
      .then(data => {
        setJuegos(data);
        setCargando(false);
      })
      .catch(err => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando juegos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Lista de Videojuegos</h1>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Categoría</th>
            <th>Horas Jugadas</th>
            <th>Calificación</th>
          </tr>
        </thead>
        <tbody>
          {juegos.map(j => (
            <tr key={j.id}>
              <td>{j.id}</td>
              <td>{j.nombre}</td>
              <td>{j.estado}</td>
              <td>{j.categoria}</td>
              <td>{j.tiempoJugado} h</td>
              <td>{j.calificacion}/10</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Lista; */

import { useEffect, useState } from 'react';

function Lista() {
  const [juegos, setJuegos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarJuegos();
  }, []);

  const cargarJuegos = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/videojuegos');
      const data = await res.json();
      setJuegos(data);
    } catch (err) {
      setError('Error al cargar juegos');
    }
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      const res = await fetch(`http://localhost:3000/api/videojuegos/${id}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (!res.ok) throw new Error('Error al actualizar estado');
      const actualizado = await res.json();

      // Actualiza el estado local
      setJuegos(prev =>
        prev.map(j => (j.id === id ? { ...j, estado: actualizado.estado } : j))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Lista de Videojuegos</h1>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Categoría</th>
            <th>Horas Jugadas</th>
            <th>Calificación</th>
          </tr>
        </thead>
        <tbody>
          {juegos.map(j => (
            <tr key={j.id}>
              <td>{j.id}</td>
              <td>{j.nombre}</td>
              <td>
                <select value={j.estado} onChange={e => cambiarEstado(j.id, e.target.value)}>
                  <option value="pendiente">Pendiente</option>
                  <option value="jugando">Jugando</option>
                  <option value="completado">Completado</option>
                </select>
              </td>
              <td>{j.categoria}</td>
              <td>{j.tiempoJugado} h</td>
              <td>{j.calificacion}/10</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Lista;
