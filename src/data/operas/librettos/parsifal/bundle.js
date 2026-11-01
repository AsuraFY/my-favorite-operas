// Bilingual reader draft: all passages translated, source and editorial review pending.
import { parsifalActOneScenes } from "./libretto-parsifal-act-1.js?v=cosi-classic-sections-20261027";
import { parsifalActTwoScenes } from "./libretto-parsifal-act-2.js?v=cosi-classic-sections-20261027";
import { parsifalActThreeScenes } from "./libretto-parsifal-act-3.js?v=cosi-classic-sections-20261027";
import { getOpera } from "./operas.js";
import { operaInformation } from "./opera-information.js";
const info = operaInformation["parsifal"];
export const parsifal = {
  slug: "parsifal", opera: getOpera("parsifal"),
  composerShort: "R. WAGNER", mobileComposer: "Richard Wagner",
  mobileArtworkUrl: "./public/images/parsifal-art.webp", mobileArtworkLabel: "Richard Wagner",
  originalLanguage: "Deutsch", translationLanguage: "English",
  continuousAct: true, preserveLineBreaks: true, alignVerseLines: false,
  showReaderMusicalHeadings: false,
  threeLineOutline: true, sourceTitlesOnly: true,
  sourceSceneOutline: true,
  stageDirectionSpeaker: "Stage direction", stageDirectionLabel: "Stage direction",
  acts: [{number: 1, originalHeading: "Aufzug I", scenes: parsifalActOneScenes},
    {number: 2, originalHeading: "Aufzug II", scenes: parsifalActTwoScenes},
    {number: 3, originalHeading: "Aufzug III", scenes: parsifalActThreeScenes}],
  synopsis: {eyebrow: "Richard Wagner · Complete bilingual working draft · Translation unreviewed", paragraphs: info.synopsis, characters: info.characters},
  source: "German transcription from DraCor TEI, pending line-by-line reconciliation against user's Opera Guide source. English machine-assisted draft, not editorially verified."
};
