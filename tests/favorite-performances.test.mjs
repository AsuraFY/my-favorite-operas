import test from "node:test";
import assert from "node:assert/strict";
import { operaInformation } from "../src/data/opera-information.js";
import { getOpera } from "../src/data/operas.js";
import { getLibretto } from "../src/data/libretto-registry.js";
import { createLibrettoRenderer } from "../src/libretto-reader.js";
import { renderOperaInformationPage } from "../src/opera-info-page.js";

const slug = "tristan-und-isolde";
const url = "https://open.spotify.com/album/0EGfzKnX0HmZNYNRCZJC5E";

test("one compact performance row appears on Tristan's Synopsis, and nowhere else", () => {
  const details = operaInformation[slug];
  assert.equal(details.favoritePerformances.length, 1);
  const album = details.favoritePerformances[0];
  assert.equal(album.spotifyUrl, url);
  assert.equal(album.title, "Tristan und Isolde");
  assert.equal(album.spotlightArtist, "Leonard Bernstein");
  assert.equal(album.conductor, "Leonard Bernstein");
  assert.equal(album.orchestra, "Bavarian Radio Symphony Orchestra");
  assert.equal(album.recordingYear, "1981");
  assert.equal(album.spotifyEditionVerified, true);
  assert.equal(album.outlineReference, true);
  assert.equal(album.coverImage, "https://i.scdn.co/image/ab67616d0000b2730d05706fe7f204d1e2b9659b");
  assert.equal(album.youtubeUrl, "https://www.youtube.com/watch?v=Wleg_0SWHW0");
  assert.deepEqual(album.featuredArtists.map(artist => artist.name), ["Peter Hofmann", "Hildegard Behrens"]);
  assert.deepEqual(album.featuredArtists.map(artist => artist.role), ["Tristan", "Isolde"]);
  assert.equal(album.cast.length, 9);
  const page = renderOperaInformationPage(getOpera(slug), details);
  assert.equal((page.match(/class="favorite-performance"/g) || []).length, 1);
  assert.ok(page.includes("My Favorite Performances"));
  assert.ok(page.indexOf('class="opera-info__content') < page.indexOf('class="opera-info__favorites'));
  assert.ok(page.includes('src="' + album.coverImage + '"'));
  assert.ok(!page.includes('data-spotify-cover="'));
  assert.ok(!page.includes("i.ytimg.com"));
  assert.ok(page.includes('<h3 class="favorite-performance__title">Tristan und Isolde · Leonard Bernstein</h3>'));
  assert.ok(page.includes('<span class="favorite-performance__reference">Libretto outline reference</span>'));
  assert.equal((page.match(/class="favorite-performance__reference"/g) || []).length, 1);
  assert.ok(page.includes("1981 · Live, semi-staged concert · Herkulessaal, Munich"));
  assert.ok(!page.includes("Location: Herkulessaal"));
  assert.equal((page.match(/class="favorite-performance__details"/g) || []).length, 1);
  assert.ok(page.includes("<summary>") && page.includes("Cast &amp; Musical Direction"));
  assert.ok(!page.includes("<details open"));
  assert.equal((page.match(/class="favorite-performance__direction"/g) || []).length, 1);
  assert.ok(page.includes("<dt>Conductor</dt><dd>Leonard Bernstein</dd>"));
  assert.ok(page.includes("<dt>Orchestra</dt><dd>Bavarian Radio Symphony Orchestra</dd>"));
  assert.ok(page.includes("<dt>Chorus</dt><dd>Bavarian Radio Chorus</dd>"));
  assert.equal((page.match(/class="favorite-performance__cast-bullet"/g) || []).length, 9);
  for (const person of album.cast) assert.ok(page.includes('<strong>' + person.name + '</strong> as ' + person.role));
  assert.ok(!page.includes('class="favorite-performance__lead"'));
  assert.ok(page.indexOf("favorite-performance__details") < page.indexOf("favorite-performance__links"));
  assert.ok(page.indexOf("favorite-performance__edition") < page.indexOf("favorite-performance__details"));
  assert.ok(page.includes('href="' + url + '" target="_blank" rel="noopener noreferrer"'));
  assert.ok(page.includes('href="https://www.youtube.com/watch?v=Wleg_0SWHW0"'));
  assert.ok(page.includes("Spotify</span></a>"));
  assert.ok(page.includes("YouTube</span></a>"));
  assert.ok(!page.includes("The linked Spotify album has not been independently matched"));
  for (const person of ["Peter Hofmann", "Hildegard Behrens", "Yvonne Minton", "Bernd Weikl", "Hans Sotin"]) assert.ok(page.includes(person));
  assert.ok(!page.includes("Full cast &amp; recording details"));
  assert.equal((page.match(/<details\b/g) || []).length, 1);
  for (const [otherSlug, data] of Object.entries(operaInformation)) {
    if (otherSlug === slug) continue;
    assert.equal(data.favoritePerformances, undefined, otherSlug);
    assert.ok(!renderOperaInformationPage(getOpera(otherSlug), data).includes("favorite-performance"),
      otherSlug + " should not render the playlist feature");
  }
});

test("Tristan keeps source metadata but displays its outline reference only with favorites", () => {
  const libretto = getLibretto(slug);
  assert.deepEqual(libretto.albums, [{ name: "Wagner: Tristan und Isolde", url }]);
  globalThis.window = { location: { hash: "#/operas/tristan-und-isolde?view=outline" } };
  const outline = createLibrettoRenderer(libretto).outline();
  assert.ok(!outline.includes('<strong>Albums:</strong>'));
  assert.ok(!outline.includes('<strong>Outline source:</strong>'));
  assert.ok(!outline.includes('href="' + url + '"'));
  assert.ok(!outline.includes('class="favorite-performance"'));
});

test("an outline-reference favorite renders first and is tagged exactly once", () => {
  const reference = operaInformation[slug].favoritePerformances[0];
  const another = {
    title: "Another approved performance",
    spotifyUrl: "https://open.spotify.com/album/EXAMPLEONLY2026",
    cast: []
  };
  const page = renderOperaInformationPage(getOpera(slug), {
    ...operaInformation[slug],
    favoritePerformances: [another, reference]
  });
  assert.equal((page.match(/class="favorite-performance"/g) || []).length, 2);
  const referenceTitle = page.indexOf('<h3 class="favorite-performance__title">Tristan und Isolde · Leonard Bernstein</h3>');
  const otherTitle = page.indexOf('<h3 class="favorite-performance__title">Another approved performance</h3>');
  assert.ok(referenceTitle > -1 && otherTitle > referenceTitle);
  assert.equal((page.match(/class="favorite-performance__reference"/g) || []).length, 1);
  const secondCard = page.slice(otherTitle);
  assert.ok(!secondCard.includes("Libretto outline reference"));
});
