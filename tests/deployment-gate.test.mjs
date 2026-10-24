import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const pipeline = readFileSync(new URL(".github/workflows/verify-update.yml", root), "utf8");
const mainPipeline = readFileSync(new URL(".github/workflows/pages.yml", root), "utf8");

test("Update preview deployment depends on successful regression tests", () => {
  assert.match(pipeline, /branches: \[Update\]/);
  assert.match(pipeline, /\n  test:\n/);
  const tests = pipeline.split("\n  test:\n")[1].split("\n  deploy:\n")[0];
  assert.match(tests, /node-version: '22'/);
  assert.match(tests, /run: npm test/);

  assert.match(pipeline, /\n  deploy:\n/);
  const deploy = pipeline.split("\n  deploy:\n")[1];
  assert.match(deploy, /^    needs: test$/m);
  assert.match(deploy, /if: github\.ref == 'refs\/heads\/Update'/);
  assert.match(deploy, /uses: actions\/upload-pages-artifact@v3/);
  assert.match(deploy, /uses: actions\/deploy-pages@v4/);
  assert.match(deploy, /pages: write/);
  assert.match(deploy, /id-token: write/);

  // The other maintained deploy workflow is for main, not Update.
  assert.match(mainPipeline, /branches: \[main\]/);
  assert.doesNotMatch(mainPipeline, /branches: \[Update\]/);
});

test("newer Update pushes supersede older pending preview deployments", () => {
  assert.match(pipeline, /concurrency:\n  group: pages-update\n  cancel-in-progress: true/);
});
