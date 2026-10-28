// Il trovatore: four-part opera, Acts I–III currently transcribed and translated.
// Italian from Opera Guide user-supplied MHT; English independently AI-generated working
// translation awaiting editorial review. Act IV remains pending, never implied complete.
import { getOpera } from './operas.js';
import { operaInformation } from './opera-information.js';
import { trovatoreActOneScenes } from './libretto-il-trovatore-act-1.js?v=trovatore-act1-20261028';
import { trovatoreActTwoScenes } from './libretto-il-trovatore-act-2.js?v=trovatore-act2-20261028';
import { trovatoreActThreeScenes } from './libretto-il-trovatore-act-3.js?v=trovatore-act3-20261028';
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
    { number: 2, originalHeading: 'PARTE SECONDA - La Gitana', scenes: trovatoreActTwoScenes },
    { number: 3, originalHeading: 'PARTE TERZA - Il figlio della Zingara', scenes: trovatoreActThreeScenes },
    { number: 4, originalHeading: 'PARTE QUARTA - Il supplizio', scenes: [] }
  ],
  synopsis: {
    eyebrow: 'Giuseppe Verdi · Opera in four parts · Parts I–III available · Part IV pending · English AI-generated working translation awaiting editorial review',
    paragraphs: info.synopsis,
    characters: info.characters
  },
  source: 'Original Italian: https://opera-guide.ch/operas/il+trovatore/libretto/it/ (user-supplied saved Italian libretto). English: independent AI-generated working translation awaiting editorial review. Parts I and II each include all five source scenes; editorial and musical verification remain pending.'
};
