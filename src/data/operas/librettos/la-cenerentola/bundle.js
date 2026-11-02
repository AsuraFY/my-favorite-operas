// La Cenerentola, ossia La bontà in trionfo, complete two-act bilingual working draft.
// Original Italian by Jacopo Ferretti, public-domain transcription: https://www.librettidopera.it/cenere/cenere.html
// Structured source: Sottovoce Q176700. English: independently authored AI-generated working translation awaiting editorial review.
import {getOpera} from '../../catalog.js';
import {operaInformation} from '../../information.js';
import {cenerentolaActOneScenes} from './act-1.js?v=cenerentola-act1-20261029';
import {cenerentolaActTwoScenes} from './act-2.js?v=cenerentola-act2-20261029';
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
 source: "Original libretto and English translation provenance: docs/info/operas-origins.md"
};
