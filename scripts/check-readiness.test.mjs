import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

// Run the same pure TypeScript rules used by the UI, without a second implementation.
const source = readFileSync("src/utils/readiness.ts", "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { readinessTopics, prepareSteps, preparationText, preparationBoundary } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);

for (const topic of readinessTopics) {
  for (const answer of [undefined, "understood", "clarify", "unsure"]) {
    test(`${topic.id}: ${answer ?? "unanswered"}`, () => {
      const answers = answer ? { [topic.id]: answer } : {};
      const before = JSON.stringify(answers);
      const step = prepareSteps(answers).find((item) => item.title === topic.title);
      assert.equal(step.action, answer === "understood" ? topic.understood : topic.clarify);
      assert.equal(step.status, answer === "understood" ? "Confirm before testing" : answer === "clarify" ? "Clarify with your team" : answer === "unsure" ? "Find the right contact" : "Not answered — start here");
      assert(preparationText(answers).includes(step.action));
      assert.equal(JSON.stringify(answers), before, "rules must not mutate choices");
    });
  }
}

test("all 1,024 answer combinations retain five actions and testing boundaries", () => {
  for (let combination = 0; combination < 4 ** readinessTopics.length; combination++) {
    let remainder = combination;
    const answers = {};
    for (const topic of readinessTopics) {
      const answer = [undefined, "understood", "clarify", "unsure"][remainder % 4];
      if (answer) answers[topic.id] = answer;
      remainder = Math.floor(remainder / 4);
    }
    const steps = prepareSteps(answers);
    const text = preparationText(answers);
    assert.equal(steps.length, 5);
    assert.equal(new Set(steps.map((step) => step.title)).size, 5);
    assert(text.includes(preparationBoundary));
    assert(text.includes("Do not include actual targets, credentials, customer data, findings or authorisation documents"));
    assert(!/ready to test|approved to test|security score:|\d+%/i.test(text));
  }
});

test("helper has no persistence, transmission, tracking or URL-answer APIs", () => {
  const implementation = source + readFileSync("src/components/ReadinessHelper.tsx", "utf8");
  assert(!/localStorage|sessionStorage|indexedDB|document\.cookie|fetch\(|XMLHttpRequest|sendBeacon|WebSocket|URLSearchParams|history\.|location\.|serviceWorker/.test(implementation));
  assert(!/<input[^>]+type=["'](?:text|password|url|email)/.test(implementation));
  assert(implementation.includes('window.addEventListener("pagehide", clear)'));
  assert(implementation.includes('window.addEventListener("pageshow", clear)'));
  assert(implementation.includes("event.preventDefault()"));
});

test("source and built page keep no-JS preparation, privacy and existing contact", () => {
  for (const path of ["readiness.html", "dist/readiness.html"]) {
    const html = readFileSync(path, "utf8");
    for (const text of ["readiness-fallback", "Ownership and authorisation", "Intended scope", "Environment", "Access", "Timing and coordination", "mailto:theanupamsingh01@gmail.com", 'href="/#contact"', "not a security score, legal advice or permission to test", "page’s memory"]) {
      assert(html.includes(text), `${path}: missing ${text}`);
    }
    assert(!/<(?:iframe|input|form)\b/.test(html), "no fallback answer collection");
    assert(!/<script[^>]+src=["']https?:/.test(html), "no third-party scripts");
    assert(!/<link[^>]+rel=["']stylesheet["'][^>]+href=["']https?:/.test(html), "no third-party styles");
  }
  for (const path of ["index.html", "dist/index.html", "src/components/Contact.tsx"]) {
    assert(readFileSync(path, "utf8").includes('href="/readiness.html"'), `${path}: helper discoverable`);
  }
});
