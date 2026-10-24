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
  assert.equal(album.spotlightArtist, "Peter Hofmann");
  assert.equal(album.conductor, "Leonard Bernstein");
  assert.equal(album.orchestra, "Bavarian Radio Symphony Orchestra");
  assert.equal(album.recordingYear, "1981");
  assert.equal(album.spotifyEditionVerified, false);
  assert.equal(album.youtubeUrl, "https://www.youtube.com/watch?v=Wleg_0SWHW0");
  assert.deepEqual(album.featuredArtists.map(artist => artist.name), ["Peter Hofmann", "Hildegard Behrens"]);
  assert.deepEqual(album.featuredArtists.map(artist => artist.role), ["Tristan", "Isolde"]);
  assert.equal(album.cast.length, 9);
  const page = renderOperaInformationPage(getOpera(slug), details);
  assert.equal((page.match(/class="favorite-performance"/g) || []).length, 1);
  assert.ok(page.includes("My Favorite Performances"));
  assert.ok(page.indexOf('class="opera-info__content') < page.indexOf('class="opera-info__favorites'));
  assert.ok(page.includes('data-spotify-cover="' + url + '"'));
  assert.ok(!page.includes("i.ytimg.com"));
  assert.ok(page.includes('class="favorite-performance__spotlight">· Peter Hofmann</span>'));
  assert.equal((page.match(/class="favorite-performance__lead"/g) || []).length, 2);
  assert.ok(page.includes("Peter Hofmann</strong> as Tristan"));
  assert.ok(page.includes("Hildegard Behrens</strong> as Isolde"));
  assert.ok(!page.includes("favorite-performance__artist\""));
  assert.ok(page.includes("1981 · Live, semi-staged concert"));
  assert.ok(page.includes("Conductor: Leonard Bernstein · Orchestra: Bavarian Radio Symphony Orchestra"));
  assert.ok(page.includes("Chorus: Bavarian Radio Chorus · Location: Herkulessaal, Munich"));
  assert.ok(page.includes('href="' + url + '" target="_blank" rel="noopener noreferrer"'));
  assert.ok(page.includes('href="https://www.youtube.com/watch?v=Wleg_0SWHW0"'));
  assert.ok(page.includes("Spotify</span></a>"));
  assert.ok(page.includes("YouTube</span></a>"));
  assert.ok(page.includes("The linked Spotify album has not been independently matched"));
  for (const person of ["Peter Hofmann", "Hildegard Behrens", "Yvonne Minton", "Bernd Weikl", "Hans Sotin"]) assert.ok(page.includes(person));
  assert.ok(page.includes("<summary>Full cast &amp; recording details</summary>"));
  assert.ok(page.includes("Full cast &amp; recording details"));
  for (const [otherSlug, data] of Object.entries(operaInformation)) {
    if (otherSlug === slug) continue;
    assert.equal(data.favoritePerformances, undefined, otherSlug);
    assert.ok(!renderOperaInformationPage(getOpera(otherSlug), data).includes("favorite-performance"),
      otherSlug + " should not render the playlist feature");
  }
});

test("Tristan retains its separate and unchanged full-outline Albums reference", () => {
  const libretto = getLibretto(slug);
  globalThis.window = { location: { hash: "#/operas/tristan-und-isolde?view=outline" } };
  const outline = createLibrettoRenderer(libretto).outline();
  assert.ok(outline.includes('<strong>Albums:</strong>'));
  assert.ok(outline.includes('href="' + url + '"'));
  assert.ok(!outline.includes('class="favorite-performance"'));
});
