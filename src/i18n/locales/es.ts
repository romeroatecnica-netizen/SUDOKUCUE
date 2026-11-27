import type { TranslationBundle } from '../types';

export const es: TranslationBundle = {
  seo: {
    title: 'SudokuCue — Reto de Sudoku Competitivo y Duelo por WhatsApp',
    description:
      'Reta a tus amigos a un duelo de Sudoku 9×9 por enlace o WhatsApp. Juega exactamente el mismo tablero codificado en la URL y supera su tiempo, pistas y puntos sin registro.',
    howToName: 'Cómo enviar y ganar un reto de Sudoku por enlace en WhatsApp',
    howToSteps: [
      {
        name: 'Elige dificultad y resuelve el tablero 9×9',
        text: 'Selecciona Fácil, Medio o Difícil y completa el Sudoku determinista usando el modo Notas y detección de conflictos.',
      },
      {
        name: 'Envía el reto por WhatsApp o copia el enlace',
        text: 'Pulsa Retar por WhatsApp o Copiar enlace para codificar la semilla exacta del puzzle, dificultad, segundos, pistas y puntuación en #c=.',
      },
      {
        name: 'Compara resultados y envía revancha',
        text: 'Tu rival juega el mismo tablero en su navegador, compara tiempo, pistas y puntos al instante y devuelve la revancha.',
      },
    ],
  },
  nav: {
    play: 'Jugar Duelo',
    duelGuide: 'Guía de Reto',
    stats: 'Marcas y JSON',
    faq: 'Preguntas',
    languageLabel: 'Idioma',
  },
  hero: {
    h1: 'Reto de Sudoku Competitivo y Duelo por WhatsApp',
    subtitle:
      'Resuelve un tablero 9×9 determinista, codifica tu tiempo, pistas y puntos en un enlace y reta a tus amigos por WhatsApp a batir tu marca.',
  },
  game: {
    easy: 'Fácil',
    medium: 'Medio',
    hard: 'Difícil',
    newBoard: 'Nuevo Tablero',
    dailyDuel: 'Duelo Diario',
    printSheet: 'Imprimir',
    soundOn: 'Sonido',
    soundOff: 'Silencio',
    boardSeed: 'Tablero',
    time: 'Tiempo',
    hints: 'Pistas',
    filled: 'Celdas',
    score: 'Puntos',
    conflicts: 'Conflictos',
    normalMode: 'Normal',
    notesMode: 'Notas',
    erase: 'Borrar',
    undo: 'Deshacer',
    check: 'Comprobar',
    hintButton: 'Pista',
    hintCostLabel: '-150 pts · +30s',
    checkOk: 'Todos los números escritos coinciden con la solución única.',
    checkErrors: '{count} celda(s) no coinciden con la solución (-40 pts c/u).',
    solvedBannerTitle: '¡Sudoku Completado!',
    solvedBannerSub: 'Tu marca está lista para enviarse por WhatsApp o enlace de reto.',
    pause: 'Pausar',
    resume: 'Reanudar',
    pausedOverlay: 'Cronómetro en pausa — pulsa Reanudar para seguir jugando.',
    keyboardTip: 'Teclas: 1–9 escribir · Flechas mover · N notas · Z deshacer · H pista · Supr borrar',
  },
  svg: {
    title: 'Esquema de Duelo y Progreso SudokuCue',
    quadrantMap: 'Progreso por Bloques 3×3',
    duelBenchmark: 'Comparativa de Tiempo y Puntos',
    you: 'Tú',
    target: 'Meta',
    openTarget: 'Duelo Abierto',
    remaining: 'Faltan',
    hinted: 'Pista',
  },
  duel: {
    cardTitle: 'Reto por Enlace y WhatsApp',
    activeDuelTitle: 'Duelo de Sudoku Recibido',
    openDuelTitle: 'Duelo de Tablero Compartido',
    challengerLabel: 'Retador',
    anonymousChallenger: 'Amigo',
    roundLabel: 'Ronda',
    nicknameLabel: 'Tu Nombre (opcional)',
    nicknamePlaceholder: 'ej. Carlos',
    challengeWhatsApp: 'Retar por WhatsApp',
    copyLink: 'Copiar Enlace de Reto',
    copied: 'Enlace Copiado',
    sendRematch: 'Enviar Revancha',
    shareVictoryBack: 'Enviar Resultado',
    playFreshSolo: 'Salir del Duelo',
    beatTargetHint: 'Supera {time} · {hints} pistas · {score} pts en este mismo tablero.',
    liveCompareHint: 'Misma semilla cargada. Completa el Sudoku para comparar tiempos o pedir revancha.',
    outcomeWin: '¡Victoria — Superaste el Reto!',
    outcomeTie: '¡Empate Exacto!',
    outcomeLoss: 'El Retador Lidera Esta Ronda',
    outcomePending: 'Tablero Completado — Marca Guardada',
    timeDeltaFaster: '{sec}s más rápido que el retador',
    timeDeltaSlower: '{sec}s más lento que el retador',
    timeDeltaEqual: 'Exactamente el mismo tiempo',
    whatsappMessageSolved:
      'Completé este SudokuCue ({diff}) en {time} ({hints} pistas, {score} pts). ¿Puedes superar mi tiempo en exactamente el mismo tablero? {url}',
    whatsappMessageOpen:
      '¡Carrera en este mismo tablero de SudokuCue ({diff})! Abre el enlace para jugar el mismo puzzle: {url}',
    whatsappMessageRematch:
      '¡Revancha SudokuCue (Ronda {round})! Nuevo tablero {diff} listo—a ver si bates mi marca: {url}',
  },
  stats: {
    sectionTitle: 'Marcas Locales, Historial de Duelos y Respaldo JSON',
    streak: 'Racha',
    totalSolved: 'Resueltos',
    duelsWon: 'Duelos Ganados',
    bestTime: 'Mejor Tiempo',
    bestScore: 'Mejor Puntuación',
    noRecord: '—',
    exportJson: 'Exportar JSON',
    importJson: 'Importar JSON',
    importSuccess: 'Respaldo JSON importado correctamente.',
    importError: 'Archivo JSON inválido.',
    historyTitle: 'Últimas Partidas y Duelos',
    historyEmpty: 'Completa tu primer tablero 9×9 o duelo por WhatsApp para guardar tus marcas aquí.',
    clearHistory: 'Limpiar Historial',
    dateCol: 'Fecha',
    diffCol: 'Dificultad',
    timeCol: 'Tiempo',
    hintsCol: 'Pistas',
    scoreCol: 'Puntos',
    resultCol: 'Duelo',
  },
  editorial: {
    guideTitle: 'Cómo Funcionan los Retos de Sudoku por Enlace y WhatsApp',
    guideLead:
      'Convierte cualquier partida en un duelo directo entre amigos sin registros, servidores ni aplicaciones externas.',
    articles: [
      {
        title: '1. Cómo enviar y responder un reto de Sudoku por enlace o WhatsApp',
        body: [
          'Cada tablero en SudokuCue se genera de forma determinista a partir de una semilla numérica y una dificultad. Al completar un Sudoku—o incluso antes de terminarlo—puedes pulsar Retar por WhatsApp o Copiar Enlace de Reto para codificar la semilla, dificultad, idioma, segundos, pistas usadas y puntos en el fragmento #c= de la URL.',
          'Cuando tu amigo abre ese enlace, su navegador reconstruye exactamente la misma cuadrícula 9×9 de forma local. No hace falta servidor ni cuenta: el enlace actúa como árbitro. Al terminar, ambos comparan tiempo, pistas y puntuación y pueden enviar una revancha inmediata.',
        ],
      },
      {
        title: '2. Estrategias para niveles Fácil, Medio y Difícil con Notas y escaneo',
        body: [
          'Para bajar tu marca en duelos cronometrados, evita adivinar y aplica escaneo sistemático. Empieza buscando dígitos frecuentes en bandas horizontales y verticales para fijar candidatos únicos en cada bloque 3×3.',
          'Activa el modo Notas (tecla N) cuando una casilla tenga dos o tres candidatos posibles. Mantener candidatos limpios te permite detectar pares desnudos y candidatos bloqueados en segundos. Al colocar un dígito definitivo en modo Normal, SudokuCue limpia automáticamente esa nota en fila, columna y bloque.',
        ],
      },
      {
        title: '3. Cómo ganar duelos evitando pistas penalizadas',
        body: [
          'Cada Pista muestra un número garantizado pero aplica una penalización visible de -150 puntos y +30 segundos de impacto competitivo. Usar Comprobar también resta 40 puntos por cada casilla incorrecta.',
          'En duelos apretados de nivel Medio o Difícil, una sola pista puede costarte la victoria aunque seas ligeramente más rápido. Revisa primero filas casi llenas y notas únicas antes de gastar una pista.',
        ],
      },
      {
        title: '4. Ideas de retos rápidos entre amigos o compañeros',
        body: [
          'Organiza un Duelo Diario en la pausa del café: todos pulsan Duelo Diario en nivel Medio para jugar la misma semilla del día y compartir capturas o enlaces en el grupo de WhatsApp. También puedes jugar al mejor de 3 rondas subiendo de Fácil a Difícil con el botón Enviar Revancha.',
        ],
      },
    ],
    faqTitle: 'Preguntas Frecuentes sobre Retos de Sudoku',
    faqs: [
      {
        q: '¿Cómo garantiza el enlace #c= que ambos jugamos exactamente el mismo Sudoku?',
        a: 'SudokuCue utiliza un generador pseudoaleatorio determinista con verificación de solución única. La semilla y la dificultad viajan en el fragmento #c= de la URL, generando idénticas pistas iniciales en cualquier navegador.',
      },
      {
        q: '¿Se requiere cuenta, servidor o llamadas a APIs de IA?',
        a: 'No. Toda la generación de tableros, validación de conflictos, cronómetro, puntuación y guardado en localStorage funciona 100 % en tu navegador sin backend ni IA.',
      },
      {
        q: '¿Cómo se decide el ganador en un duelo por WhatsApp?',
        a: 'La puntuación parte de 1.000 (Fácil), 1.800 (Medio) o 2.800 (Difícil), restando 2 puntos por segundo, 150 puntos por pista y 40 por error al comprobar. Gana la mayor puntuación; en empate gana el menor tiempo y luego menos pistas.',
      },
      {
        q: '¿Puedo imprimir un Sudoku en papel o exportar mis récords?',
        a: 'Sí. El botón Imprimir formatea una hoja limpia sin menús ni anuncios lista para lápiz y papel, y en la sección inferior puedes exportar o importar tu historial en formato JSON.',
      },
      {
        q: '¿Deshacer movimientos tiene penalización?',
        a: 'No, Deshacer es gratuito e ilimitado tanto para dígitos como para notas.',
      },
    ],
    transparencyNotice:
      'Juego de retos competitivos de Sudoku 100 % en el navegador con enlaces compartibles por WhatsApp. Los duelos se codifican en la URL sin servidor y todos los tiempos, rachas y notas funcionan localmente sin llamadas a APIs de IA.',
    gearTitle: 'Cuadernos, Juegos de Lógica y Material Recomendado',
    gearSubtitle: 'Selección práctica para entrenar en papel, noches de juegos y retos cronometrados.',
    gearItems: [
      {
        category: 'Libros de Pasatiempos',
        title: 'Cuadernos de Sudoku Nivel Difícil y Experto',
        description: 'Papel grueso de 120 g para anotar candidatos a lápiz sin traspasar la hoja.',
        cta: 'Ver Libros de Sudoku',
      },
      {
        category: 'Juegos de Mesa',
        title: 'Juegos de Lógica y Deducción para Grupos',
        description: 'Juegos rápidos de ingenio y patrones ideales para competir con amigos.',
        cta: 'Explorar Juegos de Lógica',
      },
      {
        category: 'Papelería',
        title: 'Portaminas de Precisión 0.5 mm con Goma Fina',
        description: 'Trazo limpio y cómodo para escribir notas pequeñas en cuadrículas impresas.',
        cta: 'Ver Portaminas',
      },
      {
        category: 'Cronómetros',
        title: 'Relojes y Cronómetros Digitales de Sobremesa',
        description: 'Cronómetros táctiles de mesa para medir duelos en papel cara a cara.',
        cta: 'Ver Cronómetros',
      },
    ],
  },
  footer: {
    canonicalNote: 'Dominio canónico: https://sudokucue.bastelar.com',
    privacyNote: 'Sin rastreo · Almacenamiento local en navegador',
  },
  print: {
    subtitle: 'Hoja Imprimible de Reto 9×9',
    instructions: 'Completa cada fila, columna y bloque 3×3 con los números del 1 al 9 sin repetir.',
  },
};
