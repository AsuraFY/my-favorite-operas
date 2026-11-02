import {getOpera} from '../../catalog.js';
import {operaInformation} from '../../information.js';
import {gotterdammerungPrologueScenes} from './prologue.js?v=gotterdammerung-20261029';
import {gotterdammerungAct1Scenes} from './act-1.js?v=gotterdammerung-20261029';
import {gotterdammerungAct2Scenes} from './act-2.js?v=gotterdammerung-20261029';
import {gotterdammerungAct3Scenes} from './act-3.js?v=gotterdammerung-20261029';
const info=operaInformation['gotterdammerung'];
export const gotterdammerung={slug:'gotterdammerung',opera:getOpera('gotterdammerung'),composerShort:'R. WAGNER',mobileComposer:'Richard Wagner',originalLanguage:'Deutsch',translationLanguage:'English',continuousAct:true,preserveLineBreaks:true,alignVerseLines:false,threeLineOutline:true,sourceTitlesOnly:true,sourceSceneOutline:true,sceneOriginalPrefix:'Szene',showReaderMusicalHeadings:false,stageDirectionSpeaker:'Stage direction',stageDirectionLabel:'Stage direction',acts:[{number:1,originalHeading:'VORSPIEL UND ERSTER AUFZUG',scenes:[...gotterdammerungPrologueScenes,...gotterdammerungAct1Scenes]},{number:2,originalHeading:'ZWEITER AUFZUG',scenes:gotterdammerungAct2Scenes},{number:3,originalHeading:'DRITTER AUFZUG',scenes:gotterdammerungAct3Scenes}],synopsis:{eyebrow:'Richard Wagner · Ring Cycle finale · Prologue and three acts · Complete German-English working text; machine-assisted translation, editorial review pending',paragraphs:info?.synopsis||[],characters:info?.characters||[]},source: "Original libretto and English translation provenance: docs/info/operas-origins.md"};
