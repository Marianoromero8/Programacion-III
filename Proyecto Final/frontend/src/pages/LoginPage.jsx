import { useState, useContext } from 'react';
import { AuthContext } from '../components/common/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/LoginPage.module.css'

function LoginPage() {
  const { login } = useContext(AuthContext);
  //para redireccionar una vez hecho el login correctamente
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(username, password);
      alert('Login exitoso');
      navigate('/videojuegos');
    } catch (error) {
      alert(error.message || 'Error en login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <button
          className={styles.button}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
