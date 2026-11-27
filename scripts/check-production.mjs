import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const html = readFileSync("dist/index.html", "utf8");
assert(!html.includes("/src/"), "Pages must serve built HTML, not TSX source");
const entries = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map((match) => match[1]);
assert(entries.length > 0, "Missing compiled application entry");
for (const url of entries) {
  assert(/^\/assets\/[^/]+\.js$/.test(url), `Unexpected entry: ${url}`);
  assert(existsSync(resolve("dist", url.slice(1))), `Missing compiled entry: ${url}`);
}
const fallback = html.match(/<section id="portfolio-fallback"[\s\S]*?<\/section>/)?.[0];
assert(fallback, "Independent static fallback is required");
assert(!/^<section[^>]*\bhidden\b/.test(fallback), "Fallback must be visible before app startup");
for (const value of ["Anupam Singh", "mailto:theanupamsingh01@gmail.com", "/resume.pdf", "https://www.linkedin.com/in/anupamas02/", "written authorisation", "agreed scope"]) {
  assert(fallback.includes(value), `Missing fallback content: ${value}`);
}
assert(existsSync("dist/resume.pdf"));
assert(existsSync("dist/logo.svg"));
console.log("Production entry assets and independent identity/evidence/contact fallback: pass");
