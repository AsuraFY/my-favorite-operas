// Manon, Jules Massenet — five-act bilingual working reading edition.
// Acts I–IV: original French Meilhac/Gille from Opera Guide (structured via Sottovoce Q842063);
// English independently machine-translated on 2026-10-29 and awaiting human editorial review.
// Act V: 1895 public-domain James Cartwright Macy bilingual edition (alternate ending).
import {getOpera} from './operas.js';
import {operaInformation} from './opera-information.js';
import {manonActOneScenes} from './libretto-manon-act-1.js?v=manon-complete-20261029';
import {manonActTwoScenes} from './libretto-manon-act-2.js?v=manon-complete-20261029';
import {manonActThreeScenes} from './libretto-manon-act-3.js?v=manon-complete-20261029';
import {manonActFourScenes} from './libretto-manon-act-4.js?v=manon-complete-20261029';
import {manonActFiveScenes} from './libretto-manon-act-5.js?v=manon-complete-20261029';
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
 source:'French Acts I–IV: Henri Meilhac and Philippe Gille, public-domain libretto, https://opera-guide.ch/operas/manon/libretto/fr/ (transcribed from Sottovoce Q842063: 1,931 original source records including the prelude). English Acts I–IV: independently generated Google Translate working draft on 29 October 2026, not a verified published translation. Act V: 1895 J. C. Macy bilingual edition, University of Rochester Sibley Music Library https://urresearch.rochester.edu/institutionalPublicationPublicView.action?institutionalItemId=28674. Historical versions differ: the Macy edition presents Act V as an alternate Scene II of Act IV. Source-derived incipits are navigation aids, not asserted musical-number titles. Human editorial and native-browser QA pending.'
};
