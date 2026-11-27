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

## Discovery and usability — milestone 3

### Changes and hosting evidence

- Page title and description identify Anupam Singh's cybersecurity portfolio; no new credentials, availability promises, or social handles. Static Open Graph and Twitter large-image tags are in built HTML, readable without JavaScript.
- Canonical and Open Graph URLs use `https://anupamas02.github.io/`. This is the user-site address of this repository, responds HTTP 200 from GitHub Pages, and has no redirect to another domain. No CNAME or alternate deployment base is tracked; Vite uses the root base and the existing publishing script uses `gh-pages -d dist`. If hosting changes, update these absolute URLs together.
- `public/social-preview.png` is a 1200×630 PNG (about 41 KB), using the unchanged original logo, local Manrope font, and approved navy/slate/green/light palette. Editable artwork is `scripts/social-preview.html`; regeneration instructions are in its comment. The original favicon remains unchanged. Artwork was visually reviewed for readable type and logo contrast.
- Kept the existing navigation rather than rebuilding it. Added Escape dismissal with focus returned to the toggle, focusable fragment destinations (not extra Tab stops), and a viewport-height cap with scrolling for the menu on short screens.
- External links and résumé PDFs now use the same tab, retaining standard browser Back and modifier-click choices. PDF link labels remain explicit. The shared Button component also adds safe `rel` values if a future caller requests a new tab.

### Reproduction and results

- `npm ci`, `npm run build` (TypeScript included), `npm run lint`, `node scripts/check-metadata.mjs`, and `git diff --check`: pass. Installation audit reports 0 vulnerabilities. Node 26 emits the previously documented non-failing deprecation warning. No deploy command run.
- The new Node metadata check inspects `dist/index.html`, uniqueness of tags, verified canonical/OG URLs, matching OG/Twitter title/description/image/alt, absence of unverified Twitter handles, favicon presence, and PNG signature/dimensions. It needs only Node; run after the production build. No general component-test framework is configured.
- Production preview at 320×812, 375×812, 768×1024, and 1440×900: no horizontal overflow, broken images, or missing fragment targets. Visual check at 375×812: header, hero, and contact action remain readable.
- At 667×375 landscape, the open menu scrolls inside the viewport; its Contact link becomes visible on keyboard focus and activates successfully.
- Keyboard: first Tab reveals Skip to content with a solid outline; Enter focuses `main`. Desktop About/Experience/Projects/Certifications each focus their section. Mobile Enter opens the menu; Escape from a menu link closes it and returns focus to the toggle. Projects/Contact selection closes the menu and focuses the destination. Next Tab after Projects reaches the source link with a visible focus outline. Existing email href remains unchanged; no message or delivery test performed.
- Local logo, résumé, and new PNG return HTTP 200 with SVG/PDF/PNG content types. PNG is included in the production build. Public GitHub source returns 200; Lunacal redirects to its current HTTPS root and returns 200. Existing LinkedIn still returns HTTP 999 to automated requests; normal-browser verification remains recommended.

### Preview and publishing limitations

Social platforms cannot fetch this unmerged branch/local preview. Their rendered cards and search snippets were not claimed as verified; they may cache previous metadata, select different text, or crop the image. After reviewing and merging PR #1, publish the production `dist` using the existing process, then check the public HTML/image and refresh platform previews as needed. The currently served public HTML references `/src/main.tsx`, so ensure publishing uses built output rather than the repository's source HTML. No hosting settings, credentials, environment keys, or service configuration were changed. Nothing merged or deployed.

## Founder-directed hacker/terminal visual refinement — task 7 follow-up

Founder direction: “make it look like you're viewing a hacker's portfolio website”. This supersedes the light-space preference for this design task.

- Dark navy surfaces, subtle slate grid, green terminal prompts, technical monospaced navigation/details, and compact terminal-window portrait framing. Existing Manrope body and Tanker headline fonts remain; system monospace needs no remote font. No simulated findings, scans, client activity, typing animation or invented credentials.
- Existing portrait moved into the introduction. Preserved logo, résumé, 12 acknowledgement assets, genuine project evidence, experience, certification, metadata and contact destinations. Green actions use navy text for contrast. The original logo has a white backing without changing the SVG.
- Consistent numbered section headings and dark bordered cards, grouped skills, clearly separated project context/review evidence, prominent contact card and footer return link. Removed section blur/reveal and portrait tilt for immediate readability and reduced-motion friendliness; no new animation.
- `npm ci`, build (including TypeScript), lint, metadata checks and diff checks pass; install audit reports zero known vulnerabilities. Existing Node build warning is non-failing.
- Production preview at 320×812, 375×812, 768×1024 and 1440×1000: no horizontal overflow, broken images, or missing fragment targets. Visually reviewed desktop introduction/projects and mobile contact. Phone cards stack and text wraps.
- Keyboard: first Tab reveals skip link with green outline; Enter focuses main. Projects link focuses its section. Mobile menu opens with Enter, Escape returns focus to the toggle, and Contact closes the menu and focuses contact. At 667×375 landscape the menu scrolls and its focused Contact action remains within the viewport. Existing reduced-motion CSS remains; section content no longer depends on animation.
- Email destination remains unchanged; no message sent. No hosting settings, credentials or external destinations changed. Screenshots attached in Brainer. Changes are on brainer/work for founder review; never merged or deployed.

## BugVsMe reference-inspired revision — task 7

Inspected https://bugvsme.com/ directly. The homepage initially rendered an empty main area; a subsequent snapshot showed the loaded headline, paired actions and cards. Adapted its centered oversized sans-serif headline, green atmospheric glow, small research badge, filled/outlined paired actions and restrained dark cards. Kept the existing navy/slate/green palette rather than introducing the reference's near-black colour. Did not copy its statistics, service/pricing promises, testimonials or claims.

Moved the original portrait to About and preserved genuine content, assets, section navigation, keyboard focus, authorisation guidance and contact destinations. No new animation; reduced-motion CSS remains. Process cards summarise already-described assessment, documentation and validation work.

Verification: npm ci (zero audit findings), production build/TypeScript, lint, metadata script and diff checks pass. Production preview at 320×812, 375×812, 768×1024 and 1440×1000 has no horizontal overflow or missing fragment targets. No broken loaded images. Desktop visual review confirms centered hero and three-column cards; mobile cards stack. Keyboard skip link focuses main; mobile Enter opens menu, Escape restores toggle focus, and Contact selection closes menu and focuses the section. No email sent or external destinations changed. Screenshots captured for desktop and phone. No merge or deployment; founder reviews and publishes through existing hosting.

## Optional private scoping email helper — task 8

- Kept the approved contact card/design, direct `mailto:theanupamsingh01@gmail.com`, visible address, LinkedIn link, and authorisation boundary. Added a native collapsible helper with four optional fields: product type, assessment goal (400 characters), timeframe (80 characters), and relationship to the system owner. No target address, identity/contact field, credentials, attachment, or proof of authorisation is requested.
- Answers generate a reviewable, selectable, read-only draft in React memory. No form submission, network API, analytics, cookie, local/session storage or new dependency was added. Opening the encoded mailto or copying is a deliberate visitor action; sending remains in their email app. Copy includes recipient and subject as well as the body. The draft states that an enquiry does not authorise testing and asks to discuss availability rather than promising it.
- Clipboard success/failure is announced by a status region. If clipboard access is unavailable or denied, focus moves to the draft and selects all text for manual copying. The original email link and visible address remain available without opening the helper. Email-client URL limits vary; guidance offers copy/manual copy if the draft does not open completely.

Verification:

- `npm ci` (zero audit findings), `npm run build` (TypeScript included), `npm run lint`, `node scripts/check-metadata.mjs`, and `git diff --check`: pass. Existing Node deprecation warning remains non-failing.
- Production preview tested at 320×812, 375×812, 768×1024, and 1440×1000 with the helper expanded: no horizontal overflow; all fields fit. Visual phone review confirmed readable fields, wrapping preview text and stacked actions within the existing dark design.
- Keyboard Enter opens the summary; Tab traverses product, goal, timeframe, authorisation context, draft, email link and copy action in order, with solid visible focus outlines. All fields have stable accessible labels. The native disclosure can also be closed from its summary.
- Empty optional answers produce “To discuss” rather than blocking. Changed answers appear in the preview and decoded mailto body. Checked `&`, `?`, `#`, line breaks, accented text and Japanese text; recipient and subject remain correct and the mailto body matches the preview body. The original direct email href is unchanged.
- Clipboard API success and rejection were exercised with browser test doubles: successful copy exactly matches the preview including To/Subject; rejection selects the entire preview and focuses it. Native OS clipboard/email-client integration varies and was not claimed as tested; no email was sent and no external mail app was launched.
- Browser resource count remained 18 before and after editing/copy testing/resizing; localStorage and sessionStorage remained empty. Reload clears entered answers. Source review confirms no input network or persistence path and no HTML interpretation of input. No backend or third-party service is involved.
- Updated only `brainer/work` for the existing review PR. No merge/deploy, environment keys, hosting changes or migration required. Founder reviews/merges and publishes using their existing process.

## Public rendering path repair — task 9

### Root cause and correction

Public HTTP inspection found repository-source HTML with an empty `#root` and
`<script type="module" src="/src/main.tsx">`. That TSX response had
`application/octet-stream` MIME and uncompiled imports/JSX. GitHub Pages is a
static host, not Vite: the source entry cannot execute. This explains the correct
title with blank body; it is not evidence of a failure in the production bundle.

- Hardened the owner's existing `npm run deploy`/`gh-pages` process: predeploy
  builds and checks the compiled entry and static fallback, in addition to the
  existing metadata/assets checks. README specifies publishing `dist` and selecting
  `gh-pages / (root)`. Never serve `main / (root)` directly.
- An initial attempt to include a build/artifact Pages workflow was rejected on
  push: the connected GitHub App lacks `workflows` permission. Removed that
  unpushed workflow and kept the existing owner-operated publishing process.
  No new hosting or app permissions are required for the shipped correction.
- Added independently styled static identity, résumé/profile/source links and
  unchanged email with authorisation guidance. It is initially visible, works
  without application JavaScript, and is hidden only after a successful React
  commit. A React boundary restores it if a component fails to render. No
  duplicate visible fallback after normal startup.
- Preserved all reviewed design, evidence, metadata, assets, navigation and
  private email-helper improvements. No new dependency, secret or migration.

### Verification

`npm ci` (zero audit findings), `npm run lint`, `npm run build` (TypeScript),
`npm run check:production` (entry asset/fallback and existing metadata checks),
and `git diff --check` pass. The known Node deprecation warning is non-failing.
Local commands ran on the workspace's Node 26. Actual GitHub Pages publishing
was not run by the team and awaits the owner's publish command and Pages setting.

Production `vite preview` at 320, 375, 768 and 1440px: full identity, experience,
projects, credentials, contact and helper render; fallback hidden, no horizontal
overflow or broken images. Opening the optional helper still reveals its fields
and draft. Keyboard Enter opens the mobile menu; Contact closes it and focuses
`#contact`. Existing direct mailto is unchanged; no email sent.

Three failure checks used temporary files/servers outside tracked source:

1. Serve `dist` via a Python static handler that returns 503 for `.js` requests:
   the identity, evidence links, email and permission guidance remain visible.
   Phone visual review confirms readable fallback and no sideways overflow.
2. Build a separate temporary Vite output with an `enforce: 'pre'` transform of
   `src/App.tsx` to `export default function App() { throw new Error('test'); }`:
   compiled application startup reaches the React error boundary, leaves the
   root empty and restores the independent HTML fallback. The real production
   bundle is not modified by this test.
3. Serve a temporary copy of production HTML with script tags removed: there are
   zero scripts and visible identity/contact/evidence at 320, 768 and 1440px,
   without overflow. Keyboard Tab reaches profile/evidence links. This tests
   no-script rendering, not a claim about a browser-settings toggle.

All temporary test files are excluded from the final build. Tests did not launch
an email client, send data, or exercise real external delivery.

### Review and owner publishing handoff

Fetched and fast-forwarded `origin/main` before editing: previous reviewed
improvements (including task 8) were already merged. GitHub's public PR API shows
PRs #1, #2 and #3 all closed/merged, with no open review PR at inspection; PR #3
merged on 26 November. That explains the absent previous Needs you card. This
new `brainer/work` commit needs a fresh automatic review PR from Brainer; the team
does not open or merge PRs manually.

Owner: review and merge the new PR. In an authenticated local clone, check out
and pull `main`, then run `npm ci`, `npm run lint`, and `npm run deploy`.
In **Settings → Pages**, select **Deploy from a branch → gh-pages → / (root)**,
not `main / (root)`. After Pages completes, confirm live HTML uses `/assets/*.js`
and the full portfolio renders. These steps are also in README.
Nothing is live from this correction until the owner merges and publishes it.

### Fallback résumé compatibility and PR restoration — task 9 reopened

The public page currently serves the static fallback from repository-root Pages:
its `/resume.pdf` link returns 404, while the tracked PDF is under `public/`.
The existing portfolio fallback, boundary and publishing changes are present in
merged `main`; the previous branch commit with the URL fix was not present on the
current PR branch. PR #6 was open with one README-only commit (`0ccf9d5`), so this
follow-up restores the fix on top of that README change rather than replacing it.

- Changed the static fallback PDF link to `/public/resume.pdf`. The build keeps
  Vite's normal flattened `/resume.pdf` for full-app links and copies the same
  tracked résumé to `dist/public/resume.pdf` for the fallback URL.
- Added build checks for both production file paths, byte-for-byte equality with
  `public/resume.pdf`, and all fallback identity, PDF, LinkedIn, GitHub, email,
  authorisation and scope links.
- `npm ci`, lint, production build/TypeScript, production and metadata checks,
  and `git diff --check` pass. The existing Node 26 deprecation warning is
  non-failing.
- Local repository-root static serving: `/public/resume.pdf` is HTTP 200,
  `application/pdf`; `/resume.pdf` is 404, as expected in that layout. Browser
  snapshot shows fallback content and the four original destinations.
- Static production preview: `/public/resume.pdf` and `/resume.pdf` both return
  HTTP 200, `application/pdf`, 71,965 bytes; all three copies are identical.
  Browser preview displays the full portfolio, with fallback hidden after app
  startup, and retains the app's existing résumé links.
- Live public host check: `/public/resume.pdf` returns HTTP 200 PDF and old
  `/resume.pdf` returns 404; GitHub source link returns 200. LinkedIn automated
  request returns HTTP 999, so normal-browser availability is not claimed. The
  email destination is preserved; no email application was launched.
- No `npm run deploy` or merge was performed. This test doesn't claim the public
  page has changed: the founder must review and merge the updated PR and then
  run `npm run deploy` from `main`, with Pages set to `gh-pages / (root)`.

## Enquiry readiness — task 10

- Added “Before you get in touch” within the existing contact card, retaining its approved navy/green styling. Three short subsections cover general product/goal/timeframe/owner context; written owner authorisation and agreed systems, environments, methods, exclusions, timing and stop contact; and information not to send through ordinary email. The next step leads to the unchanged email address and optional draft helper. No new service, availability, credential, engagement, price or delivery claims.
- The task checkout initially pointed to `18038b8`, missing the previous rendering-fix commit. Recovered `b9d3d842f1b78c5f0a753bdd7f7afff73a5a7b6a` from GitHub and fast-forwarded `brainer/work` to it before editing. Its fallback, startup boundary, build checks and publishing instructions are retained unchanged. Fetched and merged `origin/main` before work and again before push (already up to date).
- `npm ci` (zero audit findings), `npm run lint`, `npm run build` (TypeScript included), `npm run check:production`, metadata script and `git diff --check`: pass. Existing Node deprecation warning is non-failing. No general automated component-test framework is configured.
- Local production preview at 320×812, 375×812, 768×1024 and 1440×1000 with helper expanded: no horizontal overflow, broken loaded images or missing fragment targets. Phone visual review confirms the new heading and body copy wrap readably within the existing contact card.
- Keyboard: skip link has visible focus and Enter focuses main; desktop Contact focuses the contact section. Mobile Enter opens menu, Escape closes it and restores toggle focus; Contact selection closes menu and focuses contact. Native helper summary opens with Enter. Tab traverses its four fields, review draft, email-app link and copy button in order; each has a solid 3px focus outline.
- Updated helper answers appear in the reviewable draft and the decoded mailto body matches it. The original plain `mailto:theanupamsingh01@gmail.com` remains unchanged. Local/session storage remain empty. No email sent or external email application launched; native delivery/clipboard integration and live deployment are not claimed as tested in this task.
- Pushed only to `brainer/work`. No merge, deployment, hosting configuration, new keys or migration. Founder review/merge and existing README publishing steps are still required before this reaches the public site.

## Task 7 — personal-name correction

Header and footer now display Anupam Singh; the home link accessible name matches. Updated title, social site name, image description, no-JavaScript fallback branding and social-preview artwork consistently. Logo, visual design and real repository/canonical/contact URLs remain unchanged. Responsive browser verification at 320, 375, 768 and 1440px confirms both names, no old domain-style visible name and no horizontal overflow. Desktop and mobile screenshots captured. Build, lint, production checks, metadata and diff checks pass.
