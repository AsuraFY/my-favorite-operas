// This opera's metadata and act modules load only when its page is visited.
import { samsonActThreeScenes } from "./libretto-samson-et-dalila-act-3.js?v=samson-act3-20261021";
import { samsonActTwoScenes } from "./libretto-samson-et-dalila-act-2.js?v=samson-act2-20261021";
import { samsonActOneScenes } from "./libretto-samson-et-dalila-act-1.js?v=samson-act1-20261021";
import { operaInformation } from "./opera-information.js?v=info-9";
import { getOpera } from "./operas.js?v=tosca-act1-2";

export const samson = {
  slug: "samson-et-dalila",
  opera: getOpera("samson-et-dalila"),
  composerShort: "C. SAINT-SAËNS",
  mobileComposer: "Camille Saint-Saëns",
  mobileArtworkLabel: "Samson et Dalila",
  mobileArtworkUrl: "./public/images/samson-et-dalila-art.webp",
  originalLanguage: "Français",
  translationLanguage: "English",
  continuousAct: true,
  preserveLineBreaks: true,
  threeLineOutline: true,
  sourceSceneOutline: true,
  sceneOriginalPrefix: "Scène",
  stageDirectionSpeaker: "Stage direction",
  stageDirectionLabel: "Stage direction",
  translatedForms: { "Chœur": "Chorus", Air: "Aria", "Scène": "Scene", Trio: "Trio", Ballet: "Ballet", Duo: "Duet", "Récitatif": "Recitative" },
  acts: [
    { number: 1, originalHeading: "Acte premier", scenes: samsonActOneScenes },
    { number: 2, originalHeading: "Deuxième acte", scenes: samsonActTwoScenes },
    { number: 3, originalHeading: "Troisième acte", scenes: samsonActThreeScenes }
  ],
  characters: ["Samson", "Dalila", "Abimélech", "High Priest of Dagon", "Old Hebrew", "Philistine Messenger", "First Philistine", "Second Philistine"],
  synopsis: {
    eyebrow: "Camille Saint-Saëns · Grand opera in three acts",
    paragraphs: operaInformation["samson-et-dalila"].synopsis,
    characters: operaInformation["samson-et-dalila"].characters
  },
  source: "Ferdinand Lemaire, Samson et Dalila, Acts I–III. French: ABAO programme, pp. 213–245, https://www.esm.rochester.edu/uploads/Locke-Libro-ABAO-2020-2021.pdf (accessed 21 October 2026). Fresh English draft, checked against the French; independent review pending. All three acts added. See docs/reviews/samson-et-dalila-act-1.md, docs/reviews/samson-et-dalila-act-2.md and docs/reviews/samson-et-dalila-act-3.md."
};

