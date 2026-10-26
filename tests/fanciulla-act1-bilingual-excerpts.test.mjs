import test from "node:test";
import assert from "node:assert/strict";
import { fanciullaActOneBilingualExcerpts as sections } from "../src/data/libretto-la-fanciulla-del-west-act-1-excerpts.js";
import { getOpera } from "../src/data/operas.js";
import { renderPlannedLibrettoPage } from "../src/opera-info-page.js";
test("Act I bilingual excerpts retain line pairing, speakers and transparent partial status",()=>{
  assert.ok(sections.length>=4);
  let total=0;
  for(const section of sections)for(const t of section.turns){
    assert.ok(t.original&&t.translation&&t.speaker&&t.speakerTranslation);
    assert.equal(t.original.split("\n").length,t.translation.split("\n").length);
    total++;
  }
  assert.ok(total>=20);
  const html=renderPlannedLibrettoPage(getOpera("la-fanciulla-del-west"),null,"libretto",1);
  assert.match(html,/Incomplete libretto/);
  assert.match(html,/selected source excerpts only/);
  assert.match(html,/fanciulla-bilingual__row/);
  assert.match(html,/Flaminio Italian libretto/);
});
