const express = require('express');
const cors = require('cors');
const path = require('path');
const videojuegosRoutes = require('./routes/API/videojuegos.routes');

class Server {
  constructor(viewEngine = null) {
    this.app = express();
    this.port = process.env.PORT || 3000;

    if (viewEngine === 'ejs') {
      this.app.set('view engine', 'ejs');
      this.app.set('views', path.join(__dirname, 'views'));
    }

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Aquí se aplica CORS
    
    // para un JSON normal en http://localhost:3000/api/videojuegos
    //this.app.use(cors());

    // para un react en el nuevo puerto
    this.app.use(cors({
      origin: 'http://localhost:5173' // Puerto por defecto de Vite
    }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    // para tener la raiz /api/videojuegos despues del localhost
    this.app.use('/api/videojuegos', videojuegosRoutes);

    // Ruta base para ver si estaba funcionando el servidor
    this.app.get('/', (req, res) => {
      res.send('Servidor de videojuegos en funcionamiento');
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;

