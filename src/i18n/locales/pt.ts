import type { TranslationBundle } from '../types';

export const pt: TranslationBundle = {
  seo: {
    title: 'SudokuCue — Desafio de Sudoku Competitivo e Duelo por WhatsApp',
    description:
      'Desafie amigos para um duelo de Sudoku 9×9 por link no WhatsApp. Jogue exatamente o mesmo tabuleiro codificado na URL e bata tempo, dicas e pontuação sem cadastro.',
    howToName: 'Como enviar e vencer um desafio de Sudoku por link no WhatsApp',
    howToSteps: [
      {
        name: 'Escolha a dificuldade e resolva o tabuleiro 9×9',
        text: 'Selecione Fácil, Médio ou Difícil e resolva o Sudoku determinístico usando modo Notas.',
      },
      {
        name: 'Envie o link #c= pelo WhatsApp',
        text: 'Compartilhe a semente exata, dificuldade, segundos, dicas e pontuação codificados na URL.',
      },
      {
        name: 'Compare resultados e envie revanche',
        text: 'Seu amigo resolve a mesma grade no navegador, compara os números e manda uma revanche imediata.',
      },
    ],
  },
  nav: {
    play: 'Jogar Duelo',
    duelGuide: 'Guia de Duelo',
    stats: 'Recordes e JSON',
    faq: 'FAQ',
    languageLabel: 'Idioma',
  },
  hero: {
    h1: 'Desafio de Sudoku Competitivo e Duelo por WhatsApp',
    subtitle:
      'Resolva um tabuleiro 9×9 determinístico, codifique tempo, dicas e pontos em um link e desafie amigos no WhatsApp.',
  },
  game: {
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil',
    newBoard: 'Novo Tabuleiro',
    dailyDuel: 'Duelo Diário',
    printSheet: 'Imprimir',
    soundOn: 'Som Ligado',
    soundOff: 'Mudo',
    boardSeed: 'Tabuleiro',
    time: 'Tempo',
    hints: 'Dicas',
    filled: 'Preenchidas',
    score: 'Pontos',
    conflicts: 'Conflitos',
    normalMode: 'Normal',
    notesMode: 'Notas',
    erase: 'Apagar',
    undo: 'Desfazer',
    check: 'Verificar',
    hintButton: 'Dica',
    hintCostLabel: '-150 pts · +30s',
    checkOk: 'Todos os números digitados combinam com a solução única.',
    checkErrors: '{count} célula(s) não correspondem à solução (-40 pts cada).',
    solvedBannerTitle: 'Sudoku Resolvido!',
    solvedBannerSub: 'Sua marca está pronta para compartilhar via WhatsApp ou link.',
    pause: 'Pausar',
    resume: 'Retomar',
    pausedOverlay: 'Cronômetro pausado — clique em Retomar para continuar.',
    keyboardTip: 'Teclas: 1–9 digitar · Setas mover · N notas · Z desfazer · H dica · Del apagar',
  },
  svg: {
    title: 'Esquema de Duelo e Progresso SudokuCue',
    quadrantMap: 'Blocos 3×3 Preenchidos',
    duelBenchmark: 'Comparativo de Tempo e Pontos',
    you: 'Você',
    target: 'Meta',
    openTarget: 'Duelo Aberto',
    remaining: 'Restam',
    hinted: 'Dica',
  },
  duel: {
    cardTitle: 'Desafio por Link e WhatsApp',
    activeDuelTitle: 'Desafio de Sudoku Recebido',
    openDuelTitle: 'Duelo de Tabuleiro Compartilhado',
    challengerLabel: 'Desafiante',
    anonymousChallenger: 'Amigo',
    roundLabel: 'Rodada',
    nicknameLabel: 'Seu Nome (opcional)',
    nicknamePlaceholder: 'ex. Lucas',
    challengeWhatsApp: 'Desafiar no WhatsApp',
    copyLink: 'Copiar Link do Desafio',
    copied: 'Link Copiado',
    sendRematch: 'Enviar Revanche',
    shareVictoryBack: 'Enviar Resultado',
    playFreshSolo: 'Sair do Duelo',
    beatTargetHint: 'Bata {time} · {hints} dicas · {score} pts neste mesmo tabuleiro.',
    liveCompareHint: 'Mesma semente carregada. Conclua o tabuleiro para comparar tempos.',
    outcomeWin: 'Vitória — Você Venceu o Desafio!',
    outcomeTie: 'Empate Exato!',
    outcomeLoss: 'O Desafiante Lidera Esta Rodada',
    outcomePending: 'Tabuleiro Concluído — Marca Salva',
    timeDeltaFaster: '{sec}s mais rápido que o desafiante',
    timeDeltaSlower: '{sec}s atrás do desafiante',
    timeDeltaEqual: 'Exatamente o mesmo tempo',
    whatsappMessageSolved:
      'Resolvi este SudokuCue ({diff}) em {time} ({hints} dicas, {score} pts). Consegue bater meu tempo no mesmo tabuleiro? {url}',
    whatsappMessageOpen:
      'Vamos disputar exatamente este tabuleiro de SudokuCue ({diff})! Abra o link para jogar o mesmo puzzle: {url}',
    whatsappMessageRematch:
      'Revanche SudokuCue (Rodada {round})! Novo tabuleiro {diff} pronto—tente bater minha marca: {url}',
  },
  stats: {
    sectionTitle: 'Recordes Locais, Histórico e Backup JSON',
    streak: 'Sequência',
    totalSolved: 'Resolvidos',
    duelsWon: 'Duelos Vencidos',
    bestTime: 'Melhor Tempo',
    bestScore: 'Melhor Pontuação',
    noRecord: '—',
    exportJson: 'Exportar JSON',
    importJson: 'Importar JSON',
    importSuccess: 'Backup importado com sucesso.',
    importError: 'Arquivo JSON inválido.',
    historyTitle: 'Partidas e Duelos Recentes',
    historyEmpty: 'Conclua seu primeiro tabuleiro 9×9 ou duelo no WhatsApp para registrar suas marcas.',
    clearHistory: 'Limpar Histórico',
    dateCol: 'Data',
    diffCol: 'Dificuldade',
    timeCol: 'Tempo',
    hintsCol: 'Dicas',
    scoreCol: 'Pontos',
    resultCol: 'Duelo',
  },
  editorial: {
    guideTitle: 'Como Funcionam os Desafios de Sudoku por Link e WhatsApp',
    guideLead: 'Transforme o Sudoku em uma corrida direta com amigos sem cadastro nem servidor.',
    articles: [
      {
        title: '1. Enviar e bater um link de desafio no WhatsApp',
        body: [
          'Cada tabuleiro no SudokuCue nasce de forma determinística a partir de uma semente e dificuldade. Ao clicar em Desafiar no WhatsApp, o link #c= leva a semente exata, seu tempo, dicas e pontuação.',
          'Seu amigo abre a mesma grade 9×9 localmente e compara os resultados assim que completar o último número.',
        ],
      },
      {
        title: '2. Resolver níveis Fácil, Médio e Difícil mais rápido com Notas',
        body: [
          'Use escaneamento por faixas e ative o modo Notas (tecla N) para marcar candidatos e enxergar pares nus. O jogo limpa automaticamente notas conflitantes quando você confirma um dígito.',
        ],
      },
      {
        title: '3. Vencer duelos evitando dicas penalizadas',
        body: [
          'Cada dica custa 150 pontos e +30s de impacto. Conferir linhas quase completas antes de pedir dica protege sua pontuação final.',
        ],
      },
      {
        title: '4. Ideias rápidas de duelo com amigos e colegas',
        body: [
          'Use o Duelo Diário no nível Médio durante o intervalo para todos jogarem a mesma semente do dia, ou faça séries de revanche em 3 rodadas.',
        ],
      },
    ],
    faqTitle: 'Perguntas Frequentes',
    faqs: [
      {
        q: 'Como o link #c= garante exatamente o mesmo tabuleiro sem servidor?',
        a: 'A semente e a dificuldade viajam no fragmento #c= da URL, permitindo que qualquer navegador gere a grade idêntica localmente.',
      },
      {
        q: 'Como a pontuação do duelo é calculada?',
        a: 'Base (1.000 / 1.800 / 2.800) menos 2 pontos por segundo, 150 por dica e 40 por erro em Verificar.',
      },
      {
        q: 'Posso imprimir no papel ou exportar meu histórico?',
        a: 'Sim, use o botão Imprimir e os controles Exportar / Importar JSON.',
      },
    ],
    transparencyNotice:
      'Jogo competitivo de Sudoku 100% no navegador com links compartilháveis via WhatsApp. Os desafios são codificados na URL sem servidor e todos os tempos, sequências e notas rodam localmente sem chamadas de API de IA.',
    gearTitle: 'Cadernos, Jogos de Lógica e Acessórios Recomendados',
    gearSubtitle: 'Itens práticos para treinar no papel e cronometrar desafios presenciais.',
    gearItems: [
      {
        category: 'Livros de Passatempos',
        title: 'Cadernos de Sudoku Difícil e Especialista',
        description: 'Papel encorpado para anotações a lápis sem manchar o verso.',
        cta: 'Ver Livros de Sudoku',
      },
      {
        category: 'Jogos de Tabuleiro',
        title: 'Jogos de Dedução e Lógica em Grupo',
        description: 'Jogos rápidos de raciocínio para competir com amigos.',
        cta: 'Explorar Jogos',
      },
      {
        category: 'Papelaria',
        title: 'Lapiseiras de Precisão 0.5 mm',
        description: 'Ponta fina para notas pequenas e legíveis no papel.',
        cta: 'Ver Lapiseiras',
      },
      {
        category: 'Cronômetros',
        title: 'Cronômetros Digitais de Mesa',
        description: 'Contadores práticos para duelos presenciais no papel.',
        cta: 'Ver Cronômetros',
      },
    ],
  },
  footer: {
    canonicalNote: 'Domínio canônico: https://sudokucue.bastelar.com',
    privacyNote: 'Sem rastreamento · Armazenamento local apenas',
  },
  print: {
    subtitle: 'Folha Imprimível de Desafio 9×9',
    instructions: 'Preencha cada linha, coluna e bloco 3×3 com os dígitos de 1 a 9.',
  },
};
