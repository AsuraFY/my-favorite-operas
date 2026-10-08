// Data registry for complete libretti; the reader UI consumes this shape for every opera.
// Original Così dialogue stays in the existing act files, unchanged.
import { getOpera } from "./operas.js?v=opera-search-1";
import { cosiActOneScenes } from "./libretti.js?v=cosi-libretto-2";
import { cosiActTwoScenes } from "./libretti-act2.js?v=act2-18";

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
  originalLanguage: "Italiano",
  translationLanguage: "English",
  recitativeLabel: "Recitativo",
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

const completeLibretti = { [cosi.slug]: cosi };
export function getLibretto(slug) {
  return completeLibretti[slug] || null;
}
export const librettoCatalog = Object.values(completeLibretti);
