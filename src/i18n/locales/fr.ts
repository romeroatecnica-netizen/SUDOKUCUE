import type { TranslationBundle } from '../types';

export const fr: TranslationBundle = {
  seo: {
    title: 'SudokuCue — Défi Sudoku Compétitif et Duel par Lien WhatsApp',
    description:
      'Défiez vos amis sur la même grille de Sudoku 9×9 via un lien WhatsApp encodé dans l’URL. Comparez chronos, indices et scores 100 % côté client.',
    howToName: 'Comment envoyer et battre un défi Sudoku sur WhatsApp',
    howToSteps: [
      {
        name: 'Choisir la difficulté et résoudre la grille 9×9',
        text: 'Sélectionnez Facile, Moyen ou Difficile et résolvez le Sudoku déterministe avec le mode Notes.',
      },
      {
        name: 'Partager le lien #c= sur WhatsApp',
        text: 'Copiez le lien de défi ou envoyez-le sur WhatsApp avec la graine exacte, votre temps, vos indices et votre score.',
      },
      {
        name: 'Comparer les scores et envoyer une revanche',
        text: 'Votre ami joue la même grille localement, compare vos résultats et renvoie une nouvelle revanche.',
      },
    ],
  },
  nav: {
    play: 'Jouer',
    duelGuide: 'Guide Duel',
    stats: 'Records & JSON',
    faq: 'FAQ',
    languageLabel: 'Langue',
  },
  hero: {
    h1: 'Défi Sudoku Compétitif et Duel WhatsApp',
    subtitle:
      'Résolvez une grille 9×9 déterministe, encodez votre temps, vos indices et votre score dans un lien et défiez vos amis sur WhatsApp.',
  },
  game: {
    easy: 'Facile',
    medium: 'Moyen',
    hard: 'Difficile',
    newBoard: 'Nouvelle Grille',
    dailyDuel: 'Duel du Jour',
    printSheet: 'Imprimer',
    soundOn: 'Son Activé',
    soundOff: 'Muet',
    boardSeed: 'Grille',
    time: 'Temps',
    hints: 'Indices',
    filled: 'Rempli',
    score: 'Score',
    conflicts: 'Conflits',
    normalMode: 'Normal',
    notesMode: 'Notes',
    erase: 'Effacer',
    undo: 'Annuler',
    check: 'Vérifier',
    hintButton: 'Indice',
    hintCostLabel: '-150 pts · +30s',
    checkOk: 'Tous les chiffres saisis correspondent à la solution unique.',
    checkErrors: '{count} case(s) ne correspondent pas à la solution (-40 pts chacune).',
    solvedBannerTitle: 'Grille Résolue !',
    solvedBannerSub: 'Votre chrono est prêt à être partagé sur WhatsApp ou par lien.',
    pause: 'Pause',
    resume: 'Reprendre',
    pausedOverlay: 'Chronomètre en pause — cliquez sur Reprendre pour continuer.',
    keyboardTip: 'Clavier : 1–9 saisir · Flèches déplacer · N notes · Z annuler · H indice · Suppr effacer',
  },
  svg: {
    title: 'Schéma de Duel et Progression SudokuCue',
    quadrantMap: 'Blocs 3×3 Complétés',
    duelBenchmark: 'Comparatif Temps & Score',
    you: 'Vous',
    target: 'Cible',
    openTarget: 'Duel Ouvert',
    remaining: 'Restant',
    hinted: 'Indice',
  },
  duel: {
    cardTitle: 'Défi WhatsApp & Lien Direct',
    activeDuelTitle: 'Défi Sudoku Reçu',
    openDuelTitle: 'Duel sur Grille Partagée',
    challengerLabel: 'Adversaire',
    anonymousChallenger: 'Ami',
    roundLabel: 'Manche',
    nicknameLabel: 'Votre Prénom (optionnel)',
    nicknamePlaceholder: 'ex. Camille',
    challengeWhatsApp: 'Défier sur WhatsApp',
    copyLink: 'Copier le Lien',
    copied: 'Lien Copié',
    sendRematch: 'Envoyer Revanche',
    shareVictoryBack: 'Renvoyer le Score',
    playFreshSolo: 'Quitter le Duel',
    beatTargetHint: 'Battez {time} · {hints} indices · {score} pts sur cette grille exacte.',
    liveCompareHint: 'Même graine chargée. Terminez la grille pour comparer vos temps.',
    outcomeWin: 'Victoire — Défi Remporté !',
    outcomeTie: 'Égalité Parfaite !',
    outcomeLoss: 'L’Adversaire Mène Cette Manche',
    outcomePending: 'Grille Terminée — Score Verrouillé',
    timeDeltaFaster: '{sec}s plus rapide que l’adversaire',
    timeDeltaSlower: '{sec}s de retard',
    timeDeltaEqual: 'Temps strictement identique',
    whatsappMessageSolved:
      'J’ai résolu ce SudokuCue ({diff}) en {time} ({hints} indices, {score} pts). Peux-tu me battre sur exactement la même grille ? {url}',
    whatsappMessageOpen:
      'Course sur cette grille SudokuCue ({diff}) ! Ouvre le lien pour jouer le même puzzle : {url}',
    whatsappMessageRematch:
      'Revanche SudokuCue (Manche {round}) ! Nouvelle grille {diff} prête—à toi de jouer : {url}',
  },
  stats: {
    sectionTitle: 'Records Locaux, Historique et Sauvegarde JSON',
    streak: 'Série',
    totalSolved: 'Résolus',
    duelsWon: 'Duels Gagnés',
    bestTime: 'Meilleur Temps',
    bestScore: 'Meilleur Score',
    noRecord: '—',
    exportJson: 'Exporter JSON',
    importJson: 'Importer JSON',
    importSuccess: 'Sauvegarde importée avec succès.',
    importError: 'Fichier JSON invalide.',
    historyTitle: 'Historique Récent',
    historyEmpty: 'Terminez votre première grille 9×9 ou un duel WhatsApp pour enregistrer vos temps.',
    clearHistory: 'Effacer',
    dateCol: 'Date',
    diffCol: 'Niveau',
    timeCol: 'Temps',
    hintsCol: 'Indices',
    scoreCol: 'Score',
    resultCol: 'Duel',
  },
  editorial: {
    guideTitle: 'Comment Fonctionnent les Défis Sudoku par Lien WhatsApp',
    guideLead: 'Affrontez vos proches sur la même grille 9×9 sans création de compte ni serveur.',
    articles: [
      {
        title: '1. Envoyer et battre un lien de défi Sudoku sur WhatsApp',
        body: [
          'Chaque grille SudokuCue repose sur une graine numérique déterministe. En cliquant sur Défier sur WhatsApp ou Copier le Lien, la graine, le niveau, le temps en secondes, les indices utilisés et le score sont encodés directement dans l’ancre #c= de l’URL.',
          'Votre adversaire ouvre le lien et obtient instantanément la même grille à solution unique dans son navigateur, puis compare vos chronos face à face.',
        ],
      },
      {
        title: '2. Résoudre plus vite grâce au mode Notes et au balayage',
        body: [
          'Commencez par le balayage croisé (cross-hatching) sur les chiffres les plus présents, puis activez le mode Notes (touche N) pour repérer les paires nues et candidats bloqués. Les notes conflictuelles sont nettoyées automatiquement à chaque saisie.',
        ],
      },
      {
        title: '3. Gagner les duels en évitant les pénalités d’indices',
        body: [
          'Chaque indice coûte 150 points et ajoute 30 secondes d’impact. En vérifiant les lignes et blocs presque pleins avant d’utiliser un indice, vous conservez un score maximal.',
        ],
      },
      {
        title: '4. Idées de tournois express entre amis ou collègues',
        body: [
          'Lancez un Duel du Jour à la pause café sur la graine quotidienne UTC ou jouez une série en 3 manches avec le bouton Envoyer Revanche.',
        ],
      },
    ],
    faqTitle: 'Questions Fréquentes',
    faqs: [
      {
        q: 'Comment le lien #c= garantit-il exactement la même grille sans serveur ?',
        a: 'La graine et la difficulté contenues dans l’URL pilotent le générateur déterministe localement sur chaque appareil.',
      },
      {
        q: 'Combien coûte un indice ou une vérification ?',
        a: 'Un indice retire 150 points (+30s) et une erreur détectée par Vérifier retire 40 points. Annuler (Undo) est gratuit.',
      },
      {
        q: 'Puis-je imprimer la grille ou sauvegarder mes records ?',
        a: 'Oui, via le bouton Imprimer (mise en page @media print épurée) et les boutons Exporter / Importer JSON.',
      },
    ],
    transparencyNotice:
      'Jeu de défi Sudoku compétitif 100 % côté client avec liens WhatsApp partageables. Les défis sont encodés dans l’URL sans backend et toutes les données restent dans votre navigateur sans appel d’API IA.',
    gearTitle: 'Accessoires & Livres Sudoku Recommandés',
    gearSubtitle: 'Sélection pratique pour jouer sur papier et chronométrer vos duels.',
    gearItems: [
      {
        category: 'Livres',
        title: 'Cahiers Sudoku Expert Grand Format',
        description: 'Papier épais anti-bavure idéal pour noter les candidats au crayon.',
        cta: 'Voir les Cahiers',
      },
      {
        category: 'Jeux de Société',
        title: 'Jeux de Logique et Déduction entre Amis',
        description: 'Jeux de réflexion rapides pour soirées compétitives à plusieurs.',
        cta: 'Découvrir les Jeux',
      },
      {
        category: 'Papeterie',
        title: 'Porte-mines de Précision 0,5 mm',
        description: 'Mine fine et gomme précise pour des grilles papier nettes.',
        cta: 'Voir les Porte-mines',
      },
      {
        category: 'Chrono',
        title: 'Chronomètres de Table Compétitifs',
        description: 'Minuteurs fiables pour duels de Sudoku sur papier.',
        cta: 'Voir les Chronomètres',
      },
    ],
  },
  footer: {
    canonicalNote: 'Domaine canonique : https://sudokucue.bastelar.com',
    privacyNote: 'Aucun traceur · Stockage local navigateur uniquement',
  },
  print: {
    subtitle: 'Grille de Défi 9×9 Imprimable',
    instructions: 'Complétez chaque ligne, colonne et bloc 3×3 avec les chiffres 1 à 9.',
  },
};
