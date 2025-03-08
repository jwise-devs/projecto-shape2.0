module.exports = {
  up: async (queryInterface, DataTypes) => {
      await queryInterface.addColumn('tratamentos', 'sessaoId', {
          type: DataTypes.INTEGER,
          references: {
              model: 'sessao',
              key: 'id',
          },
          allowNull: true,
      });
  },

  down: async (queryInterface, DataTypes) => {
      await queryInterface.removeColumn('tratamentos', 'sessaoId');
  },
};
