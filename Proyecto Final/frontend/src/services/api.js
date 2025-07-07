import { getToken } from '../utils/token';

const API_URL = 'http://localhost:3001/api';

// función de utilidad para hacer fetch incluyendo el token automáticamente
export async function fetchWithAuth(url, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error de API');
  }

  return res.json();
}
