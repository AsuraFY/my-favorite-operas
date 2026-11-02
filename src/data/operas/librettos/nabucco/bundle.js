// Nabucco — all four dramatic parts in bilingual Italian-English working text.
import { getOpera } from '../../catalog.js';
import { operaInformation } from '../../information.js';
import { nabuccoActOneScenes } from './act-1.js?v=nabucco-act1-20261029';
import { nabuccoActTwoScenes } from './act-2.js?v=nabucco-act2-20261029';
import { nabuccoActThreeScenes } from './act-3.js?v=nabucco-act3-20261029';
import { nabuccoActFourScenes } from './act-4.js?v=nabucco-act4-20261029';
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
 source: "Original libretto and English translation provenance: docs/info/operas-origins.md"
};
