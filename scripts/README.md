# Repository scripts

This directory is reserved for **active, approved development scripts**. The four one-time Python libretto importers were moved to [`archive/`](./archive/) after their corresponding opera readers had been integrated.

## Archive policy

When an opera's source preparation and integration have finished and a generator is no longer needed:

1. Move its one-time importer, relevant helper files and any dedicated workflow definition into `scripts/archive/`.
2. Record the opera, what the script generated, and why it was archived in `scripts/archive/README.md`.
3. Remove or retire all active automation triggers and document old entry points.
4. Keep the archived code for provenance and reproducibility, **not** for automatic regeneration. Do not execute archived code as part of normal releases or development.
5. If a source must be re-imported, develop a **new, reviewed draft-staging process** that never overwrites the accepted libretto without an explicit review and approval.

## Current status

There are **no active libretto-import generators** in this top-level folder. The website loads committed JavaScript data from `src/data/operas/librettos/<opera-slug>/`; it does **not** run Python importers for visitors.

**Important:** A structurally complete libretto reader does not imply its English translation has passed human editorial review. See the opera audit and source notes for editorial status.
