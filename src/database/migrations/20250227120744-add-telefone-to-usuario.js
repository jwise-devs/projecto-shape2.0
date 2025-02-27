'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn('usuario', 'telefone', {
      type: DataTypes.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.removeColumn('usuario', 'telefone');
  }
};
