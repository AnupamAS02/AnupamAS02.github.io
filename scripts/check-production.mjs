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
for (const value of ["Anupam Singh", "mailto:theanupamsingh01@gmail.com", "/public/resume.pdf", "https://www.linkedin.com/in/anupamas02/", "https://github.com/AnupamAS02/AnupamAS02.github.io", "written authorisation", "agreed scope"]) {
  assert(fallback.includes(value), `Missing fallback content or destination: ${value}`);
}
assert(existsSync("public/resume.pdf"), "Repository-root fallback résumé must exist");
assert(existsSync("dist/resume.pdf"), "Existing portfolio résumé URL must remain available in production");
assert(existsSync("dist/public/resume.pdf"), "Fallback résumé URL must be available in production");
assert.deepEqual(readFileSync("public/resume.pdf"), readFileSync("dist/public/resume.pdf"), "Fallback résumé must match between repository and production output");
assert(existsSync("dist/logo.svg"));
console.log("Production entry, dual-path résumé, evidence and contact fallback: pass");
