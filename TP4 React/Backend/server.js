const express = require('express');
const cors = require('cors');
const personasRoutes = require('./routes/personas.routes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ruta base
app.use('/personas', personasRoutes);

// Ruta raíz opcional para evitar "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de personas. Usa /personas para ver los datos.');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


