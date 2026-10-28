# Global audit

> **The sole active audit register.** Record global website issues and per-opera issues here, with stable IDs, current statuses, evidence, and dated updates. All former standalone review documents are retained verbatim in [archive.md](archive.md); do not create more audit files.

**Last updated:** 2026-10-28 (UTC)
**Repository:** https://github.com/AsuraFY/my-favorite-operas  
**Branch:** `Update` — do not modify `main` without explicit authorization.  
**Current work priority:** Complete opera librettos; postpone heading corrections and the full browser audit until then.  
**Audit scope:** Website-wide and opera-specific issues; each audit entry should clearly identify whether it concerns shared code or a particular opera.

## How this file is maintained

1. **For every audit/update:** Add a new entry in **Dated update log** (and preserve any relevant detailed evidence in the historical archive) with the exact date/time and time zone, scope, findings, evidence, and what changed (if anything).
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

## Global website issues and verification

| ID | Current status | Finding / follow-up |
|---|---|---|
| GLOBAL-01 | **Deferred** | Independent human desktop/mobile/night-mode visual inspection of all sixteen opera readers and outlines is not complete. The older automated Chromium checks covered eleven operas on a 2026-10-23 build, not the entire present branch. |
| GLOBAL-02 | **Needs verification** | Follow every outline and deep link in a real browser, including back/forward, reload, sticky-header offsets and mobile navigation. Existing automated route tests are useful but do not certify actual interaction on every device. |
| GLOBAL-03 | **Needs review** | Independent primary-source and English editorial validation is not complete across the whole catalogue; structural pair counts and passing tests cannot establish musical/literary accuracy. |
| GLOBAL-04 | **Needs verification** | Previously recorded site-wide CSS asset/dependency, catalogue and Pages deployment checks apply to the then-tested commits. Rerun on the final libretto build before release. |
| GLOBAL-05 | **Needs review** | 2026-10-26 Die Zauberflöte Act I CI failure log remains available as source evidence; whether that earlier failure still reproduces is unverified. Do not label it a live failure without rerunning CI. |

## Opera-specific issues and follow-up

| Opera | ID | Current status | Observation / next step |
|---|---|---|---|
| Il trovatore | TRO-V01 | **In progress** | All four parts entered as Italian/English AI working translations from user-supplied Opera Guide MHT, five source scenes. All four parts available; detailed source-fidelity, editorial and browser review pending. Source-fidelity, verse pairing and independent browser visual QA need review. |
| Rigoletto | RIG-V01 | **In progress** | Acts II and III now published as independent AI working drafts; require Italian source fidelity and complete English editorial review; independent browser checks pending. Opera Guide explicitly labels Act II numbers 8–10 and Act III numbers 11–14 without separate scene headings; complete Italian transcription, independent English alignment, stage directions, source collation and reader/browser checks remain pending. |
| Die Zauberflöte | AUD-01 | **Deferred** | 15 unsupported English headings, 48 generic Auftritt/Entrance headings and source spelling of Arie mir Chor need review. |
| Die Zauberflöte | ZAUB-E01 | **Needs review** | English in Acts I–II remains substantially unreviewed machine-assisted draft; German source, speaker/stage classification and musical boundaries (including Nos. 8 and 21) require detailed editorial and score comparison. |
| La fanciulla del West | AUD-02 | **Deferred** | Act I Introduzione has no supported English heading; verify Hello, Nick! and Hello, Minnie! title fallback handling. |
| Tosca | AUD-03 | **Deferred** | The Act III bells/matins instrumental landmark may show misleading character credits; verify and omit unsupported credits. |
| Turandot | AUD-04 | **Needs review** | Revisit generic Scena/form navigation titles with the latest named-incipit editorial rule; do not overwrite the approved 2026-10-19 correction with older form-only rules. |
| Carmen | AUD-05 | **Needs review** | Assess generic Scène headings after libretto completion; earlier Act I and II–IV source/text corrections have automated verification in the historical record. |
| Le nozze di Figaro | FIG-V01 | **Needs verification** | 81 section links and the outline scroll/route-ID corrections have tests; independent browser verification remains pending. |
| La Bohème | BOH-V01 | **Needs verification** | Human visual verification of its 26 outline landmarks and four tableaux remains pending. |
| Macbeth | MAC-V01 | **Needs verification** | Confirm final reader/outline behavior, act-only music symbols, 1847 alternative position and bilingual typography; later 2026-10-17 user instructions supersede earlier review rules. |
| Madama Butterfly | BUT-V01 | **Needs verification** | Structural audit covered 34 sections, but fresh independent source and browser visual checking remain pending. |
| Samson et Dalila | SAM-V01 | **Needs review** | Independent editorial/listening review of completed three-act translations and desktop/mobile visuals still pending. |
| Otello | OTE-V01 | **Needs review** | English remains an unreviewed draft; source outline matches do not establish literary accuracy. |
| Parsifal | PAR-V01 | **Needs review** | German transcription and English draft need source/editorial reconciliation. |
| Don Giovanni | DON-V01 | **Needs review** | Source and English draft not finally reviewed; selective 47-entry outline is intentional and is not necessarily a defect. |
| Così fan tutte | COS-V01 | **Needs verification** | Prior generated-reader section checks are not full browser visual certification. |
| Il barbiere di Siviglia | BAR-V01 | **Needs verification** | Prior generated-reader checks are not full browser visual certification. |
| Tristan und Isolde | TRI-V01 | **Needs verification** | Prior generated-reader checks are not full browser visual certification. |

**Evidence discipline:** Status reflects the latest documented review, not a new live-browser validation. Preserve verified historical corrections as such; no previously resolved issue has been reopened solely because reports were consolidated.

## Dated update log

### 2026-10-28 (UTC) — Il trovatore Act II and IV file-integrity repair

The first published Act II and IV blobs were truncated during file transfer even though the preparation files passed syntax checks locally. GitHub Actions `Verify Update` run 40769889492 revealed an additional module syntax failure beyond the existing 16 baseline test failures. Both full source-faithful bilingual preparation files have now been reassembled using contiguous line windows, validated as parseable JSON payloads with the expected five and four scenes respectively, and replaced on `Update`. Fresh CI must verify that the introduced syntax regression is eliminated. Detailed editorial checking remains pending.


### 2026-10-28 (UTC) — Il trovatore Act IV bilingual working draft

**Branch:** `Update`. Part IV (*Il supplizio*) now preserves all four original source scenes, including the source's final heading `SCENA ULTIMA`, 157 aligned Italian/English speaker and direction turns, Leonora's prayer and poison, the prison duet, Azucena's memories, and the final revelation. Italian text was extracted from the user-supplied Opera Guide MHT without omitting source turns. English is an independently drafted AI-generated working translation awaiting editorial review. Stage directions preserved and translated. No invented musical division numbering. All four parts now populated. Detailed source-fidelity, verse alignment, and browser QA remain to be reviewed.


### 2026-10-28 (UTC) — Il trovatore Act III bilingual working draft
**Branch:** `Update`. Part III (*Il figlio della Zingara*) contains six source scenes, 108 paired speaker/direction turns, including the military camp, Azucena's arrest, and the wedding interrupted by her impending execution. Original Italian was preserved from the supplied Opera Guide MHT; English was independently authored as an AI-generated working translation awaiting editorial review. No invented musical number labels. Source extraction coverage checked; browser testing and editorial verification pending. Part IV remains pending.


### 2026-10-28 (UTC) — Il trovatore Act II bilingual working draft
**Branch:** `Update`. User-supplied Italian Opera Guide MHT was parsed in full. Part II (*La gitana*) preserves five original source scenes, 144 original/English speaker/direction turns and 352 extracted Italian printed source lines. The English is independently written as an AI-generated working translation awaiting editorial review. The original Italian is checked against the source extraction without omission. Stage directions and source incipits retained; no invented musical numbering. Parts III–IV pending. The translation, musical divisions and browser behavior remain subject to independent review.


### 2026-10-28 (UTC) — Il trovatore Act I from uploaded original-source archive

**Branch:** `Update` only. The user supplied a 2026 Opera Guide MHT with the original Italian libretto (https://opera-guide.ch/operas/il+trovatore/libretto/it/). All four parts were found in the archive, with source scene counts **5 / 5 / 6 / 4**. Act I (*Il duello*) was manually translated independently into English and structured as five original source scenes with 95 aligned speaker/stage-direction turns. The five scenes preserve all **276 extracted Italian printed source lines**, including stage directions and the final swordfight. **AI-generated English working translation awaiting editorial review.** Source divisions are used instead of invented official musical number labels; the outline uses source-based lyric incipits. Parts II–IV remain pending. Structural source coverage was checked locally against the saved source; a human literary and musical review and browser testing are still required.


### 2026-10-28 (UTC) — Rigoletto Act II bilingual working draft

**Update branch only.** Act II has been entered with its three source musical divisions (Nos. 8–10), comprising 141 original/English paired entries. The complete dramatic trajectory is included: Duke's lament, the courtiers' account, Rigoletto's search and plea, Gilda's account, Monterone's departure and the vengeance duet. English is an independent AI-generated working translation, **not an edited literary translation**. **Needs review:** source spelling and verse fidelity, turn boundaries, source coverage, speaker and direction checking, and independent browser QA. Both Acts II and III remain subject to editorial verification. No unsupported scene subdivisions were inserted.


### 2026-10-28 (UTC) — Rigoletto Act III bilingual working draft

**Update branch only.** Act III has been entered with four numbered musical sections (Nos. 11–14), 203 original/English paired passages including stage directions, the Duke's song, the quartet, the storm and Gilda's final encounter. English is an independent AI-generated working translation. **Status: Needs review.** A meticulous source-to-source collation and independent editorial review remain necessary, including source variants, exact verse breaks, and on-stage directions. The act data's structural and pairing checks are not proof of faithful complete textual coverage. Act II remains pending at this checkpoint.


### 2026-10-28 (UTC) — Rigoletto Acts II–III source structure verified; no new act published

**Branch:** `Update` only. **Primary source:** https://opera-guide.ch/operas/rigoletto/libretto/it/ (Francesco Maria Piave, original Italian). Research confirmed that the remaining acts should not have invented scene headings:

- **Act II:** No. 8 — Scena ed Aria (the Duke's lament); No. 9 — Scena ed Aria (Rigoletto among the courtiers, including his plea); No. 10 — Scena e Duetto (Gilda's account, Monterone's passage and Rigoletto's vow of revenge).
- **Act III:** No. 11 — Scena e Canzone (the inn and the Duke's song); No. 12 — Quartetto (Duke, Maddalena, Gilda and Rigoletto); No. 13 — Scena, Terzetto e Tempesta (the murder plot and Gilda's sacrifice); No. 14 — Scena e Duetto Finale (the sack and the tragic recognition).

**Status:** The complete source and independent English translations have **not** been adequately prepared or validated as bilingual data for these acts. No Act II or III module was committed in this checkpoint. Do not mark either act complete or generate stage directions/lyrics from memory. Preserve the existing Act I reader until each full act can be verified and committed separately. No new site-level regression claims were made.


### 2026-10-28 (UTC) — Rigoletto Act I initial bilingual working draft

**Branch:** `Update` only. **Source:** https://opera-guide.ch/operas/rigoletto/libretto/it/ (Act I, scenes 1–2, Nos. 1–7). The public-domain Italian has been manually structured into aligned passages with independent AI-generated English working translations. Both source scenes are represented, including the major stage directions and final curse, while Acts II and III remain pending. The translation awaits editorial review; source spelling variants, speaker labels, attribution, complete coverage and verse alignment require detailed verification. The existing site-wide regression failures predate this change; a full local test run and independent browser verification have not yet been completed.


### 2026-10-28 (UTC) — Traviata targeted source repair and aria navigation

**TRAVIATA-01 updated: Resolved for the identified Act II scene XIV truncation.** The final eight-line Alfredo passage and the falling-purse stage direction were restored from matching public-domain Italian text published by Teatro Regio Parma (https://www.teatroregioparma.it/Archivi/Archivio2014/uploads/LIBRETTO_La_traviata.pdf) and Wikisource (https://it.wikisource.org/wiki/La_traviata/Atto_secondo), after the primary Opera Guide HTML was found truncated. Correction commits `a75291c` and `990cdf4`. This resolves the identified gap; it does **not** constitute a full edition-wide source audit.

**Reader refinement:** Act I now separates the original-language landmarks `Ah, fors'è lui` and `Sempre libera degg'io` into their own original/English paired passages (`dd6592c`). In Act III, `Addio, del passato` and the offstage masked carnival chorus appear as separate navigation passages with the chorus correctly attributed (`e490654`). **TRAVIATA-02 remains Needs review:** full per-line English alignment, original language proofreading, stage-direction attribution and independent browser visual QA pending. The full repository regression suite is still affected by pre-existing stale checks, even though the specific three-act Traviata test passed in run 40743021730.


### 2026-10-28 (UTC) — La traviata: three-act bilingual working draft

**Branch:** `Update` only. **Source:** https://opera-guide.ch/operas/la+traviata/libretto/it/ (Italian, Francesco Maria Piave, public domain). The original-language HTML was fetched as supplied by Opera Guide; English was independently written as an AI working translation, **not copied from the site's English edition**.

**Delivery:** Act I source data `a4002c6` and reader activation `6c6ecdb` (5 scenes, 102 original-English entries); Act II original and English draft `dcdff3a`, scene-XV adjustment `ad39178` (15 scenes, 231 entries); Act III source and English draft `456bb1a` (6 scenes, 87 entries); complete three-act reader activation `b9ff8ad`. Temporary source-capture test and interim English-dictionary modules were removed. Source stage directions are generally preserved inline, and some original Italian text includes source-level typographic irregularities.

**TRAVIATA-01 — Needs review (source fidelity):** Opera Guide's retrieved Act II text appears to break off mid-speech at the transition from scene XIV to XV (Alfredo's public accusation, near `Ma è`). Rather than invent the missing Italian, the displayed working text flags the truncation. Reconcile against an authoritative public-domain score/libretto before claiming complete literal text.

**TRAVIATA-02 — Needs review (translation/format):** English is an original, **unreviewed semantic draft**; many long singing passages are translated as continuous English prose rather than verse-by-verse paired lines. Review and expand the original-English alignment, particularly the major arias, ensembles, and stage directions. Scene/subsection headings include editorial navigation incipits; they are not claimed as source-authenticated track numbers.

**Validation:** The La traviata three-act navigation test passed in GitHub Actions `Verify Update` run 40743021730. The **overall regression suite still fails** with unrelated stale tests (including old catalogue totals); the verified preview publication was skipped. GitHub Pages deployment reported success for commit `b9ff8ad`, but independent browser visual QA was not completed. No changes to `main` or approved guidelines.

### 2026-10-28 (UTC) — Aida Acts II–IV delivered as separate Update commits

**Act II:** commit `7f0af69`; two source scenes, 116 grouped speaker passages plus separately represented instrumental/stage directions; nine editorial listening sections. **Act III:** commit `a176028`; Nile-bank sequence represented in one source scene, 104 grouped speaker passages and four editorial listening sections. **Act IV:** commit `840ae62`; two source scenes, 93 grouped speaker passages, including the trial and final tomb. Aida's bilingual bundle now registers all four acts, with English independently drafted for side-by-side reading. `main` and Drive guidelines unchanged.

**Source and verification:** Italian is based on the user-selected Opera Guide Aida libretto (https://opera-guide.ch/operas/aida/libretto/it/), with an independent publicly available Italian transcription used to assist segmentation. **English translations are unreviewed drafts.** Some source material contains spelling/formatting variants; speaker attribution and the original Italian need exhaustive comparison to Opera Guide. Short editorial headings/incipits are navigation aids rather than asserted official musical numbers. Do not treat the presence of all four acts as final literary review approval.

**Outstanding:** Source-by-source Italian collation, English proofreading and verse line alignment checks, full desktop/mobile/night-mode visual browser QA, and successful complete `Verify Update` regression CI. Previous CI still had stale/independent tests; do not mark full QA as complete without passing evidence. **Status: Needs verification.**


### 2026-10-28 (UTC) — Aida Act I bilingual reader (Update)

**Scope:** Aida, Act I only. Source: https://opera-guide.ch/operas/aida/libretto/it/ (Italian text, original two scenes). Working English translation authored for side-by-side display and **not editorially verified**. Nine navigation/reading landmarks are editorial incipits, not claimed to be official numbered musical sections.

**Implementation:** Added `src/data/libretto-aida-act-1-scene-1.js`, `src/data/libretto-aida-act-1-scene-2.js`, the Act I aggregator and bundle; registered Aida in lazy loader and offline test registry; refreshed boot cache; added Act I alignment test. Commits: `dc4f4ed`, `99ef05c`. Act I contains two scenes, 119 dialogue/stage-direction turns with nonempty original and English text. **Acts II–IV remain pending** and are not registered as available. Source transcriptions contain apparent typos and variants including "per to", "sver[t]urato", "Scaerdotesse" that require editorial comparison against an authoritative edition. No website guidelines were changed.

**Status: Needs verification/editorial review.** Source was compared at passage level against the linked Opera Guide page, but independent proofing of every original word and the draft English has **not** been completed. Browser visual QA not performed. GitHub Actions `Verify Update` run 40737948247 failed: 16 existing/stale regression expectations across the repository (including an obsolete 31-opera count). The specific new Aida Act I test was not reported as failing, but the suite overall did not pass and preview publish was skipped. Follow up by updating unrelated stale tests separately, conducting visual checks, and reviewing Act I source fidelity and translation.


### 2026-10-27 — Catalogue expansion and La traviata source selection

**Catalogue added (Update):** La Cenerentola, Hänsel und Gretel, Nabucco and Pagliacci, as four planned works with no libretto bundle. The catalogue now contains 35 operas, of which 16 currently have bilingual libretto loaders and 19 do not.

**La traviata:** Primary Italian libretto identified at https://opera-guide.ch/en/operas/la%2Btraviata/libretto/it/ with three acts, source scene headings, cast and original Italian text. Opera Guide also publishes an English libretto at https://opera-guide.ch/en/operas/la%2Btraviata/libretto/en/; whether its alignment/version may be reused and all translation/source checks remain to be determined. **Status: pending ingestion**, not a completed or published bilingual libretto. Preserve Italian source divisions and speaker labels and make a verified, aligned English translation before enabling the completed-libretto loader. No placeholder should be counted as a complete libretto.

**Testing status:** The four catalogue entries were committed, but end-to-end browser/CI tests have not yet been run. No website guidelines were changed.


### 2026-10-27 UTC — Root documentation cleanup

Archived the historical `BARBIERE_OUTLINE_REVIEW.md` and `WEBSITE_REVIEW.md` reports in `archive.md`; their original content is preserved. Migrated `PROJECT_GUIDELINES.md` into the existing Drive product/implementation specification and preserved its original in the archive before removing all three redundant root files. `README.md` is deliberately empty and unchanged. No new website defect was verified or resolved by this cleanup.



### 2026-10-27 UTC — Unified audit register and archived previous reviews

**Scope:** Review-document organization and synthesis of the repo's earlier reports (2026-10-15 through 2026-10-26), plus the 2026-10-27 sixteen-opera headings audit.

**Added:** Global and opera-specific issue lists above, highlighting editorial draft risks, shared verification gaps, instrument-only attribution and previously documented source checks.

**Resolved this session:** No website defects; review-file duplication eliminated only after archiving the original text. **Accepted:** No new defects accepted. **Ongoing:** All items marked Deferred, Needs review or Needs verification. **Priority:** Complete the librettos before heading fixes and final visual QA.

**Source evidence:** [archive.md](archive.md) contains the historical reviews, test counts, dated corrections, source references and original baseline audit. A large raw CI log is retained as a separate archived diagnostic because embedding it would make the audit documents difficult to read.

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
- Project conventions: [Drive product & implementation specification](https://docs.google.com/document/d/1f6nHTppsfuElAV87YS4LReIBMRg2BJb7KFwFlglMb_g/edit) (migrated guidelines); historical repository source is in [archive.md](archive.md).
- Opera loader registry: [`src/data/libretto-loader.js`](../../src/data/libretto-loader.js)
- Figaro outline metadata: [`src/data/figaro-outline-metadata.js`](../../src/data/figaro-outline-metadata.js)
- Branch: https://github.com/AsuraFY/my-favorite-operas/tree/Update
- Public website: https://asurafy.github.io/my-favorite-operas/ (**not a substitute for testing `Update`**)

---

**Handoff state:** Audit preserved. **Pause heading fixes until librettos are completed**, then continue with the deferred follow-up plan. No code, CSS, libretto, or `main` branch changes are authorized by this report.

