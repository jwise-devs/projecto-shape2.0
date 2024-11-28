'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
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
        type: DataTypes.ENUM('>10', '10-20', '20-30', '30-40', '40-50', '>50'), // Apenas aceita 'sim' ou 'nao'
        allowNull: false, // Define que o campo é obrigatório
        defaultValue: '>10', // Valor padrão
      },

      fumante: {
        type: DataTypes.ENUM('sim', 'nao'),
        allowNull: false,
        defaultValue: 'nao',
      },

      disturbio_circulatorio: {
        type: DataTypes.ENUM('sim', 'nao'),
        allowNull: false,
        defaultValue: 'nao',
      },

      epiletica: {
        type: DataTypes.ENUM('sim', 'nao'),
        allowNull: false,
        defaultValue: 'nao',
      },

      ciclo_menstrual_regular: {
        type: DataTypes.ENUM('sim', 'nao'),
        allowNull: false,
        defaultValue: 'nao',
      },

      funcionamento_intestional_regular: {
        type: DataTypes.ENUM('sim', 'nao'),
        allowNull: false,
        defaultValue: 'nao',
      },

      tratamento_medico: {
        type: DataTypes.ENUM('sim', 'nao'),
        allowNull: false,
        defaultValue: 'nao',
      },

      diabetes: {
        type: DataTypes.ENUM('sim', 'nao'),
        allowNull: false,
        defaultValue: 'nao',
      },

      tipo_diabetes: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'nenhum',
      },

      diabete_controlada: {
        type: DataTypes.ENUM('sim', 'nao'),
        allowNull: false,
        defaultValue: 'nao',
      },

      alteracoes_cardiacas: {
        type: DataTypes.ENUM('sim', 'nao'),
        allowNull: false,
        defaultValue: 'nao',
      },

      disturbio_hormonal: {
        type: DataTypes.ENUM('sim', 'nao'),
        allowNull: false,
        defaultValue: 'nao',
      },

      hipo: {
        type: DataTypes.ENUM('sim', 'nao'),
        allowNull: false,
        defaultValue: 'nao',
      },

      disturbio_renal: {
        type: DataTypes.ENUM('sim', 'nao'),
        allowNull: false,
        defaultValue: 'nao',
      },

      alguma_alergia: {
        type: DataTypes.ENUM('sim', 'nao'),
        allowNull: false,
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
          model: 'Usuario',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

    });

  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('ficha_de_dados');

  }
};
