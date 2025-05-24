'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('consulta_em_casa', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      pupilaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'pupilas', // nome da tabela do model Usuario
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sobrenome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tratamentosArray: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      data_hora_consulta: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      numSessao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'marcado',
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('consulta_em_casa');
  }
};
