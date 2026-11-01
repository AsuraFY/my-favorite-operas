import test from "node:test";
import assert from "node:assert/strict";
import { dieZauberflote } from "../src/data/libretto-die-zauberflote-bundle.js?v=zauberflote-outline-20261026";
const [act1,act2]=dieZauberflote.acts;
function allTurns(act){return act.scenes.flatMap(scene=>scene.sections.flatMap(section=>section.turns));}
test("Magic Flute editorial pass retains exact source divisions and bilingual line pairing",()=>{
  assert.deepEqual([act1.scenes.length,act2.scenes.length],[19,30]);
  assert.deepEqual(act1.scenes.flatMap(s=>s.sections.filter(x=>x.number!=null).map(x=>x.number)),[1,2,3,4,5,6,7,8]);
  assert.deepEqual(act2.scenes.flatMap(s=>s.sections.filter(x=>x.number!=null).map(x=>x.number)),Array.from({length:13},(_,i)=>9+i));
  for(const turn of [...allTurns(act1),...allTurns(act2)]) {
    assert.equal(turn.original.split("\n").length,turn.translation.split("\n").length);
  }
  assert.equal(allTurns(act1).length,466);
  assert.equal(allTurns(act2).length,544);
});
test("relabelled sung passages retain singers and choruses",()=>{
  const a1=allTurns(act1), a2=allTurns(act2);
  const find=(a,line)=>a.find(t=>t.original.includes(line));
  assert.equal(find(a1,"Zum Ziele führt dich diese Bahn").speaker,"DREY KNABEN");
  assert.equal(find(a1,"Wenn Tugend und Gerechtigkeit").speaker,"SCHLUSSCHOR");
  assert.equal(find(a1,"Er lohnet und strafet").speaker,"ALLE");
  assert.equal(find(a2,"Wird rein durch Feuer, Wasser").speaker,"ZWEY MÄNNER");
  assert.equal(find(a2,"Sie quält verschmähter Liebe Leiden").speaker,"ZWEYTER UND DRITTER KNABE");
});
test("spoken dialogue is not misrepresented as part of instrumental or sung musical numbers",()=>{
  const s1=act1.scenes[0].sections,s2=act1.scenes[1].sections,s9=act2.scenes[0].sections;
  assert.ok(s1.some(s=>s.number===1&&s.turns.length===18));
  assert.ok(s2.some(s=>s.number===2&&s.turns.length===4));
  assert.equal(s9.find(s=>s.number===9).turns.length,0);
  assert.equal(s9.find(s=>s.number===9).instrumental,true);
  assert.equal(s9.find(s=>s.routeItem===3).type,"Auftritt");
  assert.ok(s9.find(s=>s.routeItem===3).turns.length>=20);
  assert.equal(s9.find(s=>s.number===10).routeItem,2);
});
test("known machine translation false friends and proper-name mistranslations were corrected",()=>{
 for(const a of [act1,act2])for(const turn of allTurns(a)) {
   assert.doesNotMatch(turn.translation,/fireplaces|test stamp|wisdom stamp/i);
 }
 assert.ok(allTurns(act1).some(t=>t.original.includes("Nur 77 Sohlenstreich!")&&t.translation.includes("seventy-seven strokes")));
});
