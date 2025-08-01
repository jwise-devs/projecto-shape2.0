'use strict';


module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('tratamentos', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      // userId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: { model: 'usuario', key: 'id' }, // FK para tabela usuario
      //   onUpdate: 'CASCADE',
      //   onDelete: 'CASCADE',
      // },

      // sessaoId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: { model: 'sessao', key: 'id' }, // FK para tabela sessao
      //   onUpdate: 'CASCADE',
      //   onDelete: 'CASCADE',
      // },

      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      pacote: {
        type: DataTypes.STRING,
        allowNull: false,
      },


      subpacote: {
        type: DataTypes.STRING,
        allowNull: true,
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

      // status: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   defaultValue: "marcado",
      // }
    });

  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('tratamentos');

  }
};
