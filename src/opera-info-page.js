import { parsifalOutline } from "./data/parsifal-outline.js";
/* Shared opera introduction page, independent of libretto availability. */
const escape = (value = "") => String(value).replace(/[&<>"']/g, character =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

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
  const isParsifal = opera.slug === "parsifal";
  const message = view === "outline" ? (isParsifal
    ? "Full German–English libretto text will be added later. These are editorial listening divisions, not numbered scenes in Wagner's score."
    : "The act outline will be added later.")
    : "The libretto and side-by-side English translation will be added later.";
  const parsifalReference = isParsifal ? '<p><a href="https://www.librettoarchive.com/Parsifal_libretto_German_English" target="_blank" rel="noopener noreferrer">Open complete German–English libretto (external reference)</a></p>' +
    '<p>Historical publication source: <a href="https://commons.wikimedia.org/wiki/File:Parsifal,_a_stage-consecrating_festival-play._English_translation_by_Margareth_Glyn._Complete_vocal_score_in_a_facilitated_arrangement_by_Karl_Klindworth_(IA_parsifalstagecon00wagn).pdf" target="_blank" rel="noopener noreferrer">1904 bilingual vocal score, translated by Margareth Glyn</a>. The complete translation has not yet been transcribed into this site's reader.</p>' : "";
  const parsifalContents = isParsifal && view === "outline" ? '<div class="parsifal-listening-outline">' +
    parsifalOutline.map(group => '<section class="parsifal-outline-act" aria-labelledby="parsifal-act-' + group.act + '">' +
      '<h2 id="parsifal-act-' + group.act + '">Act ' + (roman[group.act] || group.act) + ' · ' + escape(group.title) + '</h2>' +
      '<p lang="de">' + escape(group.german) + '</p>' +
      '<ol>' + group.parts.map(([english, german, voices, summary]) =>
        '<li><strong>' + escape(english) + '</strong> <span lang="de">· ' + escape(german) + '</span>' +
        '<p>' + escape(summary) + '</p><p>Characters: ' + escape(voices) + '</p></li>').join("") + '</ol>' +
    '</section>').join("") + '</div>' : "";
  return '<div class="opera-reading-page">' + navigation + '<section class="opera-outline section-wrap">' +
    '<h1>' + escape(heading) + '</h1><p>' + escape(message) + '</p>' + parsifalReference + parsifalContents +
    (view === "outline" ? '<a class="opera-info__read-link" href="' + base + '?act=1">Read the libretto <span aria-hidden="true">→</span></a>' : '') +
    '</section></div>';
}
