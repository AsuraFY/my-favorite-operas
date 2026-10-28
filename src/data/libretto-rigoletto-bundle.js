// Original Italian: public-domain Piave libretto in Opera Guide (Act I).
// English: independent AI-generated working translation awaiting editorial review.
// Acts II and III are pending; no invented text or musical divisions are used.
import { getOpera } from './operas.js';
import { operaInformation } from './opera-information.js';
import { rigolettoActOneScenes } from './libretto-rigoletto-act-1.js?v=rigoletto-act1-20261028';
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
    { number: 3, originalHeading: 'ATTO TERZO', scenes: [] }
  ],
  synopsis: { eyebrow: 'Giuseppe Verdi · Opera in three acts · Act I available · Acts II–III pending · AI-generated English working translation awaiting editorial review', paragraphs: info.synopsis, characters: info.characters },
  source: 'Original Italian: https://opera-guide.ch/operas/rigoletto/libretto/it/ (Act I, two source scenes, Nos. 1–7). English: independent AI-generated working translation awaiting editorial review. Italian follows the supplied Opera Guide transcription, including apparent typographical variants; detailed line-by-line editorial verification remains pending.'
};
