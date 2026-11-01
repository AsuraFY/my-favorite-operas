// This opera's metadata and act modules load only when its page is visited.
import { applyFigaroOutlineMetadata } from "./figaro-outline-metadata.js?v=figaro-outlines-20261021";
import { getOpera } from "./operas.js?v=tosca-act1-2";
import { figaroActOneScenes } from "./libretto-le-nozze-di-figaro-act-1.js?v=figaro-stage-cues-20261023";
import { figaroActTwoScenes } from "./libretto-le-nozze-di-figaro-act-2.js?v=figaro-act2-review-1";
import { figaroActThreeScenes } from "./libretto-le-nozze-di-figaro-act-3.js?v=figaro-act3-review-1";
import { figaroActFourScenes } from "./libretto-le-nozze-di-figaro-act-4.js?v=figaro-act4-review-1";

export const figaro = {
  threeLineOutline: true,
  slug: "le-nozze-di-figaro",
  opera: getOpera("le-nozze-di-figaro"),
  composerShort: "W. A. MOZART",
  mobileComposer: "W. A. Mozart",
  mobileArtworkUrl: "./public/images/figaro-art.webp",
  mobileArtworkLabel: "Le nozze di Figaro",
  originalLanguage: "Italiano",
  translationLanguage: "English",
  continuousAct: true,
  preserveLineBreaks: true,
  alignVerseLines: true,
  recitativeLabel: "Recitativo",
  sceneOriginalPrefix: "Scena",
  stageDirectionSpeaker: "Stage direction",
  stageDirectionLabel: "",
  bracketStageDirections: true,
  translatedForms: { Ouverture: "Overture", Recitativo: "Recitative", "Recitativo ed Aria": "Recitative and aria", Duettino: "Little duet", Cavatina: "Cavatina", Arietta: "Short aria", Aria: "Aria", Terzetto: "Trio", Sestetto: "Sextet", Coro: "Chorus", Finale: "Finale" },
  acts: [
    { number: 1, originalHeading: "Atto primo", scenes: figaroActOneScenes },
    { number: 2, originalHeading: "Atto secondo", scenes: figaroActTwoScenes },
    { number: 3, originalHeading: "Atto terzo", scenes: figaroActThreeScenes },
    { number: 4, originalHeading: "Atto quarto", scenes: figaroActFourScenes }
  ],
  characters: ["Figaro", "Susanna", "Il Conte", "La Contessa", "Cherubino", "Marcellina", "Bartolo", "Basilio", "Don Curzio", "Antonio", "Barbarina"],
  synopsis: {
    eyebrow: "Wolfgang Amadeus Mozart · Opera buffa in four acts",
    paragraphs: [
      "On Figaro and Susanna’s wedding day, Susanna reveals that Count Almaviva is pursuing her. Figaro plans to outwit him, while Marcellina tries to enforce a promise that Figaro will marry her if he cannot repay a debt. Cherubino’s amorous adventures add to the confusion.",
      "Susanna and the neglected Countess arrange disguises and appointments to expose the Count’s jealousy and infidelity. Marcellina’s claim unexpectedly reveals that she and Bartolo are Figaro’s parents, clearing the way for his marriage to Susanna.",
      "That evening, mistaken identities in the garden test trust on every side. The Count finally discovers that the woman he has been courting is his own wife in disguise. He asks her forgiveness, which she grants, and the company celebrates reconciliation."
    ],
    characters: [
      ["Figaro", "Bass-baritone", "The Count’s valet, engaged to Susanna."],
      ["Susanna", "Soprano", "The Countess’s maid and Figaro’s bride."],
      ["Il Conte d’Almaviva", "Baritone", "A Spanish nobleman pursuing Susanna."],
      ["La Contessa d’Almaviva", "Soprano", "The Count’s neglected wife."],
      ["Cherubino", "Mezzo-soprano", "The Count’s young page, played by a woman."],
      ["Marcellina", "Mezzo-soprano", "A former housekeeper who claims Figaro as her husband."],
      ["Bartolo", "Bass", "A doctor from Seville who helps Marcellina."],
      ["Basilio", "Tenor", "The music teacher and the Count’s intermediary."],
      ["Don Curzio", "Tenor", "A judge handling Marcellina’s claim."],
      ["Antonio", "Bass", "The gardener, Susanna’s uncle."],
      ["Barbarina", "Soprano", "Antonio’s daughter."],
      ["Due Contadine", "Soprano and contralto", "Two peasant women."],
      ["Coro", "Chorus", "Peasant men and women."]
    ]
  },
  source: "Lorenzo Da Ponte, Le nozze di Figaro (1786), Italian libretto, all acts from Opera Guide: https://opera-guide.ch/operas/le+nozze+di+figaro/libretto/it/. Accessed 11 October 2026. Acts I–II have editorially reviewed line-aligned English translations. Acts III–IV were editorially reviewed against the Italian on 17 October 2026; embedded speaker cues and scraped footer artifacts were corrected. Desktop/mobile visual review remains pending."
};

applyFigaroOutlineMetadata(figaro.acts);

