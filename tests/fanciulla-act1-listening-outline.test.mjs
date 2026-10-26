import test from "node:test";
import assert from "node:assert/strict";
import { getOpera } from "../src/data/operas.js";
import { operaInformation } from "../src/data/opera-information.js";
import { fanciullaActOneListeningOutline as tracks } from "../src/data/outline-la-fanciulla-del-west-act-1.js";
import { renderPlannedLibrettoPage } from "../src/opera-info-page.js";

const opera=getOpera("la-fanciulla-del-west");
const details=operaInformation[opera.slug];
test("Act I has 22 unique, unnumbered, bilingual listening landmarks",()=>{
 assert.equal(tracks.length,22);
 assert.deepEqual(tracks.map(track=>track.trackIndex),Array.from({length:22},(_,i)=>i+1));
 assert.equal(new Set(tracks.map(track=>track.originalTitle)).size,22);
 assert.ok(tracks.every(track=>track.originalTitle&&track.participants.length));
 assert.ok(tracks.some(track=>track.originalTitle==="Quello che voi tacete"));
 assert.ok(tracks.some(track=>track.originalTitle==="Signor Johnson, un valzer?"));
 assert.equal(tracks.at(-1).originalTitle,"Oh, non temete, nessuno ardirà");
});
test("Act I and complete outline expose approved reference landmarks without claiming a full libretto",()=>{
 for(const [view,act] of [["outline",1],["libretto",1]]){
  const html=renderPlannedLibrettoPage(opera,details,view,act);
  for(const track of tracks) assert.ok(html.includes(track.originalTitle.replaceAll("'","&#39;").replaceAll("&","&amp;").replaceAll("’","’")),track.originalTitle);
  assert.ok(html.includes("22 reference-recording listening landmarks"));
  assert.ok(html.includes("pending transcription and verification"));
  assert.ok(!/N\. 1 · Introduzione/.test(html));
 }
 const act2=renderPlannedLibrettoPage(opera,details,"libretto",2);
 assert.ok(act2.includes("will be added later"));
});
