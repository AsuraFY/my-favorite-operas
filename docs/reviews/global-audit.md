# My Favorite Operas — Active Review & Repair Tracker

> **SINGLE ACTIVE REVIEW FILE.** This document is the operational source of truth for audit findings, repair sequencing, statuses, evidence, and handover. Do not create another active review, separate master roadmap, or competing issue-status file. Historical reports are in [../archive/](../archive/).

**Last synchronized:** 2026-11-05 (UTC / Africa-Dakar)  
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
| **C — Editorial fidelity and nomenclature** | AUD-20261101-10–16 | **In progress; issues 10–14 completed (13–14 by user decision), 15–16 catalogue-wide work ongoing** | Continue Issue 15's full English editorial review, starting with confirmed Manon errors; keep Phase D and source rights gates separate |
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
| `AUD-20261101-10` | P1 · C | **Accepted 2026-11-04 — source-structure and No. 10 nomenclature scope** | **Die Zauberflöte generic Auftritt and Arie mir Chor** — Verify 48 generic Auftritt headings, form anomaly and actual source incipits without inventing official titles. |
| `AUD-20261101-11` | P1 · C | **Accepted 2026-11-04 — source, rendered credits and visual checks** | **Tosca Act III instrumental credits** — Verify bells/matins landmark and remove singers from instrumental-only credit lines where source confirms none. |
| `AUD-20261101-12` | P1 · C | **Accepted 2026-11-04 — existing source heading/incipit scope only** | **Turandot / Carmen generic headings** — Check Scena/Scène and section incipits; use source-supported navigation labels and correct translations only. |
| `AUD-20261101-13` | P1 · C | **Completed by user decision, 2026-11-05 (editorial acceptance with explicit exceptions)** | **Eugene Onegin English-first, seven tableaux** — Independent first-pass English from Russian implemented; 3+2+2 tableaux, 22 numbered sections and Russian/romanized headings. User explicitly considers issue completed. Exhaustive line-by-line linguistic collation and latest-SHA CI/browser/preview were **not independently passed**; keep those as separate cross-cutting release/quality obligations under 15, 16 and Phase D, not as claims about 13. |
| `AUD-20261101-14` | P1 · C | **Completed by explicit user decision, 2026-11-05 (with recorded verification exceptions)** | **Manon Act V edition harmonization** — User accepted the French-based replacement, independent English and restored five scenes within one tableau. Full Node/Chromium/preview and critical-text collation were not independently verified; retain those as cross-cutting Phase D / Issue 15–16 responsibilities, not a claim of passing evidence. |
| `AUD-20261101-15` | P1 · C | **In progress — Manon Acts I, III, IV targeted corrections, broader 35-opera review pending** | **Working English translations across catalogue** — Correct confirmed false friends and translated proper names, then independently collate original/English for each act, speaker, stage direction, stanza and incipit. Targeted correction is not complete literary approval. |
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

### 2026-11-04 — Phase C acceptance audit, issues 10–14: 3 scoped acceptances, 2 blocked

**Code and verification:** Work exclusively on `Update`; application/test checkpoint [`a892eb5824`](https://github.com/AsuraFY/my-favorite-operas/commit/a892eb5824b146e82241f3389dcdecb6b7967b73). [Verify Update run 41912092370](https://github.com/AsuraFY/my-favorite-operas/actions/runs/41912092370): **247/247 Node tests**, **882 browser assertions / 70 opera×viewport combinations**, successful verified preview publication. Visual evidence in workflow artifact `opera-browser-review`, artifact ID `13363380951`, including **Phase C first and last act, full outline screenshots on both desktop/mobile** for Zauberflöte, Tosca, Turandot, Carmen, Eugene Onegin and Manon, plus scrolled Manon synopsis notice images.

**Real visual defects discovered and fixed:**
- The original reader wrongly credited the **Shepherd** to Tosca Act III church-bells *Interludio*, even with `entry.characters=[]`. Fixed `outlineEntryCharacters` to respect a **deliberate empty** explicit credit list instead of falling back to the scene's singers (`29a7475`); updated Node render and Chromium checks and visually inspected the rerendered Act III sidebar: the Shepherd stays on `Io de' sospiri`, but **no singer** displays for the bells. This implements the existing instrumental-credit rule without changing the libretto.
- The Manon mixed-edition disclaimer had been appended to the **libretto bundle synopsis only**, while the user-visible opera Synopsis uses `src/data/operas/information.js`; the first targeted visual CI correctly failed and blocked its verified preview. Moved the notice into the **shared information synopsis** and removed the duplicate from the bundle (`444bef3`, `34f5541`). Subsequent desktop/mobile Chromium tests and scrolled screenshots confirm the **1895 Act V edition warning is readable**; no sung texts or edition passages were substituted.
- Extended `tests/browser-visual-smoke.mjs` for targeted Phase C page/outline screenshots, visible Manon notice, and zero bell-interlude credits. Updated older Node expectations for the extra Manon explanatory paragraph and **43 credited / 44 total Tosca listening landmarks**, maintaining all 44 links. Do not interpret intentionally zero credits as a missing landmark.

**Source and acceptance dispositions (explicitly narrow):**
- `AUD-20261101-10` — **ACCEPTED** for source-backed scenic and No. 10 heading nomenclature: 49 source Auftritte, 48 generic `Auftritt` sections, 21 numbered musical items. [Opera Guide](https://opera-guide.ch/operas/die%2Bzauberflote/libretto/de/) literally reads *Arie mir Chor* for No. 10; [Mozarteum's KV 620/10 catalogue](https://kv.mozarteum.at/de/work/aria-con-coro-o-isis-und-osiris-schenket-7182) identifies the piece as aria with chorus. Original source spelling is retained internally; reader displays editorial `Arie mit Chor`. [Mozarteum's bibliography](https://dme.mozarteum.at/DME/libretti-catalog/liste.php?l=2) documents the 1791 Schikaneder–Alberti first printing, **not** claimed to be the exact current transcription. No invented title or number. **Full English translation review belongs to 15, copyright to 16.**
- `AUD-20261101-11` — **ACCEPTED**: [Opera Guide Tosca Act III](https://opera-guide.ch/operas/tosca/libretto/it/) sings the Shepherd's *Io de' sospiri* before the unsung matins bells stage instruction; latest data, rendered outline and screenshots credit only the actual singer where appropriate. Act III music links remain intact. **Full catalogue participant acceptance remains under Phase D/universal issue.**
- `AUD-20261101-12` — **ACCEPTED for heading/incipit presentation**, not a claim of full translation collation: Turandot's **20 numbered Italian sections** have paired source-incpit/English navigation headings, with genuine generic `Scena` labels retained; Carmen's **51 music/dialogue divisions** preserve the paired French incipits where provided, without inventing official titles or extra numbers. Cross-checked with [Ricordi/Teatro Regio Turandot](https://www.teatroregio.torino.it/sites/default/files/uploads/inline-files/Turandot%20-%20Libretto.pdf) and [Opera Guide Carmen](https://opera-guide.ch/operas/carmen/libretto/fr/), plus desktop/mobile outline screenshots. Edition-specific Alfano ending and general literary review remain separate work under 15–16.
- `AUD-20261101-13` — **STRUCTURAL PORTION ACCEPTED, ISSUE OPEN/BLOCKED**: *Eugene Onegin* still has three acts, **3+2+2 seven tableaux**, **1,434 English source records**, and intentionally empty Russian text. This English-first exception remains user-authorized. However the exact translator/edition and redistribution rights of the *actual reproduced* Opera Guide/Sottovoce English text are unknown. A [Boosey & Hawkes listing for a Lloyd-Jones English version](https://www.boosey.com/pages/opera/moredetails?musicid=27403) is a separate published edition and **must not be misattributed to this site**. Do **not** mark full issue resolved until provenance/licensing evidence is obtained.
- `AUD-20261101-14` — **DISCLOSURE ACCEPTED, ISSUE OPEN/BLOCKED**: *Manon* reader has five acts; actual French [Opera Guide](https://opera-guide.ch/operas/manon/libretto/fr/) source ends at the Act IV arrest, while [BnF's historical authority](https://catalogue.bnf.fr/ark:/12148/cb13916039t) identifies the opera as **five acts and six tableaux**, with Le Havre Act V independently described in a [contemporary 1883 commentary](https://fr.wikisource.org/wiki/Page:La_libre_revue_litt%C3%A9raire_et_artistique%2C_1883.djvu/283). The website's Act V comes from the *separately recorded* 1895 Macy bilingual edition. Provenance transparency is now visibly implemented and screenshot-verified. **Actual 1895 scan/text collation and reuse permission have not been independently verified; user editorial choice to retain this documented mix versus source-harmonize remains outstanding.** No silent edition replacement.

**Remaining acceptance gate:** Issues 13 and 14 are **not** formally closed, despite successful functionality/visual checks. Issue 15 (full English literary fidelity) and issue 16 (specific text/translator/imagery rights and provenance) remain open across the catalogue. The detailed 35-opera matrix remains unapproved; these scoped resolutions do **not** imply 35 opera-level editorial sign-offs. **`main` was not touched or merged.** This audit-only log commit follows the tested application SHA; a subsequent CI run does not change the independently tested app code.

### 2026-11-02 — Phase C issues 10–14 focused consolidation and edition transparency

- Prior `Update` checkpoint `a6fb15c1`: [Verify Update run 41449190522](https://github.com/AsuraFY/my-favorite-operas/actions/runs/41449190522) and the associated Pages deployment completed successfully.
- **10 / Die Zauberflöte:** checked two acts, 49 original scenic divisions, 48 `Auftritt` subsections, 21 numbered musical sections and No. 10 `O Isis und Osiris`. Existing data preserves `Arie mir Chor` as transcription and uses `displayType: Arie mit Chor` for readable musical form; no speculative aria/recitative renaming. **Structural check complete; specific historic edition spelling remains open for source-level certification.**
- **11 / Tosca:** Act III `Io de' sospiri` retains the offstage shepherd, whereas `Le campane suonano mattutino` is a stage direction/interlude with empty sung credits. Existing implementation and tests cover this. **Automated behavior verified historically; human visual sign-off pending.**
- **12 / Turandot and Carmen:** all 20 Turandot numbered sections carry original and English titles, including generic Scena; all 51 Carmen sections retain expected music/dialogue structure, and every explicit French incipit has an English counterpart. No official musical numbers fabricated for generic scenes. This is metadata/incipit verification, **not full translation/edition acceptance**.
- **13 / Eugene Onegin:** three-act seven-tableau division (3/2/2), all 1,434 original English reading-source records retained, blank Russian column; no claim of reconstructed source alignment. Exact English published translator/edition and reuse permission remain unresolved and belong under issue 16.
- **14 / Manon:** Acts I–IV are a different source/independent machine-translated working edition from the historical 1895 Macy Act V bilingual variant. Added a visible concise statement of the mismatch on the opera's synopsis page, without substituting or rewriting any Act V dialogue (`6e125eb`). **Editorial harmonization decision remains open**: preserve the mixed-edition anthology transparently, or later acquire and collate a single compatible act. Do not silently harmonize.
- Added `tests/phase-c-issues-10-14.test.mjs` (`7d87d8a`) covering numbered scenes, instrumentals, incipits, tableau counts, and reader-visible Manon edition disclosure. **Current-head verification is not yet established**. `main` untouched.

### 2026-11-02 — Phase C Il trovatore 19 verse alignment exceptions reviewed

- The previous voice-attribution correction passed [Verify Update run 41444770702](https://github.com/AsuraFY/my-favorite-operas/actions/runs/41444770702) and matching Pages build at `b1240815`.
- Inspected **all 19** identified non-stage-direction Italian/English line-count mismatches across Parts I–IV (4/7/4/4). Revised the English wording and lineation by passage rather than applying automatic breaks. Targeted semantic fixes include Azucena's maternal rescue narrative, the Count's imagery of life's threads, and idiomatic descriptions of vows, weather, and battle. No source Italian or speaker assignments intentionally changed; counts remain Parts I–IV **95/145/108/157 turns** (505 total, including the earlier Count/Manrico split).
- Part commits: `4ef2922`, `64becc8`, `1f267b2`, `ef103f5`. Added `tests/il-trovatore-verse-alignment.test.mjs` (`6db4d95`) guarding turn counts and Italian-English line counts. All 19 previously flagged mismatches have been addressed in code.
- **Status:** targeted alignment correction, **not** completed published-edition collation or literary translation approval. New current-head Node/Chromium and verified Update preview required; `main` untouched.

### 2026-11-02 — Phase C Il trovatore speaker attribution review

- Confirmed [Carmen Acts II–IV Verify Update run 41442823583](https://github.com/AsuraFY/my-favorite-operas/actions/runs/41442823583) succeeded on application SHA `dc23f8d4`; Pages build run 41442822617 also succeeded.
- Inspected **Il trovatore** Parts I–IV (504 turns) and detected **19 turns** with differing Italian and English line counts across four parts. These are flagged for deliberate verse-alignment review, **not** mechanically relineated, since literal alignment can alter dramatic poetry.
- Identified a concrete mistaken speaker boundary in **Part II, Scene IV**: a single `CONTE` turn contained the Count's `Dunque gli estinti…Fuggi da lei, da me` and Manrico's `Né m'ebbe il ciel…Quel Dio soccorse a me`. Split it into two consecutive speaker turns without changing the sung Italian or English content, added Manrico to the section's participants, and retained placement. Code commit `b6166fe`; regression `tests/il-trovatore-speakers.test.mjs` (`b0b3771`).
- Additional joint cue/participant label review and 19 verse-alignment exceptions remain for Phase C/D. The new source edits require a fresh Node/Chromium/preview run; past green builds do not verify them. `main` unchanged.

### 2026-11-02 — Phase C Carmen Acts II–IV targeted editorial pass

- Confirmed previous Carmen Act I checkpoint [Verify Update run 41441055085](https://github.com/AsuraFY/my-favorite-operas/actions/runs/41441055085) and the matching Pages build **succeeded** at SHA `b250a792`.
- Inspected all **14 / 12 / 5 sections and 387 / 244 / 101 turns** for Acts II / III / IV respectively (732 turns total). No empty English passages found.
- Repaired Act II's French `Tu ne m'a pas compris` to `Tu ne m'as pas compris` and the corrupted singer cue `FRASQUJTA` to `FRASQUITA` (without changing its translated singer list); refined `J'avais beau faire` from `I tried hard enough` to `I tried in vain`; changed the awkward recurrent English toreador refrain `take your guard` to `be on guard` (4 instances). Commit `e6b15e5`.
- Repaired Act III Micaëla's French `Au fond du cour` to `Au fond du coeur` (`11edea6`) and Act IV's twice-corrupted `hardis chubs` to `hardis chulos` (`0beb01d`), consistent with existing English rendering.
- Added regression test `tests/carmen-acts2-4-editorial.test.mjs` (`e283315`) guarding scene/section/turn counts and exact repaired terms. **This is a targeted consistency and semantic review, not full French-edition collation or complete literary approval.** These changes need a new successful current-head Node/browser/preview gate. `main` untouched.

### 2026-11-02 — Phase C Carmen Act I bilingual spot-review

- Verified the latest Eugene Onegin correction checkpoint: [Verify Update run 41439336823](https://github.com/AsuraFY/my-favorite-operas/actions/runs/41439336823) **success** on `e66b97fea2`; the corresponding Pages deployment run 41439336458 succeeded. This verifies that preceding editing checkpoint, **not** subsequent Carmen changes.
- Inspected *Carmen* Act I's 20 sections / **331 turns** across spoken dialogue, sung sections and stage directions. French-to-English line checks identified one semantic mistake: `T'émouchant à tour de bras` refers to chasing flies away, not `Waving fans`; corrected to `Shooing flies away from you with all their might.` Also repaired three obvious French textual spacing/transcription defects (`dans 'e régiment`, `pourrésister`, `DonJosé`) without altering speaker identities, acts or navigation. Act commit `43cc943`.
- Added focused `tests/carmen-act1-editorial.test.mjs` (`9015f7f`) checking original/English correction and 331-turn structural invariant. This is a **targeted editorial review, not full independently accepted Act I or all-four-act translation sign-off**.
- The new changes require current-head CI/Chromium/Update preview verification; do not copy previous test pass to this checkpoint. `main` untouched.

### 2026-11-05 — Issue 15 Manon Act II focused English fidelity pass

- **Act II reviewed and corrected** on `Update`: 10 sections, 226 source turns. Corrected negation (`ne l'irrite`: des Grieux fears the letter **may anger** his father); repeated `porter la lettre` (**deliver** rather than wear a letter); Brétigny's threat to **abduct des Grieux** (`l'enlever`) rather than remove an object; pronouns (des Grieux adores **her**, Manon); stage cues (`bas` = quietly, not down); Lescaut's threatening dialogue; and Manon's farewell to their little table.
- Corrections preserved every original French record and singer/speaker cue; per-turn French/English line-break count checked at all 226 turns, including the nine-line `Retenez-moi` refrain. Act II source divisions and act/tableau counts unchanged. Specific automated assertions appended to `tests/manon-english-editorial.test.mjs`; reader cache token refreshed.
- **Scope and status:** A targeted Act II English pass, not an independently signed-off critical translation. Other Manon acts and the remaining 34 operas still need comprehensive Issue 15 editorial coverage. Full Node/browser suite and SHA-matched preview remain unverified. `main` untouched.

### 2026-11-05 — User closed Issue 14; Issue 15 first targeted corrections

- **Explicit user disposition:** “Complete, next.” Accordingly **AUD-20261101-14 is completed by user decision** for the implemented historical-French Act V replacement. This is an editorial acceptance instruction, **not** evidence that the unrun latest-commit Node, Chromium, preview and independent French critical-text checks passed. Those remain part of the shared Phase D / cross-opera gates, and the licensing inventory remains under 16.
- **Issue 15 started (not completed).** Examined the live first four French/English Manon act modules. Found real machine-translated proper-name errors: Poussette rendered as “Stroller” (or misspelled “Pussette”), and Lescaut misspelled “Lessaut.” Corrected English passages in Acts I, III and IV **without modifying French wording, speaker identities, number of turns or act/tableau structure**.
- **Act I** corrected opening guest wording and several directly supported French semantic false friends. **Act III** corrected vendors' `mules` (flowered slippers), `mouches` (beauty patches), marketplace objects, and Poussette name. **Act IV** corrected Guillot's poetic reference `vers` from “worms” to “verse,” and `Je gaze` to “I veil my meaning,” retaining 24 parallel source/English lines.
- **Verification performed:** checked unchanged original French/speaker sequence and source turn counts before commits; corrected focused passage verse counts remain aligned. Added `tests/manon-english-editorial.test.mjs` regression tests. Refreshed the Manon import version. **Full Node and browser suites have not been run/confirmed for the new SHA**; extensive English review across Manon and the other 34 operas remains.
- **Issue 15 recommendation:** Continue remaining Manon Acts I–IV act-by-act, then prioritize English editions with unidentified translator provenance and unreviewed machine drafts. Avoid declaring any opera fully collated based only on passing structural tests. `main` unchanged.

### 2026-11-05 — Issue 14 Manon historical Act V replacement on Update

- **Implementation decision:** On user's “Ok update the libretto,” replaced *Manon*'s former 1895 J. C. Macy English Act V wording on `Update` with a new independent English reading translation prepared directly from the historical French libretto. The first four acts remain under their existing Opera Guide/Sottovoce French transcription and machine-assisted English. **Five acts, six tableaux preserved.**
- **Act V structure:** Revised its sole tableau to contain **five historical dramatic scenes**, not the four earlier editorial divisions. Reinstated the marching guards and their sergeant, Lescaut's actual coin-bribery dialogue and directions, and the expanded Manon/Des Grieux farewell. Corrected French transcription artifacts including `Sequel ?` → `Lequel ?` and the Act V opening setting. French comparison: [Operone historical Act V](https://operone.de/libretto/manon-2/), with [1884 original libretto bibliography](https://www.themorgan.org/music-manuscripts-and-printed-music/111334). This is a historical-source-based compilation, **not** a complete 1884 critical-edition reconstruction.
- **Changes:** `src/data/operas/librettos/manon/act-5.js`, bundle/loader version and eyebrow, opera information synopsis edition notice, and `docs/info/operas-origins.md` updated. Added `tests/manon-act5-historical.test.mjs` for source/translation presence, five scenes, participant attribution and bribe sequence.
- **Focused validation:** Loaded all five act modules in a read-only JavaScript evaluation. Confirmed per-act tableau counts **1 / 1 / 2 / 1 / 1** (six total), Act V **five scenes and 115 translated turns**, no blank French or English turns, basic source markers, and the three successive coin handovers. Focused check: **PASS**. No claim that source passages, poetic repetition or French edition variants are exhaustively editorially collated.
- **Unverified acceptance gates:** Full Node tests, all-35 browser/desktop/mobile/night visual gate, latest-commit Update preview, and independent line-by-line historic French/source verification were **not confirmed** by the available checks. Keep Issue 14 *implemented/needs acceptance* rather than falsely Accepted. Reproduction-source rights and translation governance remain tracked in Issue 16. Do not merge into `main` without separate user permission.

### 2026-11-05 — User disposition: Issue 13 completed; start Issue 14

- **Direct user decision:** “Consider it completed, next issues.” Therefore `AUD-20261101-13` is **CLOSED/ACCEPTED BY USER** for the scoped Eugene Onegin implementation on `Update`. This overrides earlier notes demanding Issue 13 remain open. It **does not retroactively prove** a full line-by-line Russian–English translation collation, latest-commit Node/Chromium suite, preview deployment, or release; those checks remain visible in `AUD-20261101-15`, `AUD-20261101-16`, Phase D and the release gate. Legacy 2026-11-04 statements are historical.
- **Next item — `AUD-20261101-14` Manon:** Historical sources confirm original **five acts and six tableaux**: [BnF work authority](https://catalogue.bnf.fr/ark:/12148/cb13916039t), [Morgan Library's 1884 first-edition libretto entry](https://www.themorgan.org/music-manuscripts-and-printed-music/111334), and [Paris Opera's Act V synopsis](https://www.operadeparis.fr/saison-21-22/opera/manon). [IMSLP](https://imslp.org/wiki/Manon_(Massenet,_Jules)) lists a five-act 1884 French score and the separately published **1895 J. C. Macy** bilingual English/French libretto (English translator James Cartwright Macy, 1845–1918).
- **Provisional recommended choice:** Keep five acts and six tableaux. Prefer collation of current Act V against the **1884 five-act French libretto/score** and prepare a fresh English translation from that historical French if its wording differs, rather than labeling the 1895 passage a seamless continuation of Acts I–IV. Current live mixed-source text remains unchanged pending a source-level editorial substitution decision. Existing public synopsis notice correctly discloses the mixed provenance.
- **Risk/validation notes:** `act-5.js` still carries an obsolete “not registered in complete loader” source comment despite the bundle importing it; this is a documentation defect if future edits are authorized. Do not assume historical source/translator public-domain status in every jurisdiction without reviewing applicable rules. No edits to Manon text were made during this research checkpoint. `main` unchanged.

### 2026-11-05 — Issue 13 latest focused verification (not release acceptance)

- Read back all three `Update` act modules after No. 12 correction and evaluated their JavaScript data without external imports. Verified three acts, **seven tableaux (3+2+2)**, **22 source-supported numbered sections (Nos. 1–22)**, **382 English turns**, and translation-line counts **668 / 436 / 270** across acts.
- Checked consecutive source indexes and count equality for every turn and section, nonempty English translations, deliberately empty Russian columns, all 22 `Cyrillic (romanized)` section headings with English subtitles, the restored No. 12 boundary, and instrumental-only No. 19 Polonaise. Focused structural evaluation found **zero data failures**.
- **Not checked / not claimable:** No comprehensive published-score-to-translation verse-level collation; no complete Node suite execution; no all-35 Chromium assertions; no independent visual or accessibility review of the current Update commit; no SHA-matched GitHub preview deployment confirmed. GitHub's available commit-run lookup did not provide a current full verification record.
- Accordingly `AUD-20261101-13` remains **implemented and structurally checked, but NOT fully accepted**. Do not use prior tests from earlier application SHA as proof of this version. `main` remains untouched.

### 2026-11-05 — Issue 13 musical-number correction and acceptance checkpoint

- **Correction to prior research:** No. 12 is a real score number, not a discretionary gap. The Russian Wikisource/FEB page omits the numeral at the transition after the maidens' chorus, while [Tchaikovsky Research](https://en.tchaikovsky-research.net/pages/Yevgeny_Onegin) and [IMSLP](https://imslp.org/wiki/Eugene_Onegin,_Op.24_(Tchaikovsky,_Pyotr)) list **No. 12 — Scene and Onegin's Aria**. Act I's third tableau now separates No. 11 (chorus) from No. 12 (Tatyana's distress and Onegin's reply), without changing the words or the seven-tableau structure.
- Corrected its Russian+romanized title `№ 12 — Сцена и ария Онегина (Stsena i ariya Onegina)`, English subtitle, source line offsets, dedicated tests, and historical-source register. **Prior statements that No. 12 was missing and must not be invented are superseded and incorrect.**
- **Acceptance remains OPEN**: the independent English is a first-pass translation. Structural JS evaluation and focused checks do not prove exhaustive Russian literary collation, human browser acceptance, or a fully passing latest-head GitHub Actions gate. Do not change to Accepted without those results. `main` remains untouched.

### 2026-11-05 — Issue 13 Russian + romanized heading format

- On user request, the **22 section titles** of *Eugene Onegin* now use `Russian title (romanized Russian title)` in the source-title line; the separate English heading remains in `translatedTitle`. The missing No. 12 has since been restored using the published score; the formerly editorial closing label is now the source-supported No. 12, Scene and Onegin's Aria.
- Changed Act I–III source-title data, bumped reader/registry import version and added a targeted title-format regression test. Seven-scene architecture, libretto verse text, line offsets, and source-language-empty reading convention were intentionally preserved.
- **Editorial distinction:** Russian-form labels are source-informed navigation forms, including editorial wording where the source has no discrete formal movement title; they are not a claim of verbatim score plate headings. Full literary verification and current-head CI/browser/preview sign-off remain outstanding. `main` untouched.

### 2026-11-05 — Issue 13 independent translation implemented on Update (acceptance pending)

- **User decision:** Replace the existing Opera Guide/Sottovoce *Eugene Onegin* English translation with independently prepared English reading text from the historical Russian, using the same project approach as other original-English drafts. Working branch: `Update`; `main` must remain untouched.
- **New English text committed:** [Act I](../../src/data/operas/librettos/eugene-onegin/act-1.js) (three tableaux; score Nos. 1–12, including Onegin's aria), [Act II](../../src/data/operas/librettos/eugene-onegin/act-2.js) (two tableaux; Nos. 13–18), [Act III](../../src/data/operas/librettos/eugene-onegin/act-3.js) (two tableaux; Nos. 19–22). Reader bundle/loader/registry updated. Source: [Wikisource/FEB historical Russian](https://ru.wikisource.org/wiki/Евгений_Онегин_(опера)), with act-by-act links and author credits in [origins register](../info/operas-origins.md).
- **Editorial status:** **New translation is first-pass only**, not yet independently collated line by line against Russian or professionally signed off. Translating historical French/Russian comic diction and simultaneous ensemble voices has unavoidable interpretation choices; a numbering omission in the Russian online transcription has been corrected against the published-score catalogues (No. 12 is present). New line-offset metadata counts **new translation lines**, replacing the retired 1,434 Opera Guide record count.
- **Tests:** Replaced obsolete Onegin assertions with structural/coverage/source-division checks in `tests/eugene-onegin.test.mjs`. **Automated full Node/browser CI, preview job, and manual website review remain to be verified against the final source commit**. If CI fails, do not mark repair accepted; address errors on `Update`.
- **Read-only module evaluation:** validated all three reader act modules for syntax/runtime import-independent evaluation and checked seven scenes, 22 sections, 382 turns, continuous translation-line indices and 668/436/270 act-specific line counts. These focused checks passed, but they **do not replace the Node test suite or Chromium/browser validation**.
- **No legal claim:** Independent writing removes the prior published-English transcription dependency from current source text, but the replacement still requires independent checks for originality and integrity; future reuse/licensing decisions remain separate.
- **Formal acceptance criteria:** confirm seven scenes, complete 3-act reading text, no omitted speaker or stage line, both outlines/anchors, mobile/desktop/night rendering and readable line breaks, final SHA-matched successful Node+browser+preview, and source/editorial review. **Issue 13 remains open** until these are evidenced.

### 2026-11-05 — Issue 13 staging history (superseded by reader replacement above)

- An initial Act III draft was staged in `draft-independent-act-3.js` in commit `8acea04`; it was subsequently integrated into `act-3.js` and the temporary module **deleted** after implementation. The live current translation source is the three `act-N.js` modules referenced above, not the staging path.
- First-pass draft material for Acts I and II is retained in `docs/reviews/drafts/` as editorial comparison notes, **not** parallel active libretto sources.
- The old 1,434 English records refer exclusively to the prior Opera Guide/Sottovoce transcription; current translation source indexes use new English lines, without claiming Russian line alignment.

### 2026-11-02 — Phase C targeted English transcription proofreading: Eugene Onegin

- Proofread all three English-first act files for concrete transcription artifacts (malformed hyphens, misspellings and punctuation) and corrected **30 occurrences** across 22 exact replacement patterns without inventing a Russian text or substituting an alternate published translation. Examples: `principels → principles`, `qa portable stove → a portable stove`, `world?weariness → world-weariness`, `twenty?six → twenty-six`, `greetinngs → greetings`. Corrections are mechanical to the existing English reading edition, **not a full literary or semantic translation approval**. Act commits: `4cfd506`, `120b796`, `d32b4f7`.
- Preserved all **1,434 source records** (704 + 438 + 292), 7 tableaux, source indexes, turn count, speaker cues and blank Russian original column. Updated affected English section incipits consistently. Added token regression checks in `tests/eugene-onegin.test.mjs` (`99ec62c`).
- Existing successful 236 Node / 876 browser automated gate is for previous application SHA `b7d0130c`; **the editorial change commits require a new current-head test and preview**. No claim of full human translation verification or authoritative English edition rights. `main` untouched.

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
