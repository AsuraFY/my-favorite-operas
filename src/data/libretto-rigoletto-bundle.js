// Original Italian: public-domain Piave libretto in Opera Guide (Act I).
// English: independent AI-generated working translation awaiting editorial review.
// Act II pending; Act III has a bilingual AI working draft, editorial verification pending.
import { getOpera } from './operas.js';
import { operaInformation } from './opera-information.js';
import { rigolettoActOneScenes } from './libretto-rigoletto-act-1.js?v=rigoletto-act1-20261028';
import { rigolettoActThreeScenes } from './libretto-rigoletto-act-3.js?v=rigoletto-act3-20261028';
const info = operaInformation.rigoletto;
export const rigoletto = {
  slug: 'rigoletto', opera: getOpera('rigoletto'),
  composerShort: 'G. VERDI', mobileComposer: 'Giuseppe Verdi',
  originalLanguage: 'Italiano', translationLanguage: 'English',
  continuousAct: true, preserveLineBreaks: true, alignVerseLines: false,
  threeLineOutline: true, sourceTitlesOnly: true, sourceSceneOutline: true,
  sceneOriginalPrefix: 'Scena', showReaderMusicalHeadings: false,
  stageDirectionSpeaker: 'Stage direction', stageDirectionLabel: 'Stage direction',
  acts: [
    { number: 1, originalHeading: 'ATTO PRIMO', scenes: rigolettoActOneScenes },
    { number: 2, originalHeading: 'ATTO SECONDO', scenes: [] },
    { number: 3, originalHeading: 'ATTO TERZO', scenes: rigolettoActThreeScenes }
  ],
  synopsis: { eyebrow: 'Giuseppe Verdi · Opera in three acts · Acts I and III working drafts available · Act II pending · AI-generated English working translation awaiting editorial review', paragraphs: info.synopsis, characters: info.characters },
  source: 'Original Italian: https://opera-guide.ch/operas/rigoletto/libretto/it/ (Acts I and III). English: independent AI-generated working translation awaiting editorial review. Italian follows the supplied Opera Guide transcription, including apparent typographical variants; detailed line-by-line editorial verification remains pending.'
};
