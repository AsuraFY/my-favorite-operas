import test from 'node:test';
import assert from 'node:assert/strict';
import { operas } from '../src/data/operas/catalog.js';
import { hasCompleteLibretto, loadLibretto } from '../src/data/operas/libretto-loader.js';

// Baselines established by the 2026-11-05 Issue 15 catalogue screening.
// These are *minimum text-presence guards*, not certification of translation accuracy.
// Deliberate substantive deletions should be documented and these guards adjusted.
const baselineTurns = {
  'il-barbiere-di-siviglia':683,
  'tristan-und-isolde':327,
  'cosi-fan-tutte':871,
  'macbeth':427,
  'turandot':726,
  'le-nozze-di-figaro':1240,
  'samson-et-dalila':205,
  'la-fanciulla-del-west':1538,
  'manon':1035,
  'otello':968,
  'parsifal':551,
  'carmen':1063,
  'la-traviata':426,
  'the-magic-flute':1010,
  'aida':439,
  'tosca':778,
  'madama-butterfly':637,
  'rigoletto':650,
  'don-giovanni':1011,
  'la-boheme':1057,
  'lucia-di-lammermoor':376,
  'eugene-onegin':382,
  'les-contes-dhoffmann':911,
  'norma':392,
  'il-trovatore':505,
  'das-rheingold':652,
  'die-walkure':596,
  'siegfried':725,
  'gotterdammerung':776,
  'lelisir-damore':468,
  'die-fledermaus':1542,
  'la-cenerentola':709,
  'hansel-und-gretel':194,
  'nabucco':303,
  'pagliacci':380
};

test('catalogue and translation-presence baselines cover all 35 operas', () => {
  assert.equal(operas.length,35);
  assert.equal(Object.keys(baselineTurns).length,35);
  assert.deepEqual(new Set(operas.map(o=>o.slug)),new Set(Object.keys(baselineTurns)));
  assert.equal(Object.values(baselineTurns).reduce((sum,n)=>sum+n,0),24553);
});

for(const opera of operas) {
  test(`${opera.slug}: bilingual reader retains its acts, original and English turns`, async () => {
    assert.ok(hasCompleteLibretto(opera.slug), 'missing on-demand opera: '+opera.slug);
    const libretto = await loadLibretto(opera.slug);
    assert.equal(libretto?.slug,opera.slug);
    assert.ok(libretto.acts?.length, 'no acts: '+opera.slug);
    let turnCount=0;
    for(const act of libretto.acts) {
      assert.ok(act.scenes?.length, 'empty act: '+opera.slug);
      for(const scene of act.scenes) {
        assert.ok(scene.sections?.length, 'empty tableau: '+opera.slug);
        for(const section of scene.sections) {
          assert.ok(section.turns?.length, 'empty section: '+opera.slug);
          for(const turn of section.turns) {
            turnCount++;
            assert.ok(turn.speaker?.trim(), 'unattributed turn: '+opera.slug);
            const original=turn.original??turn.it??turn.de??turn.fr??turn.ru??'';
            const english=turn.translation??turn.en??turn.english??'';
            assert.ok(english?.trim(), 'missing English text: '+opera.slug);
            // Explicit editorial exception: Russian lyrics are intentionally
            // absent from the English-first Eugene Onegin reader.
            if(opera.slug!=='eugene-onegin') assert.ok(original?.trim(), 'missing source text: '+opera.slug);
          }
        }
      }
    }
    // Allows editorial splitting/combining of individual turns while
    // flagging major accidental disappearance of whole libretto passages.
    assert.ok(turnCount>=Math.floor(baselineTurns[opera.slug]*0.9),
      `${opera.slug}: ${turnCount} turns fell below the screened baseline`);
  });
}
