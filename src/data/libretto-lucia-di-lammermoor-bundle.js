// Lucia di Lammermoor — bilingual libretto in three acts.
// Italian: public-domain Salvadore Cammarano, https://www.librettidopera.it/lucialam/lucialam.html
// Via Sottovoce Q244209, https://github.com/martin-he543/sottovoce/blob/ff573f9e35a565bdb6afed35c83f091e69f5a40b/public/libretti/texts/Q244209.json
// Independent AI English working translation; editorial review and Opera Guide collation pending.
import { getOpera } from './operas.js';
import { operaInformation } from './opera-information.js';
import { luciaActOneScenes } from './libretto-lucia-di-lammermoor-act-1.js?v=lucia-act1-20261029';
import { luciaActTwoScenes } from './libretto-lucia-di-lammermoor-act-2.js?v=lucia-act2-20261029';
import { luciaActThreeScenes } from './libretto-lucia-di-lammermoor-act-3.js?v=lucia-act3-20261029';
const info = operaInformation['lucia-di-lammermoor'];
export const luciaDiLammermoor = {
 slug:'lucia-di-lammermoor', opera:getOpera('lucia-di-lammermoor'),
 composerShort:'G. DONIZETTI', mobileComposer:'Gaetano Donizetti',
 originalLanguage:'Italiano', translationLanguage:'English',
 continuousAct:true,preserveLineBreaks:true,alignVerseLines:false,
 threeLineOutline:true,sourceTitlesOnly:true,sourceSceneOutline:true,
 sceneOriginalPrefix:'Scena',showReaderMusicalHeadings:false,
 stageDirectionSpeaker:'Stage direction',stageDirectionLabel:'Stage direction',
 acts:[
  { number:1, originalHeading:'PARTE PRIMA — LA PARTENZA', scenes:luciaActOneScenes },
  { number:2, originalHeading:'PARTE SECONDA — IL CONTRATTO NUZIALE, I', scenes:luciaActTwoScenes },
  { number:3, originalHeading:'PARTE SECONDA — IL CONTRATTO NUZIALE, II', scenes:luciaActThreeScenes }
 ],
 synopsis:{
  eyebrow:'Gaetano Donizetti · Dramatic opera in three acts (original: two parts) · All acts available as AI working translations · Editorial review pending',
  paragraphs:info.synopsis, characters:info.characters
 },
 source:'Italian: Salvadore Cammarano, public-domain libretto transcribed at https://www.librettidopera.it/lucialam/lucialam.html via Sottovoce Wikidata Q244209. English: independently written AI-generated working translation awaiting detailed editorial review and source collation with https://opera-guide.ch/. Scene counts: five in Act I, six in Act II, nine in Act III. Three website acts map to the Italian source\'s two-part structure (La partenza; Il contratto nuziale I and II).'
};
