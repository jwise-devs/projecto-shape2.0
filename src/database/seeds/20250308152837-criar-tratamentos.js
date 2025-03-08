'use strict';

const dados = {
  beleza: {
    limpezas_de_pele: [
      { value: "hidratacao_facial", text: "Hidratacao Facial", preco: 300 },
      { value: "esfoliacao_completa_facial", text: "Esfoliacao Completa Facial", preco: 250 },
      { value: "revitalizacao_facial", text: "Revitalizacao Facial", preco: 350 },
      { value: "controlo_da_acne_facial", text: "controlo da acne facial", preco: 3500 },
      { value: "foliculte_virilha", text: "Foliculte - Virilha", preco: 2500 },
      { value: "acne_nas_costas_braco", text: "Acne nas costas/braco", preco: 3500 }
    ],
    peeling_algae: [
      { value: "rosto", text: "Rosto", preco: 500 },
      { value: "axilas", text: "Axilas", preco: 200 },
      { value: "virilha", text: "Virilha", preco: 250 },
      { value: "barriga", text: "Barriga", preco: 10000 },
      { value: "gluteos", text: "Gluteos", preco: 12500 },
      { value: "costas", text: "Costas", preco: 12500 },
      { value: "combo/costas_e_gluteos", text: "Combo/Costas e Gluteos", preco: 15000 }
    ],
    depilacao: [
      { value: "cera_bikini_line", text: "Cera - Bikini Line", preco: 500 },
      { value: "cera_axilas", text: "Cera - Axilas", preco: 200 },
      { value: "cera_virilha_comleta", text: "Cera - Virilha Comleta", preco: 250 },
      { value: "cera_buco", text: "Cera - Buco", preco: 300 },
      { value: "cera_sobrancelhas", text: "Cera - Sobrancelhas", preco: 300 },
      { value: "lamina_sobrancelhas", text: "Lamina - Sobrancelhas", preco: 150 },
      { value: "pinca_sobrancelhas", text: "Pinca - Sobrancelhas", preco: 250 }
    ]
  },
  consulta: [
    { value: "estetica_corporal", text: "Estetica Corporal", preco: 150 },
    { value: "nutricional_guia", text: "Nutricional + Guia", preco: 200 },
    { value: "estetica_facial", text: "Estetica Facial", preco: 200 }
  ],

  corpo: [
    { value: "esfoliacao", text: "Esfoliacao", preco: 150 },
    { value: "massagem_relaxante", text: "Massagem Relaxante", preco: 200 },
    { value: "massagem_relaxante_esfoliacao", text: "Massagem Relaxante Esfoliacao", preco: 200 },
    { value: "massagem_modeladora", text: "Massagem Modeladora", preco: 3000 },
    { value: "drenagem_linfatica", text: "Drenagem Linfatica", preco: 2000 },
    { value: "lipomassagem", text: "Lipomassagem", preco: 4000 },
    { value: "lipocavitacao_reducao_de_gordura_&_celulite", text: "Lipocavitacao (Reducao de Gordura & Celulite)", preco: 4000 },
    { value: "criolipolise_reducao_de_gordura", text: "Criolipolise (Reducao de Gordura)", preco: 6250 },
    { value: "hidrolipo", text: "Hidrolipo", preco: 4000 },
    { value: "radio_frequencia_reducao_de_flacidez", text: "Radio Frequencia (Reducao de Flacidez)", preco: 4000 },
    { value: "emsculpt_construcao_de_musculo_e_tonificacao", text: "Emsculpt Construcao de Musculo e Tonificacao", preco: 7500 },
    { value: "biotime", text: "Biotime", preco: 5500 },
    { value: "meditacao", text: "Meditacao", preco: 1750 },
    { value: "reiki", text: "Reiki", preco: 2500 },
    { value: "preenchimento_de_gluteos", text: "Preenchimento de Gluteos", preco: 25000 },
    { value: "bioestimulacao_colageno", text: "Bioestimulacao - Colageno", preco: 15000 },
    { value: "bioestimuladores_corpo_fios_de_pdo", text: "Bioestimuladores - Corpo (Fios de PDO)", preco: 10000 },
    { value: "bioestimulador_super_hydro", text: "Bioestimulador (Super Hydro)", preco: 10000 },
    { value: "bioestimulador_jaluptro_corpo", text: "Bioestimulador Jaluptro Corpo", preco: 12500 },
    { value: "radio_frequencia_microfacionada", text: "Radio Frequencia (Microfacionada)", preco: 4000 },
    { value: "mesoterapia_emagrecimento_estrias_flacidez", text: "Mesoterapia (Emagrecimento, Estrias, Flacidez)", preco: 5500 },
    { value: "mesoterapia_capilar", text: "Mesoterapia Capilar", preco: 3500 },
    { value: "mesoterapia_axila", text: "Mesoterapia - Axila", preco: 3500 },
    { value: "mesoterapia_difinicao_musculo", text: "Mesoterapia (Difinicao Musculo)", preco: 3000 },
    { value: "camuflagem_de_estrias", text: "Camuflagem de Estrias", preco: 7500 },
    { value: "corrente_russa", text: "Corrente Russa", preco: 3500 },
    { value: "plataforma_vibratoria", text: "Plataforma Vibratoria", preco: 500 },
    { value: "drip", text: "Drip", preco: 7656 }
  ],

  metodo: [
    { value: "pernas", text: "Pernas", preco: 150 },
    { value: "gluteo", text: "Gluteo", preco: 200 },
    { value: "abdomen", text: "Abdomen", preco: 200 },
    { value: "completo", text: "Completo", preco: 5000 }
  ],

  liposhaper: [
    { value: "abdomen_inferior", text: "Abdomen Inferior", preco: 150 },
    { value: "abdomen_superior", text: "Abdomen Superior", preco: 200 },
    { value: "cervical", text: "Cervical", preco: 200 },
    { value: "costas", text: "Costas", preco: 65000 },
    { value: "coxa_interna_inferior", text: "Coxa Interna Inferior", preco: 65000 },
    { value: "coxa_interna_superior", text: "Coxa Interna Superior", preco: 95000 },
    { value: "culote", text: "Culote", preco: 80000 },
    { value: "flancos", text: "Flancos", preco: 65000 },
    { value: "gluteos", text: "Gluteos", preco: 80000 },
    { value: "joelhos", text: "Joelhos", preco: 65000 },
    { value: "lombar", text: "Lombar", preco: 55000 },
    { value: "nadegas", text: "Nadegas", preco: 95000 },
    { value: "peitorais", text: "Peitorais", preco: 65000 },
    { value: "pernas", text: "Pernas", preco: 65000 },
    { value: "zona_pubica", text: "Zona Pubica", preco: 65000 },
    { value: "quadricipites", text: "Quadricipites", preco: 120000 },
    { value: "tornozelos", text: "Tornozelos", preco: 65000 },
    { value: "tricipites", text: "Tricipites", preco: 65000 }
  ],

  rosto: [
    { value: "mesolift(rugas,linhas_de_expressao)", text: "Mesolift(rugas, linhas de expressao)", preco: 150 },
    { value: "skin_boost(rugas&linhas_de_expressao)", text: "Skin Boost(rugas & linhas de expressao)", preco: 200 },
    { value: "radio_frequencia(flacidez&gordura_em_baixo_do_queixo)", text: "Radio Frequencia(flacidez & gordura em baixo do queixo)", preco: 200 },
    { value: "mesoterapia_papadas_gordura_abaixo_do_queixo", text: "Mesoterapia - Papadas (Gordura Abaixo do Queixo)", preco: 5000 },
    { value: "tratamento_de_olheiras", text: "Tratamento de Olheiras", preco: 7000 },
    { value: "revitalizador_capilar", text: "Revitalizador Capilar", preco: 7000 },
    { value: "peeling_ou_microdermabrasion_manchas_rejuvenescimento", text: "Peeling ou Microdermabrasion (Manchas, Rejuvenescimento)", preco: 3500 },
    { value: "dermaplaning_manchas_&_hidratacao", text: "Dermaplaning (Mancha, Hidratacao)", preco: 3500 },
    { value: "combo_peeling_&_microdermoabrasao", text: "Combo Peeling & Microdermoabrasao", preco: 6000 },
    { value: "peeling/tca", text: "Peeling/TCA", preco: 4000 },
    { value: "filler_remocao_de_rugas_e_linhas_de_expressao", text: "Filler (Remocao de Rugas e Linhas de Expressao)", preco: 12000 },
    { value: "preenchimento_de_rugas_finas", text: "Preenchimento de Rugas (Finas)", preco: 12500 },
    { value: "preenchimento_de_rugas_moderadas_&_profundas", text: "Preenchimento de Rugas (Moderadas & Profundas)", preco: 15000 },
    { value: "preenchimento_labial_volume_contorno", text: "Preenchimento Labial (Volume e Contorno)", preco: 15000 },
    { value: "preenchimento_de_olheiras", text: "Preenchimento de olheiras", preco: 12500 },
    { value: "preenchimento/definicao do rosto", text: "Preenchimento/Definicao do Rosto", preco: 15000 },
    { value: "bioestimulador_rosto_completo_jaluptro", text: "Bioestimulador Rosto Completo", preco: 7000 },
    { value: "bioestimulador_rosto_fios_de_pdo", text: "Bioestimulador Rosto (Fios de PDO)", preco: 10000 },
    { value: "bioestimulador_jaluptro_testa", text: "Bioestimulador Jaluptro(Testa)", preco: 4000 },
    { value: "bioestimulador_radiesse", text: "Bioestimulador Radiesse", preco: 12000 },
    { value: "bio_nutrilift", text: "Bio - Nutrilift", preco: 15000 },
    { value: "microagulhamento", text: "Microagulhamento", preco: 7000 },
    { value: "eternus", text: "Eternus", preco: 12000 }
  ]
};

'use strict';

module.exports = {
  async up(queryInterface) {
    const tratamentos = [];

    // Adicionando tratamentos para 'beleza' -> 'limpezas_de_pele'
    dados.beleza.limpezas_de_pele.forEach(item => {
      tratamentos.push({
        nome: item.text,
        pacote: 'beleza',
        subpacote: 'limpezas_de_pele',
        preco: item.preco,
        created_at: new Date(),
        updated_at: new Date(),
      });
    });

    // Adicionando tratamentos para 'beleza' -> 'peeling_algae'
    dados.beleza.peeling_algae.forEach(item => {
      tratamentos.push({
        nome: item.text,
        pacote: 'beleza',
        subpacote: 'peeling_algae',
        preco: item.preco,
        created_at: new Date(),
        updated_at: new Date(),
      });
    });

    // Adicionando tratamentos para 'beleza' -> 'depilacao'
    dados.beleza.depilacao.forEach(item => { // Corrigido de 'depilaçao' para 'depilacao'
      tratamentos.push({
        nome: item.text,
        pacote: 'beleza',
        subpacote: 'depilacao',
        preco: item.preco,
        created_at: new Date(),
        updated_at: new Date(),
      });
    });

    // Adicionando tratamentos para 'consulta'
    dados.consulta.forEach(item => {
      tratamentos.push({
        nome: item.text,
        pacote: 'consulta',
        subpacote: null,
        preco: item.preco,
        created_at: new Date(),
        updated_at: new Date(),
      });
    });

    // Adicionando tratamentos para 'corpo'
    dados.corpo.forEach(item => {
      tratamentos.push({
        nome: item.text,
        pacote: 'corpo',
        subpacote: null,
        preco: item.preco,
        created_at: new Date(),
        updated_at: new Date(),
      });
    });

    // Adicionando tratamentos para 'metodo'
    dados.metodo.forEach(item => {
      tratamentos.push({
        nome: item.text,
        pacote: 'metodo',
        subpacote: null,
        preco: item.preco,
        created_at: new Date(),
        updated_at: new Date(),
      });
    });

    // Adicionando tratamentos para 'liposhaper'
    dados.liposhaper.forEach(item => {
      tratamentos.push({
        nome: item.text,
        pacote: 'liposhaper',
        subpacote: null,
        preco: item.preco,
        created_at: new Date(),
        updated_at: new Date(),
      });
    });

    // Adicionando tratamentos para 'rosto'
    dados.rosto.forEach(item => {
      tratamentos.push({
        nome: item.text,
        pacote: 'rosto',
        subpacote: null,
        preco: item.preco,
        created_at: new Date(),
        updated_at: new Date(),
      });
    });

    await queryInterface.bulkInsert('tratamentos', tratamentos, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('tratamentos', null, {});
  },
};
