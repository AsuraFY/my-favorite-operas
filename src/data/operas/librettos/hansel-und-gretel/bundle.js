// Hänsel und Gretel — the original German text with its public-domain 1905 English performing adaptation.
// Source: F. Rullman 1905, transcribed as Project Gutenberg #43289; source lines and historical English do not share exact verse lineation.
import {getOpera} from './operas.js';
import {operaInformation} from './opera-information.js';
import {hanselActOneScenes} from './libretto-hansel-und-gretel-act-1.js?v=hansel-1905-20261029';
import {hanselActTwoScenes} from './libretto-hansel-und-gretel-act-2.js?v=hansel-1905-20261029';
import {hanselActThreeScenes} from './libretto-hansel-und-gretel-act-3.js?v=hansel-1905-20261029';
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
 source:'German: Adelheid Wette, Hänsel und Gretel, public-domain F. Rullman libretto (1905), https://www.gutenberg.org/ebooks/43289. English: public-domain contemporary performing adaptation from the same edition; not a literal word-for-word translation. Three pictures with 3, 3 and 5 dramatic scenes respectively. Complete original and historical adaptation transcribed per scene; several non-identical speech divisions have been grouped; verse-by-verse collation and independent browser/editorial review remain pending.'
};
