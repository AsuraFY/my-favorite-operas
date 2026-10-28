// La traviata: All three acts are available as Italian/English working drafts. Editorial review pending.
// The original Italian is public domain. English is independently AI-translated, pending editorial review.
import { getOpera } from './operas.js';
import { operaInformation } from './opera-information.js';
import { traviataActOneScenes } from './libretto-la-traviata-act-1.js?v=traviata-act1-20261028';
import { traviataActTwoScenes } from './libretto-la-traviata-act-2.js?v=traviata-all-acts-20261028';
import { traviataActThreeScenes } from './libretto-la-traviata-act-3.js?v=traviata-all-acts-20261028';
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
  acts: [{number: 1, originalHeading: 'ATTO PRIMO', scenes: traviataActOneScenes},
    {number: 2, originalHeading: 'ATTO SECONDO', scenes: traviataActTwoScenes},
    {number: 3, originalHeading: 'ATTO TERZO', scenes: traviataActThreeScenes}],
  synopsis: {eyebrow: 'Giuseppe Verdi · Opera in three acts · All three acts available · English translation unreviewed', paragraphs: info.synopsis, characters: info.characters},
  source: 'Italian: original public-domain libretto at https://opera-guide.ch/operas/la+traviata/libretto/it/ (all three acts). English: independently authored AI working translation, editorial review pending. Act II scene XIV was reconciled against public-domain libretto editions at Teatro Regio Parma and Wikisource because the retrieved Opera Guide HTML was truncated. Other source variants need proofing.'
};
