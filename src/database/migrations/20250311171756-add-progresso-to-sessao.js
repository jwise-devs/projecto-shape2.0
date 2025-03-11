'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    // Adiciona a coluna 'progresso' na tabela 'Sessao'
    await queryInterface.addColumn('sessao', 'progresso', {
      type: DataTypes.INTEGER,
      allowNull: true, // Você pode definir como true ou false, dependendo da necessidade
      defaultValue: 0, // Valor padrão para o progresso (pode ser 0 se preferir começar do zero)
    });
  },

  async down (queryInterface, DataTypes) {
    // Caso precise reverter a migração, a coluna 'progresso' será removida
    await queryInterface.removeColumn('sessao', 'progresso');
  }
};
