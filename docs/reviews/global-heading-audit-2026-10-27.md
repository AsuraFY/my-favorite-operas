# My Favorite Operas — Global Three-Line Heading Audit

**Audit date:** 2026-10-27  
**Repository:** https://github.com/AsuraFY/my-favorite-operas  
**Branch audited:** `Update` (not `main`)  
**Status:** **DEFERRED — resume after completing the opera librettos**  
**Purpose:** Preserve heading-design and navigation audit findings for a later correction and browser-verification phase.

> This report is an audit snapshot, **not** an approval of all sixteen operas. No live browser visual inspections were performed for this audit. The first four opera results were carried forward from earlier generated-reader checks; twelve further operas were examined at source level. The audit itself did not change site behavior or libretto content. Recording this report is a documentation-only commit on `Update`.

## 1. Approved design to preserve

The globally approved heading hierarchy applies to **every libretto-reader section and every libretto-outline entry**, including future operas.

1. **Original-language heading:** Large serif, matching the Così fan tutte reference typography; source-grounded title/incipit or supported musical-form label.
2. **English translation:** Regular **not italic** serif, **1.25rem in the reader**, muted blue-grey `#65798b`. Outline typography is proportionally smaller.
3. **Character credits:** Smaller italic serif with a discreet person icon, derived from source participants and/or actual libretto speakers, never recording performers.

There must be **zero added margin between lines 2 and 3**. Each heading is displayed in the proper order in both the reader and outline. Instrumental-only sections may omit character credits. Never fabricate translations, musical classifications, score numbers, or singers.

The rules belong in shared `styles.css` and `src/libretto-reader.js`, not opera-specific CSS. Layout must be checked at desktop, mobile, and night mode sizes.

## 2. Scope and method

Examined the `Update` branch's:

- `styles.css` — shared reader, outline, mobile, and night-mode heading selectors.
- `src/libretto-reader.js` — heading generation, speaker credits, outline rendering and link matching.
- `PROJECT_GUIDELINES.md` — approved rules and content-grounding conventions.
- `src/data/libretto-loader.js` and the relevant opera bundles.
- The act/scene/section data modules for the **12 remaining operas**, plus relevant auxiliary outline metadata.

The prior handoff reported generated-reader checks for four operas. These are preserved without repeating those checks. Static source checks are **not** a full end-to-end browser audit and cannot certify actual rendered typography, spacing, responsive overflow, night-mode contrast or scroll behavior.

The source audit found the intended global CSS properties and responsive/night rules. **No new shared-CSS styling failure was established**. This does not guarantee that every rendered page is visually correct.

## 3. Complete 16-opera status table

**Reading this table:** “Prior generated pass” refers to checks done before this report. “Static pass” means source/data paths support the agreed three-line structure, subject to the notes and visual tests. Neither means final visual approval.

| # | Opera | Main sections checked | Libretto reader | Libretto outline | Notes |
|---:|---|---:|---|---|---|
| 1 | Così fan tutte | 69 | Prior generated pass | Prior generated pass | Browser visuals not certified |
| 2 | Il barbiere di Siviglia | 54 | Prior generated pass | Prior generated pass | One documented instrumental exception |
| 3 | Tristan und Isolde | 11 | Prior generated pass | Prior generated pass | Browser visuals not certified |
| 4 | Macbeth | 43 | Prior generated pass | Prior generated pass | One documented instrumental exception |
| 5 | Turandot | 20 | Static pass; form-only titles | Static pass; editorial review | Repeated generic form names merit review |
| 6 | Le nozze di Figaro | 81 | Static pass | Static pass | All 81 outline metadata route keys matched |
| 7 | Carmen | 51 | Static pass | Static pass | Mostly form-based headings; instrumental exceptions |
| 8 | La Bohème | 4 main sections | Static pass | Static pass | 26 outline links source-matched |
| 9 | Madama Butterfly | 34 | Static pass | Static pass | Explicit bilingual section titles across all 34 sections |
| 10 | Tosca | 18 | Static pass | **Attribution concern** | Bells/matins instrumental passage has problematic singer fallback |
| 11 | Die Zauberflöte | 75 | **Content issues** | **Content issues** | 15 pending English headings and 48 generic `Auftritt` headings |
| 12 | La fanciulla del West | 45 | **One heading issue** | **Same issue** | `Introduzione` missing English heading |
| 13 | Otello | 62 | Static pass | Static pass | 59 outline links source-matched; translation unreviewed |
| 14 | Parsifal | 29 | Static pass | Static pass | 29 outline links source-matched; source reconciliation pending |
| 15 | Don Giovanni | 61 | Static pass | Static pass | 47 outline links source-matched; editorial and source review pending |
| 16 | Samson et Dalila | 31 | Static pass | Static pass | Bilingual headings present; independent editorial review pending |

**Important counting note:** La Bohème contains four main tableau sections, each with its own deeper listening outline; the four is not the number of outline entries. These counts reflect the reported/generated sections or parsed section objects, not proof of individually rendered visual checks.

## 4. Confirmed issues — preserve for later correction

### AUD-01 — Die Zauberflöte: incomplete or overly generic headings
- **Category:** Content/heading metadata, **not** a proven global CSS bug.
- **Priority:** High.
- **Observed:** 15 sections rely on a fallback label **“English title pending review”** because their German musical-form names have no explicit translated heading and no shared translation mapping.
- **Observed:** 48 section headings are generic `Auftritt / Entrance`, which may be inadequate for the site's no-generic-heading standard.
- **Observed:** The label `Arie mir Chor` needs comparison to source text (possible transcription or spelling issue); do not silently assume a corrected form.
- **Files:** `src/data/libretto-die-zauberflote-act-1.js`, `src/data/libretto-die-zauberflote-act-2.js`, and `src/data/libretto-die-zauberflote-bundle.js`.
- **Later action:** Check against the German libretto and a defensible English rendering; add supported metadata, verify characters and the original/English distinction; test generated headings and browser visuals.

### AUD-02 — La fanciulla del West: missing English heading
- **Category:** Content/translation fallback, **not** a proven CSS bug.
- **Priority:** Medium.
- **Observed:** Act I `Introduzione` has an empty `translatedTitle`; the renderer cannot derive English from a corresponding lyric line, leading to the review-pending placeholder.
- **Observed:** `Hello, Nick!` and `Hello, Minnie!` also lack explicit translated-title fields, but their aligned English lyric text currently allows the renderer to recover the identical English headings.
- **File:** `src/data/libretto-la-fanciulla-del-west-act-1.js`.
- **Later action:** Verify and explicitly document a source-grounded English heading for `Introduzione`; ensure English-language phrases retained from the Italian libretto are handled intentionally.

### AUD-03 — Tosca: instrumental attribution in outline
- **Category:** Content attribution/exception, **not** a proven CSS bug.
- **Priority:** Medium.
- **Observed:** Act III, Scene I, the bells-ringing-at-matins landmark is linked to stage directions rather than sung lines.
- **Observed:** When that outline landmark has no speakers, the bundle uses a fallback list including Jailer, Sentinel, Sergeant, Soldiers, and Mario Cavaradossi. A stage-direction/instrumental landmark should not misleadingly assign vocal credits.
- **Files:** `src/data/libretto-tosca-act-3.js`, `src/data/libretto-tosca-bundle.js`.
- **Later action:** Verify whether to omit singer credits entirely for this instrumental entry, while retaining the existing landmark and deep link.

## 5. Other editorial observations, not established styling failures

- **Turandot:** 20 sections; original-language musical-form headings and corresponding English form mappings are present. Repeated labels such as `Scena` should be assessed for navigation usefulness and whether a source incipit can be provided without inventing one.
- **Carmen:** 51 sections; translated musical-form mappings are present. Review generic labels such as `Scène` against the no-generic-heading design requirement. Introductory/prelude/entracte exceptions must not receive invented singers.
- **Le nozze di Figaro:** All **81** section route keys matched the **81** entries in `src/data/figaro-outline-metadata.js`; no missing or duplicated route keys were found in that check.
- **La Bohème:** Four main tableaux plus 26 translated outline landmarks; all 26 source-match conditions checked successfully.
- **Madama Butterfly:** All 34 parsed sections had explicit original-language and English titles in the inspected data.
- **Tosca:** All 18 main parsed sections had explicit bilingual titles; the attribution issue relates to the separate outline entry.
- **Otello:** All 59 inspected outline landmarks matched their specified source turns. English translation remains an unreviewed draft.
- **Parsifal:** All 29 inspected outline landmarks matched their specified source turns. The German source and machine-assisted English draft still need editorial reconciliation.
- **Don Giovanni:** All 47 outline landmarks matched the specified source turns. The listening outline is selective, and does not necessarily list every recitative. The imported source and draft English remain unreviewed.
- **Samson et Dalila:** Explicit original/English headings exist in its 31 main sections. Editorial sign-off remains distinct from heading structure.

## 6. Outline-link checks and verification limits

The audit evaluated the stored `match`, `speaker`, `sourceSection`, and/or `sourceTurn` conditions that the renderer uses to resolve outline links. In the analyzed data, **205 outline entries** matched source-turn conditions:

| Opera | Stored outline entries source-matched |
|---|---:|
| La Bohème | 26 |
| Tosca | 44 |
| Otello | 59 |
| Parsifal | 29 |
| Don Giovanni | 47 |
| **Total** | **205** |

This is **not** proof that all links work when clicked in a browser. In particular, browser-side routing, scroll offset, fixed headers, anchors on mobile, and page reloading must still be tested. Other operas were checked structurally but are **not** included in this 205-link figure.

**Not completed:** Real-browser screenshot/visual inspection of each opera's reader and full outline; desktop/tablet/mobile overflow checks; night-mode appearance and contrast; live navigation/scroll/deep-link reopening; exhaustive literary or musical source validation.

**Branch distinction:** The live GitHub Pages URL may use a different deployed branch. The source of truth for later testing and corrections is the latest intended `Update` build, not an assumption that the published `main` site is identical.

## 7. Deferred follow-up plan

**Do not start correcting heading issues now.** First complete/populate and editorially review the remaining librettos. On resumption:

1. Recheck `Update` for intervening changes and compare against this saved audit.
2. Resolve **AUD-01** in Die Zauberflöte from the verified German source and translations.
3. Resolve **AUD-02** in La fanciulla del West without inventing English.
4. Resolve **AUD-03** in Tosca, honoring instrumental-only exceptions.
5. Review repeated generic headings in Turandot and Carmen and any new heading content introduced by libretto completion.
6. Generate/check all sections for all **16** operas, not merely the existence of global CSS.
7. Conduct actual browser visual checks: original title, English non-italic/color/size, italic character line plus person icon, **no spacing between lines 2 and 3**, source-grounded credits, ordering, instrumental exceptions, outline links, desktop/mobile/night mode.
8. Document remaining issues separately, and request user review **before** changing website functionality or styles.

**Repository guardrail:** All subsequent review work remains on **`Update`**. Never modify or merge into **`main`** without explicit authorization. Avoid unrelated functionality changes.

## 8. Reference paths

- Global styling: [`styles.css`](../../styles.css)
- Shared heading/reader/outline rendering: [`src/libretto-reader.js`](../../src/libretto-reader.js)
- Project conventions: [`PROJECT_GUIDELINES.md`](../../PROJECT_GUIDELINES.md)
- Opera loader registry: [`src/data/libretto-loader.js`](../../src/data/libretto-loader.js)
- Figaro outline metadata: [`src/data/figaro-outline-metadata.js`](../../src/data/figaro-outline-metadata.js)
- Branch: https://github.com/AsuraFY/my-favorite-operas/tree/Update
- Public website: https://asurafy.github.io/my-favorite-operas/ (**not a substitute for testing `Update`**)

---

**Handoff state:** Audit preserved. **Pause heading fixes until librettos are completed**, then continue with the deferred follow-up plan. No code, CSS, libretto, or `main` branch changes are authorized by this report.
