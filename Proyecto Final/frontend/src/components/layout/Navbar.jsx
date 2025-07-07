import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../common/AuthContext';
import '../../styles/Navbar.css'

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Inicio</Link>
      <Link to="/videojuegos" style={{ marginRight: '1rem' }}>Videojuegos</Link>
      {isLoggedIn ? (
        <button onClick={handleLogout} className="navButton">Cerrar sesión</button>
      ) : (
        <Link to="/login">Iniciar sesión</Link>
      )}
    </nav>
  );
}

export default Navbar;
