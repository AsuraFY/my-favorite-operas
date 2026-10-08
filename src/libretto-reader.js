import { cosiActOneScenes } from "./data/libretti.js?v=cosi-libretto-2";
import { cosiActTwoScenes } from "./data/libretti-act2.js?v=act2-18";

function escapeHtml(value = "") {
  return String(value).replace(/[&<>\"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;", "'": "&#39;" })[character]);
}

function speakerClass(speaker) {
  return speaker.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function romanNumeral(value) {
  const numerals = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII"];
  return numerals[value] || String(value);
}

function italianSceneOrdinal(value) {
  const ordinals = ["", "PRIMA", "SECONDA", "TERZA", "QUARTA", "QUINTA", "SESTA", "SETTIMA", "OTTAVA", "NONA", "DECIMA", "UNDICESIMA", "DODICESIMA", "TREDICESIMA", "QUATTORDICESIMA", "QUINDICESIMA", "SEDICESIMA", "DICIASSETTESIMA", "ULTIMA"];
  return ordinals[value] || String(value);
}

function sectionTitles(scene, section, sectionIndex) {
  if (!/^No\./i.test(section.label)) return { original: "", translation: "" };
  // Musical sections use the Italian incipit, rather than the scene-wide title.
  if (cosiActTwoScenes.includes(scene) && scene.number === 18)
    return { original: "Fortunato l'uom che prende", translation: "" };
  if (cosiActOneScenes.includes(scene) && scene.number === 1 && sectionIndex === 0)
    return { original: scene.title, translation: "" };
  if (cosiActOneScenes.includes(scene) && scene.number === 1 && sectionIndex === 2)
    return { original: "È la fede delle femmine", translation: "A woman’s faith" };
  if (cosiActOneScenes.includes(scene) && scene.number === 1 && sectionIndex === 4)
    return { original: "Una bella serenata", translation: "A lovely serenade" };
  if (cosiActOneScenes.includes(scene) && scene.number === 2 && sectionIndex === 0)
    return { original: scene.title, translation: "Ah, look, sister" };
  if (cosiActOneScenes.includes(scene) && scene.number === 3 && section.label.startsWith("No. 5"))
    return { original: scene.title, translation: "I would speak, but have no heart" };
  const sung = section.turns.find(turn => turn.speaker !== "Stage direction" && turn.it?.trim());
  const firstLine = sung?.it.split(/\r?\n/).map(line => line.trim())
    .find(line => line && !/^\([^)]*\)$/.test(line)) || "";
  return { original: firstLine.replace(/[.,;:!?…]+$/, ""), translation: "" };
}

function sectionNavigationLabel(section, scene, sectionIndex) {
  const match = section.label.match(/^No\.\s*(\d+)\s*[—–-]\s*(.+)$/i);
  const form = match ? match[2] : (section.label.toLocaleLowerCase() === "recitative" ? "Recitativo" : section.label);
  if (!match) return form;
  const title = scene ? sectionTitles(scene, section, sectionIndex).original : "";
  return "N. " + match[1] + " · " + form + (title ? " · " + title : "");
}

function sectionPresentation(scene, section, sectionIndex) {
  const match = section.label.match(/^No\.\s*(\d+)\s*[—–-]\s*(.+)$/i);
  const form = match ? match[2] : "Recitativo";
  const titles = sectionTitles(scene, section, sectionIndex);
  const number = match ? "N. " + match[1] + " · " : "";
  const heading = number + form + (titles.original ? " · " + titles.original : "");
  const translatedForm = ({ Terzetto: "Trio", Duetto: "Duet", Aria: "Aria" })[form] || "";
  const subtitle = [translatedForm, titles.translation].filter(Boolean).join(" · ");
  return { heading, subtitle, form, number: match ? Number(match[1]) : null };
}


function cosiActCatalog() {
  return [[1,cosiActOneScenes],[2,cosiActTwoScenes]].filter(([,s])=>s.length).map(([number,scenes])=>({number,scenes}));
}
function cosiOperaBar(act = 1, page = "libretto") {
  const base = "#/operas/cosi-fan-tutte";
  const availableActs = cosiActCatalog();
  const tabs = [
    { label: "Synopsis", href: base + "?view=synopsis", current: page === "synopsis" },
    { label: "Libretto Outline", href: base + "?view=outline", current: page === "outline" },
    ...availableActs.map(({number}) => ({
      label: "Act " + romanNumeral(number),
      href: base + "?act=" + number,
      current: page === "libretto" && act === number
    }))
  ];
  return '<nav class="opera-subnav" aria-label="Così fan tutte sections">' +
    '<div class="opera-subnav__identity"><span class="opera-subnav__title">Così fan tutte</span>' +
    '<span class="opera-subnav__composer">W. A. MOZART</span></div>' +
    '<div class="opera-subnav__links">' + tabs.map(tab =>
      '<a class="opera-subnav__link' + (tab.current ? ' is-active' : '') + '" href="' + tab.href + '"' +
      (tab.current ? ' aria-current="page"' : '') + '>' + tab.label + '</a>'
    ).join('') + '</div></nav>';
}


function renderActSceneLinks(act, selectedScene=0, selectedItem=-1, expandAll=false) {
  const scenes=cosiActCatalog().find(group=>group.number===act)?.scenes||[];
  return scenes.map(item=>{
    const links=item.sections.map((section,index)=>{
      const active=item.number===selectedScene&&index===selectedItem;
      const label=sectionNavigationLabel(section,item,index);
      const isSong=/^No\./i.test(section.label);
      const title=isSong?sectionTitles(item,section,index).original:"";
      const form=title?label.slice(0,-(" · "+title).length):label;
      const href="#/operas/cosi-fan-tutte?act="+act+"&scene="+item.number+"&item="+index;
      return '<a class="section-nav-link'+(active?' is-current':'')+'" href="'+href+'"'+(active?' aria-current="page"':'')+
        '><span class="section-nav-link__icon section-nav-link__icon--'+(isSong?'song':'recitative')+'" aria-hidden="true">'+(isSong?'♫':'▤')+
        '</span><span class="section-nav-link__label"><span class="section-nav-link__form">'+escapeHtml(form)+'</span>'+
        (title?'<span class="section-nav-link__title">'+escapeHtml(title)+'</span>':'')+'</span></a>';
    }).join("");
    const selected=item.number===selectedScene;
    return '<details class="scene-group'+(selected?' is-current':'')+'"'+((expandAll||selected)?' open':'')+
      '><summary class="scene-group__summary"><span>Scene '+romanNumeral(item.number)+
      '</span><span class="scene-group__chevron" aria-hidden="true">⌄</span></summary><div class="section-nav">'+links+'</div></details>';
  }).join("");
}
function renderCompleteOutlineAct(act) {
  const group = cosiActCatalog().find(entry => entry.number === act);
  if (!group) return "";
  const actName = act === 1 ? "Primo" : act === 2 ? "Secondo" : "Terzo";
  return '<details class="opera-outline__act" open aria-labelledby="outline-act-' + act + '">' +
    '<summary class="opera-outline__act-toggle"><h2 id="outline-act-' + act +
    '">Atto ' + actName + ' <span>·</span> Act ' + romanNumeral(act) +
    '<span class="opera-outline__chevron" aria-hidden="true">⌄</span></h2></summary>' +
    group.scenes.map(scene => {
      const sceneId = 'outline-scene-' + act + '-' + scene.number;
      return '<section class="opera-outline__scene" aria-labelledby="' + sceneId + '">' +
        '<h3 id="' + sceneId + '">Scena ' + italianSceneOrdinal(scene.number).toLocaleLowerCase("it-IT") +
        ' <span>·</span> Scene ' + scene.number + '</h3>' +
        '<div class="opera-outline__sections">' +
        scene.sections.map((section, index) => {
          const title = sectionPresentation(scene, section, index).heading;
          const href = '#/operas/cosi-fan-tutte?act=' + act +
            '&scene=' + scene.number + '&item=' + index;
          return '<a class="section-nav-link opera-outline__section" href="' + href + '">' +
            '<span class="opera-outline__section-title">' + escapeHtml(title) + '</span>' +
            sectionParticipantCredits(section, act, scene.number) +
          '</a>';
        }).join("") +
        '</div></section>';
    }).join("") + '</details>';
}
function cosiOutlinePage() {
  return '<div class="opera-reading-page opera-outline-page">' + cosiOperaBar(1, "outline") +
    '<section class="opera-outline" aria-labelledby="opera-outline-title">' +
    '<div class="opera-outline__heading"><h1 id="opera-outline-title">Libretto Outline</h1></div>' +
    '<div class="opera-outline__acts">' +
    cosiActCatalog().map(({ number }) => renderCompleteOutlineAct(number)).join("") +
    '</div></section></div>';
}

function cosiSynopsisPage() {
  const characters = [
    ["Fiordiligi", "Soprano", "Dorabella’s sister, engaged to Guglielmo; she struggles to remain loyal during the test."],
    ["Dorabella", "Mezzo-soprano", "Fiordiligi’s sister, engaged to Ferrando; her feelings shift during the disguised courtship."],
    ["Ferrando", "Tenor", "A young officer engaged to Dorabella, who joins Alfonso’s wager and disguises himself."],
    ["Guglielmo", "Baritone", "An officer engaged to Fiordiligi, who joins Ferrando in the test of fidelity."],
    ["Don Alfonso", "Bass", "An older philosopher who doubts constancy and devises the wager."],
    ["Despina", "Soprano", "The sisters’ quick-witted maid, enlisted to help carry out Alfonso’s scheme."]
  ];
  return '<div class="opera-reading-page">' + cosiOperaBar(1, "synopsis") +
    '<article class="opera-synopsis">' +
    '<p class="opera-synopsis__eyebrow">W. A. Mozart · Opera buffa in two acts</p>' +
    '<h1>Synopsis</h1>' +
    '<p>Two young officers, Ferrando and Guglielmo, are certain their fiancées, Dorabella and Fiordiligi, will always be faithful. Don Alfonso challenges their confidence with a wager: the officers must pretend to leave for war, return in disguise, and attempt to win each other’s beloved.</p>' +
    '<p>With help from the sisters’ maid Despina, Alfonso engineers increasingly elaborate encounters. The deception tests all four lovers, culminating in a staged wedding and a final revelation that forces them to confront love, loyalty and human inconsistency.</p>' +
    '<h2>Principal characters</h2><div class="opera-synopsis__characters">' +
    characters.map(([name, role, description]) => '<div class="opera-synopsis__character"><h3>' + name +
      '</h3><span>' + role + '</span><p>' + description + '</p></div>').join('') +
    '</div></article></div>';
}



function sectionParticipantCredits(section, act, sceneNumber) {
  const named = ["Fiordiligi", "Dorabella", "Ferrando", "Guglielmo", "Don Alfonso", "Despina"];
  const speakers = section.turns.filter(t => t.speaker !== "Stage direction").map(t => t.speaker);
  const costumes = {
    "1:11": ["Ferrando", "Guglielmo"], "1:15": ["Ferrando", "Guglielmo"],
    "1:16": ["Ferrando", "Guglielmo"], "2:4": ["Ferrando", "Guglielmo"],
    "2:5": ["Guglielmo"], "2:6": ["Ferrando"],
    "2:12": ["Ferrando"], "2:16": ["Ferrando", "Guglielmo"],
    "2:17": ["Ferrando", "Guglielmo"]
  };
  const names = named.filter(name => speakers.some(s => s.includes(name))).map(name => {
    if (name === "Despina" && act === 1 && sceneNumber === 16) return name + " (disguised as a doctor)";
    if (name === "Despina" && act === 2 && sceneNumber === 17) return name + " (disguised as a notary)";
    if ((costumes[act + ":" + sceneNumber] || []).includes(name)) return name + " (disguised as an Albanian suitor)";
    return name;
  });
  if (speakers.includes("Soldiers & townspeople")) names.push("Soldiers & townspeople");
  if (speakers.includes("Chorus of Servants & Musicians")) names.push("Servants & musicians (chorus)");
  else if (speakers.includes("Chorus")) names.push("Chorus");
  if (!names.length) return "";
  const icon = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false">' +
    '<circle cx="9" cy="7.5" r="3"/><path d="M3.5 20v-2a5.5 5.5 0 0 1 11 0v2"/>' +
    '<path d="M16.5 4.7a3 3 0 0 1 0 5.6M18 14a4 4 0 0 1 3 4v2"/></svg>';
  return '<div class="libretto-participants" aria-label="Singers and speakers in this section">' +
    icon + '<span>' + escapeHtml(names.join(", ")) + '</span></div>';
}

function renderCosiSceneSection(scene, section, sectionIndex, act) {
  const heading = sectionPresentation(scene, section, sectionIndex);
  const rows = section.turns.map(turn => {
    const className = speakerClass(turn.speaker);
    const speaker = '<span class="libretto-speaker libretto-speaker--' + className + '">' + escapeHtml(turn.speaker) + '</span>';
    const type = className === 'stage-direction' ? ' libretto-row--stage-direction' : '';
    return '<div class="libretto-row' + type + '"><div class="libretto-cell libretto-cell--italian">' +
      speaker + '<p>' + escapeHtml(turn.it) + '</p></div><div class="libretto-cell libretto-cell--english">' +
      speaker + '<p>' + escapeHtml(turn.en) + '</p></div></div>';
  }).join('');
  return '<section class="libretto-scene-section" id="libretto-section-' + act + '-' + scene.number +
    '-' + sectionIndex + '" data-libretto-item="' + sectionIndex + '">' +
    '<div class="selected-section-heading"><h2>' + escapeHtml(heading.heading) + '</h2>' +
    sectionParticipantCredits(section, act, scene.number) + '</div>' +
    '<div class="libretto-columns"><div class="libretto-column-heading">Italiano</div>' +
    '<div class="libretto-column-heading">English</div><div class="libretto-text">' +
    '<section class="libretto-section"><div class="libretto-section__label">' +
    escapeHtml(sectionNavigationLabel(section, scene, sectionIndex)) + '</div>' +
    rows + '</section></div></div></section>';
}

function conciseSceneSummary(scene) {
  const text = (scene.summary || "").trim();
  const sentences = (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).map(s => s.trim());
  return (text.split(/\s+/).length > 35 ? sentences.slice(0, 1) : sentences.slice(0, 2)).join(" ");
}

function cosiOperaPage(selectedNumber = 1, query = "", selectedItem = 0, mobileContents = false) {
  const requested=Number(new URLSearchParams(window.location.hash.split("?")[1]||"").get("act"))||1;
  const group=cosiActCatalog().find(group=>group.number===requested)||cosiActCatalog()[0];
  const act=group.number, scenes=group.scenes;
  const searchTerm = query.trim().toLocaleLowerCase();
  let found = null;
  if (searchTerm) {
    scenes.some((candidate) => candidate.sections.some((section, sectionIndex) => {
      const hasMatch = section.turns.some((turn) => (turn.speaker + " " + turn.it + " " + turn.en).toLocaleLowerCase().includes(searchTerm));
      if (hasMatch) {
        found = { scene: candidate.number, item: sectionIndex };
        return true;
      }
      return false;
    }));
  }
  const scene = scenes.find((item) => item.number === (found?.scene || selectedNumber)) || scenes[0];
  const itemIndex = Math.max(0, Math.min(found?.item ?? selectedItem, scene.sections.length - 1));
  const safeQuery = escapeHtml(query);
  const sceneLabel = "Scene " + romanNumeral(scene.number);
  const actLabel = "Act " + romanNumeral(act);
  const sceneLinks = renderActSceneLinks(act, scene.number, itemIndex, true);
  const previous = scene.number > 1 ? '<a class="mobile-scene-step" href="#/operas/cosi-fan-tutte?act=' + act + '&scene=' + (scene.number - 1) + '&item=0">‹ <span>Prev. scene</span></a>' : '<span class="mobile-scene-step is-disabled" aria-disabled="true">‹ <span>Prev. scene</span></span>';
  const next = scene.number < scenes.length ? '<a class="mobile-scene-step" href="#/operas/cosi-fan-tutte?act=' + act + '&scene=' + (scene.number + 1) + '&item=0"><span>Next scene</span> ›</a>' : '<span class="mobile-scene-step is-disabled" aria-disabled="true"><span>Next scene</span> ›</span>';
  const followingAct = cosiActCatalog().find(group => group.number > act);
  const bottomNext = scene.number < scenes.length ? next : followingAct ?
    '<a class="mobile-scene-step" href="#/operas/cosi-fan-tutte?act=' + followingAct.number + '&scene=1&item=0">Continue to Act ' + romanNumeral(followingAct.number) + ' →</a>' :
    '<span class="mobile-scene-step is-disabled" aria-disabled="true">End of opera</span>';
  const bottomSceneNavigation = '<nav class="scene-bottom-nav" aria-label="Scene navigation at end of scene">' +
    '<p class="scene-bottom-nav__label">End of ' + sceneLabel + '</p>' +
    '<div class="scene-bottom-nav__controls">' + previous + bottomNext + '</div></nav>';
  const outlineButton = '<button type="button" class="back-to-scenes act-outline__trigger" data-outline-open aria-controls="act-outline" aria-haspopup="dialog" aria-expanded="false">☰ <span>Outline</span></button>';
  return '<div class="opera-reading-page" data-act="' + act + '" data-scene="' + scene.number + '" data-initial-item="' + itemIndex + '">' +
    cosiOperaBar(act) +
    '<section class="mobile-opera-intro"><div class="mobile-opera-intro__art" role="img" aria-label="Lake Como landscape"></div><div class="mobile-opera-intro__title"><h1>Così fan tutte</h1><p>W. A. Mozart</p></div></section>' +
    '<div class="reading-layout">' +
      '<div class="act-outline__backdrop" data-outline-backdrop hidden aria-hidden="true"></div>' +
      '<aside class="scene-sidebar" id="act-outline" data-act-outline aria-label="' + actLabel + ' outline" tabindex="-1">' +
        '<div class="act-outline__top"><span>' + actLabel + ' · Outline</span><button type="button" data-outline-close aria-label="Close outline">×</button></div>' +
        '<div class="desktop-outline-collapse-bar"><button type="button" class="desktop-outline-collapse" data-desktop-outline-collapse aria-label="Collapse outline" title="Collapse outline" aria-controls="act-outline" aria-expanded="true"><svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" focusable="false"><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M9 4v16M16 9l-3 3 3 3"></path></svg></button></div>' +
        '<details class="act-group" open><summary class="act-heading"><h2>' + actLabel + '</h2><span aria-hidden="true">⌄</span></summary><nav aria-label="Scenes in ' + actLabel + '">' + sceneLinks + '</nav></details></aside>' +
      '<div class="reading-main">' +
        '<div class="desktop-outline-reopen"><button type="button" data-desktop-outline-expand aria-controls="act-outline" aria-expanded="false" aria-label="Expand outline" title="Expand outline"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M9 4v16m4-11 3 3-3 3"></path></svg><span>Outline</span></button></div>' +
        '<section class="scene-panel">' +
        '<div class="mobile-reader-toolbar">' + outlineButton + '<nav aria-label="Scene navigation">' + previous + next + '</nav></div>' +
        '<div class="scene-panel__top">' +
          '<h1 class="scene-context">ATTO ' + (act === 2 ? "SECONDO" : "PRIMO") +
          ' · ' + actLabel.toUpperCase() + ' <span>/</span> SCENA ' +
          italianSceneOrdinal(scene.number) + ' · ' + sceneLabel.toUpperCase() + '</h1>' +
          '<p class="scene-summary">' + escapeHtml(conciseSceneSummary(scene)) + '</p>' +
        '</div>' +
        (searchTerm ? '<p class="libretto-search-result" role="status">' + (found ? 'Showing the first passage containing “' + safeQuery + '”.' : 'No passage in this act contains “' + safeQuery + '”. Showing Scene ' + scene.number + '.') + '</p>' : '') +
        scene.sections.map((part, index) => renderCosiSceneSection(scene, part, index, act)).join("") +
        bottomSceneNavigation +
      '</section></div>' +
    '</div>' +
    '<button class="libretto-back-to-top" type="button" data-reader-top hidden aria-label="Back to scene navigation" title="Back to scene navigation"><span aria-hidden="true">↑</span><span aria-hidden="true">Top</span></button>' +
  '</div>';
}

export { cosiOperaPage, cosiOutlinePage, cosiSynopsisPage };
