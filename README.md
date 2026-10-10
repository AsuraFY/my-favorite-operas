# My Favorite Operas

A dependency-free, responsive collection of operas with synopses, musical outlines, and side-by-side libretti. Così fan tutte has a completed Italian/English libretto. The complete Italian libretto and new English translation of both acts of Il barbiere di Siviglia are available in the bilingual reader; the other works have introductory pages.

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

The tests check Così fan tutte’s 34 scenes, 69 sections and 871 bilingual entries, along with all 27 scenes and 679 bilingual entries across the Barber of Seville, reader rendering, synopsis and outlines, links, and a fictional three-act German opera. Also perform manual desktop/mobile browser checks before deploying.

## Opera collection and information pages

All six catalog entries have standalone information pages with artwork, verified composer and premiere details, act counts, a short synopsis, and principal characters. The information pages are defined by `src/opera-info-page.js` and `src/data/opera-information.js`, independent of whether a libretto has been prepared.

The four original directory images use separate quadrants of an existing source image, now aligned to prevent adjacent panels from appearing in a card. Turandot and Le nozze di Figaro have independent original SVG illustrations in `public/images/`.

Factual editorial references include the Metropolitan Opera synopses for Turandot, Le nozze di Figaro, Macbeth, Tristan und Isolde, and Il barbiere di Siviglia; the Teatro alla Scala and Opera di Roma archives for Turandot; Madison Opera for the 1786 Figaro premiere; and the existing Così fan tutte registry.

## Architecture

- src/data/operas.js — directory records, titles, composers, librettists, premiere facts, art paths and search aliases.
- src/data/opera-information.js — synopses and principal characters for all six works.
- src/opera-info-page.js — reusable opera information layout.
- src/data/libretto-registry.js — complete libretti registered by opera slug, plus synopsis, character, and presentation metadata.
- src/data/libretti.js and src/data/libretti-act2.js — the original Così act data, retained without changing translations.
- src/data/libretti-barbiere-act1.js and src/data/libretti-barbiere-act2.js — Italian/English scenes for Acts I and II of Il barbiere di Siviglia.
- src/libretto-reader.js — shared reader factory, synopsis, full outline, act/scene navigation, credits and bilingual rows.
- src/main.js — hash routing, metadata search, sticky navigation, desktop collapse, mobile drawer, deep-link and scroll controllers.
- styles.css — responsive reader appearance.
- tests/libretto-regression.test.mjs — automated libretto data and rendering checks.
- tests/opera-information.test.mjs — automated six-opera information and artwork checks.

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

### Macbeth translation conventions

Work on the existing `Update` branch. Preserve the Italian source’s sung wording, line breaks, scene order, and bracketed stage directions. Use `Strega 1`, `Strega 2`, `Strega 3` in the Italian column and `Witch 1`, `Witch 2`, `Witch 3` in English. When the witches sing together, use `Tutte e tre le streghe` / `All three witches`, including in future acts. Keep other character names in their original Italian form. Source Roman numerals I./II./III. and collective witch labels are expanded only for speaker identification; lyrics remain unchanged.

### Continuous act reading

All scenes of an act belong on one continuous page. Set `continuousAct: true` in new opera registry entries, as in Macbeth. Scene/section links and mobile Previous/Next jump within the act; scrolling updates the selected scene and URL without replacing the act. Deep links retain every scene and locate the selected section.
