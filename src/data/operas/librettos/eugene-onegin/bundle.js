import {getOpera} from '../../catalog.js';
import {operaInformation} from '../../information.js';
import {oneginAct1Scenes} from './act-1.js?v=onegin-independent-20261105';
import {oneginAct2Scenes} from './act-2.js?v=onegin-independent-20261105';
import {oneginAct3Scenes} from './act-3.js?v=onegin-independent-20261105';
const info=operaInformation['eugene-onegin'];
export const eugeneOnegin={slug:'eugene-onegin',opera:getOpera('eugene-onegin'),composerShort:'P. TCHAIKOVSKY',mobileComposer:'Pyotr Ilyich Tchaikovsky',originalLanguage:'Русский (not supplied)',translationLanguage:'English',continuousAct:true,preserveLineBreaks:true,alignVerseLines:false,threeLineOutline:true,sourceTitlesOnly:true,sourceSceneOutline:true,sceneOriginalPrefix:'Scene',showReaderMusicalHeadings:false,stageDirectionSpeaker:'Stage direction',stageDirectionLabel:'Stage direction',acts:[{number:1,originalHeading:'ACT I',scenes:oneginAct1Scenes},{number:2,originalHeading:'ACT II',scenes:oneginAct2Scenes},{number:3,originalHeading:'ACT III',scenes:oneginAct3Scenes}],synopsis:{eyebrow:'Independent English reading translation from historical Russian libretto · Russian passages intentionally omitted; no bilingual alignment asserted',paragraphs:info.synopsis,characters:info.characters},source: "Original libretto and English translation provenance: docs/info/operas-origins.md"};
