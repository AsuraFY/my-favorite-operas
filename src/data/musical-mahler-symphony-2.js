// Score-aligned German vocal events for Mahler, Symphony No. 2, movement V.
// Original text before translation. No audio timestamps.
// Provisional part allocation is explicitly marked for further verification.
// Editorial standard: Opera/guidelines/musical_score_guidelines_v20261015.
export const mahlerFinaleSources = {
  "score": "https://imslp.org/wiki/Symphony_No.2_(Mahler,_Gustav)",
  "scoreDescription": "Universal Edition (1914), historic vocal score #733772; choral score and full score listed on IMSLP",
  "text": "https://mahlercat.org.uk/Pages/Symph2/Texts.htm",
  "status": "Score-aligned German transcription under detailed review, not final part-by-part verified notation"
};

export const mahlerFinaleEvents = [
  {
    "id": "orchestral-opening",
    "kind": "instrumental",
    "title": "Orchestral introduction",
    "description": "The fifth movement opens instrumentally. The choir enters only after an extended orchestral passage."
  },
  {
    "id": "first-resurrection",
    "kind": "vocal",
    "title": "Aufersteh’n — a quiet choral beginning",
    "cue": "31–33",
    "relation": "together",
    "lanes": [
      {
        "voice": "Choir (SATB) + soprano solo",
        "lines": [
          "Aufersteh’n, ja aufersteh’n wirst du,",
          "Mein Staub, nach kurzer Ruh!",
          "Unsterblich Leben!",
          "Unsterblich Leben",
          "wird, der dich rief, dich rief, dir geben!"
        ],
        "entrance": ""
      }
    ],
    "note": "The repeated words ‘Unsterblich Leben’ and ‘dich rief’ remain visible; specific part-by-part details are still being checked."
  },
  {
    "id": "orchestral-transition-one",
    "kind": "instrumental",
    "title": "Instrumental transition",
    "description": "The orchestra continues before the next choral entrance."
  },
  {
    "id": "wieder",
    "kind": "vocal",
    "title": "Wieder aufzublüh’n — staggered voices",
    "cue": "35",
    "relation": "overlap",
    "lanes": [
      {
        "voice": "Choir — tenors and basses",
        "lines": [
          "Wieder aufzublüh’n wirst du gesät!"
        ],
        "entrance": "First entrance"
      },
      {
        "voice": "Choir — sopranos and altos + soprano solo",
        "lines": [
          "Wieder aufzublüh’n wirst du gesät!"
        ],
        "entrance": "Answering entrance while lower voices are singing"
      }
    ],
    "note": "These are independently timed choral entries, not two consecutive full-choir verses."
  },
  {
    "id": "harvest",
    "kind": "vocal",
    "title": "Der Herr der Ernte — voices entering in layers",
    "cue": "36–37",
    "relation": "overlap",
    "lanes": [
      {
        "voice": "Choir — lower voices",
        "lines": [
          "Der Herr der Ernte geht,"
        ],
        "entrance": "Begin the phrase"
      },
      {
        "voice": "Choir — upper voices",
        "lines": [
          "Der Herr der Ernte geht,"
        ],
        "entrance": "Enter against the lower parts"
      },
      {
        "voice": "Choir (SATB)",
        "lines": [
          "und sammelt Garben",
          "uns ein, die starben!"
        ],
        "entrance": "Parts converge in the closing words"
      }
    ],
    "note": "The precise exchange of syllables between individual choir parts remains under review."
  },
  {
    "id": "orchestral-transition-two",
    "kind": "instrumental",
    "title": "Instrumental interlude",
    "description": "A passage for orchestra separates the choral harvest text from the contralto’s solo."
  },
  {
    "id": "glaube-contralto",
    "kind": "vocal",
    "title": "O glaube, mein Herz",
    "cue": "39–40",
    "relation": "solo",
    "lanes": [
      {
        "voice": "Contralto solo",
        "lines": [
          "O glaube, mein Herz, o glaube:",
          "Es geht dir nichts verloren!",
          "Dein ist, dein, ja dein, was du gesehnt!",
          "Dein, was du geliebt, was du gestritten!"
        ],
        "entrance": ""
      }
    ],
    "note": ""
  },
  {
    "id": "glaube-soprano",
    "kind": "vocal",
    "title": "O glaube — the soprano responds",
    "cue": "41",
    "relation": "solo",
    "lanes": [
      {
        "voice": "Soprano solo",
        "lines": [
          "O glaube:",
          "Du wardst nicht umsonst geboren!",
          "Hast nicht umsonst gelebt, gelitten!"
        ],
        "entrance": ""
      }
    ],
    "note": "The choir begins its next thought as this passage comes to an end; the soprano’s words are not repeated in the next section."
  },
  {
    "id": "vergehen",
    "kind": "vocal",
    "title": "Was entstanden ist — staggered choral entrances",
    "cue": "42",
    "relation": "overlap",
    "lanes": [
      {
        "voice": "Choir — tenors and basses",
        "lines": [
          "Was entstanden ist, das muss vergehen!",
          "Was vergangen, auferstehen!"
        ],
        "entrance": "Initial lower-voice statement"
      },
      {
        "voice": "Choir — sopranos and altos",
        "lines": [
          "Was vergangen, auferstehen!"
        ],
        "entrance": "Answering and reinforcing entrance"
      }
    ],
    "note": "The entrance relationship is shown; exact SATB boundaries should be checked against each part."
  },
  {
    "id": "hoer-auf",
    "kind": "vocal",
    "title": "Hör auf zu beben! — echoing parts",
    "cue": "43",
    "relation": "overlap",
    "lanes": [
      {
        "voice": "Choir — tenors and basses",
        "lines": [
          "Hör auf zu beben!"
        ],
        "entrance": "First statement"
      },
      {
        "voice": "Choir — sopranos and altos + contralto solo",
        "lines": [
          "Hör auf zu beben!"
        ],
        "entrance": "Second, overlapping entrance"
      }
    ],
    "note": "Both occurrences are retained because different vocal parts enter separately."
  },
  {
    "id": "bereite",
    "kind": "vocal",
    "title": "Bereite dich zu leben!",
    "cue": "43",
    "relation": "together",
    "lanes": [
      {
        "voice": "Choir (SATB) + contralto solo",
        "lines": [
          "Bereite dich zu leben!"
        ],
        "entrance": ""
      }
    ],
    "note": ""
  },
  {
    "id": "schmerz-tod",
    "kind": "vocal",
    "title": "O Schmerz / O Tod — interwoven solos",
    "cue": "44",
    "relation": "overlap",
    "lanes": [
      {
        "voice": "Contralto solo",
        "lines": [
          "O Schmerz! Du Alldurchdringer!",
          "Dir bin ich entrungen!",
          "O Tod! Du Allbezwinger!",
          "Nun bist du bezwungen!"
        ],
        "entrance": "Begins first"
      },
      {
        "voice": "Soprano solo",
        "lines": [
          "O Tod! Du Allbezwinger!",
          "Nun bist du bezwungen!"
        ],
        "entrance": "Enters while the contralto’s line continues"
      }
    ],
    "note": "These lanes overlap. They are not to be read as one voice finishing before the other begins; fine-grained alignment remains under review."
  },
  {
    "id": "wings-soloists",
    "kind": "vocal",
    "title": "Mit Flügeln — overlapping solo lines",
    "cue": "45–46",
    "relation": "overlap",
    "lanes": [
      {
        "voice": "Soprano solo",
        "lines": [
          "Mit Flügeln, die ich mir errungen,",
          "in heißem Liebesstreben",
          "werd’ ich entschweben",
          "zum Licht, zu dem kein Aug’ gedrungen!"
        ],
        "entrance": "Begins this musical thought"
      },
      {
        "voice": "Contralto solo",
        "lines": [
          "Mit Flügeln, die ich mir errungen,",
          "in heißem Liebesstreben",
          "werd’ ich entschweben",
          "zum Licht, zu dem kein Aug’ gedrungen!"
        ],
        "entrance": "Follows independently; phrases overlap"
      }
    ],
    "note": "Shared words do not mean simultaneous syllables. The hand-off between singers needs note-by-note confirmation."
  },
  {
    "id": "wings-choir",
    "kind": "vocal",
    "title": "Mit Flügeln — choir lines build independently",
    "cue": "46–47",
    "relation": "overlap",
    "lanes": [
      {
        "voice": "Choir — basses",
        "lines": [
          "Mit Flügeln, die ich mir errungen,",
          "werde ich entschweben!"
        ],
        "entrance": "Lower-voice entrance"
      },
      {
        "voice": "Choir — altos",
        "lines": [
          "Mit Flügeln, die ich mir errungen,",
          "werde ich, ja werde ich entschweben!"
        ],
        "entrance": "Enters against the basses"
      },
      {
        "voice": "Choir — tenors",
        "lines": [
          "Mit Flügeln, die ich mir errungen,",
          "werde ich entschweben!"
        ],
        "entrance": "Separate melodic entrance"
      },
      {
        "voice": "Choir — sopranos",
        "lines": [
          "Mit Flügeln, die ich mir errungen,",
          "werde ich entschweben!",
          "werde ich entschweben!"
        ],
        "entrance": "Upper-voice entrance and continuation"
      }
    ],
    "note": "Part-specific repetition counts and exact overlaps are an editorial review item; these lanes are a reading aid, not a note-by-note performance transcription."
  },
  {
    "id": "sterben",
    "kind": "vocal",
    "title": "Sterben werd’ ich, um zu leben!",
    "cue": "47",
    "relation": "together",
    "lanes": [
      {
        "voice": "Choir (SATB)",
        "lines": [
          "Sterben werd’ ich, um zu leben!"
        ],
        "entrance": ""
      }
    ],
    "note": "The score shows one sustained proclamation here. Do not add extra full-phrase repeats solely from an audio subtitle."
  },
  {
    "id": "finale",
    "kind": "vocal",
    "title": "Aufersteh’n — final choir and soloists",
    "cue": "48–49",
    "relation": "together",
    "lanes": [
      {
        "voice": "Choir (SATB) + soprano solo + contralto solo",
        "lines": [
          "Aufersteh’n, ja aufersteh’n wirst du,",
          "mein Herz, in einem Nu!",
          "Was du geschlagen,",
          "was du geschlagen,",
          "zu Gott,",
          "zu Gott,",
          "zu Gott wird es dich tragen!"
        ],
        "entrance": ""
      }
    ],
    "note": "The final ‘Was du geschlagen’ is sung twice and ‘zu Gott’ three times; every occurrence is shown."
  },
  {
    "id": "orchestral-end",
    "kind": "instrumental",
    "title": "Orchestral conclusion",
    "description": "The singing ends; the full orchestral ending continues."
  }
];
