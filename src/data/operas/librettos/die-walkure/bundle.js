// Die Walküre: all three acts, original German and independent machine-generated English working translation.
import {getOpera} from '../../catalog.js';
import {operaInformation} from '../../information.js';
import {walkureActOneScenes} from './act-1.js?v=walkure-complete-20261029';
import {walkureActTwoScenes} from './act-2.js?v=walkure-complete-20261029';
import {walkureActThreeScenes} from './act-3.js?v=walkure-complete-20261029';
const info=operaInformation['die-walkure'];
export const dieWalkure={
 slug:'die-walkure',opera:getOpera('die-walkure'),
 composerShort:'R. WAGNER',mobileComposer:'Richard Wagner',
 originalLanguage:'Deutsch',translationLanguage:'English',
 continuousAct:true,preserveLineBreaks:true,alignVerseLines:false,
 threeLineOutline:true,sourceTitlesOnly:true,sourceSceneOutline:true,
 sceneOriginalPrefix:'Szene',showReaderMusicalHeadings:false,
 stageDirectionSpeaker:'Stage direction',stageDirectionLabel:'Stage direction',
 acts:[
  {number:1,originalHeading:'ERSTER AUFZUG',scenes:walkureActOneScenes},
  {number:2,originalHeading:'ZWEITER AUFZUG',scenes:walkureActTwoScenes},
  {number:3,originalHeading:'DRITTER AUFZUG',scenes:walkureActThreeScenes}
 ],
 synopsis:{eyebrow:'Richard Wagner · Ring Cycle · Three acts · German–English working reading edition; translation awaiting editorial review',paragraphs:info.synopsis,characters:info.characters},
 source: "Original libretto and English translation provenance: docs/info/operas-origins.md"
};
