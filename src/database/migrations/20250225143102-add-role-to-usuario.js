'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn('usuario', 'role', {
      type: DataTypes.ENUM('usuario', 'admin'), // Pode ser um string, pois você estará armazenando o link
      allowNull: false,
      defaultValue: 'usuario',
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('usuario', 'role');
  }
};
