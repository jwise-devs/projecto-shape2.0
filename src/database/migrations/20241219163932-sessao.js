'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {

    await queryInterface.createTable('sessao', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      pacote: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subpacote: {
        type: DataTypes.STRING,
        allowNull: true, // Opcional para pacotes sem subpacote
      },
      tratamentos: {
        type: DataTypes.JSON, // Usamos JSON para armazenar múltiplos valores
        allowNull: true,
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

  async down (queryInterface, DataTypes) {
    
    await queryInterface.dropTable('sessao');
     
  }
};
