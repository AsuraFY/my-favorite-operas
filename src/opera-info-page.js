/* Shared opera introduction page, independent of libretto availability. */
const escape = (value = "") => String(value).replace(/[&<>"']/g, character =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);


const albumLinkPattern = /^https:\/\/open\.spotify\.com\/album\/[A-Za-z0-9]+$/;
function renderFavorites(items = []) {
  const spotifyIcon = '<svg class="favorite-performance__platform-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="9.5"/><path d="M5.7 9.5c4.4-1.3 8.7-.9 12.7 1.3M6.6 13c3.7-1.1 7.2-.7 10.6 1.2M7.8 16.2c2.9-.7 5.7-.4 8.1.9"/></svg>';
  const youtubeIcon = '<svg class="favorite-performance__platform-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 8.5 6 3.5-6 3.5z" fill="currentColor" stroke="none"/></svg>';
  const cards = items.filter(p => albumLinkPattern.test(p.spotifyUrl || "")).map(p => {
    const cast = (p.cast || []).map(person =>
      '<li><span>' + escape(person.role) + '</span><strong>' + escape(person.name) + '</strong></li>'
    ).join("");
    const leads = (p.featuredArtists || []).map(person =>
      '<li class="favorite-performance__lead"><span aria-hidden="true" class="favorite-performance__bullet">•</span>' +
      '<span><strong>' + escape(person.name) + '</strong> as ' + escape(person.role) + '</span></li>'
    ).join("");
    const yearAndType = [p.recordingYear, p.recordingType].filter(Boolean).join(" · ");
    const credits = [
      p.conductor ? 'Conductor: ' + p.conductor : "",
      p.orchestra ? 'Orchestra: ' + p.orchestra : ""
    ].filter(Boolean).join(" · ");
    const location = [
      p.chorus ? 'Chorus: ' + p.chorus : "",
      p.venue ? 'Location: ' + p.venue : ""
    ].filter(Boolean).join(" · ");
    const spotlight = p.spotlightArtist
      ? ' <span class="favorite-performance__spotlight">· ' + escape(p.spotlightArtist) + '</span>'
      : "";
    const spotifyLabel = p.spotifyEditionVerified
      ? "Spotify album"
      : "Spotify album (edition not independently confirmed)";
    return '<article class="favorite-performance">' +
      '<div class="favorite-performance__row">' +
        (p.coverImage
          ? '<div class="favorite-performance__cover"><img src="' + escape(p.coverImage) +
            '" alt="' + escape(p.title + " — Spotify album cover") + '" loading="lazy" /></div>'
          : '<div class="favorite-performance__cover" data-spotify-cover="' + escape(p.spotifyUrl) +
            '"><span aria-label="Spotify album artwork unavailable">♫</span></div>') +
        '<div class="favorite-performance__main">' +
          '<div class="favorite-performance__heading"><h3>' + escape(p.title) + spotlight + '</h3></div>' +
          (yearAndType ? '<p class="favorite-performance__edition">' + escape(yearAndType) + '</p>' : '') +
          (credits ? '<p class="favorite-performance__production">' + escape(credits) + '</p>' : '') +
          (location ? '<p class="favorite-performance__ensemble">' + escape(location) + '</p>' : '') +
          '<ul class="favorite-performance__artists">' + (leads ||
            '<li class="favorite-performance__unverified">Featured artists pending verification</li>') + '</ul>' +
          '<div class="favorite-performance__links">' +
            '<a href="' + escape(p.spotifyUrl) + '" target="_blank" rel="noopener noreferrer"' +
              ' aria-label="' + escape(spotifyLabel) + '">' + spotifyIcon + '<span>Spotify</span></a>' +
            (p.youtubeUrl ? '<a href="' + escape(p.youtubeUrl) +
              '" target="_blank" rel="noopener noreferrer" aria-label="Watch the confirmed performance on YouTube">' +
              youtubeIcon + '<span>YouTube</span></a>' : '') +
          '</div>' +
        '</div>' +
      '</div>' +
      '<details class="favorite-performance__details"><summary>Full cast &amp; recording details</summary>' +
        '<div class="favorite-performance__details-body">' +
          (cast ? '<ul>' + cast + '</ul>' :
            '<p class="favorite-performance__unverified">Cast details are not yet available.</p>') +
          (!p.spotifyEditionVerified
            ? '<p class="favorite-performance__unverified favorite-performance__edition-note">The linked Spotify album has not been independently matched to this YouTube performance.</p>'
            : '') +
        '</div>' +
      '</details>' +
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
  const heading = view === "outline" ? "Libretto Outline" : "Act " + (roman[act] || act);
  const message = view === "outline" ? "The act outline will be added later." : "The libretto and side-by-side English translation will be added later.";
  return '<div class="opera-reading-page">' + navigation + '<section class="opera-outline section-wrap">' +
    '<h1>' + escape(heading) + '</h1><p>' + message + '</p>' +
    (view === "outline" ? '<a class="opera-info__read-link" href="' + base + '?act=1">Read the libretto <span aria-hidden="true">→</span></a>' : '') +
    '</section></div>';
}
