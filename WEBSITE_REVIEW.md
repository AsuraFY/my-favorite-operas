# Website review — 12 October 2026

## Result

The blank website was caused by invalid published JavaScript in La Bohème Act I. During the earlier push, I mistakenly copied a truncated command response, including its warning, into the source file. The complete source is now restored and the live reader starts successfully. This was a publishing failure; moving the project to React would not have prevented it.

## Fixes completed

| Priority | Finding | Correction |
|---|---|---|
| Critical | A corrupted libretto module stopped the entire application from starting. | Restored every Act I turn from the intact prior commit, preserved its outline, and refreshed cached import URLs. |
| High | Deployment could succeed without testing the committed source. | GitHub Pages now runs `npm test` before uploading the website. Added syntax and source-integrity checks for every shipped JavaScript module. |
| High | Import failures left a completely blank screen. | Added a small startup loader with an accessible error message and reload button, plus a JavaScript-disabled message. |
| Medium | The outline highlight disappeared after passing a named passage. | Track named landmarks until the following landmark, rather than matching every dialogue turn. Select the last passage at the end of the page when it cannot scroll to the sticky boundary. Scope anchors by act, scene, section, and turn. |
| Medium | Several outline links used ambiguous phrases or appeared out of source order. | Corrected the targets for the friends’ departure, Mimì’s arrival and introduction, Parpignol, the bonnet, and the muff. Added tests requiring one source match per landmark and increasing reading order. |
| Medium | “Skip to content” changed the hash route and sent readers to the homepage. | Focus and scroll the current main content without changing the route. |
| Medium | Continuous-act pages lacked a visible primary heading on desktop. | Give the first scene heading the primary heading level while retaining subsequent scene headings. |

## Verification

- **75 automated checks pass** across nine test files, including the new navigation and publishing checks.
- Generated **166 routes**, covering all 31 opera entries, prepared and planned destinations, Musicals, search, and missing-item pages. Checked their markup for duplicate IDs, missing accessibility references, missing image files, and primary headings; no issues found.
- Opened **all 31 opera introduction pages, all 26 prepared acts, and all eight full outlines in the live browser**. They rendered without application errors or horizontal overflow at the desktop viewport.
- Exercised accent-insensitive opera search, the Musical search, Mahler About/Lyrics navigation, the 33 paired lyric rows, outline collapse/reopen, keyboard Skip to content, and theme/font settings. Restored the preferences after testing.
- Fetched the published recovery files back from GitHub and compared their contents exactly with the reviewed versions.

## Recommended next work

| Priority | Area | Finding and recommendation |
|---|---|---|
| Medium | Startup performance | About 1.89 MB of libretto/catalog JavaScript is imported before even the homepage starts. Load an opera’s text when its reader is opened. This would also isolate future content errors. |
| Medium | Reader search | The route supports searching within an act, but the visible header search always searches the opera catalog. Add an explicitly labelled “Search this act” control if this feature should be available to readers. |
| Medium | Editorial consistency | Some group speaker names in La Bohème’s Italian column are English, such as “Vendors and children” and “Mimì and Rodolfo.” Review these against the source alongside the draft translations. |
| Low | CSS maintenance | The stylesheet has 2,564 lines, including earlier layouts overridden by later rules and unused contents-layout selectors. Consolidate it with mobile visual checks to reduce the chance of future regressions. |
| Low | Route accessibility | After changing pages, keyboard focus generally stays where it was. Add deliberate heading focus or a short route announcement for screen-reader users. |

## Limits

Desktop behaviour was checked in a real browser. Mobile media rules and drawer logic were inspected, but the available browser did not provide a phone viewport, so this is not a completed 360–430 px device visual review. The automated metadata checks verify consistency, not historical accuracy. The libretti and translations still need a separate editorial comparison with their sources; every verse was not retranslated during this review.

The existing plain JavaScript structure is suitable for this site. Lazy loading, clearer reader search, and CSS cleanup are more useful next steps than a framework migration.
