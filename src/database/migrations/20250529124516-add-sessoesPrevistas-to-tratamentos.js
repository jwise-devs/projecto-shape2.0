'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.addColumn('tratamentos', 'sessoesPrevistas', {
      type: DataTypes.INTEGER,
      allowNull: false,
    });
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.removeColumn('tratamentos', 'sessoesPrevistas');
  }
};
