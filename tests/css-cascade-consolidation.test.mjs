import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

// An old rule can remain when it supplies other properties, but within the
// same selector and media context each property must have one declaration.
// This protects the editorial, reader, settings and responsive CSS from
// accumulating invisible overrides again.
function readDeclarations(source) {
  const stack = [];
  const declarations = [];
  let start = 0;
  for (let i = 0; i < source.length; i++) {
    if (source[i] === "{") {
      const selector = source.slice(start, i).replace(/\/\*[\s\S]*?\*\//g, "").trim().replace(/\s+/g, " ");
      const context = stack.filter(s => s.selector.startsWith("@")).map(s => s.selector).join(" > ");
      stack.push({ selector, context, open: i });
      start = i + 1;
    } else if (source[i] === "}") {
      const rule = stack.pop();
      assert.ok(rule, "CSS closing braces are balanced");
      const body = source.slice(rule.open + 1, i);
      if (!rule.selector.startsWith("@") && !body.includes("{")) {
        for (const item of body.matchAll(/([-\w]+)\s*:\s*([^;{}]+);/g)) {
          declarations.push({
            selector: rule.selector, context: rule.context,
            property: item[1], value: item[2].trim()
          });
        }
      }
      start = i + 1;
    }
  }
  assert.equal(stack.length, 0, "CSS opening braces are balanced");
  return declarations;
}

test("reader, settings and mobile rules have no repeated properties in identical contexts", () => {
  const focus = /reading|libretto|scene|font-size|line-spacing|settings|night|mobile/;
  const seen = new Set();
  let checked = 0;
  for (const {selector, context, property} of readDeclarations(css)) {
    if (!focus.test(selector)) continue;
    checked++;
    const key = [context, selector, property].join("|");
    assert.ok(!seen.has(key), "Redundant CSS override: " + key);
    seen.add(key);
  }
  assert.ok(checked > 250, "Reader, settings, and responsive styles are covered");
});

test("the latest libretto gap and night-mode rules remain intact", () => {
  assert.match(css, /--libretto-paragraph-gap:\s*calc\(10px \+ var\(--libretto-row-gap, 8px\)\)/);
  assert.match(css, /margin-top: var\(--libretto-paragraph-gap\);/);
  assert.match(css, /html\[data-theme="night"\] \.line-spacing-controls output/);
  assert.match(css, /html\[data-theme="night"\] \.font-size-controls output/);
  assert.match(css, /--night-border:\s*#424a51/);
});
