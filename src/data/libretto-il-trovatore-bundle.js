// Il trovatore: four-part opera, All four acts transcribed and translated.
// Italian from Opera Guide user-supplied MHT; English independently AI-generated working
// translation awaiting editorial review. All four acts supplied as AI working translations, pending editorial review.
import { getOpera } from './operas.js';
import { operaInformation } from './opera-information.js';
import { trovatoreActOneScenes } from './libretto-il-trovatore-act-1.js?v=trovatore-act1-20261028';
import { trovatoreActTwoScenes } from './libretto-il-trovatore-act-2.js?v=trovatore-act2-20261028';
import { trovatoreActThreeScenes } from './libretto-il-trovatore-act-3.js?v=trovatore-act3-20261028';
import { trovatoreActFourScenes } from './libretto-il-trovatore-act-4.js?v=trovatore-act4-20261028';
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
    { number: 4, originalHeading: 'PARTE QUARTA - Il supplizio', scenes: trovatoreActFourScenes }
  ],
  synopsis: {
    eyebrow: 'Giuseppe Verdi · Opera in four parts · All four parts available · English AI working translations awaiting editorial review · English AI-generated working translation awaiting editorial review',
    paragraphs: info.synopsis,
    characters: info.characters
  },
  source: 'Original Italian: https://opera-guide.ch/operas/il+trovatore/libretto/it/ (user-supplied saved Italian libretto). English: independent AI-generated working translation awaiting editorial review. All four parts include the verified 5 / 5 / 6 / 4 source-scene structure; editorial and musical verification remain pending.'
};
