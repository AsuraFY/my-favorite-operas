// Pagliacci — Prologue and two acts, complete bilingual working translation.
// Prologue is presented at the beginning of the Act I reading page, without inventing a third act.
import {getOpera} from '../../catalog.js';
import {operaInformation} from '../../information.js';
import {pagliacciPrologueScenes, pagliacciActOneScenes} from './act-1.js?v=pagliacci-prologue-act1-20261029';
import {pagliacciActTwoScenes} from './act-2.js?v=pagliacci-act2-20261029';
const info=operaInformation['pagliacci'];
const prologue=pagliacciPrologueScenes.map(scene=>({...scene,number:1,originalHeading:'PROLOGO',translatedHeading:'Prologue'}));
const actOne=pagliacciActOneScenes.map((scene,index)=>({...scene,number:index+2}));
export const pagliacci={
 slug:'pagliacci',opera:getOpera('pagliacci'),
 composerShort:'R. LEONCAVALLO',mobileComposer:'Ruggero Leoncavallo',
 originalLanguage:'Italiano',translationLanguage:'English',
 continuousAct:true,preserveLineBreaks:true,alignVerseLines:false,
 threeLineOutline:true,sourceTitlesOnly:true,sourceSceneOutline:true,
 sceneOriginalPrefix:'Scena',showReaderMusicalHeadings:false,
 stageDirectionSpeaker:'Stage direction',stageDirectionLabel:'Stage direction',
 acts:[
  {number:1,originalHeading:'PROLOGO E ATTO PRIMO',scenes:[...prologue,...actOne]},
  {number:2,originalHeading:'ATTO SECONDO',scenes:pagliacciActTwoScenes}
 ],
 synopsis:{
  eyebrow:'Ruggero Leoncavallo · Prologue and opera in two acts · AI-generated English working translation awaiting editorial review',
  paragraphs:info.synopsis,characters:info.characters
 },
 source: "Original libretto and English translation provenance: docs/info/operas-origins.md"
};
