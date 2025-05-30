const { Model, DataTypes } = require('sequelize');

class Pupila extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false
                },
                nome: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                sobrenome: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                numeroCelular: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                endereco: {
                    type: DataTypes.STRING,
                    allowNull: false
                },

                fotoPupila: {
                    type: DataTypes.STRING,
                    allowNull: true
                },

            },
            {
                sequelize,
                modelName: 'Pupila',
                tableName: 'pupilas',
                timestamps: true
            }
        );
    }

    static associate(models) {
        // Adicione associações aqui se precisar no futuro
    }
}

module.exports = Pupila;
