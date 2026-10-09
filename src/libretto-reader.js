


function createLibrettoRenderer(libretto) {
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

function sectionTitles(scene, section, sectionIndex) {
  const act = libretto.acts.find(group => group.scenes.includes(scene))?.number;
  const title = libretto.sectionTitleOverrides?.[act + ":" + scene.number + ":" + sectionIndex];
  const numbered = section.number != null || /^No\./i.test(section.label || "");
  if (!numbered && !section.originalTitle && !section.title && !title) return { original: "", translation: "" };
  if (section.originalTitle || section.title || title) return {
    original: section.originalTitle || section.title || title?.original || "",
    translation: section.translatedTitle || title?.translation || ""
  };
  const sung = section.turns.find(turn => turn.speaker !== (libretto.stageDirectionSpeaker || "Stage direction") &&
    (turn.original ?? turn.it)?.trim());
  const firstLine = (sung?.original ?? sung?.it ?? "").split(/\r?\n/).map(line => line.trim())
    .find(line => line && !/^\([^)]*\)$/.test(line)) || "";
  return { original: firstLine.replace(/[.,;:!?…]+$/, ""), translation: "" };
}
function sectionNavigationLabel(section, scene, sectionIndex) {
  const match = (section.label || "").match(/^No\.\s*(\d+)\s*[—–-]\s*(.+)$/i);
  const no = section.number ?? (match ? Number(match[1]) : null);
  const form = section.type || (match ? match[2] :
    ((section.label || "").toLocaleLowerCase() === "recitative" ? (libretto.recitativeLabel || "Recitative") : section.label));
  const title = scene ? sectionTitles(scene, section, sectionIndex).original : "";
  if (no == null) return form + (title ? " · " + title : "");
  return (libretto.numberLabel || "N.") + " " + no + " · " + form + (title ? " · " + title : "");
}
function sectionPresentation(scene, section, sectionIndex) {
  const match = (section.label || "").match(/^No\.\s*(\d+)\s*[—–-]\s*(.+)$/i);
  const no = section.number ?? (match ? Number(match[1]) : null);
  const form = section.type || (match ? match[2] : (libretto.recitativeLabel || "Recitative"));
  const titles = sectionTitles(scene, section, sectionIndex);
  const number = no == null ? "" : (libretto.numberLabel || "N.") + " " + no + " · ";
  const heading = section.type === "Passage" && titles.original ? titles.original :
    number + form + (titles.original ? " · " + titles.original : "");
  const translatedForm = section.type === "Passage" ? "" : (libretto.translatedForms?.[form] || "");
  const subtitle = [translatedForm, titles.translation].filter(Boolean).join(" · ");
  return { heading, subtitle, form, number: no };
}
function actCatalog() {
  return (libretto.acts || []).filter(group => group.scenes?.length);
}
function renderOperaBar(act = 1, page = "libretto") {
  const base = "#/operas/" + libretto.slug;
  const availableActs = actCatalog();
  const tabs = [
    { label: "Synopsis", href: base + "?view=synopsis", current: page === "synopsis" },
    { label: "Libretto Outline", href: base + "?view=outline", current: page === "outline" },
    ...availableActs.map(({number}) => ({
      label: "Act " + romanNumeral(number),
      href: base + "?act=" + number,
      current: page === "libretto" && act === number
    }))
  ];
  return '<nav class="opera-subnav" aria-label="' + escapeHtml(libretto.opera.title) + ' sections">' +
    '<div class="opera-subnav__identity"><span class="opera-subnav__title">' + escapeHtml(libretto.opera.title) + '</span>' +
    '<span class="opera-subnav__composer">' + escapeHtml(libretto.composerShort || libretto.opera.composer) + '</span></div>' +
    '<div class="opera-subnav__links">' + tabs.map(tab =>
      '<a class="opera-subnav__link' + (tab.current ? ' is-active' : '') + '" href="' + tab.href + '"' +
      (tab.current ? ' aria-current="page"' : '') + '>' + tab.label + '</a>'
    ).join('') + '</div></nav>';
}



function renderActSceneLinks(act, selectedScene=0, selectedItem=-1, expandAll=false) {
  const scenes=actCatalog().find(group=>group.number===act)?.scenes||[];
  const spotifyAct=libretto.spotifyOutline?.find(group=>group.act===act);
  if (spotifyAct) return spotifyAct.scenes.map(outlineScene=>{
    const links=outlineScene.tracks.map((track,index)=>{
      const targetScene=track.sourceScene||outlineScene.number;
      const active=targetScene===selectedScene;
      const href="#/operas/"+libretto.slug+"?act="+act+"&scene="+targetScene+"&item=0";
      return '<a class="section-nav-link is-song'+(active?' is-current':'')+'" href="'+href+'"'+(active?' aria-current="page"':'')+
        '><span class="section-nav-link__icon section-nav-link__icon--song" aria-hidden="true">♫</span>'+
        '<span class="section-nav-link__label">'+
        '<span class="section-nav-link__title">'+escapeHtml(track.title)+'</span>'+
        '<span class="section-nav-link__title section-nav-link__translation">'+escapeHtml(track.translation)+'</span></span></a>';
    }).join("");
    const selected=outlineScene.tracks.some(track=>(track.sourceScene||outlineScene.number)===selectedScene);
    return '<details class="scene-group'+(selected?' is-current':'')+'"'+((expandAll||selected)?' open':'')+
      '><summary class="scene-group__summary"><span>Scene '+romanNumeral(outlineScene.number)+'</span>'+
      '<span class="scene-group__chevron" aria-hidden="true">⌄</span></summary><div class="section-nav">'+links+'</div></details>';
  }).join("");
  return scenes.map(item=>{
    const links=item.sections.map((section,index)=>{
      const active=item.number===selectedScene&&index===selectedItem;
      const label=sectionNavigationLabel(section,item,index);
      const isSong=section.number != null || /^No\./i.test(section.label || "");
      const isNamedPassage=section.type==="Passage";
      const titles=(isSong||isNamedPassage)?sectionTitles(item,section,index):{original:"",translation:""};
      const title=titles.original;
      const form=title?(isNamedPassage?"Passage":label.slice(0,-(" · "+title).length)):label;
      const href="#/operas/"+libretto.slug+"?act="+act+"&scene="+item.number+"&item="+index;
      return '<a class="section-nav-link'+(active?' is-current':'')+'" href="'+href+'"'+(active?' aria-current="page"':'')+
        '><span class="section-nav-link__icon section-nav-link__icon--'+(isSong?'song':'recitative')+'" aria-hidden="true">'+(isSong?'♫':'▤')+
        '</span><span class="section-nav-link__label"><span class="section-nav-link__form">'+escapeHtml(form)+'</span>'+
        (title?'<span class="section-nav-link__title">'+escapeHtml(title)+'</span>':'')+
        (isNamedPassage&&titles.translation?'<span class="section-nav-link__title section-nav-link__translation">'+escapeHtml(titles.translation)+'</span>':'')+'</span></a>';
    }).join("");
    const selected=item.number===selectedScene;
    return '<details class="scene-group'+(selected?' is-current':'')+'"'+((expandAll||selected)?' open':'')+
      '><summary class="scene-group__summary"><span>Scene '+romanNumeral(item.number)+
      '</span><span class="scene-group__chevron" aria-hidden="true">⌄</span></summary><div class="section-nav">'+links+'</div></details>';
  }).join("");
}function renderCompleteOutlineAct(act) {
  const group = actCatalog().find(entry => entry.number === act);
  if (!group) return "";
  const spotifyAct = libretto.spotifyOutline?.find(entry => entry.act === act);
  const actName = group.originalHeading || "Act " + romanNumeral(act);
  const header = '<summary class="opera-outline__act-toggle"><h2 id="outline-act-' + act +
    '">' + escapeHtml(actName) + ' <span>·</span> Act ' + romanNumeral(act) +
    '<span class="opera-outline__chevron" aria-hidden="true">⌄</span></h2></summary>';
  if (spotifyAct) {
    const prelude = spotifyAct.prelude ? '<a class="section-nav-link opera-outline__section opera-outline__prelude" href="#/operas/' +
      libretto.slug + '?act=' + act + '&scene=1&item=0"><span class="opera-outline__section-title">' +
      escapeHtml(spotifyAct.prelude.title) + '</span><span class="opera-outline__section-translation">' +
      escapeHtml(spotifyAct.prelude.translation) + '</span></a>' : "";
    const scenes = spotifyAct.scenes.map(outlineScene => {
      const sceneId = 'outline-scene-' + act + '-' + outlineScene.number;
      return '<section class="opera-outline__scene" aria-labelledby="' + sceneId + '">' +
        '<h3 id="' + sceneId + '">' + escapeHtml((libretto.sceneOriginalPrefix || 'Scene') + ' ' +
        (libretto.sceneOrdinals?.[outlineScene.number - 1] || romanNumeral(outlineScene.number)).toLocaleLowerCase()) +
        ' <span>·</span> Scene ' + outlineScene.number + '</h3><div class="opera-outline__sections">' +
        outlineScene.tracks.map(track => {
          const targetScene = track.sourceScene || outlineScene.number;
          const href = '#/operas/' + libretto.slug + '?act=' + act + '&scene=' + targetScene + '&item=0';
          return '<a class="section-nav-link opera-outline__section" href="' + href + '">' +
            '<span class="opera-outline__section-title">' + escapeHtml(track.title) + '</span>' +
            '<span class="opera-outline__section-translation">' + escapeHtml(track.translation) + '</span></a>';
        }).join('') + '</div></section>';
    }).join('');
    return '<details class="opera-outline__act" open aria-labelledby="outline-act-' + act + '">' +
      header + '<div class="opera-outline__sections opera-outline__sections--prelude">' + prelude + '</div>' + scenes + '</details>';
  }
  return '<details class="opera-outline__act" open aria-labelledby="outline-act-' + act + '">' +
    header + group.scenes.map(scene => {
      const sceneId = 'outline-scene-' + act + '-' + scene.number;
      return '<section class="opera-outline__scene" aria-labelledby="' + sceneId + '">' +
        '<h3 id="' + sceneId + '">' + escapeHtml((libretto.sceneOriginalPrefix || 'Scene') + ' ' + (libretto.sceneOrdinals?.[scene.number - 1] || romanNumeral(scene.number)).toLocaleLowerCase()) +
        ' <span>·</span> Scene ' + scene.number + '</h3><div class="opera-outline__sections">' +
        scene.sections.map((section, index) => {
          const presentation = sectionPresentation(scene, section, index);
          const href = '#/operas/' + libretto.slug + '?act=' + act + '&scene=' + scene.number + '&item=' + index;
          return '<a class="section-nav-link opera-outline__section" href="' + href + '">' +
            '<span class="opera-outline__section-title">' + escapeHtml(presentation.heading) + '</span>' +
            (section.type === "Passage" && presentation.subtitle ? '<span class="opera-outline__section-translation">' + escapeHtml(presentation.subtitle) + '</span>' : "") +
            sectionParticipantCredits(section, act, scene.number) + '</a>';
        }).join("") + '</div></section>';
    }).join("") + '</details>';
}function renderOutlinePage() {
  return '<div class="opera-reading-page opera-outline-page" data-libretto-slug="' + libretto.slug + '">' + renderOperaBar(1, "outline") +
    '<section class="opera-outline" aria-labelledby="opera-outline-title">' +
    '<div class="opera-outline__heading"><h1 id="opera-outline-title">Libretto Outline</h1></div>' +
    '<div class="opera-outline__acts">' +
    actCatalog().map(({ number }) => renderCompleteOutlineAct(number)).join("") +
    '</div></section></div>';
}


function renderSynopsisPage() {
  const synopsis = libretto.synopsis;
  const characters = synopsis.characters;
  return '<div class="opera-reading-page" data-libretto-slug="' + libretto.slug + '">' + renderOperaBar(1, "synopsis") +
    '<article class="opera-synopsis">' +
    '<p class="opera-synopsis__eyebrow">' + escapeHtml(synopsis.eyebrow) + '</p>' +
    '<h1>Synopsis</h1>' +
    synopsis.paragraphs.map(paragraph => '<p>' + escapeHtml(paragraph) + '</p>').join("") +
    '<h2>Principal characters</h2><div class="opera-synopsis__characters">' +
    characters.map(([name, role, description]) => '<div class="opera-synopsis__character"><h3>' + escapeHtml(name) +
      '</h3><span>' + role + '</span><p>' + escapeHtml(description) + '</p></div>').join('') +
    '</div></article></div>';
}

function sectionParticipantCredits(section, act, sceneNumber) {
  const speakers = section.turns.filter(t => t.speaker !== (libretto.stageDirectionSpeaker || "Stage direction")).map(t => t.speaker);
  const notes = libretto.disguises?.[act + ":" + sceneNumber] || {};
  const participants = section.participants || (libretto.characters || []).filter(name => speakers.some(s => s.includes(name)));
  const names = participants.map(person => {
    const name = typeof person === "string" ? person : person.name;
    const note = typeof person === "string" ? notes[name] : (person.note || notes[name]);
    return name + (note ? " (" + note + ")" : "");
  });
  const groups = libretto.ensembleLabels || {};
  for (const [source, label] of Object.entries(groups)) {
    if (speakers.includes(source) && !(source === "Chorus" && speakers.includes("Chorus of Servants & Musicians"))) names.push(label);
  }
  if (!names.length) return "";
  const icon = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false">' +
    '<circle cx="9" cy="7.5" r="3"/><path d="M3.5 20v-2a5.5 5.5 0 0 1 11 0v2"/>' +
    '<path d="M16.5 4.7a3 3 0 0 1 0 5.6M18 14a4 4 0 0 1 3 4v2"/></svg>';
  return '<div class="libretto-participants" aria-label="Singers and speakers in this section">' +
    icon + '<span>' + escapeHtml(names.join(", ")) + '</span></div>';
}
function formatLibrettoText(value, breakVerseLines=true) {
  let text = String(value || "").replace(/\r/g, "").trim();
  if (breakVerseLines) {
    text = text.replace(/([,;:!?])\s+/g, "$1\n")
      .replace(/([.])\s+(?=[A-ZÄÖÜ„“«])/g, "$1\n")
      .replace(/\s+—\s+/g, "\n— ");
  }
  return text.split(/\n+/).map(line => escapeHtml(line.trim())).filter(Boolean).join("<br>");
}
function splitInlineDirections(value) {
  const text = String(value || "");
  const parts = [];
  const pattern = /\(([^()]*)\)/g;
  let last = 0, match;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push({ type: "text", value: text.slice(last, match.index) });
    parts.push({ type: "direction", value: match[1] });
    last = pattern.lastIndex;
  }
  if (last < text.length) parts.push({ type: "text", value: text.slice(last) });
  return parts.filter(part => part.value.trim());
}
function renderSceneSection(scene, section, sectionIndex, act) {
  const heading = sectionPresentation(scene, section, sectionIndex);
  const directionSpeaker = libretto.stageDirectionSpeaker || "Stage direction";
  const rows = section.turns.flatMap(turn => {
    const speaker = turn.speaker;
    if (speaker === directionSpeaker) {
      const original = turn.original ?? turn.it ?? "";
      const translation = turn.translation ?? turn.en ?? "";
      return ['<div class="libretto-row libretto-row--stage-direction"><div class="libretto-cell libretto-cell--german"><p>' +
        formatLibrettoText(original, false) + '</p></div><div class="libretto-cell libretto-cell--english"><p>' +
        formatLibrettoText(translation, false) + '</p></div></div>'];
    }
    const originalParts = splitInlineDirections(turn.original ?? turn.it ?? "");
    const translatedParts = splitInlineDirections(turn.translation ?? turn.en ?? "");
    const count = Math.max(originalParts.length, translatedParts.length);
    const speakerTranslation = libretto.speakerTranslations?.[speaker] || speaker;
    const output = [];
    for (let index = 0; index < count; index++) {
      const originalPart = originalParts[index] || { type: "text", value: "" };
      const translatedPart = translatedParts[index] || { type: "text", value: "" };
      const isDirection = originalPart.type === "direction" || translatedPart.type === "direction";
      if (isDirection) {
        output.push('<div class="libretto-row libretto-row--stage-direction"><div class="libretto-cell libretto-cell--german"><p>' +
          formatLibrettoText(originalPart.value, false) + '</p></div><div class="libretto-cell libretto-cell--english"><p>' +
          formatLibrettoText(translatedPart.value, false) + '</p></div></div>');
      } else if (originalPart.value.trim() || translatedPart.value.trim()) {
        output.push('<div class="libretto-row"><div class="libretto-cell libretto-cell--german">' +
          '<span class="libretto-speaker libretto-speaker--' + speakerClass(speaker) + '">' + escapeHtml(speaker) + '</span><p>' +
          formatLibrettoText(originalPart.value) + '</p></div><div class="libretto-cell libretto-cell--english">' +
          '<span class="libretto-speaker libretto-speaker--' + speakerClass(speaker) + '">' + escapeHtml(speakerTranslation) + '</span><p>' +
          formatLibrettoText(translatedPart.value) + '</p></div></div>');
      }
    }
    return output;
  }).join('');
  const isSpotifyScene = Boolean(libretto.spotifyOutline);
  const selectedHeading = isSpotifyScene ? "" :
    '<div class="selected-section-heading"><h2>' + escapeHtml(heading.heading) + '</h2>' +
    (section.type === "Passage" && heading.subtitle ? '<p class="selected-section-heading__translation">' + escapeHtml(heading.subtitle) + '</p>' : "") +
    sectionParticipantCredits(section, act, scene.number) + '</div>';
  const sectionLabel = isSpotifyScene ? "" : '<div class="libretto-section__label">' +
    escapeHtml(sectionNavigationLabel(section, scene, sectionIndex)) + '</div>';
  return '<section class="libretto-scene-section" id="libretto-section-' + act + '-' + scene.number +
    '-' + sectionIndex + '" data-libretto-item="' + sectionIndex + '">' +
    selectedHeading + '<div class="libretto-columns"><div class="libretto-column-heading">' + escapeHtml(libretto.originalLanguage) + '</div>' +
    '<div class="libretto-column-heading">' + escapeHtml(libretto.translationLanguage) + '</div><div class="libretto-text">' +
    '<section class="libretto-section">' + sectionLabel + rows + '</section></div></div></section>';
}function conciseSceneSummary(scene) {
  const text = (scene.summary || "").trim();
  const sentences = (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).map(s => s.trim());
  return (text.split(/\s+/).length > 35 ? sentences.slice(0, 1) : sentences.slice(0, 2)).join(" ");
}

function renderScenePage(selectedNumber = 1, query = "", selectedItem = 0, mobileContents = false) {
  const requested=Number(new URLSearchParams(window.location.hash.split("?")[1]||"").get("act"))||1;
  const group=actCatalog().find(group=>group.number===requested)||actCatalog()[0];
  const act=group.number, scenes=group.scenes;
  const base = "#/operas/" + libretto.slug;
  const searchTerm = query.trim().toLocaleLowerCase();
  let found = null;
  if (searchTerm) {
    scenes.some((candidate) => candidate.sections.some((section, sectionIndex) => {
      const hasMatch = section.turns.some((turn) => (turn.speaker + " " + (turn.original ?? turn.it ?? "") + " " + (turn.translation ?? turn.en ?? "")).toLocaleLowerCase().includes(searchTerm));
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
  const previous = scene.number > 1 ? '<a class="mobile-scene-step" href="' + base + '?act=' + act + '&scene=' + (scene.number - 1) + '&item=0">‹ <span>Prev. scene</span></a>' : '<span class="mobile-scene-step is-disabled" aria-disabled="true">‹ <span>Prev. scene</span></span>';
  const next = scene.number < scenes.length ? '<a class="mobile-scene-step" href="' + base + '?act=' + act + '&scene=' + (scene.number + 1) + '&item=0"><span>Next scene</span> ›</a>' : '<span class="mobile-scene-step is-disabled" aria-disabled="true"><span>Next scene</span> ›</span>';
  const followingAct = actCatalog().find(group => group.number > act);
  const bottomNext = scene.number < scenes.length ? next : followingAct ?
    '<a class="mobile-scene-step" href="' + base + '?act=' + followingAct.number + '&scene=1&item=0">Continue to Act ' + romanNumeral(followingAct.number) + ' →</a>' :
    '<span class="mobile-scene-step is-disabled" aria-disabled="true">End of opera</span>';
  const bottomSceneNavigation = '<nav class="scene-bottom-nav" aria-label="Scene navigation at end of scene">' +
    '<p class="scene-bottom-nav__label">End of ' + sceneLabel + '</p>' +
    '<div class="scene-bottom-nav__controls">' + previous + bottomNext + '</div></nav>';
  const outlineButton = '<button type="button" class="back-to-scenes act-outline__trigger" data-outline-open aria-controls="act-outline" aria-haspopup="dialog" aria-expanded="false">☰ <span>Outline</span></button>';
  return '<div class="opera-reading-page" data-libretto-slug="' + libretto.slug + '" data-act="' + act + '" data-scene="' + scene.number + '" data-initial-item="' + itemIndex + '">' +
    renderOperaBar(act) +
    '<section class="mobile-opera-intro"><div class="mobile-opera-intro__art"' +
      (libretto.mobileArtworkUrl ? ' style="--mobile-opera-art: url(&quot;' + escapeHtml(libretto.mobileArtworkUrl) + '&quot;)"' : '') +
      ' role="img" aria-label="' + escapeHtml(libretto.mobileArtworkLabel || libretto.opera.title) + '"></div><div class="mobile-opera-intro__title"><h1>' + escapeHtml(libretto.opera.title) + '</h1><p>' + escapeHtml(libretto.mobileComposer || libretto.opera.composer) + '</p></div></section>' +
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
          '<h1 class="scene-context">' + escapeHtml(group.originalHeading || actLabel).toUpperCase() +
          ' · ' + actLabel.toUpperCase() + ' <span>/</span> ' +
          escapeHtml((libretto.sceneOriginalPrefix || "Scene") + " " +
            (libretto.sceneOrdinals?.[scene.number - 1] || romanNumeral(scene.number))).toUpperCase() +
          ' · ' + sceneLabel.toUpperCase() + '</h1>' +
          '<p class="scene-summary">' + escapeHtml(conciseSceneSummary(scene)) + '</p>' +
        '</div>' +
        (searchTerm ? '<p class="libretto-search-result" role="status">' + (found ? 'Showing the first passage containing “' + safeQuery + '”.' : 'No passage in this act contains “' + safeQuery + '”. Showing Scene ' + scene.number + '.') + '</p>' : '') +
        scene.sections.map((part, index) => renderSceneSection(scene, part, index, act)).join("") +
        bottomSceneNavigation +
      '</section></div>' +
    '</div>' +
    '<button class="libretto-back-to-top" type="button" data-reader-top hidden aria-label="Back to scene navigation" title="Back to scene navigation"><span aria-hidden="true">↑</span><span aria-hidden="true">Top</span></button>' +
  '</div>';
}

return { scene: renderScenePage, outline: renderOutlinePage, synopsis: renderSynopsisPage, navigation: () => renderOperaBar(1, "synopsis") };
}

export { createLibrettoRenderer };
