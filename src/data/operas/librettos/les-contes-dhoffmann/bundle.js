import {getOpera} from '../../catalog.js';
import {operaInformation} from '../../information.js';
import {hoffmannPrologueScenes} from './prologue.js?v=hoffmann-20261029';
import {hoffmannActOneScenes} from './act-1.js?v=hoffmann-20261029';
import {hoffmannActTwoScenes} from './act-2.js?v=hoffmann-20261029';
import {hoffmannActThreeScenes} from './act-3.js?v=hoffmann-20261029';
import {hoffmannEpilogueScenes} from './epilogue.js?v=hoffmann-20261029';
const info=operaInformation['les-contes-dhoffmann'];
export const lesContesDHoffmann={slug:'les-contes-dhoffmann',opera:getOpera('les-contes-dhoffmann'),composerShort:'J. OFFENBACH',mobileComposer:'Jacques Offenbach',originalLanguage:'Français',translationLanguage:'English',continuousAct:true,preserveLineBreaks:true,alignVerseLines:false,threeLineOutline:true,sourceTitlesOnly:true,sourceSceneOutline:true,sceneOriginalPrefix:'Scène',showReaderMusicalHeadings:false,stageDirectionSpeaker:'Stage direction',stageDirectionLabel:'Stage direction',acts:[{number:1,originalHeading:'PROLOGUE',scenes:hoffmannPrologueScenes},{number:2,originalHeading:'PREMIER ACTE — OLYMPIA',scenes:hoffmannActOneScenes},{number:3,originalHeading:'ACTE DEUXIÈME — ANTONIA',scenes:hoffmannActTwoScenes},{number:4,originalHeading:'ACTE TROISIÈME — GIULIETTA ET ÉPILOGUE',scenes:[...hoffmannActThreeScenes,...hoffmannEpilogueScenes]}],synopsis:{eyebrow:'Jacques Offenbach · Prologue, three acts and epilogue · Complete French-English working text; machine-assisted translation, editorial review pending',paragraphs:info.synopsis,characters:info.characters},source: "Original libretto and English translation provenance: docs/info/operas-origins.md"};
