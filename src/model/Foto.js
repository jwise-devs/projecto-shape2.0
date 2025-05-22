const { Model, DataTypes } = require("sequelize");

class Foto extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: DataTypes.STRING,
          allowNull: false,
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
        
        filename: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        tipo: { // 'antes' ou 'depois'
          type: DataTypes.ENUM('antes', 'depois'),
          allowNull: false,
        },

        

        
      },
      {
        sequelize,
        tableName: 'fotos',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Sessao, { foreignKey: 'sessaoId', as: 'sessao' });
  }
}

module.exports = Foto;
