import test from "node:test";
import assert from "node:assert/strict";
import { dieZauberflote } from "../src/data/libretto-die-zauberflote-bundle.js?v=zauberflote-acts1-2-20261026";
import { getLibretto } from "../src/data/libretto-registry.js";
import { loadLibretto } from "../src/data/libretto-loader.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";
import { resetReaderLocation } from "./helpers/libretto-helpers.mjs";

test("Act II retains thirty Opera Guide scenes and source numbers 9–21", async () => {
  assert.deepEqual(dieZauberflote.acts.map(a=>a.number),[1,2]);
  const scenes=dieZauberflote.acts[1].scenes;
  assert.deepEqual(scenes.map(s=>s.number),Array.from({length:30},(_,i)=>i+1));
  const sections=scenes.flatMap(s=>s.sections);
  assert.deepEqual(sections.filter(s=>s.number!==undefined).map(s=>s.number),
    Array.from({length:13},(_,i)=>i+9));
  const turns=sections.flatMap(s=>s.turns);
  assert.ok(turns.length>150);
  let counted=0;
  for(const turn of turns){
    assert.ok(turn.original?.trim());
    assert.ok(turn.translation?.trim());
    assert.equal(turn.original.split("\n").length,turn.translation.split("\n").length,
      "Each source line must have one English draft line");
    counted+=turn.original.split("\n").length;
  }
  assert.ok(counted>=700);
  assert.ok(turns.some(t=>t.speakerTranslation==="Queen of the Night"));
  assert.ok(turns.some(t=>t.speakerTranslation==="Papageno"));
  assert.ok(turns.some(t=>t.speaker==="Stage direction"));
  assert.strictEqual(getLibretto("the-magic-flute"),dieZauberflote);
  assert.strictEqual(await loadLibretto("the-magic-flute"),dieZauberflote);
});

test("Act II is available in the bilingual reader and full-opera outline",()=>{
  resetReaderLocation();
  window.location.hash="#/operas/the-magic-flute?act=2";
  const reader=createLibrettoRenderer(dieZauberflote);
  const html=reader.scene(1);
  assert.ok(html.includes("ZWEITER AKT")||html.includes("Zweiter Akt"));
  assert.ok(html.includes("End of Act II"));
  assert.ok(html.includes("Stage direction"));
  const outline=reader.outline();
  assert.ok(outline.includes("?act=1"));
  assert.ok(outline.includes("?act=2"));
  assert.ok(outline.includes("Auftritt"));
});
