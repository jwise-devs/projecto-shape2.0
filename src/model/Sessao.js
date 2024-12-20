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

                pacote: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                subpacote: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },

                tratamentos: {
                    type: DataTypes.JSON,
                    allowNull: true,
                },

                data_hora_consulta: {
                    type: DataTypes.DATE,
                    allowNull: false,
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
            },

        );
    }

    static associate(models) {
        // Ficha_De_Dados pertence a um Usuário
        this.hasMany(models.Tratamentos, {
            foreignKey: 'sessaoId', as: 'sessaotratamentos'
        });

    }

}



module.exports = Sessao;