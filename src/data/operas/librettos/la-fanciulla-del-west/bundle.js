// La fanciulla del West: complete three acts from the supplied PDF; English drafts await editorial review.
import { getOpera } from "./operas.js";
import { operaInformation } from "./opera-information.js";
import { fanciullaActOneScenes } from "./libretto-la-fanciulla-del-west-act-1.js?v=fanciulla-act1-complete-20261026";
import { fanciullaActTwoScenes } from "./libretto-la-fanciulla-del-west-act-2.js?v=fanciulla-acts23-20261026";
import { fanciullaActThreeScenes } from "./libretto-la-fanciulla-del-west-act-3.js?v=fanciulla-acts23-20261026";
const info = operaInformation["la-fanciulla-del-west"];
export const laFanciullaDelWest = {
  slug: "la-fanciulla-del-west",
  opera: getOpera("la-fanciulla-del-west"),
  composerShort: "G. PUCCINI",
  mobileComposer: "Giacomo Puccini",
  mobileArtworkUrl: "./public/images/la-fanciulla-del-west-art.webp",
  mobileArtworkLabel: "La fanciulla del West",
  originalLanguage: "Italiano", translationLanguage: "English",
  continuousAct: true, sceneDivisions: false, preserveLineBreaks: true, alignVerseLines: true,
  threeLineOutline: true, sourceTitlesOnly: true, translateSectionHeadings: true,
  originalSpeakerNames: {}, stageDirectionSpeaker: "Stage direction",
  stageDirectionLabel: "Stage direction",
  acts: [{number: 1, originalHeading: "Atto primo", scenes: fanciullaActOneScenes},
    {number: 2, originalHeading: "Atto secondo", scenes: fanciullaActTwoScenes},
    {number: 3, originalHeading: "Atto terzo", scenes: fanciullaActThreeScenes}],
  synopsis: {eyebrow:"G. Puccini · Opera in three acts · All three acts available", paragraphs:info.synopsis, characters:info.characters},
  source: "Italian: Guelfo Civinini and Carlo Zangarini, La fanciulla del West, supplied PDF (Act I, PDF pp. 3–23), checked against key passages of Flaminio Online. Complete Act I from opening setting through Minnie's final Ah!. English: assistant-produced complete first draft, not editorially reviewed. Navigation: 22 nonofficial recording listening landmarks. Acts II and III from PDF pp. 24–41 and 42–53 respectively, translated as unreviewed drafts."
};
