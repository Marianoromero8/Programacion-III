import React, { useEffect, useState } from 'react';
import ListaTarjetas from '../ListaTarjetas/ListaTarjetas';

const TraerPersonas = () => {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/personas')
    // para el respuesta del json
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      // para ver si se reciben los datos del backup
      .then(data => {
        console.log("Datos recibidos:", data);
        setPersonas(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener personas:', error);
        setLoading(false);
      })
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (personas.length === 0) return <p>No hay personas disponibles.</p>;

  return <ListaTarjetas personas={personas} />;
};

export default TraerPersonas;

