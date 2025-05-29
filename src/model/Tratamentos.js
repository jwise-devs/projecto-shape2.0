const { Model, DataTypes } = require('sequelize');

class Tratamentos extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },

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

                preco: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },

                sessoesPrevistas: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },

                // Chave estrangeira para Sessao
                sessaoId: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: 'sessao', // Nome da tabela relacionada
                        key: 'id', // Chave primária da tabela Sessao
                    },
                    allowNull: true,  // Esse campo não pode ser nulo
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
                modelName: 'Tratamentos',
                tableName: 'tratamentos',
                timestamps: true,
            }
        );
    }

    static associate(models) {
        // Associação de Sessao com Tratamentos: Cada Sessao pode ter muitos Tratamentos
        this.hasMany(models.Tratamentos, { foreignKey: 'sessaoId', as: 'tratamentos' });
    }

}

module.exports = Tratamentos;
