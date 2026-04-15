'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('pagamento', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      sessaoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'sessao',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // opcional: podes adicionar FK também
      },

      valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      telefone: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      referencia: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      transactionId: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      status: {
        type: DataTypes.ENUM("PENDENTE", "PROCESSANDO", "SUCESSO", "FALHA"),
        defaultValue: "PENDENTE",
      },

      metodo: {
        type: DataTypes.STRING,
        defaultValue: "MPESA",
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
    await queryInterface.dropTable('pagamento');
  }
};