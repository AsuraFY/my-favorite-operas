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

<!-- BEGIN ARCHIVED SOURCE: docs/reviews/carmen-acts-2-4.md -->

## Archived source: `docs/reviews/carmen-acts-2-4.md`

# Carmen Acts II–IV review

Reviewed 20 October 2026, completing the Act I review.

- Read the stored French and English throughout Acts II–IV; revised 25 translation entries for meaning, speaker/action accuracy, or individual-line correspondence.
- Added recognizable French incipits and English titles to the full and act outlines, preserving musical types and all existing passage addresses. Opening settings are labeled as settings.
- Separated narrative stage directions and short bracketed cues. Restored the omitted English cue “To Carmen.”
- Removed entr’acte headings from sung text and represented them as instrumental sections after Acts II and III.
- Consolidated duplicate chorus participants and included the returning ensemble in the Act III finale.
- Corrected the Toreador song’s French transcription “gens de cour” to “gens de cœur” and translated it as “the brave.” The selected Opera Guide transcription contains the error; the university-hosted Carmen libretto confirms “cœur.”

Sources: https://opera-guide.ch/operas/carmen/libretto/fr/ and https://iris.unive.it/retrieve/e4239ddc-51d4-7180-e053-3705fe0a3322/Carmen_v3.pdf

## Verification

The French text was compared against the published baseline after whitespace normalization, allowing only the documented cœur correction and relocation of entr’acte headings. No other French text was lost or changed.

All 63 content, presentation and reader-navigation tests pass, including complete rendered bilingual pairs for the three acts, unique participants, bilingual outlines and every passage address. Final section counts are 14, 12 and 5; turn counts are 387, 244 and 101. Act I was not changed.

A browser screenshot review has not been performed for this revision.

<!-- END ARCHIVED SOURCE: docs/reviews/carmen-acts-2-4.md -->


<!-- BEGIN ARCHIVED SOURCE: docs/reviews/die-zauberflote-act-2.md -->

## Archived source: `docs/reviews/die-zauberflote-act-2.md`

# Die Zauberflöte — Act II import (26 October 2026)

Primary text: Emanuel Schikaneder, historical German libretto, Opera Guide, https://opera-guide.ch/en/operas/die%2Bzauberflote/libretto/de/; accessed 26 October 2026.

- Source structure: 30 **Auftritte**, musical numbers 9–21, 805 preserved source lines.
- Preserves source scene boundaries, printed numbering, spoken dialogue and stage directions as distinct rows.
- Translation is fresh offline machine-assisted German→English draft; **not reviewed for semantic correctness**.
- Stage-direction attribution requires manual editorial spot-checks.
- Complete automated structural checks do not constitute proof of translation quality.
- Act I was imported previously and was not replaced by this change.

<!-- END ARCHIVED SOURCE: docs/reviews/die-zauberflote-act-2.md -->


<!-- BEGIN ARCHIVED SOURCE: docs/reviews/die-zauberflote-editorial-audit-2026-10-26.md -->

## Archived source: `docs/reviews/die-zauberflote-editorial-audit-2026-10-26.md`

# Die Zauberflöte — editorial checkpoint (26 October 2026)

**Branch:** Update only. **Primary source:** Emanuel Schikaneder's 1791 German libretto, Opera Guide: https://opera-guide.ch/en/operas/die%2Bzauberflote/libretto/de/. **Other source:** published Mozart number/incipit catalogue, previously cross-checked in the project's outline review.

## Verified structure
- Act I: 19 source Auftritte, musical Nos. 1–8, 466 speaker/direction turns and 692 paired German/English printed lines.
- Act II: 30 source Auftritte, Nos. 9–21, 544 speaker/direction turns and 805 paired printed lines.
- The ordinal musical outline and 3-line musical-number titles have been entered. Music within the two finales remains subject to cue-specific verification.

## Corrections included in this checkpoint
- Restored 16 Act I and six Act II falsely labelled Stage direction entries to spoken/sung person or chorus cues; source German line order unchanged.
- Fixed the sung finale phrases ‘Zum Ziele führt dich diese Bahn’, ‘Wenn Tugend und Gerechtigkeit’, ‘Er lohnet und strafet’, and ‘Wird rein durch Feuer, Wasser, Luft und Erden’.
- Distinguished unaccompanied speech after N. 1 Introduktion and N. 2 Arie from the musical pieces, without moving or deleting source lines.
- N. 9 Marsch der Priester is instrumental; source speech following it is now an unnumbered spoken section before N. 10. Existing published N. 10 item link was retained using an explicit routeItem.
- Corrected observed machine-translation mistakes including Pamina misrendered as 'fireplaces', Prüfungs-/Weisheitstempel as 'stamp', plus selected plainly mistranslated opening/stage lines.
- Added focused structure, speaker, English pairing, and musical-boundary regression tests.

## Still NOT approved
**This is an editorial audit checkpoint, not an editorially reviewed edition.**
- The English in both acts is still mostly unreviewed machine translation; some archaic German, idioms, poetic rhyme, dramatic intent and ensemble voices translate inaccurately. Mechanical line-pair tests cannot certify translation quality.
- Stage/sung/verse classification was initially generated by heuristic and is still imperfect, particularly collective cues and lines whose speaker appears only once or between merged paragraphs.
- German text must still be line-by-line collated against the actual 1791 edition on Opera Guide, including 18th-century typography and printed division breaks. The counts prove internal consistency, not complete source fidelity.
- Musical-score boundaries inside Nos. 8 and 21 (and where source headings appear before dialogue) require a score-guided pass. Current outline participant lists may be overinclusive or fail to split an explicitly compound source cue.
- Source speaker labels such as 'MOHR', 'WEIB', 'SCHLUSSCHOR' need careful display-name treatment and source-faithful contextual identification; avoid fabricating names from generic cues.
- Visual desktop/mobile rendering, regression-test results, and live deployment must be checked separately and not assumed successful.

## Editorial release criterion
Before calling this opera final, verify every pair of German and English lines with native/contextual proofreading; separately reconcile every speaker cue, spoken prose, singing, stage instruction, and intra-finale music boundary with the primary source and score; then run and inspect Node and browser tests on the Update deployment. Keep draft status visible until then.

<!-- END ARCHIVED SOURCE: docs/reviews/die-zauberflote-editorial-audit-2026-10-26.md -->


<!-- BEGIN ARCHIVED SOURCE: docs/reviews/figaro-outlines.md -->

## Archived source: `docs/reviews/figaro-outlines.md`

# Le nozze di Figaro — outline correction, 21 October 2026

Compared all four acts against the Opera Website Guidelines, especially §§1.2–1.6. Primary source rechecked: https://opera-guide.ch/operas/le+nozze+di+figaro/libretto/it/ (21 October 2026).

## Findings and corrections

- Figaro lacked the shared three-line outline setting. Most sections had `sourceTitlesOnly` but no explicit title/translation, hiding recognizable incipits and English second lines. Added explicit bilingual navigation metadata for all 81 sections and enabled the agreed presentation for both outline views and section headings.
- Musical numbers/types remain those of the existing source data. Recitative-and-aria sections show both their opening and familiar aria incipit (Nos. 18, 20, 27, 28). These are editorial navigation labels drawn from the text, not claims that the source prints formal aria titles.
- Finale continuations now display their parent numbers: 16 in Act II, 23 in Act III, and 29 in Act IV. The separate `outlineNumber` preserves the original section numbering and route metadata while supporting the displayed heading.
- Scene headings now use source-style Italian Roman numerals with English equivalents. No scene titles were invented.
- The overture displays “Ouverture” once, followed by “Overture”. Its instrumental entry has no invented participants.
- Existing English participant lists were checked for duplicates and retained. Ambiguous “All” cues were not expanded into invented memberships. Joint sung cues remain unchanged.
- Act outlines show musical/recitative symbols; the full outline does not. Participant icons and names follow the translated title without a visible “Characters” label.
- Two stale tests required familiar titles to be absent; updated them to the later user-confirmed incipit standard.

## Verification

68 relevant tests pass: the new all-entry outline tests and existing libretto-content, presentation and navigation suites. Each title phrase is checked against its own section’s Italian text, all 81 translations appear in both views, participant names remain unique, finale numbers are retained, and all existing destinations still resolve. Original act data files, sung text, English lyrics, scene order, and deep-link IDs were not changed. JavaScript syntax and `git diff --check` pass.

Desktop/mobile browser visual QA remains pending. No new unresolved editorial choice was required.

## Follow-up: outline scrolling

The section jump’s CSS includes the sticky breadcrumb height, but `updateReaderSectionPosition` omitted it. Once the jump lock expired, a correctly landed section could sit 48px below the tracking threshold, causing the previous section to be selected and written into the URL. Added the breadcrumb height to tracking and to explicit passage-jump offsets. Regression tests reproduce the landing coordinates with desktop and mobile toolbar heights; 16 outline/navigation tests pass. Browser inspection did not complete, so live visual verification remains pending.

## Follow-up: preserved route IDs

The in-page click handler treated item IDs as array positions outside continuous acts and only matched canonical IDs inside them. It now resolves canonical IDs and historic alias anchors, and resolves scene-start item=0 to the first section when the scene has no such ID. Unresolved links retain normal route handling instead of being swallowed. Regression coverage clicks all 81 Figaro sections, their aliases, and every scene start across all four acts. All 17 outline/navigation tests pass; live visual verification remains pending.

<!-- END ARCHIVED SOURCE: docs/reviews/figaro-outlines.md -->


<!-- BEGIN ARCHIVED SOURCE: docs/reviews/la-boheme.md -->

## Archived source: `docs/reviews/la-boheme.md`

# La Bohème — four-tableau review

Reviewed 20 October 2026 against the stored Italian and the selected Teatro alla Scala libretto:
https://www.teatroallascala.org/static/upload/la-/la-boheme-libretto.pdf

## Changes

- Reviewed all four tableaux and revised 40 English entries for meaning or line correspondence. Examples include the out-of-tune D on Schaunard’s horn, “Sola!” meaning “Just one!”, Mimì coming in this direction rather than to a vaulted passage, and the pawnbroker reference in Colline’s coat aria.
- Restored Italian in two stage-direction entries that erroneously contained English (III, turn 54; IV, turn 238). These follow the source’s action in the existing turn grouping.
- Assigned “Lumaca!” in Tableau I to Marcello, as in the source.
- Preserved sung parenthetical asides as lyrics. Marked the two actual embedded action cues explicitly for stage-direction rendering.
- Applied unbracketed narrative paragraphs with a Stage direction label and short bracketed cues without labels. Removed redundant enclosing parentheses from stage directions.
- Retained the three-line outline entries and their English translations in both outline views and reader headings. Corrected descriptive musical forms, notably the Rodolfo–Marcello duet “O Mimì, tu più non torni” and the Act III passage involving Mimì, Rodolfo and Marcello. Forms are editorial descriptions, not a newly invented numbered score catalogue; the selected libretto provides no musical item numbers.
- Derived explicit, unique participant lists from the actual passage speakers. Removed obsolete performer metadata and the recording reference in accordance with the user’s current instruction.
- Updated cache versions for the changed data.

## Verification

All 64 content, presentation and reader-navigation tests pass. Tests check every rendered bilingual row, sung asides, narrative labels, unique participants and all 26 existing outline destinations. All 1,057 turn addresses and four continuous act pages remain intact.

Original text was compared against the published baseline turn by turn. Apart from restoring the two wrong-language directions, only stage-direction enclosing parentheses and paragraph whitespace were normalized. No sung Italian was removed or rewritten.

No browser screenshot review was performed for this revision.

<!-- END ARCHIVED SOURCE: docs/reviews/la-boheme.md -->


<!-- BEGIN ARCHIVED SOURCE: docs/reviews/macbeth-outline.md -->

## Archived source: `docs/reviews/macbeth-outline.md`

# Macbeth outline review — 15 October 2026

Scope: all four act outlines, full Libretto Outline, participant headings and bilingual speaker labels. Continuous act pages and existing scene/item addresses retained.

Primary source: https://opera-guide.ch/operas/macbethverdi/libretto/it/ (accessed 15 October 2026). Follow the text actually presented, including revised passages; the former blanket “1847” description was insufficient. This review does not reconcile editions or rewrite the sung text or English translation.

Source divisions: 19 / 7 / 4 / 11 scenes, with the last heading “Scena ultima.” Numbered musical divisions 1–15 include 8 1/2. A numbered division continues through subsequent scenes until the next source number. Repeated numbers in scene links identify parts of that same musical division, not new numbers. Invented scene/passsage titles removed; Bosco retained as the source setting, translated “A wood.” No incipits promoted to formal titles. No title translation is displayed where the source gives only a section type.

The prelude now has a reading-page section and a link in both outlines. Item 0 still targets the original first scene section; the added prelude uses item 1. All 43 section destinations are checked in both outline views, with unique reading targets.

Participants follow sung cues in first-appearance order. Joint cues expand into their known members. The three witch cues and their collective cue share one deduplicated list; all three apparition speakers are retained individually. Act III scene III credits the witches who sing, rather than the aerial spirits in the stage action. Generic roles use English in participant headings and on the English side; Italian speaker cues, sung asides and stage directions are retained. Contextually identifiable Tutti cues expand to the named ensemble or assassin groups.

No album reference added. English translation wording remains outside this outline review. Original and translated text preservation and pairing are checked separately from semantic accuracy. Automated navigation/presentation checks are available; desktop and mobile visual QA remain unverified.

## Act I line alignment — 15 October 2026

Act I now renders each of its 228 sung source lines beside the corresponding English line in an individual row. Stage directions remain paired blocks with visible labels; speakers appear at the start of each speech. Acts II–IV retain their previous rendering pending user review. Italian text, outlines and section addresses are unchanged. English corrections restore the order of the sailor’s-wife lines and the negative meaning of Macbeth’s ocean image. This is a layout/alignment pass, not certification of the entire translation. All rendered pairs are checked against the data; visual review remains pending.

## Act II line alignment — 15 October 2026

Act II now uses individual paired rows for all 182 sung lines across seven scenes. Both occurrences of the drinking-song lines about hatred, resentment and love have their English phrasing reordered to follow the Italian line order. Original text, stage directions, outlines and addresses are preserved. The existing rendered-pair test now covers Acts I–II and confirms Acts III–IV keep their previous layout. All 95 tests pass; visual QA remains pending.

## Acts III–IV line alignment — 16 October 2026

All four acts now render sung text as individual Italian–English pairs. Act III contains 141 sung lines and Act IV contains 157. Four English passages were reordered to follow their Italian lines: Banco’s descendants ascending the throne, the spirits’ swirling dances, the royal tomb, and the question about the usurper’s hiding place. Italian source text, stage directions, outlines and link addresses remain unchanged. The existing rendered-pair test now checks all four acts. All 95 tests pass; desktop/mobile visual QA remains pending. This alignment review does not certify the entire translation as final.

## Alternative ending — 17 October 2026

Added the complete final scene of the 1847 ending after the retained revised ending in Act IV, No. 15. Editorial bilingual label “Finale alternativo — 1847 / Alternative ending — 1847” distinguishes the versions; this is not an inferred aria title. Includes Malcolm and Macduff’s introduction, all eight lines of “Mal per me che m’affidai,” death direction, and closing responses, with a fresh line-aligned English translation.

Source: https://www.librettidopera.it/macbeth/a_04.html, “Finale originale del 1847, scena ultima,” explicitly marked replaced in 1865 (accessed 17 October 2026). This addition does not reconcile all other differences between editions. The existing Opera Guide text remains intact. New destination act=4&scene=11&item=1 appears in both outlines; all existing destinations remain unchanged. Long opening direction is one unbracketed bilingual paragraph; short cues are bracketed without labels. Automated checks cover every rendered pair and outline destination; visual QA remains pending.

## Alternative placement — 17 October 2026

At the user’s request, moved the complete 1847 alternative to the second section of Scene IX, immediately before Scene X, with the editorial label “Scena alternativa — 1847 / Alternative scene — 1847.” Both outlines now target act=4&scene=9&item=1. Italian and English text are unchanged; the revised final scene remains in Scene XI. This is a presentation placement requested by the user, not a claim that the source labels the original final scene “Scene IX.”

## Outline consistency check — 17 October 2026

Checked all 44 destinations, original number/type labels, optional title translations, English participant names, deduplication, and musical icons in both outlines. The full outline also omitted the musical symbols used by the act outline; both now use the same icon renderer. Confirmed heading mismatch: the act sidebar omitted Scene I’s source setting Bosco / A wood while the full outline displayed it. Both now display the original setting with the scene heading and its translation on a separate line without parentheses. Source numbered headings have no separate aria titles; absent title-translation rows are intentional under the no-invented-titles rule. Numbered multi-part forms remain intact rather than being arbitrarily classified as recitatives. The 1847 alternative remains in Scene IX as requested. No sung text or translation changed. Automated checks pass; visual QA remains unverified.

## User correction — 17 October 2026

Supersedes the preceding review’s treatment of line 2 and full-outline symbols. The user explicitly approved English translations of Macbeth’s complete section headings on line 2 even when the heading is a type rather than a separate aria title. Both Macbeth outlines now show that translation, including Prelude and the 1847 alternative’s label. Musical/recitative symbols belong only in act outlines; the preceding shared full-outline icon addition has been reverted. Participant icons remain in both views. Regression checks cover translation coverage and order for all 44 entries and the distinct icon rules. No libretto text or passage destinations changed.

<!-- END ARCHIVED SOURCE: docs/reviews/macbeth-outline.md -->


<!-- BEGIN ARCHIVED SOURCE: docs/reviews/madama-butterfly-alignment.md -->

## Archived source: `docs/reviews/madama-butterfly-alignment.md`

# Madama Butterfly — bilingual structural audit (23 October 2026)

Scope: all three completed acts on the `Update` branch, retaining the original 34 section routes and the prior 20 October editorial review.

## Findings

- Acts I–III contain 325, 197 and 115 French/Italian source and English bilingual turns respectively, for **637 total**. (Original language: **Italian**.)
- The acts contain 563, 402 and 216 recorded sung-source lines respectively.
- The 34 sections each retain an original-language and English title; route targets are unique.
- Every stored original/translated turn is populated. All explicit line and stanza divisions match; no literal escaped newline sequences, malformed whitespace, or replacement characters were found.
- Stage-direction grouping remains intact: 89 direction turns, of which 24 are short cues and 65 are narrative directions. Short cues retain brackets, while narrative directions remain unbracketed.
- The existing reader and libretto suites already verify displayed bilingual rows, outline translations, and navigation; dedicated structural regression coverage was added.
- No libretto text, translation wording, or navigation route was changed during this audit.

Source of audit: the existing repository files and their recorded metadata. This is a **structural consistency review**, not a fresh critical-edition comparison or independent semantic retranslation. Live desktop/mobile browser visual review has not been performed.

<!-- END ARCHIVED SOURCE: docs/reviews/madama-butterfly-alignment.md -->


<!-- BEGIN ARCHIVED SOURCE: docs/reviews/samson-et-dalila-act-1.md -->

## Archived source: `docs/reviews/samson-et-dalila-act-1.md`

# Samson et Dalila — Act I, 21 October 2026

> **Current status (23 October 2026):** All three acts are now completed and available. The statement below that Acts II–III remain unprepared describes the original Act I review stage, not the current website. A three-act structural audit verified 205 bilingual passages, 836 sung-line pairs and 31 outline routes; new automated integrity coverage is recorded in `tests/samson-verse-integrity.test.mjs`. The original text and translations were not altered by this audit.


## Profile and scope

- Route: `#/operas/samson-et-dalila?act=1`; French with a fresh English translation.
- Primary: Ferdinand Lemaire's public-domain libretto as printed in the ABAO 2020–2021 programme, printed pp. 213–224: https://www.esm.rochester.edu/uploads/Locke-Libro-ABAO-2020-2021.pdf, accessed 21 October 2026. Only the French libretto is used; the Spanish translation and programme essays are not reproduced.
- Six source scenes, 15 navigation sections, 44 sung turns comprising 322 French/English line pairs, and 16 separate stage-direction/cue entries. Each uninterrupted source turn renders in one bilingual row with preserved line breaks. The source's intervening stage cue splits Dalila's closing song at “À la nuit tombante”.
- Acts II–III remain unprepared. Their direct URLs retain the prepared-page placeholder rather than silently displaying Act I. No Spotify recording was selected.

## Source handling

French was extracted from the programme's left column and compared against the complete Act I passage. All unused extraction lines were checked: they are act/scene headings, cast and speaker cues, the dance heading, or the single Spanish-column spillover `voluptuosos.)`. None is omitted sung text. Page furniture is excluded. Long stage directions are rejoined and stripped of enclosing parentheses; short cues retain their positions and render in italic brackets. Source cast rubrics are stored separately as `sourceCast`.

Three transparent typographical corrections: “dc vos bras” → “de vos bras”; “attend sou retour” → “attend son retour”; “S’addressant” → “S’adressant”. Operone supplies the correct first two readings: https://operone.de/libretto/samson-et-dalila/. French spelling supplies the third. No substantive source variants were imported. In particular, the separate bass-chorus entry, the Messenger's separate reply in Scene IV, and the source's final chorus cue remain intact. Abimélech's “À moi !” remains inside the source's narrative direction.

## Outlines and translation

The six dramatic scenes follow the primary source. Navigation uses recognizable French incipits with English translations and deduplicated English participant names. No official musical numbers are asserted. Musical forms (Chœur, Air, Trio, Scène, Ballet) are supported by the scene index at https://www.opera-arias.com/saint-sa%C3%ABns/samson-et-dalila/; its incorrect role attributions for Abimélech, the High Priest, and the Old Hebrew are not adopted. “C’est toi que sa bouche invective” is an unclassified navigation passage, not an invented recitative. The dance heading is printed in the primary source. These navigation subdivisions are editorial, not additional source scene divisions.

English is an original draft checked against each French turn for meaning, order, and matching verse breaks. Independent editorial/listening review remains pending. The public note is a single brief French-source credit; implementation and review details stay here.

## Verification

- Four dedicated tests pass: French text checksum/counts, complete bilingual turn rendering, every one of the 15 section destinations, and Act II/III placeholder routing.
- Existing content, presentation, navigation and catalog checks: 83 passed; 21 unrelated catalog assertions failed. Baseline verification reproduced all 21 failures before this change (20 other prepared opera pages and Tosca's old outline link assertion). The old Samson-shell test is replaced with the new coverage.
- `git diff --check` and JavaScript syntax checks passed.
- Desktop/mobile browser visual QA has not been performed; local Playwright is unavailable. The established reader layout is reused.

<!-- END ARCHIVED SOURCE: docs/reviews/samson-et-dalila-act-1.md -->


<!-- BEGIN ARCHIVED SOURCE: docs/reviews/samson-et-dalila-act-2.md -->

## Archived source: `docs/reviews/samson-et-dalila-act-2.md`

# Samson et Dalila — Act II, 21 October 2026

## Scope and source

Route: `#/operas/samson-et-dalila?act=2`. The French continues the same public-domain Ferdinand Lemaire libretto printed in the ABAO 2020–2021 programme, pp. 225–236: https://www.esm.rochester.edu/uploads/Locke-Libro-ABAO-2020-2021.pdf (retrieved 21 October 2026). The programme’s Spanish translation and essays are not reproduced.

Three source scenes, nine editorial navigation sections, 67 sung turns / 303 bilingual verse lines, and 22 stage-direction/cue entries. All dialogue follows the source order, including the alternating voices in the vengeance duet, Samson’s replies during “Mon cœur s’ouvre à ta voix”, the storm cues, and the final calls “À moi ! Philistins !” and “Trahison !”. Each uninterrupted turn stays in one bilingual row. A direction or named musical section can interrupt a turn.

The extraction was compared with the complete French act. Unused lines are exclusively act/scene/cast/speaker headings and one Spanish spillover (“en actitud soñadora.”). Source cast rubrics remain metadata. Four evident typography/OCR corrections are recorded: “notre rare” → “notre race”; “dans te fond” → “dans le fond”; “ne petit trahir” → “ne peut trahir”; “II a dit” → “Il a dit”. The High Priest’s source accent variant “PRÈTRE” is retained in that French cue and mapped to the same English identity.

## Presentation and review

French incipits, English title translations, and deduplicated English participants appear in both outlines. Forms follow the previously consulted Opera-Arias scene index (https://www.opera-arias.com/saint-sa%C3%ABns/samson-et-dalila/); “J’ai gravi la montagne” remains unclassified rather than assigning a speculative type. No musical numbers are invented. The shared icon matcher now recognizes French “Récitatif” (and “Récitatif accompagné”) for the act-only recitative symbol.

English is a fresh draft checked turn by turn against the French; independent editorial/listening review remains pending. Public provenance stays one line. The source’s wording and separate replies are retained without blending other editions.

Act I now links forward to Act II. Both are available in the work navigation and outline. Act III remains unprepared and its direct URL retains the placeholder.

## Verification

52 tests passed: both Samson suites, the existing presentation suite, and reader-navigation suite. They cover the checked French checksum, verse counts, full bilingual rendering, every section destination, Act I → II navigation, and Act III placeholder routing. `git diff --check` passed. Existing unrelated catalog failures recorded in the Act I review were not retested or changed. Desktop/mobile visual verification remains pending; the established reader layout is reused.

<!-- END ARCHIVED SOURCE: docs/reviews/samson-et-dalila-act-2.md -->


<!-- BEGIN ARCHIVED SOURCE: docs/reviews/samson-et-dalila-act-3.md -->

## Archived source: `docs/reviews/samson-et-dalila-act-3.md`

# Samson et Dalila — Act III, 21 October 2026

## Source and scope

Route: `#/operas/samson-et-dalila?act=3`. Same primary French source as Acts I–II: Ferdinand Lemaire’s public-domain libretto in the ABAO 2020–2021 programme, printed pp. 237–245, https://www.esm.rochester.edu/uploads/Locke-Libro-ABAO-2020-2021.pdf (retrieved 21 October 2026). No Spanish translation or programme commentary is reproduced.

Two tableaux, three source scenes, seven navigation sections, 35 sung turns / 211 bilingual verse lines, and 21 separate direction/cue entries. The Bacchanale is an instrumental section with no invented lyrics. Source tableau headings are displayed and translated. The finale includes the prayer, collapse, collective cry and end marker.

## Text and presentation

Every extracted French lyric and direction was checked for inclusion. Unused extraction lines consist only of headings, cast/speaker cues and the Spanish-column spillover “Despunta el día.)”. The source cast rubric supplies Samson’s entrance led by a child; its action is also retained as a bilingual direction. Page furniture is excluded. Two transparent typographical corrections: “jourson” → “jour son”; “guides par ton esprit” → “guidés par ton esprit”. The source’s future tense “tu retireras” is retained, rather than silently substituting the past tense used in some versions.

Source repetitions are retained, including Dalila’s repeated vengeance statement and the final Philistine chorus. Sung variants “ma (ta)” and “mon (ton)” remain lyrics, not stage cues. Joint original speaker cues are preserved; English participant credits split clear identities and deduplicate them.

Navigation incipits are editorial, without invented official numbers. Types follow the previously consulted Opera-Arias index: Récitatif, Chœur, Ballet, Scène, Air et ensemble, Duo and Finale. The two tableaux and Bacchanale heading are printed in the primary source. English is a fresh translation checked against each French turn; independent editorial/listening review remains pending. Public provenance is one short line.

## Completion and validation

All three acts are now available with their bilingual text and outlines: 836 sung French/English line pairs in total (322 + 303 + 211). Act II links forward to Act III; the last act has no onward-act link. Existing Act I/II checks were updated for the completed navigation without changing their French text.

55 relevant tests passed: all three Samson suites plus the existing reader-presentation and navigation suites. Checks cover source checksums, line pairing, full-turn rendering, tableau headings, instrumental separation, sung parenthetical variants, deduplicated participants and every section destination. Syntax and `git diff --check` passed. Previously documented unrelated catalog failures were not retested or changed. Desktop/mobile visual verification remains pending; the established reader layout is reused.

<!-- END ARCHIVED SOURCE: docs/reviews/samson-et-dalila-act-3.md -->


<!-- BEGIN ARCHIVED SOURCE: docs/reviews/tosca-review.md -->

## Archived source: `docs/reviews/tosca-review.md`

# Tosca review — 20 October 2026

Scope: all three acts; Italian–English wording and line correspondence, speaker turns, stage directions, and both outlines. Primary source: https://opera-guide.ch/operas/tosca/libretto/it/ (accessed 20 October 2026). Existing Spotify recording remains the listening-order reference; musical types are editorial listening labels, not score numbering.

Restored the Sacristan's “Non mi muovo!”, Cavaradossi's groan in Act II, Tosca's “Chi mi assicura?”, Scarpia's “E sia”, and Sciarrone's final offstage replies. Restored the interleaved interrogation, mock-execution bargain, and execution instructions. Separated “con forza crescente”, “Se la svigna”, and “fissando come in una visione” from sung text. Restored the opening settings of Acts I and II. Existing prose directions remain condensed in places; this is not a diplomatic transcription of every source direction.

Corrected meaning and line correspondence, including “esulanti” (in exile), Scarpia's proposed exchange of a life for a moment, his use of the confessor and executioner, and Tosca's account of promising herself to Scarpia. Sung parenthetical asides remain lyrics. Short cues use square brackets with no label; full directions have one bilingual row, a Stage direction label in each language column, and no brackets.

All 44 listening entries now resolve to their passages through the shared scene-outline renderer. All 18 existing scene/section addresses remain valid. The “Tosca? Che non mi veda” entry follows its source position in Scene VIII rather than pointing to Scene IX. Participant lists use the sung turns within each passage; joint cues and aliases are deduplicated. Musical icons appear only in the act outline.

Validation: 68 content, presentation, navigation, and source-integrity checks pass. A normalized comparison of sung words with the source found no remaining omissions; remaining differences are source spelling/typographical variants and parsed joint speaker labels. Browser desktop/mobile and live deployment verification remain pending.

## Three-act structural follow-up — 23 October 2026

Checked all 18 scenes and 778 bilingual passage pairs (397 / 289 / 92), with 1,046 recorded sung-source lines (453 / 427 / 166). Every Italian passage has English text, all recorded line counts agree, and no escaped newline, empty text, or malformed stanza split was detected. Audited 44 outline landmarks and their bilingual labels. In Act I Scene V, Cavaradossi sings “Mia gelosa!” twice; pinned its existing outline entry to the first occurrence (source turn 86) so future text edits do not redirect it to the repeat. No lyric wording or translation text was changed. All 18 scene/section links remain unchanged. Added structural regression tests; browser visual inspection remains pending.

<!-- END ARCHIVED SOURCE: docs/reviews/tosca-review.md -->


<!-- BEGIN ARCHIVED SOURCE: docs/reviews/turandot-outline.md -->

## Archived source: `docs/reviews/turandot-outline.md`

# Turandot outline review — 15 October 2026

Scope: full outline and three act outlines, participant headings and all twenty numbered section links.

Primary source: Ricordi libretto hosted by Teatro Regio Torino, https://www.teatroregio.torino.it/sites/default/files/uploads/inline-files/Turandot%20-%20Libretto.pdf (accessed 15 October 2026; PDF pages 3–29). Retain the source numbers 1–20, section types, three acts and five tableaux. The Alfano ending in the Toscanini version remains included, as documented in the existing source note.

The source headings identify numbered musical forms, without separate titles. Disable the reader’s inferred first-line titles for this opera. Following the clarified guideline of 19 October, keep the original-language form on line one and its English translation on line two, even without a separate title. Tableau headings appear in both outlines. Musical symbols appear only in act outlines. No album reference added.

Participant lists follow sung cues in first-appearance order. Joint cues split into known characters/groups and deduplicate. Existing English speaker translations supply English role labels in the participant lists; the original Italian speaker cues and all bilingual turns remain unchanged.

Verification: all twenty links in both outline views have unique section targets and select the correct section in a continuous act. Existing tests preserve source numbering, 436/346/332 sung-line counts, paired translations and the complete ending. A before/after comparison confirms all source and translated turns are unchanged. Visual desktop/mobile QA and semantic translation review remain unverified.

Related correction: the same opt-in suppression of inferred titles also applies to the just-reviewed Macbeth, where first lines were still being inferred for numbered sections. Its source numbers and text are unchanged.

## Complete bilingual review — 19 October 2026

Read every Italian–English entry across all three acts for meaning and line correspondence. Revised 23 English entries, including “O sangue!” (“Or blood!”), the direction describing Turandot over her prey, Calaf's offer that Turandot may destroy him, and several overly literal phrases. This is a review against the stored Italian, not a fresh critical-edition comparison.

Enabled separate paired rows for all 1,114 sung lines (436 / 346 / 332). All Italian words, sung line breaks and speaker turns remain intact. Consolidated six adjacent narrative-direction pairs; full paragraphs have one label per language and no brackets. Marked 130 compact performance cues for brackets without labels. Preserved all twenty section addresses, source divisions, participant lists and the Alfano ending.

Verification covers exact rendered bilingual pairs, stage-direction labels, English outline headings, unique targets and passage selection. Browser visual verification remains pending.

## Named outline entries — 19 October 2026

The user's subsequent clarification supersedes the form-only heading rule above: both outlines now show number, musical type, and an explicitly reviewed title or sung incipit. Line two translates the title; line three retains the participants. All twenty entries have titles drawn from their own text, including familiar arias within larger numbered sections. No additional sections or links are introduced.

No. 14 displays “N. 14 · Aria · Nessun dorma!” as requested. Its source classification “Introduzione e Romanza” remains stored separately; the introduction and its participants remain part of that section. Other entries retain their source musical types. Musical symbols remain confined to act outlines. The shared reading-page headings also use the same titles for orientation after following an outline link.

<!-- END ARCHIVED SOURCE: docs/reviews/turandot-outline.md -->
