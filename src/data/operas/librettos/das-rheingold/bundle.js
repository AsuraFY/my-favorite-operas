// Das Rheingold — complete German-English working text, one act with four continuous scenes.
// Original public-domain German by Richard Wagner; English machine-assisted translation pending editorial review.
import { getOpera } from '../../catalog.js';
import { operaInformation } from '../../information.js';
import { rheingoldScenes } from './act-1.js?v=rheingold-four-scenes-20261029';
const info=operaInformation['das-rheingold'];
export const dasRheingold={
 slug:'das-rheingold',opera:getOpera('das-rheingold'),composerShort:'R. WAGNER',mobileComposer:'Richard Wagner',
 originalLanguage:'Deutsch',translationLanguage:'English',continuousAct:true,preserveLineBreaks:true,alignVerseLines:false,
 threeLineOutline:true,sourceTitlesOnly:true,sourceSceneOutline:true,sceneOriginalPrefix:'Szene',showReaderMusicalHeadings:false,
 stageDirectionSpeaker:'Stage direction',stageDirectionLabel:'Stage direction',
 acts:[{number:1,originalHeading:'VORSPIEL — DAS RHEINGOLD',scenes:rheingoldScenes}],
 synopsis:{eyebrow:'Richard Wagner · Ring Cycle prologue · One act in four scenes · Complete German-English working text; machine-assisted, editorial review pending',paragraphs:info.synopsis,characters:info.characters},
 source: "Original libretto and English translation provenance: docs/info/operas-origins.md"
};
