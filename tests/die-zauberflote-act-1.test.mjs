import test from "node:test";
import assert from "node:assert/strict";
import {dieZauberflote} from "../src/data/libretto-die-zauberflote-bundle.js?v=zauberflote-act1-20261026";
import {hasCompleteLibretto,loadLibretto} from "../src/data/libretto-loader.js";
import {createLibrettoRenderer} from "../src/libretto-reader.js";
import {resetReaderLocation} from "./helpers/libretto-helpers.mjs";

test("Die Zauberflöte Act I follows all 19 Opera Guide source Auftritte and numbers 1–8", async()=>{
  assert.equal(dieZauberflote.acts.length,1, "Act II is not yet populated");
  assert.equal(dieZauberflote.opera.acts,2);
  assert.deepEqual(dieZauberflote.acts[0].scenes.map(scene=>scene.number),
    Array.from({length:19},(_,i)=>i+1));
  const sections=dieZauberflote.acts[0].scenes.flatMap(s=>s.sections);
  assert.deepEqual(sections.filter(s=>s.number!=null).map(s=>s.number),
    Array.from({length:8},(_,i)=>i+1));
  const turns=sections.flatMap(s=>s.turns);
  assert.ok(turns.length>100);
  let lines=0;
  for (const turn of turns){
    assert.ok(turn.original?.trim(),"no missing source text");
    assert.ok(turn.translation?.trim(),"no missing English draft");
    assert.equal(turn.original.split("\n").length,turn.translation.split("\n").length,
       "German/English printed lines must remain paired");
    lines+=turn.original.split("\n").length;
  }
  assert.ok(lines>=400,"do not silently truncate Act I");
  assert.ok(turns.some(t=>t.speaker==="Stage direction"));
  assert.ok(turns.some(t=>t.speaker==="TAMINO"&&t.speakerTranslation==="Tamino"));
  assert.ok(turns.some(t=>t.speaker==="KÖNIGINN"&&t.speakerTranslation==="Queen of the Night"));
  assert.ok(dieZauberflote.source.includes("NOT been editorially reviewed"));
  assert.ok(hasCompleteLibretto("the-magic-flute"));
  assert.strictEqual(await loadLibretto("the-magic-flute"),dieZauberflote);
});

test("Die Zauberflöte first-act outline, bilingual reader and anchors render",()=>{
  resetReaderLocation();
  const reader=createLibrettoRenderer(dieZauberflote);
  window.location.hash="#/operas/the-magic-flute?act=1";
  const page=reader.scene(1);
  assert.ok(page.includes("ERSTER AKT")||page.includes("Erster Akt"));
  assert.ok(page.includes("Stage direction"));
  assert.ok(page.includes("Tamino"));
  assert.ok(page.includes("End of Act I"));
  const outline=reader.outline();
  assert.ok(outline.includes("Auftritt"));
  assert.ok(outline.includes("#/operas/the-magic-flute?act=1"));
  assert.ok(!outline.includes("Nr. 9"));
});
