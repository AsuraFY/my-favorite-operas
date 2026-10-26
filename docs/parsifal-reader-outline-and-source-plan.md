# Parsifal — bilingual libretto editorial plan and act outline

Status: **Editorial outline complete; full German–English libretto not yet transcribed/aligned or published.** Do not set `hasCompleteLibretto("parsifal")` to true until the validation checklist below passes.

## Work identity
Richard Wagner, *Parsifal*, WWV 111. Three acts, original German, libretto by Wagner. Genre: *Bühnenweihfestspiel* (stage-consecration festival play). For this work, use a **single continuous reader page per act**, with internal section anchors: an artificial one-page-per-scene hierarchy should not be imposed on the score.

## Act I — The Grail domain
| Anchor | German navigation label | English label | Key figures | Listener's orientation |
|---|---|---|---|---|
| act-1-forest | Im Gebiete des Grales — Wald | The Grail domain — forest | Gurnemanz, Squires, Knights | Dawn near the Grail castle; preparations for the suffering Amfortas. |
| act-1-kundry | Kundrys Ankunft | Kundry arrives | Kundry, Gurnemanz, Amfortas | Kundry brings a balm; Amfortas's wound is not cured by ordinary remedies. |
| act-1-grail-history | Die Geschichte des Grales | History of the Grail | Gurnemanz, Squires | Gurnemanz relates Titurel, Amfortas, Klingsor, the spear and the prophecy of a compassionate innocent. |
| act-1-swan | Der Schwan | The swan | Parsifal, Gurnemanz, Kundry | Parsifal is reproved for shooting a swan; his ignorance and his mother's history emerge. |
| act-1-transformation | Verwandlung zur Gralsburg | Transformation to the Grail castle | Gurnemanz, Parsifal | The forest changes into the solemn interior of the Grail temple. |
| act-1-ceremony | Die Gralsenthüllung | Unveiling of the Grail | Amfortas, Titurel, Knights, chorus | Amfortas reluctantly performs the ceremony despite his agony. |
| act-1-dismissal | Parsifals Entlassung | Parsifal is sent away | Gurnemanz, Parsifal | The youth cannot explain what he has seen; Gurnemanz dismisses him. |

## Act II — Klingsor's enchanted castle
| Anchor | German navigation label | English label | Key figures | Listener's orientation |
|---|---|---|---|---|
| act-2-klingsor | Klingsors Zauberschloss | Klingsor's castle | Klingsor, Kundry | Klingsor summons Kundry to entrap Parsifal. |
| act-2-fight | Der Kampf | The fight | Parsifal, Klingsor's knights | Parsifal defeats the defenders. |
| act-2-flower-garden | Die Blumenmädchen | The Flowermaidens | Parsifal, Flowermaidens | Seductive flowers and maidens attempt to divert him. |
| act-2-kundry | Kundrys Versuchung | Kundry's temptation | Kundry, Parsifal | Kundry speaks of his mother Herzeleide and kisses him. |
| act-2-compassion | Amfortas! Die Wunde! | Amfortas! The wound! | Parsifal, Kundry | Understanding Amfortas's suffering awakens Parsifal's compassion. |
| act-2-spear | Der heilige Speer | The holy spear | Parsifal, Kundry, Klingsor | Parsifal catches the thrown spear; Klingsor's enchantment collapses. |

## Act III — Return to the Grail domain
| Anchor | German navigation label | English label | Key figures | Listener's orientation |
|---|---|---|---|---|
| act-3-good-friday | Karfreitagsmorgen | Good Friday morning | Gurnemanz, Kundry | Years later, Gurnemanz recognizes Kundry in the hermitage landscape. |
| act-3-return | Parsifals Rückkehr | Parsifal's return | Parsifal, Gurnemanz, Kundry | Parsifal arrives with the spear, weary after long wandering. |
| act-3-anointing | Taufe und Salbung | Baptism and anointing | Parsifal, Gurnemanz, Kundry | The new Grail king is prepared; Kundry washes his feet. |
| act-3-meadow | Karfreitagszauber | Good Friday spell | Parsifal, Gurnemanz | The meadow's beauty becomes an image of grace and renewal. |
| act-3-processions | Die Trauerzüge | Funeral processions | Knights, Gurnemanz, Parsifal | The knights gather for Titurel's funeral and Amfortas's suffering. |
| act-3-healing | Die Heilung des Amfortas | Healing of Amfortas | Parsifal, Amfortas | Parsifal touches the wound with the returned spear. |
| act-3-final-grail | Die letzte Gralsenthüllung | Final unveiling of the Grail | Parsifal, Kundry, Knights | The Grail is revealed and the drama ends in a vision of redemption. |

**Editorial labels, not score-authenticated scene or track titles:** Navigation headings and divisions above are descriptive and must not be passed off as Wagner's original section numbering. Check source editions before matching the exact text passages to these anchors.

## English translation rights and source strategy
- German original: Wagner's historical text; establish the precise score/libretto edition used and keep its spelling and stage directions consistent.
- Historical bilingual score: Richard Wagner, *Parsifal*, English translation by **Margareth Glyn**, 1904, G. Schirmer; Wikimedia Commons / Internet Archive: https://commons.wikimedia.org/wiki/File:Parsifal,_a_stage-consecrating_festival-play._English_translation_by_Margareth_Glyn._Complete_vocal_score_in_a_facilitated_arrangement_by_Karl_Klindworth_(IA_parsifalstagecon00wagn).pdf . Listed as US public domain; verify destination jurisdiction and matching text.
- Alternative 1904 English text: George Turner Phelps, *Parsifal: An English Text for the Score*, https://s9.imslp.org/files/imglnks/usimg/7/76/IMSLP955017-PMLP5713-G-T_Phelps_Parsifal_Libretto_EN-GE_2-pageView.pdf . Do not mix translation versions without explicit attribution.
- Do **not** copy unlicensed modern prose translations or assume web accessibility grants republication rights.

## Reader integration contract
1. Add separate `libretto-parsifal-act-1.js`, `-act-2.js`, `-act-3.js` modules, each with the ordered German original and **paired English translation for every vocal turn and stage direction**. Keep `literalText: true`, speaker and stage-direction cues, and actual line breaks.
2. Build `libretto-parsifal-bundle.js` using `getOpera("parsifal")`; set `originalLanguage: "Deutsch"`, `translationLanguage: "English"`, `continuousAct: true`, `preserveLineBreaks: true`, `sourceSceneOutline: true`. Link editorial anchors only to actual first occurrences of the corresponding section and retain direct `?act=1`, `?act=2`, `?act=3` routes.
3. After all acts are **complete**, register dynamic loader in `src/data/libretto-loader.js` and static compatibility import in `src/data/libretto-registry.js`. Until then, preserve the catalog's planned-libretto status instead of claiming completion.
4. Remove `parsifal` from the pending-opera loop in `tests/catalog-pages.test.mjs` and replace it with detailed tests for three acts, every turn's bilingual pairing, real anchor destinations, German and English headings, speaker visibility and previous/next controls.
5. Run `npm test`, inspect desktop/mobile bilingual layout and language modes, and verify direct URL navigation, outline jumps and published Pages output.

## Completion gate
- [ ] Entire German libretto entered and compared with source by act, including stage directions.
- [ ] Entire English version entered with documented source and suitable publication rights.
- [ ] Each passage aligned in a single bilingual scroll flow; no empty English vocal lines.
- [ ] Act I, II and III outlines link to actual reader passage anchors.
- [ ] Speaker, chorus and simultaneous singing labels checked.
- [ ] Automated tests and browser/mobile regression checks pass.
- [ ] Only then mark Parsifal's reader as complete.

## Confirmed German source — supplied 26 October 2026
- Full original-language libretto: https://opera-guide.ch/operas/parsifal/libretto/de/ (Opera Guide, *Parsifal*, Richard Wagner).
- The page includes cast, prelude, ERSTER AUFZUG, ZWEITER AUFZUG and DRITTER AUFZUG, with dramatic dialogue, speaker names, and stage directions in a continuous text; retain its actual source order rather than converting editorial headings into asserted scene numbers.
- The corresponding `/libretto/en/` endpoint contains only a link to another site and does **not** supply a full English libretto. English therefore still requires a separately verified, publishable translation.
- Transcription must account for possible source typos (for example, one Act I speaker cue appears as `MFORTAS` instead of `AMFORTAS`); compare with the historical original before correcting, and record any editorial normalization.
- Do not claim the full native reader is implemented merely because an external source link is available.
