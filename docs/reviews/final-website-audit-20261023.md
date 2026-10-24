# Final website-wide regression and deployment audit — 23 October 2026

Project: **My favorite Operas**. Working branch: `Update`.

## Verified on the existing branch

- The latest 11-opera structural review commit `06298b8aac39670e4a78a43f39833e95dd9204d1` completed the **Verify Update** workflow successfully (run 39975352170).
- GitHub Pages successfully published the same commit (run 39975349132). This confirms that the deployment workflow completed; a successful deployment is not proof of visual correctness.
- Current automated suites cover 11 completed opera routes and 31 catalogue entries, bilingual passage preservation, headings, performance cues, section anchors, chapter navigation, startup error recovery, static CSS consistency and the deploy gate.
- Opera-specific reviews were committed separately before this final audit; previously found source-wording and alignment concerns are recorded in their individual reviews.
- This audit adds a static dependency gate: every local JavaScript import (including dynamically loaded act modules), local CSS image URL, HTML entry asset, and declared catalogue/reader artwork must resolve to a tracked file. The metadata check also ensures complete opera act counts match the public catalogue.

## What remains unverified

- A real browser visual inspection of rendered pages at desktop and mobile sizes, including dark mode, reader scrolling, font controls, missing images after loading, and bilingual column layout. The live GitHub Pages domain was not reachable from the available browser-fetch environment; code and GitHub Actions results were verified instead.
- Line-for-line philological comparison of all 11 operas with authoritative libretti and a fresh semantic review of every English translation. Existing audits establish structural correspondence only.
- A manual click-through of every deep link on an actual mobile device.

## Next manual check

Open the [published Update site](https://asurafy.github.io/my-favorite-operas/), then sample an act of *Così fan tutte*, *Tristan und Isolde*, *Carmen*, *La bohème* and *Samson et Dalila*. Check the first and last outline destinations, bilingual verse spacing, full vs compact stage directions, mobile scrolling, day/night themes, and translation lines under each outline entry. Record any rendering defects by opera, act, section and URL before editing their source text.

No libretto words or existing links were intentionally altered by this site-wide audit.
