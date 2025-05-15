'use strict';

module.exports = {
  async up(queryInterface) {
    const tratamentosConsultaEmCasa = [
      {
        nome: "Massagem Relaxante",
        pacote: "consulta_em_casa",
        subpacote: null,
        preco: 4000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: "Massagem Relaxante + Esfoliação Completa",
        pacote: "consulta_em_casa",
        subpacote: null,
        preco: 4500, // você pode alterar esse valor se desejar diferenciar
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: "Massagem Modeladora",
        pacote: "consulta_em_casa",
        subpacote: null,
        preco: 3000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: "Drenagem Linfática",
        pacote: "consulta_em_casa",
        subpacote: null,
        preco: 2500,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: "Limpeza de Pele + Hidratação Facial",
        pacote: "consulta_em_casa",
        subpacote: null,
        preco: 2000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: "Espoliação Completa Facial",
        pacote: "consulta_em_casa",
        subpacote: null,
        preco: 2500,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: "Revitalização Facial",
        pacote: "consulta_em_casa",
        subpacote: null,
        preco: 3500,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('tratamentos', tratamentosConsultaEmCasa, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('tratamentos', {
      pacote: 'consulta_em_casa'
    }, {});
  }
};
