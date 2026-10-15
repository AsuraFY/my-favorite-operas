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
        <a class="opera-info__read-link" href="#/musicals/mahler-symphony-2-resurrection?view=lyrics">Read the vocal text <span aria-hidden="true">→</span></a>
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


function renderScoreEvent(event) {
  if (event.kind === "instrumental") return `<div class="musical-score-instrumental" aria-label="${escapeHtml(event.title)}"><span aria-hidden="true">♪</span> Orchestra</div>`;
  const overlap = event.relation === "overlap";
  const rows = event.lanes.map(lane => `
    <div class="musical-score-row musical-score-row--entry">
      <div class="musical-score-part">
        <span class="musical-score-part__name">${escapeHtml(lane.voice)}</span>
        ${overlap ? '<span class="musical-score-part__ov" title="Overlapping voices">(OV.)</span>' : ""}
      </div>
      <div class="musical-score-original" lang="de">${lane.lines.map(line => `<p>${escapeHtml(line)}</p>`).join("")}</div>
      <div class="musical-score-english" lang="en" data-musical-translation>${lane.lines.map(line => `<p>${escapeHtml(mahlerFinaleTranslations[line])}</p>`).join("")}</div>
    </div>`).join("");
  return `<section class="musical-score-passage" id="${escapeHtml(event.id)}" aria-label="${escapeHtml(event.title)}">${rows}</section>`;
}

function renderMusicalLyrics() {
  return `<article class="musicals-page musical-lyrics-page section-wrap">
    <div class="musical-score-reader" data-musical-score-reader>
      <header class="musical-score-hero">
        <p class="musical-score-hero__eyebrow">GUSTAV MAHLER · SYMPHONY NO. 2</p>
        <h1>Resurrection</h1>
        <p class="musical-score-hero__subtitle">Movement V · Im Tempo des Scherzos</p>
      </header>
      <div class="musical-score-body">
        <div class="musical-score-toolbar">
          <p class="musical-score-toolbar__legend"><span>(OV.) = overlapping</span><span>SATB = Soprano · Alto · Tenor · Bass</span></p>
          <button class="musical-score-translation-toggle" type="button" data-musical-translation-toggle aria-controls="mahler-score-lyrics" aria-expanded="true">Hide translation</button>
        </div>
        <div class="musical-score-scroll" tabindex="0" aria-label="Vocal text columns; scroll horizontally on a narrow screen">
          <div class="musical-score-grid" id="mahler-score-lyrics">
            <div class="musical-score-row musical-score-row--head">
              <div class="musical-score-part">Vocal part</div>
              <div class="musical-score-original">German · Original</div>
              <div class="musical-score-english" data-musical-translation>English · Translation</div>
            </div>
            ${mahlerFinaleEvents.map(renderScoreEvent).join("")}
          </div>
        </div>
      </div>
    </div>
    <aside class="musicals-page__notes musical-score-footer">
      <p>German vocal allocation is still under score review; the English translation is a draft.</p>
      <p>Scores: <a href="${escapeHtml(mahlerFinaleSources.score)}" target="_blank" rel="noopener noreferrer">IMSLP historical scores</a> · <a href="${escapeHtml(mahlerFinaleSources.text)}" target="_blank" rel="noopener noreferrer">Mahler Catalogue</a>.</p>
    </aside>
  </article>`;
}

export function renderMusicalPage(view = "about") {
  const selected = view === "lyrics" ? "lyrics" : "about";
  return `<div class="musical-detail-page">${renderMusicalTabs(selected)}${selected === "lyrics" ? renderMusicalLyrics() : renderMusicalAbout()}</div>`;
}
