import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

// Inspect built HTML: social crawlers must not need React to read these tags.
const html = readFileSync("dist/index.html", "utf8");
const origin = "https://anupamas02.github.io";
function meta(attribute, key) {
  const matches = [...html.matchAll(new RegExp(`<meta ${attribute}="${key}" content="([^"]+)"`, "g"))];
  assert.equal(matches.length, 1, `Expected exactly one ${key}`);
  return matches[0][1];
}
assert.match(html, /<html lang="en">/);
assert.match(html, /<title>Anupam Singh \| Cybersecurity Portfolio<\/title>/);
assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
assert.ok(html.includes(`rel="canonical" href="${origin}/"`));
assert.match(meta("name", "description"), /Anupam Singh/);
assert.equal(meta("property", "og:type"), "website");
assert.equal(meta("property", "og:site_name"), "Anupam Singh");
assert.equal(meta("property", "og:url"), `${origin}/`);
assert.equal(meta("name", "twitter:card"), "summary_large_image");
for (const key of ["title", "description", "image", "image:alt"]) {
  assert.equal(meta("property", `og:${key}`), meta("name", `twitter:${key}`));
}
assert.equal(meta("property", "og:image"), `${origin}/social-preview.png`);
assert.equal(meta("property", "og:image:type"), "image/png");
assert.equal(meta("property", "og:image:width"), "1200");
assert.equal(meta("property", "og:image:height"), "630");
assert.ok(!html.includes('name="twitter:site"') && !html.includes('name="twitter:creator"'), "No unverified social handles");
assert.ok(existsSync("dist/logo.svg"));
const png = readFileSync("dist/social-preview.png");
assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
console.log("Built metadata, canonical URL, favicon and 1200×630 PNG checks passed.");
