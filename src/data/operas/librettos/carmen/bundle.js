// This opera's metadata and act modules load only when its page is visited.
import { getOpera } from "./operas.js?v=tosca-act1-2";
import { carmenActOneScenes } from "./libretto-carmen-act-1.js?v=carmen-whitespace-20261023";
import { carmenActTwoScenes } from "./libretto-carmen-act-2.js?v=carmen-review-complete-1";
import { carmenActThreeScenes } from "./libretto-carmen-act-3.js?v=carmen-review-complete-1";
import { carmenActFourScenes } from "./libretto-carmen-act-4.js?v=carmen-review-complete-1";

export const carmen = {
  slug: "carmen",
  bilingualActOutlineHeading: true,
  opera: getOpera("carmen"),
  composerShort: "G. BIZET",
  mobileComposer: "Georges Bizet",
  mobileArtworkLabel: "Carmen",
  mobileArtworkUrl: "./public/images/carmen-art.webp",
  originalLanguage: "Français",
  translationLanguage: "English",
  continuousAct: true,
  sceneDivisions: false,
  preserveLineBreaks: true,
  alignVerseLines: true,
  numberLabel: "No.",
  stageDirectionSpeaker: "Stage direction",
  stageDirectionLabel: "Stage direction",
  bracketStageDirections: true,
  speakerTranslations: {
    "CARMEN": "Carmen", "JOSÉ": "José", "MICAËLA": "Micaëla", "MORALES": "Morales",
    "MORALÈS": "Moralès", "ZUNIGA": "Zuniga", "ESCAMILLO": "Escamillo", "PASTIA": "Pastia",
    "LE GUIDE": "The Guide", "LE DANCAÏRE": "Le Dancaïre", "LE DANCAIRE": "Le Dancaïre",
    "LE REMENDADO": "Le Remendado", "CHOEUR": "Chorus", "CHŒUR": "Chorus",
    "CHŒUR DES CIGARIÈRES": "Cigarette makers’ chorus", "CHOEUR DES GAMINS": "Boys’ chorus",
    "LES CIGARIÈRES": "Cigarette makers", "LES JEUNES GENS": "Young men", "LES JEUNES GENS.": "Young men",
    "PREMIER GROUPE": "First group", "PREMIER GROUPE DE FEMMES": "First group of women",
    "DEUXIÈME GROUPE": "Second group", "DEUXIÈME GROUPE DE FEMMES": "Second group of women",
    "UN SOLDAT": "A soldier", "TOUS": "All", "TOUS LES CINQ": "All five", "TOUS LES QUATRE": "All four",
    "TOUTES LES FEMMES": "All the women", "TOUTES LES TROIS": "All three women", "ENFANTS": "Children",
    "ENFANTS et CHOEUR": "Children and chorus", "QUATRE ALGUAZILS": "Four alguazils",
    "UN BOHÉMIEN": "A gypsy", "UN MARCHAND": "A vendor", "PLUSIEURS MARCHANDS": "Several vendors",
    "LES AUTRES MARCHANDS": "Other vendors", "CARMEN et ESCAMILLO": "Carmen and Escamillo",
    "JOSÉ et ESCAMILLO": "José and Escamillo", "MERCEDES.": "Mercédès", "MERCEDES et FRASQUITA": "Mercédès and Frasquita",
    "MERCÉDÈS ET FRASQUITA": "Mercédès and Frasquita", "MERCÉDÈS et FRASQUITA": "Mercédès and Frasquita",
    "FRASQUITA et MERCÉDÈS": "Frasquita and Mercédès", "CARMEN, FRASQUITA et MERCÉDÈS": "Carmen, Frasquita, and Mercédès",
    "FRASQUITA, MERCÉDÈS et CARMEN": "Frasquita, Mercédès, and Carmen",
    "CARMEN, MERCÉDÈS, FRASQUITA et LES FEMMES": "Carmen, Mercédès, Frasquita, and the women",
    "FRASQUITA, MERCÉDÈS, CARMEN et LES FEMMES": "Frasquita, Mercédès, Carmen, and the women",
    "FRASQUITA, MERCÉDÈS, CARMEN, JOSÉ, LE REMENDADO et LE DANCAÏRE": "Frasquita, Mercédès, Carmen, José, Le Remendado, and Le Dancaïre",
    "FRASQUJTA, MERCÉDÈS, LE DANCAÏRE et LE REMENDADO": "Frasquita, Mercédès, Le Dancaïre, and Le Remendado",
    "LE DANCAIRE, LE REMENDADO, FRASQUITA et MERCÉDÈS": "Le Dancaïre, Le Remendado, Frasquita, and Mercédès",
    "LE DANCAÏRE, LE REMENDADO, FRASQUITA et MERCÉDÈS": "Le Dancaïre, Le Remendado, Frasquita, and Mercédès",
    "LE REMENDADO et LE CHOEUR": "Le Remendado and Chorus", "LE REMENDADO et LE DANCAÏRE": "Le Remendado and Le Dancaïre",
    "LE DANCAÏRE et LE REMENDADO": "Le Dancaïre and Le Remendado",
    "LE REMENDADO, LE DANCAÏRE et LES HOMMES": "Le Remendado, Le Dancaïre, and the men",
    "LE REMENDADO et LE DANCAÏRE": "Le Remendado and Le Dancaïre", "MORALES et LE CHOEUR": "Morales and Chorus",
    "LES CIGARIÈRES et LES JEUNES GENS": "Cigarette makers and young men",
    "FRASQUITA, MERCÉDÈS, CARMEN, JOSÉ, LE REMENDADO et LE DANCAÏRE": "Frasquita, Mercédès, Carmen, José, Le Remendado, and Le Dancaïre",
    "LE DANCAÏRE, LE REMENDADO et LES HOMMES": "Le Dancaïre, Le Remendado, and the men"
  },
  translatedForms: {
    "Décor": "Setting", "Monologue": "Monologue", "Prélude": "Prelude", "Scène et choeur": "Scene and chorus", "Choeur des gamins": "Boys’ chorus",
    "Mélodrame": "Melodrama", "Dialogue parlé": "Spoken dialogue", "Choeur des cigarières": "Cigarette makers’ chorus",
    "Habanera": "Habanera", "Scène": "Scene", "Duo": "Duet", "Choeur": "Chorus",
    "Chanson et mélodrame": "Song and melodrama", "Séguedille et duo": "Seguidilla and duet",
    "Final": "Finale", "Entracte": "Entr’acte", "Chanson bohème": "Gypsy song", "Couplets": "Verses",
    "Quintette": "Quintet", "Chanson": "Song", "Sextuor et choeur": "Sextet and chorus", "Trio": "Trio",
    "Morceau d'ensemble": "Ensemble piece", "Air": "Aria", "Marche et choeur": "March and chorus",
    "Duo et choeur final": "Duet and final chorus"
  },
  acts: [
    { number: 1, originalHeading: "PREMIER ACTE", scenes: carmenActOneScenes },
    { number: 2, originalHeading: "DEUXIÈME ACTE", scenes: carmenActTwoScenes },
    { number: 3, originalHeading: "TROISIÈME ACTE", scenes: carmenActThreeScenes },
    { number: 4, originalHeading: "QUATRIÈME ACTE", scenes: carmenActFourScenes }
  ],
  characters: ["Carmen", "Don José", "Escamillo", "Micaëla", "Frasquita", "Mercédès", "Zuniga", "Moralès", "Le Dancaïre", "Le Remendado", "Lillas Pastia"],
  synopsis: {
    eyebrow: "Georges Bizet · Opéra-comique in four acts",
    paragraphs: [
      "In Seville, the free-spirited Carmen catches the attention of the soldier Don José. After a fight at the tobacco factory, he lets her escape and is imprisoned. When he meets her again at Lillas Pastia’s tavern, he abandons his regiment and joins Carmen and her smuggler companions.",
      "In the mountains, Carmen’s cards foretell death, while José’s childhood friend Micaëla finds him and asks him to return home. Carmen’s passion turns to the bullfighter Escamillo, and she refuses José’s demand that she leave with him. Outside the bullring, José kills her."
    ],
    characters: [
      ["Carmen", "Mezzo-soprano", "A cigarette factory worker who insists on choosing her own life and lovers."],
      ["Don José", "Tenor", "A soldier whose love for Carmen becomes possessive and violent."],
      ["Escamillo", "Bass-baritone", "A celebrated bullfighter who becomes Carmen’s lover."],
      ["Micaëla", "Soprano", "A young woman from José’s home village, sent by his mother."],
      ["Frasquita", "Soprano", "Carmen’s friend and a member of the smugglers’ group."],
      ["Mercédès", "Mezzo-soprano", "Carmen’s friend and companion."],
      ["Zuniga", "Bass", "José’s commanding officer."],
      ["Moralès", "Baritone", "A corporal in José’s regiment."],
      ["Le Dancaïre", "Baritone", "A smuggler who leads the group."],
      ["Le Remendado", "Tenor", "A smuggler and Dancaïre’s companion."],
      ["Lillas Pastia", "Speaking role", "The tavern keeper whose inn is a smugglers’ meeting place."]
    ]
  },
  source: "Georges Bizet and Henri Meilhac & Ludovic Halévy, Carmen (1875), French libretto and act/number divisions from Opera Guide: https://opera-guide.ch/operas/carmen/libretto/fr/. Accessed 11 October 2026. English is a fresh line-by-line draft."
};

