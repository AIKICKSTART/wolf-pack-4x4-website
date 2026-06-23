# Oakflats Mufflermen — Landing Page Build Brief

> Edited from Dan's original note into a clean, scoped brief. Grounded in an audit of `src/app/ui-primitives/` (6,296 files · ~3,916 `.tsx` components · scanned 2026-06-02).

## Goal

Assemble, theme, and ship a production marketing landing page for Oakflats Mufflermen, built from the existing UI-primitives library, with a "Heritage Cream" light mode applied consistently across all sections, deployed to Hostinger.

## Original request (for reference)

> "Start getting the ui-primitives marketing video / hero sections / marketing assets, make the light mode 'heritage cream' across all sections, fix the landing page for deployment to Hostinger, and audit all the assets — there are thousands that could potentially be used, built for this purpose."

## What's actually in the folder (audit findings)

The "thousands of assets" are **React/TSX section and primitive components**, not media binaries. The real videos/posters are *referenced* (e.g. `seedance-video-pack.ts` → `/media/generated/replicate/videos`) but the binary files are **not in this folder** — they live elsewhere in the app/CDN and must be sourced separately.

Directly usable marketing building blocks:

| Source | Contents |
|---|---|
| `video-heroes/` | Hero renderer + option previews + `hero-options.ts`; dynamic `[option]` route. |
| `marketing/` | 15 sections incl. `full-landing`, `feature-grid`, `feature-spotlight`, `testimonial-wall`, `pricing-cta`, `process-steps`, `stat-counter-row`, `logo-cloud`, `faq-accordion`, `footer-megamap`, `newsletter-cta`, `sticky-cta-bar`, `cookie-banner`, `floating-chat`. |
| `landing-pages/` | 16 sections incl. `complete` (full assembled page), `hero-split-section`, `hero-centred-section`, `cta-band-section`, `feature-grid-section`, `comparison-table-section`, `pricing-table-card`, `testimonial-carousel`, `social-proof-strip`, `metric-counter-strip`, `case-study-card`, `partner-logo-grid`, `lead-capture-form`, `faq-accordion-section`. |
| `marketing-campaigns/` | 15 components (campaign cockpit, creative-gallery, funnel, channel-mix) — mostly internal tooling, lower priority for the public page. |
| `sections/` · `section-library/` · `section-patterns/` | 13 + 30 + 1 reusable section components. |
| `brand-assets/` | Brand production/supplier asset manifests + brand page. |
| `seedance-video-pack.ts` | 10 defined video assets (landscape + portrait pairs): workshop-hero, performance-road, exhaust-product, service-dyno, social-outro. |

Design-system source of truth: `SHARED-DNA.md` (2,176 components scanned, **65% DNA-compliant, 754 violating**), `ui-primitives.module.css` (tokens, 145 KB), `foundation-dna.module.css`.

## Heritage Cream — light mode

"Heritage Cream" is the existing light-mode preset, already defined:

- `components/theming/theme-tokens.ts` → `HERITAGE_CREAM` preset, id `heritage-cream`, label "Heritage Cream", *"warm cream and oxblood — period-correct heritage muffler shop."*
- `primitive-theme-toggle.tsx` → `light: "heritage-cream"` is the default light tone.
- Tokens flip under `:global(html[data-primitive-theme="light"]) .dashboard` in `ui-primitives.module.css`.

The mechanism exists; the work is **coverage**. "Heritage" is only referenced in ~18 files today, and ~754 components violate DNA (likely hardcoded dark values with no light-mode block). "Across all sections" = ensure every section that will appear on the public page has a complete `html[data-primitive-theme="light"]` token block and uses tokens rather than hardcoded colors.

## Workstreams

**1. Asset audit & shortlist.** Produce a concrete inventory of section components viable for the public landing page, scored on completeness, DNA-compliance, and light-mode readiness. Resolve where the actual video/poster binaries live (the `/media/generated/replicate/videos` references) and confirm which can be used.

**2. Page assembly.** Compose the landing page from the shortlisted sections — likely starting from `landing-pages/complete` or `marketing/full-landing` as the spine, plus a `video-heroes` hero. Decide final section order and copy.

**3. Heritage-cream coverage pass.** For every section on the page: confirm it consumes theme tokens, add/repair the light-mode token block, and visually verify cream+oxblood rendering. Fix DNA violations on those specific components (not all 754 — only what's on the page).

**4. Hostinger deployment.** See recommendation below.

## Hostinger deployment — recommendation

I could not see a `package.json`, `next.config.*`, or `tsconfig.json` — the mounted folder is `src/app/ui-primitives`, i.e. **only the design-system source, not the app root or build config**. That needs confirming before committing to an approach. With that caveat:

**Recommended: Next.js static export → Hostinger shared hosting.**

- The landing page is content/marketing — no per-request server logic was found (no `use server`, no route handlers/API in the marketing/landing/video-heroes trees). The only dynamic route is `video-heroes/[option]`, which is a preview tool, not needed on the public page.
- Static export (`output: 'export'`) produces plain HTML/CSS/JS that drops onto Hostinger's cheapest shared plan via the file manager or FTP — no Node runtime, no VPS cost, fastest to ship.
- Caveats to verify: no server-only Next features on the chosen sections (next/image needs `unoptimized: true` or a loader; no server actions on forms — the `lead-capture-form` would need a static-friendly handler, e.g. a form service or external endpoint).

Fall back to **Node/VPS hosting** only if the page genuinely needs SSR, server actions, or dynamic routes at runtime. On current evidence it does not.

A `.htaccess` (caching, clean URLs, HTTPS redirect) should be added for the shared-hosting upload.

## Open questions before execution

1. Confirm access to the **app root** (package.json / next.config / build scripts) — without it, deployment can't actually be built.
2. Where do the **video/poster binaries** live, and which are cleared for production use?
3. Final **section list, order, and copy** for the public page — or should I propose a default from the shortlist?
4. Lead-capture form: where should submissions go (email service, CRM, external endpoint)?

## Suggested execution order

1. Asset audit & shortlist (Workstream 1) → deliver inventory for sign-off.
2. Confirm app root + binaries + section list (open questions 1–3).
3. Assemble page (Workstream 2).
4. Heritage-cream coverage pass on page sections (Workstream 3).
5. Configure static export + `.htaccess`, build, and stage upload to Hostinger (Workstream 4).
