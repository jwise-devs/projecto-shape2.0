'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.addColumn('usuario', 'ultimaSolicitacao', {
      type: DataTypes.DATE,
      allowNull: true,
    });
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.removeColumn('usuario', 'ultimaSolicitacao');
  }
};
