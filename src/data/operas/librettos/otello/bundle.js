// Italian source text is preserved; English is an unreviewed first draft.
import { getOpera } from "../../catalog.js";
import { operaInformation } from "../../information.js";
import { otelloActOneScenes } from "./act-1.js?v=cosi-classic-sections-20261027";
import { otelloActTwoScenes } from "./act-2.js?v=cosi-classic-sections-20261027";
import { otelloActThreeScenes } from "./act-3.js?v=cosi-classic-sections-20261027";
import { otelloActFourScenes } from "./act-4.js?v=cosi-classic-sections-20261027";
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
  source: "Original libretto and English translation provenance: docs/info/operas-origins.md"
};