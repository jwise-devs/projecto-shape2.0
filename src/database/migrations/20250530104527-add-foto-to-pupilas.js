'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.addColumn('pupilas', 'fotoPupila', {
      type: DataTypes.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, DataTypes) => {
    return queryInterface.removeColumn('pupilas', 'fotoPupila');
  }
};
