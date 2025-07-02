import React from 'react';
import './TarjetaPersona.css';

const TarjetaPersona = ({ persona }) => {
  const { id, nombre, apellido, edad, email } = persona;

  return (
    <div className="tarjetaPersona">
      <h3>{nombre} {apellido}</h3>
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Edad:</strong> {edad}</p>
      <p><strong>Email:</strong> {email}</p>
    </div>
  );
};

export default TarjetaPersona;



