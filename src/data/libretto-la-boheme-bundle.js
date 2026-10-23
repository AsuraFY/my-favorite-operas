// This opera's metadata and act modules load only when its page is visited.
import { getOpera } from "./operas.js?v=tosca-act1-2";
import { laBohemeActOneScenes } from "./libretto-la-boheme-act-1.js?v=boheme-review-1";
import { laBohemeActTwoScenes } from "./libretto-la-boheme-act-2.js?v=boheme-review-1";
import { laBohemeActThreeScenes } from "./libretto-la-boheme-act-3.js?v=boheme-review-1";
import { laBohemeActFourScenes } from "./libretto-la-boheme-act-4.js?v=boheme-review-1";

export const laBoheme = {
  slug: "la-boheme",
  threeLineOutline: true,
  albums: [{ name: "La Bohème - Puccini", url: "https://open.spotify.com/album/5b1dUxE8wWIGTyBX5h8CEp" }],
  opera: getOpera("la-boheme"),
  composerShort: "G. PUCCINI",
  mobileComposer: "Giacomo Puccini",
  mobileArtworkUrl: "./public/images/la-boheme-art.webp",
  mobileArtworkLabel: "La Bohème",
  originalLanguage: "Italiano",
  translationLanguage: "English",
  continuousAct: true,
  preserveLineBreaks: true,
  alignVerseLines: true,
  sceneDivisions: false,
  stageDirectionSpeaker: "Stage direction",
  stageDirectionLabel: "Stage direction",
  bracketStageDirections: true,
  acts: [
    { number: 1, originalHeading: "Quadro primo", scenes: laBohemeActOneScenes },
    { number: 2, originalHeading: "Quadro secondo", scenes: laBohemeActTwoScenes },
    { number: 3, originalHeading: "Quadro terzo", scenes: laBohemeActThreeScenes },
    { number: 4, originalHeading: "Quadro quarto", scenes: laBohemeActFourScenes }
  ],
  characters: ["Mimì", "Musetta", "Rodolfo", "Marcello", "Schaunard", "Colline", "Benoît", "Alcindoro", "Parpignol", "Sergeant", "Customs officer"],
  synopsis: {
    eyebrow: "Giacomo Puccini · Opera in four tableaux",
    paragraphs: [
      "On Christmas Eve in a cold Paris garret, the poet Rodolfo and painter Marcello burn a manuscript to keep warm. Their friends Schaunard and Colline arrive with food and money, and the four set out for the Café Momus. Rodolfo stays behind to finish an article. Their neighbor Mimì knocks because her candle has gone out. When both their lights fail, Rodolfo finds her hand in the darkness. They introduce themselves, share their hopes, and fall in love.",
      "The next tableau takes place in the crowded Latin Quarter. Rodolfo and Mimì meet their friends for dinner at the Café Momus. Musetta arrives with Alcindoro and sings to win Marcello’s attention. She succeeds, escapes with the Bohemians as a military retreat passes, and leaves Alcindoro to pay the bill.",
      "At the Barrière d’Enfer in the last days of winter, Mimì asks Marcello for help with Rodolfo. Rodolfo confesses that he loves her but fears her illness and their poverty. The lovers sing of parting when spring comes, while Marcello and Musetta quarrel and separate.",
      "Back in the garret, Rodolfo and Marcello pretend to work while longing for Mimì and Musetta. Schaunard and Colline join them for a comic interlude, but the mood changes when Musetta brings the gravely ill Mimì. Their friends try to comfort her; Mimì dies as Rodolfo calls her name."
    ]
  },
  source: "Giacomo Puccini, La bohème (1896), Italian libretto by Luigi Illica and Giuseppe Giacosa, text and divisions from Teatro alla Scala's libretto PDF: https://www.teatroallascala.org/static/upload/la-/la-boheme-libretto.pdf. English is a fresh line-by-line translation. Each completed tableau is presented continuously, one page per tableau."
};

