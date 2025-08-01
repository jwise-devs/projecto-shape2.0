const { Model, DataTypes } = require("sequelize");

class Sessao extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },

                userId: {
                    type: DataTypes.INTEGER,
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

                status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: "marcado",
                },

                progresso: {
                    type: DataTypes.INTEGER,
                    allowNull: true, // Você pode definir como true ou false, dependendo da necessidade
                    defaultValue: 0, // Valor padrão para o progresso (pode ser 0 se preferir começar do zero)
                },



                tratamentosArray: {  // Agora armazenamos os tratamentos como um JSON
                    type: DataTypes.JSON,
                    allowNull: false,
                },

                data_hora_consulta: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },

                precoSessao: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },

                numTotSessao: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
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
                modelName: 'Sessao',
                tableName: 'sessao',
                timestamps: true,
            }
        );
    }

    static associate(models) {
        // Associação de Sessao com Tratamentos: Cada Sessao pode ter muitos Tratamentos
        this.hasMany(models.Tratamentos, { foreignKey: 'sessaoId', as: 'tratamentos' });

        this.belongsTo(models.Usuario, { foreignKey: 'userId', as: 'usuario' });

        this.hasMany(models.Foto,
            {
                foreignKey: 'sessaoId',
                as: 'foto'
            });
    }
}

module.exports = Sessao;
