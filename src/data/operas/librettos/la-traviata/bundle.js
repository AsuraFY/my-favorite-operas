// La traviata: All three acts are available as Italian/English working drafts. Editorial review pending.
// The original Italian is public domain. English is independently AI-translated, pending editorial review.
import { getOpera } from '../../catalog.js';
import { operaInformation } from '../../information.js';
import { traviataActOneScenes } from './act-1.js?v=traviata-verse-fidelity-20261107';
import { traviataActTwoScenes } from './act-2.js?v=traviata-verse-fidelity-20261107';
import { traviataActThreeScenes } from './act-3.js?v=traviata-verse-fidelity-20261107';
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
  source: "Original libretto and English translation provenance: docs/info/operas-origins.md"
};
