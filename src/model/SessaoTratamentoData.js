const { Model, DataTypes } = require('sequelize');

class SessaoTratamentoData extends Model {
    static init(sequelize) {
        super.init(
            {
                sessaoId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'sessao',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                },
                nomeTratamento: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                dataComparecimento: {
                    type: DataTypes.DATEONLY,
                    allowNull: false,
                },

                compareceu: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                }
            },
            {
                sequelize,
                modelName: 'SessaoTratamentoData',
                tableName: 'sessao_tratamento_datas',
                timestamps: true,
                underscored: true,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Sessao, { foreignKey: 'sessaoId', as: 'sessao' });
    }
}

module.exports = SessaoTratamentoData;
