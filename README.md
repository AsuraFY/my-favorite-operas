# My Favorite Operas

A dependency-free, responsive collection of operas with synopses, musical outlines, and side-by-side libretti. Così fan tutte has a completed Italian/English libretto. Other works currently have introductory pages.

## Run locally

```sh
python3 -m http.server 4173
```

Open http://localhost:4173. Hash routes work on GitHub Pages without server-side rewrites.

## Regression tests

Node 20+ is recommended. No npm dependencies need to be installed.

```sh
npm test
```

The tests check 34 scenes, 69 sections, 871 bilingual dialogue/stage-direction entries, complete scene rendering, synopsis and outlines, links, and a fictional three-act German opera. Also perform manual desktop/mobile browser checks before deploying.

## Architecture

- src/data/operas.js — directory records, titles, composers, librettists and search aliases.
- src/data/libretto-registry.js — complete libretti registered by opera slug, plus synopsis, character, and presentation metadata.
- src/data/libretti.js and src/data/libretti-act2.js — the original Così act data, retained without changing translations.
- src/libretto-reader.js — shared reader factory, synopsis, full outline, act/scene navigation, credits and bilingual rows.
- src/main.js — hash routing, metadata search, sticky navigation, desktop collapse, mobile drawer, deep-link and scroll controllers.
- styles.css — responsive reader appearance.
- tests/libretto-regression.test.mjs — automated data and rendering checks.

## Adding an opera with a complete libretto

1. Add the opera to src/data/operas.js with a unique slug and its metadata. Optional aliases improve search.
2. Create separate act/scene data modules. Keep the source text and translation together in ordered turns.
3. Import those acts into src/data/libretto-registry.js and register a configuration under completeLibretti, using the SAME slug as the directory record.
4. Run npm test and manually review the reader, outline, navigation, search, and mobile layout.

An opera with no registered libretto continues to display its original introduction page. No copy of the reader or navigation code is needed.

### Data schema example (fictional, not a newly added opera)

```js
const example = {
  slug: "example-opera",
  opera: getOpera("example-opera"),
  originalLanguage: "Deutsch",
  translationLanguage: "English",
  sceneOriginalPrefix: "Szene",
  characters: ["Helena"],
  synopsis: {
    eyebrow: "An opera in three acts",
    paragraphs: ["A brief synopsis."],
    characters: [["Helena", "Soprano", "An example character."]]
  },
  acts: [{
    number: 1, originalHeading: "Erster Akt",
    scenes: [{
      number: 1, summary: "Short scene description.",
      sections: [{
        number: 1, type: "Arie", originalTitle: "Die Melodie",
        participants: ["Helena"],
        turns: [
          { speaker: "Helena", original: "Guten Tag", translation: "Good morning" },
          { speaker: "Stage direction", original: "Sie geht.", translation: "She leaves." }
        ]
      }]
    }]
  }]
};
```

Acts, scenes and sections are arrays in reading order. Musical numbering is optional. Supported optional registry fields include composerShort, mobileComposer, mobileArtworkLabel, mobileArtworkUrl, sceneOrdinals, recitativeLabel, numberLabel, translatedForms, ensembleLabels, disguises (act:scene lookup) and sectionTitleOverrides (act:scene:sectionIndex lookup). A mobile artwork URL is optional; without it the reader uses a neutral scenic gradient.

Older Così data files still use section.label and turn.it/turn.en, which remain supported. New libretti should use section.type/number/originalTitle and turn.original/translation. Stage directions should identify the stageDirectionSpeaker (default: Stage direction). The Italian/English CSS class names remain for compatibility, but language headings are data-driven.

## Routes

- #/ — Home
- #/operas — Opera directory, including accent-insensitive search
- #/about — About
- #/operas/SLUG — Synopsis for a registered libretto, otherwise the introduction page
- #/operas/SLUG?view=outline — Full Libretto Outline
- #/operas/SLUG?act=2 — Top of the first scene of Act II
- #/operas/SLUG?act=2&scene=6&item=1 — Specific musical section

The homepage and directory search title, alias, composer and librettist fields. Search in this opera searches within the selected libretto and is a separate feature.

## Deployment

The GitHub Pages workflow publishes from main. All development must remain on Update until a merge/deployment is explicitly authorized.
