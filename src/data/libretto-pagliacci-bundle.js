// Pagliacci — Prologue and two acts, complete bilingual working translation.
// Italian source: Ruggero Leoncavallo, Pagliacci, public-domain libretto, https://www.librettidopera.it/pagliacci/pagliacci.html
// Structured transcription: https://github.com/martin-he543/sottovoce/blob/ff573f9e35a565bdb6afed35c83f091e69f5a40b/public/libretti/texts/Q248644.json
// English: independently written AI-generated working translation awaiting editorial review.
// Prologue is presented at the beginning of the Act I reading page, without inventing a third act.
import {getOpera} from './operas.js';
import {operaInformation} from './opera-information.js';
import {pagliacciPrologueScenes, pagliacciActOneScenes} from './libretto-pagliacci-act-1.js?v=pagliacci-prologue-act1-20261029';
import {pagliacciActTwoScenes} from './libretto-pagliacci-act-2.js?v=pagliacci-act2-20261029';
const info=operaInformation['pagliacci'];
const prologue=pagliacciPrologueScenes.map(scene=>({...scene,number:1,originalHeading:'PROLOGO',translatedHeading:'Prologue'}));
const actOne=pagliacciActOneScenes.map((scene,index)=>({...scene,number:index+2}));
export const pagliacci={
 slug:'pagliacci',opera:getOpera('pagliacci'),
 composerShort:'R. LEONCAVALLO',mobileComposer:'Ruggero Leoncavallo',
 originalLanguage:'Italiano',translationLanguage:'English',
 continuousAct:true,preserveLineBreaks:true,alignVerseLines:false,
 threeLineOutline:true,sourceTitlesOnly:true,sourceSceneOutline:true,
 sceneOriginalPrefix:'Scena',showReaderMusicalHeadings:false,
 stageDirectionSpeaker:'Stage direction',stageDirectionLabel:'Stage direction',
 acts:[
  {number:1,originalHeading:'PROLOGO E ATTO PRIMO',scenes:[...prologue,...actOne]},
  {number:2,originalHeading:'ATTO SECONDO',scenes:pagliacciActTwoScenes}
 ],
 synopsis:{
  eyebrow:'Ruggero Leoncavallo · Prologue and opera in two acts · AI-generated English working translation awaiting editorial review',
  paragraphs:info.synopsis,characters:info.characters
 },
 source:'Original Italian: Ruggero Leoncavallo (public domain), libretto transcription at https://www.librettidopera.it/pagliacci/pagliacci.html through Sottovoce Q248644. Prologue: 31 lines; Act I: 414; Act II: 344. English: independent AI working translation, not a published translation; line-to-line editorial, speaker/direction and Opera Guide collation pending. The original source act/scene headings are preserved, but Prologue appears in Act I reader tab for existing two-act navigation.'
};
