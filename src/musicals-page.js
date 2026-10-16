import { mahlerFinaleEvents, mahlerFinaleSources, mahlerFinaleTranslations } from "./data/musical-mahler-symphony-2.js";

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


function renderScoreEvent(event) {
  if (event.kind === "instrumental") return '<div class="musical-score-instrumental"><span aria-hidden="true">♪</span> Orchestra · '+escapeHtml(event.title)+'</div>';
  const indicator = {solo:"",relay:"↳",parallel:"∥",together:"="};
  const rows = event.lanes.map(lane => {
    const prefix = indicator[lane.relationship] || "";
    const german = lane.lines.map(line => '<p>'+escapeHtml(line)+'</p>').join("");
    const english = lane.lines.map(line => '<p>'+escapeHtml(mahlerFinaleTranslations[line] || "[Translation under review]")+'</p>').join("");
    return '<div class="musical-score-row musical-score-row--entry"><div class="musical-score-part"><strong class="musical-score-part__name">'+(prefix ? '<span class="musical-relation">'+prefix+'</span> ' : '')+escapeHtml(lane.voice)+'</strong></div><div class="musical-score-original" lang="de">'+german+'</div><div class="musical-score-english" lang="en" data-musical-translation>'+english+'</div></div>';
  }).join("");
  return '<section class="musical-score-passage" id="'+escapeHtml(event.id)+'" aria-label="'+escapeHtml(event.title)+'"><h3 class="musical-score-passage__title">'+escapeHtml(event.title)+'</h3>'+rows+'</section>';
}
function renderMusicalAbout() {
  return '<div class="musical-editorial-about"><div class="musical-editorial-prose"><p>Gustav Mahler’s <em>Resurrection</em> Symphony takes us from grief, uncertainty, and the question of death to a vision of renewal. Its final movement unfolds through a vast orchestral journey before human voices rise quietly and gradually gather into a radiant choral climax.</p><p>The opening choral stanzas draw on Friedrich Klopstock’s resurrection poem; Mahler wrote additional verses. The finale is sung in German by soprano and contralto soloists and chorus, accompanied by orchestra.</p><p><a href="https://www.laphil.com/works/symphony-no-2-in-c-minor-resurrection" target="_blank" rel="noopener noreferrer">Read orchestral programme notes ↗</a></p></div><dl class="musical-editorial-facts"><div><dt>COMPOSER</dt><dd>Gustav Mahler</dd></div><div><dt>GENRE</dt><dd>Choral symphony</dd></div><div><dt>COMPOSED</dt><dd>1888–1894</dd></div><div><dt>PREMIERE</dt><dd>13 December 1895 · Berlin</dd></div><div><dt>STRUCTURE</dt><dd>Five movements</dd></div><div><dt>VOICES</dt><dd>Soprano, contralto & choir</dd></div><div><dt>TEXT</dt><dd>Friedrich Klopstock & Gustav Mahler</dd></div></dl></div>';
}
function renderMusicalLyrics() {
  return '<div class="musical-score-reader" data-musical-score-reader><div class="musical-score-toolbar"><p class="musical-score-toolbar__legend"><span>↳ Relay</span><span>∥ Parallel</span><span>= Together</span><span>SATB = Soprano · Alto · Tenor · Bass</span></p><button class="musical-score-translation-toggle" type="button" data-musical-translation-toggle aria-controls="mahler-score-lyrics" aria-expanded="true">Hide translation</button></div><div class="musical-score-scroll" tabindex="0" aria-label="Vocal text columns; scroll horizontally on a narrow screen"><div class="musical-score-grid" id="mahler-score-lyrics"><div class="musical-score-row musical-score-row--head"><div class="musical-score-part">Vocal part / relationship</div><div class="musical-score-original">German · Original</div><div class="musical-score-english" data-musical-translation>English · Translation</div></div>'+mahlerFinaleEvents.map(renderScoreEvent).join("")+'</div></div><div class="musical-score-footer"><p><strong>Listening transcription · under review.</strong> The choral entrances and repetitions in “Wieder aufzublüh’n,” “Hör auf zu beben,” and particularly “Mit Flügeln” need further part-by-part score checking. English is a working translation.</p><p>Sources: <a href="'+escapeHtml(mahlerFinaleSources.score)+'" target="_blank" rel="noopener noreferrer">Historical scores</a> · <a href="'+escapeHtml(mahlerFinaleSources.text)+'" target="_blank" rel="noopener noreferrer">Text reference</a>.</p></div></div>';
}
export function renderMusicalPage() {
  return '<div class="musical-detail-page musical-editorial"><div class="musical-editorial-wrap"><nav class="musical-breadcrumb" aria-label="Breadcrumb"><a href="#/">Home</a><span>›</span><a href="#/musicals">Musicals</a><span>›</span><span aria-current="page">Symphony No. 2</span></nav><header class="musical-editorial-hero"><div class="musical-editorial-hero__inner"><p class="musical-editorial-overline">GUSTAV MAHLER · 1895 · CHORAL SYMPHONY</p><h1>Symphony No. 2<br><em>Resurrection</em></h1><p class="musical-editorial-quote">“I shall live again!”</p><p class="musical-editorial-hero__sub">Movement V · Im Tempo des Scherzos</p></div></header><details class="musical-editorial-section" open><summary><span>About this work</span><span class="musical-editorial-chevron" aria-hidden="true">⌄</span></summary>'+renderMusicalAbout()+'</details><details class="musical-editorial-section" open><summary><span>Lyrics <small>· Movement V — Aufersteh’n</small></span><span class="musical-editorial-chevron" aria-hidden="true">⌄</span></summary>'+renderMusicalLyrics()+'</details></div></div>';
}
