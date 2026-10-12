const sections = [
["Soprano and chorus",[
["Aufersteh’n, ja aufersteh’n wirst du,","Rise again—yes, you shall rise again,"],
["Mein Staub, nach kurzer Ruh!","my dust, after a brief rest!"],
["Unsterblich Leben! Unsterblich Leben","Eternal life! Eternal life"],
["Wird, der dich rief, dir geben!","will be given to you by the One who called you!"],
["Wieder aufzublüh’n wirst du gesät!","You are sown to bloom again!"],
["Der Herr der Ernte geht","The Lord of the harvest goes forth"],
["Und sammelt Garben","and gathers into His sheaves"],
["Uns ein, die starben!","us who have died!"]
]],
["Contralto / mezzo-soprano solo",[
["O glaube, mein Herz, o glaube:","Oh believe, my heart, oh believe:"],
["Es geht dir nichts verloren!","Nothing is lost to you!"],
["Dein ist, ja dein, was du gesehnt,","Yours—yes, yours—is all you longed for,"],
["Dein, was du geliebt, was du gestritten!","yours is what you loved and struggled for!"]
]],
["Soprano solo",[
["O glaube: Du wardst nicht umsonst geboren!","Oh believe: you were not born in vain!"],
["Hast nicht umsonst gelebt, gelitten!","You have not lived and suffered in vain!"]
]],
["Chorus",[
["Was entstanden ist, das muss vergehen!","Whatever has come into being must pass away!"],
["Was vergangen ist, auferstehen!","Whatever has passed away must rise again!"]
]],
["Contralto / mezzo-soprano and chorus",[
["Hör auf zu beben!","Cease trembling!"],
["Bereite dich zu leben!","Prepare yourself to live!"]
]],
["Soprano and contralto / mezzo-soprano",[
["O Schmerz! Du Alldurchdringer!","O pain! You who pierce all things!"],
["Dir bin ich entrungen!","I have wrested myself from you!"],
["O Tod! Du Allbezwinger!","O death! You who conquer all!"],
["Nun bist du bezwungen!","Now you are conquered!"],
["Mit Flügeln, die ich mir errungen,","With wings that I have won for myself,"],
["in heißem Liebesstreben","in ardent striving for love,"],
["werd’ ich entschweben","I shall soar away"],
["zum Licht, zu dem kein Aug’ gedrungen!","to the light no eye has ever reached!"]
]],
["Chorus",[
["Mit Flügeln, die ich mir errungen,","With wings that I have won for myself,"],
["werd’ ich entschweben!","I shall soar away!"],
["Sterben werd’ ich, um zu leben!","I shall die in order to live!"]
]],
["Soprano, contralto / mezzo-soprano and chorus",[
["Aufersteh’n, ja aufersteh’n wirst du,","Rise again—yes, you shall rise again,"],
["mein Herz, in einem Nu!","my heart, in a single instant!"],
["Was du geschlagen,","All that you have struggled for"],
["zu Gott wird es dich tragen!","will carry you to God!"]
]]
];

export function renderMusicalsPage() {
const lyrics=sections.map(([voice,lines],index)=>`
<section class="musical-verse" aria-labelledby="musical-voice-${index+1}">
<h3 id="musical-voice-${index+1}" class="musical-verse__voice">${voice}</h3>
<div class="musical-verse__lines">${lines.map(([original,translation])=>`
<div class="musical-line"><p lang="de">${original}</p><p lang="en">${translation}</p></div>`).join("")}</div>
</section>`).join("");
return `
<section class="musicals-page section-wrap">
<header class="musicals-page__intro">
<p class="eyebrow"><span class="eyebrow-rule"></span> Classical vocal works</p>
<h1>Gustav Mahler<br /><em>Symphony No. 2, “Resurrection”</em></h1>
<p class="musicals-page__subtitle">Finale: “Aufersteh’n” (“Rise Again”)</p>
<p class="musicals-page__context">A symphonic finale for soprano, contralto or mezzo-soprano, chorus, and orchestra. Its sung text begins after a long orchestral prelude.</p>
</header>
<section class="musical-lyrics" aria-label="Finale lyrics in German and English">
<div class="musical-lyrics__columns" aria-hidden="true"><span>German</span><span>English translation</span></div>
${lyrics}
</section>
<aside class="musicals-page__notes">
<h2>About the text</h2>
<p>The opening stanzas are by Friedrich Klopstock; Mahler added the later verses. This English version is a fresh, line-by-line translation prepared for this collection. “Was du geschlagen” is rendered here as “All that you have struggled for”; the German phrase can carry more than one nuance.</p>
<p class="musicals-page__sources">Text and voice cues: <a href="https://www.mahlerfoundation.org/mahler/compositions/symphony-no-2/symphony-no-2-movement-5-lied-2-auferstehung-im-tempo-des-scherzos/" target="_blank" rel="noopener noreferrer">Mahler Foundation</a> and the <a href="https://downloads.bbci.co.uk/radio3/orchestras/bbcsso/2026_March_1_Mahler_Symphony_No2_Resurrection.pdf" target="_blank" rel="noopener noreferrer">BBC Scottish Symphony Orchestra programme</a>.</p>
</aside>
</section>`;
}
