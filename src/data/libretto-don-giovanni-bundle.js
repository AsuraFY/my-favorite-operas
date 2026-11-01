// Bilingual reader draft: all passages translated, source and editorial review pending.
import { donGiovanniActOneScenes } from "./libretto-don-giovanni-act-1.js?v=don-giovanni-classic-sections-20261027";
import { donGiovanniActTwoScenes } from "./libretto-don-giovanni-act-2.js?v=don-giovanni-classic-sections-20261027";
import { getOpera } from "./operas.js";
import { operaInformation } from "./opera-information.js";
const info = operaInformation["don-giovanni"];
export const donGiovanni = {
  slug: "don-giovanni", opera: getOpera("don-giovanni"),
  composerShort: "W. A. MOZART", mobileComposer: "Wolfgang Amadeus Mozart",
  mobileArtworkUrl: "./public/images/don-giovanni-art.webp", mobileArtworkLabel: "Wolfgang Amadeus Mozart",
  originalLanguage: "Italiano", translationLanguage: "English",
  continuousAct: true, preserveLineBreaks: true, alignVerseLines: false,
  threeLineOutline: true, sourceTitlesOnly: true, listeningOutlineOnly: true, showReaderMusicalHeadings: false,
  recordingVideoId: "DIvTXv65hyo",
  recordingCredit: "Orchestra Filarmonica Italiana · Alessandro Arigoni",
  sourceSceneOutline: true,
  stageDirectionSpeaker: "Stage direction", stageDirectionLabel: "Stage direction",
  acts: [{number: 1, originalHeading: "Atto I", prelude: {title:"Ouverture · Instrumental",translation:"Overture — no sung text",recordingSeconds:0,recordingTime:"00:00:00"}, scenes: donGiovanniActOneScenes},
    {number: 2, originalHeading: "Atto II", scenes: donGiovanniActTwoScenes}],
  synopsis: {eyebrow: "Wolfgang Amadeus Mozart · Complete bilingual working draft · Translation unreviewed", paragraphs: info.synopsis, characters: info.characters},
  source: "Italian transcription from DraCor TEI, not yet reconciled against user's Opera Guide source. Several text readings may be corrupt. English machine-assisted draft, not editorially verified. Arigoni recording chapters matched to libretto scene passages and critical score musical forms. Vienna supplement N. 21b from Mozarteum critical libretto (https://dme.mozarteum.at/libretti-edition/pdf/LV_512_518_0.pdf), with new English editorial draft."
};
