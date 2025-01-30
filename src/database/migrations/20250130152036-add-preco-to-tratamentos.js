'use strict';


module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.addColumn('tratamentos', 'preco', {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    });
  },

  down: async (queryInterface, DataTypes) => {
    return queryInterface.removeColumn('tratamentos', 'preco');
  }
};
