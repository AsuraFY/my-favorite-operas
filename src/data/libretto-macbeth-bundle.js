// This opera's metadata and act modules load only when its page is visited.
import { getOpera } from "./operas.js?v=tosca-act1-2";
import { macbethActOneScenes } from "./libretto-macbeth-act-1.js?v=macbeth-stage-cues-20261023";
import { macbethActTwoScenes } from "./libretto-macbeth-act-2.js?v=macbeth-stage-cues-20261023";
import { macbethActThreeScenes } from "./libretto-macbeth-act-3.js?v=macbeth-stage-cues-20261023";
import { macbethActFourScenes } from "./libretto-macbeth-act-4.js?v=macbeth-stage-cues-20261023";

export const macbeth = {
  translateSectionHeadings: true,
  slug: "macbeth",
  sourceTitlesOnly: true,
  threeLineOutline: true,
  opera: getOpera("macbeth"),
  composerShort: "G. VERDI",
  mobileComposer: "Giuseppe Verdi",
  originalLanguage: "Italiano",
  translationLanguage: "English",
  preserveLineBreaks: true,
  continuousAct: true,
  sceneOriginalPrefix: "Scena",
  sceneOrdinals: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX"],
  stageDirectionSpeaker: "Stage direction",
  stageDirectionLabel: "",
  bracketStageDirections: true,
  translatedForms: { Preludio: "Prelude", Introduzione: "Introduction", "Cavatina di Lady Macbeth": "Lady Macbeth’s Cavatina", "Recitativo e Marcia": "Recitative and March", "Scena e Duetto": "Scene and Duet", "Finale Primo": "First Finale", "Scena ed Aria Lady": "Lady Macbeth’s Scene and Aria", "Coro di Sicari": "Chorus of Assassins", "Scena Banco": "Banco’s Scene", "Convito, Visione e Finale Secondo": "Banquet, Vision and Second Finale", "[Ballo e] Coro": "[Ballet and] Chorus", "Recitativo, Apparizoni, Ballabile e Duetto finale": "Recitative, Apparitions, Ballet and Final Duet", Coro: "Chorus", "Scena ed Aria Macduff": "Macduff’s Scene and Aria", "Sonnambulismo di Lady Macbeth": "Lady Macbeth’s Sleepwalking", "Scena, Battaglia, Morte di Macbeth": "Scene, Battle and Death of Macbeth" },
  acts: [{
    number: 1,
    originalHeading: "Atto primo",
    alignVerseLines: true,
    scenes: macbethActOneScenes
  }, {
    number: 2,
    originalHeading: "Atto secondo",
    alignVerseLines: true,
    scenes: macbethActTwoScenes
  }, {
    number: 3,
    originalHeading: "Atto terzo",
    alignVerseLines: true,
    scenes: macbethActThreeScenes
  }, {
    number: 4,
    originalHeading: "Atto quarto",
    alignVerseLines: true,
    scenes: macbethActFourScenes
  }],
  synopsis: {
    eyebrow: "Giuseppe Verdi · Opera in four acts",
    paragraphs: [
      "Witches foretell that the Scottish general Macbeth will become king. With Lady Macbeth's encouragement, he murders King Duncan and takes the throne, then turns to further violence to protect his power.",
      "As guilt and fear close in, Lady Macbeth is consumed by her actions and forces gather against the tyrant. Verdi's opera adapts Shakespeare's tragedy of ambition, prophecy, and the cost of power."
    ],
    characters: [
      ["Macbeth", "Baritone", "A Scottish general who becomes king."],
      ["Lady Macbeth", "Soprano", "Macbeth's ambitious wife."],
      ["Banco", "Bass", "A general whose descendants are foretold to rule."],
      ["Fleanzio", "Silent role", "Banco's son."],
      ["Witches", "Chorus", "A chorus of witches, divided into three groups, who deliver the prophecies."],
      ["Duncano", "Silent role", "King of Scotland."],
      ["Malcolm", "Tenor", "Duncano’s son."],
      ["Macduff", "Tenor", "A Scottish nobleman."]
    ]
  },
  characters: ["Macbeth", "Lady Macbeth", "Banco", "Fleanzio", "Streghe", "Duncano", "Malcolm", "Macduff"],
  source: "Giuseppe Verdi, Macbeth, Italian text and numbered divisions as presented by Opera Guide (accessed 2026-10-15; includes revised passages): https://opera-guide.ch/operas/macbethverdi/libretto/it/; separately labeled 1847 alternative ending: https://www.librettidopera.it/macbeth/a_04.html (accessed 2026-10-17)."
};

