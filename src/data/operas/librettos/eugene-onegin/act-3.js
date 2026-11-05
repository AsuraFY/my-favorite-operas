// Independent English reading translation prepared from the historical Russian libretto.
// Reference: https://ru.wikisource.org/wiki/Евгений_Онегин_(опера)/Действие_третье
// The sourceLineCount/index fields count lines of THIS translation, not Opera Guide records.
// This is a first-pass translation: literary collation against the Russian original is pending.
function makeScene(number, heading, summary, items) {
  let cursor = 0;
  const sections = items.map(([title, dialogue]) => {
    const start = cursor;
    const turns = dialogue.map(([speaker, translation]) => {
      const sourceLineCount = translation.split('\n').length;
      const turn = {
        speaker, speakerTranslation: speaker, original: '',
        translation, literalText: true, sourceStartIndex: cursor, sourceLineCount,
        ...(speaker === 'Stage direction' ? { stageDirectionKind: 'extended' } : {})
      };
      cursor += sourceLineCount;
      return turn;
    });
    return { type:'Passage', incipitOnly:true, sourceTitlesOnly:true, threeLineOutline:true,
      originalTitle:'', translatedTitle:title, sourceStartIndex:start,
      sourceLineCount:cursor-start,
      participants:[...new Set(turns.map(t=>t.speaker).filter(s=>s!=='Stage direction'&&!s.includes(',')))],
      turns };
  });
  return {number, originalHeading:'', translatedHeading:heading, summary, sections};
}
export const oneginAct3Scenes = [
  makeScene(6, 'Scene 6 — A ball in Saint Petersburg', 'A ball at the home of a Petersburg dignitary; the encounter with Prince Gremin and Tatyana.', [
    ['No. 19 — Polonaise', [
      ['Stage direction', 'At a ball in the house of a dignitary in Saint Petersburg, the guests dance a polonaise. Onegin stands apart, looking on.']
    ]],
    ['No. 20 — Scene, écossaise and Gremin’s aria', [
      ['Onegin', `Even here I find no pleasure!
Neither the brilliance nor the commotion of high society
can drive away my unending, weary sadness.
I killed a friend in a duel.
I reached the age of twenty-six
without purpose, without honest work,
languishing in the emptiness of idle days:
no profession, no wife, no occupation;
nothing could hold my attention.
Restlessness seized me,
an urge to go from place to place—
a painful affliction,
a cross that few would choose to bear.
I abandoned my country estates,
the solitude of their woods and fields,
where every day I saw again
a blood-stained shadow before me.
I wandered without an aim,
following every passing feeling.
And what came of it? To my misery,
travel itself became tiresome!
So I returned, and like Chatsky,
stepped straight from a ship into a ballroom!`],
      ['Stage direction', 'The guests dance an écossaise. Onegin draws aside. Prince Gremin enters with Tatyana on his arm.'],
      ['Guests', 'Princess Gremina! Look—look!'],
      ['Stage direction', 'The company steps back respectfully to make way for Gremin and Tatyana.'],
      ['A group of men', 'Which one is she?'],
      ['Another group', 'Look over here!'],
      ['Ladies', 'The one who has just sat down by the table.'],
      ['Men', 'She is lovely in her unstudied grace!'],
      ['Onegin', `Could it be Tatyana? Yes ... no!
From the wilderness of those distant villages?
Impossible! It cannot be!
How natural she seems, how majestic,
how entirely unselfconscious—
she looks like a queen!`],
      ['Stage direction', 'Onegin takes Gremin aside.'],
      ['Tatyana', 'Tell me, who is that man beside my husband? I cannot see him clearly.'],
      ['Guests', `An eccentric of society,
a melancholy, strange and whimsical fellow.
He has been travelling abroad;
now Onegin has returned to us!`],
      ['Tatyana', 'Eugene?'],
      ['Guests', 'Do you know him?'],
      ['Tatyana', `He was our neighbour in the country.
[Aside] Oh God, help me conceal
this dreadful turmoil in my heart!`],
      ['Onegin', `Prince, tell me—do you know
that lady in a crimson beret
who is speaking to the Spanish ambassador?`],
      ['Gremin', 'Ah, you have been away from society for a long time! Come, let me introduce you.'],
      ['Onegin', 'But who is she?'],
      ['Gremin', 'My wife!'],
      ['Onegin', 'You are married? I had no idea! How long ago?'],
      ['Gremin', 'About two years.'],
      ['Onegin', 'To whom?'],
      ['Gremin', 'To a Larina ...'],
      ['Onegin', 'Tatyana!'],
      ['Gremin', 'You know her?'],
      ['Onegin', 'I was their neighbour.'],
      ['Gremin', `Love has power over every age,
and its impulses bring blessing
both to a young man in his prime,
who has scarcely entered life,
and to a grey-haired soldier
hardened by all that fate has dealt him.
Onegin, I shall not hide it:
I love Tatyana beyond all reason!
My life had passed in dreariness;
she came and, like a shaft of sun in a storm,
brought me life and youth again—
yes, youth and happiness!

Among the false and faint of heart,
the spoiled and thoughtless children,
the petty villains, foolish and wearisome,
the dull and importunate judges;
among the pious coquettes,
the people who willingly make themselves servants,
the daily parade of fashionable scenes,
the polite and smiling betrayals,
the cold judgments of a heartless world,
and the weary emptiness
of calculation, talk and empty thought—
there she shines like a star
in the pure heavens of a dark night.
She always appears to me
in the radiant light of an angel.

Love has power over every age,
and its impulses bring blessing
both to a young man in his prime
and to a grey-haired soldier
hardened by fate!
Onegin, I shall not hide it:
I love Tatyana beyond all reason.
My life had passed in dreariness;
she came, like sunlight amid the storm,
and gave me life and youth again,
yes, youth and happiness—
life, youth and happiness!

Come along, then; I shall introduce you.`],
      ['Stage direction', 'Gremin leads Onegin towards Tatyana.']
    ]],
    ['No. 21 — Scene, Onegin’s arioso and écossaise', [
      ['Gremin', 'My dear, allow me to introduce a kinsman and friend of mine: Onegin!'],
      ['Stage direction', 'Onegin bows.'],
      ['Tatyana', 'I am very pleased. We have met before.'],
      ['Onegin', 'In the country ... yes ... a long time ago.'],
      ['Tatyana', 'Where have you come from? Surely not from our part of the country?'],
      ['Onegin', 'Oh no. I have returned from distant travels.'],
      ['Tatyana', 'And have you been back long?'],
      ['Onegin', 'Only today.'],
      ['Tatyana', 'My dear, I am tired.'],
      ['Stage direction', 'Tatyana leaves on Gremin’s arm. Onegin follows her with his eyes.'],
      ['Onegin', `Can this really be that same Tatyana
to whom, alone in that remote countryside,
I once delivered a lecture
in my well-meaning zeal to teach?
That girl whose humble lot
I had so little regard for?
Was it she who stood before me
so composed, so fearless, so indifferent?
But what is happening to me?
I seem to be dreaming!
What has stirred in the depths
of my indolent, cold heart?
Vexation, vanity—or once again
that torment of youth, love?
Alas, there can be no doubt:
I am in love, as recklessly
as any boy in the first heat of passion!
Let me perish if I must, but first
I shall surrender to blinding hope,
taste the enchanted poison of desire
and lose myself in a dream that cannot come true.
Everywhere, everywhere before me
stands her dear, longed-for image;
everywhere she stands before me!`],
      ['Stage direction', 'Onegin hurries away. The guests continue dancing the écossaise.']
    ]]
  ]),
  makeScene(7, 'Scene 7 — Tatyana’s room', 'In Prince Gremin’s home, Tatyana reads Onegin’s letter and confronts him.', [
    ['No. 22 — Final scene', [
      ['Stage direction', 'A room in Prince Gremin’s house. Tatyana is reading Onegin’s letter.'],
      ['Tatyana', `Oh, how heavily this weighs on me!
Once again Onegin has crossed my path
like a pitiless spectre.
His burning glance has shaken my soul;
he has rekindled a passion long suppressed,
as though I had become a young girl once more,
as though nothing had ever separated us!`],
      ['Stage direction', 'Onegin enters. Seeing Tatyana, he hastens towards her and falls to his knees.'],
      ['Tatyana', `Enough. Stand up; I must
speak openly with you.
Onegin, do you remember that hour
when fate brought us together in the garden,
among the paths, and I listened so humbly
to the lesson you gave me?`],
      ['Onegin', 'Have mercy on me, have mercy! I was so mistaken, and I have been so severely punished!'],
      ['Tatyana', `Onegin! I was younger then,
and perhaps a better person than I am now.
I loved you. But what did I find
within your heart? What answer did you give?
Only severity!
A shy young girl’s love
was hardly something new to you.
And now ... God, my blood runs cold
whenever I remember that distant look
and that sermon!
Yet I do not blame you.
In that dreadful hour you acted honourably;
you were fair towards me.

Then, in the wilderness,
far from society’s noisy gossip,
you had no liking for me.
Why, then, do you pursue me now?
Why have I attracted your notice?
Is it because I now appear in the highest circles,
because I have wealth and rank,
because my husband was wounded in battle
and the court shows us its favour?
Is it because my disgrace
would now be plain for everyone to see,
and could bring you the tantalizing glory
of a public scandal?`],
      ['Onegin', `Ah, God! Can your cold gaze
see nothing in my humble pleading
but a contemptible scheme of deceit?
Your reproaches torment me!
If only you knew how terrible it is
to ache with longing for love,
to burn, while every hour the mind
must hold back the tumult of the blood;
to yearn to clasp your knees,
to weep aloud at your feet,
to pour out prayers and confessions and regrets—
everything the heart could ever express!`],
      ['Tatyana', 'I am crying!'],
      ['Onegin', 'Then weep. Those tears are worth more than every treasure in the world!'],
      ['Tatyana', 'Oh, happiness was so possible, so near—so very near!'],
      ['Tatyana, Onegin', 'Happiness was so possible, so near, so very near—near!'],
      ['Tatyana', `But my fate has already been decided,
and that decision cannot be undone.
I am married. You must—
I beg you—leave me!`],
      ['Onegin', `Leave you? Leave you?
How could I leave you?
No, no!
To see you at every moment,
to follow you wherever you go,
to catch each smile upon your lips,
each movement of your eyes, with a lover’s gaze;
to listen to you for long hours,
to understand with my whole soul
all that is perfect in you;
to grow faint before you in passionate agony,
to turn pale and fade away—
that is bliss!
That is my single dream, my only bliss!`],
      ['Tatyana', 'Onegin, there is pride in your heart, and there is true honour too!'],
      ['Onegin', 'I cannot leave you!'],
      ['Tatyana', 'Eugene, you must. I beg you to leave me.'],
      ['Onegin', 'Have mercy!'],
      ['Tatyana', 'Why should I conceal it? Why pretend? I love you!'],
      ['Onegin', `What do I hear?
What words have you spoken?
Oh joy! My life!
You have become the Tatyana I once knew!`],
      ['Tatyana', `No, no!
The past cannot be brought back!
I belong to another now;
my fate is settled.
I shall remain faithful to him all my life.`],
      ['Onegin', `Do not drive me away—you love me!
And I shall never abandon you.
You will waste your life for nothing!
Heaven itself has willed it: you are mine!
Your whole life was a promise
that you would be joined to me!
Know this: God sent me to you,
to be your protector until the grave!
You cannot reject me.
For me you must leave
that hateful home and noisy world.
There is no other path for you!`],
      ['Tatyana', 'Onegin, my resolve will not falter ...'],
      ['Onegin', 'No, you cannot reject me ...'],
      ['Tatyana', 'Fate has given me to another ... I shall live beside him and never leave him.'],
      ['Onegin', `For me you must abandon everything,
everything—the hateful house and the world’s clamour.
There is no other way!
Do not cast me off, I implore you!
You love me;
you will only destroy your life in vain!
You are mine, forever mine!`],
      ['Tatyana', `No, I must remember my vows!
[Aside] His desperate appeal
cuts deep into my heart,
but I shall master this forbidden passion.
The stern and sacred duty of honour
must triumph over feeling!`],
      ['Tatyana', 'I am going.'],
      ['Onegin', 'No! No, no, no!'],
      ['Tatyana', 'Enough!'],
      ['Onegin', 'I beg you—do not go!'],
      ['Tatyana', 'No. I shall stand firm.'],
      ['Onegin', 'I love you, I love you!'],
      ['Tatyana', 'Leave me!'],
      ['Onegin', 'I love you!'],
      ['Tatyana', 'Farewell, forever!'],
      ['Stage direction', 'Tatyana leaves.'],
      ['Onegin', 'Shame! ... Despair! ... Oh, what a wretched fate is mine!']
    ]]
  ])
];

// Re-index every translated passage sequentially across both tableaux in Act III.
// The page index is now local to the independent reading translation (not Opera Guide).
{
  let index=0;
  for(const scene of oneginAct3Scenes){
    for(const section of scene.sections){
      const first=index;
      for(const turn of section.turns){
        turn.sourceStartIndex=index;
        turn.sourceLineCount=turn.translation.split('\\n').length;
        index+=turn.sourceLineCount;
      }
      section.sourceStartIndex=first;
      section.sourceLineCount=index-first;
    }
  }
}
