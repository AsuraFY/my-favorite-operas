// This opera's metadata and act modules load only when its page is visited.
import { getOpera } from "./operas.js?v=tosca-act1-2";
import { toscaActOneScenes } from "./libretto-tosca-act-1.js?v=tosca-anchor-audit-20261023";
import { toscaActTwoScenes } from "./libretto-tosca-act-2.js?v=tosca-review-20261020";
import { toscaActThreeScenes } from "./libretto-tosca-act-3.js?v=tosca-review-20261020";

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

export const tosca = {
  spotifyAlbumUrl: "https://open.spotify.com/album/6ulb4DNzatXOL88B4Zr0oo",
  albums: [{ name: "Puccini : Tosca", url: "https://open.spotify.com/album/6ulb4DNzatXOL88B4Zr0oo" }],
  spotifyOutline: toscaSpotifyOutline,
  slug: "tosca",
  bilingualActOutlineHeading: true,
  continuousAct: true,
  sourceSceneOutline: true,
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
  bracketStageDirections: false,
  originalSpeakerNames: { "The Sacristan": "Il Sagrestano", "Baron Scarpia": "Il Barone Scarpia", "Jailer": "Carceriere", "A Shepherd (offstage)": "Un pastorello (interno)", "Tosca's voice": "Voce di Tosca", "Cavaradossi (offstage)": "Cavaradossi (interno)", "Tosca and the Chorus": "Tosca e coro", "Tosca and Cavaradossi": "Tosca e Cavaradossi", "Spoletta and Sciarrone": "Spoletta e Sciarrone", "Voices offstage": "Voci interne", "The Chapter": "Il Capitolo", "The Crowd": "La Folla", "All": "Tutti", "Choirboys": "Chierici" },
  sceneOrdinals: ["PRIMA", "SECONDA", "TERZA", "QUARTA", "QUINTA", "SESTA", "SETTIMA", "OTTAVA", "NONA"],
  acts: [
    { number: 1, originalHeading: "Atto primo", scenes: toscaActOneScenes },
    { number: 2, originalHeading: "Atto secondo", scenes: toscaActTwoScenes },
    { number: 3, originalHeading: "Atto terzo", scenes: toscaActThreeScenes }
  ],
  characters: ["Floria Tosca", "Mario Cavaradossi", "Baron Scarpia", "Cesare Angelotti", "The Sacristan", "Spoletta", "Sciarrone", "Jailer", "A Shepherd", "Chorus"],
  characterDisplayNames: { Tosca: "Floria Tosca", Cavaradossi: "Mario Cavaradossi", Scarpia: "Baron Scarpia", Angelotti: "Cesare Angelotti", "Tosca's voice": "Floria Tosca", "Cavaradossi (offstage)": "Mario Cavaradossi", "Crowd": "Crowd", "The Crowd": "Crowd", "A Shepherd (offstage)": "A Shepherd" },
  source: "Italian libretto, character names, and scene divisions for Acts I–III: Opera Guide, Tosca, https://opera-guide.ch/operas/tosca/libretto/it/. Italian–English wording and line pairing reviewed on 20 October 2026. Restored missing replies and dialogue order; separated sung asides from short cues and long directions. The earlier English draft consulted https://lyricaloperatheater.com/PDFs/Tosca-libretto_English-Italian_2022.pdf. Musical types are editorial listening labels; no score numbers are inferred. Browser visual verification remains pending. The Spotify recording linked at the foot of the outline guides only the track order and scene grouping. Acts I–III are populated."
};

// Use the actual sung participants for each Tosca passage, including joint cues.
function toscaParticipants(turns, act, scene) {
  const names = turns.filter(turn => turn.speaker !== "Stage direction").flatMap(turn => {
    if (turn.speaker === "Tosca and the Chorus") return ["Tosca", "Chorus"];
    if (turn.speaker === "Tosca and Cavaradossi") return ["Tosca", "Cavaradossi"];
    if (turn.speaker === "Spoletta and Sciarrone") return ["Spoletta", "Sciarrone"];
    if (turn.speaker === "All") return act === 1 && scene === 7 ? ["Choirboys"] : ["Scarpia", "Chorus"];
    return [turn.speaker];
  }).map(name => tosca.characterDisplayNames?.[name] || name);
  return [...new Set(names)];
}
for (const act of tosca.acts) for (const scene of act.scenes) {
  for (const section of scene.sections) section.participants = toscaParticipants(section.turns, act.number, scene.number);
  const turns = scene.sections.flatMap(section => section.turns);
  for (const [index, entry] of scene.outline.entries()) {
    const start = turns.findIndex(turn => turn.original.includes(entry.match));
    const next = scene.outline[index + 1];
    const end = next ? turns.findIndex((turn, position) => position > start && turn.original.includes(next.match)) : turns.length;
    entry.characters = toscaParticipants(turns.slice(start, end), act.number, scene.number);
    if (!entry.characters.length && act.number === 3 && scene.number === 1) entry.characters = ["Jailer", "Sentinel", "Sergeant", "Soldiers", "Mario Cavaradossi"];
  }
}

