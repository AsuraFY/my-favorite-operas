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
