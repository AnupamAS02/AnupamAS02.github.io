# Positioning and contact checks

## Local verification

Run `npm ci`, `npm run build`, and `npm run lint`. All passed for this change.
Preview the production build with `npm run preview -- --host 0.0.0.0`.

Browser checks on the production preview:

- 375 × 812, 768 × 1024, and 1440 × 900: no horizontal overflow or broken images.
- Mobile menu opens with a pointer or Enter, exposes all navigation and résumé links, and closes after choosing a section.
- Keyboard Tab moves between navigation links; focus has a visible outline.
- All fragment links resolve to existing elements. Contact navigation reaches the contact section.
- Email action is `mailto:theanupamsingh01@gmail.com`, matching the original portfolio. No message was sent and mailbox delivery was not tested.
- Résumé and original logo return HTTP 200 with PDF and SVG content types.
- Existing Lunacal link returns HTTP 200 after redirect to `https://lunacal.ai/`.
- Existing LinkedIn URL is preserved; automated verification is blocked with HTTP 999. Check it in a normal signed-in browser before publishing.
- Original logo, portrait, acknowledgement assets, résumé, experience, and certification sections remain. Acknowledgement cards use navy backgrounds for white-logo contrast.

## Dependency maintenance — 26 November 2026

The original lockfile audit was reproduced: 13 affected-package findings (2 moderate, 10 high, 1 critical). These are package-level totals; several packages have multiple advisories. After compatible updates, `npm audit --json` reports **0 findings** across all severities, including development dependencies. This is the registry's known-advisory result, not a guarantee against all vulnerabilities or evidence of past exploitation.

Only `package-lock.json` changed for the dependency fixes. Existing package ranges, portfolio source, assets, and positioning/contact changes remain intact. Used `npm audit fix` without `--force`; reviewed both resolution passes. The second pass updates `typescript-eslint` within its existing 8.x range so its upstream dependency moves to patched minimatch 11, rather than forcing an incompatible override onto the old parser.

### Applicability and resolved packages

This is a static React site: Vite/Tailwind process source into `dist`, and the browser does not run these Node tooling packages. Some build dependencies are declared under `dependencies`, so npm's production/development labels alone do not describe shipped exposure. No site feature accepts archives, YAML, glob patterns, source maps, or schemas from visitors. These findings primarily concern the development machine or builds processing malicious inputs; build tooling vulnerabilities can still affect generated output and are worth fixing.

| Affected package | Locked versions before → after | Relevant exposure |
| --- | --- | --- |
| Vite | 7.1.1 → 7.3.8 | Development-server file access/permission bypasses, editor-launch handling, middleware script execution. Not the static hosting server; keep development/preview servers local or access-controlled. |
| tar | 7.4.3 → 7.5.23 | Tailwind oxide installation dependency. Archive extraction/path traversal and resource exhaustion, including critical GHSA-23hp-3jrh-7fpw. No archive-processing feature in the site. |
| rollup | 4.46.2 → 4.68.8 | Build-time file write/path traversal (GHSA-mw96-cpmx-2vgc); not a browser API. |
| postcss | 8.5.6 → 8.5.33 | CSS processing: source-map file reads/path traversal and stringify XSS advisories; portfolio CSS is repository-controlled. |
| source-map-js | 1.2.1 → 1.2.4 | Source-map processing denial of service (GHSA-68fv-2mgg-jv7q), through CSS tooling. |
| nanoid | 3.3.11 → 3.3.20 | PostCSS dependency; invalid generator sizes/integer overflow. No visitor-facing generator uses it. |
| picomatch | 2.3.1 / 4.0.3 → 2.3.2 / 4.0.7 | Lint/build glob matching: method injection and regular-expression denial of service. |
| minimatch | 3.1.2 / 9.0.5 → 3.1.5 / 11.0.9 | ESLint/TypeScript glob matching denial of service, including globparts amplification (GHSA-g3hv-75wg-m249). |
| brace-expansion | 1.1.12 / 2.0.2 → 1.1.22 / 5.1.0 | Glob expansion resource exhaustion in lint tooling. New major is selected by the updated upstream parser, not an override. |
| @humanfs/node | 0.16.6 → 0.16.8 | ESLint filesystem helper: recursive copy following symlinks outside the source tree. |
| ajv | 6.12.6 → 6.15.0 | ESLint schema-validation dependency; ReDoS with `$data`. No visitor-supplied schemas. |
| flatted | 3.3.3 → 3.4.4 | ESLint cache serialization dependency; recursion denial of service/prototype pollution. |
| js-yaml | 4.1.0 → 4.3.2 | ESLint configuration parsing; merge/prototype pollution and resource exhaustion with crafted YAML. |

### Verification after updates

- `npm ci`, full `npm audit --json`, `npm ls --all`, `npm run build`, `npm run lint`, and `git diff --check`: pass. No dependency overrides or forced upgrades.
- Build includes TypeScript project checks. Build and lint pass on Node 26.13.1 and Node 22.23.5 LTS (npm 11.20.0). For hosting/builds use supported Node 22 LTS at 22.12 or later, satisfying Vite's engine requirement. Node 26 emits a non-failing `module.register()` deprecation warning; Node 22 does not.
- Production preview at 375 × 812, 768 × 1024, and 1440 × 900: no horizontal overflow, broken images, or missing fragment targets.
- Desktop About, Experience, Certifications, and Contact links reach their expected fragments. Hero contact reaches `#contact`.
- Mobile menu opens via Enter and pointer, exposes navigation and résumé, and closes after section/contact selection. Keyboard focus outline remains visible.
- Contact email remains `mailto:theanupamsingh01@gmail.com`. No email sent or mailbox delivery tested. Résumé and logo each return HTTP 200. External profile destinations remain unchanged; see prior verification limitations above.
- No automated test suite is configured in this repository. No deployment command was run. Current advisories are resolved; rerun `npm audit` periodically as the advisory database changes.

## Publishing

Changes are for founder review on `brainer/work`, not deployed. The founder reviews and merges the pull request, then deploys using their existing hosting process. No new environment variables or hosting settings are needed. Service availability is not asserted; contact copy invites a discussion of fit, scope, and availability.

## Project context and navigation — milestone 2

### Evidence used

- `src/components/Certifications.tsx` and `public/resume.pdf` both describe the handwritten-digit project, a team of two, Otsu's method, a Multi-Layer Perceptron, and Anupam's J2SE GUI contribution. Moved that record from certificates into Projects & Practice; retained the recorded organisation and dates as résumé context. Did not repeat the accuracy percentage: no dataset, evaluation procedure, code, or demo is supplied. Did not extend the résumé's B.Tech wording into a degree claim.
- This repository supports the portfolio's React, TypeScript, Tailwind CSS, Vite, and static single-page context. Linked its existing public GitHub repository for direct source review.
- `src/components/About.tsx` establishes Hack The Box/TryHackMe as lab practice. No personal lab-profile URL is supplied, so none was guessed. Existing LinkedIn URL is reused for professional background.
- Personal/academic work and learning practice are distinguished from the existing professional Experience section. No client case study, assessment outcome, new credential, target detail, or public exploit was added. Existing experience, acknowledgements, brand assets, contact positioning, and dependency lockfile are preserved.

### Verification

- `npm ci`, `npm run build` (including TypeScript checks), `npm run lint`, and `git diff --check`: pass. Install audit reports 0 vulnerabilities. No automated test suite is configured.
- Production preview checked at 375 × 812, 768 × 1024, and 1440 × 900: no horizontal overflow, broken images, or unresolved fragment links. Desktop project cards display side by side; mobile cards stack with readable wrapping.
- Desktop Projects link reaches `#projects`. Mobile menu opens with Enter, exposes Projects, and closes after keyboard selection. New source link receives keyboard focus with a visible outline. Existing contact route and navigation remain unchanged; no message sent.
- Public portfolio source, local résumé PDF, and existing Lunacal destination return HTTP 200 (Lunacal redirects to `https://lunacal.ai/`). LinkedIn returns HTTP 999 to automated requests; retained the existing URL and recommend a normal-browser check before publishing.
- Changes remain on `brainer/work` for the existing pull request. No deploy or merge was performed; no hosting configuration or new environment keys are required.
