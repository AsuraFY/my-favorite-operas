import { operas, getOpera } from "./data/operas.js";

const app = document.querySelector("#app");

const artwork = (opera, extra = "") => `
  <div class="artwork artwork--${opera.color} ${extra}" aria-hidden="true">
    <div class="artwork__frame"></div>
    <div class="artwork__light"></div>
    <div class="artwork__figure"><span></span></div>
    <div class="artwork__ornament">${opera.initials}</div>
    <div class="artwork__caption">${opera.composer}</div>
  </div>`;

const arrow = `<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3.5 10h12m-5-5 5 5-5 5"/></svg>`;

function header(active) {
  return `<header class="site-header">
    <a class="brand" href="#/" aria-label="My favorite Operas home">
      <span class="brand__mark" aria-hidden="true">M<span>f</span>O</span>
      <span class="brand__name">My favorite <i>Operas</i></span>
    </a>
    <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false"><span></span><span></span></button>
    <nav class="main-nav" aria-label="Main navigation">
      <a class="${active === "home" ? "is-active" : ""}" href="#/">Home</a>
      <a class="${active === "operas" ? "is-active" : ""}" href="#/operas">Operas <span class="nav-count">04</span></a>
      <span class="nav-note">A personal collection</span>
    </nav>
  </header>`;
}

function footer() {
  return `<footer class="site-footer"><a class="footer-brand" href="#/">My favorite <i>Operas</i></a><span>Stories that stay with us.</span><span>Made for the love of opera <span aria-hidden="true">♪</span></span></footer>`;
}

function shell(content, active) {
  app.innerHTML = `${header(active)}<main id="main">${content}</main>${footer()}`;
  const toggle = app.querySelector(".menu-toggle");
  const nav = app.querySelector(".main-nav");
  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
    nav.classList.toggle("is-open", !open);
  });
}

function operaCard(opera, index) {
  return `<a class="opera-card" href="#/operas/${opera.slug}" style="--card-index:${index}">
    ${artwork(opera)}
    <div class="opera-card__body">
      <div class="eyebrow">${opera.genre} <span>·</span> ${opera.acts} acts</div>
      <h3>${opera.title}</h3>
      <p class="opera-card__composer">${opera.composer}</p>
      <span class="text-link">Explore opera ${arrow}</span>
    </div>
  </a>`;
}

function homePage() {
  const featured = operas.find((opera) => opera.featured);
  return `<section class="home-hero">
      <div class="hero-copy">
        <p class="eyebrow hero-kicker"><span class="eyebrow-rule"></span> An invitation to listen</p>
        <h1>Some stories<br />stay with <em>you.</em></h1>
        <p class="hero-intro">A personal collection of operas I love, the worlds they create, and the music that follows us home.</p>
        <a class="button button--dark" href="#/operas">Explore the collection ${arrow}</a>
        <div class="hero-footnote"><span class="hero-footnote__line"></span><span>Four operas to begin with<br /><b>More stories, in time.</b></span></div>
      </div>
      <div class="hero-art-wrap">
        <div class="hero-art-label"><span>01</span><span>On this stage</span></div>
        ${artwork(featured, "artwork--hero")}
        <div class="hero-title-card"><span class="eyebrow">Featured opera</span><h2>${featured.title}</h2><p>${featured.composer}</p><a href="#/operas/${featured.slug}" aria-label="Explore Tristan und Isolde">${arrow}</a></div>
      </div>
      <div class="hero-side-note" aria-hidden="true">MUSIC · STORY · MEMORY</div>
    </section>
    <section class="collection-preview section-wrap">
      <div class="section-heading"><div><p class="eyebrow">The collection <span class="eyebrow-rule"></span></p><h2>Begin anywhere.</h2></div><a class="text-link text-link--large" href="#/operas">View all operas ${arrow}</a></div>
      <div class="opera-grid">${operas.map(operaCard).join("")}</div>
    </section>
    <section class="closing-note"><span class="closing-note__ornament" aria-hidden="true">❧</span><p>“The opera is where the impossible gets to sing.”</p><span class="eyebrow">A collection made with affection</span></section>`;
}

function directoryPage() {
  return `<section class="page-intro section-wrap">
    <p class="eyebrow"><span class="eyebrow-rule"></span> The collection</p>
    <div class="page-intro__row"><h1>Operas to<br /><em>return to.</em></h1><p>Every opera is a world of its own. Explore the stories, meet the composers, and find a place to begin listening.</p></div>
    <div class="directory-meta"><span>${String(operas.length).padStart(2, "0")} works</span><span>Curated, not ranked</span></div>
  </section>
  <section class="directory-grid section-wrap" aria-label="Opera directory">${operas.map(operaCard).join("")}</section>
  <section class="directory-note section-wrap"><span class="directory-note__mark">✳</span><p>This collection is just beginning.<br /><b>There is always room for one more.</b></p></section>`;
}

function operaPage(opera) {
  return `<div class="opera-detail">
    <div class="detail-topline section-wrap"><a href="#/operas" class="back-link">← <span>All operas</span></a><span class="eyebrow">A closer look <span>·</span> ${opera.genre}</span></div>
    <section class="detail-hero section-wrap">
      <div class="detail-copy"><p class="eyebrow">${opera.composer}</p><h1>${opera.title}</h1><p class="detail-subtitle">${opera.displayTitle !== opera.title ? opera.displayTitle : opera.genre}</p><p class="detail-summary">${opera.summary}</p><a href="#libretto" class="text-link">About this opera ${arrow}</a></div>
      ${artwork(opera, "artwork--detail")}
      <span class="detail-index">${String(operas.indexOf(opera) + 1).padStart(2, "0")} <i>/</i> ${String(operas.length).padStart(2, "0")}</span>
    </section>
    <section class="detail-facts section-wrap"><div class="facts-heading"><p class="eyebrow">At a glance</p><h2>The essentials.</h2></div><dl>
      <div><dt>Composer</dt><dd>${opera.composer}</dd></div><div><dt>Libretto</dt><dd>${opera.librettist}</dd></div><div><dt>First performed</dt><dd>${opera.premiered}</dd></div><div><dt>Premiere venue</dt><dd>${opera.premieredAt}</dd></div><div><dt>Language</dt><dd>${opera.language}</dd></div><div><dt>Structure</dt><dd>${opera.acts} acts</dd></div>
    </dl></section>
    <section class="detail-note section-wrap" id="libretto"><div class="detail-note__label"><span class="eyebrow">A personal note</span><span class="detail-note__ornament">✳</span></div><p>${opera.note}</p></section>
    <section class="libretto-placeholder section-wrap"><div><p class="eyebrow">Coming in a later chapter</p><h2>The libretto, line by line.</h2><p>The libretto and side-by-side translation will live here. For now, this page is a place to meet the opera.</p></div><span class="placeholder-mark" aria-hidden="true">Aa<br /><i>↔</i><br />Aa</span></section>
    <section class="more-operas section-wrap"><div class="section-heading"><div><p class="eyebrow">Keep wandering</p><h2>Another world awaits.</h2></div><a class="text-link text-link--large" href="#/operas">All operas ${arrow}</a></div><div class="opera-grid opera-grid--compact">${operas.filter((item) => item.slug !== opera.slug).slice(0, 3).map(operaCard).join("")}</div></section>
  </div>`;
}

function render() {
  const path = window.location.hash.replace(/^#/, "") || "/";
  if (path === "/" || path === "") {
    shell(homePage(), "home");
    document.title = "My favorite Operas — Stories that stay with us";
  } else if (path === "/operas") {
    shell(directoryPage(), "operas");
    document.title = "The collection — My favorite Operas";
  } else if (path.startsWith("/operas/")) {
    const opera = getOpera(path.split("/")[2]);
    shell(opera ? operaPage(opera) : `<section class="not-found section-wrap"><p class="eyebrow">A quiet intermission</p><h1>This page is not in the collection.</h1><a class="button button--dark" href="#/operas">Return to all operas ${arrow}</a></section>`, opera ? "operas" : "");
    document.title = opera ? `${opera.title} — My favorite Operas` : "Page not found — My favorite Operas";
  } else {
    window.location.hash = "#/";
    return;
  }
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
render();
