#!/usr/bin/env python3
"""One-time content preparation: Schikaneder's Act I via Opera Guide.

Static-site content is committed after a successful run. This script is NOT a
browser/runtime dependency. English is a machine-assisted first draft, explicitly
not an editorially approved translation.
"""
import json
import os
import re
from pathlib import Path
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
SOURCE = 'https://opera-guide.ch/en/operas/die%2Bzauberflote/libretto/de/'
SCENES = {
    'ERSTER': 1, 'ZWEITER': 2, 'DRITTER': 3, 'VIERTER': 4,
    'FÜNFTER': 5, 'SECHSTER': 6, 'SIEBENTER': 7, 'ACHTER': 8,
    'NEUNTER': 9, 'ZEHNTER': 10, 'ELFTER': 11, 'ZWÖLFTER': 12,
    'DREIZEHNTER': 13, 'VIERZEHNTER': 14, 'FÜNFZEHNTER': 15,
    'SECHZEHNTER': 16, 'SIEBZEHNTER': 17, 'ACHTZEHNTER': 18,
    'NEUNZEHNTER': 19,
}
SCENE_RE = re.compile(r'^(' + '|'.join(SCENES) + r') AUFTRITT$')
NUMBER_RE = re.compile(r'^Nr\.\s*(\d+)\s*[-–]\s*(.*)$', re.I)
STAGE_START = re.compile(
    r'^(?:das Theater|Tamino kommt|Papageno hat|Die Berge|Eine nach der|'
    r'Sie gehen|Sie legen|Er fällt|Er will|Sie schlägt|Papageno zeigt|'
    r'Die drey Damen|Die Sclaven|Alle wollen|Alle ab|Alle drei|'
    r'Ein Zug|Ein starker Marsch|Man hört|Er spielt|'
    r'Ein alter Priester|Drey Knaben führen|Zwey Sclaven|'
    r'So bald|während |Während |Dieser Chor|Zwey bringen|'
    r'geht |gehen |ab$|auch dort ab$|beyde ab$|Beyde ab$|'
    r'wird |nach |für sich$|laut$|sieht |sich |nimmt |reicht |'
    r'springt |läuft |tritt |öffnet |drückt |lacht$|'
    r'freudig$|traurig$|sehr schnell$|kniet$|pfeift$|'
    r'ruft |singt$|von innen$|zum |er |sie |im |mit den |'
    r'Giebt |Mit den |Donner$|Sogleich |Zwey |Vorige\b|'
    r'Monostatos und Papageno sehen|Monostatos von aussen|'
    r'Pamina allein|Papageno von aussen)', re.I
)
LABELS = {
 'TAMINO': 'Tamino', 'PAPAGENO': 'Papageno', 'PAMINA': 'Pamina',
 'SARASTRO': 'Sarastro', 'MONOSTATOS': 'Monostatos',
 'ERSTE DAME': 'First Lady', 'ZWEYTE DAME': 'Second Lady',
 'ZWEITE DAME': 'Second Lady', 'DRITTE DAME': 'Third Lady',
 'DIE DREY DAMEN': 'Three Ladies', 'ALLE DREY': 'Three Ladies',
 'DIE DREY DAMEN MIT IHM': 'Three Ladies, Papageno',
 'KÖNIGINN': 'Queen of the Night', 'KÖNIGIN DER NACHT': 'Queen of the Night',
 'TAMINO UND PAPAGENO': 'Tamino, Papageno', 'DREY KNABEN': 'Three Boys',
 'PAMINA UND PAPAGENO': 'Pamina, Papageno',
 'PAPAGENO, PAMINA': 'Papageno, Pamina',
 'MONOSTATOS UND SCLAVEN': 'Monostatos, Slaves',
 'PRIESTER': 'Priest', 'STIMME': 'Voice', 'DIE STIMMEN': 'Voices',
 'EINIGE STIMMEN': 'Voices', 'CHORUS': 'Chorus',
 'ERSTER SCLAV': 'First Slave', 'ZWEYTER SCLAV': 'Second Slave',
 'DRITTER SCLAV': 'Third Slave', 'ERSTER UND ZWEYTER SCLAV': 'First Slave, Second Slave',
 'ZWEYTER UND DRITTER SCLAV': 'Second Slave, Third Slave',
 'DIE DREY SCLAVEN': 'Three Slaves',
 'PAMINA UND TAMINO': 'Pamina, Tamino',
 'MONOSTATOS UND SCLAVEN': 'Monostatos, Slaves',
 'ALLE': 'All', 'ALLE FÜNF': 'Five Voices', 'BEYDE': 'Both',
}
ROMAN = ('', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX')

def page_lines(html):
    soup = BeautifulSoup(html, 'html.parser')
    for el in soup(['script', 'style', 'nav', 'footer']):
        el.decompose()
    # Preserve explicit br-separated verse lines. Soup's text separator keeps
    # the website's own printed line/heading boundaries; no lyric normalization.
    lines = [re.sub(r'\s+', ' ', t).strip() for t in soup.get_text('\n').splitlines()]
    lines = [t for t in lines if t]
    starts = [i for i, x in enumerate(lines) if x == 'ERSTER AKT']
    ends = [i for i, x in enumerate(lines) if x == 'ZWEITER AKT']
    if not starts or not ends:
        raise ValueError('Opera Guide has changed headings; refusing to publish a truncated act')
    start = starts[-1]
    end = next((i for i in ends if i > start), -1)
    if end < 0:
        raise ValueError('Second act boundary missing; refusing to publish')
    material = lines[start+1:end]
    if len(material) < 650 or len(material) > 2500:
        raise ValueError(f'Unexpected Act I length ({len(material)}); examine source')
    return material

def is_speaker(line):
    return bool(line.isupper() and 2 <= len(line) <= 80 and
        not line.startswith(('Nr.', 'N. ')) and not line.endswith('AUFTRITT') and
        line not in ('ERSTER AKT', 'ZWEITER AKT', 'OUVERTÜRE', 'SCHLUSSCHOR'))

def is_direction(line, after_scene=False, just_after_cue=False):
    if after_scene:
        return True
    if re.match(r'^\(*[a-zäöüß]', line):
        return True
    # Avoid claiming sentences in a sung verse are stage directions solely
    # because they start with 'Er'/'Sie': recognize longer production cues.
    if len(line) < 18 and not re.match(r'^(?:geht |gehen |ab$|kniet$|pfeift$|laut$|für sich$|lacht$|Donner$)',line,re.I):
        return False
    return bool(STAGE_START.search(line))

def split_entries(raw):
    all_scenes = []
    scene = None
    section = None
    current_speaker = None
    stage_at_begin = False
    for text in raw:
        scene_match = SCENE_RE.fullmatch(text)
        if scene_match:
            no = SCENES[scene_match.group(1)]
            scene = {'number': no, 'originalHeading': text.title().replace('Auftritt','Auftritt'),
                     'translatedHeading': 'Scene ' + ROMAN[no], 'sections': [],
                     'summary': '', }
            all_scenes.append(scene)
            section = None
            current_speaker = None
            stage_at_begin = True
            continue
        if scene is None:
            if text.lower() == 'ouvertüre':
                continue
            raise ValueError('Unexpected unassigned Act I prelude line: '+text[:100])
        number_match = NUMBER_RE.fullmatch(text)
        if number_match:
            number = int(number_match.group(1))
            section = {'number': number, 'type': number_match.group(2).strip(),
                'threeLineOutline': True, 'sourceTitlesOnly': True,
                'participants': [], 'turns': []}
            scene['sections'].append(section)
            # In this edition the singer's cue can PRECEDE a numbered aria
            # (e.g. TAMINO / Nr. 3 - Arie). Keep it across the heading.
            stage_at_begin = False
            continue
        if text == 'SCHLUSSCHOR':
            # Separately printed source division within the finale; do not
            # invent an additional official musical number.
            section = {'type': 'Schlusschor', 'threeLineOutline': True,
                    'sourceTitlesOnly': True, 'participants': [], 'turns': []}
            scene['sections'].append(section)
            current_speaker = None
            continue
        if is_speaker(text):
            current_speaker = text
            stage_at_begin = False
            continue
        if section is None:
            section = {'type': 'Auftritt', 'threeLineOutline': True,
                       'sourceTitlesOnly': True, 'participants': [], 'turns': []}
            scene['sections'].append(section)
        direction = (current_speaker is None or is_direction(text, after_scene=stage_at_begin))
        if direction:
            # The identical global Stage direction label is used on both sides.
            label, translated = 'Stage direction', 'Stage direction'
        else:
            label, translated = current_speaker, LABELS.get(current_speaker, current_speaker.title())
            for person in translated.split(', '):
                if person not in section['participants']:
                    section['participants'].append(person)
        turns = section['turns']
        if turns and turns[-1]['speaker'] == label and not direction and not turns[-1].get('noMerge'):
            turns[-1]['_sourceLines'].append(text)
        else:
            turns.append({'speaker':label, 'speakerTranslation':translated,
                 '_sourceLines':[text], 'literalText': True})
        stage_at_begin = False
    return all_scenes

def count_and_validate(scenes):
    if [s['number'] for s in scenes] != list(range(1,20)):
        raise ValueError('Act I must contain source Auftritte 1–19')
    numbers = [sec['number'] for s in scenes for sec in s['sections'] if 'number' in sec]
    if numbers != list(range(1,9)):
        raise ValueError(f'Act I source musical numbers must be 1–8, found: {numbers}')
    original = [line for s in scenes for sec in s['sections'] for turn in sec['turns'] for line in turn['_sourceLines']]
    if len(original) < 400:
        raise ValueError(f'Source looks truncated: {len(original)} spoken/sung/stage lines')
    # In Opera Guide the Queen's German cue KÖNIGINN stands immediately
    # BEFORE Nr. 4. It must survive the section boundary.
    queen_aria = [sec for sc in scenes for sec in sc['sections']
                  if sec.get('number') == 4]
    if len(queen_aria) != 1 or not any(
        turn['speaker'] == 'KÖNIGINN'
        and turn['speakerTranslation'] == 'Queen of the Night'
        and turn.get('_sourceLines')
        for turn in queen_aria[0]['turns']
    ):
        raise ValueError('Queen of the Night cue was lost at Nr. 4 heading')
    return original

def translate_all(scenes):
    # Argos Translate is an offline open-source engine: no copied English
    # translation, no external service or translation dependency on the site.
    import argostranslate.package
    import argostranslate.translate
    installed = argostranslate.translate.get_installed_languages()
    if not any(x.code == 'de' for x in installed):
        packages = argostranslate.package.get_available_packages()
        model = next(p for p in packages if p.from_code == 'de' and p.to_code == 'en')
        argostranslate.package.install_from_path(model.download())
    languages = argostranslate.translate.get_installed_languages()
    source = next(x for x in languages if x.code == 'de')
    dest = next(x for x in languages if x.code == 'en')
    translator = source.get_translation(dest)
    memo = {}
    def trans(line):
        if line in memo: return memo[line]
        # Very long spoken exchanges are split for a smaller translation
        # context, then rejoined INSIDE the corresponding original line.
        pieces=[]
        remainder=line
        while len(remainder)>360:
            candidates=[remainder.rfind(sep, 160, 360) for sep in ('. ', '! ', '? ', '; ', ' - ', ', ')]
            cut = max(candidates)
            if cut<120: cut=350
            else: cut+=1
            pieces.append(remainder[:cut].strip())
            remainder=remainder[cut:].strip()
        if remainder: pieces.append(remainder)
        result=' '.join(translator.translate(p).strip() for p in pieces).strip()
        if not result: raise ValueError('English draft missing for German line: '+line)
        memo[line]=result
        return result
    total=0
    for scene in scenes:
        for sec in scene['sections']:
            for turn in sec['turns']:
                originals=turn.pop('_sourceLines')
                translated=[trans(line) for line in originals]
                if len(originals)!=len(translated): raise ValueError('Translation row mismatch')
                turn['original']='\n'.join(originals)
                turn['translation']='\n'.join(translated)
                total+=len(originals)
    print('Translated',total,'original printed lines; unique',len(memo))


def write_content(scenes):
    act = ROOT/'src/data/libretto-die-zauberflote-act-1.js'
    act.write_text('// Opera Guide, German Die Zauberflöte, ERSTER AKT (Auftritte 1–19).\n'
      '// German: historical Emanuel Schikaneder libretto (1791), not modernized.\n'
      '// English: offline machine-assisted draft; NOT editorially reviewed.\n'
      '// Source: '+SOURCE+' (retrieved 26 October 2026).\n'
      'export const dieZauberfloteActOneScenes = '+json.dumps(scenes,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
    bundle = ROOT/'src/data/libretto-die-zauberflote-bundle.js'
    bundle.write_text('''// Die Zauberflöte: Act I only. Act II is not yet populated.
import { getOpera } from "./operas.js";
import { dieZauberfloteActOneScenes } from "./libretto-die-zauberflote-act-1.js";
export const dieZauberflote = {
  slug: "the-magic-flute",
  opera: getOpera("the-magic-flute"),
  composerShort: "W. A. MOZART",
  mobileComposer: "Wolfgang Amadeus Mozart",
  mobileArtworkUrl: "./public/images/the-magic-flute-art.webp",
  mobileArtworkLabel: "Die Zauberflöte",
  originalLanguage: "Deutsch",
  translationLanguage: "English",
  partialLibretto: true, // Only Act I is published; Act II is not yet available.
  continuousAct: true,
  preserveLineBreaks: true,
  alignVerseLines: true,
  threeLineOutline: true,
  sourceTitlesOnly: true,
  sceneOriginalPrefix: "Auftritt",
  stageDirectionSpeaker: "Stage direction",
  stageDirectionLabel: "Stage direction",
  translatedForms: {},
  acts: [{ number: 1, originalHeading: "Erster Akt", prelude: { title: "Ouvertüre", translation: "Overture" }, scenes: dieZauberfloteActOneScenes }],
  characters: ["Tamino", "Pamina", "Papageno", "Queen of the Night", "Sarastro", "Monostatos", "Three Ladies", "Three Boys"],
  synopsis: {
    eyebrow: "W. A. Mozart · Singspiel in two acts · Act I available",
    paragraphs: [
      "The young prince Tamino is pursued by a serpent and rescued by the Queen of the Night’s three attendants. She shows him a portrait of Pamina, who is being held in Sarastro’s domain, and persuades him to set out to rescue her. The bird-catcher Papageno joins him, carrying magic bells, while Tamino receives a magic flute.",
      "Papageno finds Pamina and they try to escape together. Tamino reaches the temple of wisdom, where he begins to doubt what he has been told about Sarastro. At the end of Act I, Pamina and Tamino meet in Sarastro’s presence, and the two young men are ordered to enter the temple for their trials."
    ],
    characters: [
      ["Tamino", "Tenor", "A prince who seeks to rescue Pamina."],
      ["Pamina", "Soprano", "The Queen of the Night’s daughter."],
      ["Papageno", "Baritone", "A bird-catcher who accompanies Tamino."],
      ["Queen of the Night", "Soprano", "Pamina’s mother."],
      ["Sarastro", "Bass", "The high priest who holds Pamina."],
      ["Monostatos", "Tenor", "An overseer in Sarastro’s household."]
    ]
  },
  source: "Act I only. German source: Emanuel Schikaneder (1791), Opera Guide, https://opera-guide.ch/en/operas/die%2Bzauberflote/libretto/de/ (retrieved 26 October 2026). All 19 source Auftritte and numbered musical sections 1–8 retained. German text keeps historical orthography. English is an offline machine-assisted first draft and HAS NOT been editorially reviewed; do not cite as a verified translation. Act II is not yet implemented."
};
''',encoding='utf-8')
    loader = ROOT/'src/data/libretto-loader.js'
    code=loader.read_text(encoding='utf-8')
    if '"the-magic-flute": ()' not in code:
        needle='  "samson-et-dalila": () => import('
        assert needle in code, 'Cannot find loader insertion point'
        code=code.replace(needle, '  "the-magic-flute": () => import("./libretto-die-zauberflote-bundle.js?v=zauberflote-act1-20261026").then(module => module.dieZauberflote),\n'+needle)
        loader.write_text(code,encoding='utf-8')
    reg=ROOT/'src/data/libretto-registry.js'
    code=reg.read_text(encoding='utf-8')
    if 'dieZauberflote' not in code:
        needle='const completeLibretti ='
        assert needle in code
        code=code.replace(needle, 'import { dieZauberflote } from "./libretto-die-zauberflote-bundle.js";\n\n'+needle)
        code=code.replace('const completeLibretti = {', 'const completeLibretti = { [dieZauberflote.slug]: dieZauberflote,')
        reg.write_text(code,encoding='utf-8')
    # One-act regression contract. This does not claim Act II is prepared.
    test_file=ROOT/'tests/die-zauberflote-act-1.test.mjs'
    test_file.write_text('''import test from "node:test";
import assert from "node:assert/strict";
import {dieZauberflote} from "../src/data/libretto-die-zauberflote-bundle.js";
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
    assert.equal(turn.original.split("\\n").length,turn.translation.split("\\n").length,
       "German/English printed lines must remain paired");
    lines+=turn.original.split("\\n").length;
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
''',encoding='utf-8')
    # Update contracts to include the partial (Act I only) libretto.
    for file_name in ['tests/lazy-libretto-loading.test.mjs',
                      'tests/libretto-content.test.mjs',
                      'tests/site-dependency-integrity.test.mjs']:
        test_path = ROOT / file_name
        test_text = test_path.read_text(encoding='utf-8')
        test_text = test_text.replace('librettoCatalog.length, 11', 'librettoCatalog.length, 12')
        if file_name.endswith('lazy-libretto-loading.test.mjs'):
            test_text = test_text.replace("length, 11);", "length, 12);")
            test_text = test_text.replace(
              "(loader.match(/: \\(\\) => import\\(/g) || []).length, 11",
              "(loader.match(/: \\(\\) => import\\(/g) || []).length, 12")
        if file_name.endswith('site-dependency-integrity.test.mjs'):
            test_text = test_text.replace(
               'assert.equal(libretto.acts.length, metadata.acts, libretto.slug + ": wrong act count");',
               'assert.equal(libretto.acts.length, libretto.partialLibretto ? 1 : metadata.acts, libretto.slug + ": wrong available act count");')
        test_path.write_text(test_text, encoding='utf-8')
    planned = ROOT/'tests/catalog-pages.test.mjs'
    code = planned.read_text(encoding='utf-8')
    code=code.replace('"la-traviata", "the-magic-flute", "aida"',
                      '"la-traviata", "aida"')
    planned.write_text(code, encoding='utf-8')
    # Expand real-browser smoke review to this opera's new first-act route.
    visual = ROOT/'tests/browser-visual-smoke.mjs'
    code=visual.read_text(encoding='utf-8')
    code=code.replace('"madama-butterfly", "tosca", "samson-et-dalila"',
                      '"madama-butterfly", "tosca", "samson-et-dalila", "the-magic-flute"')
    visual.write_text(code, encoding='utf-8')
    # The boot URL must change so old cached main.js cannot mask the addition.
    boot = ROOT/'src/boot.js'
    code=boot.read_text(encoding='utf-8').replace(
       'main.js?v=outline-label-footer-20261024',
       'main.js?v=magic-flute-act1-20261026')
    boot.write_text(code, encoding='utf-8')
    html = ROOT/'index.html'
    code=html.read_text(encoding='utf-8').replace(
       'src/boot.js?v=verified-lyric-lines-20261023',
       'src/boot.js?v=magic-flute-act1-20261026')
    html.write_text(code, encoding='utf-8')
    # Bust the on-demand module cache; the existing user preference state remains intact.
    main=ROOT/'src/main.js'
    code=main.read_text(encoding='utf-8')
    code=code.replace('libretto-loader.js?v=on-demand-20261023', 'libretto-loader.js?v=magic-flute-act1-20261026')
    main.write_text(code, encoding='utf-8')
    # An explicit partial status is consistent with the catalog listing.
    print('Wrote German/English Act I, bundle and loader. Act II remains planned.')


def main():
    req=Request(SOURCE, headers={'User-Agent':'Mozilla/5.0 (compatible; personal-educational-opera-site/1.0)'})
    with urlopen(req, timeout=30) as response:
        html=response.read().decode('utf-8')
    lines=page_lines(html)
    print('Opera Guide Act I extracted printed lines:',len(lines))
    scenes=split_entries(lines)
    source_lines=count_and_validate(scenes)
    print('Scenes:',len(scenes),'paired original lines:',len(source_lines))
    translate_all(scenes)
    write_content(scenes)

if __name__ == '__main__': main()