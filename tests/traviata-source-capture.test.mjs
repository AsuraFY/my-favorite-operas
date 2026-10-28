import test from "node:test";
import assert from "node:assert/strict";
test("temporary public-domain Traviata source capture", async () => {
  const u="https://opera-guide.ch/operas/la+traviata/libretto/it/";
  const response=await fetch(u,{signal:AbortSignal.timeout(25000),headers:{"User-Agent":"Opera-Libretto-Research/1.0"}});
  assert.equal(response.status,200,"Cannot retrieve Opera Guide public libretto");
  const html=await response.text();
  assert.ok(html.includes("ATTO PRIMO")&&html.includes("ATTO SECONDO")&&html.includes("ATTO TERZO"),"Missing acts");
  console.log("OGSTART|"+html.length);
  for(let i=0;i<html.length;i+=3500) console.log("OGPART|"+i+"|"+Buffer.from(html.slice(i,i+3500),"utf8").toString("base64"));
  console.log("OGEND|"+html.length);
});
