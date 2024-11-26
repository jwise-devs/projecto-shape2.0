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

            idade: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },

            fumante: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },

            disturbio_circulatorio: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },

            epiletica: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },

            ciclo_menstrual_regular: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },

            funcionamento_intestional_regular: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },

            tratamento_medico: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },

            diabetes: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },

            tipo_diabetes: {
                type: DataTypes.STRING,
                defaultValue: '',
            },

            diabete_controlada: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },

            alteracoes_cardiacas: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },

            disturbio_hormonal: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },

            hipo: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },

            disturbio_renal: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },

            alguma_alergia: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },

            alimentacao: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },

            


        },

        {
            sequelize,
             modelName: 'Ficha_De_Dados',
        },
    
    );

    }

}

module.exports = Ficha_De_Dados;