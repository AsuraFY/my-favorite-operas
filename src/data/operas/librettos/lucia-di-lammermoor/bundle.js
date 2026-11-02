// Lucia di Lammermoor — bilingual libretto in three acts.
import { getOpera } from '../../catalog.js';
import { operaInformation } from '../../information.js';
import { luciaActOneScenes } from './act-1.js?v=lucia-act1-20261029';
import { luciaActTwoScenes } from './act-2.js?v=lucia-act2-20261029';
import { luciaActThreeScenes } from './act-3.js?v=lucia-act3-20261029';
const info = operaInformation['lucia-di-lammermoor'];
export const luciaDiLammermoor = {
 slug:'lucia-di-lammermoor', opera:getOpera('lucia-di-lammermoor'),
 composerShort:'G. DONIZETTI', mobileComposer:'Gaetano Donizetti',
 originalLanguage:'Italiano', translationLanguage:'English',
 continuousAct:true,preserveLineBreaks:true,alignVerseLines:false,
 threeLineOutline:true,sourceTitlesOnly:true,sourceSceneOutline:true,
 sceneOriginalPrefix:'Scena',showReaderMusicalHeadings:false,
 stageDirectionSpeaker:'Stage direction',stageDirectionLabel:'Stage direction',
 acts:[
  { number:1, originalHeading:'PARTE PRIMA — LA PARTENZA', scenes:luciaActOneScenes },
  { number:2, originalHeading:'PARTE SECONDA — IL CONTRATTO NUZIALE, I', scenes:luciaActTwoScenes },
  { number:3, originalHeading:'PARTE SECONDA — IL CONTRATTO NUZIALE, II', scenes:luciaActThreeScenes }
 ],
 synopsis:{
  eyebrow:'Gaetano Donizetti · Dramatic opera in three acts (original: two parts) · All acts available as AI working translations · Editorial review pending',
  paragraphs:info.synopsis, characters:info.characters
 },
 source: "Original libretto and English translation provenance: docs/info/operas-origins.md"
};
