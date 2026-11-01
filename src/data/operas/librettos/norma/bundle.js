// Norma (Vincenzo Bellini, Felice Romani): two complete Italian-English working draft acts.
// Italian public-domain libretto: https://www.librettidopera.it/norma/norma.html (via Sottovoce Q320353).
// Cross-reference: https://opera-guide.ch/operas/norma/libretto/it/
// Independent AI-generated English working translation awaiting editorial review and source collation.
import {getOpera} from './operas.js';
import {operaInformation} from './opera-information.js';
import {normaActOneScenes} from './libretto-norma-act-1.js?v=norma-act1-20261029';
import {normaActTwoScenes} from './libretto-norma-act-2.js?v=norma-act2-20261029';
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
  source:'Italian: Felice Romani public-domain Norma libretto, https://www.librettidopera.it/norma/norma.html, structured via Sottovoce Q320353 (9 scenes Act I, 11 scenes Act II; 962 source-line records). Opera Guide reference https://opera-guide.ch/operas/norma/libretto/it/; detailed source collation pending. English: independent AI-generated working translation awaiting editorial review; all vocal and direction records paired; one source-omitted speaker attribution in Act I Scene V provisionally assigned to Adalgisa, pending verification.'
};
