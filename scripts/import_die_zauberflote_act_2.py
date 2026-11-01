#!/usr/bin/env python3
"""One-time Opera Guide Act II import for Die Zauberflöte.

The historical German text is preserved line by line. English is produced by
an independent offline translator, NOT copied from a contemporary libretto.
It is an editorial draft, not a verified English translation.
"""
from __future__ import annotations
import json
import re
from pathlib import Path
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
SOURCE = "https://opera-guide.ch/en/operas/die%2Bzauberflote/libretto/de/"
FINAL_LINE = "Die Schönheit und Weisheit mit ewiger Kron'."
SCENES = [
    'ERSTER','ZWEYTER','DRITTER','VIERTER','FÜNFTER','SECHSTER','SIEBENTER',
    'ACHTER','NEUNTER','ZEHNTER','ELFTER','ZWÖLFTER','DREYZEHNTER','VIERZEHNTER',
    'FÜNFZEHNTER','SECHZEHNTER','SIEBZEHNTER','ACHTZEHNTER','NEUNZEHNTER',
    'ZWANZIGSTER','EINUNDZWANZIGSTER','ZWEIUNDZWANZIGSTER',
    'DREIUNDZWANZIGSTER','VIERUNDZWANZIGSTER','FÜNFUNDZWANZIGSTER',
    'SECHSUNDZWANZIGSTER','SIEBUNDZWANZIGSTER','ACHTUNDZWANZIGSTER',
    'NEUNUNDZWANZIGSTER','DREYSSIGSTER'
]
SCENE_TO_NUMBER = {name + ' AUFTRITT': index + 1 for index, name in enumerate(SCENES)}
NUMBER_RE = re.compile(r'^Nr\.\s*(\d+)\s*[-–]\s*(.+)$', re.I)
ROMANS=['','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI','XXII','XXIII','XXIV','XXV','XXVI','XXVII','XXVIII','XXIX','XXX']
SPEAKERS = {
 'SARASTRO':'Sarastro', 'TAMINO':'Tamino', 'PAPAGENO':'Papageno',
 'PAMINA':'Pamina', 'MONOSTATOS':'Monostatos', 'MOHR':'Monostatos',
 'SPRECHER':'Speaker', 'ERSTER PRIESTER':'First Priest',
 'ZWEYTER PRIESTER':'Second Priest','ZWEITER PRIESTER':'Second Priest',
 'DRITTER PRIESTER':'Third Priest', 'PRIESTER':'Priest',
 'CHOR':'Chorus', 'CHORUS':'Chorus','CHOR VON PRIESTERN':'Chorus of Priests',
 'SARASTRO UND CHOR':'Sarastro, Chorus', 'SARASTRO UND TAMINO':'Sarastro, Tamino',
 'TAMINO UND PAMINA':'Tamino, Pamina','SARASTRO, TAMINO':'Sarastro, Tamino',
 'KÖNIGINN':'Queen of the Night','KÖNIGIN DER NACHT':'Queen of the Night',
 'KÖNIGINN, DAMEN':'Queen of the Night, Three Ladies',
 'DIE DREY DAMEN':'Three Ladies','DREY DAMEN':'Three Ladies',
 'DIE DREY KNABEN':'Three Boys','DREY KNABEN':'Three Boys',
 'ERSTER KNABE':'First Boy', 'ZWEYTER KNABE':'Second Boy',
 'DRITTER KNABE':'Third Boy',
 'ZWEYTER UND DRITTER KNABE':'Second Boy, Third Boy',
 'PAMINA UND DIE DREY KNABEN':'Pamina, Three Boys',
 'ALLE VIER':'Pamina, Three Boys',
 'ALLE WEIBER':'Women', 'ALLE':'All', 'BEYDE':'Both',
 'MOHR, KÖNIGINN':'Monostatos, Queen of the Night',
 'ZWEY MÄNNER':'Two Armored Men',
 'DIE GEHARNISCHTEN':'Two Armored Men',
 'TAMINO UND DIE GEHARNISCHTEN':'Tamino, Two Armored Men',
 'WEIB':'Old Woman', 'PAPAGENO.':'Papageno',
 'PAPAGENA':'Papagena', 'EINE STIMME':'A Voice',
 'ZWEY STIMMEN':'Two Voices', 'DREY STIMMEN':'Three Voices',
 'ZWEI STIMMEN':'Two Voices',
}
# Explicit source production cues, rather than heuristically interpreting
# sung lines beginning with 'Er' or 'Sie' as directions.
DIRECTION = re.compile(
 r'^(?:das Theater|Die (?:drey Knaben|drey Damen|Alte|Thüren|Priester)|'
 r'Tamino (?:setzt|bläst|steht|droht|winkt|will|seufzt|geht)|'
 r'Papageno (?:hat|will|sieht|setzt|nimmt|ruft|trinkt)|'
 r'Pamina (?:halb|allein|tritt|kommt)|Sprecher (?:geht|nimmt)|'
 r'Sarastro (?:geht|nebst)|Die (?:Königinn|Scenen)|'
 r'Ein (?:alter|starker|Marsch|Zug)|Zwey (?:Männer|bringen)|'
 r'Der (?:dreymahlige|Mohr)|Man (?:hört|führe)|'
 r'Unter (?:dem|diesem)|Dann (?:ein|kommen)|'
 r'Auf (?:ihren|der)|Sogleich (?:kommt|verwandelt)|'
 r'(?:Starker|Ein sehr starker|Dreymaliger) (?:Donnerschlag|Posaunenton)|'
 r'Donner(?:schlag)?$|Der dreymahlige Accord|'
 r'zum |nach |bei |bey |mit |für sich$|laut$|'
 r'sieht |seufzt$|winkt |ruft |pfeift$|schlägt |'
 r'gehen |geht |fährt |fahren |nimmt |trinkt$|'
 r'kniet$|ab$|beyde ab$|Beyde ab$|'
 r'Pause$|er |sie |im |wird |erholt |erhohlt |'
 r'er zieht |verweisend$|singt$|erschrickt|'
 r'Tamino, Papageno\.$|Vorige\.$|'
 r'Sarastro und|Sprecher geht)', re.I)
STOP_WORDS={'SCHLUSSCHOR','DUETTO'}


def source_lines():
    req=Request(SOURCE,headers={'User-Agent':'Mozilla/5.0 (personal opera study site)'})
    with urlopen(req,timeout=45) as response:
        soup=BeautifulSoup(response.read(),'html.parser')
    for el in soup(['script','style','nav','footer']):el.decompose()
    full=[re.sub(r'\s+',' ',x).strip() for x in soup.get_text('\n').splitlines()]
    full=[x for x in full if x]
    start=full.index('ZWEITER AKT')+1
    try:
        end=full.index(FINAL_LINE,start)+1
    except ValueError:
        raise ValueError('End of Act II missing: refusing partial import')
    lines=full[start:end]
    if not 900<=len(lines)<=1600:
        raise ValueError('Unexpected Act II source length: '+str(len(lines)))
    return lines


def speaker(line):
    key=line.strip().rstrip('.').upper()
    if key in SPEAKERS:
        return line.strip(), SPEAKERS[key]
    # unknown original uppercase rubrics MUST be reported, not silently dropped
    if line.isupper() and 2<=len(line)<=65 and not line.endswith('AUFTRITT'):
        if line not in STOP_WORDS:
            # Keep genuinely unusual historical rubrics as source labels, and
            # surface them in the review rather than discarding their speech.
            print('EDITORIAL CHECK — unfamiliar German speaker cue:',repr(line))
            return line.strip(), line.title()
    return None


def is_direction(line,current_speaker,first_in_scene):
    if first_in_scene or current_speaker is None:return True
    if re.match(r'^\(*[a-zäöüß]',line):return True
    if line in ('Ein Marsch mit blasenden Instrumenten begleitet den Zug.',
                'Tamino und Papageno werden vom Sprecher und dem andern Priester hereingeführt; sie lösen ihnen die Säcke ab; die Priester gehen dann ab.',
                'Sarastro geht voraus, dann alle ihm nach ab.',
                'Weib verwandelt sich in ein junges Weib, welche eben so gekleidet ist, wie Papageno.',
                'Man hört dumpfen Donner, Geräusch von Wasser.'):
        return True
    return bool(DIRECTION.match(line))


def section(kind,number=None):
    obj={'type':kind, 'threeLineOutline':True,'sourceTitlesOnly':True,
         'participants':[], 'turns':[]}
    if number is not None:obj['number']=number
    return obj


def split_source(lines):
    result=[]; scene=None;sec=None; cue=None; first=True; inside_finale=False
    for source_text in lines:
        if re.fullmatch(r'[A-ZÄÖÜ]+ AUFTRITT',source_text):
            n=len(result)+1
            if n>30:raise ValueError('Unexpected extra act II scene: '+source_text)
            scene={'number':n,'originalHeading':source_text.title(),
                   'translatedHeading':'Scene '+ROMANS[n], 'sections':[]}
            result.append(scene)
            sec=None;cue=None;first=True
            continue
        if scene is None:raise ValueError('Text before first scene: '+source_text)
        m=NUMBER_RE.fullmatch(source_text)
        if m:
            num=int(m.group(1))
            sec=section(m.group(2).strip(),num)
            scene['sections'].append(sec)
            inside_finale=(num==21)
            # Cue directly before a heading still belongs to its first line.
            first=False
            continue
        if source_text.upper() in ('DUETTO', 'SCHLUSSCHOR'):
            sec=section(source_text.capitalize())
            scene['sections'].append(sec)
            first=False
            continue
        found=speaker(source_text)
        if found:
            cue=found
            first=False
            continue
        if sec is None:
            # Act II finale No. 21 continues through scene 30, without
            # inventing additional score numbers for each scene.
            sec=section('Finale' if inside_finale else 'Auftritt')
            scene['sections'].append(sec)
        direction=is_direction(source_text,cue,first)
        if direction:
            label='Stage direction';translation_label=label
        else:
            label,translation_label=cue
            for participant in translation_label.split(', '):
                if participant not in sec['participants']:
                    sec['participants'].append(participant)
        if sec['turns'] and sec['turns'][-1]['speaker']==label and not direction:
            sec['turns'][-1]['_lines'].append(source_text)
        else:
            sec['turns'].append({'speaker':label,'speakerTranslation':translation_label,
                                  'literalText':True,'_lines':[source_text]})
        first=False
    return result


def validate(scenes):
    if [s['number'] for s in scenes]!=list(range(1,31)):
        raise ValueError('Expected 30 source scene divisions; got '+str([s['number'] for s in scenes]))
    nums=[sec['number'] for scene in scenes for sec in scene['sections'] if 'number' in sec]
    if nums!=list(range(9,22)):
        raise ValueError('Expected musical numbers 9–21; got '+str(nums))
    turns=[t for s in scenes for sec in s['sections'] for t in sec['turns']]
    count=sum(len(t['_lines']) for t in turns)
    if count<700:raise ValueError('Act II extracted too few lines: '+str(count))
    if not any(t['speakerTranslation']=='Queen of the Night' for t in turns):
        raise ValueError('Queen of the Night is missing')
    if not any(t['speakerTranslation']=='Papagena' for t in turns) and not any(t['speaker']=='WEIB' for t in turns):
        raise ValueError('Papagena/Old Woman is missing')
    if not any(t['speaker']=='PAMINA' for t in turns):raise ValueError('Pamina is missing')
    return turns,count


def translate(scenes):
    import argostranslate.package
    import argostranslate.translate
    installed=argostranslate.translate.get_installed_languages()
    if not any(x.code=='de' for x in installed):
        available=argostranslate.package.get_available_packages()
        match=next(x for x in available if x.from_code=='de' and x.to_code=='en')
        argostranslate.package.install_from_path(match.download())
    languages=argostranslate.translate.get_installed_languages()
    de=next(x for x in languages if x.code=='de')
    en=next(x for x in languages if x.code=='en')
    engine=de.get_translation(en)
    memo={}
    def tr(line):
        if line in memo:return memo[line]
        pieces=[]; rem=line
        while len(rem)>400:
            cut=max([rem.rfind(sep,150,390) for sep in ('. ','! ','? ','; ',': ',', ')])
            cut=(cut+1) if cut>140 else 390
            pieces.append(rem[:cut].strip());rem=rem[cut:].strip()
        if rem:pieces.append(rem)
        converted=' '.join(engine.translate(piece).strip() for piece in pieces).strip()
        if not converted:raise ValueError('Empty English draft for '+line[:100])
        memo[line]=converted
        return converted
    for scene in scenes:
        for sec in scene['sections']:
            for t in sec['turns']:
                originals=t.pop('_lines')
                translations=[tr(x) for x in originals]
                if len(translations)!=len(originals):raise AssertionError('Bad paired lines')
                t['original']='\n'.join(originals)
                t['translation']='\n'.join(translations)
    print('English draft ready for '+str(len(memo))+' unique source lines (not editorially verified)')


def replace_once(path,old,new):
    c=path.read_text(encoding='utf8')
    if old not in c:raise AssertionError('Cannot patch '+str(path)+': '+old[:75])
    path.write_text(c.replace(old,new),encoding='utf8')


def integrate(scenes,source_count):
    act=ROOT/'src/data/libretto-die-zauberflote-act-2.js'
    act.write_text('// Emanuel Schikaneder (1791), Opera Guide: ZWEITER AKT, Auftritte 1–30.\n'
      '// German retains source orthography and printed line order.\n'
      '// English is a fresh offline machine-assisted draft, NOT editorially reviewed.\n'
      '// Source: '+SOURCE+' · checked 26 October 2026.\n'
      'export const dieZauberfloteActTwoScenes = '+json.dumps(scenes,ensure_ascii=False,indent=2)+';\n',encoding='utf8')
    b=ROOT/'src/data/libretto-die-zauberflote-bundle.js'
    c=b.read_text(encoding='utf8')
    assert 'dieZauberfloteActTwoScenes' not in c,'Already installed Act II'
    c=c.replace('// Die Zauberflöte: Act I only. Act II is not yet populated.',
      '// Die Zauberflöte: both original German acts; English drafts await review.')
    c=c.replace('export const dieZauberflote = {',
      'import { dieZauberfloteActTwoScenes } from "./libretto-die-zauberflote-act-2.js";\nexport const dieZauberflote = {')
    c=c.replace('  partialLibretto: true, // Only Act I is published; Act II is not yet available.\n','')
    c=c.replace('scenes: dieZauberfloteActOneScenes }],',
                'scenes: dieZauberfloteActOneScenes },\n    { number: 2, originalHeading: "Zweiter Akt", scenes: dieZauberfloteActTwoScenes }],')
    c=c.replace('· Act I available','· Both acts available')
    c=c.replace('Act I only. German source:', 'Both acts. German source:')
    c=c.replace('All 19 source Auftritte and numbered musical sections 1–8 retained.',
      'Act I: 19 source Auftritte and numbers 1–8. Act II: 30 source Auftritte and numbers 9–21 retained.')
    c=c.replace('Act II is not yet implemented.',
      'The English remains an unreviewed translation draft. Act II source lines: '+str(source_count)+'.')
    b.write_text(c,encoding='utf8')
    original='zauberflote-act1-20261026'
    updated='zauberflote-acts1-2-20261026'
    for name in ('src/data/libretto-loader.js','src/data/libretto-registry.js',
                 'tests/die-zauberflote-act-1.test.mjs'):
        f=ROOT/name
        replace_once(f,original,updated)
    oldtest=ROOT/'tests/die-zauberflote-act-1.test.mjs'
    c=oldtest.read_text(encoding='utf8')
    c=c.replace('assert.equal(dieZauberflote.acts.length,1, "Act II is not yet populated");',
                'assert.equal(dieZauberflote.acts.length,2, "Both acts are now available");')
    c=c.replace('assert.ok(!outline.includes("Nr. 9"));','assert.ok(outline.includes("?act=2"));')
    oldtest.write_text(c,encoding='utf8')
    replace_once(ROOT/'tests/site-dependency-integrity.test.mjs',
        'assert.equal(libretto.acts.length, libretto.partialLibretto ? 1 : metadata.acts,',
        'assert.equal(libretto.acts.length, metadata.acts,')
    # Stable version suffixes invalidate cached site modules when pages publish.
    for name,prev,new in (
       ('src/main.js','libretto-loader.js?v=magic-flute-act1-20261026',
        'libretto-loader.js?v=magic-flute-act2-20261026'),
       ('src/boot.js','main.js?v=magic-flute-act1-20261026',
        'main.js?v=magic-flute-act2-20261026'),
       ('index.html','src/boot.js?v=magic-flute-act1-20261026',
        'src/boot.js?v=magic-flute-act2-20261026')):
        f=ROOT/name
        replace_once(f,prev,new)
    test_file=ROOT/'tests/die-zauberflote-act-2.test.mjs'
    test_file.write_text('''import test from "node:test";
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
    assert.equal(turn.original.split("\\n").length,turn.translation.split("\\n").length,
      "Each source line must have one English draft line");
    counted+=turn.original.split("\\n").length;
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
''',encoding='utf8')
    review=ROOT/'docs/reviews/die-zauberflote-act-2.md'
    review.write_text('# Die Zauberflöte — Act II import (26 October 2026)\n\n'
      'Primary text: Emanuel Schikaneder, historical German libretto, Opera Guide, '+SOURCE+'; accessed 26 October 2026.\n\n'
      f'- Source structure: 30 **Auftritte**, musical numbers 9–21, {source_count} preserved source lines.\n'
      '- Preserves source scene boundaries, printed numbering, spoken dialogue and stage directions as distinct rows.\n'
      '- Translation is fresh offline machine-assisted German→English draft; **not reviewed for semantic correctness**.\n'
      '- Stage-direction attribution requires manual editorial spot-checks.\n'
      '- Complete automated structural checks do not constitute proof of translation quality.\n'
      '- Act I was imported previously and was not replaced by this change.\n',encoding='utf8')
    print('Act II integrated. Complete source scenes:',len(scenes), 'lines:',source_count)


def main():
    if (ROOT/'src/data/libretto-die-zauberflote-act-2.js').exists():
        print('Act II already exists; source importer is idempotent.')
        return
    lines=source_lines();print('Opera Guide German Act II source rows:',len(lines))
    scenes=split_source(lines)
    turns,count=validate(scenes)
    print('Act II scene divisions:',len(scenes),'numbers:',13,
          'source textual lines:',count,'turns:',len(turns))
    translate(scenes)
    integrate(scenes,count)

if __name__=='__main__':main()