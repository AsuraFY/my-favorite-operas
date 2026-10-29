// Compatibility registry for offline checks and Node regression tests.
// The browser instead imports individual operas through libretto-loader.js.
import { cosi } from "./libretto-cosi-fan-tutte-bundle.js?v=on-demand-20261023";
import { barbiere } from "./libretto-il-barbiere-di-siviglia-bundle.js?v=barbiere-verse-review-20261023";
import { tristan } from "./libretto-tristan-und-isolde-bundle.js?v=tristan-verified-verses-20261023";
import { macbeth } from "./libretto-macbeth-bundle.js?v=on-demand-20261023";
import { turandot } from "./libretto-turandot-bundle.js?v=on-demand-20261023";
import { figaro } from "./libretto-le-nozze-di-figaro-bundle.js?v=on-demand-20261023";
import { carmen } from "./libretto-carmen-bundle.js?v=carmen-whitespace-20261023";
import { laBoheme } from "./libretto-la-boheme-bundle.js?v=on-demand-20261023";
import { madamaButterfly } from "./libretto-madama-butterfly-bundle.js?v=on-demand-20261023";
import { tosca } from "./libretto-tosca-bundle.js?v=tosca-anchor-audit-20261023";
import { otello } from "./libretto-otello-bundle.js?v=otello-all-acts-20261026";
import { traviata } from "./libretto-la-traviata-bundle.js?v=traviata-all-acts-20261028";
import { aida } from "./libretto-aida-bundle.js?v=aida-act4-20261028";
import { samson } from "./libretto-samson-et-dalila-bundle.js?v=on-demand-20261023";

import { laFanciullaDelWest } from "./libretto-la-fanciulla-del-west-bundle.js?v=fanciulla-all-acts-20261026";
import { dieZauberflote } from "./libretto-die-zauberflote-bundle.js?v=zauberflote-outline-20261026";

import { parsifal } from "./libretto-parsifal-bundle.js?v=draft-20261026";
import { donGiovanni } from "./libretto-don-giovanni-bundle.js?v=draft-20261026";

import {hanselUndGretel} from "./libretto-hansel-und-gretel-bundle.js?v=hansel-complete-20261029";

import {dieFledermaus} from "./libretto-die-fledermaus-bundle.js?v=fledermaus-complete-20261029";
import { dasRheingold } from "./libretto-das-rheingold-bundle.js?v=rheingold-complete-20261029";
import {siegfried} from "./libretto-siegfried-bundle.js?v=siegfried-complete-20261029";
import {gotterdammerung} from "./libretto-gotterdammerung-bundle.js?v=gotterdammerung-20261029";
const completeLibretti = { [gotterdammerung.slug]:gotterdammerung, [siegfried.slug]:siegfried, [dasRheingold.slug]:dasRheingold, [dieFledermaus.slug]:dieFledermaus, [hanselUndGretel.slug]: hanselUndGretel, [traviata.slug]: traviata, [aida.slug]: aida, [parsifal.slug]: parsifal, [donGiovanni.slug]: donGiovanni, [otello.slug]: otello, [laFanciullaDelWest.slug]: laFanciullaDelWest, [dieZauberflote.slug]: dieZauberflote, [cosi.slug]: cosi, [barbiere.slug]: barbiere, [tristan.slug]: tristan, [macbeth.slug]: macbeth, [turandot.slug]: turandot, [figaro.slug]: figaro, [carmen.slug]: carmen, [laBoheme.slug]: laBoheme, [madamaButterfly.slug]: madamaButterfly, [tosca.slug]: tosca, [samson.slug]: samson };
export function getLibretto(slug) {
  return completeLibretti[slug] || null;
}
export const librettoCatalog = Object.values(completeLibretti);
