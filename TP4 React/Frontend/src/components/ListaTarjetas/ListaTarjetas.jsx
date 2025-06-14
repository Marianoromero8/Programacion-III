// para una version react 17 o superior no es necesario hacer el import de React
import React from 'react';
import TarjetaPersona from '../TarjetaPersona/TarjetaPersona';
import './ListaTarjetas.css';

const ListaTarjetas = ({ personas }) => {
  return (
    <div className="listaTarjetas">
      {personas.map((persona, index) => (
        <TarjetaPersona key={index} persona={persona} />
      ))}
    </div>
  );
};

export default ListaTarjetas;

