// Data registry for complete libretti; the reader UI consumes this shape for every opera.
// Original Così dialogue stays in the existing act files, unchanged.
import { getOpera } from "./operas.js?v=opera-art-2";
import { cosiActOneScenes } from "./libretti.js?v=cosi-libretto-2";
import { cosiActTwoScenes } from "./libretti-act2.js?v=act2-18";
import { barbiereActOneScenes } from "./libretti-barbiere-act1.js?v=barbiere-act1-2";
import { barbiereActTwoScenes } from "./libretti-barbiere-act2.js?v=barbiere-act2-2";
import { tristanActOneScenes } from "./libretti-tristan-act1.js?v=tristan-act1-5";
import { tristanActTwoScenes } from "./libretti-tristan-act2.js?v=tristan-act2-8";
import { tristanActThreeScenes } from "./libretti-tristan-act3.js?v=tristan-act3-5";
import { macbethActOneScenes } from "./libretti-macbeth-act1.js?v=macbeth-act1-3";

import { macbethActTwoScenes } from "./libretti-macbeth-act2.js?v=macbeth-act2-1";

import { macbethActThreeScenes } from "./libretti-macbeth-act3.js?v=macbeth-act3-1";

import { macbethActFourScenes } from "./libretti-macbeth-act4.js?v=macbeth-act4-1";
import { turandotActOneScenes } from "./libretti-turandot-act1.js?v=turandot-act1-1";
import { turandotActTwoScenes } from "./libretti-turandot-act2.js?v=turandot-act2-1";
import { turandotActThreeScenes } from "./libretti-turandot-act3.js?v=turandot-act3-1";

import { figaroActOneScenes } from "./libretti-figaro-act1.js?v=figaro-act1-1";

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

const barbiere = {
  slug: "il-barbiere-di-siviglia",
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
  ensembleLabels: { "The Count and Figaro": "The Count & Figaro", "All": "Ensemble", Chorus: "Chorus" },
  source: "Cesare Sterbini, Il barbiere di Siviglia (1816), Act I; public-domain Italian text, Acts I–II: https://www.librettidopera.it/barb_siv/a_01.html and https://www.librettidopera.it/barb_siv/a_02.html"
};

const tristan = {
  slug: "tristan-und-isolde",
  continuousAct: true,
  opera: getOpera("tristan-und-isolde"),
  composerShort: "R. WAGNER",
  mobileComposer: "Richard Wagner",
  mobileArtworkLabel: "Tristan und Isolde",
  originalLanguage: "Deutsch",
  translationLanguage: "English",
  sceneOriginalPrefix: "Szene",
  stageDirectionSpeaker: "Stage direction",
  speakerTranslations: { "Stimme eines jungen Seemanns": "Voice of a Young Sailor", "Der Hirt": "The Shepherd", "Der Steuermann": "The Helmsman", "Stimme Brangänes": "Brangäne’s Voice", "Schiffsvolk": "Ship’s Crew", "Männer": "Men’s Chorus", "Beide": "Both", "Tristan, Isolde, Beide": "Tristan, Isolde, Both" },
  spotifyAlbumUrl: "https://open.spotify.com/album/0EGfzKnX0HmZNYNRCZJC5E",
  spotifyOutline: [{"act":1,"prelude":{"title":"Prelude","translation":"Vorspiel"},"scenes":[{"number":1,"tracks":[{"title":"Westwärts schweift der Blick","translation":"My gaze drifts westward","sourceScene":1}]},{"number":2,"tracks":[{"title":"Frisch weht der Wind","translation":"Freshly the wind blows","sourceScene":2},{"title":"Hab acht, Tristan!","translation":"Take heed, Tristan!","sourceScene":2}]},{"number":3,"tracks":[{"title":"Weh, ach wehe! Dies zu dulden","translation":"Woe, alas! To endure this","sourceScene":3},{"title":"Wie lachend sie mir Lieder singen","translation":"How they sing songs to me with laughter","sourceScene":3},{"title":"Auf! Auf! Ihr Frauen!","translation":"Up! Up! You women!","sourceScene":4}]},{"number":4,"tracks":[{"title":"Herr Tristan trete nah! ... Begehrt, Herrin, was Ihr wünscht","translation":"Lord Tristan, come near! ... Ask what you wish, my lady","sourceScene":4}]},{"number":5,"tracks":[{"title":"War Morold dir so wert","translation":"Was Morold so dear to you?","sourceScene":5},{"title":"Tristan! ... Isolde! ... Treuloser Holder!","translation":"Tristan! ... Isolde! ... Faithless beloved!","sourceScene":5}]}]},{"act":2,"prelude":{"title":"Prelude","translation":"Vorspiel"},"scenes":[{"number":1,"tracks":[{"title":"Hörst du Sie noch?","translation":"Do you still hear them?","sourceScene":1}]},{"number":2,"tracks":[{"title":"Isolde! Geliebte! ... Tristan! Geliebter! – Getäuscht von ihm","translation":"Isolde! Beloved! ... Tristan! Beloved! — Deceived by him","sourceScene":2},{"title":"O sink hernieder, Nacht der Liebe","translation":"Descend, O night of love (Love Duet, Part 1)","sourceScene":2},{"title":"Lausch, Geliebter!","translation":"Listen, beloved! (Love Duet, Part 2)","sourceScene":2},{"title":"So starben wir","translation":"Thus we died (Love Duet, Part 3)","sourceScene":2}]},{"number":3,"tracks":[{"title":"Rette dich, Tristan!","translation":"Save yourself, Tristan!","sourceScene":3},{"title":"Tatest du’s wirklich?","translation":"Did you really do it?","sourceScene":3},{"title":"O König, das kann ich dir nicht sagen","translation":"O King, I cannot tell you that","sourceScene":3}]}]},{"act":3,"prelude":{"title":"Prelude – Hirtenreigen","translation":"Vorspiel – Shepherds’ dance"},"scenes":[{"number":1,"tracks":[{"title":"Kurwenal! He! Sag, Kurwenal! – Die alte Weise; was weckt sie mich?","translation":"Kurwenal! Hey! Tell me, Kurwenal! — The old tune; what wakes me?","sourceScene":1},{"title":"Wo ich erwacht, weilt ich nicht","translation":"Where I awoke, I did not remain","sourceScene":1},{"title":"Der einst ich trotzt’","translation":"He whom once I defied","sourceScene":1},{"title":"Bist du nun tot?","translation":"Are you dead now?","sourceScene":1},{"title":"O Wonne! Freude!","translation":"O bliss! Joy!","sourceScene":1}]},{"number":2,"tracks":[{"title":"O diese Sonne!","translation":"Oh, this sun!","sourceScene":2},{"title":"Ich bin’s, ich bin’s, süßester Freund!","translation":"It’s me, it’s me, sweetest friend!","sourceScene":2}]},{"number":3,"tracks":[{"title":"Kurwenal! Hör! Ein zweites Schiff","translation":"Kurwenal! Listen! A second ship","sourceScene":3},{"title":"Mild und leise (Isoldes Liebestod)","translation":"Softly and gently (Isolde’s Love-Death)","sourceScene":3}]}]}],
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
    prelude: { title: "N. 1 - Preludio", translation: "No. 1 - Prelude" },
    scenes: macbethActOneScenes
  }, {
    number: 2,
    originalHeading: "Atto secondo",
    scenes: macbethActTwoScenes
  }, {
    number: 3,
    originalHeading: "Atto terzo",
    scenes: macbethActThreeScenes
  }, {
    number: 4,
    originalHeading: "Atto quarto",
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
  source: "Giuseppe Verdi, Macbeth (1847), Italian libretto and source divisions: https://opera-guide.ch/operas/macbethverdi/libretto/it/"
};

const turandot = {
  slug: "turandot",
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
  translatedForms: { Recitativo: "Recitative", Duettino: "Little duet", Cavatina: "Cavatina", Aria: "Aria", Terzetto: "Trio", Coro: "Chorus" },
  acts: [{ number: 1, originalHeading: "Atto primo", prelude: { title: "Ouverture", translation: "Overture" }, scenes: figaroActOneScenes }],
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
  source: "Lorenzo Da Ponte, Le nozze di Figaro (1786), Italian libretto, Act I from Opera Guide: https://opera-guide.ch/operas/le+nozze+di+figaro/libretto/it/. Accessed 11 October 2026. Original English translation aligned with the source verse lines. Acts II–IV are not prepared yet."
};

const completeLibretti = { [cosi.slug]: cosi, [barbiere.slug]: barbiere, [tristan.slug]: tristan, [macbeth.slug]: macbeth, [turandot.slug]: turandot, [figaro.slug]: figaro };
export function getLibretto(slug) {
  return completeLibretti[slug] || null;
}
export const librettoCatalog = Object.values(completeLibretti);
