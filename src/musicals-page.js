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

const musicalWorks = [
  {
    title: 'Symphony No. 2: “Resurrection”',
    composer: 'Gustav Mahler',
    year: 1895,
    summary: 'A vast finale moves from grief and uncertainty toward renewal, carried by orchestra, soloists, and chorus.',
    slug: 'mahler-symphony-2-resurrection'
  }
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

export function renderMusicalsPage(query = '', sort = 'title') {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const matches = musicalWorks.filter(work =>
    [work.title, work.composer, work.year, work.summary]
      .some(value => String(value).toLocaleLowerCase().includes(normalizedQuery))
  );
  matches.sort((a, b) => {
    if (sort === 'composer') return a.composer.localeCompare(b.composer);
    if (sort === 'year') return b.year - a.year;
    return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
  });
  const safeQuery = escapeHtml(query);
  const rows = matches.map((work, index) => `
    <a class="musical-row" href="#/musicals/${work.slug}" style="--card-index:${index}">
      <h2>${escapeHtml(work.title)}</h2>
      <p class="musical-row__byline"><span>${escapeHtml(work.composer)}</span><span aria-hidden="true">·</span><span>${work.year}</span></p>
      <p class="musical-row__summary">${escapeHtml(work.summary)}</p>
    </a>`).join('');

  return `<section class="directory-scenic" aria-hidden="true"></section>
<section class="directory-intro section-wrap musicals-directory-intro">
  <div class="directory-intro__panel"><h1>Musicals</h1><p>Explore musical works through their stories, background, and lyrics with translation.</p></div>
  <div class="directory-tools">
    <form class="opera-search opera-search--directory" data-search-form data-search-route="/musicals" role="search">
      <label class="sr-only" for="musicals-directory-search">Search musical title or composer</label>
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5-5 5"></path></svg>
      <input id="musicals-directory-search" name="q" type="search" placeholder="Search title or composer..." value="${safeQuery}" autocomplete="off" />
    </form>
    <label class="directory-sort"><span>Sort by</span><select id="musicals-directory-sort" aria-label="Sort musicals">
      <option value="title" ${sort === 'title' ? 'selected' : ''}>Title (A–Z)</option>
      <option value="composer" ${sort === 'composer' ? 'selected' : ''}>Composer</option>
      <option value="year" ${sort === 'year' ? 'selected' : ''}>Year (newest)</option>
    </select></label>
  </div>
</section>
<section class="musical-list section-wrap" aria-label="Musical works">${rows || `<p class="empty-results">No musicals match “${safeQuery}”. Try another title or composer.</p>`}</section>`;
}

function renderMusicalTabs(view) {
  const base = "#/musicals/mahler-symphony-2-resurrection";
  return `<nav class="musical-tabs" aria-label="Symphony No. 2: Resurrection sections">
    <div class="musical-tabs__identity"><span>Symphony No. 2: Resurrection</span><small>Gustav Mahler</small></div>
    <div class="musical-tabs__links">
      <a href="${base}?view=about" class="${view === "about" ? "is-active" : ""}" ${view === "about" ? 'aria-current="page"' : ""}>About</a>
      <a href="${base}?view=lyrics" class="${view === "lyrics" ? "is-active" : ""}" ${view === "lyrics" ? 'aria-current="page"' : ""}>Lyrics</a>
    </div>
  </nav>`;
}

function renderMusicalAbout() {
  return `<article class="musicals-page musical-about section-wrap">
    <div class="musical-about__hero">
      <img src="./public/images/opera-house-hero.webp" alt="Artwork inspired by Mahler’s Symphony No. 2, “Resurrection”" />
      <div>
        <p class="eyebrow"><span class="eyebrow-rule"></span> Choral symphony · German</p>
        <h1>Gustav Mahler<br /><em>Symphony No. 2, “Resurrection”</em></h1>
        <p class="musicals-page__subtitle">Finale: “Aufersteh’n” (“Rise Again”)</p>
        <p class="musicals-page__context">A symphonic finale for soprano, contralto or mezzo-soprano, chorus, and orchestra. Its sung text begins after a long orchestral prelude.</p>
        <a class="opera-info__read-link" href="#/musicals/mahler-symphony-2-resurrection?view=lyrics">Read the lyrics <span aria-hidden="true">→</span></a>
      </div>
    </div>
    <dl class="musical-facts">
      <div><dt>Composer</dt><dd>Gustav Mahler</dd></div><div><dt>Genre</dt><dd>Choral symphony</dd></div>
      <div><dt>Structure</dt><dd>Five movements</dd></div><div><dt>Featured movement</dt><dd>Finale · “Aufersteh’n”</dd></div>
      <div><dt>Text</dt><dd>Friedrich Klopstock and Gustav Mahler</dd></div><div><dt>Premiere</dt><dd>13 December 1895, Berlin</dd></div>
    </dl>
    <section class="musicals-page__notes">
      <h2>About this work</h2>
      <p>Mahler’s Fifth Movement brings back the symphony’s questions about death and suffering in a storm of orchestral sound. After a long build, the chorus enters quietly with words of resurrection; the movement grows toward a radiant ending for chorus, soloists and orchestra.</p>
      <p>The opening stanzas are by Friedrich Klopstock; Mahler added the later verses. This page presents the finale’s sung text, not the symphony’s fourth-movement song “Urlicht.”</p>
      <p class="musicals-page__sources">Sources: <a href="https://www.laphil.com/works/symphony-no-2-in-c-minor-resurrection" target="_blank" rel="noopener noreferrer">Los Angeles Philharmonic notes</a> · <a href="https://www.berliner-philharmoniker.de/en/programme-notes/gustav-mahler-symphony-no-2-in-c-minor-resurrection/" target="_blank" rel="noopener noreferrer">Berlin Philharmonic programme note</a>.</p>
    </section>
  </article>`;
}

function renderMusicalLyrics() {
  const lyrics = sections.map(([voice, lines], index) => `
    <section class="musical-verse" aria-labelledby="musical-voice-${index + 1}">
      <h2 id="musical-voice-${index + 1}" class="musical-verse__voice">${voice}</h2>
      <div class="musical-verse__lines">${lines.map(([original, translation]) => `
        <div class="musical-line"><p lang="de">${original}</p><p lang="en">${translation}</p></div>`).join("")}</div>
    </section>`).join("");
  return `<article class="musicals-page musical-lyrics-page section-wrap">
    <header class="musicals-page__intro">
      <p class="eyebrow"><span class="eyebrow-rule"></span> Gustav Mahler · Finale</p>
      <h1>Lyrics &amp; translation</h1>
      <p class="musicals-page__subtitle">“Aufersteh’n” (“Rise Again”)</p>
      <p class="musicals-page__context">German original and a fresh English translation, aligned line by line.</p>
    </header>
    <section class="musical-lyrics" aria-label="Finale lyrics in German and English">
      <div class="musical-lyrics__columns" aria-hidden="true"><span>German</span><span>English translation</span></div>${lyrics}
    </section>
    <aside class="musicals-page__notes"><h2>About the text</h2>
      <p>The opening stanzas are by Friedrich Klopstock; Mahler added the later verses. This English version is a fresh, line-by-line translation prepared for this collection. “Was du geschlagen” is rendered here as “All that you have struggled for”; the German phrase can carry more than one nuance.</p>
      <p class="musicals-page__sources">Text and voice cues: <a href="https://www.mahlerfoundation.org/mahler/compositions/symphony-no-2/symphony-no-2-movement-5-lied-2-auferstehung-im-tempo-des-scherzos/" target="_blank" rel="noopener noreferrer">Mahler Foundation</a> and the <a href="https://downloads.bbci.co.uk/radio3/orchestras/bbcsso/2026_March_1_Mahler_Symphony_No2_Resurrection.pdf" target="_blank" rel="noopener noreferrer">BBC Scottish Symphony Orchestra programme</a>.</p>
    </aside>
  </article>`;
}

export function renderMusicalPage(view = "about") {
  const selected = view === "lyrics" ? "lyrics" : "about";
  return `<div class="musical-detail-page">${renderMusicalTabs(selected)}${selected === "lyrics" ? renderMusicalLyrics() : renderMusicalAbout()}</div>`;
}
