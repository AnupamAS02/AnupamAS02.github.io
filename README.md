# Anupam Singh — Cybersecurity Portfolio

My cybersecurity focus is web application and API security. This portfolio brings together my background and project record for product teams considering a conversation about their security needs.

Visit the [portfolio](https://anupamas02.github.io/) and [contact me through its contact section](https://anupamas02.github.io/#contact), or email [Anupam](mailto:theanupamsingh01@gmail.com).

Any testing requires written authorisation from the system owner and an agreed scope. An enquiry is not permission to test; fit, scope, and availability need to be discussed.

## Local checks

Use Node 22 or newer and the committed npm lockfile:

```sh
npm ci
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

The existing `npm run deploy` command publishes **only `dist`** to `gh-pages`.
Its predeploy step builds and checks the production entry, identity/contact
fallback, metadata, résumé, favicon and social image before publishing.

1. Review and merge the `brainer/work` pull request into `main`.
2. In your authenticated local clone, check out and pull `main`, then run:

   ```sh
   npm ci
   npm run lint
   npm run deploy
   ```

   `npm run deploy` runs the production build and checks automatically, then
   publishes its output to `gh-pages`. You need your normal GitHub push access.
3. Open **Settings → Pages → Build and deployment**. Select **Deploy from a
   branch → gh-pages → / (root)** and save. Do not select `main / (root)`:
   that serves uncompiled source and causes the blank page. If `gh-pages` is
   not yet listed, complete the publish command first.
4. After GitHub Pages finishes its deployment, check
   `https://anupamas02.github.io/`: identity, projects, résumé and contact must
   render. The served HTML should reference `/assets/*.js`, never
   `/src/main.tsx`. GitHub/browser caches may briefly retain the old version.

Merging alone is not publishing when using this process. Repeat the publish
command after future changes. No new secrets, environment keys or migration are
needed. The team does not change settings, merge or run the deploy command.

No Actions workflow is included: the connected GitHub app cannot create workflow
files with its current permissions. The existing branch-based process above
works without adding workflow permissions or changing hosts.

## Startup resilience

`index.html` contains a readable static identity, résumé/profile/source links,
and the existing email contact with authorisation guidance. Its scoping email
link opens a prepared outline to edit in the visitor's email app, alongside a
selectable copy of the outline and the unchanged plain email alternative. The
static page collects no answers and needs no helper JavaScript. It remains usable
without JavaScript or when an application asset fails to load. React hides it only
after a successful commit; a rendering error boundary restores it on component
failure. This is not a substitute for publishing a production build.

See `TESTING.md` for verification and known external-link limitations.
