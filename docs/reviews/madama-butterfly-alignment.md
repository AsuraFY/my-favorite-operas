# Madama Butterfly — bilingual structural audit (23 October 2026)

Scope: all three completed acts on the `Update` branch, retaining the original 34 section routes and the prior 20 October editorial review.

## Findings

- Acts I–III contain 325, 197 and 115 French/Italian source and English bilingual turns respectively, for **637 total**. (Original language: **Italian**.)
- The acts contain 563, 402 and 216 recorded sung-source lines respectively.
- The 34 sections each retain an original-language and English title; route targets are unique.
- Every stored original/translated turn is populated. All explicit line and stanza divisions match; no literal escaped newline sequences, malformed whitespace, or replacement characters were found.
- Stage-direction grouping remains intact: 89 direction turns, of which 24 are short cues and 65 are narrative directions. Short cues retain brackets, while narrative directions remain unbracketed.
- The existing reader and libretto suites already verify displayed bilingual rows, outline translations, and navigation; dedicated structural regression coverage was added.
- No libretto text, translation wording, or navigation route was changed during this audit.

Source of audit: the existing repository files and their recorded metadata. This is a **structural consistency review**, not a fresh critical-edition comparison or independent semantic retranslation. Live desktop/mobile browser visual review has not been performed.
