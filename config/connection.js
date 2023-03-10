require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_DB,
  process.env.DB_USER,
  process.env.DB_PW, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true,
    },
  }
  
  );

module.exports = sequelize;