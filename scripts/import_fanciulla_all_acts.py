#!/usr/bin/env python3
"""One-time, source-faithful preparation of the three La fanciulla del West acts.

The URL was chosen by the project owner. Never invent source numbers or scenes.
Italian source retains printed lyric lines; English is a machine-assisted draft.
"""
from __future__ import annotations
import json
import re
from pathlib import Path
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup, NavigableString

ROOT = Path(__file__).resolve().parents[1]
SOURCE = 'https://www.flaminioonline.it/Guide/Puccini/Puccini-West78-testo.html'
EDITION = 'Civinini and Zangarini, Ricordi (1910), Italian libretto as transcribed by Flaminio Online'
ACTS = {'ATTO PRIMO': 1, 'ATTO SECONDO': 2, 'ATTO TERZO': 3}
HEADINGS = ('Atto primo', 'Atto secondo', 'Atto terzo')
CHARACTERS = {
    'MINNIE':'Minnie','JOHNSON':'Johnson','DICK JOHNSON':'Johnson',
    'RANCE':'Rance','JACK RANCE':'Rance','NICK':'Nick','ASHBY':'Ashby',
    'SONORA':'Sonora','TRIN':'Trin','SID':'Sid','BELLO':'Bello',
    'HARRY':'Harry','JOE':'Joe','HAPPY':'Happy','LARKENS':'Larkens',
    'BILLY':'Billy Jackrabbit','BILLY JACKRABBIT':'Billy Jackrabbit',
    'WOWKLE':'Wowkle','WALLACE':'Jake Wallace','JAKE WALLACE':'Jake Wallace',
    'CASTRO':'José Castro','JOSE CASTRO':'José Castro','JOSÉ CASTRO':'José Castro',
    'MINATORI':'Miners','VOCI':'Voices','VOCI LONTANE':'Distant voices',
    'UNA VOCE LONTANA':'A distant voice','CORO':'Chorus','POSTIGLIONE':'Stagecoach driver',
    'UN POSTIGLIONE':'Stagecoach driver','TUTTI':'All'
}
# Source-backed incipits are *navigation landmarks*, not official musical
# numbers, named arias, separate dramatic scenes, or editorially final titles.
# These phrases appear in the supplied primary text and several in the
# same website's listening guide. Omit missing landmarks, never fabricate.
LANDMARKS = {
  1:[
    ('Che faranno i vecchi miei', 'What are my dear old parents doing?'),
    ('Dove eravamo?', 'Where were we?'),
    ('Minnie, dalla mia casa', 'Minnie, from my home'),
    ('Laggiù nel Soledad', 'Far away in Soledad'),
    ('Quello che tacete', 'What you leave unsaid'),
  ],
  2:[
    ('Or son sei mesi', 'It is six months now'),
  ],
  3:[
    ('Ch’ella mi creda', 'Let her believe that I am'),
    ('E anche tu lo vorrai', 'And you, too, will want it'),
    ('Addio, mia dolce terra', 'Farewell, my beloved land'),
  ]
}

def normalize(label):
    return re.sub(r'\s+', ' ', label.replace('’', "'").replace('‘', "'")).strip().upper()

def closest_heading(node):
    for p in node.parents:
        if getattr(p,'name',None) in ('h1','h2','h3','h4','h5','h6'):
            return p
        if getattr(p,'name',None) in ('body', 'html'):
            break
    return None

def fetch_source():
    req=Request(SOURCE, headers={'User-Agent': 'Opera-library-archive/1.0 (content source attribution; research)'})
    with urlopen(req,timeout=50) as response:
        body=response.read()
    soup=BeautifulSoup(body,'html.parser')
    for tag in soup(['script','style','nav','footer','iframe']):tag.decompose()
    acts={i:[] for i in (1,2,3)}
    act=0; speaker=None; cue_tag=None
    for node in soup.descendants:
        if not isinstance(node,NavigableString):continue
        if node.parent is None:continue
        if any(getattr(p,'name',None) in ('a','svg','head') for p in node.parents):continue
        val=str(node)
        vals=[re.sub(r'[ \t\xa0]+',' ',x).strip() for x in val.splitlines()]
        vals=[x for x in vals if x]
        if not vals:continue
        heading=closest_heading(node)
        kind=heading.name if heading else None
        # h6 are the source's printed speaker cues; h5 are stage directions.
        for text in vals:
            clean=normalize(text)
            if clean in ACTS and len(text)<25:
                act=ACTS[clean];speaker=None;cue_tag=None;continue
            if text.strip().upper().replace('’', "'").startswith("FINE DELL'") and act==3:
                act=0;break
            if act==0:continue
            if kind=='h6':
                speaker=normalize(text);cue_tag=heading
                continue
            if kind=='h5':
                entry={'type':'direction','speaker':'Stage direction','speakerTranslation':'Stage direction','text':text}
            else:
                # Descriptive prologues appear before the first cue in each act.
                if speaker is None:
                    entry={'type':'direction','speaker':'Stage direction','speakerTranslation':'Stage direction','text':text}
                else:
                    label=CHARACTERS.get(speaker)
                    if not label:
                        # Preserve complex printed ensemble cues; translate verified
                        # individual components and retain ambiguous source wording.
                        components=re.split(r'\s+E\s+|\s*,\s*',speaker)
                        label=', '.join(CHARACTERS.get(x,x.title()) for x in components)
                    entry={'type':'verse','speaker':speaker,'speakerTranslation':label,'text':text}
            # Print row granularity is the source line, not a browser word-wrap.
            acts[act].append(entry)
    for act in (1,2,3):
        rows=acts[act]; verses=[x for x in rows if x['type']=='verse']
        if len(rows)<(450 if act!=3 else 250):raise ValueError(f'Incomplete Act {act}: only {len(rows)} printed rows')
        if len(verses)<(230 if act!=3 else 140):raise ValueError(f'Incomplete Act {act}: only {len(verses)} sung/spoken lines')
        if not any('MINNIE' in x['speaker'] for x in verses):raise ValueError('Act '+str(act)+' lacks Minnie')
        print(f'Act {act}: {len(rows)} printed source rows, {len(verses)} text rows, {len(rows)-len(verses)} directions')
    if not any(re.search(r'Addio, addio, addio!', x['text'],re.I) for x in acts[3]):raise ValueError('Final opera line absent')
    return acts

def pack(rows):
    out=[]
    for row in rows:
        if (out and row['type']=='verse' and out[-1]['speaker']==row['speaker'] and
            out[-1]['speaker']!='Stage direction' and out[-1].get('_kind')=='verse'):
            out[-1]['_lines'].append(row['text'])
        else:
            out.append({'speaker':row['speaker'],'speakerTranslation':row['speakerTranslation'],
                'literalText':True,'_kind':row['type'],'_lines':[row['text']]})
    return out

def locate(acts,number,needle):
    # Search textual rows without changing quotation marks or spelling in output.
    n=needle.casefold().replace('’',"'")
    for i,row in enumerate(acts[number]):
        text=row['text'].casefold().replace('’',"'")
        if n in text:return i
    return -1

def make_sections(acts,act):
    lines=acts[act]
    positions=[]
    for needle,translation in LANDMARKS[act]:
        index=locate(acts,act,needle)
        if index<0:
            print(f'Landmark not printed exactly in act {act}: {needle!r}, skipping')
            continue
        if index and (not positions or index>positions[-1][0]):positions.append((index,needle,translation))
    starts=[(0,None,None)]+positions
    sections=[]
    for j,(start,title,en) in enumerate(starts):
        stop=starts[j+1][0] if j+1<len(starts) else len(lines)
        if stop<=start:continue
        turns=pack(lines[start:stop]);participants=[]
        for t in turns:
            if t['speaker']=='Stage direction':continue
            for name in t['speakerTranslation'].split(', '):
                if name not in participants:participants.append(name)
        section={'type':'Passaggio','threeLineOutline':True,'sourceTitlesOnly':True,
            'participants':participants,'turns':turns}
        if title:
            section['originalTitle']=title
            section['translatedTitle']=en
            section['sourceNote']='Navigational lyric incipit from the libretto; not an official musical number or formal section title.'
        sections.append(section)
    merged=[l for sec in sections for t in sec['turns'] for l in t['_lines']]
    if merged != [x['text'] for x in lines]:raise ValueError(f'Act {act} lines displaced or omitted')
    return sections

def translate(sections_by_act):
    import argostranslate.package
    import argostranslate.translate
    installed=argostranslate.translate.get_installed_languages()
    it=next((x for x in installed if x.code=='it'),None)
    en=next((x for x in installed if x.code=='en'),None)
    if not it or not en or not it.get_translation(en):
        packages=argostranslate.package.get_available_packages()
        selected=next((p for p in packages if p.from_code=='it' and p.to_code=='en'),None)
        if not selected:raise RuntimeError('Offline Italian-English package not available')
        argostranslate.package.install_from_path(selected.download())
    langs=argostranslate.translate.get_installed_languages()
    engine=next(x for x in langs if x.code=='it').get_translation(next(x for x in langs if x.code=='en'))
    cache={}
    def one(text):
        if text in cache:return cache[text]
        # Huge descriptive stage directions can exceed a sentence model's limit.
        words=text.split(' ');chunks=[];buf=[];size=0
        for word in words:
            if size+len(word)>370 and buf:
                chunks.append(' '.join(buf));buf=[];size=0
            buf.append(word);size+=len(word)+1
        if buf:chunks.append(' '.join(buf))
        val=' '.join(engine.translate(chunk).strip() for chunk in chunks).strip()
        if not val:raise ValueError('No English draft returned for source line '+text[:100])
        cache[text]=val
        return val
    allturns=[t for secs in sections_by_act.values() for sec in secs for t in sec['turns']]
    for i,t in enumerate(allturns):
        original=t.pop('_lines');t.pop('_kind',None)
        rendered=[one(line) for line in original]
        t['original']='\n'.join(original)
        t['translation']='\n'.join(rendered)
        if t['original'].count('\n')!=t['translation'].count('\n'):raise ValueError('Broken text alignment')
        if i and i%300==0:print(f'Translation draft progress: {i}/{len(allturns)} turns',flush=True)
    print(f'Prepared English draft for {len(cache)} distinct printed lines, unreviewed')

def write_outputs():
    acts=fetch_source()
    sections={a:make_sections(acts,a) for a in (1,2,3)}
    translate(sections)
    out=ROOT/'src/data'
    for act in (1,2,3):
        path=out/f'libretto-la-fanciulla-del-west-act-{act}.js'
        obj=[{'number':1,'originalHeading':HEADINGS[act-1],
            'translatedHeading':'Act '+('I','II','III')[act-1],
            'sections':sections[act],'summary':''}]
        header=(f'// Civinini–Zangarini (1910) via Flaminio Online, Act {act}.\n'
                '// All original line breaks retained. English machine-assisted draft; not reviewed.\n'
                f'// Source: {SOURCE}\n')
        path.write_text(header+f'export const fanciullaAct{act}Scenes = '+json.dumps(obj,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
    bundle='''// Complete three-act Italian source, English unreviewed draft.
import { getOpera } from "./operas.js";
import { fanciullaAct1Scenes } from "./libretto-la-fanciulla-del-west-act-1.js";
import { fanciullaAct2Scenes } from "./libretto-la-fanciulla-del-west-act-2.js";
import { fanciullaAct3Scenes } from "./libretto-la-fanciulla-del-west-act-3.js";
export const fanciulla = {
  slug: "la-fanciulla-del-west",
  opera: getOpera("la-fanciulla-del-west"),
  composerShort: "G. PUCCINI",
  mobileComposer: "Giacomo Puccini",
  mobileArtworkUrl: "./public/images/la-fanciulla-del-west-art.webp",
  mobileArtworkLabel: "La fanciulla del West",
  originalLanguage: "Italiano",
  translationLanguage: "English",
  continuousAct: true,
  preserveLineBreaks: true,
  alignVerseLines: true,
  threeLineOutline: true,
  sourceTitlesOnly: true,
  sceneDivisions: false,
  stageDirectionSpeaker: "Stage direction",
  stageDirectionLabel: "Stage direction",
  translatedForms: {},
  acts: [
    { number: 1, originalHeading: "Atto primo", scenes: fanciullaAct1Scenes },
    { number: 2, originalHeading: "Atto secondo", scenes: fanciullaAct2Scenes },
    { number: 3, originalHeading: "Atto terzo", scenes: fanciullaAct3Scenes }
  ],
  characters: ["Minnie", "Johnson", "Rance", "Nick", "Sonora", "Ashby", "Wowkle", "Billy Jackrabbit", "Miners"],
  synopsis: {
    eyebrow: "Giacomo Puccini · Opera in three acts · English draft",
    paragraphs: [
      "At the Polka saloon in California, Minnie watches over a camp of miners. When a stranger calling himself Dick Johnson appears, she recognises a man she met earlier and invites him to visit her cabin. The sheriff, Jack Rance, desires Minnie and suspects the stranger.",
      "At her cabin, Minnie discovers that Johnson is the outlaw Ramerrez. When he is wounded and pursued, she hides him from Rance and stakes his life on a game of poker, secretly cheating to save him.",
      "The miners capture Johnson and prepare to hang him. Minnie intervenes, reminding them of her care and friendship, and persuades them to let the couple leave California together."
    ]
  },
  source: "Three-act Italian text: Guelfo Civinini and Carlo Zangarini, La fanciulla del West, Ricordi (1910), transcribed at https://www.flaminioonline.it/Guide/Puccini/Puccini-West78-testo.html (retrieved 26 October 2026). The source contains act headings but no numbered scenes or musical sections; neutral passage links and source-verified lyric incipits are editorial navigation, NOT official numbers or formal titles. English is an offline machine-assisted draft and HAS NOT been editorially reviewed."
};
'''
    (out/'libretto-la-fanciulla-del-west-bundle.js').write_text(bundle,encoding='utf-8')
    def rewrite(path,old,new):
        p=ROOT/path;c=p.read_text(encoding='utf8')
        if old not in c:raise ValueError('Missing patch marker '+str(path)+' '+old[:80])
        p.write_text(c.replace(old,new),encoding='utf8')
    rewrite('src/data/libretto-loader.js',
      '  "samson-et-dalila": () => import(',
      '  "la-fanciulla-del-west": () => import("./libretto-la-fanciulla-del-west-bundle.js?v=fanciulla-three-acts-20261026").then(module => module.fanciulla),\n  "samson-et-dalila": () => import(')
    rewrite('src/data/libretto-registry.js',
      'const completeLibretti = {',
      'import { fanciulla } from "./libretto-la-fanciulla-del-west-bundle.js?v=fanciulla-three-acts-20261026";\n\nconst completeLibretti = { [fanciulla.slug]: fanciulla, ')
    for path in ['tests/lazy-libretto-loading.test.mjs','tests/site-dependency-integrity.test.mjs','tests/libretto-content.test.mjs']:
        rewrite(path,'librettoCatalog.length, 12','librettoCatalog.length, 13')
    rewrite('tests/lazy-libretto-loading.test.mjs','(loader.match(/: \\(\\) => import\\(/g) || []).length, 12','(loader.match(/: \\(\\) => import\\(/g) || []).length, 13')
    # If a browser test explicitly checks each existing loader, extend its list.
    rewrite('tests/catalog-pages.test.mjs','[ "la-fanciulla-del-west", "manon",','[ "manon",')
    rewrite('src/main.js','libretto-loader.js?v=magic-flute-outline-20261026','libretto-loader.js?v=fanciulla-three-acts-20261026')
    rewrite('src/boot.js','main.js?v=magic-flute-outline-20261026','main.js?v=fanciulla-three-acts-20261026')
    rewrite('index.html','boot.js?v=magic-flute-outline-20261026','boot.js?v=fanciulla-three-acts-20261026')
    path=ROOT/'tests/fanciulla-del-west-complete.test.mjs'
    path.write_text('''import test from "node:test";
import assert from "node:assert/strict";
import { fanciulla } from "../src/data/libretto-la-fanciulla-del-west-bundle.js?v=fanciulla-three-acts-20261026";
import { getLibretto } from "../src/data/libretto-registry.js";
import { loadLibretto, hasCompleteLibretto } from "../src/data/libretto-loader.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";
import { resetReaderLocation } from "./helpers/libretto-helpers.mjs";
test("all three Flaminio acts have complete bilingual aligned text, speakers and directions", async()=>{
  assert.deepEqual(fanciulla.acts.map(act=>act.number),[1,2,3]);
  assert.deepEqual(fanciulla.acts.map(act=>act.scenes.length),[1,1,1]);
  const minLines=[450,450,250];
  for(const [i,act] of fanciulla.acts.entries()){
    const sections=act.scenes.flatMap(scene=>scene.sections);
    assert.ok(sections.length>=1);
    assert.ok(sections.every(section=>section.number==null),"Unnumbered source must not acquire invented musical numbers");
    const turns=sections.flatMap(section=>section.turns);
    let lines=0;
    for(const turn of turns){
      assert.ok(turn.original?.trim()&&turn.translation?.trim());
      assert.equal(turn.original.split("\\n").length,turn.translation.split("\\n").length);
      lines+=turn.original.split("\\n").length;
    }
    assert.ok(lines>=minLines[i],`Incomplete Act ${i+1}: only ${lines} printed lines`);
    assert.ok(turns.some(turn=>turn.speaker==="Stage direction"));
    assert.ok(turns.some(turn=>turn.speaker==="MINNIE"));
  }
  assert.strictEqual(getLibretto("la-fanciulla-del-west"),fanciulla);
  assert.ok(hasCompleteLibretto("la-fanciulla-del-west"));
  assert.strictEqual(await loadLibretto("la-fanciulla-del-west"),fanciulla);
});
test("full outline and each act reader work without fabricated source scene/number headings",()=>{
  resetReaderLocation();
  const reader=createLibrettoRenderer(fanciulla);
  const outline=reader.outline();
  for(let act=1;act<=3;act++){
    window.location.hash="#/operas/la-fanciulla-del-west?act="+act;
    const page=reader.scene(1);
    assert.ok(page.includes("End of Act "+["","I","II","III"][act]));
    assert.ok(outline.includes("?act="+act));
    assert.ok(page.includes("libretto-row"));
  }
  assert.ok(outline.includes("Passaggio"));
  assert.ok(!/N\\. 22|N\\. 1 · Passaggio/.test(outline));
});
''',encoding='utf-8')
    report=ROOT/'docs/reviews/la-fanciulla-del-west-import-2026-10-26.md'
    report.parent.mkdir(parents=True,exist_ok=True)
    report.write_text(f'''# La fanciulla del West — complete three-act import checkpoint

**Primary source:** {SOURCE} (Civinini and Zangarini, Ricordi 1910; retrieved 26 October 2026).  
**Structure:** Three acts; source provides no numbered dramatic scenes or named musical sections. One continuous reader per act. Unnumbered Passaggio groups are navigational only.  
**Language:** Original Italian as source printed, original line breaks retained; offline machine-assisted English drafts, NOT editorially reviewed.  
**Italian source lines:** Act I: {len(acts[1])}; Act II: {len(acts[2])}; Act III: {len(acts[3])}.  
**Source singers:** Stage directions and speaker cues transcribed using HTML heading classifications. Compound speaker names and stage/sung boundaries are provisional.  
**Pending:** Review printed source against a 1910 Ricordi edition; correct historical italics, speaker cues, and poetic translations when listening; verify desktop/mobile reader and exact performance segmentation. Do not claim this is an editorially final score or English edition.
''',encoding='utf8')
    print('Generated all 3 Italian/English acts, loader, registry, regression tests and review memo')

if __name__=='__main__':write_outputs()