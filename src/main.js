import { operas, getOpera } from "./data/operas.js?v=opera-art-2";
import { createLibrettoRenderer } from "./libretto-reader.js?v=reader-18";
import { getLibretto } from "./data/libretto-registry.js?v=registry-26";
import { operaInformation } from "./data/opera-information.js?v=info-1";
import { renderOperaInformationPage } from "./opera-info-page.js?v=info-page-1";

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

// Desktop Act Outline preference is intentionally kept in memory for this visit only.
let desktopOutlineCollapsed = false;

function syncDesktopOutline() {
  const root = currentSceneReader();
  if (!root) return;
  const layout = root.querySelector(".reading-layout");
  const sidebar = root.querySelector("[data-act-outline]");
  const collapse = root.querySelector("[data-desktop-outline-collapse]");
  const expand = root.querySelector("[data-desktop-outline-expand]");
  if (!layout || !sidebar || !collapse || !expand) return;

  const mobile = window.matchMedia("(max-width: 700px)").matches;
  const collapsed = !mobile && desktopOutlineCollapsed;
  layout.classList.toggle("is-outline-collapsed", collapsed);
  collapse.hidden = mobile || collapsed;
  expand.closest(".desktop-outline-reopen").hidden = mobile || !collapsed;
  collapse.setAttribute("aria-expanded", String(!collapsed));
  expand.setAttribute("aria-expanded", String(!collapsed));

  if (mobile) {
    // Keep the separate mobile drawer inaccessible while closed after resizing.
    const drawerOpen = sidebar.classList.contains("is-open");
    sidebar.inert = !drawerOpen;
    if (drawerOpen) sidebar.removeAttribute("aria-hidden");
    else sidebar.setAttribute("aria-hidden", "true");
  } else {
    sidebar.inert = collapsed;
    if (collapsed) sidebar.setAttribute("aria-hidden", "true");
    else sidebar.removeAttribute("aria-hidden");
  }
}

function setupDesktopOutline() {
  const root = currentSceneReader();
  if (!root) return;
  syncDesktopOutline();
  const collapse = root.querySelector("[data-desktop-outline-collapse]");
  const expand = root.querySelector("[data-desktop-outline-expand]");
  collapse?.addEventListener("click", () => setDesktopOutlineCollapsed(true));
  expand?.addEventListener("click", () => setDesktopOutlineCollapsed(false));
}

function setDesktopOutlineCollapsed(collapsed) {
  const root = currentSceneReader();
  if (!root || window.matchMedia("(max-width: 700px)").matches) return;
  if (desktopOutlineCollapsed === collapsed) return;

  // Anchor a visible dialogue row even if widening the columns reflows the text.
  const siteHeight = app.querySelector(".site-header")?.getBoundingClientRect().height || 0;
  const operaHeight = root.querySelector(".opera-subnav")?.getBoundingClientRect().height || 0;
  const readingTop = siteHeight + operaHeight + 12;
  const markers = [root.querySelector(".scene-panel__top"),
    ...root.querySelectorAll(".libretto-row"),
    root.querySelector(".scene-bottom-nav")].filter(Boolean);
  const anchor = markers.find(node => node.getBoundingClientRect().bottom > readingTop) ||
    markers[markers.length - 1];
  const anchorY = anchor?.getBoundingClientRect().top;

  readerJumping = true;
  desktopOutlineCollapsed = collapsed;
  syncDesktopOutline();
  const focusTarget = root.querySelector(collapsed ? "[data-desktop-outline-expand]" : "[data-desktop-outline-collapse]");
  focusTarget?.focus({ preventScroll: true });

  window.requestAnimationFrame(() => {
    if (root.isConnected && anchor?.isConnected && Number.isFinite(anchorY)) {
      const change = anchor.getBoundingClientRect().top - anchorY;
      if (Math.abs(change) > 1) window.scrollBy(0, change);
    }
    window.requestAnimationFrame(() => {
      readerJumping = false;
      scheduleReaderSectionUpdate();
    });
  });
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
  setupDesktopOutline();
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
    const slug = app.querySelector("[data-libretto-slug]")?.dataset.librettoSlug;
    if (!slug) return;
    window.location.hash = query ? `#/operas/${slug}?q=${encodeURIComponent(query)}` : `#/operas/${slug}`;
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
            <label class="sr-only" for="hero-search">Search opera title, composer or librettist</label>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg>
            <input id="hero-search" name="q" type="search" placeholder="Search title, composer or librettist..." autocomplete="off" />
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

// Shared opera-catalog matching: ignore diacritics, capitalization and common punctuation.
function normalizeOperaSearch(value = "") {
  return String(value).normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function filterOperasByQuery(query = "") {
  const term = normalizeOperaSearch(query);
  if (!term) return [...operas];
  return operas.filter(opera => [
    opera.title, opera.displayTitle, opera.composer, opera.librettist,
    opera.genre, ...(opera.aliases || [])
  ].some(value => normalizeOperaSearch(value).includes(term)));
}

function directoryPage(query = "") {
  const matches = filterOperasByQuery(query);
  const safeQuery = query.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  return `<section class="page-intro section-wrap">
    <p class="eyebrow"><span class="eyebrow-rule"></span> The collection</p>
    <div class="page-intro__row"><h1>Operas to<br /><em>return to.</em></h1><p>Every opera is a world of its own. Explore the stories, meet the composers, and find a place to begin listening.</p></div>
    <div class="directory-tools"><form class="opera-search opera-search--directory" data-search-form role="search"><label class="sr-only" for="directory-search">Search opera title, composer or librettist</label><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg><input id="directory-search" name="q" type="search" placeholder="Search title, composer or librettist..." value="${safeQuery}" autocomplete="off" /></form><div class="directory-meta"><span>${String(matches.length).padStart(2, "0")} ${matches.length === 1 ? "work" : "works"}</span><span>Curated, not ranked</span></div></div>
  </section>
  <section class="directory-grid section-wrap" aria-label="Opera directory">${matches.map(operaCard).join("") || `<p class="empty-results">No operas match “${safeQuery}”. Try another title, composer or librettist.</p>`}</section>
  <section class="directory-note section-wrap"><span class="directory-note__mark">✳</span><p>This collection is just beginning.<br /><b>There is always room for one more.</b></p></section>`;
}

function operaDirectoryPage(query = "", sort = "title") {
  const matches = filterOperasByQuery(query);
  matches.sort((a, b) => {
    if (sort === "composer") return a.composer.localeCompare(b.composer);
    if (sort === "year") return Number(b.premiered.match(/\d{4}/)?.[0]) - Number(a.premiered.match(/\d{4}/)?.[0]);
    const titleKey = (title) => title.replace(/^Il\s+/i, "");
    return titleKey(a.title).localeCompare(titleKey(b.title), undefined, { sensitivity: "base" });
  });
  const safeQuery = query.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  
  const teasers = { "il-barbiere-di-siviglia": "A joyful comedy full of clever tricks, disguises and unforgettable music.", "cosi-fan-tutte": "A witty exploration of love, loyalty and human nature.", "tristan-und-isolde": "A passionate, tragic love story with extraordinary music.", macbeth: "A powerful drama of ambition, fate and conscience." };
  const cards = matches.map((opera, index) => {
    const year = opera.premiered.match(/\d{4}/)?.[0] || "";
    return `<a class="directory-card" href="#/operas/${opera.slug}" style="--card-index:${index}"><div class="directory-card__image directory-card__image--${opera.color}${opera.image ? " directory-card__image--standalone" : ""}" role="img" aria-label="Illustration inspired by ${opera.title}">${opera.image ? `<img src="${opera.image}" alt="" loading="lazy" />` : ""}</div><div class="directory-card__body"><h2>${opera.title}</h2><p class="directory-card__byline">${opera.composer}<span aria-hidden="true">·</span>${year}</p><p class="directory-card__summary">${teasers[opera.slug] || opera.summary}</p><span class="directory-card__button">View opera ${arrow}</span></div></a>`;
  }).join("");
  return `<section class="directory-scenic" aria-hidden="true"></section><section class="directory-intro section-wrap"><div class="directory-intro__panel"><h1>Operas</h1><p>A collection of the operas I’m exploring, with libretti and English translations.</p></div><div class="directory-tools"><form class="opera-search opera-search--directory" data-search-form role="search"><label class="sr-only" for="directory-search">Search opera title, composer or librettist</label><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5-5 5"></path></svg><input id="directory-search" name="q" type="search" placeholder="Search title, composer or librettist..." value="${safeQuery}" autocomplete="off" /></form><label class="directory-sort"><span>Sort by</span><select id="directory-sort" aria-label="Sort operas"><option value="title" ${sort === "title" ? "selected" : ""}>Title (A–Z)</option><option value="composer" ${sort === "composer" ? "selected" : ""}>Composer</option><option value="year" ${sort === "year" ? "selected" : ""}>Year (newest)</option></select></label></div></section><section class="directory-grid section-wrap" aria-label="Opera directory">${cards || `<p class="empty-results">No operas match “${safeQuery}”. Try another title, composer or librettist.</p>`}</section>`;
}

function aboutPage() {
  return `<section class="about-page section-wrap"><p class="eyebrow"><span class="eyebrow-rule"></span> About</p><h1>A personal collection<br /><em>of opera.</em></h1><p>This is a place for the operas I love: their libretti, translations, characters, and the details that make each one worth returning to.</p><a class="text-link" href="#/operas">Explore the collection ${arrow}</a></section>`;
}

function operaPage(opera, selectedScene = 1, query = "", selectedItem = 0, mobileContents = false, selectedView = "") {
  const libretto = getLibretto(opera.slug);
  if (libretto) {
    const reader = createLibrettoRenderer(libretto);
    if (selectedView === "outline") return reader.outline();
    if (selectedView === "synopsis" || (!selectedView && !query && !window.location.hash.includes("act=") && !window.location.hash.includes("scene="))) {
      return renderOperaInformationPage(opera, operaInformation[opera.slug], { navigation: reader.navigation(), hasLibretto: true });
    }
    return reader.scene(selectedScene, query, selectedItem, mobileContents);
  }
  return renderOperaInformationPage(opera, operaInformation[opera.slug]);
}

let readerJumping = false;
let readerScrollTick = false;

function currentSceneReader() {
  return app.querySelector(".opera-reading-page[data-act][data-scene]");
}

function highlightReaderSection(index, syncUrl = false) {
  const root = currentSceneReader();
  if (!root) return;
  const act = Number(root.dataset.act);
  const items = [...root.querySelectorAll(".libretto-scene-section[data-libretto-item]")];
  if (!items.length) return;
  const current = Math.max(0, Math.min(index, items.length - 1));
  const activeSection = items[current];
  const scene = Number(activeSection.dataset.sourceScene || root.dataset.scene);
  const sectionItem = Number(activeSection.dataset.librettoItem);
  root.dataset.scene = String(scene);
  if (root.dataset.continuousAct === "true") {
    const sceneNumbers = [...new Set(items.map(el => Number(el.dataset.sourceScene)))];
    const position = sceneNumbers.indexOf(scene);
    const controls = root.querySelector(".mobile-reader-toolbar nav");
    if (controls) controls.innerHTML = [-1, 1].map(delta => {
      const target = sceneNumbers[position + delta];
      const label = delta < 0 ? "‹ Prev. scene" : "Next scene ›";
      return target ? '<a class="mobile-scene-step" href="#/operas/' + root.dataset.librettoSlug + '?act=' + act + '&scene=' + target + '&item=0">' + label + '</a>' : '<span class="mobile-scene-step is-disabled" aria-disabled="true">' + label + '</span>';
    }).join("");
  }
  const sidebar = root.querySelector("[data-act-outline]");
  sidebar?.querySelectorAll(".section-nav-link").forEach(link => {
    const url = link.getAttribute("href");
    const params = new URLSearchParams(url.split("?")[1] || "");
    const selected = Number(params.get("act")) === act &&
      Number(params.get("scene")) === scene && Number(params.get("item")) === sectionItem;
    link.classList.toggle("is-current", selected);
    if (selected) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  root.querySelectorAll(".libretto-scene-section").forEach((el, i) => el.classList.toggle("is-reading", i === current));
  if (syncUrl) {
    const hash = window.location.hash;
    const [path, query = ""] = hash.split("?");
    if (path !== "#/operas/" + root.dataset.librettoSlug) return;
    const params = new URLSearchParams(query);
    if (params.get("item") !== String(sectionItem) || params.get("scene") !== String(scene)) {
      params.set("act", String(act));
      params.set("scene", String(scene));
      params.set("item", String(sectionItem));
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
  // Preserve the scene heading as the landing point until the first musical section is reached.
  if (items[0].getBoundingClientRect().top > threshold) {
    highlightReaderSection(0, false);
    return;
  }
  let active = 0;
  for (const [index, section] of items.entries()) {
    if (section.getBoundingClientRect().top <= threshold) active = index;
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
  const link = event.target.closest?.(".section-nav-link[href], .mobile-scene-step[href]");
  const root = currentSceneReader();
  if (!link || !root) return;
  const href = link.getAttribute("href") || "";
  if (!href.startsWith("#/operas/" + root.dataset.librettoSlug + "?")) return;
  const params = new URLSearchParams(href.split("?")[1] || "");
  if (Number(params.get("act")) !== Number(root.dataset.act) ||
      (root.dataset.continuousAct !== "true" && Number(params.get("scene")) !== Number(root.dataset.scene))) return;
  event.preventDefault();
  closeActOutline(false);
  const items = [...root.querySelectorAll(".libretto-scene-section[data-libretto-item]")];
  const index = root.dataset.continuousAct === "true" ? items.findIndex(el => Number(el.dataset.sourceScene) === Number(params.get("scene")) && Number(el.dataset.librettoItem) === (Number(params.get("item")) || 0)) : Number(params.get("item")) || 0;
  jumpToReaderSection(index, true);
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
    const selectedView = routeParams.get("view") || (opera && getLibretto(opera.slug) && !hasLibrettoDestination ? "synopsis" : "");
    shell(opera ? operaPage(opera, scene, query, item, mobileContents, selectedView) : `<section class="not-found section-wrap"><p class="eyebrow">A quiet intermission</p><h1>This page is not in the collection.</h1><a class="button button--dark" href="#/operas">Return to all operas ${arrow}</a></section>`, opera ? (getLibretto(opera.slug) ? "opera" : "operas") : "");
    const operaSearch = app.querySelector("#opera-search");
    if (operaSearch) operaSearch.value = query;
    document.title = opera ? `${opera.title} — My favorite Operas` : "Page not found — My favorite Operas";
  } else {
    window.location.hash = "#/";
    return;
  }
  const reader = currentSceneReader();
  const hasSectionDestination = Boolean(reader && (routeParams.has("item") || query || (reader.dataset.continuousAct === "true" && routeParams.has("scene"))));
  readerJumping = hasSectionDestination;
  window.scrollTo(0, 0);
  if (hasSectionDestination) restoreSceneReadingPosition(Number(reader.dataset.initialItem) || 0);
  else if (reader) highlightReaderSection(0, false);
  updateReaderTopButton();
}

document.addEventListener("keydown", onOutlineKeydown);
window.addEventListener("resize", () => {
  if (!window.matchMedia("(max-width: 700px)").matches) closeActOutline(false);
  syncDesktopOutline();
  measureStickyNavigation();
  scheduleReaderSectionUpdate();
});
app.addEventListener("click", handleSceneSectionLink);
window.addEventListener("scroll", scheduleReaderSectionUpdate, { passive: true });
window.addEventListener("scroll", updateReaderTopButton, { passive: true });
window.addEventListener("hashchange", render);
render();
