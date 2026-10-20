import { mahlerFinaleEvents, mahlerFinaleSources, mahlerFinaleTranslations } from "./data/musical-mahler-symphony-2.js";

const musicalWorks = [
  {
    title: 'Ode to Joy · Symphony No. 9',
    composer: 'Ludwig van Beethoven',
    year: 1824,
    summary: 'The choral finale of Beethoven’s Ninth Symphony brings Schiller’s vision of joy and human fellowship to soloists, chorus, and orchestra.',
    slug: 'beethoven-ode-to-joy'
  },
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

export function renderMusicalsPage(query = '', sort = 'title', composer = '') {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const normalizedComposer = composer.trim().toLocaleLowerCase();
  const matches = musicalWorks.filter(work =>
    (!normalizedComposer || work.composer.toLocaleLowerCase() === normalizedComposer) &&
    [work.title, work.composer, work.year, work.summary]
      .some(value => String(value).toLocaleLowerCase().includes(normalizedQuery))
  );
  matches.sort((a, b) => {
    if (sort === 'composer') return a.composer.localeCompare(b.composer);
    if (sort === 'year') return b.year - a.year;
    return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
  });
  const safeQuery = escapeHtml(query);
  const safeComposer = escapeHtml(composer);
  const composerNotice = composer ? '<p class="musicals-composer-filter">Works by <strong>' + safeComposer + '</strong> · <a href="#/musicals">View all musicals</a></p>' : '';
  const rows = matches.map((work, index) => `
    <a class="musical-row" href="#/musicals/${work.slug}" style="--card-index:${index}">
      <h2>${escapeHtml(work.title)}</h2>
      <p class="musical-row__byline"><span>${escapeHtml(work.composer)}</span><span aria-hidden="true">·</span><span>${work.year}</span></p>
      <p class="musical-row__summary">${escapeHtml(work.summary)}</p>
    </a>`).join('');

  return `<section class="directory-scenic" aria-hidden="true"></section>
<section class="directory-intro section-wrap musicals-directory-intro">
  <div class="directory-intro__panel"><h1>Musicals</h1><p>Explore musical works through their stories, background, and lyrics with translation.</p>${composerNotice}</div>
  <div class="directory-tools">
    <form class="opera-search opera-search--directory" data-search-form data-search-route="/musicals" data-composer="${safeComposer}" role="search">
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


function renderMusicalTabs(slug, view) {
  return `<nav class="musical-work-tabs" aria-label="Work sections">${['about', 'lyrics'].map(tab => `<a href="#/musicals/${slug}?view=${tab}" ${view === tab ? 'aria-current="page"' : ''}>${tab === 'about' ? 'About' : 'Lyrics'}</a>`).join('')}</nav>`;
}

function renderBeethovenPage(view) {
  return `<nav class="site-breadcrumb musical-breadcrumb" aria-label="Breadcrumb"><a href="#/">Home</a><span>›</span><a href="#/musicals">Musicals</a><span>›</span><a href="#/musicals?composer=Ludwig%20van%20Beethoven">Ludwig van Beethoven</a><span>›</span><span aria-current="page">Ode to Joy</span></nav>
<div class="musical-detail-page musical-editorial"><div class="musical-editorial-wrap">
  <header class="musical-editorial-hero"><div class="musical-editorial-hero__inner">
    <p class="musical-editorial-overline">LUDWIG VAN BEETHOVEN · 1824 · CHORAL SYMPHONY</p>
    <h1>Ode to Joy<br><em>Symphony No. 9</em></h1>
    <p class="musical-editorial-quote">Joy, friendship, and a shared humanity.</p>
    <p class="musical-editorial-hero__sub">Symphony No. 9 in D minor, Op. 125 · Movement IV</p>
  </div></header>
  ${renderMusicalTabs('beethoven-ode-to-joy', view)}
  <section class="musical-editorial-section" aria-labelledby="musical-about-heading" ${view !== 'about' ? 'hidden' : ''}><h2 id="musical-about-heading">About this work</h2>
    <div class="musical-editorial-about">
      <div class="musical-editorial-prose">
        <p>“Ode to Joy” is the familiar name associated with the choral finale of Ludwig van Beethoven’s Ninth Symphony. Its German text draws on Friedrich Schiller’s poem <em lang="de">An die Freude</em>, celebrating joy and fellowship.</p>
        <p>The finale belongs to a four-movement symphony. Orchestra, four vocal soloists, and mixed chorus give its vision of shared humanity a powerful musical voice. Beethoven completed the symphony in February 1824; its first performance took place in Vienna on 7 May that year.</p>
        <p><a href="https://www.beethoven.de/en/work/view/5556714292117504/" target="_blank" rel="noopener noreferrer">Explore the work at Beethoven-Haus Bonn ↗</a></p>
      </div>
      <section class="musical-facts-section" aria-labelledby="musical-facts-heading"><h2 id="musical-facts-heading">At a glance</h2><dl class="musical-editorial-facts">
        <div><dt>COMPOSER</dt><dd>Ludwig van Beethoven</dd></div>
        <div><dt>GENRE</dt><dd>Choral symphony · finale</dd></div>
        <div><dt>WORK</dt><dd>Symphony No. 9 in D minor, Op. 125</dd></div>
        <div><dt>PREMIERE</dt><dd>7 May 1824 · Vienna</dd></div>
        <div><dt>STRUCTURE</dt><dd>Four movements · vocals in Movement IV</dd></div>
        <div><dt>VOICES</dt><dd>Soprano, alto, tenor & bass soloists; mixed chorus</dd></div>
        <div><dt>LANGUAGE</dt><dd>German</dd></div>
        <div><dt>TEXT</dt><dd>Friedrich Schiller, with introductory words by Beethoven</dd></div>
      </dl></section>
    </div>
  </section>
  <section class="musical-editorial-section" aria-labelledby="musical-lyrics-heading" ${view !== 'lyrics' ? 'hidden' : ''}><h2 id="musical-lyrics-heading">Lyrics <small>· Movement IV — Ode to Joy</small></h2>
    <div class="musical-editorial-prose"><p><strong>Lyrics and English translation coming soon.</strong></p><p>This section will follow the sung text of the finale, including its repetitions and individual vocal parts.</p></div>
  </section>
</div></div>`;
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
  return '<div class="musical-editorial-about"><div class="musical-editorial-prose"><p>Gustav Mahler’s <em>Resurrection</em> Symphony takes us from grief, uncertainty, and the question of death to a vision of renewal. Its final movement unfolds through a vast orchestral journey before human voices rise quietly and gradually gather into a radiant choral climax.</p><p>The opening choral stanzas draw on Friedrich Klopstock’s resurrection poem; Mahler wrote additional verses. The finale is sung in German by soprano and contralto soloists and chorus, accompanied by orchestra.</p><p><a href="https://www.laphil.com/works/symphony-no-2-in-c-minor-resurrection" target="_blank" rel="noopener noreferrer">Read orchestral programme notes ↗</a></p></div><section class="musical-facts-section" aria-labelledby="musical-facts-heading"><h2 id="musical-facts-heading">At a glance</h2><dl class="musical-editorial-facts"><div><dt>COMPOSER</dt><dd>Gustav Mahler</dd></div><div><dt>GENRE</dt><dd>Choral symphony</dd></div><div><dt>COMPOSED</dt><dd>1888–1894</dd></div><div><dt>PREMIERE</dt><dd>13 December 1895 · Berlin</dd></div><div><dt>STRUCTURE</dt><dd>Five movements</dd></div><div><dt>VOICES</dt><dd>Soprano, contralto & choir</dd></div><div><dt>TEXT</dt><dd>Friedrich Klopstock & Gustav Mahler</dd></div></dl></section></div>';
}
function renderMusicalLyrics() {
  return '<div class="musical-score-reader" data-musical-score-reader><div class="musical-score-toolbar"><p class="musical-score-toolbar__legend"><span>↳ Relay</span><span>∥ Parallel</span><span>= Together</span><span>SATB = Soprano · Alto · Tenor · Bass</span></p><button class="musical-score-translation-toggle" type="button" data-musical-translation-toggle aria-controls="mahler-score-lyrics" aria-expanded="true">Hide translation</button></div><div class="musical-score-scroll" tabindex="0" aria-label="Vocal text columns; scroll horizontally on a narrow screen"><div class="musical-score-grid" id="mahler-score-lyrics"><div class="musical-score-row musical-score-row--head"><div class="musical-score-part">Vocal part / relationship</div><div class="musical-score-original">German · Original</div><div class="musical-score-english" data-musical-translation>English · Translation</div></div>'+mahlerFinaleEvents.map(renderScoreEvent).join("")+'</div></div><div class="musical-score-footer"><p><strong>Listening transcription · under review.</strong> The choral entrances and repetitions in “Wieder aufzublüh’n,” “Hör auf zu beben,” and particularly “Mit Flügeln” need further part-by-part score checking. English is a working translation.</p><p>Sources: <a href="'+escapeHtml(mahlerFinaleSources.score)+'" target="_blank" rel="noopener noreferrer">Historical scores</a> · <a href="'+escapeHtml(mahlerFinaleSources.text)+'" target="_blank" rel="noopener noreferrer">Text reference</a>.</p></div></div>';
}
export function renderMusicalPage(slug = 'mahler-symphony-2-resurrection', selectedView = 'about') {
  const view = selectedView === 'lyrics' ? 'lyrics' : 'about';
  if (slug === 'beethoven-ode-to-joy') return renderBeethovenPage(view);
  return '<nav class="site-breadcrumb musical-breadcrumb" aria-label="Breadcrumb"><a href="#/">Home</a><span>›</span><a href="#/musicals">Musicals</a><span>›</span><a href="#/musicals?composer=Gustav%20Mahler">Gustav Mahler</a><span>›</span><span aria-current="page">Symphony No. 2</span></nav><div class="musical-detail-page musical-editorial"><div class="musical-editorial-wrap"><header class="musical-editorial-hero"><div class="musical-editorial-hero__inner"><p class="musical-editorial-overline">GUSTAV MAHLER · 1895 · CHORAL SYMPHONY</p><h1>Symphony No. 2<br><em>Resurrection</em></h1><p class="musical-editorial-quote">“I shall live again!”</p><p class="musical-editorial-hero__sub">Movement V · Im Tempo des Scherzos</p></div></header>'+renderMusicalTabs(slug, view)+'<section class="musical-editorial-section" aria-labelledby="musical-about-heading" '+(view !== 'about' ? 'hidden' : '')+'><h2 id="musical-about-heading">About this work</h2>'+renderMusicalAbout()+'</section><section class="musical-editorial-section" aria-labelledby="musical-lyrics-heading" '+(view !== 'lyrics' ? 'hidden' : '')+'><h2 id="musical-lyrics-heading">Lyrics <small>· Movement V — Aufersteh’n</small></h2>'+renderMusicalLyrics()+'</section></div></div>';
}
