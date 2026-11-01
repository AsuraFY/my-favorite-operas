// Browser smoke review of the static site, including real responsive layout geometry.
// CI installs playwright-core and uses the Chrome browser shipped on ubuntu-latest.
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { createReadStream, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { chromium } from "playwright-core";

const root = fileURLToPath(new URL("../", import.meta.url));
const screenshotDir = join(root, "test-output/visual");
mkdirSync(screenshotDir, { recursive: true });
const extensionTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg"
};
const prefix = "/my-favorite-operas/";
const server = createServer((req, res) => {
  const path = new URL(req.url, "http://127.0.0.1").pathname;
  if (!path.startsWith(prefix)) {
    res.writeHead(404).end("Invalid project base path");
    return;
  }
  let target;
  try {
    const remainder = decodeURIComponent(path.slice(prefix.length));
    target = resolve(root, remainder || "index.html");
    const rel = relative(root, target);
    if (rel === ".." || rel.startsWith(".." + sep) || rel.startsWith(sep)) {
      res.writeHead(403).end("Invalid path");
      return;
    }
    if (!existsSync(target) || !statSync(target).isFile()) {
      res.writeHead(404).end("Missing file");
      return;
    }
  } catch {
    res.writeHead(400).end("Bad path");
    return;
  }
  res.writeHead(200, {
    "Content-Type": extensionTypes[extname(target)] || "application/octet-stream",
    "Cache-Control": "no-store"
  });
  createReadStream(target).pipe(res);
});

function chromeExecutable() {
  if (process.env.CHROME_BIN) return process.env.CHROME_BIN;
  for (const candidate of ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]) {
    const found = spawnSync("which", [candidate], { encoding: "utf8" });
    if (found.status === 0) return found.stdout.trim();
  }
  throw new Error("Chrome is not installed in this test environment");
}

const slugs = [
  "cosi-fan-tutte", "il-barbiere-di-siviglia", "tristan-und-isolde",
  "macbeth", "turandot", "le-nozze-di-figaro", "carmen", "la-boheme",
  "madama-butterfly", "tosca", "samson-et-dalila", "the-magic-flute"
];
const capture = new Set([
  "cosi-fan-tutte", "tristan-und-isolde", "la-boheme", "samson-et-dalila"
]);
const viewports = [
  { label: "desktop", width: 1440, height: 900 },
  { label: "mobile", width: 390, height: 844 }
];

let browser;
let checks = 0;
const results = [];
const errors = [];
function check(condition, message) {
  assert.ok(condition, message);
  checks++;
}
async function state(page) {
  return page.evaluate(() => {
    const reader = document.querySelector(".opera-reading-page");
    const row = [...document.querySelectorAll(".libretto-row:not(.libretto-row--stage-direction)")]
      .find(item => item.querySelectorAll(".libretto-cell p").length === 2);
    const [original, translation] = row ? row.querySelectorAll(".libretto-cell") : [];
    const rect = element => {
      if (!element) return null;
      const box = element.getBoundingClientRect();
      return { top: box.top, bottom: box.bottom, left: box.left, right: box.right, width: box.width };
    };
    return {
      reader: Boolean(reader),
      loading: Boolean(document.querySelector("[data-retry-libretto], .not-found h1")),
      rows: document.querySelectorAll(".libretto-row").length,
      columns: document.querySelectorAll(".libretto-column-heading").length,
      horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
      original: rect(original),
      translation: rect(translation),
      originalText: original?.querySelector("p")?.textContent.trim() || "",
      translationText: translation?.querySelector("p")?.textContent.trim() || ""
    };
  });
}
async function visit(page, base, slug) {
  await page.goto(base + "#/operas/" + slug + "?act=1", { waitUntil: "domcontentloaded" });
  await page.locator(".opera-reading-page .libretto-row").first().waitFor({
    state: "attached", timeout: 20000
  });
}
async function screenshot(page, label) {
  await page.screenshot({ path: join(screenshotDir, label + ".png"), animations: "disabled" });
}

try {
  await new Promise((resolveListen, rejectListen) => {
    server.once("error", rejectListen);
    server.listen(0, "127.0.0.1", resolveListen);
  });
  const base = "http://127.0.0.1:" + server.address().port + prefix;
  browser = await chromium.launch({
    executablePath: chromeExecutable(),
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"]
  });

  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: "reduce"
    });
    for (const slug of slugs) {
      const page = await context.newPage();
      const scriptErrors = [];
      page.on("pageerror", error => scriptErrors.push(error.message));
      try {
        await visit(page, base, slug);
        const data = await state(page);
        check(data.reader && !data.loading,
          viewport.label + " " + slug + ": the reader did not render");
        check(data.rows > 0 && data.columns >= 2,
          viewport.label + " " + slug + ": bilingual content missing");
        check(data.originalText && data.translationText,
          viewport.label + " " + slug + ": first lyric pair is incomplete");
        check(data.horizontalOverflow <= 3,
          viewport.label + " " + slug + ": document overflows viewport by " +
          data.horizontalOverflow + " px");
        check(scriptErrors.length === 0,
          viewport.label + " " + slug + ": script errors: " + scriptErrors.join(" | "));
        if (viewport.label === "desktop") {
          check(data.original.right <= data.translation.left + 4,
            slug + ": desktop bilingual columns overlap");
          check(Math.abs(data.original.top - data.translation.top) <= 4,
            slug + ": desktop bilingual rows are vertically misaligned");
        } else {
          check(data.translation.top >= data.original.bottom - 6,
            slug + ": mobile translation should be stacked below original");
        }
        if (capture.has(slug)) await screenshot(page, slug + "-" + viewport.label);
        results.push({ viewport: viewport.label, slug, rows: data.rows,
          overflow: data.horizontalOverflow, status: "passed" });
      } catch (error) {
        errors.push(viewport.label + " " + slug + ": " + error.message);
        await screenshot(page, slug + "-" + viewport.label + "-FAILED").catch(() => {});
      } finally {
        await page.close();
      }
    }

    // The first favorite performance is intentionally scoped to Tristan's Synopsis.
    const favoritesPage = await context.newPage();
    try {
      await favoritesPage.goto(base + "#/operas/tristan-und-isolde?view=synopsis",
        { waitUntil: "domcontentloaded" });
      await favoritesPage.locator(".favorite-performance").first().waitFor({ timeout: 20000 });
      check(await favoritesPage.locator(".favorite-performance").count() === 1,
        viewport.label + ": Tristan should show one favorite recording");
      check(await favoritesPage.locator(".favorite-performance__links a").count() === 2,
        viewport.label + ": expected verified YouTube and separate Spotify links");
      check(await favoritesPage.locator(".favorite-performance__links a").first().getAttribute("href") ===
        "https://open.spotify.com/album/0EGfzKnX0HmZNYNRCZJC5E",
        viewport.label + ": Spotify album reference changed");
      check(await favoritesPage.locator(".favorite-performance__links a").last().getAttribute("href") ===
        "https://www.youtube.com/watch?v=Wleg_0SWHW0",
        viewport.label + ": incorrect performance video");
      check(await favoritesPage.locator(".favorite-performance__title").innerText() ===
        "Tristan und Isolde · Leonard Bernstein",
        viewport.label + ": the title should feature Bernstein without a separate highlighted name");
      check(await favoritesPage.locator(".favorite-performance__reference").innerText() ===
        "Libretto outline reference",
        viewport.label + ": the outline-reference favorite must carry its label");
      check(await favoritesPage.locator(".favorite-performance__reference").count() === 1,
        viewport.label + ": only one outline-reference label should appear");
      check(await favoritesPage.locator(".favorite-performance--outline-reference").count() === 1,
        viewport.label + ": reference marker should be attached only to its recording");
      const badgePlacement = await favoritesPage.locator(".favorite-performance").evaluate(card => {
        const links = card.querySelector(".favorite-performance__links");
        const badge = card.querySelector(".favorite-performance__reference").getBoundingClientRect();
        const footer = links.getBoundingClientRect();
        const title = card.querySelector(".favorite-performance__title").getBoundingClientRect();
        const cover = card.querySelector(".favorite-performance__cover").getBoundingClientRect();
        const youtube = links.querySelectorAll("a")[1].getBoundingClientRect();
        return {
          inFooter: card.querySelector(".favorite-performance__reference").parentElement === links &&
            badge.left >= footer.left && badge.right <= footer.right &&
            badge.top >= footer.top && badge.bottom <= footer.bottom,
          farRight: footer.right - badge.right,
          noOverlap: badge.top >= youtube.bottom - 1 || badge.left >= youtube.right + 4,
          unchangedTitleAlignment: Math.abs(title.top - cover.top) <= 4,
          style: getComputedStyle(card.querySelector(".favorite-performance__reference")).backgroundColor
        };
      });
      check(badgePlacement.inFooter && badgePlacement.farRight >= 6 && badgePlacement.farRight <= 19,
        viewport.label + ": outline reference should be at far right of Spotify/YouTube footer");
      check(badgePlacement.noOverlap,
        viewport.label + ": outline reference label overlaps listening links");
      check(badgePlacement.unchangedTitleAlignment,
        viewport.label + ": label introduced empty space above the opera title");
      check(badgePlacement.style !== "rgba(0, 0, 0, 0)",
        viewport.label + ": outline reference label needs a subtle gray background");
      check(await favoritesPage.locator(".favorite-performance__edition").innerText() ===
        "1981 · Live, semi-staged concert · Herkulessaal, Munich",
        viewport.label + ": venue must join the year and performance type");
      check(await favoritesPage.locator(".favorite-performance__lead").count() === 0,
        viewport.label + ": obsolete featured-performer bullet cards remain");
      check(await favoritesPage.locator(".favorite-performance__details").count() === 1,
        viewport.label + ": expected a single integrated personnel disclosure");
      check(await favoritesPage.locator(".favorite-performance__summary-label").innerText() ===
        "Cast & Musical Direction",
        viewport.label + ": incorrect disclosure label");
      check(await favoritesPage.locator(".favorite-performance__cover img").getAttribute("src") ===
        "https://i.scdn.co/image/ab67616d0000b2730d05706fe7f204d1e2b9659b",
        viewport.label + ": favorite photo must match the selected Spotify album");
      check(await favoritesPage.evaluate(() =>
        document.documentElement.scrollWidth - window.innerWidth <= 3),
        viewport.label + ": the compact favorite row overflows the screen");
      const details = favoritesPage.locator(".favorite-performance__details");
      check(!(await details.evaluate(el => el.open)),
        viewport.label + ": Cast & Musical Direction should be closed on first load");
      check(!(await favoritesPage.locator(".favorite-performance__direction").isVisible()),
        viewport.label + ": conductor/orchestra/chorus should start collapsed");
      check(await favoritesPage.locator(".favorite-performance__links a").first().isVisible(),
        viewport.label + ": Spotify must stay visible with the cast collapsed");
      check(await favoritesPage.locator(".favorite-performance__links a").last().isVisible(),
        viewport.label + ": YouTube must stay visible with the cast collapsed");
      await favoritesPage.screenshot({
        path: join(screenshotDir, "tristan-favorite-collapsed-" + viewport.label + ".png"),
        animations: "disabled"
      });
      await details.locator("summary").click();
      check(await details.evaluate(el => el.open),
        viewport.label + ": Cast & Musical Direction did not expand");
      check(await favoritesPage.locator(".favorite-performance__direction dt").allInnerTexts().then(
        labels => JSON.stringify(labels) === JSON.stringify(["Conductor", "Orchestra", "Chorus"])
      ), viewport.label + ": personnel groups are missing or not in the approved order");
      check(await favoritesPage.locator(".favorite-performance__direction").isVisible(),
        viewport.label + ": musician details did not become visible");
      check(await favoritesPage.locator(".favorite-performance__cast li").count() === 9,
        viewport.label + ": all nine character performers must be present");
      const castColumns = await favoritesPage.locator(".favorite-performance__cast").evaluate(
        el => getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length
      );
      check(castColumns === (viewport.label === "mobile" ? 1 : 2),
        viewport.label + ": expected one cast column on mobile and two on desktop; got " + castColumns);
      await favoritesPage.screenshot({
        path: join(screenshotDir, "tristan-favorite-expanded-" + viewport.label + ".png"),
        animations: "disabled"
      });
      await details.locator("summary").click();
      check(!(await details.evaluate(el => el.open)),
        viewport.label + ": Cast & Musical Direction did not collapse again");
      check(await favoritesPage.locator(".favorite-performance__links a").first().isVisible(),
        viewport.label + ": links must remain visible after closing the cast");
      await favoritesPage.goto(base + "#/operas/tristan-und-isolde?view=outline",
        { waitUntil: "domcontentloaded" });
      await favoritesPage.locator(".opera-outline").waitFor({ timeout: 20000 });
      check(await favoritesPage.locator(".opera-outline__recording").count() === 0,
        viewport.label + ": outline should no longer repeat album/reference footers");
      check(!(await favoritesPage.locator(".opera-outline").innerText()).includes("Albums:"),
        viewport.label + ": legacy Albums text remains");
      await favoritesPage.goto(base + "#/operas/cosi-fan-tutte?view=synopsis",
        { waitUntil: "domcontentloaded" });
      await favoritesPage.locator(".opera-info__synopsis").waitFor({ timeout: 20000 });
      check(await favoritesPage.locator(".favorite-performance").count() === 0,
        viewport.label + ": favorites must not appear on other opera pages");
    } catch (error) {
      errors.push(viewport.label + " Tristan favorite: " + error.message);
    } finally {
      await favoritesPage.close();
    }

    const page = await context.newPage();
    try {
      await visit(page, base, "la-boheme");
      const settings = page.locator("[data-settings-toggle]:visible").first();
      await settings.click();
      await page.locator('[data-theme-choice="night"]').click();
      check(await page.evaluate(() => document.documentElement.dataset.theme) === "night",
        viewport.label + ": night theme did not apply");
      const panel = page.locator("[data-settings-panel]");
      check(await panel.isVisible(), viewport.label + ": settings panel is not visible");
      const sizeBefore = Number(await page.locator("[data-font-size-value]").textContent());
      await page.locator('[data-font-size-step="1"]').click();
      const sizeAfter = Number(await page.locator("[data-font-size-value]").textContent());
      check(sizeAfter === sizeBefore + 1, viewport.label + ": font size control failed");
      const spacingBefore = await page.locator("[data-line-spacing-value]").textContent();
      await page.locator('[data-line-spacing-step="1"]').click();
      check((await page.locator("[data-line-spacing-value]").textContent()) !== spacingBefore,
        viewport.label + ": reading row spacing control failed");
      await screenshot(page, "la-boheme-" + viewport.label + "-night");
      if (viewport.label === "mobile") {
        await page.locator('[data-settings-toggle]:visible').first().click();
        await page.locator("[data-outline-open]").click();
        check(await page.locator("[data-act-outline]").isVisible(),
          "Mobile act outline did not open");
        check(await page.locator("body").evaluate(el => el.classList.contains("act-outline-open")),
          "Mobile outline did not lock page scroll");
        await screenshot(page, "la-boheme-mobile-outline");
        await page.locator("[data-outline-close]").click();
        check(!(await page.locator("body").evaluate(el => el.classList.contains("act-outline-open"))),
          "Mobile outline did not close");
      }
    } catch (error) {
      errors.push(viewport.label + " settings/outline: " + error.message);
      await screenshot(page, "settings-" + viewport.label + "-FAILED").catch(() => {});
    } finally {
      await page.close();
    }
    await context.close();
  }
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    try {
      await page.goto(base + "#/operas/la-boheme?view=outline",
        { waitUntil: "domcontentloaded" });
      await page.locator(".opera-outline__section-translation").first().waitFor({
        state: "attached", timeout: 20000
      });
      const data = await page.evaluate(() => {
        const translations = [...document.querySelectorAll(".opera-outline__section-translation")];
        return {
          count: translations.length,
          empty: translations.filter(x => !x.textContent.trim()).length,
          overflow: document.documentElement.scrollWidth - window.innerWidth
        };
      });
      check(data.count >= 26 && data.empty === 0, "Bohème English outline second lines missing");
      check(data.overflow <= 3, "Full outline overflows desktop viewport");
      await screenshot(page, "la-boheme-full-outline-desktop");
    } catch (error) {
      errors.push("Full outline: " + error.message);
    } finally {
      await page.close();
      await context.close();
    }
  }
} finally {
  if (browser) await browser.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
console.log("Browser review:", checks, "assertions across", results.length, "rendered opera/viewport combinations");
for (const result of results) console.log(JSON.stringify(result));
for (const error of errors) console.error("VISUAL SMOKE FAILURE:", error);
if (errors.length) process.exitCode = 1;
