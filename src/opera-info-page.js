/* Shared opera introduction page, independent of libretto availability. */
const escape = (value = "") => String(value).replace(/[&<>"']/g, character =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

export function renderOperaInformationPage(opera, details, { navigation = "", hasLibretto = false } = {}) {
  const characters = details?.characters || [];
  const synopsis = details?.synopsis || [opera.summary];
  const alias = opera.displayTitle && opera.displayTitle !== opera.title ? opera.displayTitle : opera.genre;
  const image = opera.image
    ? '<img src="' + escape(opera.image) + '" alt="Illustration inspired by ' + escape(opera.title) + '" loading="eager" />'
    : '<div class="opera-info__art--sprite directory-card__image--' + escape(opera.color) + '" role="img" aria-label="Illustration inspired by ' + escape(opera.title) + '"></div>';
  return '<div class="opera-information">' +
    navigation +
    '<div class="opera-info__breadcrumbs section-wrap"><a href="#/operas">All operas</a><span aria-hidden="true">›</span><span aria-current="page">' + escape(opera.title) + '</span></div>' +
    '<article aria-labelledby="opera-info-title">' +
      '<div class="opera-info__hero section-wrap">' +
        '<div class="opera-info__cover">' + image + '</div>' +
        '<div class="opera-info__introduction">' +
          '<p class="eyebrow">' + escape(opera.composer) + ' · ' + escape(opera.premiered.match(/\d{4}/)?.[0] || "") + '</p>' +
          '<h1 id="opera-info-title">' + escape(opera.title) + '</h1>' +
          '<p class="opera-info__alternate">' + escape(alias) + '</p>' +
          '<p class="opera-info__summary">' + escape(opera.summary) + '</p>' +
          (hasLibretto ? '<a class="opera-info__read-link" href="#/operas/' + escape(opera.slug) + '?act=1">Read the libretto <span aria-hidden="true">→</span></a>' : '') +
        '</div>' +
      '</div>' +
      '<div class="opera-info__facts section-wrap" aria-label="Opera information">' +
        [['Composer',opera.composer],['Librettist',opera.librettist],['Premiere',opera.premiered],['First performed at',opera.premieredAt],['Original language',opera.language],['Genre',opera.genre],['Acts',String(opera.acts)]]
        .map(([label,value]) => '<div><dt>' + escape(label) + '</dt><dd>' + escape(value) + '</dd></div>').join("") +
      '</div>' +
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
