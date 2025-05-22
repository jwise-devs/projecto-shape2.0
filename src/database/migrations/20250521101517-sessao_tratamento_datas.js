'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sessao_tratamento_datas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'usuarioId', // <-- forçando nome camelCase
        references: {
          model: 'usuario',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      nome_tratamento: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      data_comparecimento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sessao_tratamento_datas');
  },
};
