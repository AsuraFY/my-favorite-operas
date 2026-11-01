// Die Walküre: all three acts, original German and independent machine-generated English working translation.
import {getOpera} from './operas.js';
import {operaInformation} from './opera-information.js';
import {walkureActOneScenes} from './libretto-die-walkure-act-1.js?v=walkure-complete-20261029';
import {walkureActTwoScenes} from './libretto-die-walkure-act-2.js?v=walkure-complete-20261029';
import {walkureActThreeScenes} from './libretto-die-walkure-act-3.js?v=walkure-complete-20261029';
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
 source:'German: Richard Wagner, Die Walküre, public-domain libretto, https://opera-guide.ch/operas/die+walkure/libretto/de/ via Sottovoce Q324319. All 1,806 original source records, across 11 scenes, preserved with paired independently machine-generated English working translations (Google Translate, 29 October 2026). This is not a literary-reviewed or singable translation. Navigation passages are editorial incipit subdivisions rather than score-number headings; native-browser QA and source collation pending.'
};
