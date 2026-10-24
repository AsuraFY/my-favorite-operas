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
