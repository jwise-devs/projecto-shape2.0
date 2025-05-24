const { Model, DataTypes } = require("sequelize");

class ConsultaEmCasa extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },

                pupilaId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                nome: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                sobrenome: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                tratamentosArray: {
                    type: DataTypes.JSON,
                    allowNull: false,
                },


                data_hora_consulta: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },

                numSessao: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 1,
                },

                status: {
                    type: DataTypes.ENUM('marcada', 'realizada', 'cancelada'),
                    allowNull: false,
                    defaultValue: 'marcada',
                },

                created_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },

                updated_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
            },
            {
                sequelize,
                modelName: 'ConsultaEmCasa',
                tableName: 'consulta_em_casa',
                timestamps: true,
                createdAt: 'created_at',
                updatedAt: 'updated_at',
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Usuario, {
            foreignKey: 'pupilaId',
            as: 'pupila'
        });
    }
}

module.exports = ConsultaEmCasa;
