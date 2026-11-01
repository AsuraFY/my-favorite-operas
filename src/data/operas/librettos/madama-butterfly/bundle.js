// This opera's metadata and act modules load only when its page is visited.
import { getOpera } from "./operas.js?v=tosca-act1-2";
import { madamaButterflyActOneScenes } from "./libretto-madama-butterfly-act-1.js?v=madama-butterfly-review-20261020-1";
import { madamaButterflyActTwoScenes } from "./libretto-madama-butterfly-act-2.js?v=madama-butterfly-review-20261020-2";
import { madamaButterflyActThreeScenes } from "./libretto-madama-butterfly-act-3.js?v=madama-butterfly-review-20261020-3";

export const madamaButterfly = {
  slug: "madama-butterfly",
  threeLineOutline: true,
  opera: getOpera("madama-butterfly"),
  composerShort: "G. PUCCINI",
  mobileComposer: "Giacomo Puccini",
  mobileArtworkUrl: "./public/images/madama-butterfly-art.webp",
  mobileArtworkLabel: "Madama Butterfly",
  originalLanguage: "Italiano",
  translationLanguage: "English",
  continuousAct: true,
  preserveLineBreaks: true,
  alignVerseLines: true,
  sceneDivisions: false,
  stageDirectionSpeaker: "Stage direction",
  stageDirectionLabel: "Stage direction",
  bracketStageDirections: false,
  originalSpeakerNames: {
    "Friends of Butterfly": "Le amiche di Butterfly", "Relatives and friends": "Parenti ed amici",
    "Butterfly and friends": "Butterfly e le amiche", "Butterfly and guests": "Butterfly e invitati",
    "Cousin": "La cugina", "Mother": "La madre", "Aunt": "La zia",
    "Mother and Aunt": "La madre e la zia", "Cousin and Mother": "Cugina e madre",
    "Cousin and friends": "La cugina ed amici", "Cousin and relatives": "Cugina e parenti",
    "Mother and friends": "Madre ed amiche", "Chorus of guests": "Coro degli invitati",
    "Guests and Yakusidè": "Invitati e Yakusidè", "Guests, Cousin and Mother": "Invitati, cugina e madre",
    "The Bonze": "Lo zio Bonzo", "The Bonze, Yakusidè, relatives and friends": "Bonzo, Yakusidè, parenti ed amici",
    "The Imperial Commissioner": "Il Commissario Imperiale", "The Registrar": "L'Ufficiale del registro",
    "Goro and Yamadori": "Goro e Yamadori", "Butterfly and Suzuki": "Butterfly e Suzuki", "Sailors": "Marinai"
  },
  translatedForms: {
    "Coro e scena": "Chorus and scene",
    Duetto: "Duet",
    Ensemble: "Ensemble",
    Finale: "Finale",
    Coro: "Chorus",
    "Scena e aria": "Scene and aria"
  },
  acts: [
    { number: 1, originalHeading: "Atto primo", prelude: { title: "Preludio", translation: "Prelude" }, scenes: madamaButterflyActOneScenes },
    { number: 2, originalHeading: "Atto secondo", scenes: madamaButterflyActTwoScenes },
    { number: 3, originalHeading: "Atto terzo", scenes: madamaButterflyActThreeScenes }
  ],
  characters: [
    ["Madama Butterfly (Cio-Cio-San)", "Soprano", "A young woman from Nagasaki who enters a marriage with American naval officer Pinkerton and gives up her family’s religion."],
    ["B. F. Pinkerton", "Tenor", "An American naval officer stationed in Nagasaki."],
    ["Suzuki", "Mezzo-soprano", "Butterfly’s maid."],
    ["Sharpless", "Baritone", "The American consul in Nagasaki."],
    ["Goro", "Tenor", "A marriage broker."],
    ["Kate", "Mezzo-soprano", "Pinkerton’s American wife, who hopes to take Butterfly’s child into her care."],
    ["The child", "Silent role", "Butterfly and Pinkerton’s young son."],
    ["Sailors", "Chorus", "Voices heard from the harbor at dawn."],
    ["The Bonze", "Bass", "Butterfly’s uncle, a Buddhist priest."],
    ["The Imperial Commissioner", "Bass", "An official who conducts the marriage ceremony."],
    ["The Registrar", "Bass", "The civil official who records the marriage."]
  ],
  synopsis: {
    eyebrow: "Giacomo Puccini · Opera in three acts",
    paragraphs: [
      "On a hillside above Nagasaki, the American naval officer Pinkerton prepares to marry Cio-Cio-San, known as Butterfly. The matchmaker Goro shows him the couple’s small Japanese house, whose sliding walls can be rearranged at will. Consul Sharpless warns Pinkerton that Butterfly takes their marriage seriously, while Pinkerton treats the arrangement as temporary.",
      "Butterfly arrives with her friends and relatives. She tells Pinkerton that she has secretly converted to his religion. The Imperial Commissioner records their marriage, but Butterfly’s uncle, the Bonze, interrupts the celebration and condemns her for abandoning her family’s faith. Pinkerton sends the relatives away and comforts Butterfly. As night falls, the two are left alone together."
    ],
    characters: [
      ["Cio-Cio-San (Madama Butterfly)", "Soprano", "A young woman from Nagasaki who is deeply devoted to Pinkerton."],
      ["B. F. Pinkerton", "Tenor", "An American naval officer stationed in Nagasaki."],
      ["Suzuki", "Mezzo-soprano", "Butterfly’s maid."],
      ["Sharpless", "Baritone", "The American consul in Nagasaki."],
      ["Goro", "Tenor", "A marriage broker."]
    ]
  },
  source: "Italian libretto and stage directions: Opera Guide, Madama Butterfly, Atti primo, secondo, and terzo: https://opera-guide.ch/operas/madama+butterfly/libretto/it/. The Spotify recording linked by the user guides the section outline. Reviewed against the Italian on 20 October 2026: restored interleaved dialogue and missing replies, corrected English line correspondence and meaning, separated stage cues from singing, and retained all 34 section routes. The opera is presented in three acts. Section types are editorial listening labels, not asserted score numbers. The earlier draft consulted https://lyricaloperatheater.com/PDFs/MadamaButterfly_libretto_translation.pdf. Browser visual verification remains pending."
};

