'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
     await queryInterface.createTable('ficha_de_dados', { 
      id: {
        type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
      }, 

      cintura_umbilical: {
        type: DataTypes.STRING,
          allowNull: false,
      },

      acima_umbigo: {
        type: DataTypes.STRING,
          allowNull: false,
      },

      abaixo_umbigo: {
        type: DataTypes.STRING,
          allowNull: false,
      },

      alimentacao: {
        type: DataTypes.STRING,
          allowNull: false,
      },

      consumo_agua: {
        type: DataTypes.STRING,
          allowNull: false,
      },

      historico_doencas: {
        type: DataTypes.STRING,
          allowNull: false,
      },

      queixa_principal: {
        type: DataTypes.STRING,
          allowNull: false,
      },

      idade: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      fumante: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      disturbio_circulatorio: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      epiletica: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      ciclo_menstrual_regular: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      funcionamento_intestional_regular: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      tratamento_medico: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      diabetes: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      tipo_diabetes: {
        type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'nenhum',
      },

      diabete_controlada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      alteracoes_cardiacas: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      disturbio_hormonal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      hipo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      disturbio_renal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      alguma_alergia: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

    });
     
  },

  async down (queryInterface, DataTypes) {
     await queryInterface.dropTable('ficha_de_dados');
     
  }
};
