import test from "node:test";
import assert from "node:assert/strict";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";
const opera=getLibretto("la-boheme");
const expected=[{turns:465,stage:177,lines:468,outline:8},{turns:204,stage:15,lines:399,outline:5},{turns:144,stage:30,lines:253,outline:5},{turns:244,stage:88,lines:301,outline:8}];
test("all four Bohème tableaux keep bilingual text and authentic recorded line divisions",()=>{
 assert.deepEqual(opera.acts.map(act=>act.scenes.length),[1,1,1,1]);
 for(const [index,act] of opera.acts.entries()){
  const scene=act.scenes[0],turns=scene.sections.flatMap(section=>section.turns),exp=expected[index];
  assert.equal(turns.length,exp.turns);
  assert.equal(turns.filter(turn=>turn.speaker==="Stage direction").length,exp.stage);
  assert.equal(turns.filter(turn=>turn.speaker!=="Stage direction").reduce((count,turn)=>count+turn.original.split("\n").length,0),exp.lines);
  assert.equal(scene.outline.length,exp.outline);
  for(const turn of turns){
   const where="Tableau "+act.number+" "+turn.speaker;
   assert.ok(turn.original?.trim(),where+": missing Italian");
   assert.ok(turn.translation?.trim(),where+": missing English");
   assert.ok(!turn.original.includes(String.fromCharCode(92)+"n")&&!turn.translation.includes(String.fromCharCode(92)+"n"),where+": literal escaped newline");
   const left=turn.original.split("\n"),right=turn.translation.split("\n");
   assert.equal(left.length,right.length,where+": mismatched lines");
   for(let i=0;i<left.length;i++)assert.equal(left[i].trim()==="",right[i].trim()==="",where+": mismatched stanza break");
  }
 }
});
test("all 26 Bohème outline entries show their existing English second line and valid destinations",()=>{
 globalThis.window={location:{hash:"#/operas/la-boheme?view=outline"}};
 const renderer=createLibrettoRenderer(opera),html=renderer.outline();
 let count=0;
 for(const act of opera.acts){
  const scene=act.scenes[0];
  window.location.hash="#/operas/la-boheme?act="+act.number;
  const actPage=renderer.scene(1);
  for(const entry of scene.outline){
   assert.ok(entry.title?.trim()&&entry.translation?.trim(),"Missing bilingual heading in "+act.number);
   const targets=scene.sections.flatMap((section,sectionIndex)=>section.turns.flatMap((turn,turnIndex)=>
    (entry.sourceTurn==null||entry.sourceTurn===turnIndex)&&(entry.speaker==null||entry.speaker===turn.speaker)&&turn.original.includes(entry.match)?[{sectionIndex,turnIndex}]:[]));
   assert.equal(targets.length,1,"Unresolved outline passage: "+entry.title);
   const link="#/operas/la-boheme?act="+act.number+"&scene="+scene.number+"&item="+targets[0].sectionIndex+"&turn="+targets[0].turnIndex;
   assert.ok(html.includes('href="'+link+'"'),"Full outline destination missing: "+entry.title);
   assert.ok(actPage.includes('href="'+link+'"'),"Act outline destination missing: "+entry.title);
   assert.ok(html.includes("opera-outline__section-translation"),"English heading not rendered");
   assert.ok(actPage.includes(entry.translation+"</span>"),"Act second line missing: "+entry.title);
   count++;
  }
 }
 assert.equal(count,26);
});