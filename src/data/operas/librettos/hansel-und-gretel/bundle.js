// Hänsel und Gretel — the original German text with its public-domain 1905 English performing adaptation.
import {getOpera} from '../../catalog.js';
import {operaInformation} from '../../information.js';
import {hanselActOneScenes} from './act-1.js?v=hansel-1905-20261029';
import {hanselActTwoScenes} from './act-2.js?v=hansel-1905-20261029';
import {hanselActThreeScenes} from './act-3.js?v=hansel-1905-20261029';
const info=operaInformation['hansel-und-gretel'];
export const hanselUndGretel={
 slug:'hansel-und-gretel',opera:getOpera('hansel-und-gretel'),
 composerShort:'E. HUMPERDINCK',mobileComposer:'Engelbert Humperdinck',
 originalLanguage:'Deutsch',translationLanguage:'English',
 continuousAct:true,preserveLineBreaks:true,alignVerseLines:false,
 threeLineOutline:true,sourceTitlesOnly:true,sourceSceneOutline:true,
 sceneOriginalPrefix:'Szene',showReaderMusicalHeadings:false,
 stageDirectionSpeaker:'Stage direction',stageDirectionLabel:'Stage direction',
 acts:[
 {number:1,originalHeading:'ERSTES BILD — DAHEIM',scenes:hanselActOneScenes},
 {number:2,originalHeading:'ZWEITES BILD — IM WALDE',scenes:hanselActTwoScenes},
 {number:3,originalHeading:'DRITTES BILD — DAS KNUSPERHÄUSCHEN',scenes:hanselActThreeScenes}],
 synopsis:{eyebrow:'Engelbert Humperdinck · Three-picture fairy-tale opera · Public-domain 1905 English singing adaptation; lineation and speaker grouping awaiting editorial review',paragraphs:info.synopsis,characters:info.characters},
 source: "Original libretto and English translation provenance: docs/info/operas-origins.md"
};
