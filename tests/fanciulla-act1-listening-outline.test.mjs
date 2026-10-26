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
test("reference landmarks display in full outline but never replace the Act I libretto",()=>{
 const html=renderPlannedLibrettoPage(opera,details,"outline",1);
 for(const track of tracks)assert.ok(html.includes(track.originalTitle.replaceAll("'","&#39;").replaceAll("&","&amp;")),track.originalTitle);
 assert.ok(html.includes("22 recording tracks"));
 assert.ok(html.includes('class="fanciulla-outline__entry"'));
 assert.ok(!html.includes("section-nav-link opera-outline__section"));
 const act1=renderPlannedLibrettoPage(opera,details,"libretto",1);
 assert.ok(act1.includes("have not yet been integrated"));
 assert.ok(!act1.includes(tracks[2].originalTitle));
 assert.ok(act1.includes("?view=outline"));
 const act2=renderPlannedLibrettoPage(opera,details,"libretto",2);
 assert.ok(act2.includes("will be added later"));
});
