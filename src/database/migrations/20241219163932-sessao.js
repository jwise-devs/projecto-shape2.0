'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('sessao', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },


      tratamentosArray: {  // Adicionando o campo de nome do tratamento
        type: DataTypes.JSON,
        allowNull: true,
      },

      pacote: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      subpacote: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "marcado",
      },

      data_hora_consulta: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('sessao');
  }
};
