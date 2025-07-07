import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/lista">Lista</Link></li>
        <li><Link to="/formulario">Formulario</Link></li>
      </ul>
    </nav>
  )
}

export default NavBar
