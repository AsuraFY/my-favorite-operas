import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {beethovenVocalBlocks as blocks, beethovenSources as sources} from '../src/data/musical-beethoven-ode-to-joy.js';
import {renderMusicalPage} from '../src/musicals-page.js';
// Independent source-part fingerprints from OpenScore Orchestra MusicXML, 20 October 2026.
const expected = {
'Soprano solo':'cdf4b0988887e18ce26572a929a33d4dc4cc6af3035aad5d78faf9015b37f1c8',
'Alto solo':'0635f3177ba6d738e7d1cc821ef11ec0782581deb66f52608bc9650362f29753',
'Tenor solo':'d7980b5609fbdfb5cf05958a32128d43603f16ebce515168e67cdb07695fb415',
'Bass solo':'2f19f1b4e5570388513866032964d5883a2dca37e807251e3e2d1410a41fe7fe',
'Soprano':'4e4aee50d2d86d06c232f3bd155eea4be01ddb5039a73978ffb62f08ce207fd2',
'Alto':'e8d28ad09b575b089abcbb753677598f312d1d9ea0dd4b69b0e559fdd48440dd',
'Tenor':'8b4996f659bedce3435da8ec7c5bd3eb9e15cfd29f262e40ae9deb14c0163a76',
'Bass':'4f6587d0ff89ef97b305674be706fa0ce709aab3a9f08ae1ebe1930b07edfc00'};
test('Beethoven preserves every source-part word and repetition in order',()=>{
 for(const [part,hash] of Object.entries(expected)) {
  const stream=blocks.filter(b=>b.parts.includes(part)).flatMap(b=>b.lines.map(l=>l[0])).join(' ').toLowerCase();
  assert.equal(createHash('sha256').update(stream).digest('hex'),hash,part);
  assert.equal(stream.split(/\s+/).length,sources.partWordCounts[part]);
 }
 assert.equal(blocks[0].parts[0],'Bass solo');
 assert.ok(blocks.at(-1).lines.at(-1)[0].includes('Götterfunken!'));
 assert.ok(!blocks.some(b=>b.lines.some(l=>l[0].includes('zum Held Siegen'))));
});
test('Beethoven groups continuous lyrics in one bilingual row per vocal block and its own translation target',()=>{
 const html=renderMusicalPage('beethoven-ode-to-joy','lyrics');
 assert.ok(!html.includes('coming soon'));
 assert.ok(html.includes('aria-controls="beethoven-score-lyrics"'));
 assert.ok(html.includes('id="beethoven-score-lyrics"'));
 assert.ok(html.includes('editorial review in progress'));
 assert.equal(new Set(blocks.map(b=>b.id)).size,blocks.length);
 const lines=blocks.flatMap(b=>b.lines);
 assert.equal((html.match(/lang="de"><p>/g)||[]).length,blocks.length);
 assert.equal((html.match(/lang="en" data-musical-translation><p>/g)||[]).length,blocks.length);
 for (const block of blocks) {
  const passage = html.split('id="'+block.id+'"')[1].split('</section>')[0];
  assert.equal((passage.match(/musical-score-row--entry/g)||[]).length,1);
  assert.equal((passage.match(/musical-score-part__name/g)||[]).length,1);
  assert.equal((passage.match(/<p>/g)||[]).length,block.lines.length*2);
 }
 for(const [de,en] of lines){assert.ok(de&&en);assert.ok(!en.includes('under review]'));}
});
