import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

// funcion para redireccionar a Login en caso de que no tenga el token
function PrivateRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
