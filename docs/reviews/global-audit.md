# My Favorite Operas — Active Review & Repair Tracker

> **SINGLE ACTIVE REVIEW FILE.** This document is the operational source of truth for audit findings, repair sequencing, statuses, evidence, and handover. Do not create another active review, separate master roadmap, or competing issue-status file. Historical reports are in [../archive/](../archive/).

**Last synchronized:** 2026-11-02 (UTC / Africa-Dakar)  
**Repository:** [AsuraFY/my-favorite-operas](https://github.com/AsuraFY/my-favorite-operas) · **Working branch:** `Update` · **Production branch:** `main` (never modify or merge without separate explicit approval)  
**Scope:** All 35 current operas **and every future opera**, shared reader, outlines, information pages, CI and release.  
**Current focus:** Phase C editorial acceptance and Phase D visual/manual sign-off. On 2026-11-02 the latest application commit `b7d0130c` passed the current Node + browser test gate and verified `Update` preview (run 41437867374). A later audit-only commit does not change tested application code.

## 1. START HERE — current checkpoint and next action

**Latest working state when this tracker was consolidated:** `Update` commit [`05388687`](https://github.com/AsuraFY/my-favorite-operas/commit/053886872b9137270a9f0730ae36e84159220cfa) (doc-only audit notes after prior source edits). **No current-head Node/browser or preview result was confirmed in this consolidation.** `main` was not touched.

**What was verified previously:** 2026-11-01 [Verify Update run 41363468298](https://github.com/AsuraFY/my-favorite-operas/actions/runs/41363468298) passed **224/224 Node tests** and **876 Chromium assertions** across **70 viewport/operas combinations** (35 desktop + 35 mobile); the dependent Update preview job succeeded. This proves only that historical tested commit, not later Phase B commits. The earlier [41353260510](https://github.com/AsuraFY/my-favorite-operas/actions/runs/41353260510) gate also passed 224 Node/876 browser assertions.

**Most recent repairs committed, not yet independently accepted:**
- *Die Walküre* Acts II & III source scenic preambles restored, 1,806 original German source records; new integrity test. November 2 participant attribution/English speaker work covers Acts I–III.
- *Manon* Acts I–IV English speaker labels and all Acts I–V participant arrays revised; temporary cues removed from outline credits, **not from sung passage labels**.
- Regression coverage added in `tests/die-walkure-source-integrity.test.mjs` and `tests/opera-participant-names.test.mjs`; **the latest passing CI for those edits is not established**.
- Google Drive guideline §1.4 was updated and read back on November 2, with the approved **universal participant-list rule**.

**Immediate next action:** The full automated gate **passed** for application SHA [`b7d0130c`](https://github.com/AsuraFY/my-favorite-operas/commit/b7d0130cbad956324d8b95e3cbdfa3e3477c6408): [Verify Update run 41437867374](https://github.com/AsuraFY/my-favorite-operas/actions/runs/41437867374), **236/236 Node tests**, **876 browser assertions across 35 operas × desktop/mobile (70)**, uploaded visual artifact, and successful dependent **Publish verified Update preview** job. [Pages dynamic build run 41437867705](https://github.com/AsuraFY/my-favorite-operas/actions/runs/41437867705) also succeeded. **Human inspection of affected acts, all-35 editorial, accessibility/night checks, and public `main` release remain separate and unapproved.** Continue Phase C translation/edition review and targeted Phase B manual review.

**Important:** A committed fix is **Needs verification**, not `Resolved`. A publicly reachable GitHub Pages link may reflect a different release than `Update`. Always give the user direct opera/act page links after opera edits and disclose whether those exact commits are visibly deployed.

## 2. Document roles and priority (avoid conflicting instructions)

| Role | Canonical document | How to use it |
|---|---|---|
| **Approved design/editorial rules** | [Opera_Guidelines.md — Google Drive](https://drive.google.com/file/d/1-NhM8ayIHj9ceQn9frQWLc0qXOKYjDYp/view) | **Only** active opera guidelines. Latest user decisions prevail; **any further guideline edit requires explicit approval**. §1.4 governs all present/future opera participants. |
| **Active tracker and repair roadmap** | **This file —** `docs/reviews/global-audit.md` | One master issue register, phase board, per-opera checklist, evidence and next-chat handover. Update here on every repair. |
| **Development / release procedures** | [development-workflow.md](../guidelines/development-workflow.md) | Working branch, review, tests and release mechanics. Some old implementation examples are stale; verify against the latest actual repository and resolve in a separate workflow update. |
| **Dated review snapshot** | [November 1 Drive Audit & Repair Roadmap](https://drive.google.com/file/d/1HrV7yw8iyx1Y3EEC5UyiRNbW6oIBhAY0/view) | Historical source for the 22 `AUD-20261101-xx` findings and original phase sequencing. **Do not maintain as a competing live tracker.** |
| **Historical research/specifications** | [Archived repo reviews](../archive/), [archived Parsifal plan](../archive/parsifal-reader-outline-and-source-plan.md), [V1 product specification](https://docs.google.com/document/d/1f6nHTppsfuElAV87YS4LReIBMRg2BJb7KFwFlglMb_g/edit) | Provenance and past decisions only. Earlier plans and the V1 specification are superseded wherever the active guideline or current user decisions differ. |

**Rule of precedence:** Explicit latest user decision → active Google Drive guideline → current source/CI evidence → this issue tracker and current implementation workflow → archived historical evidence. The archive does not establish current code status.

## 3. Phase board — one plan for remaining operations

| Phase | Tracked issues | Current position | Next deliverable |
|---|---|---|---|
| **A — Reliable test gate** | AUD-20261101-01–03 | **Verified on application SHA `b7d0130c`, 2026-11-02** | Keep test/preview SHA evidence, rerun after later application changes |
| **B — Definite source/presentation repairs** | AUD-20261101-04–09; AUD-20261102-01 | **Implemented; Node/browser automated gate passed, manual editorial/visual sign-off pending** | Verify affected scenes and stage semantics in reader/outline |
| **C — Editorial fidelity and nomenclature** | AUD-20261101-10–16 | **In progress; several corrections made, translation/edition review outstanding** | Source/translation semantic collation; Manon Act V editorial choice |
| **D — Reader, outline, accessibility and visual sign-off** | AUD-20261101-17–20; AUD-20261102-01 | Queued / needs verification | All 35 plus future operas: detailed participants, both outlines, desktop/mobile/night, screen-reader, anchors, recordings |
| **E — Metadata, governance, release** | AUD-20261101-21–22; GLOBAL issues | Queued | Correct obsolete content/status references with approval when guideline edits required; reconcile tracker; request separate `main` merge authorization |

**Sequencing:** Phase A's historical automation is green; rerun for newer changes. Phase B and Phase C can surface additional participant defects and must respect the approved guideline. Phase D is the catalogue-wide acceptance gate; it is **not** permission to declare all 35 reviewed from a browser smoke count. Phase E releases only with explicit `main` merge approval.

## 4. MASTER ISSUE REGISTER — November 1 roadmap, preserved IDs

Statuses in this table are the **consolidated Nov 2 assessment**, not a claim of fresh browser testing. Do not relabel from 'Needs verification' to 'Resolved' without commit+CI+manual evidence appropriate to the finding.

| Stable issue ID | Priority · Phase | Status | Scope, action and acceptance |
|---|---|---|---|
| `AUD-20261101-01` | P0 · A | Needs verification | **Node test gate** — 224/224 passed at 2026-11-01 checkpoint (run 41363468298); capture pass/fail on **current Update head** before accepting later edits. |
| `AUD-20261101-02` | P0 · A | Needs verification | **All-35 Chromium coverage** — 876 assertions / 70 opera×viewport checks passed at 2026-11-01 checkpoint; re-run current head and retain artifacts. Human visual inspection is separate. |
| `AUD-20261101-03` | P0 · A/E | Needs verification | **Preview and public release distinction** — Match tested commit to Update preview; compare with main Pages independently; never assert public URL has newer edits without proof. Merge only by explicit user approval. |
| `AUD-20261101-04` | P0 · B | Needs verification | **Die Walküre Acts II–III scenic preambles** — Restored 2 omissions; exact German source 1,806 lines and integrity test committed; verify new-head Node/browser, direction treatment and opening visuals. |
| `AUD-20261101-05` | P0 · B/C | Needs verification | **Manon original edition and Prélude** — Moved terminal Act I `Prélude` cue to opening Act II (source text/English unchanged; source position reconciled against Sottovoce Q842063 and historical libretto). Act III's two tableaux retained; Act V mixed edition separately tracked in AUD-20261101-14. New-head CI/visual confirmation pending. |
| `AUD-20261101-06` | P1 · B | Needs verification | **Manon English generic/group speaker cues** — Acts I–V participant/role edits committed Nov 2; verify all descriptive English labels on the English side, no false group splitting and no changes to sung text. |
| `AUD-20261101-07` | P1 · B | Needs verification | **Die Walküre German group and voice labels** — Acts I–III participant/English cue edits committed Nov 2; verify true participants, German voice attribution, collective cues and full source alignment. |
| `AUD-20261101-08` | P1 · B | Needs verification | **Manon/Die Walküre direction semantics** — Each Stage direction turn now explicitly flags compact versus extended cue in the eight act files, preserving source/translation texts and sung asides. Verify semantic edge cases and rendering in browser; do not interpret automatic flags as editorial sign-off. |
| `AUD-20261101-09` | P1 · B | Needs verification | **La fanciulla del West missing English titles** — Explicitly populated `Introduction`, `Hello, Nick!`, `Hello, Minnie!` in both Act I section metadata and historical listening-outline metadata. Current-head CI/preview and both-outline visual confirmation pending. |
| `AUD-20261101-10` | P1 · C | Source structure assessed; wider review pending | **Die Zauberflöte generic Auftritt and Arie mir Chor** — Verify 48 generic Auftritt headings, form anomaly and actual source incipits without inventing official titles. |
| `AUD-20261101-11` | P1 · C | Implemented; verification pending | **Tosca Act III instrumental credits** — Verify bells/matins landmark and remove singers from instrumental-only credit lines where source confirms none. |
| `AUD-20261101-12` | P1 · C | Source labels assessed; further editorial review pending | **Turandot / Carmen generic headings** — Check Scena/Scène and section incipits; use source-supported navigation labels and correct translations only. |
| `AUD-20261101-13` | P1 · C | Seven tableaux implemented; verification / rights pending | **Eugene Onegin English-first, seven tableaux** — Respect approved English-first reader, document text edition/rights and authentic seven-tableau boundaries; never fabricate Russian alignment. |
| `AUD-20261101-14` | P1 · C | Mixed-edition source identified; editorial decision pending | **Manon Act V mixed-edition variant** — Document J. C. Macy Act V contextual differences versus Acts I–IV; obtain editorial decision before substitutions. |
| `AUD-20261101-15` | P1 · C | Catalogue metadata inventoried; translation review pending | **Working English translations across catalogue** — Per act, collate original, speakers, directions, stanza alignment, incipits and English semantics. Working draft ≠ literary approval. |
| `AUD-20261101-16` | P1 · C | Source inventory started; rights clearance unresolved | **Rights, licensing, translator/source provenance** — Inventory exact editions, translator, license and URL/access information for originals, translations and imagery; remediate unsuitable sources. |
| `AUD-20261101-17` | P2 · D | Needs verification | **Both outlines and participant attribution** — Check 3-line hierarchy, original/English headings, instrumentals, icons/spacing, no duplicate/collective credits, no untranslated generic role or phantom character. |
| `AUD-20261101-18` | P2 · D | Needs verification | **Responsive navigation and accessibility** — Keyboard/focus, drawer, sticky offsets, copied links/reload/history, contrast, reduced motion, desktop/mobile/night screenshots and screen reader. |
| `AUD-20261101-19` | P2 · D | Needs verification | **Favorite Performances card** — Verify approved Tristan/Bernstein media, accurate cast, disclosure behavior, reference label, day/night and mobile. |
| `AUD-20261101-20` | P2 · D | Needs review | **Madama Butterfly performance provenance** — Recover exactly which user-selected recording was used; do not invent a favorite or metadata. |
| `AUD-20261101-21` | P2 · E | Open | **Obsolete guidelines inventory and catalogue flags** — Confirm 35/35 registry, reconcile stale 31/11 in §7.12 and 29 librettoPlanned flags; **guideline corrections require user approval**. |
| `AUD-20261101-22` | P2 · E | Needs verification | **Historical audit/CI inconsistencies** — Reconcile 12/16/31-opera snapshots and old failures against current branch; preserve original evidence without confusing it with active status. |

### New universal cross-opera issue, approved 2026-11-02

| Stable issue ID | Priority · Phase | Status | Scope, action and acceptance |
|---|---|---|---|
| `AUD-20261102-01` | P1 · B/D | **In progress — implementation in 2 operas; 0 formally accepted** | Apply the active §1.4 rule to **all 35 current plus future operas** in full and act outlines and relevant character lists. Include each true singer only once, split identifiable joint labels, omit temporary together/others/all cues from participant lists, keep legitimate named ensembles, translate generic roles into English while retaining proper names. Keep original-language cues and English equivalents **inside the libretto**; do not guess unidentified participants. Check `Die Walküre` and `Manon` committed changes with new-head CI + visual review, then inspect the other 33 independently. Record source evidence and act-level sign-off. |

## 5. Earlier issue IDs retained (do not lose prior work)

The 26 older stable IDs below remain searchable and unresolved unless independently verified. Where a 2026-11-01 issue overlaps, preserve the older ID as an **alias** pointing to the newer issue; do not count the same defect twice. Expanded historical descriptions and past test results are preserved verbatim in [the archived tracker snapshot](../archive/global-audit-snapshot-2026-11-02.md).

| Earlier ID | Carried-forward status | Concern / linkage |
|---|---|---|
| `GLOBAL-01` | Needs verification | All 35 require independent desktop/mobile/night visual inspection; previous 16/11 references are historical. |
| `GLOBAL-02` | Needs verification | Verify outline links, browser history, reloading, sticky header offsets and responsive navigation. |
| `GLOBAL-03` | Needs review | Primary-source and English editorial review outstanding across catalogue. |
| `GLOBAL-04` | Needs verification | Check assets/dependencies/Pages deployment at latest approved release build. |
| `GLOBAL-05` | Needs review | The Oct 26 Magic Flute CI error is historical; check if current version reproduces before labeling as a defect. |
| `PAG-V01` | Needs review | Pagliacci original/English draft source and literary verification. |
| `TRO-V01` | In progress (historical) | Il trovatore all four parts entered; Italian/source, English and browser review pending. |
| `ELISIR-V01` | In progress (historical) | L’elisir d’amore two-act source collation, English and browser review pending. |
| `RIG-V01` | In progress (historical) | Rigoletto Acts II–III source, English, section and browser review pending. |
| `AUD-01` | Deferred legacy alias | Die Zauberflöte headings; covered by AUD-20261101-10. |
| `ZAUB-E01` | Needs review | Die Zauberflöte independent German/English, speaker and stage review. |
| `AUD-02` | Deferred legacy alias | La fanciulla del West Act I translated headings; covered by AUD-20261101-09. |
| `AUD-03` | Deferred legacy alias | Tosca Act III instrumental credits; covered by AUD-20261101-11. |
| `AUD-04` | Needs review legacy alias | Turandot generic headings; covered by AUD-20261101-12. |
| `AUD-05` | Needs review legacy alias | Carmen generic headings; covered by AUD-20261101-12. |
| `FIG-V01` | Needs verification | Figaro 81-link browser route and outline behavior. |
| `BOH-V01` | Needs verification | La Bohème 26 outline landmarks and four tableaux, human browser review. |
| `MAC-V01` | Needs verification | Macbeth layout, translation, alternative scene placement. |
| `BUT-V01` | Needs verification | Madama Butterfly source/editorial and visual inspection. |
| `SAM-V01` | Needs review | Samson et Dalila French/English and source evaluation. |
| `OTE-V01` | Needs review | Otello original and draft English editorial reconciliation. |
| `PAR-V01` | Needs review | Parsifal original and draft English editorial reconciliation. |
| `DON-V01` | Needs review | Don Giovanni source, selective 47-item outline and English. |
| `COS-V01` | Needs verification | Così fan tutte independent visual review. |
| `BAR-V01` | Needs verification | Il barbiere di Siviglia independent visual review. |
| `TRI-V01` | Needs verification | Tristan und Isolde independent visual review. |

## 6. Per-opera verification matrix — 35 integrated readers

**Meaning of the participant column:** "Not assessed" means **no November 2 guideline sign-off**, not a demonstrated defect. "Changed; needs verification" means code is committed but the acceptance check is **not complete**. The final status column covers independent source, literary/editorial, and manual reader approval; 35/35 technical loader coverage is **not** 35/35 editorial completion.

| # | Opera | Universal participant rule (§1.4) | Complete editorial / visual sign-off | Individual audit focus from 2026-11-01 |
|---:|---|---|---|---|
| 01 | *Il barbiere di Siviglia* | **Not assessed** | **Not signed off** | check two-act incipits, Sinfonia/Temporale instrumental headings, direction cues, English review. |
| 02 | *Tristan und Isolde* | **Not assessed** | **Not signed off** | check German forms, user-selected Bernstein reference, favorite card and full-cast details. |
| 03 | *Così fan tutte* | **Not assessed** | **Not signed off** | check existing numbered sections, 33 untitled recitatives, Italian/English alignment. |
| 04 | *Macbeth* | **Not assessed** | **Not signed off** | 19/7/4/11 scene preservation, 1847 alternative, witches group naming, direction cues. |
| 05 | *Turandot* | **Not assessed** | **Not signed off** | 20 official sections, version/Alfano ending, generic headings. |
| 06 | *Le nozze di Figaro* | **Not assessed** | **Not signed off** | 81 landmarks, official Nos. 1–29, aliases/long act pages. |
| 07 | *Samson et Dalila* | **Not assessed** | **Not signed off** | three acts, two Act III tableaux, Bacchanale exception, French text. |
| 08 | *La fanciulla del West* | **Not assessed** | **Not signed off** | three untranslated headings, early reader outline/listening references. |
| 09 | *Manon* | Changed Nov 2; **needs verification** | **Not signed off** | five acts; prelude, speakers, machine English, edition-mixed Act V. |
| 10 | *Otello* | **Not assessed** | **Not signed off** | Italian 3/5/9/4 scene sequence, 59 outline matches and English draft. |
| 11 | *Parsifal* | **Not assessed** | **Not signed off** | German original, outline landmarks, stage business/English review. |
| 12 | *Carmen* | **Not assessed** | **Not signed off** | four acts, French dialogue/form distinctions, translated headings. |
| 13 | *La traviata* | **Not assessed** | **Not signed off** | three acts, source/English correspondence and reader navigation. |
| 14 | *Die Zauberflöte* | **Not assessed** | **Not signed off** | 49 source scenes, 75 sections, 48 Auftritt entries and spelling. |
| 15 | *Aida* | **Not assessed** | **Not signed off** | four acts, source numbering and scene/chorus attribution. |
| 16 | *Tosca* | **Not assessed** | **Not signed off** | 3 acts and 44 outline links, bells landmark, album provenance. |
| 17 | *Madama Butterfly* | **Not assessed** | **Not signed off** | three acts, 34 sections, selected recording provenance. |
| 18 | *Rigoletto* | **Not assessed** | **Not signed off** | three acts, Part II–III numbering and English draft. |
| 19 | *Don Giovanni* | **Not assessed** | **Not signed off** | two acts, deliberate selective 47-entry outline, not every recitative. |
| 20 | *La Bohème* | **Not assessed** | **Not signed off** | four tableaux, 26 user-selected recording landmarks and title translations. |
| 21 | *Lucia di Lammermoor* | **Not assessed** | **Not signed off** | three parts, Mad Scene source, attribution and ensemble labels. |
| 22 | *Eugene Onegin* | **Not assessed** | **Not signed off** | English-first, seven tableaux, source/version transparency. |
| 23 | *Les contes d’Hoffmann* | **Not assessed** | **Not signed off** | Prologue, three acts, Epilogue, edition and source order. |
| 24 | *Norma* | **Not assessed** | **Not signed off** | two acts, 20 scenes, source speaker ambiguity in Act I. |
| 25 | *Il trovatore* | **Not assessed** | **Not signed off** | four parts, Italian original and MHT source fidelity. |
| 26 | *Das Rheingold* | **Not assessed** | **Not signed off** | four continuous scenes, source directions, English draft. |
| 27 | *Die Walküre* | Changed Nov 2; **needs verification** | **Not signed off** | two omitted scenic preambles, group cues, long directions. |
| 28 | *Siegfried* | **Not assessed** | **Not signed off** | nine scenes, German source and English draft. |
| 29 | *Götterdämmerung* | **Not assessed** | **Not signed off** | prologue, three acts, source variant and English draft. |
| 30 | *L’elisir d’amore* | **Not assessed** | **Not signed off** | two acts, 19 scenes, original source and drafts. |
| 31 | *Die Fledermaus* | **Not assessed** | **Not signed off** | three acts, spoken/sung dialogue treatment, German/English. |
| 32 | *La Cenerentola* | **Not assessed** | **Not signed off** | two acts, 25 scenes, Alidoro Act II Scene IV provisional attribution. |
| 33 | *Hänsel und Gretel* | **Not assessed** | **Not signed off** | three acts, German scene/speaker source and English. |
| 34 | *Nabucco* | **Not assessed** | **Not signed off** | four named parts, 25 scenes, translation/source concordance. |
| 35 | *Pagliacci* | **Not assessed** | **Not signed off** | Prologue \+ two acts, correct two-act navigation and English. |

**For each opera and each act, use one consistent acceptance checklist:**

- [ ] Primary original source and exact edition/version recorded; legal provenance and translation rights considered.
- [ ] All acts, scenic divisions, source official numbers/types, sung lines, stage directions, tableaux and original→English pairing checked for completeness.
- [ ] **English participants:** real individuals and genuine groups only; one entry per entity; split all identifiable joint cues in all source languages, remove temporary "together/others/all" cues, avoid invented or ambiguous members.
- [ ] **Libretto speakers remain intact:** original-language labels before their sung passages and accurate English equivalents on the English side; no sung text lost when outline credits are cleaned.
- [ ] **Original names unchanged, descriptive roles English:** accents and approved character spellings preserved; speaker/alias ambiguity documented.
- [ ] Both outlines respect three-line structure, participant alignment/icons, original/English titles and incipits, correct forms/music-vs-recitative symbols, and instrumental-only no-credit exceptions.
- [ ] Short and extended stage directions follow §1.4 bracket, italic/yellow and label rules without confusing sung parenthetical text.
- [ ] Outline anchors, previous/next, mobile navigation, refresh/deep links, keyboard and contrast checked on real pages in desktop/mobile/day/night; no overflow.
- [ ] English is **explicitly** marked working/unreviewed or has source-grounded editorial sign-off — machine pairing alone is not approval.
- [ ] Relevant tests and current-head CI pass; intended preview URL verified; user receives direct affected opera/act link plus concise change description and deployment caveat.
- [ ] Reviewer, date, exact branch/commit, evidence links and final status entered in this tracker; only then mark `Resolved`.

## 7. Verification and release gates

**Status vocabulary:** `Open` = confirmed unresolved; `In progress` = implementation underway; `Needs verification` = modified or test required; `Needs review` = source/editorial judgment required; `Resolved` = evidence-backed fix, dated; `Accepted` = user-approved exception with rationale; `Deferred` = knowingly postponed. `Not assessed` is only a per-opera checklist state and never means "failed".

Every resolved issue must cite **actual changed paths, commit SHA, source edition if applicable, test name and result, Actions run link, preview target and manual/screenshot check status**. Note when a test is a historical checkpoint. Keep editorial, browser, and publication acceptance separate.

**Release gate:** Current `Update` tests green (not merely old green checks); verified preview commit matches; no unapproved source or translation substitutions; relevant manual day/night/mobile/keyboard checks recorded; approved guidelines met or explicit exceptions recorded; licensing/provenance reviewed; **separate approval requested before any merge into `main`**.

## 8. Dated execution log and handover history

### 2026-11-02 — Current Update gate verified for application SHA `b7d0130c`

- **Initial failure diagnosed:** [Verify Update run 41436033887](https://github.com/AsuraFY/my-favorite-operas/actions/runs/41436033887) on earlier SHA `6065185b` failed 5/236 Node assertions. Four stale tests looked for provenance/status phrases in JavaScript `source` strings after source register centralization. The fifth Tosca test expected an offstage *display* name instead of the mapped `A Shepherd` while the original libretto cue remains `A Shepherd (offstage)`. Browser step and dependent preview were skipped. These were assertion expectations, **not** grounds to weaken source/reader integrity checks.
- **Regression repair:** created `tests/helpers/opera-origins.mjs` and updated four translation-status tests to read the correct per-opera entry in `docs/info/operas-origins.md`. Updated Tosca assertion to check both the actual English display name and the original offstage speaker cue. Five corrections are test-only; opera passages, navigation, speaker cues and page rendering were **not changed**.
- **Successful exact-commit gate:** [Verify Update run **41437867374**](https://github.com/AsuraFY/my-favorite-operas/actions/runs/41437867374), tested SHA [`b7d0130cbad956324d8b95e3cbdfa3e3477c6408`](https://github.com/AsuraFY/my-favorite-operas/commit/b7d0130cbad956324d8b95e3cbdfa3e3477c6408): **236/236 Node**, **876 browser assertions / 70 opera×viewport combinations** (35 desktop + 35 mobile), visual screenshot artifact `opera-browser-review` (artifact ID 13137556522), **successful Publish verified Update preview** dependent job. The separate [Pages build/deployment run 41437867705](https://github.com/AsuraFY/my-favorite-operas/actions/runs/41437867705) also succeeded on that SHA.
- **Scope of acceptance:** automated Node, desktop/mobile Chromium smoke/layout checks and verified Update preview succeeded. They do **not** establish independent manual review of the full bilingual content, all participant credits, stage-direction meaning, night-mode screenshots, screen-reader accessibility, or publication to `main`. The follow-up commit editing **this audit only** is not itself the tested app SHA. Future application changes require a fresh gate.
- **Branch policy:** `main` unchanged; no merge authorized.

### 2026-11-02 — Additional non-functional provenance comment cleanup

- Removed redundant original-edition, publisher and translation-source comments from active opera `bundle.js` files, retaining each bundle's `source` pointer to `docs/info/operas-origins.md`. No libretto text, participant lists, scene data, outline routing or translation passages changed.
- Kept the legacy Flaminio link in `src/opera-info-page.js` because it is part of rendered fallback HTML; removing it would visibly change that obsolete route. Historical act data and import scripts were not rewritten.
- Verification: source register still has 35 records and active bundle pointers. Latest-head Node and browser tests remain unconfirmed; this is a documentation-only cleanup, not a confirmed production deployment. `main` untouched.

### 2026-11-02 — 35-opera source register centralized in Markdown

- Created canonical [`docs/info/operas-origins.md`](../info/operas-origins.md) with **35 opera entries**, each listing original libretto source and URL or explicit unknown, English translation source/URL or independent origin, and a brief edition summary. Source and comparison links are distinguished; unknown original/English provenance is not invented.
- Simplified the bibliographic `source` fields in all 35 active `src/data/operas/librettos/*/bundle.js` modules to point to the register. Preserved the `Die Zauberflöte` text-status phrase used by the existing test. Did not change original lyric, translated lyric, speaker, source-record, or navigation data. Historical archive and source comments in individual act modules were not rewritten; this register is the canonical bibliographic reference.
- Added `tests/opera-origins-register.test.mjs` to enforce 35 entries, three fields per entry and matching bundle pointers. **Current-head CI/browser execution not yet confirmed**, so do not treat this as tested deployment.
- Do not conflate documentation centralization with legal clearance or translation approval; Phase C's editorial and rights checks remain open. All changes confined to `Update`, not `main`.

### 2026-11-02 — Phase C provenance & translation inventory (35 operas; not sign-off)

Inspected all **35 active libretto bundles** on `Update`; identified source/provenance descriptions and distinguished draft translations, historic adaptations and review claims. This is a **metadata inventory, not line-by-line translation review or legal clearance**. At least these source families require separate licensing/reproduction assessment: Opera Guide transcriptions, Librettidopera (terms/attribution and non-commercial/share-alike conditions), DraCor TEI editions, public-domain Project Gutenberg historical editions, modern opera-house PDF editions, and LibrettoArchive English reading text. Composer/librettist lifetime alone does not prove a modern translation or transcription is free to republish.

| Priority/operas | Verified repository metadata | Pending evidence or action |
|---|---|---|
| **P0: Eugene Onegin** | English-first, 1,434 records; sourced through Opera Guide/Sottovoce; *LibrettoArchive* listed as comparison, text not claimed reproduced | Identify exact published English translator, edition and reproduction rights before redistribution claims. Maintain blank Russian and seven tableau boundaries. |
| **P0: Manon** | Acts I–IV Opera Guide/Sottovoce with independent machine-translated English; Act V 1895 Macy bilingual variant | Verify printed translator/edition, edition mixing policy, original license/reuse permissions, and make selected variant explicit to readers. |
| **P0: Turandot / modern PDF** | 1926 Ricordi material hosted by Teatro Regio Torino; independent English | Verify original libretto territory-specific copyright, Ricordi/publication rights, PDF/transcription and images; do not assume 1926 = public domain worldwide. |
| **P1: Don Giovanni / Parsifal** | German/Italian text from DraCor TEI, machine-assisted English; acknowledged need to reconcile against preferred Opera Guide | Capture exact TEI ID/version/creator attribution and license and source corrections before marking verified. |
| **P1: Così fan tutte / Le nozze di Figaro / Tosca / Madama Butterfly** | Prior review/translation claims and source-linked outline profiles | Distinguish self-reported prior editorial passes from independent acceptance; check translator provenance and edition-level rights; no new translation sign-off. |
| **P1: Hänsel und Gretel** | Project Gutenberg historic 1905 bilingual Rullman edition; English described as nonliteral historical performing adaptation | Preserve historical adaptation identity; verify original release details and relevant territorial rights; do not recast as independent literal translation. |
| **P1: Samson et Dalila** | Original French from ABAO programme PDF pp. 213–245; independent English draft | Verify whether modern programme reproduction adds rights or conditions; corrected stale links to old per-act review files in metadata (`db4de96e`). |
| **P1: Librettidopera source family** | *Il barbiere*, *La Cenerentola*, *L'elisir d'amore*, *Lucia*, *Nabucco*, *Norma*, *Pagliacci*, plus secondary/source cross-checks | Evaluate site attribution, non-commercial and share-alike conditions as applied to our usage; provide clear credits/permissions where required. |
| **Other operas** | Opera Guide, Scala PDFs, specific user-supplied documents, Sottovoce transcriptions and original translation drafts listed in bundles | Complete edition URL/title, publisher/translator, retrieval date, source version, original/translation/editorial status and explicit license evidence for each act. |

**Issue 15 remains unresolved:** existing English lines are often labeled independent AI/working drafts, with limited prior review claims on select operas. Pairing/line counts demonstrate structure **not accuracy**; no corpus-wide semantic or stylistic translation collation has been completed. Prioritize actual original/English scene comparisons, speaker identity, stage directions, forms and approved exceptions; track evidence per opera under §6.

**Issue 16 remains unresolved:** source credits are not licensing proof. No permission/license determination or jurisdiction-by-jurisdiction clearance is claimed. For any original, translation, artwork or edition with unclear reuse rights, record uncertainty rather than assuming public domain.

**Next planned operational task:** add regression validation for per-opera provenance fields and explicit `editorialStatus`/source-edition provenance where needed, then conduct a documented act-level sample across high-risk English texts. Do not add autogenerated English quality claims.

### 2026-11-02 — Phase C continued: Turandot, Carmen, Eugene Onegin, Manon

- **Turandot:** reviewed 20 source/recording navigation sections across Acts I–III (7 / 6 / 7), including `Scena` passages with source-supported Italian incipits and English second lines. Current metadata already contains English titles for every nonempty source heading; keep existing confirmed headings instead of inventing musical numbers. Other metadata (cast aliases, rights/English translation) still needs a wider review.
- **Carmen:** reviewed 51 sections across four acts (20 / 14 / 12 / 5); the generic `Scène` item has the incipit `Carmen, sur tes pas` and English `Carmen, we follow in your wake`. Its page retains original French type and an English heading. No speculative changes made. Broad French/English editorial checking remains open.
- **Eugene Onegin:** repaired the **seven-scene structure** within the existing three acts (3 + 2 + 2), split at source-indicated changes of setting: Tatyana's room, duel mill, Prince Gremin's drawing room; retains all **1,434 English records** in source order (704 + 438 + 292), no fabricated Russian, no substitution of LibrettoArchive material. Existing source already identified approximate English provenance; exact printed English translation rights/edition **not yet verified**. Code commits `6bc045f`, `1bbc864`, `e0650ed`; bundle update `0bb57a9`; enhanced source-count/tableaux regression `2d7aea7`. Reader navigation, source boundaries and preview require fresh test/browser confirmation.
- **Manon:** the 1895 J. C. Macy bilingual English/French Act V reading text remains an **edition variant**; the Opera Guide/Sottovoce Acts I–IV are a separate edition. Do not present the whole compilation as a uniform historical edition; avoid any textual substitutions until a user-approved editorial choice. Exact scene placement and bibliographic rights/provenance still under review. The main bundle already discloses the variant.
- **Phase C status:** in progress. Items 15 (catalogue-wide draft English editorial review) and 16 (sources, licensing, translation rights and imagery) are extensive and remain **not accepted**. No latest-head Node/Chromium/preview success was confirmed. `main` untouched.

### 2026-11-02 — Phase C opened: *Die Zauberflöte* and *Tosca* source/outline checks

- *Die Zauberflöte* retains 49 source Auftritte (19 Act I, 30 Act II), including 48 unnumbered `Auftritt` sections plus other continuations; these labels are actual scene/dialogue divisions, not necessarily missing aria titles. No invented titles added. No. 10 already had correct reader `displayType: 'Arie mit Chor'` while original dataset `type: 'Arie mir Chor'` preserves the historical transcription. Source spelling still warrants edition-level reconciliation, so issue 10 remains review-pending.
- *Tosca* Act III bells/matins stage direction is **not sung**. Removed the hard-coded fabricated fallback character list for empty Act III Scene I outline entries; the first shepherd-song credit remains source-derived. Commit `5e2947a`.
- Added `tests/tosca-instrumental-credits.test.mjs` (`b567e218`) to guard both distinctions. **Current-head CI/browser not yet verified**, and Phase B test/visual acceptance remains open. Do not mark Phase C complete.
- Next Phase C issues: review *Turandot*/*Carmen* generic incipits (12), *Eugene Onegin* seven-tableau/source rights (13), *Manon* mixed Act V edition (14), full catalogue English translation and legal provenance (15–16).
- All changes on `Update`; `main` untouched.

### 2026-11-02 — Phase B content repairs implemented; independent verification outstanding

- *Manon* Acts I–V: set stage-direction `shortCue` classification, preserving the source French, existing English line text, and character/sung passages. Moved the duplicated Act I-terminal `Prélude` directive to Act II start; maintained the independent prelude at Act I opening. Acts I–IV from Sottovoce Q842063; the historical Act V J. C. Macy variant remains a separately tracked Phase C editorial issue. Updated Act V English collective-role labels for Soldiers/Sergeant. Commits: `e41b9c7d`, `0986851c`, `2709ff64`, `fff1e68c`, `65e24ad4`.
- *Die Walküre* Acts I–III: all stage-direction turns classified short vs extended, with original German and English passage content preserved. Commits: `00e86f98`, `e23354a2`, `c73693a`.
- *La fanciulla del West* Act I: filled translated headings in main reader metadata and historical listening outline without changing source Italian or assigning new official numbers. Commits: `e593120a`, `82b733ea`.
- Added `tests/phase-b-repairs.test.mjs` (`9ed54569`) checking *Manon* Prélude position/source counts, stage flags, and *Fanciulla* metadata. The earlier participant/source-integrity tests remain in place.
- **Do not mark resolved yet**: no new-head successful `npm test`, Chromium run or verified Update preview was obtained in this session; real browser presentation and selected stage-direction semantics still require verification. `main` untouched.

### 2026-11-02 — Google Drive guidelines converted to Markdown

- Active guidelines are now exactly three Markdown files in Drive: [Website_Guidelines.md](https://drive.google.com/file/d/1iR8xPKO2JrsXZG_b_Jd_cIMUTLVAiBXf/view), [Opera_Guidelines.md](https://drive.google.com/file/d/1-NhM8ayIHj9ceQn9frQWLc0qXOKYjDYp/view), and unchanged [Musical_Website_Guidelines.md](https://drive.google.com/file/d/159vEOn1Zh8OU03ch6ySmULzin9uR7Oun/view). The old native Google Docs files were moved to Drive Archive. No opera code or main change.



### 2026-11-02 — Documentation folder layout simplified

- Moved the active development workflow to [`docs/guidelines/development-workflow.md`](../guidelines/development-workflow.md), without altering its procedural text.
- Flattened all historical reports and the old *Parsifal* plan into [`docs/archive/`](../archive/), with no `reviews/` or `plans/` subdivisions. Existing original documents were preserved byte-for-byte.
- Left [`docs/reviews/global-audit.md`](./global-audit.md) as the **only active review document** and updated its archive/workflow links.
- This is a document-path reorganization only; no opera content, source code, CI requirements or `main` changes were made.

### 2026-11-02 — Unified reviews into this single operational file

- Made `docs/reviews/global-audit.md` the **only active review/repair tracker** on `Update`.
- Imported 22 November 1 issues and phases A–E from the Google Drive snapshot without renumbering IDs; included all 35 per-opera review slots and the approved Nov 2 participant rule as `AUD-20261102-01`.
- Preserved original audit content in [global-audit-snapshot-2026-11-02.md](../archive/global-audit-snapshot-2026-11-02.md). Moved the other review reports into [../archive/](../archive/) and the superseded Parsifal plan to [../archive/](../archive/); historical contents retained. No opera source edits in this organization commit.
- The dated Google Drive roadmap and V1 product specification are retained for reference; **they are not independently updated or active**.

### 2026-11-02 — Phase B source and participant work (on `Update`, test acceptance pending)

- *Die Walküre* preambles: `cb9fe825` (Act II), `f80c5a88` (Act III), regression `ca5d3f6f`; subsequent participant edits `4ef6a508`, `3094306a`, `b8b859df`.
- *Manon* translated speaker labels: `ac2e879d`, `2a5c5e66`, `76f0c397`, `322c1cb4`. Updated participant arrays (Acts I–V): `de29e640`, `24ea6f76`, `4e593fba`, `6be3b444`, `75f032e3`.
- Cross-opera regression `922ce500`; prior audit log commit `05388687`. **Not yet verified on the new head.**
- Permanent rules agreed and updated in Google Drive [§1.4](https://drive.google.com/file/d/1-NhM8ayIHj9ceQn9frQWLc0qXOKYjDYp/view): ensemble cues in libretto versus genuine unique character names in lists.

### 2026-11-01 — Reliable automated checkpoint (historical)

- Repo organization and 35 integrated lazy-loaded opera readers documented in the [archived organization report](../archive/repository-organization-2026-11-01.md).
- [Run 41363468298](https://github.com/AsuraFY/my-favorite-operas/actions/runs/41363468298): **224/224 Node, 876 Chromium assertions / 70 combinations**; dependent verified `Update` preview passed.
- Historical `main` merge was `0c49782`; **subsequent `Update` edits have not been authorized for merge**.

## 9. New-chat handover protocol

At the beginning of any new chat, read in order:
1. **This tracker**: checkpoint, phase board, stable issues, today's execution log, next unverified work.
2. [Active Google Drive guidelines](https://drive.google.com/file/d/1-NhM8ayIHj9ceQn9frQWLc0qXOKYjDYp/view), especially §1.4 for singer lists and act/full outlines.
3. [Development workflow](../guidelines/development-workflow.md) for branch/test mechanics; double-check any historical examples against current repo files.
4. Current GitHub `Update` head, most recent relevant CI/preview and target opera modules; source materials as needed.
5. Only if necessary, historical [archive](../archive/) and [November 1 baseline](https://drive.google.com/file/d/1HrV7yw8iyx1Y3EEC5UyiRNbW6oIBhAY0/view).

**After each task:** Update issue status and verification evidence **here**, do not create another review file. Give the user a short explanation plus the modified opera's direct act page URL for visual review; distinguish `Update` preview from public `main`. Keep `main` unchanged without explicit approval. If guidelines need changing, present the exact revision and obtain approval before editing the Google Doc.

**Next remaining operations at this checkpoint:** (1) verify latest `Update` CI/preview and Manon/Walküre visuals; (2) resolve Manon Act I Prélude/edition evidence; (3) audit stage-direction semantic cues in Manon and Die Walküre; (4) fill source-backed La fanciulla del West Act I English headings; (5) progress through all-35 source and participant matrix before editorial and release sign-off.
