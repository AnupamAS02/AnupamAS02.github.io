# Anupam Singh — Cybersecurity Portfolio

My cybersecurity focus is web application and API security. This portfolio brings together my background and project record for product teams considering a conversation about their security needs.

Visit the [portfolio](https://anupamas02.github.io/) and [contact me through its contact section](https://anupamas02.github.io/#contact), or email [Anupam](mailto:theanupamsingh01@gmail.com).

Any testing requires written authorisation from the system owner and an agreed scope. An enquiry is not permission to test; fit, scope, and availability need to be discussed.

## Local checks

Use Node 22 or newer and the committed npm lockfile:

```sh
npm ci
npm run check:publishing
npm run lint
npm run build
npm run check:production
npm run preview
```

Preview serves the production `dist` output. Do not publish the repository root:
its `index.html` references `/src/main.tsx`, which static GitHub Pages cannot run.
The built HTML references compiled `/assets/*.js` and includes public assets.
The startup fallback links to `/public/resume.pdf`: that is the tracked source path
when Pages serves the repository root. Vite normally flattens `public/` into
`dist/`, so the build also copies the résumé to `dist/public/resume.pdf` for this
same fallback URL. The full portfolio's existing `/resume.pdf` link remains intact.

## Publish on the existing GitHub Pages host (owner only)

Both options below publish **only the checked production `dist`**, including the
full portfolio and static fallback. Merging alone does not publish the site.
The team does not merge, change settings or deploy.

### In GitHub, without a local build

One-time owner setup after reviewing and merging the `brainer/work` PR:

1. Open [`scripts/publish-pages.yml`](scripts/publish-pages.yml) on `main` and copy
   its entire contents. In GitHub choose **Add file → Create new file**, name it
   **`.github/workflows/publish-pages.yml`**, paste, and commit to `main` (or use
   your normal reviewed PR process). The template is stored outside the workflow
   directory because Brainer's connected app cannot write active workflows.
   Your GitHub web editor can install it without changing Brainer's permissions;
   a token-based commit instead needs workflow-write permission.
2. In **Settings → Actions → General**, allow the official `actions/*` actions
   used in that file. In **Settings → Pages → Build and deployment → Source**,
   select **GitHub Actions**. If the `github-pages` environment restricts deployment
   branches, allow `main` in **Settings → Environments → github-pages**.
   The workflow requests `contents: read` for building and `pages: write` plus
   `id-token: write` only for publishing; no PAT, new secret or broader default
   token permission is needed. Existing environment approvals still apply.
3. While signed in as **AnupamAS02**, open **Actions → Publish portfolio (owner
   only) → Run workflow**, select **main**, then **Run workflow**. Approve the
   environment if GitHub requests it. Repeat this step after future merges.

Only this explicit manual run publishes: no push, PR, merge or schedule trigger
is configured. Other actors and branches are refused by the job guards. The
workflow uses Node 22, `npm ci`, publishing-safeguard tests, lint, production build
and production/metadata checks before uploading only `dist` to GitHub Pages.
A failed build/check prevents publishing. This uses the same GitHub Pages site
and URL, not a new host. It deploys a Pages artifact directly: merely pushing
`gh-pages` with an Actions `GITHUB_TOKEN` would not trigger branch-based Pages.

### Existing local option

The unchanged `npm run deploy` command builds, checks, then pushes `dist` to
`gh-pages`. In your authenticated local clone, check out and pull reviewed `main`:

```sh
npm ci
npm run lint
npm run deploy
```

You need your normal GitHub push access. For this option, set **Settings → Pages
→ Build and deployment → Deploy from a branch → gh-pages → / (root)** after
publishing (`gh-pages` appears after the first publish). Switching from the
Actions option requires this source change; switch back to **GitHub Actions**
before the next workflow publish. Never select `main / (root)`: it serves
uncompiled source instead of the full portfolio.

### Confirm the published result

After GitHub Pages finishes, check `https://anupamas02.github.io/`: identity,
projects, résumé and contact must render. The served HTML should reference
`/assets/*.js`, never `/src/main.tsx`; `/resume.pdf` and `/public/resume.pdf`
should both open. Caches may briefly retain the previous version. No migration
or environment keys are needed.

## Startup resilience

`index.html` contains a readable static identity, résumé/profile/source links,
and the existing email contact with authorisation guidance. Its scoping email
link opens a prepared outline to edit in the visitor's email app, alongside a
selectable copy of the outline and the unchanged plain email alternative. The
static page collects no answers and needs no helper JavaScript. It remains usable
without JavaScript or when an application asset fails to load. React hides it only
after a successful commit; a rendering error boundary restores it on component
failure. This is not a substitute for publishing a production build.

## Project record

The full portfolio and its static fallback both link to
[`projects/cybersecurity-portfolio.html`](projects/cybersecurity-portfolio.html).
This standalone, no-JavaScript record explains the personal project's purpose,
implementation, evidenced contributions and limits, linking to fixed public
source revisions. Vite's additional HTML entry preserves the same URL in `dist`;
it is also readable when serving the repository root. `npm run check:production`
checks both versions and the evidence-entry links. No publishing steps change.

See `TESTING.md` for verification and known external-link limitations.
