// Manon, Jules Massenet — five-act bilingual working reading edition.
import {getOpera} from '../../catalog.js';
import {operaInformation} from '../../information.js';
import {manonActOneScenes} from './act-1.js?v=manon-complete-20261029';
import {manonActTwoScenes} from './act-2.js?v=manon-complete-20261029';
import {manonActThreeScenes} from './act-3.js?v=manon-complete-20261029';
import {manonActFourScenes} from './act-4.js?v=manon-complete-20261029';
import {manonActFiveScenes} from './act-5.js?v=manon-complete-20261029';
const info=operaInformation['manon'];
export const manon={
 slug:'manon',opera:getOpera('manon'),
 composerShort:'J. MASSENET',mobileComposer:'Jules Massenet',
 originalLanguage:'Français',translationLanguage:'English',
 continuousAct:true,preserveLineBreaks:true,alignVerseLines:false,
 threeLineOutline:true,sourceTitlesOnly:true,sourceSceneOutline:true,
 sceneOriginalPrefix:'Tableau',showReaderMusicalHeadings:false,
 stageDirectionSpeaker:'Stage direction',stageDirectionLabel:'Stage direction',
 acts:[
  {number:1,originalHeading:'PREMIER ACTE',scenes:manonActOneScenes},
  {number:2,originalHeading:'DEUXIÈME ACTE',scenes:manonActTwoScenes},
  {number:3,originalHeading:'TROISIÈME ACTE',scenes:manonActThreeScenes},
  {number:4,originalHeading:'QUATRIÈME ACTE',scenes:manonActFourScenes},
  {number:5,originalHeading:'CINQUIÈME ACTE',scenes:manonActFiveScenes},
 ],
 synopsis:{
 eyebrow:'Five-act bilingual working reader · English Acts I–IV machine translated, editorial review pending',
 paragraphs:info.synopsis,characters:info.characters
 },
 source: "Original libretto and English translation provenance: docs/info/operas-origins.md"
};
