// Otello (Verdi / Boito): all four acts from the user-provided Opera Guide Italian HTML.
// Italian source text is preserved; English is an unreviewed first draft.
import { getOpera } from "./operas.js";
import { operaInformation } from "./opera-information.js";
import { otelloActOneScenes } from "./libretto-otello-act-1.js?v=cosi-classic-sections-20261027";
import { otelloActTwoScenes } from "./libretto-otello-act-2.js?v=cosi-classic-sections-20261027";
import { otelloActThreeScenes } from "./libretto-otello-act-3.js?v=cosi-classic-sections-20261027";
import { otelloActFourScenes } from "./libretto-otello-act-4.js?v=cosi-classic-sections-20261027";
const info = operaInformation["otello"];
export const otello = {
  slug: "otello",
  opera: getOpera("otello"),
  composerShort: "G. VERDI",
  mobileComposer: "Giuseppe Verdi",
  originalLanguage: "Italiano",
  translationLanguage: "English",
  continuousAct: true,
  preserveLineBreaks: true,
  alignVerseLines: true,
  showReaderMusicalHeadings: false,
  threeLineOutline: true,
  sourceTitlesOnly: true,
  sourceSceneOutline: true,
  sceneOriginalPrefix: "Scena",
  stageDirectionSpeaker: "Stage direction",
  stageDirectionLabel: "Stage direction",
  acts: [
    {number: 1, originalHeading: "Atto primo", scenes: otelloActOneScenes},
    {number: 2, originalHeading: "Atto secondo", scenes: otelloActTwoScenes},
    {number: 3, originalHeading: "Atto terzo", scenes: otelloActThreeScenes},
    {number: 4, originalHeading: "Atto quarto", scenes: otelloActFourScenes}
  ],
  synopsis: {eyebrow:"G. Verdi · Opera in four acts · All four acts available", paragraphs:info.synopsis, characters:info.characters},
  source: "Original Italian: Opera Guide, https://opera-guide.ch/en/operas/otello/libretto/it/ (user-supplied saved MHTML on 26 October 2026), with the four source acts and 21 source scenes retained. English: assistant-generated unreviewed draft; do not cite it as a verified translation. Outline landmarks are editorial incipits from the original text, not official numbered pieces."
};