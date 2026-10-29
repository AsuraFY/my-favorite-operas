// La Cenerentola, ossia La bontà in trionfo, complete two-act bilingual working draft.
// Original Italian by Jacopo Ferretti, public-domain transcription: https://www.librettidopera.it/cenere/cenere.html
// Structured source: Sottovoce Q176700. English: independently authored AI-generated working translation awaiting editorial review.
import {getOpera} from './operas.js';
import {operaInformation} from './opera-information.js';
import {cenerentolaActOneScenes} from './libretto-la-cenerentola-act-1.js?v=cenerentola-act1-20261029';
import {cenerentolaActTwoScenes} from './libretto-la-cenerentola-act-2.js?v=cenerentola-act2-20261029';
const info=operaInformation['la-cenerentola'];
export const laCenerentola={
 slug:'la-cenerentola',opera:getOpera('la-cenerentola'),
 composerShort:'G. ROSSINI',mobileComposer:'Gioachino Rossini',
 originalLanguage:'Italiano',translationLanguage:'English',
 continuousAct:true,preserveLineBreaks:true,alignVerseLines:false,
 threeLineOutline:true,sourceTitlesOnly:true,sourceSceneOutline:true,
 sceneOriginalPrefix:'Scena',showReaderMusicalHeadings:false,
 stageDirectionSpeaker:'Stage direction',stageDirectionLabel:'Stage direction',
 acts:[
  {number:1,originalHeading:'ATTO PRIMO',scenes:cenerentolaActOneScenes},
  {number:2,originalHeading:'ATTO SECONDO',scenes:cenerentolaActTwoScenes}
 ],
 synopsis:{
  eyebrow:'Rossini · Comic opera in two acts · AI-generated English working translation awaiting editorial review',
  paragraphs:info.synopsis,characters:info.characters
 },
 source:'Italian: Jacopo Ferretti, La Cenerentola (public-domain libretto), https://www.librettidopera.it/cenere/cenere.html, structured from Sottovoce Q176700. 15 scenes / 880 source-line records in Act I; 10 scenes / 700 source-line records in Act II. English: independently authored AI-generated working translation, not an editorially reviewed published translation. Opera Guide alternate reference https://opera-guide.ch/operas/la+cenerentola+ossia+la+bonta+in+trionfo/libretto/it/; detailed collation and native-browser checks pending. Source Act II Scene IV has no speaker tags in vocal lines; attribution to Alidoro is provisional.'
};
