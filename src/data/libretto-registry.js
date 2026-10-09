// Data registry for complete libretti; the reader UI consumes this shape for every opera.
// Original Così dialogue stays in the existing act files, unchanged.
import { getOpera } from "./operas.js?v=opera-art-2";
import { cosiActOneScenes } from "./libretti.js?v=cosi-libretto-2";
import { cosiActTwoScenes } from "./libretti-act2.js?v=act2-18";
import { barbiereActOneScenes } from "./libretti-barbiere-act1.js?v=barbiere-act1-2";
import { barbiereActTwoScenes } from "./libretti-barbiere-act2.js?v=barbiere-act2-2";
import { tristanActOneScenes } from "./libretti-tristan-act1.js?v=tristan-act1-2";
import { tristanActTwoScenes } from "./libretti-tristan-act2.js?v=tristan-act2-4";
import { tristanActThreeScenes } from "./libretti-tristan-act3.js?v=tristan-act3-4";

const characters = [
  ["Fiordiligi", "Soprano", "Dorabella’s sister, engaged to Guglielmo; she struggles to remain loyal during the test."],
  ["Dorabella", "Mezzo-soprano", "Fiordiligi’s sister, engaged to Ferrando; her feelings shift during the disguised courtship."],
  ["Ferrando", "Tenor", "A young officer engaged to Dorabella, who joins Alfonso’s wager and disguises himself."],
  ["Guglielmo", "Baritone", "An officer engaged to Fiordiligi, who joins Ferrando in the test of fidelity."],
  ["Don Alfonso", "Bass", "An older philosopher who doubts constancy and devises the wager."],
  ["Despina", "Soprano", "The sisters’ quick-witted maid, enlisted to help carry out Alfonso’s scheme."]
];
const albanian = "disguised as an Albanian suitor";
const disguises = {};
for (const key of ["1:11", "1:15", "1:16", "2:4", "2:16", "2:17"]) {
  disguises[key] = { Ferrando: albanian, Guglielmo: albanian };
}
for (const key of ["2:6", "2:12"]) disguises[key] = { Ferrando: albanian };
disguises["2:5"] = { Guglielmo: albanian };
disguises["1:16"].Despina = "disguised as a doctor";
disguises["2:17"].Despina = "disguised as a notary";

const cosi = {
  slug: "cosi-fan-tutte",
  opera: getOpera("cosi-fan-tutte"),
  composerShort: "W. A. MOZART",
  mobileComposer: "W. A. Mozart",
  mobileArtworkLabel: "Lake Como landscape",
  mobileArtworkUrl: "./public/images/lake-como-banner.webp",
  originalLanguage: "Italiano",
  translationLanguage: "English",
  recitativeLabel: "Recitativo",
  sceneOriginalPrefix: "Scena",
  stageDirectionSpeaker: "Stage direction",
  translatedForms: { Terzetto: "Trio", Duetto: "Duet", Aria: "Aria" },
  acts: [
    { number: 1, originalHeading: "Atto Primo", scenes: cosiActOneScenes },
    { number: 2, originalHeading: "Atto Secondo", scenes: cosiActTwoScenes }
  ],
  sceneOrdinals: ["PRIMA", "SECONDA", "TERZA", "QUARTA", "QUINTA", "SESTA", "SETTIMA", "OTTAVA", "NONA", "DECIMA", "UNDICESIMA", "DODICESIMA", "TREDICESIMA", "QUATTORDICESIMA", "QUINDICESIMA", "SEDICESIMA", "DICIASSETTESIMA", "ULTIMA"],
  synopsis: {
    eyebrow: "W. A. Mozart · Opera buffa in two acts",
    paragraphs: [
      "Two young officers, Ferrando and Guglielmo, are certain their fiancées, Dorabella and Fiordiligi, will always be faithful. Don Alfonso challenges their confidence with a wager: the officers must pretend to leave for war, return in disguise, and attempt to win each other’s beloved.",
      "With help from the sisters’ maid Despina, Alfonso engineers increasingly elaborate encounters. The deception tests all four lovers, culminating in a staged wedding and a final revelation that forces them to confront love, loyalty and human inconsistency."
    ],
    characters
  },
  // Only exceptional incipits need overrides. Ordinary section titles are inferred or supplied by data.
  sectionTitleOverrides: {
    "1:1:0": { original: "La mia Dorabella capace non è" },
    "1:1:2": { original: "È la fede delle femmine", translation: "A woman’s faith" },
    "1:1:4": { original: "Una bella serenata", translation: "A lovely serenade" },
    "1:2:0": { original: "Ah, guarda, sorella", translation: "Ah, look, sister" },
    "1:3:1": { original: "Vorrei dir, e cor non ho", translation: "I would speak, but have no heart" },
    "2:18:0": { original: "Fortunato l'uom che prende" }
  },
  characters: characters.map(([name]) => name),
  disguises,
  ensembleLabels: {
    "Soldiers & townspeople": "Soldiers & townspeople",
    "Chorus of Servants & Musicians": "Servants & musicians (chorus)",
    Chorus: "Chorus"
  }
};

const barbiere = {
  slug: "il-barbiere-di-siviglia",
  opera: getOpera("il-barbiere-di-siviglia"),
  composerShort: "G. ROSSINI",
  mobileComposer: "G. Rossini",
  mobileArtworkLabel: "Seville at dawn",
  originalLanguage: "Italiano",
  translationLanguage: "English",
  recitativeLabel: "Recitativo",
  sceneOriginalPrefix: "Scena",
  stageDirectionSpeaker: "Stage direction",
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
  ensembleLabels: { "The Count and Figaro": "The Count & Figaro", "All": "Ensemble", Chorus: "Chorus" },
  source: "Cesare Sterbini, Il barbiere di Siviglia (1816), Act I; public-domain Italian text, Acts I–II: https://www.librettidopera.it/barb_siv/a_01.html and https://www.librettidopera.it/barb_siv/a_02.html"
};

const tristan = {
  slug: "tristan-und-isolde",
  opera: getOpera("tristan-und-isolde"),
  composerShort: "R. WAGNER",
  mobileComposer: "Richard Wagner",
  mobileArtworkLabel: "Tristan und Isolde",
  originalLanguage: "Deutsch",
  translationLanguage: "English",
  sceneOriginalPrefix: "Szene",
  stageDirectionSpeaker: "Stage direction",
  translatedForms: { Dialog: "Dialogue" },
  acts: [
    { number: 1, originalHeading: "Erster Aufzug", scenes: tristanActOneScenes },
    { number: 2, originalHeading: "Zweiter Aufzug", scenes: tristanActTwoScenes },
    { number: 3, originalHeading: "Dritter Aufzug", scenes: tristanActThreeScenes }
  ],
  sceneOrdinals: ["ERSTE", "ZWEITE", "DRITTE", "VIERTE", "FÜNFTE"],
  synopsis: {
    eyebrow: "Richard Wagner · Musikdrama in drei Aufzügen",
    paragraphs: [
      "Tristan escorts the Irish princess Isolde to Cornwall to marry his uncle, King Marke. Isolde remembers that Tristan killed her former betrothed, Morold, yet she once healed Tristan’s wounds. She asks for a fatal potion, but her companion Brangäne substitutes a love potion.",
      "Their forbidden love is discovered, and Tristan is gravely wounded. He waits for Isolde to return and heal him, but she arrives too late. Wagner’s drama explores a passion that cannot be reconciled with duty, time, or the ordinary world."
    ],
    characters: [
      ["Tristan", "Tenor", "A knight torn between loyalty to King Marke and his love for Isolde."],
      ["Isolde", "Soprano", "An Irish princess promised to King Marke."],
      ["King Marke", "Bass", "Cornwall’s ruler and Tristan’s uncle."],
      ["Brangäne", "Mezzo-soprano", "Isolde’s attendant and confidante."],
      ["Kurwenal", "Baritone", "Tristan’s devoted companion."],
      ["Melot", "Tenor", "A courtier who exposes the lovers."]
    ]
  },
  characters: ["Tristan", "Isolde", "King Marke", "Brangäne", "Kurwenal", "Melot", "Der Hirt", "Der Steuermann", "Schiffsvolk", "Hofleute", "Männer", "Frauen"],
  source: "Richard Wagner, Tristan und Isolde (1859), German libretto. Public-domain source text: https://www.librettoarchive.com/Tristan_und_Isolde_libretto_German_Act_1, https://www.librettoarchive.com/Tristan_und_Isolde_libretto_German_Act_2, and https://www.librettoarchive.com/Tristan_und_Isolde_libretto_German_Act_3. English translation prepared for this reader."
};

const completeLibretti = { [cosi.slug]: cosi, [barbiere.slug]: barbiere, [tristan.slug]: tristan };
export function getLibretto(slug) {
  return completeLibretti[slug] || null;
}
export const librettoCatalog = Object.values(completeLibretti);
