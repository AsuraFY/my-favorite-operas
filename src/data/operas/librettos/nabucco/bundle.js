// Nabucco — all four dramatic parts in bilingual Italian-English working text.
// Italian public-domain libretto by Temistocle Solera: https://www.librettidopera.it/nabucco/nabucco.html
// Structured transcription Sottovoce Q202230. Reference https://opera-guide.ch/operas/nabucco/libretto/it/
// English: independently written AI-generated working translation awaiting editorial review.
import { getOpera } from './operas.js';
import { operaInformation } from './opera-information.js';
import { nabuccoActOneScenes } from './libretto-nabucco-act-1.js?v=nabucco-act1-20261029';
import { nabuccoActTwoScenes } from './libretto-nabucco-act-2.js?v=nabucco-act2-20261029';
import { nabuccoActThreeScenes } from './libretto-nabucco-act-3.js?v=nabucco-act3-20261029';
import { nabuccoActFourScenes } from './libretto-nabucco-act-4.js?v=nabucco-act4-20261029';
const info = operaInformation.nabucco;
export const nabucco = {
 slug:'nabucco', opera:getOpera('nabucco'),
 composerShort:'G. VERDI', mobileComposer:'Giuseppe Verdi',
 originalLanguage:'Italiano', translationLanguage:'English',
 continuousAct:true, preserveLineBreaks:true, alignVerseLines:false,
 threeLineOutline:true, sourceTitlesOnly:true, sourceSceneOutline:true,
 sceneOriginalPrefix:'Scena', showReaderMusicalHeadings:false,
 stageDirectionSpeaker:'Stage direction', stageDirectionLabel:'Stage direction',
 acts:[
   {number:1, originalHeading:'PARTE PRIMA — GERUSALEMME', scenes:nabuccoActOneScenes},
   {number:2, originalHeading:"PARTE SECONDA — L'EMPIO", scenes:nabuccoActTwoScenes},
   {number:3, originalHeading:'PARTE TERZA — LA PROFEZIA', scenes:nabuccoActThreeScenes},
   {number:4, originalHeading:"PARTE QUARTA — L'IDOLO INFRANTO", scenes:nabuccoActFourScenes}
 ],
 synopsis:{
  eyebrow:'Giuseppe Verdi · Four-part opera · All parts available as AI-generated English working translations awaiting editorial review',
  paragraphs:info.synopsis,characters:info.characters
 },
 source:'Italian: Temistocle Solera, Nabucco (public domain), https://www.librettidopera.it/nabucco/nabucco.html, structured from Sottovoce Q202230. 7 real scenes in Part I (230 source line records including a stage heading), 8 in Part II (186 records), 5 in Part III (170 records), 5 in Part IV (141 records), total 727 original source line records. English: independently written AI-generated working translations for all source line records including stage directions. Editorial review, exact Opera Guide collation, speaker/wording audit, and independent browser verification pending. The four source parts are mapped to the reader\'s four act tabs.'
};
