# My Favorite Operas — Active Review & Repair Tracker

> **SINGLE ACTIVE REVIEW FILE.** This document is the operational source of truth for audit findings, repair sequencing, statuses, evidence, and handover. Do not create another active review, separate master roadmap, or competing issue-status file. Historical reports are in [../archive/reviews/](../archive/reviews/).

**Last synchronized:** 2026-11-02 (UTC / Africa-Dakar)  
**Repository:** [AsuraFY/my-favorite-operas](https://github.com/AsuraFY/my-favorite-operas) · **Working branch:** `Update` · **Production branch:** `main` (never modify or merge without separate explicit approval)  
**Scope:** All 35 current operas **and every future opera**, shared reader, outlines, information pages, CI and release.  
**Current focus:** Phase B source and participant-attribution corrections; Phase A automated gate was verified on an **older** Update checkpoint, but current repairs still need CI/preview confirmation.

## 1. START HERE — current checkpoint and next action

**Latest working state when this tracker was consolidated:** `Update` commit [`05388687`](https://github.com/AsuraFY/my-favorite-operas/commit/053886872b9137270a9f0730ae36e84159220cfa) (doc-only audit notes after prior source edits). **No current-head Node/browser or preview result was confirmed in this consolidation.** `main` was not touched.

**What was verified previously:** 2026-11-01 [Verify Update run 41363468298](https://github.com/AsuraFY/my-favorite-operas/actions/runs/41363468298) passed **224/224 Node tests** and **876 Chromium assertions** across **70 viewport/operas combinations** (35 desktop + 35 mobile); the dependent Update preview job succeeded. This proves only that historical tested commit, not later Phase B commits. The earlier [41353260510](https://github.com/AsuraFY/my-favorite-operas/actions/runs/41353260510) gate also passed 224 Node/876 browser assertions.

**Most recent repairs committed, not yet independently accepted:**
- *Die Walküre* Acts II & III source scenic preambles restored, 1,806 original German source records; new integrity test. November 2 participant attribution/English speaker work covers Acts I–III.
- *Manon* Acts I–IV English speaker labels and all Acts I–V participant arrays revised; temporary cues removed from outline credits, **not from sung passage labels**.
- Regression coverage added in `tests/die-walkure-source-integrity.test.mjs` and `tests/opera-participant-names.test.mjs`; **the latest passing CI for those edits is not established**.
- Google Drive guideline §1.4 was updated and read back on November 2, with the approved **universal participant-list rule**.

**Immediate next action:** Check the **current `Update` commit** in [GitHub Actions — Verify Update](https://github.com/AsuraFY/my-favorite-operas/actions/workflows/verify-update.yml). If tests fail, repair the failures without weakening valid assertions; if passed, verify the intended preview commit and browse affected opera acts (particularly *Die Walküre* Act III and *Manon* Act I). Record run URL, tested SHA, screenshots and manual review separately. Then continue remaining Phase B issues `05`, `08`, `09`.

**Important:** A committed fix is **Needs verification**, not `Resolved`. A publicly reachable GitHub Pages link may reflect a different release than `Update`. Always give the user direct opera/act page links after opera edits and disclose whether those exact commits are visibly deployed.

## 2. Document roles and priority (avoid conflicting instructions)

| Role | Canonical document | How to use it |
|---|---|---|
| **Approved design/editorial rules** | [Opera_Website_Guidelines — Google Drive](https://docs.google.com/document/d/1S2FscuJRpW9QACYLr9YNUFRhDiGr0X93q0IIxgcHjc4/edit) | **Only** active opera guidelines. Latest user decisions prevail; **any further guideline edit requires explicit approval**. §1.4 governs all present/future opera participants. |
| **Active tracker and repair roadmap** | **This file —** `docs/reviews/global-audit.md` | One master issue register, phase board, per-opera checklist, evidence and next-chat handover. Update here on every repair. |
| **Development / release procedures** | [development-workflow.md](../development-workflow.md) | Working branch, review, tests and release mechanics. Some old implementation examples are stale; verify against the latest actual repository and resolve in a separate workflow update. |
| **Dated review snapshot** | [November 1 Drive Audit & Repair Roadmap](https://drive.google.com/file/d/1HrV7yw8iyx1Y3EEC5UyiRNbW6oIBhAY0/view) | Historical source for the 22 `AUD-20261101-xx` findings and original phase sequencing. **Do not maintain as a competing live tracker.** |
| **Historical research/specifications** | [Archived repo reviews](../archive/reviews/), [archived Parsifal plan](../archive/plans/parsifal-reader-outline-and-source-plan.md), [V1 product specification](https://docs.google.com/document/d/1f6nHTppsfuElAV87YS4LReIBMRg2BJb7KFwFlglMb_g/edit) | Provenance and past decisions only. Earlier plans and the V1 specification are superseded wherever the active guideline or current user decisions differ. |

**Rule of precedence:** Explicit latest user decision → active Google Drive guideline → current source/CI evidence → this issue tracker and current implementation workflow → archived historical evidence. The archive does not establish current code status.

## 3. Phase board — one plan for remaining operations

| Phase | Tracked issues | Current position | Next deliverable |
|---|---|---|---|
| **A — Reliable test gate** | AUD-20261101-01–03 | Verified historical checkpoint on 2026-11-01; latest head **unverified** | Re-run Node/browser checks and confirm preview for the latest `Update` head |
| **B — Definite source/presentation repairs** | AUD-20261101-04–09; AUD-20261102-01 | **In progress** | Verify *Die Walküre* and *Manon* participant/source fixes; reconcile *Manon* edition and stage directions; fix *La fanciulla* headings |
| **C — Editorial fidelity and nomenclature** | AUD-20261101-10–16 | Queued / needs review | Source, scene/section, speaker, English wording and provenance comparisons; no invented or copyrighted text |
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
| `AUD-20261101-05` | P0 · B/C | Open | **Manon original edition and Prélude** — Reconcile duplicated/stray Act I Prélude, original scene boundaries and source edition; Act V edition variant remains a separate decision. Do not silently move or rewrite. |
| `AUD-20261101-06` | P1 · B | Needs verification | **Manon English generic/group speaker cues** — Acts I–V participant/role edits committed Nov 2; verify all descriptive English labels on the English side, no false group splitting and no changes to sung text. |
| `AUD-20261101-07` | P1 · B | Needs verification | **Die Walküre German group and voice labels** — Acts I–III participant/English cue edits committed Nov 2; verify true participants, German voice attribution, collective cues and full source alignment. |
| `AUD-20261101-08` | P1 · B | Open | **Manon/Die Walküre direction semantics** — Classify short action cues vs substantive directions by dramatic function, preserving square brackets, source text and sung asides; test representative scenes. |
| `AUD-20261101-09` | P1 · B | Open | **La fanciulla del West missing English titles** — Source-check Act I Introduzione / Hello, Nick! / Hello, Minnie! and explicitly populate correct outline translations; verify both outlines. |
| `AUD-20261101-10` | P1 · C | Needs review | **Die Zauberflöte generic Auftritt and Arie mir Chor** — Verify 48 generic Auftritt headings, form anomaly and actual source incipits without inventing official titles. |
| `AUD-20261101-11` | P1 · C | Needs review | **Tosca Act III instrumental credits** — Verify bells/matins landmark and remove singers from instrumental-only credit lines where source confirms none. |
| `AUD-20261101-12` | P1 · C | Needs review | **Turandot / Carmen generic headings** — Check Scena/Scène and section incipits; use source-supported navigation labels and correct translations only. |
| `AUD-20261101-13` | P1 · C | Needs review | **Eugene Onegin English-first, seven tableaux** — Respect approved English-first reader, document text edition/rights and authentic seven-tableau boundaries; never fabricate Russian alignment. |
| `AUD-20261101-14` | P1 · C | Needs review | **Manon Act V mixed-edition variant** — Document J. C. Macy Act V contextual differences versus Acts I–IV; obtain editorial decision before substitutions. |
| `AUD-20261101-15` | P1 · C | Needs review | **Working English translations across catalogue** — Per act, collate original, speakers, directions, stanza alignment, incipits and English semantics. Working draft ≠ literary approval. |
| `AUD-20261101-16` | P1 · C | Needs review | **Rights, licensing, translator/source provenance** — Inventory exact editions, translator, license and URL/access information for originals, translations and imagery; remediate unsuitable sources. |
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

The 26 older stable IDs below remain searchable and unresolved unless independently verified. Where a 2026-11-01 issue overlaps, preserve the older ID as an **alias** pointing to the newer issue; do not count the same defect twice. Expanded historical descriptions and past test results are preserved verbatim in [the archived tracker snapshot](../archive/reviews/global-audit-snapshot-2026-11-02.md).

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

### 2026-11-02 — Unified reviews into this single operational file

- Made `docs/reviews/global-audit.md` the **only active review/repair tracker** on `Update`.
- Imported 22 November 1 issues and phases A–E from the Google Drive snapshot without renumbering IDs; included all 35 per-opera review slots and the approved Nov 2 participant rule as `AUD-20261102-01`.
- Preserved original audit content in [global-audit-snapshot-2026-11-02.md](../archive/reviews/global-audit-snapshot-2026-11-02.md). Moved the other review reports into [../archive/reviews/](../archive/reviews/) and the superseded Parsifal plan to [../archive/plans/](../archive/plans/); historical contents retained. No opera source edits in this organization commit.
- The dated Google Drive roadmap and V1 product specification are retained for reference; **they are not independently updated or active**.

### 2026-11-02 — Phase B source and participant work (on `Update`, test acceptance pending)

- *Die Walküre* preambles: `cb9fe825` (Act II), `f80c5a88` (Act III), regression `ca5d3f6f`; subsequent participant edits `4ef6a508`, `3094306a`, `b8b859df`.
- *Manon* translated speaker labels: `ac2e879d`, `2a5c5e66`, `76f0c397`, `322c1cb4`. Updated participant arrays (Acts I–V): `de29e640`, `24ea6f76`, `4e593fba`, `6be3b444`, `75f032e3`.
- Cross-opera regression `922ce500`; prior audit log commit `05388687`. **Not yet verified on the new head.**
- Permanent rules agreed and updated in Google Drive [§1.4](https://docs.google.com/document/d/1S2FscuJRpW9QACYLr9YNUFRhDiGr0X93q0IIxgcHjc4/edit): ensemble cues in libretto versus genuine unique character names in lists.

### 2026-11-01 — Reliable automated checkpoint (historical)

- Repo organization and 35 integrated lazy-loaded opera readers documented in the [archived organization report](../archive/reviews/repository-organization-2026-11-01.md).
- [Run 41363468298](https://github.com/AsuraFY/my-favorite-operas/actions/runs/41363468298): **224/224 Node, 876 Chromium assertions / 70 combinations**; dependent verified `Update` preview passed.
- Historical `main` merge was `0c49782`; **subsequent `Update` edits have not been authorized for merge**.

## 9. New-chat handover protocol

At the beginning of any new chat, read in order:
1. **This tracker**: checkpoint, phase board, stable issues, today's execution log, next unverified work.
2. [Active Google Drive guidelines](https://docs.google.com/document/d/1S2FscuJRpW9QACYLr9YNUFRhDiGr0X93q0IIxgcHjc4/edit), especially §1.4 for singer lists and act/full outlines.
3. [Development workflow](../development-workflow.md) for branch/test mechanics; double-check any historical examples against current repo files.
4. Current GitHub `Update` head, most recent relevant CI/preview and target opera modules; source materials as needed.
5. Only if necessary, historical [archive](../archive/reviews/) and [November 1 baseline](https://drive.google.com/file/d/1HrV7yw8iyx1Y3EEC5UyiRNbW6oIBhAY0/view).

**After each task:** Update issue status and verification evidence **here**, do not create another review file. Give the user a short explanation plus the modified opera's direct act page URL for visual review; distinguish `Update` preview from public `main`. Keep `main` unchanged without explicit approval. If guidelines need changing, present the exact revision and obtain approval before editing the Google Doc.

**Next remaining operations at this checkpoint:** (1) verify latest `Update` CI/preview and Manon/Walküre visuals; (2) resolve Manon Act I Prélude/edition evidence; (3) audit stage-direction semantic cues in Manon and Die Walküre; (4) fill source-backed La fanciulla del West Act I English headings; (5) progress through all-35 source and participant matrix before editorial and release sign-off.
