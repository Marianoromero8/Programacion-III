/* function Formulario() {
  return <h1>Página de Formulario</h1>;
}

export default Formulario; */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Formulario() {
  const [form, setForm] = useState({
    nombre: '',
    estado: 'pendiente',
    categoria: '',
    tiempoJugado: 0,
    calificacion: 0,
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Para redirigir después de enviar

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convertir a número si el campo lo requiere
    const newValue =
      name === 'tiempoJugado' || name === 'calificacion' ? Number(value) : value;

    setForm(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/videojuegos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Error al guardar');
      }

      navigate('/lista'); // Redirigir a la lista después de agregar
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Agregar Nuevo Videojuego</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required />
        </div>
        <div>
          <label>Estado:</label>
          <select name="estado" value={form.estado} onChange={handleChange}>
            <option value="pendiente">Pendiente</option>
            <option value="jugando">Jugando</option>
            <option value="completado">Completado</option>
          </select>
        </div>
        <div>
          <label>Categoría:</label>
          <input name="categoria" value={form.categoria} onChange={handleChange} required />
        </div>
        <div>
          <label>Tiempo Jugado (horas):</label>
          <input type="number" name="tiempoJugado" value={form.tiempoJugado} onChange={handleChange} min="0" />
        </div>
        <div>
          <label>Calificación (0 a 10):</label>
          <input type="number" name="calificacion" value={form.calificacion} onChange={handleChange} min="0" max="10" />
        </div>
        <button type="submit">Agregar</button>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </form>
    </div>
  );
}

export default Formulario;
