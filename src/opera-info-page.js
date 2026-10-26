/* Shared opera introduction page, independent of libretto availability. */
import { fanciullaActOneListeningOutline } from "./data/outline-la-fanciulla-del-west-act-1.js?v=20261026";
import { fanciullaActOneBilingualExcerpts } from "./data/libretto-la-fanciulla-del-west-act-1-excerpts.js?v=20261026";
const escape = (value = "") => String(value).replace(/[&<>"']/g, character =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);


const albumLinkPattern = /^https:\/\/open\.spotify\.com\/album\/[A-Za-z0-9]+$/;
function renderFavorites(items = []) {
  const spotifyIcon = '<svg class="favorite-performance__platform-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="9.5"/><path d="M5.7 9.5c4.4-1.3 8.7-.9 12.7 1.3M6.6 13c3.7-1.1 7.2-.7 10.6 1.2M7.8 16.2c2.9-.7 5.7-.4 8.1.9"/></svg>';
  const youtubeIcon = '<svg class="favorite-performance__platform-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 8.5 6 3.5-6 3.5z" fill="currentColor" stroke="none"/></svg>';
  const peopleIcon = '<svg class="favorite-performance__people-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 20v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>';
  // The one selected outline reference leads the list; otherwise retain the user's order.
  const favorites = items.filter(p => albumLinkPattern.test(p.spotifyUrl || ""));
  const ordered = favorites.filter(p => p.outlineReference).concat(favorites.filter(p => !p.outlineReference));
  const cards = ordered.map(p => {
    const yearTypeVenue = [p.recordingYear, p.recordingType, p.venue].filter(Boolean).join(" · ");
    const spotlight = p.spotlightArtist ? ' · ' + escape(p.spotlightArtist) : "";
    const credits = [
      ["Conductor", p.conductor],
      ["Orchestra", p.orchestra],
      ["Chorus", p.chorus]
    ].filter(([, value]) => Boolean(value)).map(([label, value]) =>
      '<div><dt>' + label + '</dt><dd>' + escape(value) + '</dd></div>'
    ).join("");
    const cast = (p.cast || []).map(person =>
      '<li><span class="favorite-performance__cast-bullet" aria-hidden="true">•</span>' +
      '<span><strong>' + escape(person.name) + '</strong> as ' + escape(person.role) + '</span></li>'
    ).join("");
    const spotifyLabel = p.spotifyEditionVerified
      ? "Listen on Spotify"
      : "Spotify album (edition not independently confirmed)";
    return '<article class="favorite-performance' + (p.outlineReference ? ' favorite-performance--outline-reference' : '') + '">' +
      '<div class="favorite-performance__row">' +
        (p.coverImage
          ? '<div class="favorite-performance__cover"><img src="' + escape(p.coverImage) +
            '" alt="' + escape(p.title + " — Spotify album cover") + '" loading="lazy" /></div>'
          : '<div class="favorite-performance__cover" data-spotify-cover="' + escape(p.spotifyUrl) +
            '"><span aria-label="Spotify album artwork unavailable">♫</span></div>') +
        '<div class="favorite-performance__main">' +
          '<h3 class="favorite-performance__title">' + escape(p.title) + spotlight + '</h3>' +
          (yearTypeVenue ? '<p class="favorite-performance__edition">' + escape(yearTypeVenue) + '</p>' : '') +
          '<details class="favorite-performance__details">' +
            '<summary><span class="favorite-performance__summary-label">' + peopleIcon +
              'Cast &amp; Musical Direction</span><span class="favorite-performance__chevron" aria-hidden="true">⌄</span></summary>' +
            '<div class="favorite-performance__details-body">' +
              (credits ? '<dl class="favorite-performance__direction">' + credits + '</dl>' : '') +
              (cast ? '<p class="favorite-performance__cast-heading">PERFORMERS</p>' +
                '<ul class="favorite-performance__cast">' + cast + '</ul>' : '') +
            '</div>' +
          '</details>' +
        '</div>' +
      '</div>' +
      '<div class="favorite-performance__links">' +
        '<a href="' + escape(p.spotifyUrl) + '" target="_blank" rel="noopener noreferrer"' +
          ' aria-label="' + escape(spotifyLabel) + '">' + spotifyIcon + '<span>Spotify</span></a>' +
        (p.youtubeUrl ? '<a href="' + escape(p.youtubeUrl) +
          '" target="_blank" rel="noopener noreferrer" aria-label="Watch the performance on YouTube">' +
          youtubeIcon + '<span>YouTube</span></a>' : '') +
        (p.outlineReference ? '<span class="favorite-performance__reference">Libretto outline reference</span>' : '') +
      '</div>' +
    '</article>';
  }).join("");
  return cards ? '<section class="opera-info__favorites section-wrap" aria-labelledby="opera-info-favorites">' +
    '<h2 id="opera-info-favorites">My Favorite Performances</h2>' + cards + '</section>' : "";
}

export function hydrateFavoriteCovers(root) {
  for (const cover of root.querySelectorAll("[data-spotify-cover]")) {
    const album = cover.dataset.spotifyCover;
    if (!albumLinkPattern.test(album)) continue;
    fetch("https://open.spotify.com/oembed?url=" + encodeURIComponent(album))
      .then(response => response.ok ? response.json() : null)
      .then(info => {
        if (!info?.thumbnail_url || !cover.isConnected) return;
        const url = new URL(info.thumbnail_url);
        if (url.protocol !== "https:" || !["i.scdn.co","image-cdn-ak.spotifycdn.com","image-cdn-fa.spotifycdn.com"].includes(url.hostname)) return;
        const img = document.createElement("img");
        img.src = url.href;
        img.alt = "Cover of the selected Spotify album";
        img.loading = "lazy";
        img.addEventListener("load", () => { if (cover.isConnected) cover.replaceChildren(img); }, { once: true });
        img.addEventListener("error", () => {}, { once: true });
      }).catch(() => {});
  }
}

export function renderOperaInformationPage(opera, details, { navigation = "", hasLibretto = false, hasLibrettoPage = false } = {}) {
  const characters = details?.characters || [];
  const synopsis = details?.synopsis || [opera.summary];
  const alias = opera.displayTitle && opera.displayTitle !== opera.title ? opera.displayTitle : opera.genre;
  const image = opera.image
    ? '<img src="' + escape(opera.image) + '" alt="Illustration inspired by ' + escape(opera.title) + '" loading="eager" />'
    : '<div class="opera-info__art--sprite directory-card__image--' + escape(opera.color) + '" role="img" aria-label="Illustration inspired by ' + escape(opera.title) + '"></div>';
  return '<div class="opera-information">' +
    navigation +
    '<article aria-labelledby="opera-info-title">' +
      '<div class="opera-info__hero section-wrap">' +
        '<div class="opera-info__cover">' + image + '</div>' +
        '<div class="opera-info__introduction">' +
          '<p class="eyebrow">' + escape(opera.composer) + ' · ' + escape(opera.premiered.match(/\d{4}/)?.[0] || "") + '</p>' +
          '<h1 id="opera-info-title">' + escape(opera.title) + '</h1>' +
          '<p class="opera-info__alternate">' + escape(alias) + '</p>' +
          '<p class="opera-info__summary">' + escape(opera.summary) + '</p>' +
          (hasLibretto || hasLibrettoPage ? '<a class="opera-info__read-link" href="#/operas/' + escape(opera.slug) + '?act=1">Read the libretto <span aria-hidden="true">→</span></a>' : '') +
        '</div>' +
      '</div>' +
      '<dl class="opera-info__facts section-wrap" aria-label="Opera information">' +
        [['Composer',opera.composer],['Librettist',opera.librettist],['Premiere',opera.premiered],['First performed at',opera.premieredAt],['Original language',opera.language],['Genre',opera.genre],['Acts',String(opera.acts)]]
        .map(([label,value]) => '<div><dt>' + escape(label) + '</dt><dd>' + escape(value) + '</dd></div>').join("") +
      '</dl>' +
      '<div class="opera-info__content section-wrap">' +
        '<section class="opera-info__synopsis" aria-labelledby="opera-info-synopsis"><h2 id="opera-info-synopsis">Synopsis</h2>' +
          synopsis.map(paragraph => '<p>' + escape(paragraph) + '</p>').join("") +
        '</section>' +
        '<section class="opera-info__characters" aria-labelledby="opera-info-characters"><h2 id="opera-info-characters">Principal characters</h2>' +
          '<ul>' + characters.map(([name,role,description]) =>
            '<li><div class="opera-info__character-top"><strong>' + escape(name) + '</strong><span>' + escape(role) + '</span></div><p>' + escape(description) + '</p></li>'
          ).join("") + '</ul></section>' +
      '</div>' +
      renderFavorites(details?.favoritePerformances) +
    '</article>' +
    '<div class="opera-info__back section-wrap"><a href="#/operas">← Back to all operas</a></div>' +
  '</div>';
}

// A planned libretto has real destinations without pretending its text is ready.
export function renderPlannedLibrettoPage(opera, details, view = "synopsis", selectedAct = 1) {
  const base = "#/operas/" + escape(opera.slug);
  const roman = ["", "I", "II", "III", "IV", "V"];
  const act = Math.max(1, Math.min(Number(selectedAct) || 1, opera.acts));
  const tabs = [
    ["Synopsis", "?view=synopsis", view === "synopsis"],
    ["Libretto Outline", "?view=outline", view === "outline"],
    ...Array.from({ length: opera.acts }, (_, index) =>
      ["Act " + (roman[index + 1] || index + 1), "?act=" + (index + 1), view === "libretto" && act === index + 1])
  ];
  const navigation = '<nav class="opera-subnav" aria-label="' + escape(opera.title) + ' sections">' +
    '<div class="opera-subnav__identity"><span class="opera-subnav__title">' + escape(opera.title) + '</span>' +
    '<span class="opera-subnav__composer">' + escape(opera.composer) + '</span></div><div class="opera-subnav__links">' +
    tabs.map(([label, suffix, active]) => '<a class="opera-subnav__link' + (active ? ' is-active' : '') +
      '" href="' + base + suffix + '"' + (active ? ' aria-current="page"' : '') + '>' + label + '</a>').join("") + '</div></nav>';
  if (view === "synopsis") return renderOperaInformationPage(opera, details, { navigation, hasLibrettoPage: true });
  if (opera.slug === "la-fanciulla-del-west") {
    if (view === "outline") {
      const peopleIcon = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6">' +
        '<circle cx="9" cy="7.5" r="3"/><path d="M3.5 20v-2a5.5 5.5 0 0 1 11 0v2M16.5 4.7a3 3 0 0 1 0 5.6M18 14a4 4 0 0 1 3 4v2"/></svg>';
      const entries = fanciullaActOneListeningOutline.map(track =>
        '<div class="fanciulla-outline__entry" role="listitem">' +
          '<div class="fanciulla-outline__original"><span aria-hidden="true" class="fanciulla-outline__note-icon">♬</span><span>' +
            escape(track.originalTitle) + '</span></div>' +
          (track.translatedTitle ? '<p class="fanciulla-outline__translation">' + escape(track.translatedTitle) + '</p>' : '') +
          '<div class="fanciulla-outline__participants">' + peopleIcon + '<span>' +
            escape(track.participants.join(", ")) + '</span></div>' +
        '</div>'
      ).join("");
      return '<div class="opera-reading-page">' + navigation +
        '<section class="opera-outline fanciulla-outline">' +
        '<h1>Libretto Outline</h1>' +
        '<p class="fanciulla-outline__description">Listening landmarks for Act I, based on 22 recording tracks. These are not official numbered musical sections. Participant lists are provisional.</p>' +
        '<h2>Atto primo · Act I</h2>' +
        '<div class="fanciulla-outline__list" role="list">' + entries + '</div>' +
        '<div class="fanciulla-outline__remaining"><h2>Atto secondo · Act II</h2><p>Outline in preparation.</p>' +
        '<h2>Atto terzo · Act III</h2><p>Outline in preparation.</p></div>' +
        '</section></div>';
    }
    if (view === "libretto" && act === 1) {
      const excerpts = fanciullaActOneBilingualExcerpts.map(section => {
        const rows = section.turns.map(turn => '<div class="fanciulla-bilingual__row' +
          (turn.speaker === "Stage direction" ? ' fanciulla-bilingual__row--direction' : '') +
          '"><div class="fanciulla-bilingual__cell"><span class="fanciulla-bilingual__speaker">' +
            escape(turn.speaker) + '</span><p>' + escape(turn.original).replaceAll('\n', '<br>') + '</p></div>' +
          '<div class="fanciulla-bilingual__cell"><span class="fanciulla-bilingual__speaker">' +
            escape(turn.speakerTranslation) + '</span><p>' + escape(turn.translation).replaceAll('\n', '<br>') +
          '</p></div></div>').join('');
        return '<section class="fanciulla-bilingual__excerpt">' +
          '<h2>' + escape(section.originalTitle) + '</h2>' +
          (section.translatedTitle ? '<p class="fanciulla-bilingual__title-translation">' + escape(section.translatedTitle) + '</p>' : '') +
          rows + '</section>';
      }).join('');
      return '<div class="opera-reading-page">' + navigation +
        '<section class="opera-outline fanciulla-bilingual">' +
          '<h1>Atto primo · Act I</h1>' +
          '<p class="fanciulla-bilingual__notice"><strong>Incomplete libretto — selected source excerpts only.</strong> ' +
          'The excerpts below are not contiguous and do not constitute the complete Act I. ' +
          'Original Italian is transcribed from Flaminio; English is an unreviewed editorial draft. ' +
          'The full source still needs to be imported and checked.</p>' +
          '<div class="fanciulla-bilingual__columns" aria-hidden="true"><span>Italiano</span><span>English</span></div>' +
          excerpts +
          '<p class="fanciulla-bilingual__source">Source: <a href="https://www.flaminioonline.it/Guide/Puccini/Puccini-West78-testo.html" target="_blank" rel="noopener noreferrer">Flaminio Italian libretto, Act I</a>. ' +
          '<a href="' + base + '?view=outline">View approved listening outline</a>.</p>' +
        '</section></div>';
    }
  }
  const heading = view === "outline" ? "Libretto Outline" : "Act " + (roman[act] || act);
  const message = view === "outline" ? "The act outline will be added later." : "The libretto and side-by-side English translation will be added later.";
  return '<div class="opera-reading-page">' + navigation + '<section class="opera-outline section-wrap">' +
    '<h1>' + escape(heading) + '</h1><p>' + message + '</p>' +
    (view === "outline" ? '<a class="opera-info__read-link" href="' + base + '?act=1">Read the libretto <span aria-hidden="true">→</span></a>' : '') +
    '</section></div>';
}
