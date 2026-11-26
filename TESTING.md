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

## Existing dependency warnings

`npm audit` reports 13 findings in the existing lockfile: 2 moderate, 10 high, 1 critical. Dependencies and lockfile were not changed in this content/navigation task. Review and update dependencies separately, including Vite and the transitive `tar` finding.

## Publishing

Changes are for founder review on `brainer/work`, not deployed. The founder reviews and merges the pull request, then deploys using their existing hosting process. No new environment variables or hosting settings are needed. Service availability is not asserted; contact copy invites a discussion of fit, scope, and availability.
