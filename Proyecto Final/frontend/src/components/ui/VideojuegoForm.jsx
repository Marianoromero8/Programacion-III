// con validacion basica de los campos calificacion y horas
import { useState } from 'react';
import EstadoSelect from '../common/EstadoSelect';
import styles from '../../styles/VideojuegoForm.module.css';


const initial = {
  nombre: '',
  categoria: '',
  estado: 'pendiente',
  tiempoJugado: 0,
  calificacion: 0,
};

// con un css modular
function VideojuegoForm({ onAdd }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'tiempoJugado' || name === 'calificacion' ? Number(value) : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (form.calificacion < 0 || form.calificacion > 10) {
      newErrors.calificacion = 'La calificación debe estar entre 0 y 10';
    }
    if (form.tiempoJugado < 0) {
      newErrors.tiempoJugado = 'Las horas jugadas no pueden ser negativas';
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onAdd(form);
    setForm(initial);
    setErrors({});
  };

  return (
    <div className={styles.container}>
      <h3>Agregar Videojuego</h3>

      <div>
        <label>Nombre:</label><br />
        <input
          className={styles.input}
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
        />
      </div>

      <div>
        <label>Categoría:</label><br />
        <input
          className={styles.input}
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          placeholder="Categoría"
        />
      </div>

      <div>
        <label>Estado:</label><br />
        <EstadoSelect
          value={form.estado}
          onChange={e => handleChange({ target: { name: 'estado', value: e.target.value } })}
          className={styles.select}
        />
      </div>

      <div>
        <label>Horas jugadas:</label><br />
        <input
          className={styles.inputSmall}
          type="number"
          name="tiempoJugado"
          value={form.tiempoJugado}
          onChange={handleChange}
          placeholder="Horas jugadas"
        />
        {errors.tiempoJugado && (
          <p className={styles.errorText}>{errors.tiempoJugado}</p>
        )}
      </div>

      <div>
        <label>Calificación:</label><br />
        <input
          className={styles.inputSmall}
          type="number"
          name="calificacion"
          value={form.calificacion}
          onChange={handleChange}
          placeholder="Calificación"
        />
        {errors.calificacion && (
          <p className={styles.errorText}>{errors.calificacion}</p>
        )}
      </div>

      <button onClick={handleSubmit} className={styles.button}>
        Agregar
      </button>
    </div>
  );
}


export default VideojuegoForm;

