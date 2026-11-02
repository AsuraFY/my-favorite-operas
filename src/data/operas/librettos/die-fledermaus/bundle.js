// Complete German-English machine-assisted working draft; human editorial review pending.
import {getOpera} from '../../catalog.js';
import {operaInformation} from '../../information.js';
import {fledermausActOneScenes} from './act-1.js?v=fledermaus-20261029';
import {fledermausActTwoScenes} from './act-2.js?v=fledermaus-20261029';
import {fledermausActThreeScenes} from './act-3.js?v=fledermaus-20261029';
const info=operaInformation['die-fledermaus'];
export const dieFledermaus={
 slug:'die-fledermaus',opera:getOpera('die-fledermaus'),composerShort:'J. STRAUSS II',mobileComposer:'Johann Strauss II',
 originalLanguage:'Deutsch',translationLanguage:'English',continuousAct:true,preserveLineBreaks:true,alignVerseLines:false,
 threeLineOutline:true,sourceTitlesOnly:true,sourceSceneOutline:true,sceneOriginalPrefix:'Auftritt',showReaderMusicalHeadings:false,
 stageDirectionSpeaker:'Stage direction',stageDirectionLabel:'Stage direction',
 acts:[{number:1,originalHeading:'ERSTER AKT',scenes:fledermausActOneScenes},{number:2,originalHeading:'ZWEITER AKT',scenes:fledermausActTwoScenes},{number:3,originalHeading:'DRITTER AKT',scenes:fledermausActThreeScenes}],
 synopsis:{eyebrow:'Johann Strauss II · Three-act operetta · Complete German-English machine-assisted working text (editorial review pending)',paragraphs:info.synopsis,characters:info.characters},
 source: "Original libretto and English translation provenance: docs/info/operas-origins.md"
};
