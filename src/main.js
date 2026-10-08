import { operas, getOpera } from "./data/operas.js";
import { cosiActOneScenes } from "./data/libretti.js?v=cosi-libretto-2";
import { cosiActTwoScenes } from "./data/libretti-act2.js?v=act2-18";

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
    <a class="brand" href="#/" aria-label="My Favorite Operas home">
      <span class="brand__name">My Favorite Operas</span>
    </a>
    <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false"><span></span><span></span></button>
    <nav class="main-nav" aria-label="Main navigation">
      <a class="${active === "home" ? "is-active" : ""}" href="#/">Home</a>
      <a class="${active === "operas" || active === "opera" ? "is-active" : ""}" href="#/operas">Operas</a>
      <a class="${active === "about" ? "is-active" : ""}" href="#/about">About</a>
    </nav>
    ${active === "opera" ? `<form class="opera-header-search" data-libretto-search role="search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg><label class="sr-only" for="opera-search">Search in this opera</label><input id="opera-search" type="search" placeholder="Search in this opera..." autocomplete="off" /></form>` : `<button class="search-trigger" aria-label="Search operas"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg></button>`}
  </header>`;
}

function footer() {
  return `<footer class="site-footer"><span>@AsuraFY</span><span>My favorite Operas</span></footer>`;
}


let outlinePreviousFocus = null;

function closeActOutline(restoreFocus = true) {
  const drawer = app.querySelector("[data-act-outline]");
  const trigger = app.querySelector("[data-outline-open]");
  const backdrop = app.querySelector("[data-outline-backdrop]");
  if (!drawer) {
    document.body.classList.remove("act-outline-open");
    return;
  }
  const wasOpen = drawer.classList.contains("is-open");
  drawer.classList.remove("is-open");
  drawer.removeAttribute("role");
  drawer.removeAttribute("aria-modal");
  drawer.inert = window.matchMedia("(max-width: 700px)").matches;
  if (drawer.inert) drawer.setAttribute("aria-hidden", "true");
  else drawer.removeAttribute("aria-hidden");
  if (backdrop) backdrop.hidden = true;
  trigger?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("act-outline-open");
  if (wasOpen && restoreFocus && outlinePreviousFocus?.isConnected) outlinePreviousFocus.focus();
  outlinePreviousFocus = null;
}

function setupActOutline() {
  const trigger = app.querySelector("[data-outline-open]");
  const drawer = app.querySelector("[data-act-outline]");
  const close = app.querySelector("[data-outline-close]");
  const backdrop = app.querySelector("[data-outline-backdrop]");
  if (!drawer || !trigger || !backdrop) return;
  const isMobile = window.matchMedia("(max-width: 700px)").matches;
  drawer.inert = isMobile;
  if (isMobile) drawer.setAttribute("aria-hidden", "true");

  trigger.addEventListener("click", () => {
    if (!window.matchMedia("(max-width: 700px)").matches) {
      drawer.querySelector(".act-heading")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
      return;
    }
    outlinePreviousFocus = document.activeElement;
    drawer.inert = false;
    drawer.removeAttribute("aria-hidden");
    drawer.classList.add("is-open");
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    trigger.setAttribute("aria-expanded", "true");
    backdrop.hidden = false;
    document.body.classList.add("act-outline-open");
    close?.focus();
    // Bring the currently read aria or recitative into view within the drawer.
    const selected = drawer.querySelector(".section-nav-link.is-current");
    if (selected) {
      const targetBounds = selected.getBoundingClientRect();
      const drawerBounds = drawer.getBoundingClientRect();
      drawer.scrollTop += targetBounds.top - drawerBounds.top - 100;
    }
  });
  close?.addEventListener("click", () => closeActOutline());
  backdrop.addEventListener("click", () => closeActOutline());
  drawer.addEventListener("click", (event) => {
    if (event.target.closest(".section-nav-link")) closeActOutline(false);
  });
}

function onOutlineKeydown(event) {
  const drawer = app.querySelector("[data-act-outline]");
  if (!drawer?.classList.contains("is-open")) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeActOutline();
    return;
  }
  if (event.key !== "Tab") return;
  const focusable = [...drawer.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')]
    .filter(element => !element.closest("details:not([open])"));
  if (!focusable.length) {
    event.preventDefault();
    drawer.focus();
    return;
  }
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (event.shiftKey && (document.activeElement === first || document.activeElement === drawer)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  } else if (!drawer.contains(document.activeElement)) {
    event.preventDefault();
    first.focus();
  }
}

let stickyBarObserver = null;

function measureStickyNavigation() {
  const header = app.querySelector(".site-header");
  const operaBar = app.querySelector(".opera-subnav");
  const mobileToolbar = app.querySelector(".mobile-reader-toolbar");
  document.documentElement.style.setProperty("--sticky-site-height", (header?.getBoundingClientRect().height || 0) + "px");
  document.documentElement.style.setProperty("--sticky-opera-height", (operaBar?.getBoundingClientRect().height || 0) + "px");
  document.documentElement.style.setProperty("--sticky-reader-height", (mobileToolbar?.getBoundingClientRect().height || 0) + "px");
}

function setupStickyNavigation() {
  stickyBarObserver?.disconnect();
  stickyBarObserver = null;
  measureStickyNavigation();
  if (typeof ResizeObserver === "function") {
    stickyBarObserver = new ResizeObserver(measureStickyNavigation);
    const header = app.querySelector(".site-header");
    const operaBar = app.querySelector(".opera-subnav");
    const toolbar = app.querySelector(".mobile-reader-toolbar");
    if (header) stickyBarObserver.observe(header);
    if (operaBar) stickyBarObserver.observe(operaBar);
    if (toolbar) stickyBarObserver.observe(toolbar);
  }
}

function shell(content, active) {
  closeActOutline(false);
  app.innerHTML = `${header(active)}<main id="main">${content}</main>${footer()}`;
  setupStickyNavigation();
  setupActOutline();
  app.querySelector("[data-reader-top]")?.addEventListener("click", () => {
    const panel = app.querySelector(".scene-panel");
    if (!panel) return;
    const toolbar = app.querySelector(".mobile-reader-toolbar");
    const target = toolbar && getComputedStyle(toolbar).display !== "none" ? toolbar : panel;
    target.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  });
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
  app.querySelector("[data-libretto-search]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = event.currentTarget.querySelector("input")?.value.trim() || "";
    window.location.hash = query ? `#/operas/cosi-fan-tutte?q=${encodeURIComponent(query)}` : "#/operas/cosi-fan-tutte";
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

function escapeHtml(value = "") {
  return String(value).replace(/[&<>\"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;", "'": "&#39;" })[character]);
}

function speakerClass(speaker) {
  return speaker.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function romanNumeral(value) {
  const numerals = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII"];
  return numerals[value] || String(value);
}

function italianSceneOrdinal(value) {
  const ordinals = ["", "PRIMA", "SECONDA", "TERZA", "QUARTA", "QUINTA", "SESTA", "SETTIMA", "OTTAVA", "NONA", "DECIMA", "UNDICESIMA", "DODICESIMA", "TREDICESIMA", "QUATTORDICESIMA", "QUINDICESIMA", "SEDICESIMA", "DICIASSETTESIMA", "ULTIMA"];
  return ordinals[value] || String(value);
}

function sectionTitles(scene, section, sectionIndex) {
  if (!/^No\./i.test(section.label)) return { original: "", translation: "" };
  // Musical sections use the Italian incipit, rather than the scene-wide title.
  if (cosiActTwoScenes.includes(scene) && scene.number === 18)
    return { original: "Fortunato l'uom che prende", translation: "" };
  if (cosiActOneScenes.includes(scene) && scene.number === 1 && sectionIndex === 0)
    return { original: scene.title, translation: "" };
  if (cosiActOneScenes.includes(scene) && scene.number === 1 && sectionIndex === 2)
    return { original: "È la fede delle femmine", translation: "A woman’s faith" };
  if (cosiActOneScenes.includes(scene) && scene.number === 1 && sectionIndex === 4)
    return { original: "Una bella serenata", translation: "A lovely serenade" };
  if (cosiActOneScenes.includes(scene) && scene.number === 2 && sectionIndex === 0)
    return { original: scene.title, translation: "Ah, look, sister" };
  if (cosiActOneScenes.includes(scene) && scene.number === 3 && section.label.startsWith("No. 5"))
    return { original: scene.title, translation: "I would speak, but have no heart" };
  const sung = section.turns.find(turn => turn.speaker !== "Stage direction" && turn.it?.trim());
  const firstLine = sung?.it.split(/\r?\n/).map(line => line.trim())
    .find(line => line && !/^\([^)]*\)$/.test(line)) || "";
  return { original: firstLine.replace(/[.,;:!?…]+$/, ""), translation: "" };
}

function sectionNavigationLabel(section, scene, sectionIndex) {
  const match = section.label.match(/^No\.\s*(\d+)\s*[—–-]\s*(.+)$/i);
  const form = match ? match[2] : (section.label.toLocaleLowerCase() === "recitative" ? "Recitativo" : section.label);
  if (!match) return form;
  const title = scene ? sectionTitles(scene, section, sectionIndex).original : "";
  return "N. " + match[1] + " · " + form + (title ? " · " + title : "");
}

function sectionPresentation(scene, section, sectionIndex) {
  const match = section.label.match(/^No\.\s*(\d+)\s*[—–-]\s*(.+)$/i);
  const form = match ? match[2] : "Recitativo";
  const titles = sectionTitles(scene, section, sectionIndex);
  const number = match ? "N. " + match[1] + " · " : "";
  const heading = number + form + (titles.original ? " · " + titles.original : "");
  const translatedForm = ({ Terzetto: "Trio", Duetto: "Duet", Aria: "Aria" })[form] || "";
  const subtitle = [translatedForm, titles.translation].filter(Boolean).join(" · ");
  return { heading, subtitle, form, number: match ? Number(match[1]) : null };
}


function cosiActCatalog() {
  return [[1,cosiActOneScenes],[2,cosiActTwoScenes]].filter(([,s])=>s.length).map(([number,scenes])=>({number,scenes}));
}
function cosiOperaBar(act = 1, page = "libretto") {
  const base = "#/operas/cosi-fan-tutte";
  const availableActs = cosiActCatalog();
  const tabs = [
    { label: "Synopsis", href: base + "?view=synopsis", current: page === "synopsis" },
    { label: "Libretto Outline", href: base + "?view=outline", current: page === "outline" },
    ...availableActs.map(({number}) => ({
      label: "Act " + romanNumeral(number),
      href: base + "?act=" + number + "&scene=1&item=0",
      current: page === "libretto" && act === number
    }))
  ];
  return '<nav class="opera-subnav" aria-label="Così fan tutte sections">' +
    '<div class="opera-subnav__identity"><span class="opera-subnav__title">Così fan tutte</span>' +
    '<span class="opera-subnav__composer">W. A. MOZART</span></div>' +
    '<div class="opera-subnav__links">' + tabs.map(tab =>
      '<a class="opera-subnav__link' + (tab.current ? ' is-active' : '') + '" href="' + tab.href + '"' +
      (tab.current ? ' aria-current="page"' : '') + '>' + tab.label + '</a>'
    ).join('') + '</div></nav>';
}


function renderActSceneLinks(act, selectedScene=0, selectedItem=-1, expandAll=false) {
  const scenes=cosiActCatalog().find(group=>group.number===act)?.scenes||[];
  return scenes.map(item=>{
    const links=item.sections.map((section,index)=>{
      const active=item.number===selectedScene&&index===selectedItem;
      const label=sectionNavigationLabel(section,item,index);
      const isSong=/^No\./i.test(section.label);
      const title=isSong?sectionTitles(item,section,index).original:"";
      const form=title?label.slice(0,-(" · "+title).length):label;
      const href="#/operas/cosi-fan-tutte?act="+act+"&scene="+item.number+"&item="+index;
      return '<a class="section-nav-link'+(active?' is-current':'')+'" href="'+href+'"'+(active?' aria-current="page"':'')+
        '><span class="section-nav-link__icon section-nav-link__icon--'+(isSong?'song':'recitative')+'" aria-hidden="true">'+(isSong?'♫':'▤')+
        '</span><span class="section-nav-link__label"><span class="section-nav-link__form">'+escapeHtml(form)+'</span>'+
        (title?'<span class="section-nav-link__title">'+escapeHtml(title)+'</span>':'')+'</span></a>';
    }).join("");
    const selected=item.number===selectedScene;
    return '<details class="scene-group'+(selected?' is-current':'')+'"'+((expandAll||selected)?' open':'')+
      '><summary class="scene-group__summary"><span>Scene '+romanNumeral(item.number)+
      '</span><span class="scene-group__chevron" aria-hidden="true">⌄</span></summary><div class="section-nav">'+links+'</div></details>';
  }).join("");
}
function renderCompleteOutlineAct(act) {
  const group = cosiActCatalog().find(entry => entry.number === act);
  if (!group) return "";
  const actName = act === 1 ? "Primo" : act === 2 ? "Secondo" : "Terzo";
  return '<details class="opera-outline__act" open aria-labelledby="outline-act-' + act + '">' +
    '<summary class="opera-outline__act-toggle"><h2 id="outline-act-' + act +
    '">Atto ' + actName + ' <span>·</span> Act ' + romanNumeral(act) +
    '<span class="opera-outline__chevron" aria-hidden="true">⌄</span></h2></summary>' +
    group.scenes.map(scene => {
      const sceneId = 'outline-scene-' + act + '-' + scene.number;
      return '<section class="opera-outline__scene" aria-labelledby="' + sceneId + '">' +
        '<h3 id="' + sceneId + '">Scena ' + italianSceneOrdinal(scene.number).toLocaleLowerCase("it-IT") +
        ' <span>·</span> Scene ' + scene.number + '</h3>' +
        '<div class="opera-outline__sections">' +
        scene.sections.map((section, index) => {
          const title = sectionPresentation(scene, section, index).heading;
          const href = '#/operas/cosi-fan-tutte?act=' + act +
            '&scene=' + scene.number + '&item=' + index;
          return '<a class="section-nav-link opera-outline__section" href="' + href + '">' +
            '<span class="opera-outline__section-title">' + escapeHtml(title) + '</span>' +
            sectionParticipantCredits(section, act, scene.number) +
          '</a>';
        }).join("") +
        '</div></section>';
    }).join("") + '</details>';
}
function cosiOutlinePage() {
  return '<div class="opera-reading-page opera-outline-page">' + cosiOperaBar(1, "outline") +
    '<section class="opera-outline" aria-labelledby="opera-outline-title">' +
    '<div class="opera-outline__heading"><h1 id="opera-outline-title">Libretto Outline</h1></div>' +
    '<div class="opera-outline__acts">' +
    cosiActCatalog().map(({ number }) => renderCompleteOutlineAct(number)).join("") +
    '</div></section></div>';
}

function cosiSynopsisPage() {
  const characters = [
    ["Fiordiligi", "Soprano", "Dorabella’s sister, engaged to Guglielmo; she struggles to remain loyal during the test."],
    ["Dorabella", "Mezzo-soprano", "Fiordiligi’s sister, engaged to Ferrando; her feelings shift during the disguised courtship."],
    ["Ferrando", "Tenor", "A young officer engaged to Dorabella, who joins Alfonso’s wager and disguises himself."],
    ["Guglielmo", "Baritone", "An officer engaged to Fiordiligi, who joins Ferrando in the test of fidelity."],
    ["Don Alfonso", "Bass", "An older philosopher who doubts constancy and devises the wager."],
    ["Despina", "Soprano", "The sisters’ quick-witted maid, enlisted to help carry out Alfonso’s scheme."]
  ];
  return '<div class="opera-reading-page">' + cosiOperaBar(1, "synopsis") +
    '<article class="opera-synopsis">' +
    '<p class="opera-synopsis__eyebrow">W. A. Mozart · Opera buffa in two acts</p>' +
    '<h1>Synopsis</h1>' +
    '<p>Two young officers, Ferrando and Guglielmo, are certain their fiancées, Dorabella and Fiordiligi, will always be faithful. Don Alfonso challenges their confidence with a wager: the officers must pretend to leave for war, return in disguise, and attempt to win each other’s beloved.</p>' +
    '<p>With help from the sisters’ maid Despina, Alfonso engineers increasingly elaborate encounters. The deception tests all four lovers, culminating in a staged wedding and a final revelation that forces them to confront love, loyalty and human inconsistency.</p>' +
    '<h2>Principal characters</h2><div class="opera-synopsis__characters">' +
    characters.map(([name, role, description]) => '<div class="opera-synopsis__character"><h3>' + name +
      '</h3><span>' + role + '</span><p>' + description + '</p></div>').join('') +
    '</div></article></div>';
}



function sectionParticipantCredits(section, act, sceneNumber) {
  const named = ["Fiordiligi", "Dorabella", "Ferrando", "Guglielmo", "Don Alfonso", "Despina"];
  const speakers = section.turns.filter(t => t.speaker !== "Stage direction").map(t => t.speaker);
  const costumes = {
    "1:11": ["Ferrando", "Guglielmo"], "1:15": ["Ferrando", "Guglielmo"],
    "1:16": ["Ferrando", "Guglielmo"], "2:4": ["Ferrando", "Guglielmo"],
    "2:5": ["Guglielmo"], "2:6": ["Ferrando"],
    "2:12": ["Ferrando"], "2:16": ["Ferrando", "Guglielmo"],
    "2:17": ["Ferrando", "Guglielmo"]
  };
  const names = named.filter(name => speakers.some(s => s.includes(name))).map(name => {
    if (name === "Despina" && act === 1 && sceneNumber === 16) return name + " (disguised as a doctor)";
    if (name === "Despina" && act === 2 && sceneNumber === 17) return name + " (disguised as a notary)";
    if ((costumes[act + ":" + sceneNumber] || []).includes(name)) return name + " (disguised as an Albanian suitor)";
    return name;
  });
  if (speakers.includes("Soldiers & townspeople")) names.push("Soldiers & townspeople");
  if (speakers.includes("Chorus of Servants & Musicians")) names.push("Servants & musicians (chorus)");
  else if (speakers.includes("Chorus")) names.push("Chorus");
  if (!names.length) return "";
  const icon = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false">' +
    '<circle cx="9" cy="7.5" r="3"/><path d="M3.5 20v-2a5.5 5.5 0 0 1 11 0v2"/>' +
    '<path d="M16.5 4.7a3 3 0 0 1 0 5.6M18 14a4 4 0 0 1 3 4v2"/></svg>';
  return '<div class="libretto-participants" aria-label="Singers and speakers in this section">' +
    icon + '<span>' + escapeHtml(names.join(", ")) + '</span></div>';
}

function renderCosiSceneSection(scene, section, sectionIndex, act) {
  const heading = sectionPresentation(scene, section, sectionIndex);
  const rows = section.turns.map(turn => {
    const className = speakerClass(turn.speaker);
    const speaker = '<span class="libretto-speaker libretto-speaker--' + className + '">' + escapeHtml(turn.speaker) + '</span>';
    const type = className === 'stage-direction' ? ' libretto-row--stage-direction' : '';
    return '<div class="libretto-row' + type + '"><div class="libretto-cell libretto-cell--italian">' +
      speaker + '<p>' + escapeHtml(turn.it) + '</p></div><div class="libretto-cell libretto-cell--english">' +
      speaker + '<p>' + escapeHtml(turn.en) + '</p></div></div>';
  }).join('');
  return '<section class="libretto-scene-section" id="libretto-section-' + act + '-' + scene.number +
    '-' + sectionIndex + '" data-libretto-item="' + sectionIndex + '">' +
    '<div class="selected-section-heading"><h2>' + escapeHtml(heading.heading) + '</h2>' +
    sectionParticipantCredits(section, act, scene.number) + '</div>' +
    '<div class="libretto-columns"><div class="libretto-column-heading">Italiano</div>' +
    '<div class="libretto-column-heading">English</div><div class="libretto-text">' +
    '<section class="libretto-section"><div class="libretto-section__label">' +
    escapeHtml(sectionNavigationLabel(section, scene, sectionIndex)) + '</div>' +
    rows + '</section></div></div></section>';
}

function conciseSceneSummary(scene) {
  const text = (scene.summary || "").trim();
  const sentences = (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).map(s => s.trim());
  return (text.split(/\s+/).length > 35 ? sentences.slice(0, 1) : sentences.slice(0, 2)).join(" ");
}

function cosiOperaPage(selectedNumber = 1, query = "", selectedItem = 0, mobileContents = false) {
  const requested=Number(new URLSearchParams(window.location.hash.split("?")[1]||"").get("act"))||1;
  const group=cosiActCatalog().find(group=>group.number===requested)||cosiActCatalog()[0];
  const act=group.number, scenes=group.scenes;
  const searchTerm = query.trim().toLocaleLowerCase();
  let found = null;
  if (searchTerm) {
    scenes.some((candidate) => candidate.sections.some((section, sectionIndex) => {
      const hasMatch = section.turns.some((turn) => (turn.speaker + " " + turn.it + " " + turn.en).toLocaleLowerCase().includes(searchTerm));
      if (hasMatch) {
        found = { scene: candidate.number, item: sectionIndex };
        return true;
      }
      return false;
    }));
  }
  const scene = scenes.find((item) => item.number === (found?.scene || selectedNumber)) || scenes[0];
  const itemIndex = Math.max(0, Math.min(found?.item ?? selectedItem, scene.sections.length - 1));
  const safeQuery = escapeHtml(query);
  const sceneLabel = "Scene " + romanNumeral(scene.number);
  const actLabel = "Act " + romanNumeral(act);
  const sceneLinks = renderActSceneLinks(act, scene.number, itemIndex, true);
  const previous = scene.number > 1 ? '<a class="mobile-scene-step" href="#/operas/cosi-fan-tutte?act=' + act + '&scene=' + (scene.number - 1) + '&item=0">‹ <span>Prev. scene</span></a>' : '<span class="mobile-scene-step is-disabled" aria-disabled="true">‹ <span>Prev. scene</span></span>';
  const next = scene.number < scenes.length ? '<a class="mobile-scene-step" href="#/operas/cosi-fan-tutte?act=' + act + '&scene=' + (scene.number + 1) + '&item=0"><span>Next scene</span> ›</a>' : '<span class="mobile-scene-step is-disabled" aria-disabled="true"><span>Next scene</span> ›</span>';
  const followingAct = cosiActCatalog().find(group => group.number > act);
  const bottomNext = scene.number < scenes.length ? next : followingAct ?
    '<a class="mobile-scene-step" href="#/operas/cosi-fan-tutte?act=' + followingAct.number + '&scene=1&item=0">Continue to Act ' + romanNumeral(followingAct.number) + ' →</a>' :
    '<span class="mobile-scene-step is-disabled" aria-disabled="true">End of opera</span>';
  const bottomSceneNavigation = '<nav class="scene-bottom-nav" aria-label="Scene navigation at end of scene">' +
    '<p class="scene-bottom-nav__label">End of ' + sceneLabel + '</p>' +
    '<div class="scene-bottom-nav__controls">' + previous + bottomNext + '</div></nav>';
  const outlineButton = '<button type="button" class="back-to-scenes act-outline__trigger" data-outline-open aria-controls="act-outline" aria-haspopup="dialog" aria-expanded="false">☰ <span>Outline</span></button>';
  return '<div class="opera-reading-page" data-act="' + act + '" data-scene="' + scene.number + '" data-initial-item="' + itemIndex + '">' +
    cosiOperaBar(act) +
    '<section class="mobile-opera-intro"><div class="mobile-opera-intro__art" role="img" aria-label="Lake Como landscape"></div><div class="mobile-opera-intro__title"><h1>Così fan tutte</h1><p>W. A. Mozart</p></div></section>' +
    '<div class="reading-layout">' +
      '<div class="act-outline__backdrop" data-outline-backdrop hidden aria-hidden="true"></div>' +
      '<aside class="scene-sidebar" id="act-outline" data-act-outline aria-label="' + actLabel + ' outline" tabindex="-1">' +
        '<div class="act-outline__top"><span>' + actLabel + ' · Outline</span><button type="button" data-outline-close aria-label="Close outline">×</button></div>' +
        '<details class="act-group" open><summary class="act-heading"><h2>' + actLabel + '</h2><span aria-hidden="true">⌄</span></summary><nav aria-label="Scenes in ' + actLabel + '">' + sceneLinks + '</nav></details></aside>' +
      '<div class="reading-main"><section class="scene-panel">' +
        '<div class="mobile-reader-toolbar">' + outlineButton + '<nav aria-label="Scene navigation">' + previous + next + '</nav></div>' +
        '<div class="scene-panel__top">' +
          '<h1 class="scene-context">ATTO ' + (act === 2 ? "SECONDO" : "PRIMO") +
          ' · ' + actLabel.toUpperCase() + ' <span>/</span> SCENA ' +
          italianSceneOrdinal(scene.number) + ' · ' + sceneLabel.toUpperCase() + '</h1>' +
          '<p class="scene-summary">' + escapeHtml(conciseSceneSummary(scene)) + '</p>' +
        '</div>' +
        (searchTerm ? '<p class="libretto-search-result" role="status">' + (found ? 'Showing the first passage containing “' + safeQuery + '”.' : 'No passage in this act contains “' + safeQuery + '”. Showing Scene ' + scene.number + '.') + '</p>' : '') +
        scene.sections.map((part, index) => renderCosiSceneSection(scene, part, index, act)).join("") +
        bottomSceneNavigation +
      '</section></div>' +
    '</div>' +
    '<button class="libretto-back-to-top" type="button" data-reader-top hidden aria-label="Back to scene navigation" title="Back to scene navigation"><span aria-hidden="true">↑</span><span aria-hidden="true">Top</span></button>' +
  '</div>';
}
function operaPage(opera, selectedScene = 1, query = "", selectedItem = 0, mobileContents = false, selectedView = "") {
  if (opera.slug === "cosi-fan-tutte") return selectedView === "synopsis"
    ? cosiSynopsisPage()
    : selectedView === "outline" ? cosiOutlinePage()
    : cosiOperaPage(selectedScene, query, selectedItem, mobileContents);
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


let readerJumping = false;
let readerScrollTick = false;

function currentSceneReader() {
  return app.querySelector(".opera-reading-page[data-act][data-scene]");
}

function highlightReaderSection(index, syncUrl = false) {
  const root = currentSceneReader();
  if (!root) return;
  const act = Number(root.dataset.act), scene = Number(root.dataset.scene);
  const items = [...root.querySelectorAll(".libretto-scene-section[data-libretto-item]")];
  if (!items.length) return;
  const current = Math.max(0, Math.min(index, items.length - 1));
  const sidebar = root.querySelector("[data-act-outline]");
  sidebar?.querySelectorAll(".section-nav-link").forEach(link => {
    const url = link.getAttribute("href");
    const params = new URLSearchParams(url.split("?")[1] || "");
    const selected = Number(params.get("act")) === act &&
      Number(params.get("scene")) === scene && Number(params.get("item")) === current;
    link.classList.toggle("is-current", selected);
    if (selected) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  root.querySelectorAll(".libretto-scene-section").forEach((el, i) => el.classList.toggle("is-reading", i === current));
  if (syncUrl) {
    const hash = window.location.hash;
    const [path, query = ""] = hash.split("?");
    if (path !== "#/operas/cosi-fan-tutte") return;
    const params = new URLSearchParams(query);
    if (params.get("item") !== String(current)) {
      params.set("act", String(act));
      params.set("scene", String(scene));
      params.set("item", String(current));
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search + path + "?" + params.toString());
    }
  }
  if (sidebar && window.matchMedia("(min-width: 701px)").matches) {
    const active = sidebar.querySelector(".section-nav-link.is-current");
    if (active) {
      const bounds = active.getBoundingClientRect(), panel = sidebar.getBoundingClientRect();
      if (bounds.top < panel.top + 20) sidebar.scrollTop += bounds.top - panel.top - 45;
      else if (bounds.bottom > panel.bottom - 25) sidebar.scrollTop += bounds.bottom - panel.bottom + 45;
    }
  }
}

function jumpToReaderSection(index, smooth = false) {
  const root = currentSceneReader();
  if (!root) return;
  const items = [...root.querySelectorAll(".libretto-scene-section[data-libretto-item]")];
  const target = items[index];
  if (!target) return;
  readerJumping = true;
  highlightReaderSection(index, true);
  target.scrollIntoView({
    block: "start",
    behavior: smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "auto"
  });
  // Defer scroll tracking until the intentional jump has settled.
  window.setTimeout(() => {
    readerJumping = false;
    scheduleReaderSectionUpdate();
  }, smooth ? 600 : 100);
}

function updateReaderSectionPosition() {
  if (readerJumping) return;
  const root = currentSceneReader();
  if (!root) return;
  const items = [...root.querySelectorAll(".libretto-scene-section[data-libretto-item]")];
  if (!items.length) return;
  const siteHeight = app.querySelector(".site-header")?.getBoundingClientRect().height || 0;
  const barHeight = root.querySelector(".opera-subnav")?.getBoundingClientRect().height || 0;
  const toolbarHeight = root.querySelector(".mobile-reader-toolbar")?.getBoundingClientRect().height || 0;
  const threshold = siteHeight + barHeight + toolbarHeight + 18;
  let active = 0;
  for (const section of items) {
    if (section.getBoundingClientRect().top <= threshold) active = Number(section.dataset.librettoItem);
    else break;
  }
  highlightReaderSection(active, true);
}

function scheduleReaderSectionUpdate() {
  if (readerScrollTick) return;
  readerScrollTick = true;
  window.requestAnimationFrame(() => {
    readerScrollTick = false;
    updateReaderSectionPosition();
  });
}

function handleSceneSectionLink(event) {
  const link = event.target.closest?.(".section-nav-link[href]");
  const root = currentSceneReader();
  if (!link || !root) return;
  const href = link.getAttribute("href") || "";
  if (!href.startsWith("#/operas/cosi-fan-tutte?")) return;
  const params = new URLSearchParams(href.split("?")[1] || "");
  if (Number(params.get("act")) !== Number(root.dataset.act) ||
      Number(params.get("scene")) !== Number(root.dataset.scene)) return;
  event.preventDefault();
  closeActOutline(false);
  jumpToReaderSection(Number(params.get("item")) || 0, true);
}

function restoreSceneReadingPosition(item) {
  if (!currentSceneReader()) return;
  readerJumping = true;
  highlightReaderSection(item, false);
  window.requestAnimationFrame(() => jumpToReaderSection(item, false));
}

function updateReaderTopButton() {
  const button = app.querySelector("[data-reader-top]");
  const panel = app.querySelector(".scene-panel");
  if (!button || !panel) return;
  const panelStart = window.scrollY + panel.getBoundingClientRect().top;
  button.hidden = window.scrollY < panelStart + 280;
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
    const scene = Number(routeParams.get("scene")) || 1;
    const item = Number(routeParams.get("item")) || 0;
    const mobileContents = routeParams.get("contents") === "1" || (!routeParams.has("scene") && !routeParams.has("item") && !query);
    const hasLibrettoDestination = routeParams.has("act") || routeParams.has("scene") || routeParams.has("item") || Boolean(query) || routeParams.has("contents");
    const selectedView = routeParams.get("view") || (opera?.slug === "cosi-fan-tutte" && !hasLibrettoDestination ? "synopsis" : "");
    shell(opera ? operaPage(opera, scene, query, item, mobileContents, selectedView) : `<section class="not-found section-wrap"><p class="eyebrow">A quiet intermission</p><h1>This page is not in the collection.</h1><a class="button button--dark" href="#/operas">Return to all operas ${arrow}</a></section>`, opera ? (opera.slug === "cosi-fan-tutte" ? "opera" : "operas") : "");
    const operaSearch = app.querySelector("#opera-search");
    if (operaSearch) operaSearch.value = query;
    document.title = opera ? `${opera.title} — My favorite Operas` : "Page not found — My favorite Operas";
  } else {
    window.location.hash = "#/";
    return;
  }
  const reader = currentSceneReader();
  readerJumping = Boolean(reader);
  window.scrollTo(0, 0);
  if (reader) restoreSceneReadingPosition(Number(reader.dataset.initialItem) || 0);
  updateReaderTopButton();
}

document.addEventListener("keydown", onOutlineKeydown);
window.addEventListener("resize", () => {
  if (!window.matchMedia("(max-width: 700px)").matches) closeActOutline(false);
  measureStickyNavigation();
  scheduleReaderSectionUpdate();
});
app.addEventListener("click", handleSceneSectionLink);
window.addEventListener("scroll", scheduleReaderSectionUpdate, { passive: true });
window.addEventListener("scroll", updateReaderTopButton, { passive: true });
window.addEventListener("hashchange", render);
render();
