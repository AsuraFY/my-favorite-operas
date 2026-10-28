// Aida: Act I available; Acts III-IV are not yet transcribed or translated.
// Original Italian: public-domain Antonio Ghislanzoni libretto, as transcribed by Opera Guide.
// English: independent assistant-produced first translation, pending editorial review.
import { getOpera } from './operas.js';
import { operaInformation } from './opera-information.js';
import { aidaActOneScenes } from './libretto-aida-act-1.js?v=aida-act1-20261028';
import { aidaActTwoScenes } from './libretto-aida-act-2.js?v=aida-act2-20261028';
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
  acts: [{number: 1, originalHeading: 'ATTO PRIMO', scenes: aidaActOneScenes}, {number: 2, originalHeading: 'ATTO SECONDO', scenes: aidaActTwoScenes}],
  synopsis: {
    eyebrow: 'Giuseppe Verdi · Opera in four acts · Acts I-II available; Acts III-IV pending · English translation unreviewed',
    paragraphs: info.synopsis,
    characters: info.characters
  },
  source: 'Original Italian: https://opera-guide.ch/operas/aida/libretto/it/ (Act I, Scena I-II). Source transcription contains some apparent spelling/typographic anomalies; these remain subject to source review. English: new working translation; editorial verification pending. Acts III-IV are not yet available.'
};
