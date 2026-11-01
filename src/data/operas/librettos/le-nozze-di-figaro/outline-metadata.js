// Editorial navigation incipits checked against Opera Guide, 21 October 2026.
// Original lyrics, source numbering, scenes and route IDs remain unchanged.
const titles = {
  "1:1:4": {
    "original": "Ouverture",
    "translation": "Overture"
  },
  "1:1:0": {
    "original": "Cinque... dieci... venti... trenta...",
    "translation": "Five... ten... twenty... thirty..."
  },
  "1:1:1": {
    "original": "Cosa stai misurando, caro il mio Figaretto?",
    "translation": "What are you measuring, my dear Figaro?"
  },
  "1:1:2": {
    "original": "Se a caso madama",
    "translation": "If by chance my lady"
  },
  "1:1:3": {
    "original": "Or bene; ascolta, e taci!",
    "translation": "Very well; listen, and be silent!"
  },
  "1:2:0": {
    "original": "Bravo, signor padrone!",
    "translation": "Bravo, master!"
  },
  "1:2:1": {
    "original": "Se vuol ballare, signor Contino",
    "translation": "If you wish to dance, my little Count"
  },
  "1:3:0": {
    "original": "Ed aspettaste il giorno",
    "translation": "And you waited until the day"
  },
  "1:3:1": {
    "original": "La vendetta, oh, la vendetta!",
    "translation": "Revenge, oh, revenge!"
  },
  "1:4:0": {
    "original": "Tutto ancor non ho perso",
    "translation": "I have not yet lost everything"
  },
  "1:4:1": {
    "original": "Via resti servita",
    "translation": "Pray, after you"
  },
  "1:5:0": {
    "original": "Va’ là, vecchia pedante",
    "translation": "Away with you, old pedant"
  },
  "1:5:1": {
    "original": "Non so più cosa son, cosa faccio",
    "translation": "I no longer know what I am, what I do"
  },
  "1:6:0": {
    "original": "Ah, son perduto!",
    "translation": "Ah, I am lost!"
  },
  "1:7:0": {
    "original": "Susanna, il ciel vi salvi",
    "translation": "Susanna, heaven keep you"
  },
  "1:7:1": {
    "original": "Cosa sento!",
    "translation": "What do I hear!"
  },
  "1:7:2": {
    "original": "Basilio, in traccia tosto di Figaro volate",
    "translation": "Basilio, hurry at once in search of Figaro"
  },
  "1:8:0": {
    "original": "Giovani liete",
    "translation": "Happy young women"
  },
  "1:8:1": {
    "original": "Cos’è questa commedia?",
    "translation": "What is this comedy?"
  },
  "1:8:2": {
    "original": "Giovani liete",
    "translation": "Happy young women"
  },
  "1:8:3": {
    "original": "Evviva!",
    "translation": "Long live him!"
  },
  "1:8:4": {
    "original": "Non più andrai, farfallone amoroso",
    "translation": "You will roam no more, amorous butterfly"
  },
  "2:1:0": {
    "original": "Porgi, amor, qualche ristoro",
    "translation": "Love, grant some comfort"
  },
  "2:1:1": {
    "original": "Vieni, cara Susanna",
    "translation": "Come, dear Susanna"
  },
  "2:2:0": {
    "original": "Quanto duolmi, Susanna",
    "translation": "How it grieves me, Susanna"
  },
  "2:2:1": {
    "original": "Voi che sapete",
    "translation": "You who know"
  },
  "2:2:2": {
    "original": "Bravo! Che bella voce!",
    "translation": "Bravo! What a beautiful voice!"
  },
  "2:2:3": {
    "original": "Venite, inginocchiatevi",
    "translation": "Come, kneel down"
  },
  "2:2:4": {
    "original": "Quante buffonerie!",
    "translation": "What nonsense!"
  },
  "2:3:0": {
    "original": "Che novità!",
    "translation": "What is this!"
  },
  "2:3:1": {
    "original": "Susanna, or via, sortite",
    "translation": "Susanna, come now, come out"
  },
  "2:3:2": {
    "original": "Dunque voi non aprite?",
    "translation": "So you will not open it?"
  },
  "2:4:0": {
    "original": "Aprite, presto, aprite",
    "translation": "Open, quickly, open"
  },
  "2:4:1": {
    "original": "Oh, guarda il demonietto!",
    "translation": "Oh, look at the little devil!"
  },
  "2:5:0": {
    "original": "Tutto è come il lasciai",
    "translation": "Everything is as I left it"
  },
  "2:6:0": {
    "original": "Esci omai, garzon malnato",
    "translation": "Come out now, wretched boy"
  },
  "2:7:0": {
    "original": "Susanna!",
    "translation": "Susanna!"
  },
  "2:8:0": {
    "original": "Susanna, son morta",
    "translation": "Susanna, I am undone"
  },
  "2:9:0": {
    "original": "Signori, di fuori",
    "translation": "My lord and lady, outside"
  },
  "2:10:0": {
    "original": "Ah, signor... signor...",
    "translation": "Ah, my lord... my lord..."
  },
  "2:11:0": {
    "original": "Voi signor, che giusto siete",
    "translation": "My lord, who are just"
  },
  "3:1:1": {
    "original": "Che imbarazzo è mai questo!",
    "translation": "What a perplexing business this is!"
  },
  "3:2:0": {
    "original": "Via, fatti core",
    "translation": "Come, take courage"
  },
  "3:2:1": {
    "original": "Crudel! Perché finora",
    "translation": "Cruel girl! Why until now"
  },
  "3:2:2": {
    "original": "E perché fosti meco stamattina sì austera?",
    "translation": "And why were you so cold to me this morning?"
  },
  "3:3:0": {
    "original": "Ehi, Susanna, ove vai?",
    "translation": "Hey, Susanna, where are you going?"
  },
  "3:4:1": {
    "original": "Hai già vinta la causa! / Vedrò mentre io sospiro",
    "translation": "You have already won your case! / Shall I see, while I sigh"
  },
  "3:5:1": {
    "original": "È decisa la lite",
    "translation": "The case is decided"
  },
  "3:5:2": {
    "original": "Riconosci in questo amplesso",
    "translation": "Recognize in this embrace"
  },
  "3:6:1": {
    "original": "Eccovi, oh caro amico, il dolce frutto",
    "translation": "Here, dear friend, is the sweet fruit"
  },
  "3:7:1": {
    "original": "Andiam, andiam, bel paggio",
    "translation": "Come, come, handsome page"
  },
  "3:8:1": {
    "original": "E Susanna non vien! / Dove sono i bei momenti",
    "translation": "And Susanna has not come! / Where are those happy moments"
  },
  "3:9:1": {
    "original": "Io vi dico, signor, che Cherubino",
    "translation": "I tell you, my lord, that Cherubino"
  },
  "3:10:1": {
    "original": "Cosa mi narri, e che ne disse il Conte?",
    "translation": "What are you telling me, and what did the Count say?"
  },
  "3:10:2": {
    "original": "Sull’aria...",
    "translation": "On the breeze..."
  },
  "3:10:3": {
    "original": "Piegato è il foglio... or come si sigilla?",
    "translation": "The letter is folded... now how shall we seal it?"
  },
  "3:11:1": {
    "original": "Ricevete, oh padroncina",
    "translation": "Accept, dear mistress"
  },
  "3:11:2": {
    "original": "Queste sono, madama",
    "translation": "These, my lady, are"
  },
  "3:12:0": {
    "original": "Ehi! Cospettaccio! È questi l’uffiziale",
    "translation": "Hey! Good heavens! Here is the officer"
  },
  "3:13:0": {
    "original": "Signor... se trattenete",
    "translation": "My lord... if you detain"
  },
  "3:13:1": {
    "original": "Ecco la marcia, andiamo",
    "translation": "Here is the march; let us go"
  },
  "3:14:0": {
    "original": "Amanti costanti",
    "translation": "Faithful lovers"
  },
  "4:1:1": {
    "original": "L’ho perduta... me meschina...",
    "translation": "I have lost it... poor me..."
  },
  "4:2:1": {
    "original": "Barbarina, cos’hai?",
    "translation": "Barbarina, what is wrong?"
  },
  "4:3:0": {
    "original": "Madre!",
    "translation": "Mother!"
  },
  "4:4:1": {
    "original": "Presto avvertiam Susanna",
    "translation": "Let us warn Susanna at once"
  },
  "4:4:2": {
    "original": "Il capro e la capretta",
    "translation": "The he-goat and the she-goat"
  },
  "4:5:1": {
    "original": "Nel padiglione a manca",
    "translation": "In the pavilion on the left"
  },
  "4:6:0": {
    "original": "È Barbarina... chi va là?",
    "translation": "It is Barbarina... who goes there?"
  },
  "4:7:0": {
    "original": "Ha i diavoli nel corpo",
    "translation": "He has devils in him"
  },
  "4:7:1": {
    "original": "In quegl’anni, in cui val poco la mal pratica ragion",
    "translation": "In those years when inexperienced reason counts for little"
  },
  "4:8:1": {
    "original": "Tutto è disposto / Aprite un po’ quegl’occhi",
    "translation": "Everything is ready / Open your eyes a little"
  },
  "4:9:1": {
    "original": "Signora, ella mi disse",
    "translation": "My lady, she told me"
  },
  "4:10:0": {
    "original": "Madama, voi tremate; avreste freddo?",
    "translation": "My lady, you are trembling; are you cold?"
  },
  "4:10:1": {
    "original": "Giunse alfin il momento / Deh, vieni, non tardar",
    "translation": "At last the moment has come / Ah, come, do not delay"
  },
  "4:11:1": {
    "original": "Perfida, e in quella forma",
    "translation": "Faithless woman! And in that way"
  },
  "4:11:2": {
    "original": "Pian pianin le andrò più presso",
    "translation": "Very softly I shall draw nearer to her"
  },
  "4:12:0": {
    "original": "Ecco qui la mia Susanna!",
    "translation": "Here is my Susanna!"
  },
  "4:13:0": {
    "original": "Tutto è tranquillo e placido",
    "translation": "Everything is quiet and peaceful"
  },
  "4:14:0": {
    "original": "Pace, pace, mio dolce tesoro",
    "translation": "Peace, peace, my sweet treasure"
  },
  "4:15:0": {
    "original": "Gente, gente, all’armi, all’armi!",
    "translation": "Everyone, everyone, to arms, to arms!"
  }
};

export function applyFigaroOutlineMetadata(acts) {
  const roman = ["","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV"];
  for (const act of acts) {
    let finaleNumber;
    for (const scene of act.scenes) {
      scene.originalHeading = "Scena " + roman[scene.number];
      scene.translatedHeading = "Scene " + roman[scene.number];
      for (const [index, section] of scene.sections.entries()) {
        const title = titles[act.number + ":" + scene.number + ":" + (section.routeItem ?? index)];
        section.originalTitle = title.original;
        section.translatedTitle = title.translation;
        section.threeLineOutline = true;
        if (section.type === "Finale") {
          if (section.number != null) finaleNumber = section.number;
          section.outlineNumber = finaleNumber;
        }
        if (section.instrumental && section.type === section.originalTitle) {
          section.originalTitle = "";
        }
      }
    }
  }
}
