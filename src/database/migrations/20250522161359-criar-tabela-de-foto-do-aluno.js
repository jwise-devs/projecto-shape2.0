/* eslint-disable no-undef */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('fotos', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      tipo: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      sessaoId: {      // <== adiciona esse campo!
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'sessao', // nome da tabela
          key: 'id'
        },
        onDelete: 'CASCADE', // opcional
        onUpdate: 'CASCADE'  // opcional
      },

      originalname: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      created_at: {
        type: DataTypes.DATE,
        sllowNull: false,
      },

      updated_at: {
        type: DataTypes.DATE,
        sllowNull: false,
      },

    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('fotos');
  },
};
