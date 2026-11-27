import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const sourceHtml = readFileSync("index.html", "utf8");
const html = readFileSync("dist/index.html", "utf8");
assert(!html.includes("/src/"), "Pages must serve built HTML, not TSX source");
const entries = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map((match) => match[1]);
assert(entries.length > 0, "Missing compiled application entry");
for (const url of entries) {
  assert(/^\/assets\/[^/]+\.js$/.test(url), `Unexpected entry: ${url}`);
  assert(existsSync(resolve("dist", url.slice(1))), `Missing compiled entry: ${url}`);
}
function checkFallback(document, label) {
  const fallback = document.match(/<section id="portfolio-fallback"[\s\S]*?<\/section>/)?.[0];
  assert(fallback, `${label}: independent static fallback is required`);
  assert(!/^<section[^>]*\bhidden\b/.test(fallback), `${label}: fallback must be visible before app startup`);
  for (const value of [
    "Anupam Singh",
    "mailto:theanupamsingh01@gmail.com",
    "/public/resume.pdf",
    "https://www.linkedin.com/in/anupamas02/",
    "https://github.com/AnupamAS02/AnupamAS02.github.io",
    "written authorisation",
    "agreed scope",
    "Project records",
    "These personal and academic projects are not client security assessments.",
    "Personal project · Cybersecurity portfolio",
    "responsive, single-page site is built with React and TypeScript",
    "Academic research project · Handwritten digit recognition, team of two",
    "Otsu’s method and a Multi-Layer Perceptron",
    "Java (J2SE) graphical interface",
    "no public code repository or demo is listed",
  ]) {
    assert(fallback.includes(value), `${label}: missing fallback content or destination: ${value}`);
  }
}
checkFallback(sourceHtml, "Repository-root source");
checkFallback(html, "Production build");
assert(existsSync("public/resume.pdf"), "Repository-root fallback résumé must exist");
assert(existsSync("dist/resume.pdf"), "Existing portfolio résumé URL must remain available in production");
assert(existsSync("dist/public/resume.pdf"), "Fallback résumé URL must be available in production");
assert.deepEqual(readFileSync("public/resume.pdf"), readFileSync("dist/public/resume.pdf"), "Fallback résumé must match between repository and production output");
assert(existsSync("dist/logo.svg"));
console.log("Production entry, dual-path résumé, evidence and contact fallback: pass");
