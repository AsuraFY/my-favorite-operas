// Il trovatore: four-part opera, only Act I currently transcribed and translated.
// Italian from Opera Guide user-supplied MHT; English independently AI-generated working
// translation awaiting editorial review. Acts II–IV remain pending, never implied complete.
import { getOpera } from './operas.js';
import { operaInformation } from './opera-information.js';
import { trovatoreActOneScenes } from './libretto-il-trovatore-act-1.js?v=trovatore-act1-20261028';
const info = operaInformation['il-trovatore'];
export const trovatore = {
  slug: 'il-trovatore',
  opera: getOpera('il-trovatore'),
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
  acts: [
    { number: 1, originalHeading: 'PARTE PRIMA - Il Duello', scenes: trovatoreActOneScenes },
    { number: 2, originalHeading: 'PARTE SECONDA - La Gitana', scenes: [] },
    { number: 3, originalHeading: 'PARTE TERZA - Il figlio della Zingara', scenes: [] },
    { number: 4, originalHeading: 'PARTE QUARTA - Il supplizio', scenes: [] }
  ],
  synopsis: {
    eyebrow: 'Giuseppe Verdi · Opera in four parts · Part I available · Parts II–IV pending · English AI-generated working translation awaiting editorial review',
    paragraphs: info.synopsis,
    characters: info.characters
  },
  source: 'Original Italian: https://opera-guide.ch/operas/il+trovatore/libretto/it/ (user-supplied saved Italian libretto). English: independent AI-generated working translation awaiting editorial review. Part I includes all five source scenes; editorial and musical verification remain pending.'
};
