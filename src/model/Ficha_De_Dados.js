const { Model, DataTypes } = require("sequelize");

class Ficha_De_Dados extends Model {
    static init(sequelize) {
        super.init(
            {
                cintura_umbilical: {
                    type: DataTypes.STRING,
                    defaultValue: '',
                },

                acima_umbigo: {
                    type: DataTypes.STRING,
                    defaultValue: '',
                },

                abaixo_umbigo: {
                    type: DataTypes.STRING,
                    defaultValue: '',
                },

                alimentacao: {
                    type: DataTypes.STRING,
                    defaultValue: '',
                },

                consumo_agua: {
                    type: DataTypes.STRING,
                    defaultValue: '',
                },

                historico_doencas: {
                    type: DataTypes.STRING,
                    defaultValue: '',
                },

                queixa_principal: {
                    type: DataTypes.STRING,
                    defaultValue: '',
                },

                idade: {
                    type: DataTypes.ENUM('>10', '10-20', '20-30', '30-40', '40-50', '>50'),
                    defaultValue: '>10',
                },

                fumante: {
                    type: DataTypes.ENUM('sim', 'nao'),
                    defaultValue: 'nao',
                },

                disturbio_circulatorio: {
                    type: DataTypes.ENUM('sim', 'nao'),
                    defaultValue: 'nao',
                },

                epiletica: {
                    type: DataTypes.ENUM('sim', 'nao'),
                    defaultValue: 'nao',
                },

                ciclo_menstrual_regular: {
                    type: DataTypes.ENUM('sim', 'nao'),
                    defaultValue: 'nao',
                },

                funcionamento_intestional_regular: {
                    type: DataTypes.ENUM('sim', 'nao'),
                    defaultValue: 'nao',
                },

                tratamento_medico: {
                    type: DataTypes.ENUM('sim', 'nao'),
                    defaultValue: 'nao',
                },

                diabetes: {
                    type: DataTypes.ENUM('sim', 'nao'),
                    defaultValue: 'nao',
                },

                tipo_diabetes: {
                    type: DataTypes.STRING,
                    defaultValue: '',
                },

                diabete_controlada: {
                    type: DataTypes.ENUM('sim', 'nao'),
                    defaultValue: 'nao',
                },

                alteracoes_cardiacas: {
                    type: DataTypes.ENUM('sim', 'nao'),
                    defaultValue: 'nao',
                },

                disturbio_hormonal: {
                    type: DataTypes.ENUM('sim', 'nao'),
                    defaultValue: 'nao',
                },

                hipo: {
                    type: DataTypes.ENUM('sim', 'nao'),
                    defaultValue: 'nao',
                },

                disturbio_renal: {
                    type: DataTypes.ENUM('sim', 'nao'),
                    defaultValue: 'nao',
                },

                alguma_alergia: {
                    type: DataTypes.ENUM('sim', 'nao'),
                    defaultValue: 'nao',
                },

                formulario_preenchido: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false, // Por padrão, o formulário não foi preenchido
                },

                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'usuario', // Nome da tabela referenciada
                        key: 'id' // A chave primária da tabela 'usuarios'
                    },

                    field: 'userId', // Nome exato da coluna no banco de dados
                }

            },

            {
                sequelize,
                modelName: 'Ficha_De_Dados',
                tableName: 'ficha_de_dados',
                timestamps: false,
            },

        );

    }

    static associate(models) {
        // Ficha_De_Dados pertence a um Usuário
        this.belongsTo(models.Usuario, {
            foreignKey: 'userId', // Nome da chave estrangeira
            as: 'usuario', // Alias para acessar o relacionamento
        });
    }

}

module.exports = Ficha_De_Dados;