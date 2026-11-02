// Norma (Vincenzo Bellini, Felice Romani): two complete Italian-English working draft acts.
import {getOpera} from '../../catalog.js';
import {operaInformation} from '../../information.js';
import {normaActOneScenes} from './act-1.js?v=norma-act1-20261029';
import {normaActTwoScenes} from './act-2.js?v=norma-act2-20261029';
const info=operaInformation.norma;
export const norma={
  slug:'norma',opera:getOpera('norma'),
  composerShort:'V. BELLINI',mobileComposer:'Vincenzo Bellini',
  originalLanguage:'Italiano',translationLanguage:'English',
  continuousAct:true,preserveLineBreaks:true,alignVerseLines:false,
  threeLineOutline:true,sourceTitlesOnly:true,sourceSceneOutline:true,
  sceneOriginalPrefix:'Scena',showReaderMusicalHeadings:false,
  stageDirectionSpeaker:'Stage direction',stageDirectionLabel:'Stage direction',
  acts:[
    {number:1,originalHeading:'ATTO PRIMO',scenes:normaActOneScenes},
    {number:2,originalHeading:'ATTO SECONDO',scenes:normaActTwoScenes}
  ],
  synopsis:{
    eyebrow:'Vincenzo Bellini · Opera in two acts · Both acts available as AI-generated English working translations awaiting editorial review',
    paragraphs:info.synopsis,characters:info.characters
  },
  source: "Original libretto and English translation provenance: docs/info/operas-origins.md"
};
