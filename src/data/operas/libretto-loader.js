// Each complete opera has its own import graph; home and directory stay lean.
const loaders = Object.freeze({
  "die-walkure": () => import("./librettos/die-walkure/bundle.js?v=walkure-complete-20261029").then(module => module.dieWalkure),
  "manon": () => import("./librettos/manon/bundle.js?v=manon-act2-editorial-20261105").then(module => module.manon),
  "eugene-onegin": () => import("./librettos/eugene-onegin/bundle.js?v=onegin-ru-romanized-20261105").then(module => module.eugeneOnegin),
  "les-contes-dhoffmann": () => import("./librettos/les-contes-dhoffmann/bundle.js?v=hoffmann-20261029").then(module => module.lesContesDHoffmann),
  "gotterdammerung": () => import("./librettos/gotterdammerung/bundle.js?v=gotterdammerung-20261029").then(module => module.gotterdammerung),
  "siegfried": () => import("./librettos/siegfried/bundle.js?v=siegfried-complete-20261029").then(module => module.siegfried),
  "cosi-fan-tutte": () => import("./librettos/cosi-fan-tutte/bundle.js?v=on-demand-20261023").then(module => module.cosi),
  "il-barbiere-di-siviglia": () => import("./librettos/il-barbiere-di-siviglia/bundle.js?v=barbiere-verse-review-20261023").then(module => module.barbiere),
  "tristan-und-isolde": () => import("./librettos/tristan-und-isolde/bundle.js?v=tristan-verified-verses-20261023").then(module => module.tristan),
  "macbeth": () => import("./librettos/macbeth/bundle.js?v=on-demand-20261023").then(module => module.macbeth),
  "turandot": () => import("./librettos/turandot/bundle.js?v=on-demand-20261023").then(module => module.turandot),
  "le-nozze-di-figaro": () => import("./librettos/le-nozze-di-figaro/bundle.js?v=on-demand-20261023").then(module => module.figaro),
  "carmen": () => import("./librettos/carmen/bundle.js?v=carmen-whitespace-20261023").then(module => module.carmen),
  "la-boheme": () => import("./librettos/la-boheme/bundle.js?v=on-demand-20261023").then(module => module.laBoheme),
  "madama-butterfly": () => import("./librettos/madama-butterfly/bundle.js?v=on-demand-20261023").then(module => module.madamaButterfly),
  "tosca": () => import("./librettos/tosca/bundle.js?v=tosca-anchor-audit-20261023").then(module => module.tosca),
  "the-magic-flute": () => import("./librettos/the-magic-flute/bundle.js?v=zauberflote-outline-20261026").then(module => module.dieZauberflote),
  "la-fanciulla-del-west": () => import("./librettos/la-fanciulla-del-west/bundle.js?v=fanciulla-all-acts-20261026").then(module => module.laFanciullaDelWest),
  "otello": () => import("./librettos/otello/bundle.js?v=cosi-classic-20261027").then(module => module.otello),
  "parsifal": () => import("./librettos/parsifal/bundle.js?v=parsifal-issue15-20261105").then(module => module.parsifal),
  "don-giovanni": () => import("./librettos/don-giovanni/bundle.js?v=don-giovanni-issue15-20261105").then(module => module.donGiovanni),
  "il-trovatore": () => import("./librettos/il-trovatore/bundle.js?v=trovatore-act1-20261028").then(module => module.trovatore),
  "lelisir-damore": () => import("./librettos/lelisir-damore/bundle.js?v=elisir-both-acts-20261029").then(module => module.elisir),
  "pagliacci": () => import("./librettos/pagliacci/bundle.js?v=pagliacci-complete-20261029").then(module => module.pagliacci),
  "lucia-di-lammermoor": () => import("./librettos/lucia-di-lammermoor/bundle.js?v=lucia-complete-20261029").then(module => module.luciaDiLammermoor),
  "norma": () => import("./librettos/norma/bundle.js?v=norma-two-acts-20261029").then(module => module.norma),
  "la-cenerentola": () => import("./librettos/la-cenerentola/bundle.js?v=cenerentola-complete-20261029").then(module => module.laCenerentola),
  "das-rheingold": () => import("./librettos/das-rheingold/bundle.js?v=rheingold-complete-20261029").then(module => module.dasRheingold),
  "die-fledermaus": () => import("./librettos/die-fledermaus/bundle.js?v=fledermaus-complete-20261029").then(module => module.dieFledermaus),
  "hansel-und-gretel": () => import("./librettos/hansel-und-gretel/bundle.js?v=hansel-complete-20261029").then(module => module.hanselUndGretel),
  "nabucco": () => import("./librettos/nabucco/bundle.js?v=nabucco-complete-20261029").then(module => module.nabucco),
  "rigoletto": () => import("./librettos/rigoletto/bundle.js?v=rigoletto-act1-20261028").then(module => module.rigoletto),
  "la-traviata": () => import("./librettos/la-traviata/bundle.js?v=traviata-issue15-20261105").then(module => module.traviata),
  "aida": () => import("./librettos/aida/bundle.js?v=aida-issue15-20261105").then(module => module.aida),
  "samson-et-dalila": () => import("./librettos/samson-et-dalila/bundle.js?v=on-demand-20261023").then(module => module.samson)
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
