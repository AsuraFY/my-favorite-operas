// This opera's metadata and act modules load only when its page is visited.
import { getOpera } from "./operas.js?v=tosca-act1-2";
import { turandotActOneScenes } from "./libretto-turandot-act-1.js?v=turandot-titles-1";
import { turandotActTwoScenes } from "./libretto-turandot-act-2.js?v=turandot-titles-1";
import { turandotActThreeScenes } from "./libretto-turandot-act-3.js?v=turandot-titles-1";

export const turandot = {
  alignVerseLines: true,
  translateSectionHeadings: false,
  slug: "turandot",
  threeLineOutline: true,
  sourceTitlesOnly: true,
  opera: getOpera("turandot"),
  composerShort: "G. PUCCINI",
  mobileComposer: "Giacomo Puccini",
  originalLanguage: "Italiano",
  translationLanguage: "English",
  preserveLineBreaks: true,
  continuousAct: true,
  sceneDivisions: false,
  stageDirectionSpeaker: "Stage direction",
  stageDirectionLabel: "",
  bracketStageDirections: true,
  translatedForms: { Introduzione: "Introduction", Coro: "Chorus", "Marcia funebre": "Funeral March", Scena: "Scene", Aria: "Aria", Arioso: "Arioso", Concertato: "Concerted Ensemble", Terzetto: "Trio", "Interludio, Scena e Inno": "Interlude, Scene and Hymn", Recitativo: "Recitative", "Scena e Aria": "Scene and Aria", "Scena degli Enigmi": "Riddle Scene", "Scena e Inno": "Scene and Hymn", "Introduzione e Romanza": "Introduction and Romance", "Transizione e Aria": "Transition and Aria", Duetto: "Duet", Finale: "Finale" },
  acts: [{ number: 1, originalHeading: "Atto I", scenes: turandotActOneScenes }, { number: 2, originalHeading: "Atto II", scenes: turandotActTwoScenes }, { number: 3, originalHeading: "Atto III", scenes: turandotActThreeScenes }],
  synopsis: {
    eyebrow: "Giacomo Puccini · Opera in three acts",
    paragraphs: [
      "In legendary Peking, Princess Turandot offers marriage to a prince who can answer three riddles; those who fail are executed. Calaf, the son of the exiled king Timur, sees her and resolves to attempt the trial, despite the pleas of his father and the devoted slave Liù.",
      "Calaf answers the riddles, then offers Turandot a challenge of his own: discover his name before dawn. Her search places Timur and Liù in danger. Liù’s sacrifice and Calaf’s love confront the princess with feelings she has long rejected."
    ],
    characters: [
      ["Turandot", "Soprano", "The princess who sets three riddles for her suitors."],
      ["Calaf", "Tenor", "Timur’s son, the unknown prince."],
      ["Liù", "Soprano", "A young slave devoted to Calaf and Timur."],
      ["Timur", "Bass", "A deposed Tartar king, Calaf’s father."],
      ["Ping", "Baritone", "The grand chancellor."],
      ["Pang", "Tenor", "The grand purveyor."],
      ["Pong", "Tenor", "The grand cook."],
      ["Altoum", "Tenor", "The emperor, Turandot’s father."],
      ["Il Mandarino", "Baritone", "The official who announces the law."],
      ["Il Principe di Persia", "Silent role with an offstage cry", "A defeated suitor condemned to death."]
    ]
  },
  characters: ["Turandot", "Calaf", "Liù", "Timur", "Ping", "Pang", "Pong", "Altoum", "Il Mandarino", "Il Principe di Persia"],
  source: "Giuseppe Adami and Renato Simoni, Turandot (1926), complete Italian libretto, Ricordi edition hosted by Teatro Regio Torino: https://www.teatroregio.torino.it/sites/default/files/uploads/inline-files/Turandot%20-%20Libretto.pdf. English: original line-by-line translation. Act III includes the ending completed by Franco Alfano in Arturo Toscanini’s version, printed in grey in the PDF because it was not performed in that production."
};

