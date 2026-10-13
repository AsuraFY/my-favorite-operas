Warning: truncated output (original token count: 10409)
Total output lines: 775

import { operas, getOpera } from "./data/operas.js?v=tosca-act1-2";
import { createLibrettoRenderer } from "./libretto-reader.js?v=reader-27";
import { getLibretto } from "./data/libretto-registry.js?v=tosca-outline-characters-1";
import { operaInformation } from "./data/opera-information.js?v=info-9";
import { renderOperaInformationPage, renderPlannedLibrettoPage } from "./opera-info-page.js?v=info-page-2";
import { renderMusicalsPage, renderMusicalPage } from "./musicals-page.js?v=musical-tabs-1";

const app = document.querySelector("#app");

const FONT_PREFERENCE_KEY = "favorite-operas-font-choice";
const FONT_CHOICES = new Set(["current", "roboto", "system"]);
const THEME_PREFERENCE_KEY = "favorite-operas-theme-choice";
const FONT_SIZE_PREFERENCE_KEY = "favorite-operas-font-size";
const THEME_CHOICES = new Set(["day", "night"]);
const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 24;

function readFontChoice() {
  try {
    const choice = localStorage.getItem(FONT_PREFERENCE_KEY);
    return FONT_CHOICES.has(choice) ? choice : "current";
  } catch {
    return "current";
  }
}

let activeFontChoice = readFontChoice();
document.documentElement.dataset.fontChoice = activeFontChoice;

function readPreference(key, choices, fallback) {
  try {
    const choice = localStorage.getItem(key);
    return choices.has(choice) ? choice : fallback;
  } catch {
    return fallback;
  }
}

let activeTheme = readPreference(THEME_PREFERENCE_KEY, THEME_CHOICES, "day");
function readFontSize() {
  try {
    const saved = localStorage.getItem(FONT_SIZE_PREFERENCE_KEY);
    const legacySizes = { small: 14, medium: 16, large: 18 };
    const size = Number(saved) || legacySizes[saved] || 16;
    return Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, size));
  } catch {
    return 16;
  }
}
let activeFontSize = readFontSize();
let settingsOutsidePointerHandler = null;
document.documentElement.dataset.theme = activeTheme;
document.documentElement.dataset.fontSize = String(activeFontSize);
document.documentElement.style.fontSize = `${activeFontSize}px`;
document.documentElement.style.setProperty("--reading-scale", String(activeFontSize / 16));

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
      <a class="${active === "musicals" || active === "musical" ? "is-active" : ""}" href="#/musicals">Musicals</a>
      <button class="settings-nav-trigger" type="button" data-settings-toggle aria-label="Open settings" aria-expanded="false" aria-controls="site-settings">Settings</button>
    </nav>
    <div class="header-actions">
      <form class="site-header-search" data-site-search role="search"><label class="sr-only" for="header-search">Search operas</label><input id="header-search" type="search" placeholder="Search operas..." autocomplete="off" /></form>
      <button class="mobile-action-trigger mobile-search-trigger" type="button" data-mobile-search-toggle aria-label="Search">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg>
      </button>
      <button class="mobile-action-trigger mobile-settings-trigger" type="button" data-settings-toggle aria-label="Open settings" aria-expanded="false" aria-controls="site-settings">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z"/><path d="m19.2 13.7 1.2.9-1.6 2.8-1.4-.6a…8409 tokens truncated…
    document.title = "Musicals — My favorite Operas";
  } else if (path.startsWith("/musicals/")) {
    const slug = path.split("/")[2];
    if (slug === "mahler-symphony-2-resurrection") {
      shell(renderMusicalPage(routeParams.get("view") || "about"), "musical");
      document.title = `${"Symphony No. 2: Resurrection"} — Musicals`;
    } else {
      shell(`<section class="not-found section-wrap"><p class="eyebrow">A quiet intermission</p><h1>This musical is not in the collection.</h1><a class="button button--dark" href="#/musicals">Return to musicals ${arrow}</a></section>`, "musicals");
      document.title = "Musical not found — Musicals";
    }
  } else if (path.startsWith("/operas/")) {
    const opera = getOpera(path.split("/")[2]);
    const scene = Number(routeParams.get("scene")) || 1;
    const item = Number(routeParams.get("item")) || 0;
    const mobileContents = routeParams.get("contents") === "1" || (!routeParams.has("scene") && !routeParams.has("item") && !query);
    const hasLibrettoDestination = routeParams.has("act") || routeParams.has("scene") || routeParams.has("item") || Boolean(query) || routeParams.has("contents");
    const selectedView = routeParams.get("view") || (opera && getLibretto(opera.slug) && !hasLibrettoDestination ? "synopsis" : "");
    shell(opera ? operaPage(opera, scene, query, item, mobileContents, selectedView) : `<section class="not-found section-wrap"><p class="eyebrow">A quiet intermission</p><h1>This page is not in the collection.</h1><a class="button button--dark" href="#/operas">Return to all operas ${arrow}</a></section>`, opera ? (getLibretto(opera.slug) ? "opera" : "operas") : "");
    document.title = opera ? `${opera.title} — My favorite Operas` : "Page not found — My favorite Operas";
  } else {
    window.location.hash = "#/";
    return;
  }
  const reader = currentSceneReader();
  const hasSectionDestination = Boolean(reader && (routeParams.has("item") || routeParams.has("turn") || query || (reader.dataset.continuousAct === "true" && routeParams.has("scene"))));
  readerJumping = hasSectionDestination;
  window.scrollTo(0, 0);
  if (hasSectionDestination && !routeParams.has("turn")) restoreSceneReadingPosition(Number(reader.dataset.initialItem) || 0);
  else if (reader) highlightReaderSection(0, false);
  if (reader && routeParams.has("turn")) {
    const target = reader.querySelector("#libretto-turn-" + Number(reader.dataset.act) + "-" +
      (Number(routeParams.get("scene")) || 1) + "-" + (Number(routeParams.get("item")) || 0) + "-" + Number(routeParams.get("turn")));
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      if (!target) return;
      const readingTop = (reader.querySelector(".opera-subnav")?.getBoundingClientRect().bottom || 120) +
        (reader.querySelector(".mobile-reader-toolbar")?.getBoundingClientRect().height || 0) + 18;
      window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - readingTop, behavior: "auto" });
      readerJumping = false;
      scheduleReaderSectionUpdate();
    }));
  }
  updateReaderTopButton();
}

function handleSkipLink(event) {
  const main = document.querySelector("#main");
  if (!main) return;
  event.preventDefault();
  main.setAttribute("tabindex", "-1");
  main.focus({ preventScroll: true });
  main.scrollIntoView({ block: "start" });
}

document.querySelector(".skip-link")?.addEventListener("click", handleSkipLink);
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



