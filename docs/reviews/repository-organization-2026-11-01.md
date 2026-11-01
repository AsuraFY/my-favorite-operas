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
