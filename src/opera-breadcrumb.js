// Shared breadcrumb and exact composer filtering for opera pages.
const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, char =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

export function renderOperaBreadcrumb(opera) {
  const composer = String(opera.composer || "");
  return '<nav class="opera-breadcrumb" aria-label="Breadcrumb">' +
    '<a href="#/">Home</a><span aria-hidden="true">›</span>' +
    '<a href="#/operas">Operas</a><span aria-hidden="true">›</span>' +
    '<a href="#/operas?composer=' + encodeURIComponent(composer) + '">' + escapeHtml(composer) + '</a>' +
    '<span aria-hidden="true">›</span><span aria-current="page">' + escapeHtml(opera.title) + '</span></nav>';
}

export function filterOperasByComposer(works, composer = "") {
  const normalized = String(composer).trim().toLocaleLowerCase();
  return normalized ? works.filter(work => String(work.composer || "").trim().toLocaleLowerCase() === normalized) : [...works];
}
