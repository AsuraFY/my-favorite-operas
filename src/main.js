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
      <span class="brand__name">My favorite Operas</span>
    </a>
    <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false"><span></span><span></span></button>
    <nav class="main-nav" aria-label="Main navigation">
      <a class="${active === "home" ? "is-active" : ""}" href="#/">Home</a>
      <a class="${active === "operas" ? "is-active" : ""}" href="#/operas">Operas</a>
      <a class="${active === "about" ? "is-active" : ""}" href="#/about">About</a>
    </nav>
    <button class="search-trigger" aria-label="Search operas"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg></button>
  </header>`;
}

function footer() {
  return `<footer class="site-footer"><span>@AsuraFY</span><span>My favorite Operas</span></footer>`;
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
  app.querySelector(".search-trigger")?.addEventListener("click", () => {
    const field = app.querySelector("#hero-search, #directory-search");
    if (field) field.focus();
    else window.location.hash = "#/operas";
  });
  app.querySelectorAll("[data-search-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = form.querySelector("input")?.value.trim() || "";
      window.location.hash = query ? `#/operas?q=${encodeURIComponent(query)}` : "#/operas";
    });
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
  return `<section class="home-banner" aria-label="Welcome">
      <div class="home-banner__shade">
        <div class="home-banner__content">
          <h1>My favorite Operas</h1>
          <p>Libretti, translations and notes<br />for the operas I love.</p>
          <form class="opera-search opera-search--hero" data-search-form role="search">
            <label class="sr-only" for="hero-search">Search an opera</label>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg>
            <input id="hero-search" name="q" type="search" placeholder="Search an opera..." autocomplete="off" />
          </form>
        </div>
      </div>
    </section>
    <section class="home-notes" aria-label="About the collection">
      <article class="home-note"><span class="home-note__icon"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 8.5c-3.1-2-6.3-2.1-10-1.3v16c3.7-.8 6.9-.7 10 1.3m0-16c3.1-2 6.3-2.1 10-1.3v16c-3.7-.8-6.9-.7-10 1.3m0-16v17.3"/></svg></span><p>Original language<br />and English translation<br />side by side</p></article>
      <article class="home-note"><span class="home-note__icon"><svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="8" cy="9" r="1.2"/><circle cx="8" cy="16" r="1.2"/><circle cx="8" cy="23" r="1.2"/><path d="M13 9h12M13 16h12M13 23h12"/></svg></span><p>Easy navigation<br />by act, scene and aria</p></article>
      <article class="home-note"><span class="home-note__icon"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4.5 11.5 16 6l11.5 5.5L16 17zM7 13v7c5.6 4.2 12.4 4.2 18 0v-7M27.5 12v9"/><path d="M14 11.2c-2.4-2.3-5.7.4-1.8 3.4L14 16l1.8-1.4c3.9-3-.1-5.7-1.8-3.4z"/></svg></span><p>Main characters<br />and synopsis</p></article>
      <article class="home-note"><span class="home-note__icon"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M19 7v17.2a4 4 0 1 1-2-3.5V11l10-2.5v12.7a4 4 0 1 1-2-3.5V6z"/></svg></span><p>A growing collection<br />of my favorite operas</p></article>
    </section>
    <div class="home-spacer" aria-hidden="true"></div>`;
}

function directoryPage(query = "") {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const matches = operas.filter((opera) => `${opera.title} ${opera.composer} ${opera.displayTitle} ${opera.genre}`.toLocaleLowerCase().includes(normalizedQuery));
  const safeQuery = query.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  return `<section class="page-intro section-wrap">
    <p class="eyebrow"><span class="eyebrow-rule"></span> The collection</p>
    <div class="page-intro__row"><h1>Operas to<br /><em>return to.</em></h1><p>Every opera is a world of its own. Explore the stories, meet the composers, and find a place to begin listening.</p></div>
    <div class="directory-tools"><form class="opera-search opera-search--directory" data-search-form role="search"><label class="sr-only" for="directory-search">Search an opera</label><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg><input id="directory-search" name="q" type="search" placeholder="Search an opera..." value="${safeQuery}" autocomplete="off" /></form><div class="directory-meta"><span>${String(matches.length).padStart(2, "0")} ${matches.length === 1 ? "work" : "works"}</span><span>Curated, not ranked</span></div></div>
  </section>
  <section class="directory-grid section-wrap" aria-label="Opera directory">${matches.map(operaCard).join("") || `<p class="empty-results">No operas match “${safeQuery}”. Try another title or composer.</p>`}</section>
  <section class="directory-note section-wrap"><span class="directory-note__mark">✳</span><p>This collection is just beginning.<br /><b>There is always room for one more.</b></p></section>`;
}

function operaDirectoryPage(query = "", sort = "title") {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const matches = operas.filter((opera) => `${opera.title} ${opera.composer} ${opera.displayTitle} ${opera.genre}`.toLocaleLowerCase().includes(normalizedQuery));
  matches.sort((a, b) => {
    if (sort === "composer") return a.composer.localeCompare(b.composer);
    if (sort === "year") return Number(b.premiered.match(/\d{4}/)?.[0]) - Number(a.premiered.match(/\d{4}/)?.[0]);
    const titleKey = (title) => title.replace(/^Il\s+/i, "");
    return titleKey(a.title).localeCompare(titleKey(b.title), undefined, { sensitivity: "base" });
  });
  const safeQuery = query.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  const images = { "il-barbiere-di-siviglia": "barber", "cosi-fan-tutte": "cosi", "tristan-und-isolde": "tristan", macbeth: "macbeth" };
  const teasers = { "il-barbiere-di-siviglia": "A joyful comedy full of clever tricks, disguises and unforgettable music.", "cosi-fan-tutte": "A witty exploration of love, loyalty and human nature.", "tristan-und-isolde": "A passionate, tragic love story with extraordinary music.", macbeth: "A powerful drama of ambition, fate and conscience." };
  const cards = matches.map((opera, index) => {
    const year = opera.premiered.match(/\d{4}/)?.[0] || "";
    return `<a class="directory-card" href="#/operas/${opera.slug}" style="--card-index:${index}"><div class="directory-card__image directory-card__image--${images[opera.slug]}" role="img" aria-label="Illustration inspired by ${opera.title}"></div><div class="directory-card__body"><h2>${opera.title}</h2><p class="directory-card__byline">${opera.composer}<span aria-hidden="true">·</span>${year}</p><p class="directory-card__summary">${teasers[opera.slug] || opera.summary}</p><span class="directory-card__button">View opera ${arrow}</span></div></a>`;
  }).join("");
  return `<section class="directory-scenic" aria-hidden="true"></section><section class="directory-intro section-wrap"><div class="directory-intro__panel"><h1>Operas</h1><p>A collection of the operas I’m exploring, with libretti and English translations.</p></div><div class="directory-tools"><form class="opera-search opera-search--directory" data-search-form role="search"><label class="sr-only" for="directory-search">Search an opera</label><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5-5 5"></path></svg><input id="directory-search" name="q" type="search" placeholder="Search an opera..." value="${safeQuery}" autocomplete="off" /></form><label class="directory-sort"><span>Sort by</span><select id="directory-sort" aria-label="Sort operas"><option value="title" ${sort === "title" ? "selected" : ""}>Title (A–Z)</option><option value="composer" ${sort === "composer" ? "selected" : ""}>Composer</option><option value="year" ${sort === "year" ? "selected" : ""}>Year (newest)</option></select></label></div></section><section class="directory-grid section-wrap" aria-label="Opera directory">${cards || `<p class="empty-results">No operas match “${safeQuery}”. Try another title or composer.</p>`}</section>`;
}

function aboutPage() {
  return `<section class="about-page section-wrap"><p class="eyebrow"><span class="eyebrow-rule"></span> About</p><h1>A personal collection<br /><em>of opera.</em></h1><p>This is a place for the operas I love: their libretti, translations, characters, and the details that make each one worth returning to.</p><a class="text-link" href="#/operas">Explore the collection ${arrow}</a></section>`;
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
  const route = window.location.hash.replace(/^#/, "") || "/";
  const [path, queryString = ""] = route.split("?");
  const routeParams = new URLSearchParams(queryString);
  const query = routeParams.get("q") || "";
  const sort = routeParams.get("sort") || "title";
  if (path === "/" || path === "") {
    shell(homePage(), "home");
    document.title = "My favorite Operas";
  } else if (path === "/operas") {
    shell(operaDirectoryPage(query, sort), "operas");
    app.querySelector("#directory-sort")?.addEventListener("change", (event) => {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      params.set("sort", event.currentTarget.value);
      window.location.hash = `#/operas?${params.toString()}`;
    });
    document.title = "The collection — My favorite Operas";
  } else if (path === "/about") {
    shell(aboutPage(), "about");
    document.title = "About — My favorite Operas";
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
