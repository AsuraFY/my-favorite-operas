# Project guidelines

## Libretto outlines and act pages
- Each outline entry has three fields: original title, English translation, and characters.
- Derive characters from the source libretto's character list, scene participants, and speaker labels. Never derive characters from Spotify performer metadata.
- Spotify may guide track order and scene grouping. It does not change the agreed outline format or provide the character source.
- Show the source-libretto characters on the side-by-side translation page as well, alongside the speaker labels in each language.
- Keep the Spotify album link at the bottom as the source, using a neutral label without performer credits.
- After pushing a page update, include the published page URL in the feedback.


## Shared heading component — approved 27 October 2026
- All opera outline entries and bilingual reading sections use three ordered fields: (1) original-language title or source musical form, (2) English translation or English musical-form name, and (3) characters derived from section participants and actual libretto speakers.
- Both outline and reader use the same shared CSS hierarchy. In the reader, line 1 uses the Così fan tutte title typography; line 2 is regular (not italic), softly muted and 1.25rem; line 3 uses the smaller italic character-credit typography with its person icon. There is **zero margin between lines 2 and 3**. The outline uses the same hierarchy at a smaller scale.
- Use global selectors in styles.css and the shared renderer in src/libretto-reader.js. **Do not create per-opera heading CSS** for new opera additions. Future sections should provide originalTitle, translatedTitle and participants where possible.
- Never invent musical classifications, translation lines, characters or score numbers. Prefer existing heading metadata, source-aligned bilingual text, established English musical-form equivalents, and speaker labels, in that order. Where an English heading remains unsupported, show an explicit review-pending label rather than fabricate a translation.
- Instrumental overtures, preludes and interludes are exempt from character credits where no one sings. Existing source text, act divisions, and deep links should be preserved.
