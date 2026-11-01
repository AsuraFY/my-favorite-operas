import test from "node:test";
import assert from "node:assert/strict";
import { dieZauberflote } from "../src/data/libretto-die-zauberflote-bundle.js?v=zauberflote-outline-20261026";
import { createLibrettoRenderer } from "../src/libretto-reader.js";
import { resetReaderLocation } from "./helpers/libretto-helpers.mjs";

const expected = [
  [1, "Introduktion", "Zu Hülfe! zu Hülfe!", "Help! Help!", "Tamino"],
  [2, "Arie", "Der Vogelfänger bin ich ja", "I am the birdcatcher, yes indeed", "Papageno"],
  [3, "Arie", "Dies Bildnis ist bezaubernd schön", "This portrait is enchantingly beautiful", "Tamino"],
  [4, "Rezitativ und Arie", "O zittre nicht, mein lieber Sohn!", "Oh, do not tremble, my dear son!", "Queen of the Night"],
  [5, "Quintett", "Hm! Hm! Hm! Hm!", "Hmm! Hmm! Hmm! Hmm!", "Three Ladies"],
  [6, "Terzett", "Du feines Täubchen, nur herein!", "Come in, pretty little dove!", "Monostatos"],
  [7, "Duett", "Bey Männern, welche Liebe fühlen", "In men who feel love", "Pamina"],
  [8, "Finale", "Zum Ziele führt dich diese Bahn", "This path will lead you to your goal", "Sarastro"],
  [9, "Marsch der Priester", null, "March of the Priests", null],
  [10, "Arie mir Chor", "O Isis und Osiris", "O Isis and Osiris", "Chorus"],
  [11, "Duett", "Bewahret euch vor Weibertücken", "Guard yourselves against women's wiles", "Speaker"],
  [12, "Quintett", "Wie? Wie? Wie?", "What? What? What?", "Three Ladies"],
  [13, "Arie", "Alles fühlt der Liebe Freuden", "All feel the joys of love", "Monostatos"],
  [14, "Arie", "Der Hölle Rache kocht in meinem Herzen", "Hell's vengeance boils within my heart", "Queen of the Night"],
  [15, "Arie", "In diesen heil'gen Hallen", "Within these sacred halls", "Sarastro"],
  [16, "Terzett", "Seyd uns zum zweytenmal willkommen", "Welcome once again", "Three Boys"],
  [17, "Arie", "Ach, ich fühl's, es ist verschwunden", "Ah, I feel it—it has vanished", "Pamina"],
  [18, "Chor der Priester", "O Isis und Osiris, welche Wonne!", "O Isis and Osiris, what bliss!", "Priest Chorus"],
  [19, "Terzett", "Soll ich dich, Theurer! nicht mehr seh'n?", "Shall I see you no more, dearest?", "Pamina"],
  [20, "Arie", "Ein Mädchen oder Weibchen", "A maiden or a little wife", "Papageno"],
  [21, "Finale", "Bald prangt, den Morgen zu verkünden", "Soon it will gleam to herald the morning", "Papagena"],
];

test("all 21 numbered musical sections carry the agreed source incipits, translations, and credits", () => {
  const sections = dieZauberflote.acts.flatMap(act => act.scenes.flatMap(scene => scene.sections)).filter(section => section.number != null);
  assert.equal(sections.length, 21);
  expected.forEach(([number, form, original, translated, participant], index) => {
    const section=sections[index];
    assert.equal(section.number, number);
    assert.equal(section.displayType || section.type, form === "Arie mir Chor" ? "Arie mit Chor" : form);
    if(original) assert.equal(section.originalTitle, original);
    else assert.equal(section.originalTitle, undefined);
    assert.equal(section.translatedTitle ?? section.headingTranslation, translated);
    if(participant) assert.ok(section.participants.includes(participant), "Missing "+participant+" for No. "+number);
  });
});

test("both acts' outline presents original headings, English lines and character credits", () => {
  resetReaderLocation();
  const outline=createLibrettoRenderer(dieZauberflote).outline();
  for(const [, ,original,translated] of expected){
    if(original)assert.ok(outline.includes(original.replaceAll("&","&amp;").replaceAll("'","&#39;")), original);
    assert.ok(outline.includes(translated.replaceAll("&","&amp;").replaceAll("'","&#39;")), translated);
  }
  assert.ok(outline.includes('class="libretto-participants"'));
  assert.ok(outline.includes("Wenn Tugend und Gerechtigkeit"));
  assert.ok(outline.includes("Schnelle Füsse, rascher Muth"));
  assert.ok(outline.includes("Pa - Pa - Pa - Pa - Pa - Pa - Papagena!"));
  assert.ok(outline.includes("?act=1"));
  assert.ok(outline.includes("?act=2"));
});
