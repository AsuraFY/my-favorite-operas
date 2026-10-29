// Each complete opera has its own import graph; home and directory stay lean.
const loaders = Object.freeze({
  "cosi-fan-tutte": () => import("./libretto-cosi-fan-tutte-bundle.js?v=on-demand-20261023").then(module => module.cosi),
  "il-barbiere-di-siviglia": () => import("./libretto-il-barbiere-di-siviglia-bundle.js?v=barbiere-verse-review-20261023").then(module => module.barbiere),
  "tristan-und-isolde": () => import("./libretto-tristan-und-isolde-bundle.js?v=tristan-verified-verses-20261023").then(module => module.tristan),
  "macbeth": () => import("./libretto-macbeth-bundle.js?v=on-demand-20261023").then(module => module.macbeth),
  "turandot": () => import("./libretto-turandot-bundle.js?v=on-demand-20261023").then(module => module.turandot),
  "le-nozze-di-figaro": () => import("./libretto-le-nozze-di-figaro-bundle.js?v=on-demand-20261023").then(module => module.figaro),
  "carmen": () => import("./libretto-carmen-bundle.js?v=carmen-whitespace-20261023").then(module => module.carmen),
  "la-boheme": () => import("./libretto-la-boheme-bundle.js?v=on-demand-20261023").then(module => module.laBoheme),
  "madama-butterfly": () => import("./libretto-madama-butterfly-bundle.js?v=on-demand-20261023").then(module => module.madamaButterfly),
  "tosca": () => import("./libretto-tosca-bundle.js?v=tosca-anchor-audit-20261023").then(module => module.tosca),
  "the-magic-flute": () => import("./libretto-die-zauberflote-bundle.js?v=zauberflote-outline-20261026").then(module => module.dieZauberflote),
  "la-fanciulla-del-west": () => import("./libretto-la-fanciulla-del-west-bundle.js?v=fanciulla-all-acts-20261026").then(module => module.laFanciullaDelWest),
  "otello": () => import("./libretto-otello-bundle.js?v=cosi-classic-20261027").then(module => module.otello),
  "parsifal": () => import("./libretto-parsifal-bundle.js?v=cosi-classic-20261027").then(module => module.parsifal),
  "don-giovanni": () => import("./libretto-don-giovanni-bundle.js?v=classic-sections-20261027").then(module => module.donGiovanni),
  "il-trovatore": () => import("./libretto-il-trovatore-bundle.js?v=trovatore-act1-20261028").then(module => module.trovatore),
  "lelisir-damore": () => import("./libretto-lelisir-damore-bundle.js?v=elisir-both-acts-20261029").then(module => module.elisir),
  "pagliacci": () => import("./libretto-pagliacci-bundle.js?v=pagliacci-complete-20261029").then(module => module.pagliacci),
  "lucia-di-lammermoor": () => import("./libretto-lucia-di-lammermoor-bundle.js?v=lucia-complete-20261029").then(module => module.luciaDiLammermoor),
  "rigoletto": () => import("./libretto-rigoletto-bundle.js?v=rigoletto-act1-20261028").then(module => module.rigoletto),
  "la-traviata": () => import("./libretto-la-traviata-bundle.js?v=traviata-all-acts-20261028").then(module => module.traviata),
  "aida": () => import("./libretto-aida-bundle.js?v=aida-act4-20261028").then(module => module.aida),
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
