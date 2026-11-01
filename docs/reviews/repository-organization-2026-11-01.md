# Repository organization — 2026-11-01

## Decision

Organize `src/data` by content type and per-opera slug, as approved. **No change to the one-page-per-act reader**, public routes or source dramatic divisions. Preserve previous drafts, older research materials and snapshots without deleting them.

## New layout

- `src/data/operas/catalog.js`, `information.js`, `libretto-loader.js`, `libretto-registry.js` for shared opera information and loading.
- `src/data/operas/librettos/<slug>/bundle.js` and `act-N.js` for all 35 operas.
- `internal/act-N-scene-X.js` only where an existing large act was already split into source fragments (Aida and Rigoletto).
- `src/data/operas/drafts/` for old drafts, partial previews and research-only copies.
- `src/data/musicals/` for Beethoven and Mahler data.

## Release checks

Repair ESM imports and test paths after relocating, then rerun the established 224 Node tests and 35-opera desktop/mobile browser smoke. Preserve the checked source text and appearance. No main merge or editorial changes are part of this refactor.

## Verified result — 2026-11-01

The relocation and import-path repairs are complete on `Update`. GitHub Actions **Verify Update** run [41363468298](https://github.com/AsuraFY/my-favorite-operas/actions/runs/41363468298) passed **224/224 Node tests** and **876 Chromium assertions** across **70 opera/viewport combinations** (all 35 at desktop and mobile). The dependent **Publish verified Update preview** job also succeeded. The active website's reader, first/last act loads, outlines and responsive layouts were exercised; detailed editorial reviews remain separate.

**Existing generator scripts remain legacy utilities:** `scripts/import-manon.py`, both `scripts/import_die_zauberflote_act_*.py` and `scripts/import_fanciulla_all_acts.py` still refer to the former flat `src/data` layout. They were intentionally preserved, not executed. **Do not run them or dispatch `build-manon.yml` until their output paths and code-generation templates have been migrated and tested**, or they could create duplicate files in the old locations. Migrating these source-processing scripts is a follow-up maintenance task, not a prerequisite for the verified website runtime.

The branch `main` was not changed by this refactor. Do not merge until explicitly authorized.
