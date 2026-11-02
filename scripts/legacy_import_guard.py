"""Safety gate shared by historical, one-time opera libretto importers.

The completed published bundle is authoritative. --check is read-only and
works without network calls, translation models, or changes to tracked files.
A historical importer is never allowed to overwrite an existing bundle.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ACTS = {
    "manon": 5,
    "the-magic-flute": 2,
    "la-fanciulla-del-west": 3,
}

def guard_existing_published_libretto(slug, argv):
    if slug not in ACTS:
        raise ValueError(f"Unknown opera: {slug}")
    folder = ROOT / "src" / "data" / "operas" / "librettos" / slug
    bundle = folder / "bundle.js"
    if "--check" in argv:
        if any(flag in argv for flag in ("--write", "--force", "--overwrite")):
            raise SystemExit("--check must not be combined with write flags")
        required = [bundle] + [folder / f"act-{n}.js" for n in range(1, ACTS[slug] + 1)]
        missing = [str(path.relative_to(ROOT)) for path in required if not path.is_file()]
        if missing:
            raise SystemExit("Missing published libretto files: " + ", ".join(missing))
        print(f"READ-ONLY OK: {slug}: bundle + {ACTS[slug]} acts in the organized tree")
        return False
    if bundle.exists():
        raise SystemExit(
            "REFUSED: historical importer would overwrite a completed libretto at "
            f"{bundle.relative_to(ROOT)}. This script is archival. Review and stage "
            "any future source regeneration separately; no in-place overwrite."
        )
    raise SystemExit(
        "REFUSED: one-time legacy generator has not been re-approved for an empty "
        "destination. Use a reviewed source-staging workflow instead."
    )

if __name__ == "__main__":
    import sys
    if len(sys.argv) == 3 and sys.argv[1] == "--check":
        guard_existing_published_libretto(sys.argv[2], sys.argv)
    else:
        raise SystemExit("Usage: python -B scripts/legacy_import_guard.py --check <opera-slug>")
