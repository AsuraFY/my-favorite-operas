// This opera's metadata and act modules load only when its page is visited.
import { getOpera } from "./operas.js?v=tosca-act1-2";
import { barbiereActOneScenes } from "./libretto-il-barbiere-di-siviglia-act-1.js?v=barbiere-verse-review-20261023";
import { barbiereActTwoScenes } from "./libretto-il-barbiere-di-siviglia-act-2.js?v=barbiere-act2-4";

export const barbiere = {
  slug: "il-barbiere-di-siviglia",
  threeLineOutline: true,
  continuousAct: true,
  opera: getOpera("il-barbiere-di-siviglia"),
  composerShort: "G. ROSSINI",
  mobileComposer: "G. Rossini",
  mobileArtworkLabel: "Seville at dawn",
  originalLanguage: "Italiano",
  translationLanguage: "English",
  recitativeLabel: "Recitativo",
  sceneOriginalPrefix: "Scena",
  stageDirectionSpeaker: "Stage direction",
  originalSpeakerNames: {
    "All": "Tutti",
    "All three": "Tutti e tre",
    "Bartolo and Basilio": "Bartolo e Basilio",
    "Bartolo and Rosina": "Bartolo e Rosina",
    "Basilio and Berta": "Basilio e Berta",
    "Berta, Bartolo and Basilio": "Berta, Bartolo e Basilio",
    "Chorus": "Coro",
    "Figaro and Basilio": "Figaro e Basilio",
    "Officer": "Ufficiale",
    "Magistrate": "Alcalde",
    "Rosina and Berta": "Rosina e Berta",
    "Rosina and The Count": "Rosina e Il Conte",
    "Rosina, The Count and Figaro": "Rosina, Il Conte e Figaro",
    "The Count": "Il Conte",
    "The Count and Bartolo": "Il Conte e Bartolo",
    "The Count and Figaro": "Il Conte e Figaro",
    "The Count and Rosina": "Il Conte e Rosina"
},
  translatedForms: { Cavatina: "Cavatina", Canzone: "Song", Duetto: "Duet", Aria: "Aria" },
  acts: [
    { number: 1, originalHeading: "Atto primo", scenes: barbiereActOneScenes },
    { number: 2, originalHeading: "Atto secondo", scenes: barbiereActTwoScenes }
  ],
  sceneOrdinals: ["PRIMA", "SECONDA", "TERZA", "QUARTA", "QUINTA", "SESTA", "SETTIMA", "OTTAVA", "NONA", "DECIMA", "UNDICESIMA", "DODICESIMA", "TREDICESIMA", "QUATTORDICESIMA", "QUINDICESIMA", "SEDICESIMA"],
  synopsis: {
    eyebrow: "Gioachino Rossini · Opera buffa in two acts",
    paragraphs: [
      "In Seville, the resourceful barber Figaro helps Count Almaviva approach Rosina, the young ward of Doctor Bartolo. Almaviva hides his identity and courts her as the poor student Lindoro, while Bartolo schemes to marry Rosina himself.",
      "Act I brings their plans together through disguises, a forged lodging billet, and Figaro’s quick thinking. The act ends when a cavalry officer recognizes Almaviva and the household is left bewildered."
    ],
    characters: [
      ["Figaro", "Baritone", "Seville’s ingenious barber and self-appointed fixer, who helps Almaviva reach Rosina."],
      ["Rosina", "Soprano", "Bartolo’s clever young ward, determined to choose her own husband."],
      ["Count Almaviva", "Tenor", "A nobleman who courts Rosina in disguise as the student Lindoro."],
      ["Doctor Bartolo", "Bass-baritone", "Rosina’s suspicious guardian, intent on marrying her himself."],
      ["Don Basilio", "Bass", "Rosina’s music teacher, who proposes using slander to remove Almaviva."],
      ["Berta", "Mezzo-soprano", "A servant in Bartolo’s household."],
      ["Fiorello", "Baritone", "Almaviva’s servant."],
      ["Ambrogio", "Silent role", "Bartolo’s sleepy servant."],
      ["Officer", "Speaking role", "A cavalry officer who recognizes Almaviva."]
    ]
  },
  characters: ["Figaro", "Rosina", "The Count", "Bartolo", "Basilio", "Berta", "Fiorello", "Ambrogio", "Officer"],
  disguises: {
    "1:13": { "The Count": "disguised as a cavalry soldier" },
    "1:14": { "The Count": "disguised as a cavalry soldier" },
    "1:15": { "The Count": "disguised as a cavalry soldier" },
    "1:16": { "The Count": "disguised as a cavalry soldier" }
  },
  ensembleLabels: {},
  source: "Cesare Sterbini, Il barbiere di Siviglia (1816), Librettidopera.it. Outline types, incipits and divisions checked 14 October 2026 against the act texts and https://www.librettidopera.it/barb_siv/som.html. No numeric labels supplied by this edition. English remains a draft. Acts I–II: https://www.librettidopera.it/barb_siv/a_01.html and https://www.librettidopera.it/barb_siv/a_02.html"
};

