// Die Zauberflöte: Act I only. Act II is not yet populated.
import { getOpera } from "./operas.js";
import { dieZauberfloteActOneScenes } from "./libretto-die-zauberflote-act-1.js";
export const dieZauberflote = {
  slug: "the-magic-flute",
  opera: getOpera("the-magic-flute"),
  composerShort: "W. A. MOZART",
  mobileComposer: "Wolfgang Amadeus Mozart",
  mobileArtworkUrl: "./public/images/the-magic-flute-art.webp",
  mobileArtworkLabel: "Die Zauberflöte",
  originalLanguage: "Deutsch",
  translationLanguage: "English",
  partialLibretto: true, // Only Act I is published; Act II is not yet available.
  continuousAct: true,
  preserveLineBreaks: true,
  alignVerseLines: true,
  threeLineOutline: true,
  sourceTitlesOnly: true,
  sceneOriginalPrefix: "Auftritt",
  stageDirectionSpeaker: "Stage direction",
  stageDirectionLabel: "Stage direction",
  translatedForms: {},
  acts: [{ number: 1, originalHeading: "Erster Akt", prelude: { title: "Ouvertüre", translation: "Overture" }, scenes: dieZauberfloteActOneScenes }],
  characters: ["Tamino", "Pamina", "Papageno", "Queen of the Night", "Sarastro", "Monostatos", "Three Ladies", "Three Boys"],
  synopsis: {
    eyebrow: "W. A. Mozart · Singspiel in two acts · Act I available",
    paragraphs: [
      "The young prince Tamino is pursued by a serpent and rescued by the Queen of the Night’s three attendants. She shows him a portrait of Pamina, who is being held in Sarastro’s domain, and persuades him to set out to rescue her. The bird-catcher Papageno joins him, carrying magic bells, while Tamino receives a magic flute.",
      "Papageno finds Pamina and they try to escape together. Tamino reaches the temple of wisdom, where he begins to doubt what he has been told about Sarastro. At the end of Act I, Pamina and Tamino meet in Sarastro’s presence, and the two young men are ordered to enter the temple for their trials."
    ],
    characters: [
      ["Tamino", "Tenor", "A prince who seeks to rescue Pamina."],
      ["Pamina", "Soprano", "The Queen of the Night’s daughter."],
      ["Papageno", "Baritone", "A bird-catcher who accompanies Tamino."],
      ["Queen of the Night", "Soprano", "Pamina’s mother."],
      ["Sarastro", "Bass", "The high priest who holds Pamina."],
      ["Monostatos", "Tenor", "An overseer in Sarastro’s household."]
    ]
  },
  source: "Act I only. German source: Emanuel Schikaneder (1791), Opera Guide, https://opera-guide.ch/en/operas/die%2Bzauberflote/libretto/de/ (retrieved 26 October 2026). All 19 source Auftritte and numbered musical sections 1–8 retained. German text keeps historical orthography. English is an offline machine-assisted first draft and HAS NOT been editorially reviewed; do not cite as a verified translation. Act II is not yet implemented."
};
