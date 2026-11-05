// Aida: Act I available; All four acts transcribed and supplied with working English translations.
import { getOpera } from '../../catalog.js';
import { operaInformation } from '../../information.js';
import { aidaActOneScenes } from './act-1.js?v=aida-act1-20261028';
import { aidaActTwoScenes } from './act-2.js?v=aida-act2-20261028';
import { aidaActThreeScenes } from './act-3.js?v=aida-issue15-20261105';
import { aidaActFourScenes } from './act-4.js?v=aida-act4-20261028';
const info = operaInformation.aida;
export const aida = {
  slug: 'aida',
  opera: getOpera('aida'),
  composerShort: 'G. VERDI',
  mobileComposer: 'Giuseppe Verdi',
  originalLanguage: 'Italiano',
  translationLanguage: 'English',
  continuousAct: true,
  preserveLineBreaks: true,
  alignVerseLines: true,
  threeLineOutline: true,
  sourceTitlesOnly: true,
  sourceSceneOutline: true,
  sceneOriginalPrefix: 'Scena',
  showReaderMusicalHeadings: false,
  stageDirectionSpeaker: 'Stage direction',
  stageDirectionLabel: 'Stage direction',
  acts: [{number: 1, originalHeading: 'ATTO PRIMO', scenes: aidaActOneScenes}, {number: 2, originalHeading: 'ATTO SECONDO', scenes: aidaActTwoScenes}, {number: 3, originalHeading: 'ATTO TERZO', scenes: aidaActThreeScenes}, {number: 4, originalHeading: 'ATTO QUARTO', scenes: aidaActFourScenes}],
  synopsis: {
    eyebrow: 'Giuseppe Verdi · Opera in four acts · All four acts available · English translation unreviewed · English translation unreviewed',
    paragraphs: info.synopsis,
    characters: info.characters
  },
  source: "Original libretto and English translation provenance: docs/info/operas-origins.md"
};
