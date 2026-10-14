# Website tests

Run the full suite from the repository root with `npm test`. Run a single area with, for example, `node --test tests/reader-navigation.test.mjs`.

## Where checks belong

| File | Responsibility |
| --- | --- |
| `libretto-content.test.mjs` | Source scenes, musical numbers, original text, verse pairing, and opera-specific content checkpoints. Related rendering assertions stay with a source check where they verify the same passage. |
| `libretto-presentation.test.mjs` | Bilingual rendering, headings, outlines, participant lists, speaker labels, icons, and shared reader presentation. |
| `reader-navigation.test.mjs` | Section routes, complete-act navigation, search destinations, highlighted landmarks, and keyboard Skip to content. |
| `catalog-pages.test.mjs` | Opera information, planned libretto pages, musical pages, search, navigation tabs, and artwork. |
| `source-integrity.test.mjs` | JavaScript syntax, accidental tool-output corruption, and local entry-point assets. |
| `helpers/libretto-helpers.mjs` | Shared row counting/pair extraction, complete-act route checks, and route reset. Contains no test cases. |

Each rendering suite resets its simulated browser route before every test. Keep tests independent: set the act required by the case instead of relying on a previous case's route. Tests within these files use a shared simulated window and should remain sequential unless each gets its own isolated environment.

## Migration from the original nine files

- `carmen.test.mjs`, `figaro.test.mjs`, and `turandot.test.mjs`: checks moved to content, presentation, or navigation according to purpose.
- `libretto-regression.test.mjs`: divided among those same three areas; source-specific checks remain labeled by opera. Mixed integration checks retain their related assertions together.
- `continuous-act.test.mjs`: merged into reader navigation.
- `opera-information.test.mjs` and `musicals-page.test.mjs`: merged into catalog pages.
- `reader-navigation.test.mjs`: retained and expanded with the moved navigation checks.
- `source-integrity.test.mjs`: retained unchanged.

All 88 original named tests are retained. No coverage was discarded merely to reduce the count.

Repeated code was reduced by sharing verse-row extraction and full-act target verification. Barbiere's identical full-act row checks now run once per act instead of once per scene (2 renders instead of 27); the navigation tests still exercise every section address. The shared target checker respects stable `routeItem` addresses rather than assuming array position equals the public URL identifier.

Source line/scene counts and text fingerprints remain deliberate preservation checks. They may need updating after a verified source correction. Existing markup assertions that identify bilingual rows or outline ordering remain; replacing them with broad text searches would weaken those checks. If markup evolves, update the shared extractor or the relevant presentation check rather than copying another parser.

These checks verify structure and known content, not the semantic quality of translations or visual appearance on desktop/mobile. Add tests for meaningful risks or observed bugs, and avoid duplicate checks merely to increase the total.
