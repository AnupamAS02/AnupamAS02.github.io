import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const projectPath = "/projects/cybersecurity-portfolio.html";
const canonical = `https://anupamas02.github.io${projectPath}`;
const repository = "https://github.com/AnupamAS02/AnupamAS02.github.io";
const revision = "22d726e8d3baa05e70c930aeaa19275df0393ba4";
const source = readFileSync(projectPath.slice(1), "utf8");
const built = readFileSync(`dist${projectPath}`, "utf8");

for (const [label, html] of [["Source project record", source], ["Built project record", built]]) {
  assert(html.includes('lang="en"'));
  assert(html.includes('<meta name="viewport"'));
  assert(html.includes("<title>Cybersecurity portfolio — Project record | Anupam Singh</title>"));
  assert(html.includes(`<link rel="canonical" href="${canonical}"`));
  assert(html.includes(`content="${canonical}"`), `${label}: share URL must match the detail page`);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${label}: one page heading`);
  for (const copy of [
    "Personal project · Web development",
    "My documented contribution",
    "not evidence that I wrote the entire application",
    "neerajjoshi-github",
    "later Brainer-assisted changes",
    "Implementation to inspect",
    "Section-based React interface",
    "Static build, responsive styling",
    "Contact without a site backend",
    "What this work does and does not show",
    "not a client security assessment",
    "does not establish penetration-testing findings, client outcomes",
    "not a submitted enquiry or confirmed delivery",
    "written authorisation from the system owner and an agreed scope",
    "without credentials, private target URLs or vulnerability details",
  ]) {
    assert(html.includes(copy), `${label}: missing context: ${copy}`);
  }
  const destinations = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((match) => match[1]);
  for (const required of [
    "/", "#main", "mailto:theanupamsingh01@gmail.com", repository,
    `${repository}/commit/4482e3c82a09320761044f2f2900af78a4d8740b`,
    `${repository}/commit/b54e724e1f24393ee060e590c0f37cb26eee557c`,
    `${repository}/commit/e2aee67dce3f3ae6b1190c2f5857f10de604a556`,
    `${repository}/commits/main/`,
    ...["src/App.tsx", "package.json", "src/components/Projects.tsx", "src/components/ScopingEmail.tsx", "index.html", "src/components/StartupBoundary.tsx"].map((file) => `${repository}/blob/${revision}/${file}`),
  ]) {
    assert(destinations.includes(required), `${label}: missing source/contact destination ${required}`);
  }
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${label}: duplicate IDs`);
  for (const target of destinations.filter((url) => url.startsWith("#"))) {
    assert(ids.includes(target.slice(1)), `${label}: missing anchor target ${target}`);
  }
  assert(!/<(?:script|form|input|iframe)\b/i.test(html), `${label}: record must work independently of JS, forms and embeds`);
}

for (const entry of ["index.html", "dist/index.html", "src/components/Projects.tsx"]) {
  assert(readFileSync(entry, "utf8").includes(`href="${projectPath}"`), `${entry}: evidence entry must link to the detail`);
}
console.log("Source-backed project detail, static access, metadata and evidence links: pass");
