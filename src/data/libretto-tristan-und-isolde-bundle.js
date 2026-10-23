// This opera's metadata and act modules load only when its page is visited.
import { getOpera } from "./operas.js?v=tosca-act1-2";
import { tristanActOneScenes } from "./libretto-tristan-und-isolde-act-1.js?v=tristan-outline-1";
import { tristanActTwoScenes } from "./libretto-tristan-und-isolde-act-2.js?v=tristan-outline-1";
import { tristanActThreeScenes } from "./libretto-tristan-und-isolde-act-3.js?v=tristan-outline-1";

export const tristan = {
  slug: "tristan-und-isolde",
  albums: [{ name: "Wagner: Tristan und Isolde", url: "https://open.spotify.com/album/0EGfzKnX0HmZNYNRCZJC5E" }],
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

