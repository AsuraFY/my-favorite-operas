// Outline metadata only. Existing sung text, turns, scenes and anchors are preserved.
// Sources consulted 13 October 2026: Librettidopera.it index of musical numbers
// and incipits; Teatro alla Scala 2024–25 libretto, PDF pp. 2–41.
// Existing scene labels are editorial navigation cues, not formal source scene titles.
const translations = {
  "La mia Dorabella capace non è": "My Dorabella is not capable of it",
  "È la fede delle femmine": "A woman’s faith",
  "Una bella serenata": "A lovely serenade",
  "Ah, guarda, sorella": "Ah, look, sister",
  "Vorrei dir, e cor non ho": "I would speak, but lack the heart",
  "Sento, oddio, che questo piede": "I feel, oh heavens, that this foot",
  "Al fato dan legge": "They lay down the law to fate",
  "Bella vita militar!": "What a fine soldier’s life!",
  "Di scrivermi ogni giorno": "To write to me every day",
  "Soave sia il vento": "May the wind be gentle",
  "Non son cattivo comico!": "I am not a bad actor!",
  "Che vita maledetta": "What a wretched life",
  "Smanie implacabili": "Relentless torments",
  "In uomini, in soldati": "In men, in soldiers",
  "Che silenzio!": "What silence!",
  "Alla bella Despinetta": "To lovely little Despina",
  "Come scoglio immoto resta": "Like a rock that stands unmoved",
  "Non siate ritrosi": "Do not be shy",
  "E voi ridete?": "And you laugh?",
  "Un’aura amorosa": "A loving breeze",
  "Un'aura amorosa": "A loving breeze",
  "E voi ridete? / Un'aura amorosa": "And you laugh? / A loving breeze",
  "Oh, la faria da ridere": "Oh, that would be something to laugh at",
  "Ah, che tutta in un momento": "Ah, that in a single moment",
  "Si mora, sì, si mora": "Let us die, yes, let us die",
  "Eccovi il medico": "Here is the doctor",
  "Eccovi il medico / Dove son?": "Here is the doctor / Where am I?",
  "Una donna a quindici anni": "A woman of fifteen",
  "Prenderò quel brunettino": "I will take that dark-haired one",
  "Ah, correte al giardino": "Ah, hurry to the garden",
  "Secondate, aurette amiche": "Help us, friendly breezes",
  "La mano a me date": "Give me your hand",
  "Secondate, aurette amiche / La mano a me date": "Help us, friendly breezes / Give me your hand",
  "Il core vi dono": "I give you my heart",
  "Ah, lo veggio, quell'anima bella": "Ah, I see it, that beautiful soul",
  "Per pietà, ben mio, perdona": "For pity’s sake, my love, forgive me",
  "Donne mie, la fate a tanti": "My ladies, you do it to so many",
  "Tradito, schernito": "Betrayed, mocked",
  "È amore un ladroncello": "Love is a little thief",
  "Come tutto congiura": "How everything conspires",
  "Fra gli amplessi in pochi istanti": "In your embrace, in a few moments",
  "Tutti accusan le donne": "Everyone accuses women",
  "Tutti accusan le donne, ed io le scuso": "Everyone accuses women, and I excuse them",
  "Vittoria, padroncini!": "Victory, my young masters!",
  "Fate presto, o cari amici": "Hurry, dear friends",
  "Benedetti i doppi coniugi": "Blessed be the two married couples",
  "Miei signori, tutto è fatto": "Gentlemen, everything is done",
  "Fortunato l'uom che prende": "Fortunate is the man who takes",
  "Sani e salvi, agli amplessi amorosi": "Safe and sound, to loving embraces"
};
const titles = [
  "La mia Dorabella capace non è",
  "È la fede delle femmine",
  "Una bella serenata",
  "Ah, guarda, sorella",
  "Vorrei dir, e cor non ho",
  "Sento, oddio, che questo piede",
  "Al fato dan legge",
  "Bella vita militar!",
  "Di scrivermi ogni giorno",
  "Soave sia il vento",
  "Smanie implacabili",
  "In uomini, in soldati",
  "Alla bella Despinetta",
  "Come scoglio immoto resta",
  "Non siate ritrosi",
  "E voi ridete?",
  "Un'aura amorosa",
  "Ah, che tutta in un momento",
  "Una donna a quindici anni",
  "Prenderò quel brunettino",
  "Secondate, aurette amiche",
  "La mano a me date",
  "Il core vi dono",
  "Ah, lo veggio, quell'anima bella",
  "Per pietà, ben mio, perdona",
  "Donne mie, la fate a tanti",
  "Tradito, schernito",
  "È amore un ladroncello",
  "Fra gli amplessi in pochi istanti",
  "Tutti accusan le donne, ed io le scuso",
  "Fate presto, o cari amici"
];
export function applyCosiOutlineMetadata(acts) {
  for (const act of acts) for (const scene of act.scenes) {
    scene.translatedTitle = translations[scene.title];
    for (const section of scene.sections) {
      const match = section.label?.match(/^No\. (\d+) — (.+)$/);
      if (!match) continue;
      const number = Number(match[1]);
      section.type = match[2].replace(/ \(.*\)$/, "");
      section.number = number;
      let title = titles[number - 1];
      if (number === 18 && scene.number === 15) title = 'Si mora, sì, si mora';
      if (number === 18 && scene.number === 16) title = 'Eccovi il medico';
      if (number === 31 && scene.number === 16) title = 'Benedetti i doppi coniugi';
      if (number === 31 && scene.number === 17) title = 'Miei signori, tutto è fatto';
      if (number === 31 && scene.number === 18) title = 'Sani e salvi, agli amplessi amorosi';
      section.originalTitle = title;
      section.translatedTitle = translations[title];
    }
  }
}
