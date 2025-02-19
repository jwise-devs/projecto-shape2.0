'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn('usuario', 'localizacao', {
      type: DataTypes.STRING, // Pode ser um string, pois você estará armazenando o link
      allowNull: true, // Pode ser nulo inicialmente, se necessário
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('usuario', 'localizacao');
  }
};
