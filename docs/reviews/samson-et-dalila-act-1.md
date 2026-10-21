# Samson et Dalila — Act I, 21 October 2026

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
