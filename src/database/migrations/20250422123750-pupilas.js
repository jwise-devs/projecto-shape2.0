'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('pupilas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sobrenome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      numeroCelular: {
        type: DataTypes.STRING,
        allowNull: false
      },
      endereco: {
        type: DataTypes.STRING,
        allowNull: false
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
    await queryInterface.dropTable('pupilas');
  }
};
