# Archived opera import scripts

**Status: HISTORICAL / RETIRED. Do not run these scripts to regenerate or overwrite opera data.**

These are the **one-time Python source preparation scripts** used when some opera librettos were first being built. The relevant librettos have now been integrated into the 35-opera website. The current reader sources are in `src/data/operas/librettos/`, not here.

| Opera | Archived script | Purpose before archival | Current data location |
| --- | --- | --- | --- |
| *Manon* | `import-manon.py` | Prepare the French source and machine-assisted English working drafts for its acts | `src/data/operas/librettos/manon/` |
| *Die Zauberflöte* (Act I) | `import_die_zauberflote_act_1.py` | Import the first act from the source | `src/data/operas/librettos/the-magic-flute/` |
| *Die Zauberflöte* (Act II) | `import_die_zauberflote_act_2.py` | Prepare the second act and integrate it | `src/data/operas/librettos/the-magic-flute/` |
| *La fanciulla del West* | `import_fanciulla_all_acts.py` | Prepare the three-act Italian source and English drafts | `src/data/operas/librettos/la-fanciulla-del-west/` |

## Supporting historical files

- `legacy_import_guard.py` — retained with the old scripts. It prevents the archived Python files from regenerating the accepted librettos; its `--check` mode is read-only.
- `build-manon.workflow.yml` — archived copy of the former Manon workflow. This file is **outside `.github/workflows/`**, so GitHub Actions does not treat it as an active workflow.

## Why archived?

The site now contains a structurally complete reader for each of these works. These importers were designed for earlier, sometimes partial iterations, and their generated code and old tests would not be safe to apply blindly to the current website. The historical scripts must **not** be wired into active workflows or run as part of normal development.

**Editorial distinction:** These imports produced working texts, not automatically approved translations. Source comparisons, speaker labels, staging directions and English translations may still require editorial review under the opera audit roadmap.

For future operas, create a new script in an appropriate active workspace, keep generated material in reviewable drafts, and **move that script here when the new opera's import stage is finished**. Preserve source provenance and stop any automation before archiving. A later correction to an existing opera should be made in a reviewed content change rather than by rerunning the historical importer.
