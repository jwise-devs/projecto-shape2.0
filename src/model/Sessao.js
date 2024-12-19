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
            },

            {
                sequelize,
                modelName: 'Sessao',
                tableName: 'sessao',
                timestamps: false,
            },

        );
    }

    static associate(models) {
        // Ficha_De_Dados pertence a um Usuário
        this.belongsToMany(models.Usuario, {
            through: 'tratamentos',// Nome da tabela intermediária
            foreignKey: 'sessaoId', // Nome da chave estrangeira que aponta para a sessao
            otherKey: 'userId',// FK que aponta para o usuario
            as: 'usuario',
        });
    }

}



module.exports = Sessao;