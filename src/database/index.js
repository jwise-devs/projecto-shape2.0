const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const Usuario = require('../model/Usuario');
const Ficha = require('../model/Ficha_De_Dados');

const connection = new Sequelize(databaseConfig);
Usuario.init(connection);
Ficha.init(connection);

Usuario.associate( connection.models );
Ficha.associate( connection.models );

connection.sync({ force: false }) // Sincroniza o banco de dados (force: true recria as tabelas)
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err.message);
  });

  module.exports = connection;
