'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.addColumn('sessao', 'sessoesPrevistas', {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.removeColumn('sessao', 'sessoesPrevistas');
  }
};
