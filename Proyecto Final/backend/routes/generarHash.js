// para la password en que esta en .env
const bcrypt = require('bcryptjs');

async function generateHash(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log('Hash generado:', hash);
}

generateHash('123456');