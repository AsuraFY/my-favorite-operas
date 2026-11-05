// Compatibility registry for offline checks and Node regression tests.
// The browser instead imports individual operas through libretto-loader.js.
import { cosi } from "./librettos/cosi-fan-tutte/bundle.js?v=on-demand-20261023";
import { barbiere } from "./librettos/il-barbiere-di-siviglia/bundle.js?v=barbiere-verse-review-20261023";
import { tristan } from "./librettos/tristan-und-isolde/bundle.js?v=tristan-verified-verses-20261023";
import { macbeth } from "./librettos/macbeth/bundle.js?v=on-demand-20261023";
import { turandot } from "./librettos/turandot/bundle.js?v=on-demand-20261023";
import { figaro } from "./librettos/le-nozze-di-figaro/bundle.js?v=on-demand-20261023";
import { carmen } from "./librettos/carmen/bundle.js?v=carmen-whitespace-20261023";
import { laBoheme } from "./librettos/la-boheme/bundle.js?v=on-demand-20261023";
import { madamaButterfly } from "./librettos/madama-butterfly/bundle.js?v=on-demand-20261023";
import { tosca } from "./librettos/tosca/bundle.js?v=tosca-anchor-audit-20261023";
import { otello } from "./librettos/otello/bundle.js?v=otello-all-acts-20261026";
import { traviata } from "./librettos/la-traviata/bundle.js?v=traviata-all-acts-20261028";
import { aida } from "./librettos/aida/bundle.js?v=aida-act4-20261028";
import { samson } from "./librettos/samson-et-dalila/bundle.js?v=on-demand-20261023";

import { laFanciullaDelWest } from "./librettos/la-fanciulla-del-west/bundle.js?v=fanciulla-all-acts-20261026";
import { dieZauberflote } from "./librettos/the-magic-flute/bundle.js?v=zauberflote-outline-20261026";

import { parsifal } from "./librettos/parsifal/bundle.js?v=draft-20261026";
import { donGiovanni } from "./librettos/don-giovanni/bundle.js?v=draft-20261026";

import {hanselUndGretel} from "./librettos/hansel-und-gretel/bundle.js?v=hansel-complete-20261029";

import {dieFledermaus} from "./librettos/die-fledermaus/bundle.js?v=fledermaus-complete-20261029";
import { dasRheingold } from "./librettos/das-rheingold/bundle.js?v=rheingold-complete-20261029";
import {siegfried} from "./librettos/siegfried/bundle.js?v=siegfried-complete-20261029";
import {gotterdammerung} from "./librettos/gotterdammerung/bundle.js?v=gotterdammerung-20261029";
import {lesContesDHoffmann} from "./librettos/les-contes-dhoffmann/bundle.js?v=hoffmann-20261029";
import {eugeneOnegin} from "./librettos/eugene-onegin/bundle.js?v=onegin-independent-20261105";
const completeLibretti = { [eugeneOnegin.slug]:eugeneOnegin, [lesContesDHoffmann.slug]:lesContesDHoffmann, [gotterdammerung.slug]:gotterdammerung, [siegfried.slug]:siegfried, [dasRheingold.slug]:dasRheingold, [dieFledermaus.slug]:dieFledermaus, [hanselUndGretel.slug]: hanselUndGretel, [traviata.slug]: traviata, [aida.slug]: aida, [parsifal.slug]: parsifal, [donGiovanni.slug]: donGiovanni, [otello.slug]: otello, [laFanciullaDelWest.slug]: laFanciullaDelWest, [dieZauberflote.slug]: dieZauberflote, [cosi.slug]: cosi, [barbiere.slug]: barbiere, [tristan.slug]: tristan, [macbeth.slug]: macbeth, [turandot.slug]: turandot, [figaro.slug]: figaro, [carmen.slug]: carmen, [laBoheme.slug]: laBoheme, [madamaButterfly.slug]: madamaButterfly, [tosca.slug]: tosca, [samson.slug]: samson };
export function getLibretto(slug) {
  return completeLibretti[slug] || null;
}
export const librettoCatalog = Object.values(completeLibretti);
