const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const Usuario = require('../model/Usuario');
const Ficha = require('../model/Ficha_De_Dados');
const Sessao = require('../model/Sessao');
const Tratamentos = require('../model/Tratamentos');
const SessaoTratamentoData = require('../model/SessaoTratamentoData');
const Foto = require('../model/Foto');

const connection = new Sequelize(databaseConfig);
Usuario.init(connection);
Ficha.init(connection);
Sessao.init(connection);
Tratamentos.init(connection);
SessaoTratamentoData.init(connection);
Foto.init(connection);

Usuario.associate( connection.models );
Ficha.associate( connection.models );
Sessao.associate( connection.models );
Tratamentos.associate(connection.models);
SessaoTratamentoData.associate(connection.models);
Foto.associate(connection.models);

connection.sync({ force: false }) // Sincroniza o banco de dados (force: true recria as tabelas)
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err.message);
  });

  module.exports = connection;
