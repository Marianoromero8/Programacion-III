// con paginacion
import { useState } from 'react';
import { useVideojuegos } from '../hooks/useVideojuegos';
import VideojuegoForm from '../components/ui/VideojuegoForm';
import VideojuegoItem from '../components/ui/VideojuegoItem';
import Container from '../components/layout/Container';
import styles from '../styles/VideojuegosPage.module.css'

function VideojuegosPage() {
  const {
    videojuegos,
    page,
    totalPages,
    setPage,
    add,
    update,
    remove
  } = useVideojuegos();

  const [editandoId, setEditandoId] = useState(null);

  return (
    <Container>
      <h2>🎮 Mis Videojuegos</h2>
      <VideojuegoForm onAdd={add} />

      {videojuegos.map(v => (
        <VideojuegoItem
          key={v.id}
          v={v}
          onUpdate={update}
          onDelete={remove}
          editando={editandoId === v.id}
          onStartEdit={() => setEditandoId(v.id)}
          onStopEdit={() => setEditandoId(null)}
        />
      ))}   

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <button
          className={styles.paginationButton}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Anterior
        </button>

        <span style={{ margin: '0 1rem' }}>
          Página {page} de {totalPages}
        </span>

        <button
          className={styles.paginationButton}
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Siguiente
        </button>
      </div>

    </Container>
  );
}

export default VideojuegosPage;
