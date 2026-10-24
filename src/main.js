import { operas, getOpera } from "./data/operas.js?v=tosca-act1-2";
import { MIN_ROW_GAP, MAX_ROW_GAP, DEFAULT_ROW_GAP, normalizeRowGap, migrateLineSpacing, stepRowGap, applyReadingSpacing } from "./reading-spacing.js?v=lyric-row-gap-20261023";
import { createLibrettoRenderer } from "./libretto-reader.js?v=favorite-outline-reference-20261024";
import { hasCompleteLibretto, loadLibretto } from "./data/libretto-loader.js?v=on-demand-20261023";
import { operaInformation } from "./data/opera-information.js?v=favorite-outline-reference-20261024";
import { renderOperaInformationPage, renderPlannedLibrettoPage, hydrateFavoriteCovers } from "./opera-info-page.js?v=favorite-outline-reference-20261024";
import { renderOperaBreadcrumb, filterOperasByComposer } from "./opera-breadcrumb.js?v=breadcrumb-shared-1";
import { renderMusicalsPage, renderMusicalPage } from "./musicals-page.js?v=beethoven-credit-20261020";

const app = document.querySelector("#app");

const FONT_PREFERENCE_KEY = "favorite-operas-font-choice";
const FONT_CHOICES = new Set(["current", "roboto", "system"]);
const THEME_PREFERENCE_KEY = "favorite-operas-theme-choice";
const FONT_SIZE_PREFERENCE_KEY = "favorite-operas-font-size";
const ROW_GAP_PREFERENCE_KEY = "favorite-operas-row-gap";
const LEGACY_SPACING_PREFERENCE_KEY = "favorite-operas-line-spacing";
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
function readRowGap() {
  try {
    const saved = localStorage.getItem(ROW_GAP_PREFERENCE_KEY);
    if (saved !== null) return normalizeRowGap(saved);
    return migrateLineSpacing(localStorage.getItem(LEGACY_SPACING_PREFERENCE_KEY));
  } catch { return DEFAULT_ROW_GAP; }
}
let activeRowGap = readRowGap();
let settingsOutsidePointerHandler = null;
document.documentElement.dataset.theme = activeTheme;
document.documentElement.dataset.fontSize = String(activeFontSize);
document.documentElement.style.fontSize = `${activeFontSize}px`;
document.documentElement.style.setProperty("--reading-scale", String(activeFontSize / 16));
applyReadingSpacing(document.documentElement, activeRowGap);

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
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z"/><path d="m19.2 13.7 1.2.9-1.6 2.8-1.4-.6a7.9 7.9 0 0 1-1.7 1l-.2 1.5h-3.2l-.2-1.5a7.9 7.9 0 0 1-1.7-1l-1.4.6-1.6-2.8 1.2-.9a7.4 7.4 0 0 1 0-2l-1.2-.9L9 8l1.4.6a7.9 7.9 0 0 1 1.7-1l.2-1.5h3.2l.2 1.5a7.9 7.9 0 0 1 1.7 1l1.4-.6 1.6 2.8-1.2.9a7.4 7.4 0 0 1 0 2Z" transform="translate(-2.2 -1.2)"/></svg>
      </button>
      <div class="settings-wrap">
        <section class="settings-panel" id="site-settings" data-settings-panel aria-label="Settings" hidden>
          <div class="settings-group">
            <p class="settings-label">Theme</p>
            <div class="theme-choices" role="group" aria-label="Theme">
              <button type="button" data-theme-choice="day" aria-pressed="${activeTheme === "day"}"><span aria-hidden="true">☀</span> Day</button>
              <button type="button" data-theme-choice="night" aria-pressed="${activeTheme === "night"}"><span aria-hidden="true">☾</span> Night</button>
            </div>
          </div>
          <div class="settings-group">
            <label class="settings-label" for="font-family-picker">Font family</label>
            <select id="font-family-picker" data-font-picker aria-label="Font family"><option value="current" ${activeFontChoice === "current" ? "selected" : ""}>Editorial</option><option value="roboto" ${activeFontChoice === "roboto" ? "selected" : ""}>Roboto</option><option value="system" ${activeFontChoice === "system" ? "selected" : ""}>System</option></select>
          </div>
          <div class="settings-group settings-size">
            <p class="settings-label">Font size</p>
            <div class="font-size-controls" role="group" aria-label="Font size">
              <button type="button" data-font-size-step="-1" aria-label="Decrease font size" ${activeFontSize === MIN_FONT_SIZE ? "disabled" : ""}>A−</button>
              <output data-font-size-value aria-live="polite">${activeFontSize}</output>
              <button type="button" data-font-size-step="1" aria-label="Increase font size" ${activeFontSize === MAX_FONT_SIZE ? "disabled" : ""}>A+</button>
            </div>
          </div>
          <div class="settings-group settings-size">
            <p class="settings-label" id="line-spacing-label">Space between lyric rows</p>
            <div class="line-spacing-controls" role="group" aria-labelledby="line-spacing-label">
              <button type="button" data-line-spacing-step="-1" aria-label="Decrease space between lyric rows" ${activeRowGap <= MIN_ROW_GAP ? "disabled" : ""}>−</button>
              <output data-line-spacing-value aria-live="polite">${activeRowGap} px</output>
              <button type="button" data-line-spacing-step="1" aria-label="Increase space between lyric rows" ${activeRowGap >= MAX_ROW_GAP ? "disabled" : ""}>+</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="site-footer__inner"><span class="site-footer__brand">My favorite Operas</span><span class="site-footer__credit">@AsuraFY</span></div></footer>`;
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
  const brandName = app.querySelector(".site-header .brand__name");
  const breadcrumb = app.querySelector(".site-breadcrumb");
  // Use the logo's actual position relative to the full-width breadcrumb.
  // This avoids relying on page gutters or responsive header guesses.
  if (brandName && breadcrumb) {
    const leftInset = Math.max(0,
      brandName.getBoundingClientRect().left - breadcrumb.getBoundingClientRect().left);
    breadcrumb.style.setProperty("--breadcrumb-logo-left", leftInset + "px");
  }
  const operaBar = app.querySelector(".opera-subnav");
  const mobileToolbar = app.querySelector(".mobile-reader-toolbar");
  document.documentElement.style.setProperty("--sticky-site-height", (header?.getBoundingClientRect().height || 0) + "px");
  document.documentElement.style.setProperty("--sticky-breadcrumb-height", (breadcrumb?.getBoundingClientRect().height || 0) + "px");
  document.documentElement.style.setProperty("--sticky-opera-height", (operaBar?.getBoundingClientRect().height || 0) + "px");
  document.documentElement.style.setProperty("--sticky-reader-height", (mobileToolbar?.getBoundingClientRect().height || 0) + "px");
}

// The header's left padding may change at CSS breakpoints without a height change.
window.addEventListener("resize", measureStickyNavigation);

function setupStickyNavigation() {
  stickyBarObserver?.disconnect();
  stickyBarObserver = null;
  measureStickyNavigation();
  if (typeof ResizeObserver === "function") {
    stickyBarObserver = new ResizeObserver(measureStickyNavigation);
    const header = app.querySelector(".site-header");
    const breadcrumb = app.querySelector(".site-breadcrumb");
    const operaBar = app.querySelector(".opera-subnav");
    const toolbar = app.querySelector(".mobile-reader-toolbar");
    if (header) stickyBarObserver.observe(header);
    if (breadcrumb) stickyBarObserver.observe(breadcrumb);
    if (operaBar) stickyBarObserver.observe(operaBar);
    if (toolbar) stickyBarObserver.observe(toolbar);
  }
}

function setupMusicalTranslationToggle() {
  const reader = app.querySelector("[data-musical-score-reader]");
  const button = app.querySelector("[data-musical-translation-toggle]");
  if (!reader || !button) return;
  button.addEventListener("click", () => {
    const hidden = reader.classList.toggle("is-translation-hidden");
    reader.querySelectorAll("[data-musical-translation]").forEach(cell => {
      cell.hidden = hidden;
    });
    button.setAttribute("aria-expanded", String(!hidden));
    button.textContent = hidden ? "Show translation" : "Hide translation";
  });
}

function shell(content, active) {
  closeActOutline(false);
  document.body.classList.toggle("musicals-theme", active === "musicals" || active === "musical");
  app.innerHTML = `${header(active)}<main id="main">${content}</main>${footer()}`;
  setupMusicalTranslationToggle();
  const description = app.querySelector(".musical-description");
  const descriptionToggle = description?.querySelector(".musical-description-toggle");
  if (descriptionToggle) {
    description.classList.add("is-collapsible");
    descriptionToggle.addEventListener("click", () => {
      const expanded = description.classList.toggle("is-expanded");
      descriptionToggle.setAttribute("aria-expanded", String(expanded));
      descriptionToggle.textContent = expanded ? "Read less" : "Read more";
    });
  }
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
  const settingsToggles = [...app.querySelectorAll("[data-settings-toggle]")];
  const settingsPanel = app.querySelector("[data-settings-panel]");
  const siteHeader = app.querySelector(".site-header");
  const mobileSearchToggle = app.querySelector("[data-mobile-search-toggle]");
  const fontPicker = app.querySelector("[data-font-picker]");

  const saveChoice = (key, value) => {
    try { localStorage.setItem(key, value); } catch { /* The preference still applies for this page. */ }
  };
  const closeSettings = () => {
    if (!settingsPanel || settingsPanel.hidden) return;
    settingsPanel.hidden = true;
    settingsToggles.forEach(button => {
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open settings");
    });
  };
  settingsToggles.forEach(settingsToggle => settingsToggle.addEventListener("click", () => {
    const open = settingsPanel.hidden;
    settingsPanel.hidden = !open;
    settingsToggles.forEach(button => {
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Close settings" : "Open settings");
    });
    if (open) settingsPanel.querySelector("select")?.focus();
  }));
  mobileSearchToggle?.addEventListener("click", () => {
    siteHeader?.classList.add("search-is-open");
    siteHeader?.querySelector(".site-header-search input, .opera-header-search input")?.focus();
  });
  siteHeader?.querySelector(".site-header-search input, .opera-header-search input")?.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      siteHeader.classList.remove("search-is-open");
      mobileSearchToggle?.focus();
    }
  });
  fontPicker?.addEventListener("change", () => {
    if (!FONT_CHOICES.has(fontPicker.value)) return;
    activeFontChoice = fontPicker.value;
    document.documentElement.dataset.fontChoice = activeFontChoice;
    saveChoice(FONT_PREFERENCE_KEY, activeFontChoice);
  });
  app.querySelectorAll("[data-line-spacing-step]").forEach(button => {
    button.addEventListener("click", () => {
      activeRowGap = applyReadingSpacing(
        document.documentElement,
        stepRowGap(activeRowGap, Number(button.dataset.lineSpacingStep))
      );
      saveChoice(ROW_GAP_PREFERENCE_KEY, String(activeRowGap));
      const output = app.querySelector("[data-line-spacing-value]");
      if (output) output.textContent = activeRowGap + " px";
      app.querySelectorAll("[data-line-spacing-step]").forEach(option => {
        option.disabled = (activeRowGap <= MIN_ROW_GAP && option.dataset.lineSpacingStep === "-1") ||
          (activeRowGap >= MAX_ROW_GAP && option.dataset.lineSpacingStep === "1");
      });
    });
  });
  app.querySelectorAll("[data-theme-choice]").forEach(button => {
    button.addEventListener("click", () => {
      const choice = button.dataset.themeChoice;
      if (!THEME_CHOICES.has(choice)) return;
      activeTheme = choice;
      document.documentElement.dataset.theme = activeTheme;
      saveChoice(THEME_PREFERENCE_KEY, activeTheme);
      app.querySelectorAll("[data-theme-choice]").forEach(option => option.setAttribute("aria-pressed", String(option === button)));
    });
  });
  app.querySelectorAll("[data-font-size-step]").forEach(button => {
    button.addEventListener("click", () => {
      const step = Number(button.dataset.fontSizeStep);
      activeFontSize = Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, activeFontSize + step));
      document.documentElement.dataset.fontSize = String(activeFontSize);
      document.documentElement.style.fontSize = `${activeFontSize}px`;
      document.documentElement.style.setProperty("--reading-scale", String(activeFontSize / 16));
      saveChoice(FONT_SIZE_PREFERENCE_KEY, String(activeFontSize));
      const output = app.querySelector("[data-font-size-value]");
      if (output) output.textContent = String(activeFontSize);
      app.querySelectorAll("[data-font-size-step]").forEach(option => {
        option.disabled = (activeFontSize === MIN_FONT_SIZE && option.dataset.fontSizeStep === "-1") ||
          (activeFontSize === MAX_FONT_SIZE && option.dataset.fontSizeStep === "1");
      });
    });
  });
  settingsPanel?.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeSettings();
      settingsToggles.find(button => getComputedStyle(button).display !== "none")?.focus();
    }
  });
  if (settingsOutsidePointerHandler) document.removeEventListener("pointerdown", settingsOutsidePointerHandler);
  settingsOutsidePointerHandler = event => {
    if (settingsPanel && !settingsPanel.hidden && !event.target.closest("[data-settings-toggle], [data-settings-panel]")) closeSettings();
  };
  document.addEventListener("pointerdown", settingsOutsidePointerHandler);
  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
    nav.classList.toggle("is-open", !open);
  });
  app.querySelector("[data-site-search]")?.addEventListener("submit", event => {
    event.preventDefault();
    const query = event.currentTarget.querySelector("input")?.value.trim() || "";
    window.location.hash = query ? `#/operas?q=${encodeURIComponent(query)}` : "#/operas";
  });
  app.querySelectorAll("[data-search-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = form.querySelector("input")?.value.trim() || "";
      const target = form.dataset.searchRoute || "/operas";
      const composer = (target === "/musicals" || target === "/operas") ? form.dataset.composer || "" : "";
      const params = new URLSearchParams();
      if (composer) params.set("composer", composer);
      if (query) params.set("q", query);
      window.location.hash = `#${target}${params.size ? "?" + params.toString() : ""}`;
    });
  });
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

function operaDirectoryPage(query = "", sort = "title", composer = "") {
  const matches = filterOperasByComposer(filterOperasByQuery(query), composer);
  matches.sort((a, b) => {
    if (sort === "composer") return a.composer.localeCompare(b.composer);
    if (sort === "year") return Number(b.premiered.match(/\d{4}/)?.[0]) - Number(a.premiered.match(/\d{4}/)?.[0]);
    const titleKey = (title) => title.replace(/^Il\s+/i, "");
    return titleKey(a.title).localeCompare(titleKey(b.title), undefined, { sensitivity: "base" });
  });
  const safeQuery = query.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  const safeComposer = composer.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  const composerNotice = composer ? `<p class="opera-composer-filter">Works by <strong>${safeComposer}</strong> · <a href="#/operas">View all operas</a></p>` : "";

  const teasers = { "il-barbiere-di-siviglia": "A joyful comedy full of clever tricks, disguises and unforgettable music.", "cosi-fan-tutte": "A witty exploration of love, loyalty and human nature.", "tristan-und-isolde": "A passionate, tragic love story with extraordinary music.", macbeth: "A powerful drama of ambition, fate and conscience." };
  const cards = matches.map((opera, index) => {
    const year = opera.premiered.match(/\d{4}/)?.[0] || "";
    return `<a class="directory-card" href="#/operas/${opera.slug}" style="--card-index:${index}"><div class="directory-card__image directory-card__image--${opera.color}${opera.image ? " directory-card__image--standalone" : ""}" role="img" aria-label="Illustration inspired by ${opera.title}">${opera.image ? `<img src="${opera.image}" alt="" loading="lazy" />` : ""}</div><div class="directory-card__body"><h2>${opera.title}</h2><p class="directory-card__byline">${opera.composer}<span aria-hidden="true">·</span>${year}</p><p class="directory-card__summary">${teasers[opera.slug] || opera.summary}</p><span class="directory-card__button">View opera ${arrow}</span></div></a>`;
  }).join("");
  return `<section class="directory-scenic" aria-hidden="true"></section><section class="directory-intro section-wrap"><div class="directory-intro__panel"><h1>Operas</h1><p>A collection of the operas I’m exploring, with libretti and English translations.</p>${composerNotice}</div><div class="directory-tools"><form class="opera-search opera-search--directory" data-search-form data-search-route="/operas" data-composer="${safeComposer}" role="search"><label class="sr-only" for="directory-search">Search opera title, composer or librettist</label><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5-5 5"></path></svg><input id="directory-search" name="q" type="search" placeholder="Search title, composer or librettist..." value="${safeQuery}" autocomplete="off" /></form><label class="directory-sort"><span>Sort by</span><select id="directory-sort" aria-label="Sort operas"><option value="title" ${sort === "title" ? "selected" : ""}>Title (A–Z)</option><option value="composer" ${sort === "composer" ? "selected" : ""}>Composer</option><option value="year" ${sort === "year" ? "selected" : ""}>Year (newest)</option></select></label></div></section><section class="directory-grid section-wrap" aria-label="Opera directory">${cards || `<p class="empty-results">No operas match “${safeQuery}”. Try another title, composer or librettist.</p>`}</section>`;
}

function aboutPage() {
  return `<section class="about-page section-wrap"><p class="eyebrow"><span class="eyebrow-rule"></span> About</p><h1>A personal collection<br /><em>of opera.</em></h1><p>This is a place for the operas I love: their libretti, translations, characters, and the details that make each one worth returning to.</p><a class="text-link" href="#/operas">Explore the collection ${arrow}</a></section>`;
}

function musicalsPage(query = "", sort = "title", composer = "") {
  return renderMusicalsPage(query, sort, composer);
}

function operaPage(opera, libretto, selectedScene = 1, query = "", selectedItem = 0, mobileContents = false, selectedView = "") {
  if (libretto) {
    const reader = createLibrettoRenderer(libretto);
    if (selectedView === "outline") return reader.outline();
    if (selectedView === "synopsis" || (!selectedView && !query && !window.location.hash.includes("act=") && !window.location.hash.includes("scene="))) {
      return renderOperaInformationPage(opera, operaInformation[opera.slug], { navigation: reader.navigation(), hasLibretto: true });
    }
    const requestedAct = Number(new URLSearchParams(window.location.hash.split("?")[1] || "").get("act")) || 1;
    if (!libretto.acts.some(act => act.number === requestedAct && act.scenes?.length)) {
      return renderPlannedLibrettoPage(opera, operaInformation[opera.slug], "libretto", requestedAct);
    }
    return reader.scene(selectedScene, query, selectedItem, mobileContents);
  }
  if (opera.librettoPlanned) {
    const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
    const view = selectedView || (params.has("act") ? "libretto" : "synopsis");
    return renderPlannedLibrettoPage(opera, operaInformation[opera.slug], view, params.get("act"));
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
  const sidebar = root.querySelector("[data-act-outline]");
  const readingTop = (root.querySelector(".opera-subnav")?.getBoundingClientRect?.().bottom || 162) +
    (root.querySelector(".mobile-reader-toolbar")?.getBoundingClientRect?.().height || 0) + 18;
  const landmarks = [...(sidebar?.querySelectorAll(".section-nav-link") || [])].flatMap(link => {
    const params = new URLSearchParams((link.getAttribute("href") || "").split("?")[1] || "");
    if (!params.has("turn") || Number(params.get("scene")) !== scene || Number(params.get("item")) !== sectionItem) return [];
    const target = root.querySelector("#libretto-turn-" + act + "-" + scene + "-" + sectionItem + "-" + Number(params.get("turn")));
    return typeof target?.getBoundingClientRect === "function" ? [{ target, turn: Number(params.get("turn")) }] : [];
  });
  const atEnd = typeof document !== "undefined" &&
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  const activeLandmark = atEnd ? landmarks.at(-1) :
    landmarks.filter(entry => entry.target.getBoundingClientRect().top <= readingTop).at(-1) || landmarks[0];
  const activeTurnIndex = activeLandmark?.turn ?? null;
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
  sidebar?.querySelectorAll(".section-nav-link").forEach(link => {
    const url = link.getAttribute("href");
    const params = new URLSearchParams(url.split("?")[1] || "");
    const selected = Number(params.get("act")) === act &&
      Number(params.get("scene")) === scene &&
      (params.has("turn") ? Number(params.get("turn")) === activeTurnIndex :
        (link.classList.contains("is-song") || Number(params.get("item")) === sectionItem));
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
    if (params.get("item") !== String(sectionItem) || params.get("scene") !== String(scene) ||
        (activeTurnIndex != null && params.has("turn") && params.get("turn") !== String(activeTurnIndex))) {
      params.set("act", String(act));
      params.set("scene", String(scene));
      params.set("item", String(sectionItem));
      if (activeTurnIndex != null && params.has("turn")) params.set("turn", String(activeTurnIndex));
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
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    highlightReaderSection(items.length - 1, true);
    return;
  }
  const siteHeight = app.querySelector(".site-header")?.getBoundingClientRect().height || 0;
  const barHeight = root.querySelector(".opera-subnav")?.getBoundingClientRect().height || 0;
  const toolbarHeight = root.querySelector(".mobile-reader-toolbar")?.getBoundingClientRect().height || 0;
  const breadcrumbHeight = app.querySelector(".site-breadcrumb")?.getBoundingClientRect().height || 0;
  const threshold = siteHeight + breadcrumbHeight + barHeight + toolbarHeight + 18;
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

function jumpToReaderPassage(reader, target) {
  if (!target) {
    readerJumping = false;
    return;
  }
  readerJumping = true;
  window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
    const readingTop = (app.querySelector(".site-header")?.getBoundingClientRect().height || 0) +
      (app.querySelector(".site-breadcrumb")?.getBoundingClientRect().height || 0) +
      (reader.querySelector(".opera-subnav")?.getBoundingClientRect().height || 0) +
      (reader.querySelector(".mobile-reader-toolbar")?.getBoundingClientRect().height || 0) + 18;
    window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - readingTop, behavior: "instant" });
    readerJumping = false;
    scheduleReaderSectionUpdate();
  }));
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
  if (params.has("turn")) {
    const target = root.querySelector("#libretto-turn-" + Number(root.dataset.act) + "-" +
      Number(params.get("scene")) + "-" + (Number(params.get("item")) || 0) + "-" + Number(params.get("turn")));
    if (!target) return;
    event.preventDefault();
    closeActOutline(false);
    if (window.location.hash !== href) window.history.pushState(window.history.state, "", href);
    jumpToReaderPassage(root, target);
    return;
  }
  const items = [...root.querySelectorAll(".libretto-scene-section[data-libretto-item]")];
  const scene = Number(params.get("scene"));
  const item = Number(params.get("item")) || 0;
  let index = items.findIndex(el => Number(el.dataset.sourceScene) === scene && Number(el.dataset.librettoItem) === item);
  // Historic IDs may be alias anchors inside a section, rather than its current item ID.
  if (index < 0) {
    const anchor = root.querySelector?.("#libretto-section-" + Number(root.dataset.act) + "-" + scene + "-" + item);
    index = items.indexOf(anchor?.closest?.(".libretto-scene-section"));
  }
  // Scene navigation uses item=0, including scenes whose first preserved ID is 1.
  if (index < 0 && item === 0) index = items.findIndex(el => Number(el.dataset.sourceScene) === scene);
  if (index < 0) return;
  event.preventDefault();
  closeActOutline(false);
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

let activeRenderId = 0;
async function render() {
  const renderId = ++activeRenderId;
  const route = window.location.hash.replace(/^#/, "") || "/";
  const [path, queryString = ""] = route.split("?");
  const routeParams = new URLSearchParams(queryString);
  const query = routeParams.get("q") || "";
  const sort = routeParams.get("sort") || "title";
  const composer = routeParams.get("composer") || "";
  if (path === "/" || path === "") {
    shell(homePage(), "home");
    document.title = "My favorite Operas";
  } else if (path === "/operas") {
    shell(operaDirectoryPage(query, sort, composer), "operas");
    app.querySelector("#directory-sort")?.addEventListener("change", (event) => {
      const params = new URLSearchParams();
      if (composer) params.set("composer", composer);
      if (query) params.set("q", query);
      params.set("sort", event.currentTarget.value);
      window.location.hash = `#/operas?${params.toString()}`;
    });
    document.title = (composer ? composer + " — " : "") + "The collection — My favorite Operas";
  } else if (path === "/about") {
    shell(aboutPage(), "about");
    document.title = "About — My favorite Operas";
  } else if (path === "/musicals") {
    shell(musicalsPage(query, sort, composer), "musicals");
    app.querySelector("#musicals-directory-sort")?.addEventListener("change", (event) => {
      const params = new URLSearchParams();
      if (composer) params.set("composer", composer);
      if (query) params.set("q", query);
      params.set("sort", event.currentTarget.value);
      window.location.hash = `#/musicals?${params.toString()}`;
    });
    document.title = (composer ? composer + " — " : "") + "Musicals — My favorite Operas";
  } else if (path.startsWith("/musicals/")) {
    const slug = path.split("/")[2];
    if (slug === "mahler-symphony-2-resurrection" || slug === "beethoven-ode-to-joy") {
      shell(renderMusicalPage(slug, routeParams.get("view")), "musical");
      document.title = `${slug === "beethoven-ode-to-joy" ? "Ode to Joy · Beethoven" : "Symphony No. 2: Resurrection"} — Musicals`;
    } else {
      shell(`<section class="not-found section-wrap"><p class="eyebrow">A quiet intermission</p><h1>This musical is not in the collection.</h1><a class="button button--dark" href="#/musicals">Return to musicals ${arrow}</a></section>`, "musicals");
      document.title = "Musical not found — Musicals";
    }
  } else if (path.startsWith("/operas/")) {
    const opera = getOpera(path.split("/")[2]);
    let libretto = null;
    if (opera && hasCompleteLibretto(opera.slug)) {
      shell('<section class="not-found section-wrap" role="status" aria-live="polite"><h1>Opening the libretto…</h1><p>Loading the original text and translation.</p></section>', "opera");
      try {
        libretto = await loadLibretto(opera.slug);
      } catch (error) {
        if (renderId !== activeRenderId) return;
        console.error("Unable to load opera libretto:", error);
        shell('<section class="not-found section-wrap"><h1>The libretto could not load.</h1><p>Please check your connection and try again.</p><button class="button button--dark" type="button" data-retry-libretto>Try again</button></section>', "opera");
        app.querySelector("[data-retry-libretto]")?.addEventListener("click", render);
        document.title = opera.title + " — My favorite Operas";
        return;
      }
      // A later navigation must not be replaced by an older import resolving.
      if (renderId !== activeRenderId) return;
    }
    const scene = Number(routeParams.get("scene")) || 1;
    const item = Number(routeParams.get("item")) || 0;
    const mobileContents = routeParams.get("contents") === "1" || (!routeParams.has("scene") && !routeParams.has("item") && !query);
    const hasLibrettoDestination = routeParams.has("act") || routeParams.has("scene") || routeParams.has("item") || Boolean(query) || routeParams.has("contents");
    const selectedView = routeParams.get("view") || (libretto && !hasLibrettoDestination ? "synopsis" : "");
    shell(opera ? renderOperaBreadcrumb(opera) + operaPage(opera, libretto, scene, query, item, mobileContents, selectedView) : `<section class="not-found section-wrap"><p class="eyebrow">A quiet intermission</p><h1>This page is not in the collection.</h1><a class="button button--dark" href="#/operas">Return to all operas ${arrow}</a></section>`, opera ? (libretto ? "opera" : "operas") : "");
    document.title = opera ? `${opera.title} — My favorite Operas` : "Page not found — My favorite Operas";
    if (opera?.slug === "tristan-und-isolde" && selectedView === "synopsis") hydrateFavoriteCovers(app);
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
    jumpToReaderPassage(reader, target);
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
