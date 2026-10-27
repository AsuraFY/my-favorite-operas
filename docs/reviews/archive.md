# Archived audit and review documents

> **Historical record; do not add new audits here.** Current issues and dated updates are maintained in [global-audit.md](global-audit.md). This file preserves the previous source documents, even where their past decisions have been superseded. A past statement that an act was unprepared or a test failed is not necessarily its current status.

**Archive assembled:** 2026-10-27 (UTC)  
**Source branch:** `Update`  
**Consolidation method:** Every original document is preserved in full beneath its original filename. Each archived section is marked by its exact source path, for later traceability. The archived `global-audit.md` is the *pre-consolidation snapshot* and is not the active tracker.

---

<!-- BEGIN ARCHIVED SOURCE: docs/reviews/global-audit.md -->

## Archived source: `docs/reviews/global-audit.md`

# Global audit

> **Single living audit file** for the entire website. Add findings here after each audit; do not create a new date-specific or topic-specific audit report. Keep the current issue register up to date **and** append a timestamped history entry so past decisions are traceable.

**Last updated:** 2026-10-27 14:22 UTC  
**Repository:** https://github.com/AsuraFY/my-favorite-operas  
**Branch:** `Update` — do not modify `main` without explicit authorization.  
**Current work priority:** Complete opera librettos; postpone heading corrections and the full browser audit until then.  
**Audit scope:** Any future issue found in the website, libretto data, design, navigation, functionality, or verification can be tracked in this same file.

## How this file is maintained

1. **For every audit/update:** Add a new entry in **Dated audit history** with the exact date/time and time zone, scope, findings, evidence, and what changed (if anything).
2. **For every issue:** Assign a stable ID, record its location, a reproducible description, category, first-seen date, current status, and next action. Update the **Current issue register** when its state changes; never silently remove an issue.
3. **For fixes:** Record the changed file(s), commit or PR, verification method and result. A merged/committed fix alone is **not** `Resolved`.
4. **For accepted exceptions:** Mark `Accepted` only after the user decides the deviation is okay, with a reason and the decision timestamp.
5. **For follow-up:** Preserve work that is paused as `Deferred`, potential issues needing source/editorial judgment as `Needs review`, and fixes awaiting tests as `Needs verification`.
6. **For subsequent updates:** Put the latest event at the top of the history section. Keep the initial baseline below as historical evidence, not as a replacement for current statuses.

**Status definitions**

| Status | Meaning |
|---|---|
| `Open` | Confirmed issue still needing correction |
| `In progress` | Correction being worked on |
| `Needs verification` | Change proposed or applied but not adequately checked |
| `Resolved` | Correction verified, with evidence and a timestamp |
| `Accepted` | User explicitly agreed not to change it; rationale recorded |
| `Deferred` | Still outstanding, intentionally postponed |
| `Needs review` | Potential issue or editorial question; not yet confirmed as a defect |

**Issue categories:** Styling · Content · Character attribution · Navigation · Accessibility · Functionality · Editorial · Verification.

## Current issue register

*The register describes the latest known state. Initial findings were recorded on 2026-10-27; none has subsequently been fixed or visually re-tested as part of this file migration.*

| ID | Type | Area | Finding / decision needed | Status | First noted | Next action |
|---|---|---|---|---|---|---|
| AUD-01 | Content | Die Zauberflöte | 15 unsupported English headings use “English title pending review”; 48 generic `Auftritt / Entrance` headings; verify source label `Arie mir Chor` | **Deferred** | 2026-10-27 | Complete libretto and editorial source checks, then revise source-supported headings |
| AUD-02 | Content | La fanciulla del West | Act I `Introduzione` lacks a supported English subtitle; `Hello, Nick!` and `Hello, Minnie!` depend on aligned-text fallback | **Deferred** | 2026-10-27 | Confirm translation against source; explicitly fill verified title metadata |
| AUD-03 | Character attribution | Tosca | Act III, Scene I bells/matins instrumental outline landmark may present a misleading fallback character list | **Deferred** | 2026-10-27 | Recheck source and instrumental exception, then omit unsupported singer credits |
| AUD-04 | Editorial | Turandot | Repeated musical-form-only labels, e.g. `Scena`, could be too generic for navigation; not established as a defect | **Needs review** | 2026-10-27 | Assess against finished libretto; prefer real incipits only where source supports them |
| AUD-05 | Editorial | Carmen | Repeated form labels, e.g. `Scène`, need no-generic-heading editorial review; not established as a defect | **Needs review** | 2026-10-27 | Assess against finished libretto while preserving instrumental exceptions |

**Current roll-up (as of 2026-10-27 14:22 UTC):** 3 confirmed content/attribution issues deferred; 2 editorial questions awaiting review; **0 verified resolved**; **0 user-accepted exceptions**. Do not treat prior static passes as final browser-visual approval.

## Verification and follow-up backlog

| ID | Scope | Current state | Completion criterion |
|---|---|---|---|
| AUD-V01 | All 16 operas — reader and outline desktop, mobile, night mode | **Deferred until librettos complete** | Inspect every section, long credits, type/color/size/spacing, icon, outline links, and instrumental exceptions in a real browser against `Update` |
| AUD-V02 | Deep-link navigation and scrolling | **Needs verification** | Click outline links, validate targets, refresh URLs, check scrolling/offset on desktop and mobile |
| AUD-V03 | Editorial content quality | **Ongoing with libretto completion** | Confirm source-grounded translations, credits, classifications and known unreviewed drafts; record any resulting issues above |

## Dated audit history

### 2026-10-27 14:22 UTC — Established the living global audit file

**Action:** Converted the date-specific heading audit into this single, generic tracking file at `docs/reviews/global-audit.md`. Recorded existing findings in the current issue register and retained original evidence below.

**New issue discoveries:** None — this was a documentation/organization update, not a fresh audit.

**Verified resolved since the baseline:** None.

**Accepted / intentionally not fixing:** None. Instrumental exceptions are part of the approved design, but no unresolved defect has been individually accepted.

**Still outstanding:** AUD-01, AUD-02, AUD-03; pending editorial review AUD-04, AUD-05; browser and navigation tests AUD-V01–AUD-V03.

**Decision:** Finish the operas' librettos first. Reopen the audit issues afterward. No website code, CSS, libretto text, or `main` branch change is authorized by this log update.

### 2026-10-27 — Original 16-opera heading audit (baseline)

**Audit method:** Examined shared CSS, renderer and the 12 remaining opera data modules on `Update`, while retaining previous generated-reader passes for the first four operas.

**Result:** Common three-line heading CSS found; most stored bilingual data follows the intended structure. Three confirmed content/attribution concerns identified and two additional editorial checks noted. No full desktop/mobile/night-mode browser visual pass was conducted.

**Baseline evidence and detailed table:** Preserved in the section below for reference. Later status changes must appear in the issue register and a newer dated history entry; do not rewrite the original findings as if they never happened.

## Initial baseline evidence (recorded 2026-10-27)

The following preserves the complete technical findings and limitations from the original audit. It is a **historical snapshot**, not the live status register.

### 1. Approved design to preserve

The globally approved heading hierarchy applies to **every libretto-reader section and every libretto-outline entry**, including future operas.

1. **Original-language heading:** Large serif, matching the Così fan tutte reference typography; source-grounded title/incipit or supported musical-form label.
2. **English translation:** Regular **not italic** serif, **1.25rem in the reader**, muted blue-grey `#65798b`. Outline typography is proportionally smaller.
3. **Character credits:** Smaller italic serif with a discreet person icon, derived from source participants and/or actual libretto speakers, never recording performers.

There must be **zero added margin between lines 2 and 3**. Each heading is displayed in the proper order in both the reader and outline. Instrumental-only sections may omit character credits. Never fabricate translations, musical classifications, score numbers, or singers.

The rules belong in shared `styles.css` and `src/libretto-reader.js`, not opera-specific CSS. Layout must be checked at desktop, mobile, and night mode sizes.

### 2. Scope and method

Examined the `Update` branch's:

- `styles.css` — shared reader, outline, mobile, and night-mode heading selectors.
- `src/libretto-reader.js` — heading generation, speaker credits, outline rendering and link matching.
- `PROJECT_GUIDELINES.md` — approved rules and content-grounding conventions.
- `src/data/libretto-loader.js` and the relevant opera bundles.
- The act/scene/section data modules for the **12 remaining operas**, plus relevant auxiliary outline metadata.

The prior handoff reported generated-reader checks for four operas. These are preserved without repeating those checks. Static source checks are **not** a full end-to-end browser audit and cannot certify actual rendered typography, spacing, responsive overflow, night-mode contrast or scroll behavior.

The source audit found the intended global CSS properties and responsive/night rules. **No new shared-CSS styling failure was established**. This does not guarantee that every rendered page is visually correct.

### 3. Complete 16-opera status table

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

### 4. Confirmed issues — preserve for later correction

#### AUD-01 — Die Zauberflöte: incomplete or overly generic headings
- **Category:** Content/heading metadata, **not** a proven global CSS bug.
- **Priority:** High.
- **Observed:** 15 sections rely on a fallback label **“English title pending review”** because their German musical-form names have no explicit translated heading and no shared translation mapping.
- **Observed:** 48 section headings are generic `Auftritt / Entrance`, which may be inadequate for the site's no-generic-heading standard.
- **Observed:** The label `Arie mir Chor` needs comparison to source text (possible transcription or spelling issue); do not silently assume a corrected form.
- **Files:** `src/data/libretto-die-zauberflote-act-1.js`, `src/data/libretto-die-zauberflote-act-2.js`, and `src/data/libretto-die-zauberflote-bundle.js`.
- **Later action:** Check against the German libretto and a defensible English rendering; add supported metadata, verify characters and the original/English distinction; test generated headings and browser visuals.

#### AUD-02 — La fanciulla del West: missing English heading
- **Category:** Content/translation fallback, **not** a proven CSS bug.
- **Priority:** Medium.
- **Observed:** Act I `Introduzione` has an empty `translatedTitle`; the renderer cannot derive English from a corresponding lyric line, leading to the review-pending placeholder.
- **Observed:** `Hello, Nick!` and `Hello, Minnie!` also lack explicit translated-title fields, but their aligned English lyric text currently allows the renderer to recover the identical English headings.
- **File:** `src/data/libretto-la-fanciulla-del-west-act-1.js`.
- **Later action:** Verify and explicitly document a source-grounded English heading for `Introduzione`; ensure English-language phrases retained from the Italian libretto are handled intentionally.

#### AUD-03 — Tosca: instrumental attribution in outline
- **Category:** Content attribution/exception, **not** a proven CSS bug.
- **Priority:** Medium.
- **Observed:** Act III, Scene I, the bells-ringing-at-matins landmark is linked to stage directions rather than sung lines.
- **Observed:** When that outline landmark has no speakers, the bundle uses a fallback list including Jailer, Sentinel, Sergeant, Soldiers, and Mario Cavaradossi. A stage-direction/instrumental landmark should not misleadingly assign vocal credits.
- **Files:** `src/data/libretto-tosca-act-3.js`, `src/data/libretto-tosca-bundle.js`.
- **Later action:** Verify whether to omit singer credits entirely for this instrumental entry, while retaining the existing landmark and deep link.

### 5. Other editorial observations, not established styling failures

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

### 6. Outline-link checks and verification limits

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

### 7. Deferred follow-up plan

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

### 8. Reference paths

- Global styling: [`styles.css`](../../styles.css)
- Shared heading/reader/outline rendering: [`src/libretto-reader.js`](../../src/libretto-reader.js)
- Project conventions: [`PROJECT_GUIDELINES.md`](../../PROJECT_GUIDELINES.md)
- Opera loader registry: [`src/data/libretto-loader.js`](../../src/data/libretto-loader.js)
- Figaro outline metadata: [`src/data/figaro-outline-metadata.js`](../../src/data/figaro-outline-metadata.js)
- Branch: https://github.com/AsuraFY/my-favorite-operas/tree/Update
- Public website: https://asurafy.github.io/my-favorite-operas/ (**not a substitute for testing `Update`**)

---

**Handoff state:** Audit preserved. **Pause heading fixes until librettos are completed**, then continue with the deferred follow-up plan. No code, CSS, libretto, or `main` branch changes are authorized by this report.

<!-- END ARCHIVED SOURCE: docs/reviews/global-audit.md -->


<!-- BEGIN ARCHIVED SOURCE: docs/reviews/beethoven-ode-to-joy.md -->

## Archived source: `docs/reviews/beethoven-ode-to-joy.md`

# Beethoven: Symphony No. 9, finale — lyrics addition

Reviewed 20 October 2026. Source-derived transcription, not a claim of completed independent stave-by-stave or listener review.

## Sources

Primary machine-readable score: OpenScore Orchestra / Hauptstimme, `data/Beethoven,_Ludwig_van/Symphony_No.9,_Op.125/4/Beethoven_Op.125_4.mxl`:
https://github.com/MarkGotham/Hauptstimme/blob/main/data/Beethoven,_Ludwig_van/Symphony_No.9,_Op.125/4/Beethoven_Op.125_4.mxl

The repository identifies its scores as CC0 (annotations have a separate licence; no annotations were copied). The source file SHA-256 and access date are retained in `beethovenSources`. Source-tree snapshot: `8f677853c45b74ca0afcd79677e5379c06c82354`.

OpenScore reference edition: https://musescore.com/openscore/scores/5733014
PDF reference: https://s9.imslp.org/files/imglnks/usimg/b/b8/IMSLP929853-PMLP1607-Beethoven_Symphony_No._9_Op._125.pdf
The reference PDF credits Hansen Wu (violin-altair), OpenScore, and Benjamin Auriol; its opening bass recitative was visually inspected. The entire PDF has not been independently compared with the MusicXML.

## Extraction and grouping

- Read all eight vocal parts, P24–P31, in measure order, honoring backup/forward offsets and syllabic begin/middle/end markers.
- Join syllables into words without turning held syllables into repeats.
- The divided tenor note in encoded measure 418 repeats `Held` on voice 2 at the same entry as voice 1: retain the shared word once, not the erroneous sequence `zum Held Siegen`.
- Combine phrases only when all word onsets and their text agree. Preserve each independent part otherwise, in onset order. Consecutive displayed lines with the same participants share a label.
- Keep the source's encoded measure/beat coordinates as internal provenance. They are not audio timestamps or an assertion about every edition's printed measure numbers.
- Separate vocal streams retain 2,052 word occurrences in total. The displayed text combines shared entries, resulting in 250 bilingual lines across 191 vocal blocks.
- German punctuation and source spelling remain; English is newly written, phrase-aligned working translation. Headings are editorial listening guides, not invented formal movement titles.
- Existing reader presentation is reused. No new permanent layout for complex polyphony is approved by this addition.

## Verification and limits

Eight independent source-part word-stream fingerprints test all words, repeats and their order after shared blocks are expanded by participant. Rendering tests confirm 250 German/English line pairs grouped in 191 vocal rows, unique passage IDs, removal of the placeholder, and the Beethoven-specific translation-toggle target. Nine existing musical checks also pass.

Independent score-edition comparison, full listener review, and browser visual verification remain pending. These are stated in the reader; the page must not be described as a fully certified transcription. Mahler content is unchanged.

## Grouped-row correction

Continuous lines for one unchanged singer/group render inside one row, with the singer label once. German and English retain paragraph line breaks within their respective cells. Regression checks assert one row and one label per vocal block and preserve every line in both languages.

<!-- END ARCHIVED SOURCE: docs/reviews/beethoven-ode-to-joy.md -->


<!-- BEGIN ARCHIVED SOURCE: docs/reviews/browser-visual-review-20261023.md -->

## Archived source: `docs/reviews/browser-visual-review-20261023.md`

# Desktop and mobile browser verification — 23 October 2026

## Method

The GitHub Actions `Verify Update` workflow now loads the actual project pages in headless Chromium using the public web layout (at the same `/my-favorite-operas/` base path). This is a local static-server reproduction of the deployed `Update` commit; the live GitHub Pages domain could not be fetched through the assistant's browser.

The new automated browser pass inspects 11 completed operas at desktop (1440 × 900) and mobile (390 × 844), checking that content renders, both lyric columns contain text, CSS layout has no document-wide horizontal overflow, and original/translation columns sit side by side on desktop and stack on mobile. It also checks theme, font size, row spacing, mobile act-outline opening/closing, and the English second-line labels in *La bohème*'s full outline.

The run attaches Chrome screenshots for *Così fan tutte*, *Tristan und Isolde*, *La bohème*, and *Samson et Dalila* in both viewports, plus night-mode and outline examples. They can be downloaded from the workflow run's `opera-browser-review` artifact for human inspection.

## Limits

Automated layout metrics and screenshots do **not** prove perfect visual typography, exact colors or historic libretto accuracy. A human review of the attached images, plus mobile-device interaction checks, remains the final acceptance step. Screen reader and cross-browser compatibility beyond Chromium were not tested.

<!-- END ARCHIVED SOURCE: docs/reviews/browser-visual-review-20261023.md -->


<!-- BEGIN ARCHIVED SOURCE: docs/reviews/final-website-audit-20261023.md -->

## Archived source: `docs/reviews/final-website-audit-20261023.md`

# Final website-wide regression and deployment audit — 23 October 2026

Project: **My favorite Operas**. Working branch: `Update`.

## Verified on the existing branch

- The latest 11-opera structural review commit `06298b8aac39670e4a78a43f39833e95dd9204d1` completed the **Verify Update** workflow successfully (run 39975352170).
- GitHub Pages successfully published the same commit (run 39975349132). This confirms that the deployment workflow completed; a successful deployment is not proof of visual correctness.
- Current automated suites cover 11 completed opera routes and 31 catalogue entries, bilingual passage preservation, headings, performance cues, section anchors, chapter navigation, startup error recovery, static CSS consistency and the deploy gate.
- Opera-specific reviews were committed separately before this final audit; previously found source-wording and alignment concerns are recorded in their individual reviews.
- This audit adds a static dependency gate: every local JavaScript import (including dynamically loaded act modules), local CSS image URL, HTML entry asset, and declared catalogue/reader artwork must resolve to a tracked file. The metadata check also ensures complete opera act counts match the public catalogue.

## What remains unverified

- A real browser visual inspection of rendered pages at desktop and mobile sizes, including dark mode, reader scrolling, font controls, missing images after loading, and bilingual column layout. The live GitHub Pages domain was not reachable from the available browser-fetch environment; code and GitHub Actions results were verified instead.
- Line-for-line philological comparison of all 11 operas with authoritative libretti and a fresh semantic review of every English translation. Existing audits establish structural correspondence only.
- A manual click-through of every deep link on an actual mobile device.

## Next manual check

Open the [published Update site](https://asurafy.github.io/my-favorite-operas/), then sample an act of *Così fan tutte*, *Tristan und Isolde*, *Carmen*, *La bohème* and *Samson et Dalila*. Check the first and last outline destinations, bilingual verse spacing, full vs compact stage directions, mobile scrolling, day/night themes, and translation lines under each outline entry. Record any rendering defects by opera, act, section and URL before editing their source text.

No libretto words or existing links were intentionally altered by this site-wide audit.

<!-- END ARCHIVED SOURCE: docs/reviews/final-website-audit-20261023.md -->


<!-- BEGIN ARCHIVED SOURCE: docs/reviews/carmen-act-1.md -->

## Archived source: `docs/reviews/carmen-act-1.md`

# Carmen Act I review — 19 October 2026

Reviewed all stored French and English entries. Checked structural ambiguities against https://opera-guide.ch/operas/carmen/libretto/fr/ (accessed 19 October 2026).

- Restored source No. 2a, Moralès's couplets, and the unnumbered Monologue as sections instead of sung text. Their new addresses are item=18 and item=19; all eighteen existing addresses remain stable.
- Assigned the lieutenant's drill commands to Zuniga instead of the boys' chorus.
- Removed the source's orphan opening quotation mark from its own spoken row. The selected source supplies no words before Micaëla interrupts; no missing letter text was invented.
- Reviewed 14 English entries for meaning, natural phrasing and line correspondence. Corrected the men awaiting the factory workers, the reversed letter/faithful-messenger lines, José's surprised “Me!”, and Carmen's ironic “sir officer” addressing a corporal.
- Named the Act I outline sections and supplied English translations. Removed repeated joint participant credits. Enabled three-line headings only for reviewed Act I sections; Acts II–IV remain unchanged.
- Separated trailing short cues from narrative directions. Short cues use square brackets without a label; full directions are unbracketed, with one label per language. All source sung/dialogue words remain; structural headings are metadata and narrative whitespace is normalized.

Verification: exact rendered French–English pairs; all twenty section destinations, including eighteen legacy addresses; translated headings; source heading/speaker corrections; relevant content, presentation and navigation suites. Live visual verification remains pending.

## Four-act structural follow-up — 23 October 2026

Checked 331 / 387 / 244 / 101 bilingual passages (523 / 567 / 411 / 231 sung or spoken source lines), their paired English divisions, the 51 section routes, and the short/full stage-direction distinction. All content pairs remain complete. Removed one escaped tab after “née…” in Carmen’s French Act I dialogue, without changing the spoken words. Added automated coverage for structure and route stability. This is a formatting/integrity review, not an independent critical-edition translation comparison.

<!-- END ARCHIVED SOURCE: docs/reviews/carmen-act-1.md -->
