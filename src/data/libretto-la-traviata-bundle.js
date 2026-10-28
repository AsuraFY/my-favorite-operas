// La traviata: Act I is available as an Italian/English working draft; Acts II and III are pending.
// The original Italian is public domain. English is independently AI-translated, pending editorial review.
import { getOpera } from './operas.js';
import { operaInformation } from './opera-information.js';
import { traviataActOneScenes } from './libretto-la-traviata-act-1.js?v=traviata-act1-20261028';
const info = operaInformation['la-traviata'];
export const traviata = {
  slug: 'la-traviata',
  opera: getOpera('la-traviata'),
  composerShort: 'G. VERDI',
  mobileComposer: 'Giuseppe Verdi',
  originalLanguage: 'Italiano',
  translationLanguage: 'English',
  continuousAct: true,
  preserveLineBreaks: true,
  alignVerseLines: false,
  threeLineOutline: true,
  sourceTitlesOnly: true,
  sourceSceneOutline: true,
  sceneOriginalPrefix: 'Scena',
  showReaderMusicalHeadings: false,
  stageDirectionSpeaker: 'Stage direction',
  stageDirectionLabel: 'Stage direction',
  acts: [{number: 1, originalHeading: 'ATTO PRIMO', scenes: traviataActOneScenes}],
  synopsis: {eyebrow: 'Giuseppe Verdi · Opera in three acts · Act I available · English translation unreviewed', paragraphs: info.synopsis, characters: info.characters},
  source: 'Italian: https://opera-guide.ch/operas/la+traviata/libretto/it/ (Act I, original Italian). English: independent AI working translation, editorial review pending; Acts II and III not yet published.'
};
