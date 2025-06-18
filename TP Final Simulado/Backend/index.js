const Server = require('./server');

// Si luego conectas una DB, aquí iría: connectDB();

const server = new Server(); // o sin argumento si no usas EJS
server.listen();


