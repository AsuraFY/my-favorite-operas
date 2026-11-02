// L'elisir d'amore — Both acts available as Italian/English AI working translations; editorial review pending.
import { getOpera } from '../../catalog.js';
import { operaInformation } from '../../information.js';
import { elisirActOneScenes } from './act-1.js?v=elisir-act1-20261029';
import { elisirActTwoScenes } from './act-2.js?v=elisir-act2-20261029';
const info = operaInformation['lelisir-damore'];
export const elisir = {
  slug: 'lelisir-damore', opera: getOpera('lelisir-damore'),
  composerShort: 'G. DONIZETTI', mobileComposer: 'Gaetano Donizetti',
  originalLanguage: 'Italiano', translationLanguage: 'English',
  continuousAct: true, preserveLineBreaks: true, alignVerseLines: false,
  threeLineOutline: true, sourceTitlesOnly: true, sourceSceneOutline: true,
  sceneOriginalPrefix: 'Scena', showReaderMusicalHeadings: false,
  stageDirectionSpeaker: 'Stage direction', stageDirectionLabel: 'Stage direction',
  acts: [
    { number: 1, originalHeading: 'ATTO PRIMO', scenes: elisirActOneScenes },
    { number: 2, originalHeading: 'ATTO SECONDO', scenes: elisirActTwoScenes }
  ],
  synopsis: { eyebrow: 'Gaetano Donizetti · Opera in two acts · Both acts available as working translations · AI translation awaiting editorial review',
    paragraphs: info.synopsis, characters: info.characters },
  source: "Original libretto and English translation provenance: docs/info/operas-origins.md"
};
