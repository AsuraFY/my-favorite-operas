// Each complete opera has its own import graph; home and directory stay lean.
const loaders = Object.freeze({
  "cosi-fan-tutte": () => import("./libretto-cosi-fan-tutte-bundle.js?v=on-demand-20261023").then(module => module.cosi),
  "il-barbiere-di-siviglia": () => import("./libretto-il-barbiere-di-siviglia-bundle.js?v=on-demand-20261023").then(module => module.barbiere),
  "tristan-und-isolde": () => import("./libretto-tristan-und-isolde-bundle.js?v=on-demand-20261023").then(module => module.tristan),
  "macbeth": () => import("./libretto-macbeth-bundle.js?v=on-demand-20261023").then(module => module.macbeth),
  "turandot": () => import("./libretto-turandot-bundle.js?v=on-demand-20261023").then(module => module.turandot),
  "le-nozze-di-figaro": () => import("./libretto-le-nozze-di-figaro-bundle.js?v=on-demand-20261023").then(module => module.figaro),
  "carmen": () => import("./libretto-carmen-bundle.js?v=on-demand-20261023").then(module => module.carmen),
  "la-boheme": () => import("./libretto-la-boheme-bundle.js?v=on-demand-20261023").then(module => module.laBoheme),
  "madama-butterfly": () => import("./libretto-madama-butterfly-bundle.js?v=on-demand-20261023").then(module => module.madamaButterfly),
  "tosca": () => import("./libretto-tosca-bundle.js?v=on-demand-20261023").then(module => module.tosca),
  "samson-et-dalila": () => import("./libretto-samson-et-dalila-bundle.js?v=on-demand-20261023").then(module => module.samson)
});
const pending = new Map();

export function hasCompleteLibretto(slug) {
  return Object.hasOwn(loaders, slug);
}

export function loadLibretto(slug) {
  if (!hasCompleteLibretto(slug)) return Promise.resolve(null);
  if (!pending.has(slug)) {
    // A failed network request can be retried without refreshing the page.
    const request = loaders[slug]().catch(error => {
      pending.delete(slug);
      throw error;
    });
    pending.set(slug, request);
  }
  return pending.get(slug);
}
