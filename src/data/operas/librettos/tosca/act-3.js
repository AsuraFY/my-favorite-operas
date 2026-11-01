// Italian text and four scene divisions follow Opera Guide's Italian libretto.
// English and dialogue reviewed against the Italian source on 20 October 2026.
const lyric = (speaker, original, translation) => ({ speaker, original, translation, literalText: true });
const direction = (original, translation) => lyric("Stage direction", original, translation);
const cue = (original, translation) => ({ ...direction(original, translation), shortCue: true, bracketStageDirection: true });

export const toscaActThreeScenes = [
  {
    number: 1,
    sections: [{ type: "Scena", originalTitle: "Scena prima", translatedTitle: "Scene One", participants: ["A Shepherd (offstage)", "Jailer", "Sentinel", "Sergeant", "Cavaradossi", "Soldiers"], turns: [
      direction("La piattaforma di Castel Sant'Angelo. A sinistra, una casamatta: vi è collocata una tavola, sulla quale stanno una lampada, un grosso registro e l'occorrente per scrivere: una panca, una sedia. Su di una parete della casamatta un crocifisso: davanti a questo è appesa una lampada. A destra, l'apertura di una piccola scala per la quale si ascende alla piattaforma. Nel fondo il Vaticano e San Pietro. Notte - Cielo sereno, scintillante di stelle. Si odono, lontane, le campanelle d'un armento: di mano in mano vanno sempre più affievolendosi.", "The platform of Castel Sant'Angelo. At left is a casemate with a table holding a lamp, a large register, and writing materials; there is a bench and a chair. A crucifix hangs on one wall, with a lamp before it. At right is the opening of a small stairway leading up to the platform. The Vatican and St Peter's are seen in the distance. Night: the sky is clear and sparkling with stars. Bells from a distant flock can be heard, growing fainter and fainter."),
      lyric("A Shepherd (offstage)", "Io de' sospiri.\nVe ne rimanno tanti\nPe' quante foje\nNe smoveno li venti.\nTu me disprezzi.\nIo me ci accoro,\nLampene d'oro\nMe fai morir!", "Of sighs\nI send you as many\nas there are leaves\nstirred by the winds.\nYou scorn me.\nI pine away;\nyou golden lantern,\nyou make me die!"),
      direction("La luce incerta e grigia che precede l'alba: le campane delle chiese suonano mattutino. Un Carceriere con una lanterna sale dalla scala, va alla casamatta e vi accende la lampada sospesa davanti al crocifisso, poi quella sulla tavola. Poi va in fondo alla piattaforma e guarda giù nel cortile sottostante per vedere se giunge il picchetto dei soldati, col condannato. Si incontra con una sentinella che percorre tutt'all'intorno la piattaforma e scambiate colla stessa alcune parole, ritorna alla casamatta, siede ed aspetta mezzo assonnato.", "The uncertain gray light before dawn appears, and church bells ring for matins. A Jailer climbs the stairs with a lantern, enters the casemate, and lights the lamp before the crucifix, then the one on the table. He goes to the far end of the platform and looks down into the courtyard for the squad bringing the condemned man. He meets a Sentinel patrolling the platform; after a few words, he returns to the casemate, sits, and waits, half asleep."),
      direction("Più tardi un picchetto, comandato da un Sergente di guardia, sale sulla piattaforma accompagnando Cavaradossi: il picchetto si arresta e il Sergente conduce Cavaradossi nella casamatta, consegnando un foglio al Carceriere. Il Carceriere esamina il foglio, apre il registro e vi scrive mentre interroga:", "Later, a squad led by a Sergeant climbs onto the platform with Cavaradossi. The squad halts; the Sergeant takes Cavaradossi into the casemate and hands a paper to the Jailer. The Jailer examines it, opens the register, and writes as he questions him:")
    ]}]
  },
  {
    number: 2,
    sections: [{ type: "Scena", originalTitle: "Scena seconda", translatedTitle: "Scene Two", participants: ["Jailer", "Cavaradossi", "Sergeant", "Soldiers", "Spoletta", "A Shepherd (offstage)", "Tosca"], turns: [
      lyric("Jailer", "Mario Cavaradossi?", "Mario Cavaradossi?"),
      direction("Cavaradossi china il capo, assentendo. Il Carceriere porge la penna al Sergente.", "Cavaradossi nods. The Jailer hands the pen to the Sergeant."),
      lyric("Jailer", "A voi.", "Here you are."),
      direction("Il Sergente firma il registro, poi parte coi soldati, scendendo per la scala.", "The Sergeant signs the register, then leaves with the soldiers, going down the stairs."),
      lyric("Jailer", "Vi resta un'ora...\nUn sacerdote i vostri cenni attende.", "You have one hour left...\nA priest awaits your summons."),
      lyric("Cavaradossi", "No! Ma un'ultima grazia\nio vi richiedo...", "No! But I ask one last favor\nof you..."),
      lyric("Jailer", "Se posso...", "If I can..."),
      lyric("Cavaradossi", "Io lascio al mondo\nuna persona cara. Consentite\nch'io le scriva un sol motto.", "I leave behind in this world\nsomeone dear. Allow me\nto write her just a few words."),
      cue("Cavaradossi si toglie dal dito un anello.", "Cavaradossi removes a ring from his finger."),
      lyric("Cavaradossi", "Unico resto di mia ricchezza è\nquesto anel!...\nSe promettete di consegnarle il mio\nultimo addio,\nesso è vostro...", "This ring is the only thing\nI have left...\nIf you promise to deliver\nmy final farewell to her,\nit is yours..."),
      direction("Il Carceriere tituba un poco, poi accetta e facendo cenno a Cavaradossi di sedere alla tavola, va a sedere sulla panca.", "The Jailer hesitates, then accepts. He gestures for Cavaradossi to sit at the table and takes a seat on the bench."),
      lyric("Jailer", "Scrivete...", "Write..."),
      direction("Cavaradossi rimane alquanto pensieroso, quindi si mette a scrivere... ma dopo tracciate alcune linee è invaso dalle rimembranze, e si arresta dallo scrivere.", "Cavaradossi sits lost in thought, then begins to write. After a few lines, memories flood over him and he stops."),
      lyric("Cavaradossi", "E lucevan le stelle...\ned olezzava la terra...\nstridea l'uscio dell'orto...\ne un passo sfiorava la rena...\nEntrava ella, fragrante,\nmi cadea fra le braccia...\nOh! dolci baci, o languide carezze,\nmentr'io fremente\nle belle forme disciogliea dai veli!\nSvanì per sempre il sogno mio d'amore...\nL'ora è fuggita...\nE muoio disperato!\nE non ho amato mai tanto la vita!...", "And the stars were shining...\nand the earth was fragrant...\nthe garden gate creaked...\nand a footstep brushed the sand...\nShe entered, fragrant,\nand fell into my arms...\nOh, sweet kisses, oh, languid caresses,\nwhile I, trembling,\nunveiled her lovely form!\nMy dream of love has vanished forever...\nThe hour has fled...\nAnd I die in despair!\nAnd never have I loved life so much!..."),
      direction("Cavaradossi scoppia in singhiozzi, coprendosi il volto colle mani. Dalla scala viene Spoletta, accompagnato dal Sergente e seguito da Tosca: il Sergente porta una lanterna. Spoletta accenna a Tosca ove trovasi Cavaradossi, poi chiama a sé il Carceriere: con questi e col Sergente ridiscende, non senza aver prima dato ad una sentinella, che sta in fondo, l'ordine di sorvegliare il prigioniero.", "Cavaradossi breaks into sobs and covers his face with his hands. Spoletta comes up the stairs with the Sergeant, followed by Tosca; the Sergeant carries a lantern. Spoletta points Tosca toward Cavaradossi, then summons the Jailer. He goes back down with the Jailer and Sergeant, first ordering a Sentinel at the far end to watch the prisoner.")
    ]}]
  },
  {
    number: 3,
    sections: [{ type: "Scena", originalTitle: "Scena terza", translatedTitle: "Scene Three", participants: ["Tosca", "Cavaradossi", "Spoletta", "Sergeant", "Jailer", "Sentinel"], turns: [
      direction("Tosca che in questo frattempo è rimasta agitatissima, vede Cavaradossi che piange: si slancia presso a lui, e non potendo parlare per la grande emozione gli solleva con le due mani la testa, presentandogli in pari tempo il salvacondotto: Cavaradossi, alla vista di Tosca, balza in piedi sorpreso, legge il foglio che gli presenta Tosca.", "Tosca, still trembling with agitation, sees Cavaradossi weeping. She rushes to him and, too overcome to speak, lifts his head with both hands while showing him the safe-conduct. At the sight of Tosca, Cavaradossi jumps up in surprise and reads the paper she gives him."),
      lyric("Cavaradossi", "Franchigia a Floria Tosca...\n... e al cavaliere che l'accompagna.", "Safe passage for Floria Tosca...\n...and for the gentleman accompanying her."),
      lyric("Tosca", "... e al cavaliere che l'accompagna.\nSei libero!", "...and for the gentleman accompanying her.\nYou are free!"),
      cue("Cavaradossi guarda il foglio; ne vede la firma.", "Cavaradossi looks at the paper and sees the signature."),
      lyric("Cavaradossi", "Scarpia!...\nScarpia che cede? La prima\nsua grazia è questa...", "Scarpia!...\nScarpia gives in? This is\nhis first act of mercy..."),
      lyric("Tosca", "E l'ultima!", "And his last!"),
      direction("Tosca riprende il salvacondotto e lo ripone in una borsa.", "Tosca takes back the safe-conduct and puts it in a purse."),
      lyric("Cavaradossi", "Che dici?", "What do you mean?"),
      lyric("Tosca", "Il tuo sangue o il mio amore\nvolea... Fur vani scongiuri e pianti.\nInvano, pazza d'orror,\nalla Madonna mi volsi e ai Santi...\nL'empio mostro dicea: già nei\ncieli il patibol le braccia leva!\nRullavano i tamburi...\nRideva, l'empio mostro... rideva...\ngià la sua preda pronto a ghermir!\n\"Sei mia!\" - Sì. - Alla sua brama\nmi promisi. Lì presso\nluccicava una lama...\nEi scrisse il foglio liberator,\nvenne all'orrendo amplesso...\nIo quella lama gli piantai nel cor.", "Your blood or my love\nhe demanded... Pleas and tears were vain.\nIn vain, mad with horror,\nI turned to the Madonna and the saints...\nThe wicked monster said: already into\nthe skies the scaffold lifts its arms!\nThe drums were rolling...\nThe wicked monster laughed... laughed...\nalready poised to seize his prey!\n\"You are mine!\" Yes. To his desire\nI pledged myself. Nearby\na blade was gleaming...\nHe wrote the paper granting freedom,\nthen came for that dreadful embrace...\nI plunged that blade into his heart."),
      lyric("Cavaradossi", "Tu!?... di tua man l'uccidesti? - tu pia,\ntu benigna, - e per me!", "You?!... You killed him with your own hand? You,\nso devout, so gentle—and for me!"),
      lyric("Tosca", "N'ebbi le man\ntutte lorde di sangue!", "My hands were\nall covered in blood!"),
      direction("Cavaradossi prende amorosamente fra le sue le mani di Tosca.", "Cavaradossi tenderly takes Tosca's hands in his."),
      lyric("Cavaradossi", "O dolci mani mansuete e pure,\no mani elette a bell'opre e pietose,\na carezzar fanciulli, a coglier rose,\na pregar, giunte, per le sventure,\ndunque in voi, fatte dall'amor secure,\ngiustizia le sue sacre armi depose?\nVoi deste morte, o man vittoriose,\no dolci mani mansuete e pure!...", "Oh, sweet and gentle hands, so pure,\nhands chosen for beautiful and merciful deeds,\nfor caressing children and gathering roses,\nfor joining in prayer for the afflicted,\nhas in you, made fearless by love,\njustice placed its sacred weapons?\nYou dealt death, victorious hands,\noh, sweet and gentle hands, so pure!..."),
      cue("Tosca si svincola dalle mani di Cavaradossi.", "Tosca slips her hands free."),
      lyric("Tosca", "Senti... l'ora è vicina; io già raccolsi\noro e gioielli... una vettura è pronta.\nMa prima... ridi amor... prima sarai\nfucilato - per finta - ad armi scariche...\nSimulato supplizio. Al colpo... cadi.\nI soldati sen vanno... - e noi siam salvi!\nPoscia a Civitavecchia... una tartana...\ne via pel mar!", "Listen... the hour is near; I have gathered\ngold and jewels... a carriage is ready.\nBut first... smile, my love... first you will be\nshot—only as a sham, with unloaded guns...\nA mock execution. At the volley... fall.\nThe soldiers will leave... and we will be safe!\nThen, at Civitavecchia... a small sailing ship...\nand away across the sea!"),
      lyric("Cavaradossi", "Liberi!", "Free!"),
      lyric("Tosca", "Chi si duole\nin terra più? Senti effluvi di rose?!...\nNon ti par che le cose\naspettan tutte innamorate il sole?...", "Who suffers\non earth any longer? Do you smell the roses?!...\nDoesn't it seem that everything\nwaits lovingly for the sun?..."),
      lyric("Cavaradossi", "Amaro sol per te m'era morire,\nda te la vita prende ogni splendore,\nall'esser mio la gioia ed il desire\nnascon di te, come di fiamma ardore.\nIo folgorare i cieli e scolorire\nvedrò nell'occhio tuo rivelatore,\ne la beltà delle cose più mire\navrà sol da te voce e colore.", "Only for you was death bitter to me;\nfrom you, life takes on all its splendor.\nJoy and desire in my being\nare born of you, as heat comes from flame.\nI shall see the heavens flash and fade\nin your revealing eyes,\nand the beauty of the fairest things\nwill take its voice and color from you alone."),
      lyric("Tosca", "Amor che seppe a te vita serbare,\nci sarà guida in terra, e in mar\nnocchier...\ne vago farà il mondo riguardare.\nFinché congiunti alle celesti sfere\ndileguerem, siccome alte sul mare\na sol cadente,", "The love that knew how to save your life\nwill guide us on land, and at sea\nbe our helmsman...\nand make the world seem beautiful.\nUntil, joined to the heavenly spheres,\nwe fade away, like high above the sea\nat sunset,"),
      cue("Fissando come in una visione.", "Gazing as if in a vision."),
      lyric("Tosca", "nuvole leggere!...", "weightless clouds!..."),
      direction("Rimangono commossi, silenziosi: poi Tosca, chiamata dalla realtà delle cose, si guarda attorno inquieta.", "They stand moved and silent. Then reality returns to Tosca, and she looks around uneasily."),
      lyric("Tosca", "E non giungono...\nBada!... al colpo egli è mestiere\nche tu subito cada...", "They aren't coming...\nRemember!... At the volley, you must\nfall at once..."),
      lyric("Cavaradossi", "Non temere\nche cadrò sul momento - e al naturale.", "Don't worry;\nI'll fall at once—and convincingly."),
      lyric("Tosca", "Ma stammi attento - di non farti male!\nCon scenica scienza\nio saprei la movenza...", "But take care not to hurt yourself!\nWith my theatrical skill\nI could show you how to fall..."),
      cue("Cavaradossi la interrompe, attirandola a sé.", "Cavaradossi interrupts her, drawing her close."),
      lyric("Cavaradossi", "Parlami ancora come dianzi parlavi,\nè così dolce il suon della tua voce!", "Speak to me again as you did just now;\nthe sound of your voice is so sweet!"),
      direction("Tosca si abbandona quasi estasiata, quindi poco a poco accalorandosi.", "Tosca gives herself over almost ecstatically, then grows more impassioned."),
      lyric("Tosca", "Uniti ed esulanti\ndiffonderem pel mondo i nostri amori,\narmonie di colori...", "United and in exile,\nwe'll spread our love through the world,\nharmonies of color..."),
      cue("Cavaradossi si esalta.", "Cavaradossi grows rapturous."),
      lyric("Cavaradossi", "Armonie di canti diffonderem!", "We'll spread harmonies of song!"),
      lyric("Tosca and Cavaradossi", "Trionfal, di nova speme\nl'anima freme in celestial\ncrescente ardor.\nEd in armonico vol\ngià l'anima va\nall'estasi d'amor.", "Triumphant, with new hope,\nthe soul trembles in a celestial,\never-growing ardor.\nAnd in harmonious flight\nthe soul already soars\ntoward love's ecstasy."),
      lyric("Tosca", "Gli occhi ti chiuderò con mille baci\ne mille ti dirò nomi d'amor.", "I'll close your eyes with a thousand kisses\nand whisper a thousand names of love.")
    ]}]
  },
  {
    number: 4,
    originalHeading: "Scena ultima",
    translatedHeading: "Last Scene",
    sections: [{ type: "Scena", originalTitle: "Scena ultima", translatedTitle: "Last Scene", participants: ["Tosca", "Cavaradossi", "Jailer", "Officer", "Sergeant", "Spoletta", "Sciarrone", "Soldiers", "Voices offstage"], turns: [
      direction("Frattanto dalla scaletta è salito un drappello di soldati: lo comanda un Ufficiale, il quale schiera i soldati nel fondo: seguono Spoletta, il Sergente, il Carceriere. Spoletta dà le necessarie istruzioni. Il cielo si fa più luminoso; è l'alba: suonano le 4 del mattino. Il Carceriere si avvicina a Cavaradossi e togliendosi il berretto gli indica l'Ufficiale.", "Meanwhile, a squad of soldiers climbs the stairs, led by an Officer who lines them up at the back. Spoletta, the Sergeant, and the Jailer follow. Spoletta gives the necessary instructions. The sky grows brighter; dawn breaks, and the clock strikes four. The Jailer approaches Cavaradossi, removes his cap, and points out the Officer."),
      lyric("Jailer", "L'ora!", "The hour!"),
      lyric("Cavaradossi", "Son pronto.", "I'm ready."),
      direction("Il Carceriere prende il registro dei condannati e scende per la scaletta.", "The Jailer takes the register of condemned prisoners and goes down the stairs."),
      lyric("Tosca", "Tieni a mente... al primo colpo... giù...", "Remember... at the first shot... down..."),
      lyric("Cavaradossi", "Giù.", "Down."),
      lyric("Tosca", "Non rialzarti innanzi\nch'io ti chiami.", "Do not get up before\nI call you."),
      lyric("Cavaradossi", "No, amore!", "No, my love!"),
      lyric("Tosca", "E cadi bene.", "And fall convincingly."),
      lyric("Cavaradossi", "Come la Tosca in teatro.", "Like Tosca on the stage."),
      lyric("Tosca", "Non ridere...", "Don't laugh..."),
      lyric("Cavaradossi", "Così?", "Like this?"),
      lyric("Tosca", "Così.", "That's right."),
      direction("Cavaradossi segue l'Ufficiale dopo aver salutato Tosca. Tosca si colloca a sinistra, nella casamatta, in modo da poter spiare ciò che accade sulla piattaforma. L'Ufficiale e il Sergente conducono Cavaradossi presso il muro di fronte a lei; il Sergente vuol bendargli gli occhi, ma Cavaradossi rifiuta sorridendo. I lugubri preparativi stancano la pazienza di Tosca.", "Cavaradossi follows the Officer after bidding Tosca farewell. She stands at the left, inside the casemate, where she can watch what happens on the platform. The Officer and Sergeant lead Cavaradossi to the wall opposite her. The Sergeant tries to blindfold him, but Cavaradossi refuses with a smile. The grim preparations test Tosca's patience."),
      lyric("Tosca", "Com'è lunga l'attesa!\nPerché indugiano ancor?... Già sorge il sole...\nPerché indugiano ancora?... è una commedia,\nlo so... ma questa angoscia eterna pare!...\nEcco!... Apprestano l'armi...\nCom'è bello il mio Mario!", "How long this waiting is!\nWhy do they still delay?... The sun is rising...\nWhy do they delay?... This is only a play,\nI know... yet this anguish seems eternal!...\nThere!... They're readying their guns...\nHow handsome my Mario is!"),
      direction("Vedendo l'Ufficiale che sta per abbassare la sciabola, Tosca si porta le mani agli orecchi per non udire la detonazione; poi fa cenno con la testa a Cavaradossi di cadere.", "As the Officer is about to lower his sword, Tosca covers her ears so she will not hear the shots; then she nods to Cavaradossi to fall."),
      lyric("Tosca", "Là! Muori!\nEcco un artista!", "There! Die!\nWhat an actor!"),
      direction("Vedendolo a terra gli invia colle mani un bacio. Il Sergente si avvicina al caduto e lo osserva attentamente; Spoletta pure si è avvicinato e allontana il Sergente, impedendogli di dare il colpo di grazia, quindi copre Cavaradossi con un mantello. L'Ufficiale allinea i soldati; il Sergente ritira la sentinella che sta in fondo, poi tutti, preceduti da Spoletta, scendono la scala. Tosca è agitatissima: sorveglia questi movimenti, temendo che Cavaradossi si muova o parli prima del momento opportuno.", "She blows him a kiss as he falls. The Sergeant goes to inspect him; Spoletta also approaches, sends the Sergeant away before he can deliver a finishing shot, and covers Cavaradossi with a cloak. The Officer forms the soldiers into line; the Sergeant dismisses the Sentinel, and everyone follows Spoletta down the stairs. Tosca watches in agitation, afraid Cavaradossi might move or speak too soon."),
      cue("A voce repressa verso Cavaradossi.", "In a hushed voice, to Cavaradossi:"),
      lyric("Tosca", "O Mario, non ti muovere...\nS'avviano... taci! Vanno... scendono.\nAncora non ti muovere...", "Oh, Mario, don't move...\nThey're starting... be quiet! They're going... going down.\nDon't move yet..."),
      direction("Tosca ascolta alla scala. Tutti si sono allontanati; va al parapetto e cautamente si sporge a guardare di sotto, poi corre verso Cavaradossi.", "Tosca listens at the stairs. Everyone has gone. She goes to the parapet and cautiously looks down, then rushes back to Cavaradossi."),
      lyric("Tosca", "Mario, su presto!\nAndiamo!... Su!...", "Mario, get up, quickly!\nLet's go!... Come on!..."),
      direction("Si china per aiutare Cavaradossi a rialzarsi: a un tratto dà un grido soffocato di terrore e sorpresa e si guarda le mani con cui ha sollevato il mantello. Si inginocchia, toglie rapidamente il mantello e balza in piedi livida, atterrita.", "She bends to help Cavaradossi up. Suddenly she gives a muffled cry of terror and shock, staring at the hands that lifted the cloak. She kneels, quickly pulls it away, then springs to her feet, pale with fright."),
      lyric("Tosca", "Ah!\nMorto! Morto!\nO Mario... morto... tu... così... Finire\ncosì!! Così?... povera Floria tua!", "Ah!\nDead! Dead!\nOh, Mario... dead... you... like this... To end\nlike this!! Like this?... your poor Floria!"),
      direction("Dal cortile sotto il parapetto e dalla piccola scala giungono, prima confuse e poi sempre più vicine, le voci di Sciarrone, di Spoletta e di alcuni soldati.", "From the courtyard below the parapet and up the small stairway come voices—first indistinct, then drawing nearer: Sciarrone, Spoletta, and some soldiers."),
      lyric("Voices offstage", "Ah!...", "Ah!..."),
      lyric("Sciarrone", "vi dico pugnalato!", "Stabbed, I tell you!"),
      lyric("Voices offstage", "Scarpia?", "Scarpia?"),
      lyric("Sciarrone", "Scarpia.", "Scarpia."),
      lyric("Spoletta", "La donna è Tosca!", "The woman is Tosca!"),
      lyric("Voices offstage", "Che non sfugga!", "Don't let her escape!"),
      lyric("Spoletta and Sciarrone", "Attenti\nagli sbocchi delle scale!", "Watch\nthe stairway exits!"),
      direction("Spoletta appare dalla scala, mentre Sciarrone dietro a lui gli grida additando Tosca.", "Spoletta appears on the stairs as Sciarrone behind him points to Tosca and shouts:"),
      lyric("Sciarrone", "È lei!", "That's her!"),
      lyric("Spoletta", "Ah! Tosca, pagherai\nben cara la sua vita!...", "Ah, Tosca, you will pay\ndearly for his life!..."),
      direction("Tosca balza in piedi e invece di sfuggire Spoletta, lo respinge violentemente, rispondendogli:", "Tosca leaps up and, instead of fleeing Spoletta, violently pushes him away, replying:"),
      lyric("Tosca", "Colla mia!", "With my own life!"),
      direction("Spoletta dà addietro. Tosca gli sfugge, passa avanti a Sciarrone ancora sulla scala e corre al parapetto. Si getta nel vuoto gridando:", "Spoletta staggers back. Tosca slips past him and Sciarrone, still on the stairs, and runs to the parapet. She leaps into the void, crying:"),
      lyric("Tosca", "O Scarpia, avanti a Dio!", "O Scarpia, before God!"),
      direction("Sciarrone ed alcuni soldati corrono al parapetto e guardano giù. Spoletta rimane esterrefatto, allibito.", "Sciarrone and some soldiers rush to the parapet and look down. Spoletta stands stunned and speechless."),
    ]}]
  }
];

// Listening labels follow the selected recording; no score numbers are invented.
toscaActThreeScenes[0].outline = [
  {
    "type": "Introduzione e canzone",
    "title": "Io de' sospiri",
    "translation": "Of sighs",
    "match": "Io de' sospiri"
  },
  {
    "type": "Interludio",
    "title": "Le campane suonano mattutino (Lento)",
    "translation": "The bells ring for matins (Lento)",
    "match": "La luce incerta"
  }
];
toscaActThreeScenes[1].outline = [
  {
    "type": "Scena",
    "title": "Mario Cavaradossi? A voi.",
    "translation": "Mario Cavaradossi? Here you are.",
    "match": "Mario Cavaradossi?"
  },
  {
    "type": "Aria",
    "title": "E lucevan le stelle",
    "translation": "And the stars were shining",
    "match": "E lucevan le stelle"
  }
];
toscaActThreeScenes[2].outline = [
  {
    "type": "Scena",
    "title": "Franchigia a Floria Tosca",
    "translation": "Safe passage for Floria Tosca",
    "match": "Franchigia a Floria"
  },
  {
    "type": "Arioso",
    "title": "O dolci mani mansuete e pure",
    "translation": "Oh, sweet, gentle, pure hands",
    "match": "O dolci mani"
  },
  {
    "type": "Duetto",
    "title": "Senti, l'ora è vicina",
    "translation": "Listen, the hour is near",
    "match": "Senti..."
  },
  {
    "type": "Duetto",
    "title": "Amaro sol per te m'era il morire",
    "translation": "Only for you was death bitter to me",
    "match": "Amaro sol per te"
  },
  {
    "type": "Duetto",
    "title": "E non giungono",
    "translation": "They are not coming",
    "match": "E non giungono"
  }
];
toscaActThreeScenes[3].outline = [
  {
    "type": "Scena",
    "title": "Com'è lunga l'attesa!",
    "translation": "How long the waiting is!",
    "match": "Com'è lunga l'attesa"
  },
  {
    "type": "Finale",
    "title": "Presto! Su, Mario!",
    "translation": "Quick! Up, Mario!",
    "match": "Mario, su presto!"
  }
];
