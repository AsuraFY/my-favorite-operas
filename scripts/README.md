# Scripts

This folder is for **active, approved development scripts**. Completed one-time opera importers belong in [`archive/`](./archive/) and must not run in normal development or deployment.

## Archived imports

The following operas have their libretto readers integrated. Their old importers are retained only as historical source-processing references.

| Opera | Archived importer | Existing libretto |
| --- | --- | --- |
| *Manon* | `archive/import-manon.py` | `src/data/operas/librettos/manon/` |
| *Die Zauberflöte*, Act I | `archive/import_die_zauberflote_act_1.py` | `src/data/operas/librettos/the-magic-flute/` |
| *Die Zauberflöte*, Act II | `archive/import_die_zauberflote_act_2.py` | `src/data/operas/librettos/the-magic-flute/` |
| *La fanciulla del West* | `archive/import_fanciulla_all_acts.py` | `src/data/operas/librettos/la-fanciulla-del-west/` |

Also archived: `archive/legacy_import_guard.py` (read-only inspection / protection against overwrites) and `archive/build-manon.workflow.yml` (retired workflow, deliberately outside `.github/workflows/`).

**Do not execute or re-enable archived scripts.** Some were designed for incomplete early versions and may create outdated bundles or test files. The live site uses the committed JavaScript librettos and does not need Python importers at runtime.

## Policy for future operas

1. Work on new imports in an active, reviewable draft workflow, without overwriting accepted librettos.
2. When an opera's import stage is complete, move its one-time importer and relevant helpers/workflow files into `scripts/archive/`.
3. Update **this README only** with the opera, script, purpose/status, and current source location. Do not create a second README inside `archive/`.
4. Disable any automation triggers that could still run the archived importer. Keep archived code for provenance, not active execution.
5. Any later source regeneration or editorial correction requires a separately reviewed change.

**Editorial note:** A structurally complete reader does not mean that the English translation has passed human editorial review. Consult the opera audit roadmap for remaining text-quality work.
