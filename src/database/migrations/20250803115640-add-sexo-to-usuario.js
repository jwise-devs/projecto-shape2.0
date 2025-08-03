'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.addColumn('usuario', 'sexo', {
      type: DataTypes.ENUM('F','M'),
      allowNull: false,
      defaultValue: "F",
    });
  },

  down: async (queryInterface, DataTypes) => {
    return queryInterface.removeColumn('usuario', 'sexo');
  }
};
