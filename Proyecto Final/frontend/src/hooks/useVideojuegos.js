import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../services/api';

export function useVideojuegos(initialLimit = 10) {
  const [videojuegos, setVideojuegos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Función reutilizable para cargar videojuegos
  const loadVideojuegos = async (pageNumber) => {
    setLoading(true);
    try {
      const data = await fetchWithAuth(`/videojuegos?page=${pageNumber}&limit=${limit}`);
      setVideojuegos(data.videojuegos);
      setTotalPages(data.totalPages);
      setTotal(data.total);
      setPage(data.page); //  Actualizar según lo que devuelve el backend
    } catch (error) {
      console.error('Error cargando videojuegos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial o cuando cambia la página
  useEffect(() => {
    loadVideojuegos(page);
  }, [page]);

  // Agregar videojuego: ir directamente a la última página y recargar
  const add = async (v) => {
    setLoading(true);
    try {
      await fetchWithAuth('/videojuegos', {
        method: 'POST',
        body: JSON.stringify(v),
      });

      const newTotal = total + 1;
      const newTotalPages = Math.ceil(newTotal / limit);

      setTotal(newTotal);
      setTotalPages(newTotalPages);
      setPage(newTotalPages);
    } catch (error) {
      console.error('Error agregando videojuego:', error);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un videojuego en la lista
  const update = async (id, patch) => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`/videojuegos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      });
      const updated = res.videojuego;
      setVideojuegos((prev) => prev.map((v) => (v.id === id ? updated : v)));
    } catch (error) {
      console.error('Error actualizando videojuego:', error);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar videojuego y ajustar página si es necesario
  const remove = async (id) => {
    setLoading(true);
    try {
      await fetchWithAuth(`/videojuegos/${id}`, {
        method: 'DELETE',
      });

      const newTotal = total - 1;
      const newTotalPages = Math.max(1, Math.ceil(newTotal / limit));
      const newPage = page > newTotalPages ? newTotalPages : page;

      setTotal(newTotal);
      setTotalPages(newTotalPages);
      setPage(newPage);
    } catch (error) {
      console.error('Error eliminando videojuego:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    // valores (estado)
    videojuegos,
    loading,
    page,
    totalPages,
    total,
    limit,

    // funciones (acciones)
    setPage,
    add,
    update,
    remove,
  };
}
