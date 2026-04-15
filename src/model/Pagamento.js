const { Model, DataTypes } = require("sequelize");

class Pagamento extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },

        sessaoId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },

        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
          allowNull: true, // vem do M-Pesa (ou simulação)
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
      },
      {
        sequelize,
        modelName: "Pagamento",
        tableName: "pagamento",
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Sessao, {
      foreignKey: "sessaoId",
      as: "sessao",
    });

    this.belongsTo(models.Usuario, {
      foreignKey: "userId",
      as: "usuario",
    });
  }
}

module.exports = Pagamento;