# Opera website development and release process

**Working branch:** `Update`. Never modify or merge into `main` without explicit user authorization.

## Prepare before committing
1. Obtain a stable copy of the chosen primary-source libretto outside GitHub Actions. Do not make deployment depend on requests to third-party websites.
2. Prepare all requested acts, the unreviewed English drafts, the source-accurate outline metadata, and the source/review checkpoint locally or in a dedicated content-preparation environment.
3. Validate source coverage (act and scene divisions, source musical numbers or absence of numbers, speakers, stage directions, lyrics), original/English line pairing, and all local module links. Do not invent official numberings or titles.
4. Run `npm test` against the prepared site before pushing. Repair test failures in the prepared change, not by adding another GitHub Actions import workflow.
5. Commit the complete, checked content and tests directly to `Update`.

## Publish
- The single configured website workflow is `.github/workflows/verify-update.yml`.
- An `Update` push runs Node regression tests and desktop/mobile browser smoke tests, then publishes the tested static site to GitHub Pages if they pass.
- Content importers under `scripts/` are **manual preparation utilities only**, not GitHub Actions workflows.
- Confirm workflow status and the affected live URL before claiming a release succeeded.

## La fanciulla del West
The source importer `scripts/import_fanciulla_all_acts.py` is retained as a manual utility. Its automated import was blocked by Flaminio Online returning HTTP 403 to the GitHub runner. No three-act generated libretto files were committed, so this opera is **not implemented yet**. Prepare all three acts from a user-provided or otherwise legitimately accessible source snapshot, verify them, and commit them directly to `Update` in a later requested task.

## Editorial status
Original source divisions and names are preserved. English draft translations remain explicitly unreviewed until the user undertakes a later editorial pass, as agreed for the collection.
