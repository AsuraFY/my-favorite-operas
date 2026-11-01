# Data layout

- [`operas/`](./operas/) holds the opera catalogue, information, loader, registry and individual libretto folders.
- Each opera in `operas/librettos/<slug>/` has a `bundle.js`, act-level files, optional prologue/epilogue and occasional `internal/` scene fragments. **The reader still displays one continuous page per act; the original source scene boundaries remain intact.**
- [`operas/drafts/`](./operas/drafts/) retains research, earlier samples, superseded intermediate part files, and unreviewed drafts. No content was deleted in the repository reorganization.
- [`musicals/`](./musicals/) holds the independent musical-work text/score datasets.

When moving or changing files, update all imports, tests and source-processing scripts, then validate the 35-opera Node/browser regression suite on `Update` before any merge to `main`.
