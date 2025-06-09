const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';

// Configuración de la base de datos
const config = {
  username: process.env.DB_USER || 'app_user',
  password: process.env.DB_PASSWORD || 'app_password',
  database: process.env.DB_NAME || 'app_database',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
  logging: env === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
    pool: config.pool
  }
);

// Aquí puedes importar y definir tus modelos
// const User = require('./user')(sequelize, Sequelize.DataTypes);

// Exportar sequelize y modelos
module.exports = {
  sequelize,
  Sequelize
};
