import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = new URL("../", import.meta.url);
function scripts(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = new URL(entry.name + (entry.isDirectory() ? "/" : ""), directory);
    return entry.isDirectory() ? scripts(path) : entry.name.endsWith(".js") ? [path] : [];
  });
}

test("every shipped JavaScript module parses and contains no tool-output truncation", () => {
  for (const path of scripts(new URL("src/", root))) {
    const result = spawnSync(process.execPath, ["--check", fileURLToPath(path)], { encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
    assert.doesNotMatch(readFileSync(path, "utf8"), /Warning: truncated output|Total output lines:|\d+ tokens truncated/, path.pathname);
  }
});

test("the HTML entry point references existing local assets", () => {
  const html = readFileSync(new URL("index.html", root), "utf8");
  for (const [, asset] of html.matchAll(/(?:src|href)="(\.\/[^"?]+)(?:\?[^" ]*)?"/g)) {
    assert.ok(existsSync(new URL(asset, root)), `Missing entry asset: ${asset}`);
  }
});
