import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const html = readFileSync(new URL("index.html", root), "utf8");
const bootstrap = readFileSync(new URL("src/boot.js", root), "utf8");

test("the website enters through its recovery bootstrap exactly once", () => {
  const scripts = [...html.matchAll(/<script\\b[^>]*\\bsrc="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(scripts, ["./src/boot.js?v=startup-recovery-20261023"]);
  assert.ok(!html.includes('src="./src/main.js'), "do not load main directly alongside boot");
  assert.match(bootstrap, /import\\("\\.\\/main\\.js\\?v=startup-recovery-20261023"\\)\\.catch\\(/);
});

function simulateStartup(loadMain) {
  // Replace only the dynamic import call to simulate a browser import result.
  // The rest is the actual shipped bootstrap, including its recovery handler.
  const importCall = /import\\("\\.\\/main\\.js\\?v=startup-recovery-20261023"\\)/;
  assert.match(bootstrap, importCall);
  const source = bootstrap.replace(importCall, "loadMain()");
  const listeners = new Map();
  const logs = [];
  const app = {
    innerHTML: "",
    querySelector(selector) {
      assert.equal(selector, "[data-retry-load]");
      return { addEventListener(type, callback) { listeners.set(type, callback); } };
    }
  };
  let reloads = 0;
  const promise = vm.runInNewContext(source, {
    loadMain,
    console: { error(...args) { logs.push(args); } },
    document: {
      querySelector(selector) {
        assert.equal(selector, "#app");
        return app;
      }
    },
    window: { location: { reload() { reloads++; } } }
  });
  return { promise, app, listeners, logs, reloadCount: () => reloads };
}

test("a successful import leaves the application to render normally", async () => {
  const simulated = simulateStartup(() => Promise.resolve());
  await simulated.promise;
  assert.equal(simulated.app.innerHTML, "");
  assert.equal(simulated.listeners.size, 0);
  assert.equal(simulated.logs.length, 0);
});

test("a failed import renders an accessible recovery message and working reload", async () => {
  const failure = new Error("Simulated dependency import failure");
  const simulated = simulateStartup(() => Promise.reject(failure));
  await simulated.promise;
  assert.match(simulated.app.innerHTML, /<main id="main"/);
  assert.match(simulated.app.innerHTML, /The website could not load/);
  assert.match(simulated.app.innerHTML, /Please reload the page/);
  assert.match(simulated.app.innerHTML, /data-retry-load/);
  assert.strictEqual(simulated.logs[0][1], failure, "log original import error");
  assert.equal(typeof simulated.listeners.get("click"), "function");
  simulated.listeners.get("click")();
  assert.equal(simulated.reloadCount(), 1);
});
