const opciones = ['pendiente', 'jugando', 'completado'];

function EstadoSelect({ value, onChange, className }) {
  return (
    <select value={value} onChange={onChange} className={className}>
      {opciones.map(e => <option key={e} value={e}>{e}</option>)}
    </select>
  );
}

export default EstadoSelect;
