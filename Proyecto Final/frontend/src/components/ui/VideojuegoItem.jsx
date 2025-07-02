import { useState, useEffect } from 'react';
import EstadoSelect from '../common/EstadoSelect';
import styles from '../../styles/VideojuegoItem.module.css';

function VideojuegoItem({ v, onUpdate, onDelete, editando, onStartEdit, onStopEdit }) {
  const [form, setForm] = useState(v);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(v); // Actualiza el formulario si cambia v
  }, [v]);

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

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const { id, createdAt, updatedAt, ...patch } = form;
    onUpdate(v.id, patch);
    onStopEdit();
    setErrors({});
  };

  if (editando) {
    return (
      <div className={styles.editingContainer}>
        <h4 className={styles.title}>✏️ Editando: {v.nombre}</h4>

        <label className={styles.label}>
          Nombre:
          <input
            className={styles.input}
            name="nombre"
            value={form.nombre ?? ''}
            onChange={handleChange}
            placeholder="Nombre"
          />
        </label>

        <label className={styles.label}>
          Categoría:
          <input
            className={styles.input}
            name="categoria"
            value={form.categoria ?? ''}
            onChange={handleChange}
            placeholder="Categoría"
          />
        </label>

        <label className={styles.label}>
          Estado:
          <EstadoSelect
            className={styles.select}
            value={form.estado ?? 'pendiente'}
            onChange={(e) =>
              handleChange({ target: { name: 'estado', value: e.target.value } })
            }
          />
        </label>

        <label className={styles.label}>
          Horas jugadas:
          <input
            className={styles.inputSmall}
            type="number"
            name="tiempoJugado"
            value={form.tiempoJugado ?? 0}
            onChange={handleChange}
          />
          {errors.tiempoJugado && (
            <p className={styles.errorText}>{errors.tiempoJugado}</p>
          )}
        </label>

        <label className={styles.label}>
          Calificación:
          <input
            className={styles.inputSmall}
            type="number"
            name="calificacion"
            value={form.calificacion ?? 0}
            onChange={handleChange}
          />
          {errors.calificacion && (
            <p className={styles.errorText}>{errors.calificacion}</p>
          )}
        </label>

        <div style={{ marginTop: 10 }}>
          <button className={styles.buttonGuardar} onClick={handleSave}>
            Guardar
          </button>
          <button className={styles.buttonCancelar} onClick={onStopEdit}>
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{v.nombre}</h4>
      <p><strong>Categoría:</strong> {v.categoria}</p>
      <p><strong>Horas jugadas:</strong> {v.tiempoJugado}</p>
      <p><strong>Calificación:</strong> {v.calificacion} / 10</p>
      <p><strong>Estado:</strong> {v.estado}</p>

      <div style={{ marginTop: 10 }}>
        <button className={styles.buttonModificar} onClick={onStartEdit}>Modificar</button>
        <button className={styles.buttonEliminar} onClick={() => onDelete(v.id)}>Eliminar</button>
      </div>
    </div>
  );
}

export default VideojuegoItem;
