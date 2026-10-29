// L'elisir d'amore — Both acts available as Italian/English AI working translations; editorial review pending.
// Italian: public-domain Giovanni Romani libretto, librettidopera.it transcription.
// English is independently generated and awaiting full editorial/source review.
import { getOpera } from './operas.js';
import { operaInformation } from './opera-information.js';
import { elisirActOneScenes } from './libretto-lelisir-damore-act-1.js?v=elisir-act1-20261029';
import { elisirActTwoScenes } from './libretto-lelisir-damore-act-2.js?v=elisir-act2-20261029';
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
  source: 'Italian: Giovanni Romani, L’elisir d’amore (public domain), line-based transcription at https://www.librettidopera.it/eldam/eldam.html reproduced in https://github.com/martin-he543/sottovoce/blob/ff573f9e35a565bdb6afed35c83f091e69f5a40b/public/libretti/texts/Q332536.json. User’s Opera Guide preference: https://opera-guide.ch/operas/lelisir+damore/libretto/it/; direct source collation pending. English: independent AI-generated working translation, not a copied published translation, editorial review pending.'
};
