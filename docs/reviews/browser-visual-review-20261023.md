# Desktop and mobile browser verification — 23 October 2026

## Method

The GitHub Actions `Verify Update` workflow now loads the actual project pages in headless Chromium using the public web layout (at the same `/my-favorite-operas/` base path). This is a local static-server reproduction of the deployed `Update` commit; the live GitHub Pages domain could not be fetched through the assistant's browser.

The new automated browser pass inspects 11 completed operas at desktop (1440 × 900) and mobile (390 × 844), checking that content renders, both lyric columns contain text, CSS layout has no document-wide horizontal overflow, and original/translation columns sit side by side on desktop and stack on mobile. It also checks theme, font size, row spacing, mobile act-outline opening/closing, and the English second-line labels in *La bohème*'s full outline.

The run attaches Chrome screenshots for *Così fan tutte*, *Tristan und Isolde*, *La bohème*, and *Samson et Dalila* in both viewports, plus night-mode and outline examples. They can be downloaded from the workflow run's `opera-browser-review` artifact for human inspection.

## Limits

Automated layout metrics and screenshots do **not** prove perfect visual typography, exact colors or historic libretto accuracy. A human review of the attached images, plus mobile-device interaction checks, remains the final acceptance step. Screen reader and cross-browser compatibility beyond Chromium were not tested.
