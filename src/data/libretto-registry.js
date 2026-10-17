import { applyCosiOutlineMetadata } from "./cosi-outline-metadata.js";
// Data registry for complete libretti; the reader UI consumes this shape for every opera.
// Original Così dialogue stays in the existing act files, unchanged.
import { getOpera } from "./operas.js?v=tosca-act1-2";
import { cosiActOneScenes } from "./libretto-cosi-fan-tutte-act-1.js?v=cosi-lines-1";
import { cosiActTwoScenes } from "./libretto-cosi-fan-tutte-act-2.js?v=cosi-lines-1";
import { barbiereActOneScenes } from "./libretto-il-barbiere-di-siviglia-act-1.js?v=barbiere-act1-5";
import { barbiereActTwoScenes } from "./libretto-il-barbiere-di-siviglia-act-2.js?v=barbiere-act2-4";
import { tristanActOneScenes } from "./libretto-tristan-und-isolde-act-1.js?v=tristan-outline-1";
import { tristanActTwoScenes } from "./libretto-tristan-und-isolde-act-2.js?v=tristan-outline-1";
import { tristanActThreeScenes } from "./libretto-tristan-und-isolde-act-3.js?v=tristan-outline-1";
import { macbethActOneScenes } from "./libretto-macbeth-act-1.js?v=macbeth-lines-1";

import { macbethActTwoScenes } from "./libretto-macbeth-act-2.js?v=macbeth-lines-2";

import { macbethActThreeScenes } from "./libretto-macbeth-act-3.js?v=macbeth-lines-complete";

import { macbethActFourScenes } from "./libretto-macbeth-act-4.js?v=macbeth-lines-complete";
import { turandotActOneScenes } from "./libretto-turandot-act-1.js?v=turandot-outline-1";
import { turandotActTwoScenes } from "./libretto-turandot-act-2.js?v=turandot-outline-1";
import { turandotActThreeScenes } from "./libretto-turandot-act-3.js?v=turandot-outline-1";

import { figaroActOneScenes } from "./libretto-le-nozze-di-figaro-act-1.js?v=figaro-stage-paragraph-1";

import { figaroActTwoScenes } from "./libretto-le-nozze-di-figaro-act-2.js?v=figaro-act2-1";
import { figaroActThreeScenes } from "./libretto-le-nozze-di-figaro-act-3.js?v=figaro-act3-1";
import { figaroActFourScenes } from "./libretto-le-nozze-di-figaro-act-4.js?v=figaro-act4-1";
import { carmenActOneScenes } from "./libretto-carmen-act-1.js?v=carmen-act1-1";
import { carmenActTwoScenes } from "./libretto-carmen-act-2.js?v=carmen-act2-1";
import { carmenActThreeScenes } from "./libretto-carmen-act-3.js?v=carmen-act3-1";
import { carmenActFourScenes } from "./libretto-carmen-act-4.js?v=carmen-act4-1";
import { laBohemeActOneScenes } from "./libretto-la-boheme-act-1.js?v=la-boheme-act1-4";
import { laBohemeActTwoScenes } from "./libretto-la-boheme-act-2.js?v=la-boheme-act2-3";
import { laBohemeActThreeScenes } from "./libretto-la-boheme-act-3.js?v=la-boheme-act3-3";
import { laBohemeActFourScenes } from "./libretto-la-boheme-act-4.js?v=la-boheme-act4-3";

import { madamaButterflyActOneScenes } from "./libretto-madama-butterfly-act-1.js?v=madama-butterfly-act1-1";
import { madamaButterflyActTwoScenes } from "./libretto-madama-butterfly-act-2.js?v=madama-butterfly-act2-1";
import { madamaButterflyActThreeScenes } from "./libretto-madama-butterfly-act-3.js?v=madama-butterfly-act3-1";
import { toscaActOneScenes } from "./libretto-tosca-act-1.js?v=tosca-act1-1";
import { toscaActTwoScenes } from "./libretto-tosca-act-2.js?v=tosca-act2-1";
import { toscaActThreeScenes } from "./libretto-tosca-act-3.js?v=tosca-act3-2";

const characters = [
  ["Fiordiligi", "Soprano", "Dorabella’s sister, engaged to Guglielmo; she struggles to remain loyal during the test."],
  ["Dorabella", "Mezzo-soprano", "Fiordiligi’s sister, engaged to Ferrando; her feelings shift during the disguised courtship."],
  ["Ferrando", "Tenor", "A young officer engaged to Dorabella, who joins Alfonso’s wager and disguises himself."],
  ["Guglielmo", "Baritone", "An officer engaged to Fiordiligi, who joins Ferrando in the test of fidelity."],
  ["Don Alfonso", "Bass", "An older philosopher who doubts constancy and devises the wager."],
  ["Despina", "Soprano", "The sisters’ quick-witted maid, enlisted to help carry out Alfonso’s scheme."]
];
const albanian = "disguised as an Albanian suitor";
const disguises = {};
for (const key of ["1:11", "1:15", "1:16", "2:4", "2:16", "2:17"]) {
  disguises[key] = { Ferrando: albanian, Guglielmo: albanian };
}
for (const key of ["2:6", "2:12"]) disguises[key] = { Ferrando: albanian };
disguises["2:5"] = { Guglielmo: albanian };
disguises["1:16"].Despina = "disguised as a doctor";
disguises["2:17"].Despina = "disguised as a notary";

const cosi = {
  slug: "cosi-fan-tutte",
  alignVerseLines: true,
  preserveLineBreaks: true,
  continuousAct: true,
  opera: getOpera("cosi-fan-tutte"),
  composerShort: "W. A. MOZART",
  mobileComposer: "W. A. Mozart",
  mobileArtworkLabel: "Lake Como landscape",
  mobileArtworkUrl: "./public/images/lake-como-banner.webp",
  originalLanguage: "Italiano",
  translationLanguage: "English",
  recitativeLabel: "Recitativo",
  sceneOriginalPrefix: "Scena",
  stageDirectionSpeaker: "Stage direction",
  stageDirectionLabel: "Stage direction",
  translatedForms: { Terzetto: "Trio", Duetto: "Duet", Aria: "Aria" },
  acts: [
    { number: 1, originalHeading: "Atto Primo", scenes: cosiActOneScenes },
    { number: 2, originalHeading: "Atto Secondo", scenes: cosiActTwoScenes }
  ],
  sceneOrdinals: ["PRIMA", "SECONDA", "TERZA", "QUARTA", "QUINTA", "SESTA", "SETTIMA", "OTTAVA", "NONA", "DECIMA", "UNDICESIMA", "DODICESIMA", "TREDICESIMA", "QUATTORDICESIMA", "QUINDICESIMA", "SEDICESIMA", "DICIASSETTESIMA", "ULTIMA"],
  synopsis: {
    eyebrow: "W. A. Mozart · Opera buffa in two acts",
    paragraphs: [
      "Two young officers, Ferrando and Guglielmo, are certain their fiancées, Dorabella and Fiordiligi, will always be faithful. Don Alfonso challenges their confidence with a wager: the officers must pretend to leave for war, return in disguise, and attempt to win each other’s beloved.",
      "With help from the sisters’ maid Despina, Alfonso engineers increasingly elaborate encounters. The deception tests all four lovers, culminating in a staged wedding and a final revelation that forces them to confront love, loyalty and human inconsistency."
    ],
    characters
  },
  // Only exceptional incipits need overrides. Ordinary section titles are inferred or supplied by data.
  sectionTitleOverrides: {
    "1:1:0": { original: "La mia Dorabella capace non è" },
    "1:1:2": { original: "È la fede delle femmine", translation: "A woman’s faith" },
    "1:1:4": { original: "Una bella serenata", translation: "A lovely serenade" },
    "1:2:0": { original: "Ah, guarda, sorella", translation: "Ah, look, sister" },
    "1:3:1": { original: "Vorrei dir, e cor non ho", translation: "I would speak, but have no heart" },
    "2:18:0": { original: "Fortunato l'uom che prende" }
  },
  characters: characters.map(([name]) => name),
  disguises,
  ensembleLabels: {
    "Soldiers & townspeople": "Soldiers & townspeople",
    "Chorus of Servants & Musicians": "Servants & musicians (chorus)",
    Chorus: "Chorus"
  }
};

applyCosiOutlineMetadata(cosi.acts);
cosi.threeLineOutline = true;
cosi.source = "Outline review, 13 October 2026: https://www.librettidopera.it/cotutte/som.html (musical-number and incipit index), checked against https://www.teatroallascala.org/static/upload/lib/libretto-cosi-fan-tutte_2024-2025.pdf (PDF pp. 2–41). Existing sung text is unchanged; its original edition remains unrecorded. Existing scene labels are editorial navigation cues. Source discrepancies remain pending: N. 9 Quintetto versus Scala 8a Quintetto/9 Coro; N. 10 Terzetto/Terzettino; N. 30 Archi soli/Andante. Existing numbering and these forms are retained pending an edition decision. Musical titles are explicit indexed incipits; finale continuations retain N. 18 or N. 31. English heading translations are new drafts.";

const barbiere = {
  slug: "il-barbiere-di-siviglia",
  threeLineOutline: true,
  continuousAct: true,
  opera: getOpera("il-barbiere-di-siviglia"),
  composerShort: "G. ROSSINI",
  mobileComposer: "G. Rossini",
  mobileArtworkLabel: "Seville at dawn",
  originalLanguage: "Italiano",
  translationLanguage: "English",
  recitativeLabel: "Recitativo",
  sceneOriginalPrefix: "Scena",
  stageDirectionSpeaker: "Stage direction",
  originalSpeakerNames: {
    "All": "Tutti",
    "All three": "Tutti e tre",
    "Bartolo and Basilio": "Bartolo e Basilio",
    "Bartolo and Rosina": "Bartolo e Rosina",
    "Basilio and Berta": "Basilio e Berta",
    "Berta, Bartolo and Basilio": "Berta, Bartolo e Basilio",
    "Chorus": "Coro",
    "Figaro and Basilio": "Figaro e Basilio",
    "Officer": "Ufficiale",
    "Magistrate": "Alcalde",
    "Rosina and Berta": "Rosina e Berta",
    "Rosina and The Count": "Rosina e Il Conte",
    "Rosina, The Count and Figaro": "Rosina, Il Conte e Figaro",
    "The Count": "Il Conte",
    "The Count and Bartolo": "Il Conte e Bartolo",
    "The Count and Figaro": "Il Conte e Figaro",
    "The Count and Rosina": "Il Conte e Rosina"
},
  translatedForms: { Cavatina: "Cavatina", Canzone: "Song", Duetto: "Duet", Aria: "Aria" },
  acts: [
    { number: 1, originalHeading: "Atto primo", scenes: barbiereActOneScenes },
    { number: 2, originalHeading: "Atto secondo", scenes: barbiereActTwoScenes }
  ],
  sceneOrdinals: ["PRIMA", "SECONDA", "TERZA", "QUARTA", "QUINTA", "SESTA", "SETTIMA", "OTTAVA", "NONA", "DECIMA", "UNDICESIMA", "DODICESIMA", "TREDICESIMA", "QUATTORDICESIMA", "QUINDICESIMA", "SEDICESIMA"],
  synopsis: {
    eyebrow: "Gioachino Rossini · Opera buffa in two acts",
    paragraphs: [
      "In Seville, the resourceful barber Figaro helps Count Almaviva approach Rosina, the young ward of Doctor Bartolo. Almaviva hides his identity and courts her as the poor student Lindoro, while Bartolo schemes to marry Rosina himself.",
      "Act I brings their plans together through disguises, a forged lodging billet, and Figaro’s quick thinking. The act ends when a cavalry officer recognizes Almaviva and the household is left bewildered."
    ],
    characters: [
      ["Figaro", "Baritone", "Seville’s ingenious barber and self-appointed fixer, who helps Almaviva reach Rosina."],
      ["Rosina", "Soprano", "Bartolo’s clever young ward, determined to choose her own husband."],
      ["Count Almaviva", "Tenor", "A nobleman who courts Rosina in disguise as the student Lindoro."],
      ["Doctor Bartolo", "Bass-baritone", "Rosina’s suspicious guardian, intent on marrying her himself."],
      ["Don Basilio", "Bass", "Rosina’s music teacher, who proposes using slander to remove Almaviva."],
      ["Berta", "Mezzo-soprano", "A servant in Bartolo’s household."],
      ["Fiorello", "Baritone", "Almaviva’s servant."],
      ["Ambrogio", "Silent role", "Bartolo’s sleepy servant."],
      ["Officer", "Speaking role", "A cavalry officer who recognizes Almaviva."]
    ]
  },
  characters: ["Figaro", "Rosina", "The Count", "Bartolo", "Basilio", "Berta", "Fiorello", "Ambrogio", "Officer"],
  disguises: {
    "1:13": { "The Count": "disguised as a cavalry soldier" },
    "1:14": { "The Count": "disguised as a cavalry soldier" },
    "1:15": { "The Count": "disguised as a cavalry soldier" },
    "1:16": { "The Count": "disguised as a cavalry soldier" }
  },
  ensembleLabels: {},
  source: "Cesare Sterbini, Il barbiere di Siviglia (1816), Librettidopera.it. Outline types, incipits and divisions checked 14 October 2026 against the act texts and https://www.librettidopera.it/barb_siv/som.html. No numeric labels supplied by this edition. English remains a draft. Acts I–II: https://www.librettidopera.it/barb_siv/a_01.html and https://www.librettidopera.it/barb_siv/a_02.html"
};

const tristan = {
  slug: "tristan-und-isolde",
  threeLineOutline: true,
  sourceSceneOutline: true,
  characterDisplayNames: {"Stimme eines jungen Seemanns": "Young Sailor", "Der Hirt": "Shepherd", "Der Steuermann": "Helmsman", "Stimme Brangänes": "Brangäne", "Marke": "King Marke", "Schiffsvolk": "Ship’s Crew", "Männer": "Men’s Chorus", "Hofleute": "Courtiers", "Frauen": "Women"},
  continuousAct: true,
  opera: getOpera("tristan-und-isolde"),
  composerShort: "R. WAGNER",
  mobileComposer: "Richard Wagner",
  mobileArtworkLabel: "Tristan und Isolde",
  originalLanguage: "Deutsch",
  translationLanguage: "English",
  sceneOriginalPrefix: "Szene",
  stageDirectionSpeaker: "Stage direction",
  speakerTranslations: { "Marke": "King Marke", "Stimme eines jungen Seemanns": "Voice of a Young Sailor", "Der Hirt": "The Shepherd", "Der Steuermann": "The Helmsman", "Stimme Brangänes": "Brangäne’s Voice", "Schiffsvolk": "Ship’s Crew", "Männer": "Men’s Chorus", "Beide": "Both", "Tristan, Isolde, Beide": "Tristan, Isolde, Both" },
  spotifyAlbumUrl: "https://open.spotify.com/album/0EGfzKnX0HmZNYNRCZJC5E",
  spotifyOutline: [{"act":1,"prelude":{"title":"Vorspiel","translation":"Prelude"},"scenes":[{"number":1,"tracks":[{"title":"Westwärts schweift der Blick","translation":"My gaze drifts westward","sourceScene":1}]},{"number":2,"tracks":[{"title":"Frisch weht der Wind","translation":"Freshly the wind blows","sourceScene":2},{"title":"Hab acht, Tristan!","translation":"Take heed, Tristan!","sourceScene":2}]},{"number":3,"tracks":[{"title":"Weh, ach wehe! Dies zu dulden","translation":"Woe, alas! To endure this","sourceScene":3},{"title":"Wie lachend sie mir Lieder singen","translation":"How they sing songs to me with laughter","sourceScene":3},{"title":"Auf! Auf! Ihr Frauen!","translation":"Up! Up! You women!","sourceScene":4}]},{"number":4,"tracks":[{"title":"Herr Tristan trete nah! ... Begehrt, Herrin, was Ihr wünscht","translation":"Lord Tristan, come near! ... Ask what you wish, my lady","sourceScene":4}]},{"number":5,"tracks":[{"title":"War Morold dir so wert","translation":"Was Morold so dear to you?","sourceScene":5},{"title":"Tristan! ... Isolde! ... Treuloser Holder!","translation":"Tristan! ... Isolde! ... Faithless beloved!","sourceScene":5}]}]},{"act":2,"prelude":{"title":"Vorspiel","translation":"Prelude"},"scenes":[{"number":1,"tracks":[{"title":"Hörst du sie noch?","translation":"Do you still hear them?","sourceScene":1}]},{"number":2,"tracks":[{"title":"Isolde! Geliebte! ... Tristan! Geliebter! – Getäuscht von ihm","translation":"Isolde! Beloved! ... Tristan! Beloved! — Deceived by him","sourceScene":2},{"title":"O sink hernieder, Nacht der Liebe","translation":"Descend, O night of love","sourceScene":2},{"title":"Lausch, Geliebter!","translation":"Listen, beloved!","sourceScene":2},{"title":"So stürben wir","translation":"Thus we would die","sourceScene":2}]},{"number":3,"tracks":[{"title":"Rette dich, Tristan!","translation":"Save yourself, Tristan!","sourceScene":3},{"title":"Tatest du’s wirklich?","translation":"Did you really do it?","sourceScene":3},{"title":"O König, das kann ich dir nicht sagen","translation":"O King, I cannot tell you that","sourceScene":3}]}]},{"act":3,"prelude":{"title":"Vorspiel – Hirtenreigen","translation":"Prelude – Shepherds’ dance"},"scenes":[{"number":1,"tracks":[{"title":"Kurwenal! He! Sag, Kurwenal! – Die alte Weise; was weckt sie mich?","translation":"Kurwenal! Hey! Tell me, Kurwenal! — The old tune; what wakes me?","sourceScene":1},{"title":"Wo ich erwacht, weilt ich nicht","translation":"Where I awoke, I did not remain","sourceScene":1},{"title":"Der einst ich trotzt’","translation":"He whom once I defied","sourceScene":1},{"title":"Bist du nun tot?","translation":"Are you dead now?","sourceScene":1},{"title":"O Wonne! Freude!","translation":"O bliss! Joy!","sourceScene":1}]},{"number":2,"tracks":[{"title":"O diese Sonne!","translation":"Oh, this sun!","sourceScene":2},{"title":"Ich bin’s, ich bin’s, süßester Freund!","translation":"It’s me, it’s me, sweetest friend!","sourceScene":2}]},{"number":3,"tracks":[{"title":"Kurwenal! Hör! Ein zweites Schiff","translation":"Kurwenal! Listen! A second ship","sourceScene":3},{"title":"Mild und leise (Isoldes Liebestod)","translation":"Softly and gently (Isolde’s Love-Death)","sourceScene":3}]}]}],
  translatedForms: { Passage: "Passage" },
  acts: [
    { number: 1, originalHeading: "Erster Aufzug", scenes: tristanActOneScenes },
    { number: 2, originalHeading: "Zweiter Aufzug", scenes: tristanActTwoScenes },
    { number: 3, originalHeading: "Dritter Aufzug", scenes: tristanActThreeScenes }
  ],
  sceneOrdinals: ["ERSTE", "ZWEITE", "DRITTE", "VIERTE", "FÜNFTE"],
  synopsis: {
    eyebrow: "Richard Wagner · Musikdrama in drei Aufzügen",
    paragraphs: [
      "Tristan escorts the Irish princess Isolde to Cornwall to marry his uncle, King Marke. Isolde remembers that Tristan killed her former betrothed, Morold, yet she once healed Tristan’s wounds. She asks for a fatal potion, but her companion Brangäne substitutes a love potion.",
      "Their forbidden love is discovered, and Tristan is gravely wounded. He waits for Isolde to return and heal him, but she arrives too late. Wagner’s drama explores a passion that cannot be reconciled with duty, time, or the ordinary world."
    ],
    characters: [
      ["Tristan", "Tenor", "A knight torn between loyalty to King Marke and his love for Isolde."],
      ["Isolde", "Soprano", "An Irish princess promised to King Marke."],
      ["King Marke", "Bass", "Cornwall’s ruler and Tristan’s uncle."],
      ["Brangäne", "Mezzo-soprano", "Isolde’s attendant and confidante."],
      ["Kurwenal", "Baritone", "Tristan’s devoted companion."],
      ["Melot", "Tenor", "A courtier who exposes the lovers."]
    ]
  },
  characters: ["Tristan", "Isolde", "King Marke", "Brangäne", "Kurwenal", "Melot", "Der Hirt", "Der Steuermann", "Schiffsvolk", "Hofleute", "Männer", "Frauen"],
  source: "Richard Wagner, Tristan und Isolde (1859), libretto text and stage direction layout: https://opera-guide.ch/en/operas/tristan+und+isolde/libretto/de/"
};

const macbeth = {
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
  translatedForms: { Introduzione: "Introduction", "Cavatina di Lady Macbeth": "Lady Macbeth’s Cavatina", "Recitativo e Marcia": "Recitative and March", "Scena e Duetto": "Scene and Duet", "Finale Primo": "First Finale", "Scena ed Aria Lady": "Lady Macbeth’s Scene and Aria", "Coro di Sicari": "Chorus of Assassins", "Scena Banco": "Banco’s Scene", "Convito, Visione e Finale Secondo": "Banquet, Vision and Second Finale", "[Ballo e] Coro": "[Ballet and] Chorus", "Recitativo, Apparizoni, Ballabile e Duetto finale": "Recitative, Apparitions, Ballet and Final Duet", Coro: "Chorus", "Scena ed Aria Macduff": "Macduff’s Scene and Aria", "Sonnambulismo di Lady Macbeth": "Lady Macbeth’s Sleepwalking", "Scena, Battaglia, Morte di Macbeth": "Scene, Battle and Death of Macbeth" },
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
      "Three witches foretell that the Scottish general Macbeth will become king. With Lady Macbeth's encouragement, he murders King Duncan and takes the throne, then turns to further violence to protect his power.",
      "As guilt and fear close in, Lady Macbeth is consumed by her actions and forces gather against the tyrant. Verdi's opera adapts Shakespeare's tragedy of ambition, prophecy, and the cost of power."
    ],
    characters: [
      ["Macbeth", "Baritone", "A Scottish general who becomes king."],
      ["Lady Macbeth", "Soprano", "Macbeth's ambitious wife."],
      ["Banco", "Bass", "A general whose descendants are foretold to rule."],
      ["Fleanzio", "Silent role", "Banco's son."],
      ["Tre Streghe", "Chorus", "Three groups of witches who deliver the prophecies."],
      ["Duncano", "Silent role", "King of Scotland."],
      ["Malcolm", "Tenor", "Duncano’s son."],
      ["Macduff", "Tenor", "A Scottish nobleman."]
    ]
  },
  characters: ["Macbeth", "Lady Macbeth", "Banco", "Fleanzio", "Tre Streghe", "Duncano", "Malcolm", "Macduff"],
  source: "Giuseppe Verdi, Macbeth, Italian text and numbered divisions as presented by Opera Guide (accessed 2026-10-15; includes revised passages): https://opera-guide.ch/operas/macbethverdi/libretto/it/"
};

const turandot = {
  slug: "turandot",
  threeLineOutline: true,
  sourceTitlesOnly: true,
  opera: getOpera("turandot"),
  composerShort: "G. PUCCINI",
  mobileComposer: "Giacomo Puccini",
  originalLanguage: "Italiano",
  translationLanguage: "English",
  preserveLineBreaks: true,
  continuousAct: true,
  sceneDivisions: false,
  stageDirectionSpeaker: "Stage direction",
  stageDirectionLabel: "",
  bracketStageDirections: true,
  translatedForms: { Introduzione: "Introduction", Coro: "Chorus", "Marcia funebre": "Funeral March", Scena: "Scene", Aria: "Aria", Arioso: "Arioso", Concertato: "Concerted Ensemble", Terzetto: "Trio", "Interludio, Scena e Inno": "Interlude, Scene and Hymn", Recitativo: "Recitative", "Scena e Aria": "Scene and Aria", "Scena degli Enigmi": "Riddle Scene", "Scena e Inno": "Scene and Hymn", "Introduzione e Romanza": "Introduction and Romance", "Transizione e Aria": "Transition and Aria", Duetto: "Duet", Finale: "Finale" },
  acts: [{ number: 1, originalHeading: "Atto I", scenes: turandotActOneScenes }, { number: 2, originalHeading: "Atto II", scenes: turandotActTwoScenes }, { number: 3, originalHeading: "Atto III", scenes: turandotActThreeScenes }],
  synopsis: {
    eyebrow: "Giacomo Puccini · Opera in three acts",
    paragraphs: [
      "In legendary Peking, Princess Turandot offers marriage to a prince who can answer three riddles; those who fail are executed. Calaf, the son of the exiled king Timur, sees her and resolves to attempt the trial, despite the pleas of his father and the devoted slave Liù.",
      "Calaf answers the riddles, then offers Turandot a challenge of his own: discover his name before dawn. Her search places Timur and Liù in danger. Liù’s sacrifice and Calaf’s love confront the princess with feelings she has long rejected."
    ],
    characters: [
      ["Turandot", "Soprano", "The princess who sets three riddles for her suitors."],
      ["Calaf", "Tenor", "Timur’s son, the unknown prince."],
      ["Liù", "Soprano", "A young slave devoted to Calaf and Timur."],
      ["Timur", "Bass", "A deposed Tartar king, Calaf’s father."],
      ["Ping", "Baritone", "The grand chancellor."],
      ["Pang", "Tenor", "The grand purveyor."],
      ["Pong", "Tenor", "The grand cook."],
      ["Altoum", "Tenor", "The emperor, Turandot’s father."],
      ["Il Mandarino", "Baritone", "The official who announces the law."],
      ["Il Principe di Persia", "Silent role with an offstage cry", "A defeated suitor condemned to death."]
    ]
  },
  characters: ["Turandot", "Calaf", "Liù", "Timur", "Ping", "Pang", "Pong", "Altoum", "Il Mandarino", "Il Principe di Persia"],
  source: "Giuseppe Adami and Renato Simoni, Turandot (1926), complete Italian libretto, Ricordi edition hosted by Teatro Regio Torino: https://www.teatroregio.torino.it/sites/default/files/uploads/inline-files/Turandot%20-%20Libretto.pdf. English: original line-by-line translation. Act III includes the ending completed by Franco Alfano in Arturo Toscanini’s version, printed in grey in the PDF because it was not performed in that production."
};

const figaro = {
  slug: "le-nozze-di-figaro",
  opera: getOpera("le-nozze-di-figaro"),
  composerShort: "W. A. MOZART",
  mobileComposer: "W. A. Mozart",
  mobileArtworkUrl: "./public/images/figaro-art.webp",
  mobileArtworkLabel: "Le nozze di Figaro",
  originalLanguage: "Italiano",
  translationLanguage: "English",
  continuousAct: true,
  preserveLineBreaks: true,
  alignVerseLines: true,
  recitativeLabel: "Recitativo",
  sceneOriginalPrefix: "Scena",
  stageDirectionSpeaker: "Stage direction",
  stageDirectionLabel: "",
  bracketStageDirections: true,
  translatedForms: { Recitativo: "Recitative", "Recitativo ed Aria": "Recitative and aria", Duettino: "Little duet", Cavatina: "Cavatina", Arietta: "Short aria", Aria: "Aria", Terzetto: "Trio", Sestetto: "Sextet", Coro: "Chorus", Finale: "Finale" },
  acts: [
    { number: 1, originalHeading: "Atto primo", scenes: figaroActOneScenes },
    { number: 2, originalHeading: "Atto secondo", scenes: figaroActTwoScenes },
    { number: 3, originalHeading: "Atto terzo", scenes: figaroActThreeScenes },
    { number: 4, originalHeading: "Atto quarto", scenes: figaroActFourScenes }
  ],
  characters: ["Figaro", "Susanna", "Il Conte", "La Contessa", "Cherubino", "Marcellina", "Bartolo", "Basilio", "Don Curzio", "Antonio", "Barbarina"],
  synopsis: {
    eyebrow: "Wolfgang Amadeus Mozart · Opera buffa in four acts",
    paragraphs: [
      "On Figaro and Susanna’s wedding day, Susanna reveals that Count Almaviva is pursuing her. Figaro plans to outwit him, while Marcellina tries to enforce a promise that Figaro will marry her if he cannot repay a debt. Cherubino’s amorous adventures add to the confusion.",
      "Susanna and the neglected Countess arrange disguises and appointments to expose the Count’s jealousy and infidelity. Marcellina’s claim unexpectedly reveals that she and Bartolo are Figaro’s parents, clearing the way for his marriage to Susanna.",
      "That evening, mistaken identities in the garden test trust on every side. The Count finally discovers that the woman he has been courting is his own wife in disguise. He asks her forgiveness, which she grants, and the company celebrates reconciliation."
    ],
    characters: [
      ["Figaro", "Bass-baritone", "The Count’s valet, engaged to Susanna."],
      ["Susanna", "Soprano", "The Countess’s maid and Figaro’s bride."],
      ["Il Conte d’Almaviva", "Baritone", "A Spanish nobleman pursuing Susanna."],
      ["La Contessa d’Almaviva", "Soprano", "The Count’s neglected wife."],
      ["Cherubino", "Mezzo-soprano", "The Count’s young page, played by a woman."],
      ["Marcellina", "Mezzo-soprano", "A former housekeeper who claims Figaro as her husband."],
      ["Bartolo", "Bass", "A doctor from Seville who helps Marcellina."],
      ["Basilio", "Tenor", "The music teacher and the Count’s intermediary."],
      ["Don Curzio", "Tenor", "A judge handling Marcellina’s claim."],
      ["Antonio", "Bass", "The gardener, Susanna’s uncle."],
      ["Barbarina", "Soprano", "Antonio’s daughter."],
      ["Due Contadine", "Soprano and contralto", "Two peasant women."],
      ["Coro", "Chorus", "Peasant men and women."]
    ]
  },
  source: "Lorenzo Da Ponte, Le nozze di Figaro (1786), Italian libretto, all acts from Opera Guide: https://opera-guide.ch/operas/le+nozze+di+figaro/libretto/it/. Accessed 11 October 2026. Acts I–II have editorially reviewed line-aligned English translations. Acts III–IV have line-aligned English drafts that need editorial review."
};

const carmen = {
  slug: "carmen",
  opera: getOpera("carmen"),
  composerShort: "G. BIZET",
  mobileComposer: "Georges Bizet",
  mobileArtworkLabel: "Carmen",
  mobileArtworkUrl: "./public/images/carmen-art.webp",
  originalLanguage: "Français",
  translationLanguage: "English",
  continuousAct: true,
  sceneDivisions: false,
  preserveLineBreaks: true,
  alignVerseLines: true,
  numberLabel: "No.",
  stageDirectionSpeaker: "Stage direction",
  stageDirectionLabel: "Stage direction",
  bracketStageDirections: true,
  speakerTranslations: {
    "CARMEN": "Carmen", "JOSÉ": "José", "MICAËLA": "Micaëla", "MORALES": "Morales",
    "MORALÈS": "Moralès", "ZUNIGA": "Zuniga", "ESCAMILLO": "Escamillo", "PASTIA": "Pastia",
    "LE GUIDE": "The Guide", "LE DANCAÏRE": "Le Dancaïre", "LE DANCAIRE": "Le Dancaïre",
    "LE REMENDADO": "Le Remendado", "CHOEUR": "Chorus", "CHŒUR": "Chorus",
    "CHŒUR DES CIGARIÈRES": "Cigarette makers’ chorus", "CHOEUR DES GAMINS": "Boys’ chorus",
    "LES CIGARIÈRES": "Cigarette makers", "LES JEUNES GENS": "Young men", "LES JEUNES GENS.": "Young men",
    "PREMIER GROUPE": "First group", "PREMIER GROUPE DE FEMMES": "First group of women",
    "DEUXIÈME GROUPE": "Second group", "DEUXIÈME GROUPE DE FEMMES": "Second group of women",
    "UN SOLDAT": "A soldier", "TOUS": "All", "TOUS LES CINQ": "All five", "TOUS LES QUATRE": "All four",
    "TOUTES LES FEMMES": "All the women", "TOUTES LES TROIS": "All three women", "ENFANTS": "Children",
    "ENFANTS et CHOEUR": "Children and chorus", "QUATRE ALGUAZILS": "Four alguazils",
    "UN BOHÉMIEN": "A gypsy", "UN MARCHAND": "A vendor", "PLUSIEURS MARCHANDS": "Several vendors",
    "LES AUTRES MARCHANDS": "Other vendors", "CARMEN et ESCAMILLO": "Carmen and Escamillo",
    "JOSÉ et ESCAMILLO": "José and Escamillo", "MERCEDES.": "Mercédès", "MERCEDES et FRASQUITA": "Mercédès and Frasquita",
    "MERCÉDÈS ET FRASQUITA": "Mercédès and Frasquita", "MERCÉDÈS et FRASQUITA": "Mercédès and Frasquita",
    "FRASQUITA et MERCÉDÈS": "Frasquita and Mercédès", "CARMEN, FRASQUITA et MERCÉDÈS": "Carmen, Frasquita, and Mercédès",
    "FRASQUITA, MERCÉDÈS et CARMEN": "Frasquita, Mercédès, and Carmen",
    "CARMEN, MERCÉDÈS, FRASQUITA et LES FEMMES": "Carmen, Mercédès, Frasquita, and the women",
    "FRASQUITA, MERCÉDÈS, CARMEN et LES FEMMES": "Frasquita, Mercédès, Carmen, and the women",
    "FRASQUITA, MERCÉDÈS, CARMEN, JOSÉ, LE REMENDADO et LE DANCAÏRE": "Frasquita, Mercédès, Carmen, José, Le Remendado, and Le Dancaïre",
    "FRASQUJTA, MERCÉDÈS, LE DANCAÏRE et LE REMENDADO": "Frasquita, Mercédès, Le Dancaïre, and Le Remendado",
    "LE DANCAIRE, LE REMENDADO, FRASQUITA et MERCÉDÈS": "Le Dancaïre, Le Remendado, Frasquita, and Mercédès",
    "LE DANCAÏRE, LE REMENDADO, FRASQUITA et MERCÉDÈS": "Le Dancaïre, Le Remendado, Frasquita, and Mercédès",
    "LE REMENDADO et LE CHOEUR": "Le Remendado and Chorus", "LE REMENDADO et LE DANCAÏRE": "Le Remendado and Le Dancaïre",
    "LE DANCAÏRE et LE REMENDADO": "Le Dancaïre and Le Remendado",
    "LE REMENDADO, LE DANCAÏRE et LES HOMMES": "Le Remendado, Le Dancaïre, and the men",
    "LE REMENDADO et LE DANCAÏRE": "Le Remendado and Le Dancaïre", "MORALES et LE CHOEUR": "Morales and Chorus",
    "LES CIGARIÈRES et LES JEUNES GENS": "Cigarette makers and young men",
    "FRASQUITA, MERCÉDÈS, CARMEN, JOSÉ, LE REMENDADO et LE DANCAÏRE": "Frasquita, Mercédès, Carmen, José, Le Remendado, and Le Dancaïre",
    "LE DANCAÏRE, LE REMENDADO et LES HOMMES": "Le Dancaïre, Le Remendado, and the men"
  },
  translatedForms: {
    "Prélude": "Prelude", "Scène et choeur": "Scene and chorus", "Choeur des gamins": "Boys’ chorus",
    "Mélodrame": "Melodrama", "Dialogue parlé": "Spoken dialogue", "Choeur des cigarières": "Cigarette makers’ chorus",
    "Habanera": "Habanera", "Scène": "Scene", "Duo": "Duet", "Choeur": "Chorus",
    "Chanson et mélodrame": "Song and melodrama", "Séguedille et duo": "Seguidilla and duet",
    "Final": "Finale", "Entracte": "Entr’acte", "Chanson bohème": "Gypsy song", "Couplets": "Verses",
    "Quintette": "Quintet", "Chanson": "Song", "Sextuor et choeur": "Sextet and chorus", "Trio": "Trio",
    "Morceau d'ensemble": "Ensemble piece", "Air": "Aria", "Marche et choeur": "March and chorus",
    "Duo et choeur final": "Duet and final chorus"
  },
  acts: [
    { number: 1, originalHeading: "PREMIER ACTE", scenes: carmenActOneScenes },
    { number: 2, originalHeading: "DEUXIÈME ACTE", scenes: carmenActTwoScenes },
    { number: 3, originalHeading: "TROISIÈME ACTE", scenes: carmenActThreeScenes },
    { number: 4, originalHeading: "QUATRIÈME ACTE", scenes: carmenActFourScenes }
  ],
  characters: ["Carmen", "Don José", "Escamillo", "Micaëla", "Frasquita", "Mercédès", "Zuniga", "Moralès", "Le Dancaïre", "Le Remendado", "Lillas Pastia"],
  synopsis: {
    eyebrow: "Georges Bizet · Opéra-comique in four acts",
    paragraphs: [
      "In Seville, the free-spirited Carmen catches the attention of the soldier Don José. After a fight at the tobacco factory, he lets her escape and is imprisoned. When he meets her again at Lillas Pastia’s tavern, he abandons his regiment and joins Carmen and her smuggler companions.",
      "In the mountains, Carmen’s cards foretell death, while José’s childhood friend Micaëla finds him and asks him to return home. Carmen’s passion turns to the bullfighter Escamillo, and she refuses José’s demand that she leave with him. Outside the bullring, José kills her."
    ],
    characters: [
      ["Carmen", "Mezzo-soprano", "A cigarette factory worker who insists on choosing her own life and lovers."],
      ["Don José", "Tenor", "A soldier whose love for Carmen becomes possessive and violent."],
      ["Escamillo", "Bass-baritone", "A celebrated bullfighter who becomes Carmen’s lover."],
      ["Micaëla", "Soprano", "A young woman from José’s home village, sent by his mother."],
      ["Frasquita", "Soprano", "Carmen’s friend and a member of the smugglers’ group."],
      ["Mercédès", "Mezzo-soprano", "Carmen’s friend and companion."],
      ["Zuniga", "Bass", "José’s commanding officer."],
      ["Moralès", "Baritone", "A corporal in José’s regiment."],
      ["Le Dancaïre", "Baritone", "A smuggler who leads the group."],
      ["Le Remendado", "Tenor", "A smuggler and Dancaïre’s companion."],
      ["Lillas Pastia", "Speaking role", "The tavern keeper whose inn is a smugglers’ meeting place."]
    ]
  },
  source: "Georges Bizet and Henri Meilhac & Ludovic Halévy, Carmen (1875), French libretto and act/number divisions from Opera Guide: https://opera-guide.ch/operas/carmen/libretto/fr/. Accessed 11 October 2026. English is a fresh line-by-line draft."
};

const laBoheme = {
  spotifyAlbumUrl: "https://open.spotify.com/album/5b1dUxE8wWIGTyBX5h8CEp",
  outlineRecording: "Spotify recording",
  slug: "la-boheme",
  opera: getOpera("la-boheme"),
  composerShort: "G. PUCCINI",
  mobileComposer: "Giacomo Puccini",
  mobileArtworkUrl: "./public/images/la-boheme-art.webp",
  mobileArtworkLabel: "La Bohème",
  originalLanguage: "Italiano",
  translationLanguage: "English",
  continuousAct: true,
  preserveLineBreaks: true,
  alignVerseLines: true,
  sceneDivisions: false,
  stageDirectionSpeaker: "Stage direction",
  stageDirectionLabel: "Stage direction",
  bracketStageDirections: true,
  acts: [
    { number: 1, originalHeading: "Quadro primo", scenes: laBohemeActOneScenes },
    { number: 2, originalHeading: "Quadro secondo", scenes: laBohemeActTwoScenes },
    { number: 3, originalHeading: "Quadro terzo", scenes: laBohemeActThreeScenes },
    { number: 4, originalHeading: "Quadro quarto", scenes: laBohemeActFourScenes }
  ],
  characters: ["Mimì", "Rodolfo", "Marcello", "Schaunard", "Colline", "Benoît"],
  synopsis: {
    eyebrow: "Giacomo Puccini · Opera in four tableaux",
    paragraphs: [
      "On Christmas Eve in a cold Paris garret, the poet Rodolfo and painter Marcello burn a manuscript to keep warm. Their friends Schaunard and Colline arrive with food and money, and the four set out for the Café Momus. Rodolfo stays behind to finish an article. Their neighbor Mimì knocks because her candle has gone out. When both their lights fail, Rodolfo finds her hand in the darkness. They introduce themselves, share their hopes, and fall in love.",
      "The next tableau takes place in the crowded Latin Quarter. Rodolfo and Mimì meet their friends for dinner at the Café Momus. Musetta arrives with Alcindoro and sings to win Marcello’s attention. She succeeds, escapes with the Bohemians as a military retreat passes, and leaves Alcindoro to pay the bill.",
      "At the Barrière d’Enfer in the last days of winter, Mimì asks Marcello for help with Rodolfo. Rodolfo confesses that he loves her but fears her illness and their poverty. The lovers sing of parting when spring comes, while Marcello and Musetta quarrel and separate.",
      "Back in the garret, Rodolfo and Marcello pretend to work while longing for Mimì and Musetta. Schaunard and Colline join them for a comic interlude, but the mood changes when Musetta brings the gravely ill Mimì. Their friends try to comfort her; Mimì dies as Rodolfo calls her name."
    ]
  },
  source: "Giacomo Puccini, La bohème (1896), Italian libretto by Luigi Illica and Giuseppe Giacosa, text and divisions from Teatro alla Scala's libretto PDF: https://www.teatroallascala.org/static/upload/la-/la-boheme-libretto.pdf. English is a fresh line-by-line translation. Each completed tableau is presented continuously, one page per tableau."
};

const madamaButterfly = {
  slug: "madama-butterfly",
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
  bracketStageDirections: true,
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
  source: "Italian libretto and stage directions: Opera Guide, Madama Butterfly, Atti primo, secondo, and terzo: https://opera-guide.ch/operas/madama+butterfly/libretto/it/. The Spotify recording linked by the user guides the section outline. English is a fresh line-by-line draft checked against Lyrical Opera Theater’s independent bilingual libretto: https://lyricaloperatheater.com/PDFs/MadamaButterfly_libretto_translation.pdf; it remains for the user’s careful review. The opera is presented in three acts. Acts I, II, and III are populated in this update."
};

const toscaTrack = (title, translation, sourceScene) => ({ title, translation, sourceScene });
const toscaSpotifyOutline = [
  { act: 1, scenes: [
    { number: 1, tracks: [toscaTrack('Ah! Finalmente! Nel terror mio stolto', 'Ah! At last! In my stupid fear', 1)] },
    { number: 2, tracks: [toscaTrack('E sempre lava!', 'Forever washing!', 2)] },
    { number: 3, tracks: [
      toscaTrack('Sante ampolle! Il suo ritratto!', 'Holy vessels! His portrait!', 3),
      toscaTrack('Dammi i colori! … Recondita armonia', 'Give me my paints! … Hidden harmony', 3)
    ] },
    { number: 4, tracks: [toscaTrack('Gente là dentro!', 'Someone is in there!', 4)] },
    { number: 5, tracks: [
      toscaTrack('Mario! Mario! Mario! … Son qui!', 'Mario! Mario! Mario! … Here I am!', 5),
      toscaTrack('Ora stammi a sentir', 'Now listen to me', 5),
      toscaTrack('Or lasciami al lavoro', 'Now let me get back to work', 5),
      toscaTrack('Ah, quegli occhi…', 'Ah, those eyes…', 5),
      toscaTrack('Mia gelosa!', 'My jealous one!', 5)
    ] },
    { number: 6, tracks: [toscaTrack('È buona la mia Tosca', 'My Tosca is good', 6)] },
    { number: 7, tracks: [toscaTrack('Sommo giubilo, Eccellenza!', 'Great rejoicing, Your Excellency!', 7)] },
    { number: 8, tracks: [toscaTrack('Un tal baccano in chiesa!', 'Such a commotion in the church!', 8)] },
    { number: 9, tracks: [
      toscaTrack('Tosca? Che non mi veda', 'Tosca? She must not see me', 9),
      toscaTrack('Ed io venivo a lui tutta dogliosa', 'And I came to him, full of sorrow', 9),
      toscaTrack('Tre sbirri, una carrozza', 'Three police officers, a carriage', 9)
    ] }
  ] },
  { act: 2, scenes: [
    { number: 1, tracks: [
      toscaTrack('Tosca è un buon falco!', 'Tosca is a fine hawk!', 1),
      toscaTrack('Ha più forte sapore', 'It has a stronger flavor', 1)
    ] },
    { number: 2, tracks: [
      toscaTrack('O galantuomo, come andò la caccia?', 'Oh, gallant man, how goes the hunt?', 2),
      toscaTrack('Meno male!', 'Thank goodness!', 2)
    ] },
    { number: 3, tracks: [toscaTrack("Dov'è Angelotti?", 'Where is Angelotti?', 3)] },
    { number: 4, tracks: [
      toscaTrack('Ed or fra noi parliam da buoni amici', 'And now let us speak as good friends', 4),
      toscaTrack('Sciarrone, che dice il Cavalier?', 'Sciarrone, what does the Cavalier say?', 4),
      toscaTrack('Orsù, Tosca, parlate', 'Come now, Tosca, speak', 4),
      toscaTrack('Floria! … Amore', 'Floria! … My love!', 4)
    ] },
    { number: 5, tracks: [
      toscaTrack('Salvatelo! … Io? Voi!', 'Save him! … Me? You!', 5),
      toscaTrack('Se la giurata fede debbo tradir', 'If I must betray my sworn faith', 5),
      toscaTrack('Come tu mi odi!', 'How you hate me!', 5),
      toscaTrack("Vissi d'arte, vissi d'amore", 'I lived for art, I lived for love', 5),
      toscaTrack('Vedi, le man giunte io stendo a te!', 'See, I stretch my folded hands to you!', 5),
      toscaTrack('Io tenni la promessa', 'I kept my promise', 5),
      toscaTrack('Tosca, finalmente mia!', 'Tosca, mine at last!', 5),
      toscaTrack('Or gli perdono!', 'Now I forgive him!', 5)
    ] }
  ] },
  { act: 3, scenes: [
    { number: 1, tracks: [
      toscaTrack("Introduction (Andante sostenuto) - Io de' sospiri", 'Introduction (Andante sostenuto) — I sigh…so much!', 1),
      toscaTrack('Le campane suonano mattutino (Lento)', 'The bells ring for matins (Lento)', 1)
    ] },
    { number: 2, tracks: [
      toscaTrack('Mario Cavaradossi? A voi.', 'Mario Cavaradossi? For you.', 2),
      toscaTrack('E lucevan le stelle', 'And the stars were shining', 2)
    ] },
    { number: 3, tracks: [
      toscaTrack('Moderato con moto - Ah! Franchigia a Floria Tosca', 'Moderately, with motion — Ah! Safe passage for Floria Tosca', 3),
      toscaTrack('O dolci mani mansuete e pure', 'Oh, sweet, gentle, pure hands', 3),
      toscaTrack("Senti, l'ora è vicina", 'Listen, the hour is near', 3),
      toscaTrack("Amaro sol per te m'era il morire", 'Only for you was death bitter to me', 3),
      toscaTrack('E non giungono', 'They are not coming', 3)
    ] },
    { number: 4, title: 'Scena ultima', translatedTitle: 'Last Scene', tracks: [
      toscaTrack("Com'è lunga l'attesa!", 'How long the waiting is!', 4),
      toscaTrack('Presto! Su, Mario!', 'Quick! Up, Mario!', 4)
    ] }
  ] }
];

const tosca = {
  spotifyAlbumUrl: "https://open.spotify.com/album/6ulb4DNzatXOL88B4Zr0oo",
  outlineRecording: "Tosca · 1953 recording",
  spotifyOutline: toscaSpotifyOutline,
  slug: "tosca",
  continuousAct: true,
  preserveLineBreaks: true,
  alignVerseLines: true,
  opera: getOpera("tosca"),
  composerShort: "G. PUCCINI",
  mobileComposer: "Giacomo Puccini",
  mobileArtworkUrl: "./public/images/tosca-art.webp",
  mobileArtworkLabel: "Tosca",
  originalLanguage: "Italiano",
  translationLanguage: "English",
  sceneOriginalPrefix: "Scena",
  stageDirectionSpeaker: "Stage direction",
  stageDirectionLabel: "Stage direction",
  bracketStageDirections: true,
  sceneOrdinals: ["PRIMA", "SECONDA", "TERZA", "QUARTA", "QUINTA", "SESTA", "SETTIMA", "OTTAVA", "NONA"],
  acts: [
    { number: 1, originalHeading: "Atto primo", scenes: toscaActOneScenes },
    { number: 2, originalHeading: "Atto secondo", scenes: toscaActTwoScenes },
    { number: 3, originalHeading: "Atto terzo", scenes: toscaActThreeScenes }
  ],
  characters: ["Floria Tosca", "Mario Cavaradossi", "Baron Scarpia", "Cesare Angelotti", "The Sacristan", "Spoletta", "Sciarrone", "Jailer", "A Shepherd", "Chorus"],
  characterDisplayNames: { Tosca: "Floria Tosca", Cavaradossi: "Mario Cavaradossi", Scarpia: "Baron Scarpia", Angelotti: "Cesare Angelotti", "Tosca's voice": "Floria Tosca (offstage)", "A Shepherd (offstage)": "A Shepherd" },
  source: "Italian libretto, character names, and scene divisions for Acts I–III: Opera Guide, Tosca, https://opera-guide.ch/operas/tosca/libretto/it/. English is a fresh line-by-line draft checked against Lyrical Opera Theater's Italian-English libretto, https://lyricaloperatheater.com/PDFs/Tosca-libretto_English-Italian_2022.pdf; it remains for the user's careful review. The Spotify recording linked at the foot of the outline guides only the track order and scene grouping. Acts I–III are populated."
};

const completeLibretti = { [cosi.slug]: cosi, [barbiere.slug]: barbiere, [tristan.slug]: tristan, [macbeth.slug]: macbeth, [turandot.slug]: turandot, [figaro.slug]: figaro, [carmen.slug]: carmen, [laBoheme.slug]: laBoheme, [madamaButterfly.slug]: madamaButterfly, [tosca.slug]: tosca };
export function getLibretto(slug) {
  return completeLibretti[slug] || null;
}
export const librettoCatalog = Object.values(completeLibretti);


