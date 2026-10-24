// Score-aligned German vocal events for Mahler, Symphony No. 2, movement V.
// Original text before translation. No audio timestamps.
// Provisional part allocation is explicitly marked for further verification.
// Editorial standard: Opera/guidelines/Musical_Website_Guidelines.md.
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
    "title": "Orchestral introduction"
  },
  {
    "id": "first-resurrection",
    "kind": "vocal",
    "title": "Aufersteh’n — quiet choral entrance",
    "cue": "31–34",
    "verificationStatus": "draft",
    "lanes": [
      {
        "voice": "Soprano solo + Choir (SATB)",
        "relationship": "together",
        "lines": [
          "Aufersteh’n, ja aufersteh’n wirst du,",
          "Mein Staub, nach kurzer Ruh!",
          "Unsterblich Leben!",
          "Unsterblich Leben"
        ]
      },
      {
        "voice": "Soprano solo + upper choir",
        "relationship": "parallel",
        "lines": [
          "Wird, der dich rief, dich rief, dir geben!"
        ]
      },
      {
        "voice": "Lower choir parts",
        "relationship": "parallel",
        "lines": [
          "Wird, der dich rief, dir geben!"
        ]
      }
    ]
  },
  {
    "id": "orchestral-transition-one",
    "kind": "instrumental",
    "title": "Orchestral transition"
  },
  {
    "id": "wieder",
    "kind": "vocal",
    "title": "Wieder aufzublüh’n — layered choir",
    "cue": "35–38",
    "verificationStatus": "draft",
    "lanes": [
      {
        "voice": "Choir — lower voices",
        "relationship": "solo",
        "lines": [
          "Wieder aufzublüh’n wirst du gesät!"
        ]
      },
      {
        "voice": "Choir — upper voices",
        "relationship": "relay",
        "lines": [
          "Wieder aufzublüh’n wirst du gesät!"
        ]
      },
      {
        "voice": "Continuing choir parts",
        "relationship": "parallel",
        "lines": [
          "Wieder aufzublüh’n wirst du gesät!"
        ]
      }
    ]
  },
  {
    "id": "harvest",
    "kind": "vocal",
    "title": "Der Herr der Ernte",
    "cue": "36–38",
    "verificationStatus": "draft",
    "lanes": [
      {
        "voice": "Soprano solo + choir sopranos",
        "relationship": "solo",
        "lines": [
          "Der Herr der Ernte geht,",
          "und sammelt Garben"
        ]
      },
      {
        "voice": "Other choir parts",
        "relationship": "parallel",
        "lines": [
          "Der Herr der Ernte geht,",
          "uns ein, die starben!"
        ]
      }
    ]
  },
  {
    "id": "orchestral-transition-two",
    "kind": "instrumental",
    "title": "Orchestral interlude"
  },
  {
    "id": "glaube-contralto",
    "kind": "vocal",
    "title": "O glaube — contralto",
    "cue": "39–40",
    "verificationStatus": "draft",
    "lanes": [
      {
        "voice": "Contralto solo",
        "relationship": "solo",
        "lines": [
          "O glaube, mein Herz, o glaube:",
          "Es geht dir nichts verloren!",
          "Dein ist, dein, ja dein, was du gesehnt!",
          "Dein, was du geliebt, was du gestritten!"
        ]
      }
    ]
  },
  {
    "id": "glaube-soprano",
    "kind": "vocal",
    "title": "O glaube — soprano",
    "cue": "41",
    "verificationStatus": "draft",
    "lanes": [
      {
        "voice": "Soprano solo",
        "relationship": "solo",
        "lines": [
          "O glaube:",
          "Du wardst nicht umsonst geboren!",
          "Hast nicht umsonst gelebt, gelitten!"
        ]
      }
    ]
  },
  {
    "id": "vergehen",
    "kind": "vocal",
    "title": "Was entstanden ist",
    "cue": "42",
    "verificationStatus": "draft",
    "lanes": [
      {
        "voice": "Choir — lower voices",
        "relationship": "solo",
        "lines": [
          "Was entstanden ist, das muss vergehen!"
        ]
      },
      {
        "voice": "Choir — upper voices",
        "relationship": "relay",
        "lines": [
          "Was vergangen, auferstehen!"
        ]
      },
      {
        "voice": "Continuing choir parts",
        "relationship": "parallel",
        "lines": [
          "Was vergangen, auferstehen!"
        ]
      }
    ]
  },
  {
    "id": "hoer-auf",
    "kind": "vocal",
    "title": "Hör auf zu beben",
    "cue": "43",
    "verificationStatus": "draft",
    "lanes": [
      {
        "voice": "Choir — first entrance",
        "relationship": "solo",
        "lines": [
          "Hör auf zu beben!"
        ]
      },
      {
        "voice": "Choir — answering voices",
        "relationship": "relay",
        "lines": [
          "Hör auf zu beben!"
        ]
      },
      {
        "voice": "Choir — basses",
        "relationship": "parallel",
        "lines": [
          "Hör auf zu beben!",
          "Bereite dich!"
        ]
      }
    ]
  },
  {
    "id": "bereite",
    "kind": "vocal",
    "title": "Bereite dich, zu leben!",
    "cue": "43",
    "verificationStatus": "draft",
    "lanes": [
      {
        "voice": "Choir + Contralto solo",
        "relationship": "together",
        "lines": [
          "Bereite dich, zu leben!"
        ]
      }
    ]
  },
  {
    "id": "schmerz-tod",
    "kind": "vocal",
    "title": "O Schmerz! — O Tod!",
    "cue": "44",
    "verificationStatus": "draft",
    "lanes": [
      {
        "voice": "Contralto solo",
        "relationship": "solo",
        "lines": [
          "O Schmerz! Du Alldurchdringer!",
          "Dir bin ich entrungen!"
        ]
      },
      {
        "voice": "Soprano solo",
        "relationship": "relay",
        "lines": [
          "O Tod! Du Allbezwinger!",
          "Nun bist du bezwungen, bezwungen!"
        ]
      },
      {
        "voice": "Contralto solo",
        "relationship": "parallel",
        "lines": [
          "O Tod! Du Allbezwinger!",
          "Nun bist du bezwungen!"
        ]
      }
    ]
  },
  {
    "id": "wings-soloists",
    "kind": "vocal",
    "title": "Mit Flügeln — soloists",
    "cue": "45–46",
    "verificationStatus": "draft",
    "lanes": [
      {
        "voice": "Soprano solo",
        "relationship": "relay",
        "lines": [
          "Mit Flügeln, die ich mir errungen,",
          "in heißem Liebesstreben",
          "werd’ ich entschweben"
        ]
      },
      {
        "voice": "Contralto solo",
        "relationship": "parallel",
        "lines": [
          "Mit Flügeln, die ich mir errungen,",
          "In Liebesstreben",
          "werd’ ich entschweben"
        ]
      },
      {
        "voice": "Soprano solo + Contralto solo",
        "relationship": "together",
        "lines": [
          "zum Licht, zu dem kein Aug’ gedrungen!"
        ]
      }
    ]
  },
  {
    "id": "wings-choir",
    "kind": "vocal",
    "title": "Mit Flügeln — the choir builds",
    "cue": "46",
    "verificationStatus": "draft",
    "lanes": [
      {
        "voice": "Choir — basses",
        "relationship": "solo",
        "lines": [
          "Mit Flügeln, die ich mir errungen,",
          "werde ich entschweben!"
        ]
      },
      {
        "voice": "Choir — altos",
        "relationship": "relay",
        "lines": [
          "Mit Flügeln, die ich mir errungen,",
          "werde ich entschweben!",
          "Mit Flügeln, die ich mir errungen,",
          "werde ich, ja werde ich entschweben!"
        ]
      },
      {
        "voice": "Choir — tenors",
        "relationship": "relay",
        "lines": [
          "Mit Flügeln, die ich mir errungen,",
          "werde ich entschweben!",
          "Werd’ ich entschweben!"
        ]
      },
      {
        "voice": "Choir — sopranos",
        "relationship": "relay",
        "lines": [
          "Mit Flügeln, die ich mir errungen,",
          "werde ich entschweben, entschweben!"
        ]
      }
    ]
  },
  {
    "id": "sterben",
    "kind": "vocal",
    "title": "Sterben werd’ ich, um zu leben!",
    "cue": "47",
    "verificationStatus": "score-reviewed",
    "lanes": [
      {
        "voice": "Choir (SATB)",
        "relationship": "together",
        "lines": [
          "Sterben werd’ ich, um zu leben!",
          "Sterben werd’ ich, um zu leben!"
        ]
      }
    ]
  },
  {
    "id": "finale",
    "kind": "vocal",
    "title": "Aufersteh’n — final chorus",
    "cue": "48–49",
    "verificationStatus": "draft",
    "lanes": [
      {
        "voice": "Choir (SATB)",
        "relationship": "together",
        "lines": [
          "Aufersteh’n, ja aufersteh’n wirst du,",
          "mein Herz, in einem Nu!",
          "Was du geschlagen,",
          "was du geschlagen,",
          "zu Gott,",
          "zu Gott,",
          "zu Gott wird es dich tragen!"
        ]
      }
    ]
  },
  {
    "id": "orchestral-end",
    "kind": "instrumental",
    "title": "Orchestral conclusion"
  }
];

// English is a working translation, separate from the score-aligned German.
export const mahlerFinaleTranslations = {
  "Wird, der dich rief, dich rief, dir geben!": "Will give it to you, the one who called you, called you!",
  "Wird, der dich rief, dir geben!": "Will give it to you, the one who called you!",
  "Nun bist du bezwungen, bezwungen!": "Now you have been conquered, conquered!",
  "In Liebesstreben": "In striving born of love",
  "Werd’ ich entschweben!": "I shall soar away!",
  "werde ich entschweben, entschweben!": "I shall soar away, soar away!",
  "Aufersteh’n, ja aufersteh’n wirst du,": "Rise again, yes, you shall rise again,",
  "Mein Staub, nach kurzer Ruh!": "My dust, after a brief rest!",
  "Unsterblich Leben!": "Immortal life!",
  "Unsterblich Leben": "Immortal life",
  "wird, der dich rief, dich rief, dir geben!": "will be given to you by the one who called you, called you!",
  "Wieder aufzublüh’n wirst du gesät!": "You are sown to bloom again!",
  "Der Herr der Ernte geht,": "The Lord of the harvest goes forth,",
  "und sammelt Garben": "and gathers sheaves",
  "uns ein, die starben!": "of us who have died!",
  "O glaube, mein Herz, o glaube:": "Oh believe, my heart, oh believe:",
  "Es geht dir nichts verloren!": "Nothing is lost to you!",
  "Dein ist, dein, ja dein, was du gesehnt!": "Yours, yours, yes yours, is what you longed for!",
  "Dein, was du geliebt, was du gestritten!": "Yours is what you loved, what you fought for!",
  "O glaube:": "Oh believe:",
  "Du wardst nicht umsonst geboren!": "You were not born in vain!",
  "Hast nicht umsonst gelebt, gelitten!": "You have not lived and suffered in vain!",
  "Was entstanden ist, das muss vergehen!": "What has come into being must pass away!",
  "Was vergangen, auferstehen!": "What has passed away shall rise again!",
  "Hör auf zu beben!": "Cease your trembling!",
  "Bereite dich!": "Prepare yourself!",
  "Bereite dich, zu leben!": "Prepare yourself to live!",
  "O Schmerz! Du Alldurchdringer!": "Oh pain, you who pervade all things!",
  "Dir bin ich entrungen!": "I have broken free of you!",
  "O Tod! Du Allbezwinger!": "Oh death, you conqueror of all!",
  "Nun bist du bezwungen!": "Now you have been conquered!",
  "Mit Flügeln, die ich mir errungen,": "With wings I have won for myself,",
  "in heißem Liebesstreben": "in ardent striving born of love",
  "werd’ ich entschweben": "I shall soar away",
  "zum Licht, zu dem kein Aug’ gedrungen!": "to the light no eye has ever reached!",
  "werde ich entschweben!": "I shall soar away!",
  "werde ich, ja werde ich entschweben!": "I shall, yes I shall, soar away!",
  "Sterben werd’ ich, um zu leben!": "I shall die so that I may live!",
  "mein Herz, in einem Nu!": "my heart, in an instant!",
  "Was du geschlagen,": "What you have beaten for,",
  "was du geschlagen,": "what you have beaten for,",
  "zu Gott,": "to God,",
  "zu Gott wird es dich tragen!": "will carry you to God!"
};
