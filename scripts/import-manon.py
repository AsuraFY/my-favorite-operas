#!/usr/bin/env python3
"""Import public-domain French Manon text and independently draft English with MarianMT.

Runs in GitHub Actions on the Update branch only. Never copy the modern English
translation stored in the source repository: the English below is generated from
the original French text by an open machine-translation model.
"""
import json
import re
import urllib.request
from pathlib import Path

SOURCE_URL = "https://raw.githubusercontent.com/martin-he543/sottovoce/main/public/libretti/texts/Q842063.json"
FALLBACK_URL = "https://raw.githubusercontent.com/martin-he543/sottovoce/ff573f9e35a565bdb6afed35c83f091e69f5a40b/public/libretti/texts/Q842063.json"
ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src" / "data"
SOURCE_CREDIT = "https://opera-guide.ch/operas/manon/libretto/fr/"
MODEL_NAME = "Helsinki-NLP/opus-mt-fr-en"
ACTS = [
    (1, [(1, "L’hôtellerie d’Amiens", 1)], "manonActOneScenes"),
    (2, [(2, "L’appartement de la rue Vivienne", 1)], "manonActTwoScenes"),
    (3, [(3, "Le Cours-la-Reine", 1), (4, "Saint-Sulpice", 2)], "manonActThreeScenes"),
    (4, [(5, "L’Hôtel de Transylvanie", 1)], "manonActFourScenes"),
]

def get_source():
    for url in (SOURCE_URL, FALLBACK_URL):
        try:
            with urllib.request.urlopen(url, timeout=90) as response:
                obj=json.load(response)
            if obj.get("id") != "Q842063" or len(obj.get("acts",[])) != 6:
                raise ValueError("Unexpected source content: refuse to import")
            return obj
        except Exception as exc:
            print(f"Source attempt failed {url}: {exc}", flush=True)
    raise RuntimeError("Neither published French source was accessible")

def get_translator():
    import torch
    from transformers import MarianMTModel, MarianTokenizer
    torch.set_num_threads(2)
    tokenizer=MarianTokenizer.from_pretrained(MODEL_NAME)
    model=MarianMTModel.from_pretrained(MODEL_NAME)
    model.eval()
    return torch,tokenizer,model

def normalize_source(j):
    """Keep source order and labels, correcting obvious parser-as-speaker lines."""
    parsed={}
    texts=[]
    for act_number, descriptors, variable in ACTS:
        scenes=[]
        for index, location, scene_number in descriptors:
            raw=j["acts"][index]["scenes"][0]["lines"]
            entries=[]
            current_speaker=""
            for speaker, text, kind in raw:
                text=str(text).strip()
                if not text:
                    continue
                if kind=="dir" or not speaker:
                    entries.append({"speaker":"Stage direction", "original":text})
                    texts.append(text)
                    continue
                # The upstream parser occasionally misclassifies stand-alone
                # uppercase singer labels as sung text. Preserve them as labels
                # for following turns rather than fabricate sung text.
                if re.fullmatch(r"[A-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒÆ ,’'\-]+(?: puis [A-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒÆ ,’'\-]+)?",text) and len(text)>5 and text[-1] not in ".!?":
                    current_speaker=text
                    continue
                label=current_speaker or speaker
                entries.append({"speaker":label,"original":text})
                texts.append(text)
                if current_speaker: current_speaker=""
            scenes.append((scene_number,location,entries))
        parsed[act_number]=(variable,scenes)
    return parsed,texts

def translate_all(texts,torch,tokenizer,model):
    # Use context-preserving batches; each French source line is paired with
    # exactly one independent English model output in source order.
    translations=[]
    batch_size=20
    for start in range(0,len(texts),batch_size):
        sample=texts[start:start+batch_size]
        tokens=tokenizer(sample,return_tensors="pt",padding=True,truncation=True,max_length=180)
        with torch.no_grad():
            result=model.generate(**tokens,max_new_tokens=180,num_beams=2)
        generated=tokenizer.batch_decode(result,skip_special_tokens=True)
        if len(generated)!=len(sample): raise ValueError("Translation length mismatch")
        translations.extend((line.strip() or "[Translation pending review]") for line in generated)
        if start % 160 == 0:
            print(f"English draft translated: {min(start+batch_size,len(texts))}/{len(texts)}",flush=True)
    return translations

def make_section(lines,index):
    speakers=list(dict.fromkeys(v["speaker"] for v in lines if v["speaker"]!="Stage direction"))
    vocal=next((v for v in lines if v["speaker"]!="Stage direction"),None)
    return {
        "type":"Passage", "incipitOnly":True,"sourceTitlesOnly":True,"threeLineOutline":True,
        "originalTitle":vocal["original"] if vocal else f"Passage {index}",
        "translatedTitle":vocal["translation"] if vocal else f"Passage {index}",
        "participants":speakers,
        "turns":[{
            "speaker":v["speaker"],
            "speakerTranslation":v["speaker"],
            "original":v["original"],
            "translation":v["translation"],
            "literalText":True
        } for v in lines],
    }

def build(parsed,translations):
    offset=0
    for act_number,(variable,scenes) in parsed.items():
        output=[]
        for number,location,entries in scenes:
            for item in entries:
                item["translation"]=translations[offset];offset+=1
            sections=[]
            current=[]
            source_lines=0
            for item in entries:
                if len(current)>=1 and source_lines>=32 and item["speaker"]!="Stage direction":
                    sections.append(make_section(current,len(sections)+1))
                    current=[]
                    source_lines=0
                current.append(item)
                source_lines+=1
            if current: sections.append(make_section(current,len(sections)+1))
            output.append({
                "number":number,
                "originalHeading":location,
                "translatedHeading":{1:"The inn at Amiens",2:"The apartment in Rue Vivienne",3:"Cours-la-Reine",4:"Saint-Sulpice",5:"The Hôtel de Transylvanie"}[act_number if act_number!=3 else (3 if number==1 else 4)] if act_number!=4 else "The Hôtel de Transylvanie",
                "summary":{
                    1:"At an inn in Amiens, Manon meets Des Grieux and they elope to Paris.",
                    2:"Manon and Des Grieux share a Paris apartment; wealth and family pressure threaten their love.",
                    3:"Manon appears at the Cours-la-Reine; then she confronts Des Grieux at Saint-Sulpice.",
                    4:"At the Hôtel de Transylvanie, gambling and an accusation lead to arrest."
                }[act_number],
                "sections":sections,
            })
        target=DATA/f"libretto-manon-act-{act_number}.js"
        target.write_text(
            f"// Manon (Massenet) — Act {act_number}, French transcription from {SOURCE_CREDIT}\n"
            f"// English: independently generated {MODEL_NAME} machine-translation working draft.\n"
            "// Translation and scene/speaker collation require human editorial review.\n"
            f"export const {variable} = "+json.dumps(output,ensure_ascii=False,indent=2)+";\n",
            encoding="utf-8"
        )
        print(f"Saved {target.name}: {len(output)} scenes / {sum(len(s['sections']) for s in output)} passages / {len(entries)} last-scene records",flush=True)
    if offset!=len(translations):raise ValueError(f"Unconsumed translations: {offset}/{len(translations)}")

def make_bundle():
    content="""// Manon, Jules Massenet — five-act bilingual working libretto.
// Acts I-IV: public-domain French transcribed at Opera Guide via Sottovoce;
// independent MarianMT English working translation, NOT editorially reviewed.
// Act V: 1895 J. C. Macy public-domain French/English edition (adapted variant).
import {getOpera} from './operas.js';
import {operaInformation} from './opera-information.js';
import {manonActOneScenes} from './libretto-manon-act-1.js?v=manon-full-20261029';
import {manonActTwoScenes} from './libretto-manon-act-2.js?v=manon-full-20261029';
import {manonActThreeScenes} from './libretto-manon-act-3.js?v=manon-full-20261029';
import {manonActFourScenes} from './libretto-manon-act-4.js?v=manon-full-20261029';
import {manonActFiveScenes} from './libretto-manon-act-5.js?v=manon-full-20261029';
const info = operaInformation['manon'];
export const manon = {
 slug:'manon',opera:getOpera('manon'),composerShort:'J. MASSENET',mobileComposer:'Jules Massenet',
 originalLanguage:'Français',translationLanguage:'English',
 continuousAct:true,preserveLineBreaks:true,alignVerseLines:false,
 threeLineOutline:true,sourceTitlesOnly:true,sourceSceneOutline:true,
 sceneOriginalPrefix:'Tableau',showReaderMusicalHeadings:false,
 stageDirectionSpeaker:'Stage direction',stageDirectionLabel:'Stage direction',
 acts:[
  {number:1,originalHeading:'PREMIER ACTE',scenes:manonActOneScenes},
  {number:2,originalHeading:'DEUXIÈME ACTE',scenes:manonActTwoScenes},
  {number:3,originalHeading:'TROISIÈME ACTE',scenes:manonActThreeScenes},
  {number:4,originalHeading:'QUATRIÈME ACTE',scenes:manonActFourScenes},
  {number:5,originalHeading:'CINQUIÈME ACTE',scenes:manonActFiveScenes},
 ],
 synopsis:{
  eyebrow:'Five-act bilingual working edition · Acts I–IV machine-translated English awaiting editorial review',
  paragraphs:info.synopsis,characters:info.characters
 },
 source:'French Acts I–IV: public-domain Meilhac/Gille libretto transcribed via https://opera-guide.ch/operas/manon/libretto/fr/ and Sottovoce Q842063. English Acts I–IV: newly generated Helsinki-NLP/opus-mt-fr-en (MarianMT) English working draft, not a published translation, not verified or line-by-line editorially reviewed. Act V: public-domain 1895 J. C. Macy bilingual edition, University of Rochester Sibley Music Library https://urresearch.rochester.edu/institutionalPublicationPublicView.action?institutionalItemId=28674. The 1895 edition presents Act V as an alternate Scene II of Act IV; versions differ. Section labels in Acts I–IV use source incipits as listening landmarks; not claimed musical number headings. Native-browser tests and authoritative critical collation pending.'
};
"""
    (DATA/"libretto-manon-bundle.js").write_text(content,encoding="utf-8")
    loader=DATA/"libretto-loader.js"
    txt=loader.read_text(encoding="utf-8")
    target='  "manon": () => import("./libretto-manon-bundle.js?v=manon-full-20261029").then(module => module.manon),\n'
    if '"manon":' not in txt:
        txt=txt.replace('const loaders = Object.freeze({\n','const loaders = Object.freeze({\n'+target,1)
        loader.write_text(txt,encoding="utf-8")
    else:print("Loader already has Manon registered",flush=True)

def main():
    obj=get_source()
    parsed,texts=normalize_source(obj)
    count=sum(len(entries) for variable,scenes in parsed.values() for _,_,entries in scenes)
    if count<1500:raise ValueError(f"Unsafe French record count: {count}")
    print(f"Source French records to process: {count}",flush=True)
    torch,tokenizer,model=get_translator()
    english=translate_all(texts,torch,tokenizer,model)
    build(parsed,english)
    make_bundle()
    if len(english)!=count:raise AssertionError("Incomplete translation")
    print(f"MANON BUILD SUCCESS: {count} parallel French/English records, Acts I-IV plus existing Act V.",flush=True)
if __name__=="__main__":main()
