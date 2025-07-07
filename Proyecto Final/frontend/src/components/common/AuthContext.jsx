// para usar el token.js, el api.js y validar el token en local storage
import { createContext, useState, useEffect } from 'react';
import { saveToken, getToken, removeToken } from '../../utils/token';
import { fetchWithAuth } from '../../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getToken());
  const [loading, setLoading] = useState(true);

  const login = async (username, password) => {
    const res = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Error en autenticación');
    }

    const data = await res.json();
    setToken(data.token);
    saveToken(data.token);
  };

  const logout = () => {
    setToken(null);
    removeToken();
  };

  useEffect(() => {
    const validateToken = async () => {
      const storedToken = getToken();

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        // agregar el token automáticamente y manejar errores
        await fetchWithAuth('/auth/validate');
        setToken(storedToken);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isLoggedIn: !!token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
