import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { parse } from "yaml";

const template = parse(readFileSync("scripts/publish-pages.yml", "utf8"));
const ownerGuard = "github.event_name == 'workflow_dispatch' && github.actor == github.repository_owner && github.triggering_actor == github.repository_owner && github.ref == 'refs/heads/main'";

function checkWorkflow(workflow) {
  assert.deepEqual(workflow.on, { workflow_dispatch: null }, "Publishing must be manual only");
  assert.deepEqual(workflow.permissions, { contents: "read" });
  assert.deepEqual(workflow.concurrency, { group: "portfolio-pages", "cancel-in-progress": false });
  assert.deepEqual(Object.keys(workflow.jobs), ["build", "publish"]);
  const { build, publish } = workflow.jobs;
  for (const job of [build, publish]) {
    assert.equal(job.if, ownerGuard, "Only the owner can publish main");
    assert.equal(job["runs-on"], "ubuntu-24.04");
    assert.equal(job["timeout-minutes"], 10);
  }
  assert.equal(build.permissions, undefined, "Build must keep read-only permissions");
  assert.equal(publish.needs, "build", "Failed checks must block deployment");
  assert.deepEqual(publish.permissions, { pages: "write", "id-token": "write" });
  assert.deepEqual(publish.environment, {
    name: "github-pages",
    url: "${{ steps.deployment.outputs.page_url }}",
  });
  assert.equal(build.steps.length, 8);
  assert.match(build.steps[0].uses, /^actions\/checkout@[a-f0-9]{40}$/);
  assert.deepEqual(build.steps[0].with, { "persist-credentials": false });
  assert.match(build.steps[1].uses, /^actions\/setup-node@[a-f0-9]{40}$/);
  assert.deepEqual(build.steps[1].with, { "node-version": "22", cache: "npm" });
  assert.deepEqual(build.steps.slice(2, 7).map((step) => step.run), [
    "npm ci", "npm run check:publishing", "npm run lint", "npm run build", "npm run check:production",
  ], "Build and validation must precede uploading dist");
  assert.match(build.steps[7].uses, /^actions\/upload-pages-artifact@[a-f0-9]{40}$/);
  assert.deepEqual(build.steps[7].with, { path: "dist", "retention-days": 1 });
  assert.equal(publish.steps.length, 1);
  assert.equal(publish.steps[0].id, "deployment");
  assert.match(publish.steps[0].uses, /^actions\/deploy-pages@[a-f0-9]{40}$/);
}

test("manual Pages template has least-privilege, owner/main guards and checked dist output", () => {
  checkWorkflow(template);
});

test("installed workflow, when present, matches the reviewed template", () => {
  const path = ".github/workflows/publish-pages.yml";
  if (existsSync(path)) {
    const installed = parse(readFileSync(path, "utf8"));
    checkWorkflow(installed);
    assert.deepEqual(installed, template);
  }
});

for (const [name, mutate] of [
  ["automatic push trigger", (w) => { w.on.push = {}; }],
  ["non-owner build", (w) => { w.jobs.build.if = "always()"; }],
  ["non-owner rerun", (w) => { w.jobs.publish.if = ownerGuard.replace(" && github.triggering_actor == github.repository_owner", ""); }],
  ["non-main branch", (w) => { w.jobs.build.if = ownerGuard.replace("refs/heads/main", "refs/heads/brainer/work"); }],
  ["unrestricted deployment", (w) => { delete w.jobs.publish.if; }],
  ["source-root upload", (w) => { w.jobs.build.steps[7].with.path = "."; }],
  ["missing production checks", (w) => { w.jobs.build.steps[6].run = "echo skipped"; }],
  ["deployment before build success", (w) => { delete w.jobs.publish.needs; }],
  ["repository write permissions", (w) => { w.permissions.contents = "write"; }],
  ["persisted Git credentials", (w) => { w.jobs.build.steps[0].with["persist-credentials"] = true; }],
  ["unpinned action", (w) => { w.jobs.publish.steps[0].uses = "actions/deploy-pages@v4"; }],
]) {
  test(`rejects ${name}`, () => {
    const changed = structuredClone(template);
    mutate(changed);
    assert.throws(() => checkWorkflow(changed));
  });
}
