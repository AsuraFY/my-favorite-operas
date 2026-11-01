// Das Rheingold — complete German-English working text, one act with four continuous scenes.
// Original public-domain German by Richard Wagner; English machine-assisted translation pending editorial review.
import { getOpera } from './operas.js';
import { operaInformation } from './opera-information.js';
import { rheingoldScenes } from './libretto-das-rheingold-scenes.js?v=rheingold-four-scenes-20261029';
const info=operaInformation['das-rheingold'];
export const dasRheingold={
 slug:'das-rheingold',opera:getOpera('das-rheingold'),composerShort:'R. WAGNER',mobileComposer:'Richard Wagner',
 originalLanguage:'Deutsch',translationLanguage:'English',continuousAct:true,preserveLineBreaks:true,alignVerseLines:false,
 threeLineOutline:true,sourceTitlesOnly:true,sourceSceneOutline:true,sceneOriginalPrefix:'Szene',showReaderMusicalHeadings:false,
 stageDirectionSpeaker:'Stage direction',stageDirectionLabel:'Stage direction',
 acts:[{number:1,originalHeading:'VORSPIEL — DAS RHEINGOLD',scenes:rheingoldScenes}],
 synopsis:{eyebrow:'Richard Wagner · Ring Cycle prologue · One act in four scenes · Complete German-English working text; machine-assisted, editorial review pending',paragraphs:info.synopsis,characters:info.characters},
 source:'German: Richard Wagner, Das Rheingold, public-domain libretto; https://opera-guide.ch/operas/das+rheingold/libretto/de/ via Sottovoce Q327717. One continuous act in four original scenes. Source contains 1,581 records including 1,312 sung lines and 269 stage directions; source counts per scene are 286, 489, 322, 484. All 1,581 source records are retained and paired with independent machine-assisted English working translations. These are for reading, not a fully reviewed literary or singable performance edition. Original scenic divisions and source incipit headings are retained; navigation passage breaks are editorial reading subdivisions, not score numbers.'
};
