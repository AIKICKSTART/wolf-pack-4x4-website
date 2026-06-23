# Shared DNA — Source of Truth

> Generated 2026-06-01 by the DNA-alignment audit team (17 clusters, 2176 components scanned). Every component in src/app/ui-primitives MUST source colour/space/radius/type/motion/surface/button from the tokens, classes, and primitives below.

## Compliance snapshot

- Scanned: **2176** components
- DNA-compliant: **1422** (65%)
- Violating: **754**
- Logged findings: **272**

## New shared primitives (this expansion)

Ten core interactive + layout primitives added to components/primitives/ — token-only, light/dark parity, full states, a11y:

| Primitive | Exports |
|---|---|
| Button | Button, IconButton (variants primary/secondary/ghost/danger/subtle · sm/md/lg · loading) |
| Card | Card, CardHeader, CardFooter (panel/raised/glass/recessed · tone edge · interactive) |
| SectionHeading | SectionHeading (kicker + display title + actions) |
| Badge | Badge, StatusDot (solid/soft/outline · 6 tones · pulse) |
| Field | Field, Input, Textarea (label/hint/error/required · forwardRef) |
| Select | Select (native, custom chevron, sizes, error) |
| Toggle | Toggle (role=switch, keyboard, tones) |
| Tabs | Tabs (underline/pill/segmented · roving tabindex) |
| Tooltip | Tooltip (hover+focus, 4 placements) |
| Divider | Divider (h/v, labelled, tones) |

---

I now have the complete picture. Here is the canonical registry.

# Shared DNA Registry

**Authoritative source-of-truth for the UI Primitives design system.** Every component must source its color, spacing, radius, type, motion, surface, and button treatment from the tokens, classes, and primitives listed here. Components must never hardcode values that a token already defines.

Root: `src/app/ui-primitives/`
- Tokens: `ui-primitives.module.css` (`.dashboard` block, theme-switched at `html[data-primitive-theme="light"]`)
- Foundation classes: `foundation-dna.module.css`
- Button DNA: `components/actions/button-primitive.tsx` + `components/button-dna-link.tsx`
- Shared header: `components/page-header.tsx`
- Primitive components: `components/primitives/index.ts`
- Motion: `components/motion/index.ts`
- Typography: `components/typography/index.ts`

---

## 1. Design Tokens (`--primitive-*`)

All tokens are defined on `.dashboard` and re-valued under `html[data-primitive-theme="light"]`. Color/surface tokens flip per theme; scale tokens (type, space, radius, motion, icon, sizing, brand, button) are **theme-agnostic** — change once, every consumer re-themes.

### 1a. Color (24 tokens)
Core palette + named brand colors.

| Token | Value (dark) |
|---|---|
| `--primitive-canvas` | `#050508` |
| `--primitive-body` | `#c7c9d0` |
| `--primitive-muted` | `#868b98` |
| `--primitive-text-strong` | `#ffffff` |
| `--primitive-text-on-accent` | `#ffffff` |
| `--primitive-red` | `#e62028` |
| `--primitive-red-dark` | `#a8141a` |
| `--primitive-amber` | `#ffc14f` |
| `--primitive-teal` | `#40bcff` |
| `--primitive-green` | `#37d67a` |
| `--primitive-violet` | `#a878ff` |
| `--primitive-violet-dark` | `#7c4dff` |
| `--primitive-icon-obsidian` | `#f4f5fa` |
| `--primitive-code-fg` | `#f6f6f8` |
| `--primitive-focus-ring` | `#40bcff` |
| `--primitive-line` | `rgba(255,255,255,0.13)` |
| `--primitive-line-strong` | `rgba(255,255,255,0.22)` |
| `--primitive-line-muted` | `rgba(255,255,255,0.08)` |
| `--primitive-overlay` | `rgba(0,0,0,0.48)` |
| `--primitive-media-overlay` | `rgba(0,0,0,0.62)` |
| `--primitive-shadow-outline` | `rgba(0,0,0,0.42)` |
| `--primitive-meter-track` | `rgba(255,255,255,0.1)` |
| `--primitive-shimmer-base` | `rgba(255,255,255,0.045)` |
| `--primitive-shimmer-peak` | `rgba(255,255,255,0.12)` |

### 1b. Surface / Card (40 tokens)
Panels, glass, neumorphism, fields, code, focus, shadows, nav/chrome surfaces, card aliases.

| Token | Role |
|---|---|
| `--primitive-panel` | base panel fill |
| `--primitive-panel-strong` | stronger panel fill |
| `--primitive-surface-1` → alias `--primitive-panel` |
| `--primitive-surface-2` → alias `--primitive-panel-strong` |
| `--primitive-surface-3` | `rgba(255,255,255,0.07)` |
| `--primitive-surface-hover` | `rgba(255,255,255,0.11)` |
| `--primitive-glass-soft` | soft glass overlay |
| `--primitive-glass-strong` | strong glass overlay |
| `--primitive-neumo-light` | neumorphic top highlight |
| `--primitive-neumo-dark` | neumorphic bottom shadow |
| `--primitive-field-bg` | input fill |
| `--primitive-field-hover` | input hover fill |
| `--primitive-field-strong` | input strong fill |
| `--primitive-recessed` | recessed inset fill |
| `--primitive-code-bg` | code surface |
| `--primitive-control-surface` | control fill (gradient) |
| `--primitive-control-active` | active control fill (gradient) |
| `--primitive-sidebar-background` | sidebar (gradient stack) |
| `--primitive-dashboard-background` | page background (gradient stack) |
| `--primitive-nav-border` | nav divider |
| `--primitive-nav-surface` | nav item fill |
| `--primitive-nav-hover-surface` | nav item hover fill |
| `--primitive-nav-active-surface` | nav item active fill |
| `--primitive-footer-surface` | footer fill |
| `--primitive-texture-stroke` | blueprint grid stroke |
| `--primitive-shadow-soft` | soft drop shadow |
| `--primitive-shadow-deep` | deep drop shadow |
| `--primitive-shadow-raised` → alias `--primitive-shadow-soft` |
| `--primitive-shadow-inset` | neumorphic inset shadow |
| `--primitive-surface-shadow` | default surface shadow |
| `--primitive-surface-hover-shadow` | surface hover shadow |
| `--primitive-focus-shadow` | focus ring shadow |
| `--primitive-card-bg` → alias `--primitive-control-surface` |
| `--primitive-card-border` → alias `--primitive-line` |
| `--primitive-card-shadow` → alias `--primitive-surface-shadow` |
| `--primitive-card-hover-shadow` → alias `--primitive-surface-hover-shadow` |

### 1c. Typography (37 tokens)
Font families (5), type scale (18), weights (5), line heights (5), letter spacing (5).

- **Families (5):** `--primitive-font-display`, `--primitive-font-display-alt`, `--primitive-font-body`, `--primitive-font-mono`, `--primitive-font-mono-techno`
- **Type scale (18):** `--primitive-display`, `--primitive-h1`…`--primitive-h6`, `--primitive-text-2xs` (10px), `--primitive-text-xs` (12px), `--primitive-text-sm` (13px), `--primitive-text-base` (15px), `--primitive-text-md` (16px), `--primitive-text-lg` (18px), `--primitive-text-xl` (22px), `--primitive-text-2xl` (28px), `--primitive-text-3xl` (36px)
- **Weights (5):** `--primitive-weight-regular` 400, `-medium` 500, `-semibold` 600, `-bold` 700, `-black` 900
- **Line heights (5):** `--primitive-leading-none` 1, `-tight` 0.95, `-snug` 1.15, `-normal` 1.5, `-relaxed` 1.7
- **Tracking (5):** `--primitive-tracking-tight` -0.01em, `-normal` 0, `-wide` 0.08em, `-wider` 0.16em, `-widest` 0.22em

### 1d. Spacing (21 tokens)
4px base, 2px micro-step. `--primitive-space-0`, `-px` (1px), `-0-5` (2px), `-1` (4px), `-1-5` (6px), `-2` (8px), `-2-5` (10px), `-3` (12px), `-4` (16px), `-5` (20px), `-6` (24px), `-7` (28px), `-8` (32px), `-9` (40px), `-10` (48px), `-11` (56px), `-12` (64px), `-14` (80px), `-16` (96px), `-20` (128px), `-24` (160px).

### 1e. Radius (9 tokens)
`--primitive-radius-none` 0, `-xs` 2px, `-sm` 4px, `-md` 8px, `-lg` 12px, `-xl` 16px, `-2xl` 24px, `-pill` 999px, `-round` 50%.

### 1f. Motion (8 tokens)
- **Durations (5):** `--primitive-duration-instant` 80ms, `-fast` 150ms, `-normal` 240ms, `-slow` 360ms, `-slower` 600ms
- **Easings (3):** `--primitive-ease-out` `cubic-bezier(0.16,1,0.3,1)`, `--primitive-ease-in-out` `cubic-bezier(0.65,0,0.35,1)`, `--primitive-ease-standard` `cubic-bezier(0.2,0,0,1)`

### 1g. Iconography (7 tokens)
`--primitive-icon-xs` 12px, `-sm` 14px, `-md` 16px, `-lg` 20px, `-xl` 24px, `-2xl` 32px, `--primitive-icon-stroke` 1.75. (Icon color = `--primitive-icon-obsidian`.)

### 1h. Component Sizing (30 tokens)
Named foundation scale for controls, rows, fields, wells, cards, media.
- **UI controls:** `--primitive-size-ui-2xs` 24, `-ui-xs` 28, `-ui-sm` 32, `-ui-md` 36
- **Command:** `--primitive-size-command-sm` 44, `-command-md` 48, `-command-lg` 56
- **Icon buttons:** `--primitive-size-icon-button-xs` 24, `-sm` 28, `-md` 32, `-lg` 36, `-xl` 44
- **Pills:** `--primitive-size-pill-sm` 24, `-md` 28, `-lg` 32
- **Rows:** `--primitive-size-row-sm` 36, `-md` 44, `-lg` 56
- **Fields:** `--primitive-size-field-sm` 36, `-md` 44, `-lg` 52
- **Icon wells:** `--primitive-size-icon-well-sm` 32, `-md` 40, `-lg` 48
- **Cards:** `--primitive-card-min-sm` 160, `-md` 220, `-lg` 320
- **Media:** `--primitive-media-thumb` 96, `-card` 168, `-hero` 420

### 1i. Brand DNA — carbon + metallic (8 tokens)
`--primitive-carbon-weave`, `--primitive-carbon-weave-size`, `--primitive-metallic-red`, `--primitive-metallic-amber`, `--primitive-metallic-black`, `--primitive-metallic-sheen`, `--primitive-chrome-edge`. (Surfaces/buttons consume these; never raw colors.)

### 1j. Button DNA tokens (11 tokens)
`--primitive-btn-radius` (→ `radius-sm`), `--primitive-btn-primary-bg` (→ `metallic-red`), `--primitive-btn-primary-fg`, `--primitive-btn-primary-hover-bg` (→ `metallic-amber`), `--primitive-btn-primary-hover-fg`, `--primitive-btn-primary-shadow`, `--primitive-btn-primary-hover-shadow`, `--primitive-btn-secondary-bg` (→ `metallic-black`), `--primitive-btn-secondary-fg`, `--primitive-btn-secondary-border`.

**Token count by group:** Color 24 · Surface/Card 40 · Typography 37 · Spacing 21 · Radius 9 · Motion 8 · Icon 7 · Sizing 30 · Brand 8 · Button 11. **Total ≈ 195 `--primitive-*` tokens.**

---

## 2. Shared Primitive Components (20)
From `components/primitives/index.ts` — the canonical reusable atoms. Each ships its own `*.module.css` consuming only `--primitive-*` tokens.

| # | Component | Type exports |
|---|---|---|
| 1 | `Avatar` | `AvatarSize`, `AvatarTone`, `AvatarStatus` |
| 2 | `Chip` | `ChipTone` |
| 3 | `Kbd` (+ `KbdGroup`) | `KbdSize` |
| 4 | `Skeleton` | `SkeletonVariant` |
| 5 | `ProgressRadial` | `ProgressRadialTone`, `ProgressRadialSize` |
| 6 | `ProgressLinear` | `ProgressLinearTone`, `ProgressLinearVariant` |
| 7 | `StatTile` | `StatTileTone`, `DeltaDirection` |
| 8 | `EmptyState` | `EmptyStateTone` |
| 9 | `Toast` | `ToastTone` |
| 10 | `Popover` | `PopoverPlacement`, `PopoverAlign` |
| 11 | `Drawer` | `DrawerSide`, `DrawerSize` |
| 12 | `CommandBar` | `CommandItem`, `CommandSection` |
| 13 | `TagInput` | — |
| 14 | `Breadcrumb` | `BreadcrumbItem` |
| 15 | `Pagination` | — |
| 16 | `CodeBlock` | — |
| 17 | `QuoteBubble` | `QuoteBubbleSide`, `QuoteBubbleTone` |
| 18 | `Marquee` | `MarqueeDirection` |
| 19 | `CountUp` | — |
| 20 | `ConfettiBurst` | `ConfettiBurstHandle`, `ConfettiBurstOptions` |

---

## 3. Foundation DNA Classes (`foundation-dna.module.css`)
Shared layout, surface, blueprint, sizing, and token-table classes. All consume `--primitive-*` tokens exclusively.

- **Layout shell:** `.board`, `.section`, `.sectionHeader`
- **Section typography:** `.kicker`, `.index`, `.meta`, `.token` (mono/red eyebrow); `h2`/`h3` heading rules; `.rule`, `.note`
- **Grids:** `.grid` (4-col), `.threeGrid`, `.twoGrid`, `.patternGrid` (5-col)
- **Surface cards (neumorphic):** `.card`, `.pattern`, `.sizeGroup`, `.matrix`
- **Chips/tags:** `.tags`, `.chip`
- **Blueprint / wireframe kit:** `.blueprintFrame`, `.wire`, `.wireStrong`, `.wireAmber`, `.wirePage`, `.wireSection`, `.wireCard`, `.wireControl`, `.wireTable`, `.wireOverlay`, `.wireMobile`
- **Layout-spec diagrams:** `.layoutSpec`, `.layoutDiagram`, `.split5050`, `.split6040`, `.split7030`, `.railLayout`, `.bandLayout`, `.stackLayout`
- **Sizing showcase:** `.sizeRows`, `.sizeRow`, `.sizeRail`, `.sizeBox` (driven by `--size-box`)
- **Token tables:** `.tokenList`, `.tokenLine`, `.table` (+ caption/th/td rules)
- **Responsive:** breakpoints at 1180px and 720px collapse grids/splits to single column.

---

## 4. Button DNA
The single shared button system. Components must use these, never bespoke buttons.

- **`components/actions/button-primitive.tsx`** — canonical button source, exports:
  - `ActionButton` (+ `actionButtonVariants`, type `ActionButtonProps`)
  - `LiquidButton` (+ `liquidButtonVariants`, type `LiquidButtonProps`)
  - `MetalButton` (type `MetalButtonProps`, variant `MetalButtonVariant`)
  - `MetalButtonVariant` = `"default" | "primary" | "success" | "error" | "gold" | "bronze"`
- **`components/button-dna-link.tsx`** — `ButtonDnaLink`, the canonical "Button DNA" reference chip. Its CSS (`button-dna-link.module.css`) is the reference button skin: min-height `--primitive-size-command-sm` (44px), `--primitive-radius-sm`, mono/bold/uppercase `--primitive-text-2xs`, glass-over-recessed fill, hover → `--primitive-btn-primary-bg`, transitions on `--primitive-duration-fast` / `--primitive-ease-out`.
- **Backing tokens:** the `--primitive-btn-*` group (§1j) + metallic brand gradients (§1i).

---

## 5. Shared Header (`components/page-header.tsx`)
`PageHeader` — the single route header every primitives page mounts. Props: `kicker`, `title`, `description`, `crumbs?: PageHeaderCrumb[]`, `dnaSectionId?`. Exported interfaces: `PageHeaderProps`, `PageHeaderCrumb`.
- Composes the shared `Breadcrumb` primitive (auto-trail: `UI Primitives` → title).
- Renders scanline, kicker, `h1`, description, and a **Shared DNA quick-nav** (`00 Source` → `/ui-primitives#source-of-truth`, `01 Shared DNA` → `/ui-primitives#shared-dna`, `Buttons` → `/ui-primitives/actions#button-primitives`).
- When `dnaSectionId` is set, pulls the DNA contract via `getPrimitiveDnaSection()` from `../source-of-truth` and renders the contract aside (role / atomic outputs / evidence / readiness). Data attrs: `data-ui-primitive-page-header`, `data-ui-primitive-route-header`, `data-ui-primitive-dna-contract`.

---

## 6. Motion DNA (`components/motion/index.ts`)
Shared motion tokens + animation wrappers.
- **Tokens/util:** `durations`, `easings`, `transitions`, `formatEasing` (types `CubicBezier`, `DurationTokenId/Tokens`, `EasingTokenId/Tokens`, `TransitionPreset`, `TransitionTokenId/Tokens`) — from `motion-tokens.ts`
- **Provider:** `MotionConfig` (`MotionConfigProps`)
- **Wrappers (12):** `Reveal`, `StaggerList`, `FadeIn`, `SlideIn`, `ScaleIn`, `Magnetic`, `Tilt`, `ParallaxText`, `ScrollReveal`, `MorphText`, `GradientTrail`, `CountUpWatcher`, `ConfettiOnSuccess`

---

## 7. Typography DNA (`components/typography/index.ts`)
Shared font wrappers, role components, kinetic engine, and the role/font data registries.

- **Font wrappers (10):** `FontAnton`, `FontBigShoulders`, `FontBebas`, `FontSpaceGrotesk`, `FontFraunces`, `FontMajorMono`, `FontBricolage`, `FontIbmMono`, `FontInterTight`, `FontCormorant`
- **Type-role components (19):** `RoleDisplay`, `RoleH1`–`RoleH6`, `RoleBodyLead`, `RoleBodyBase`, `RoleBodySmall`, `RoleCaption`, `RoleEyebrow`, `RoleLabel`, `RoleMono`, `RoleNumeric`, `RoleControl`, `RoleDenseTable`, `RoleKineticSafe`
- **`KineticText`** — kinetic animation engine. `KineticSize` = `"sm"|"md"|"lg"|"xl"|"hero"`; `KineticTextMotionId` = base `KineticMotionId` plus automotive motions `"cam-sync" | "bead-run" | "fan-balance" | "battery-charge" | "pressure-wave" | "shift-gate" | "supplier-glow" | "data-ribbon"`
- **Data registries:** `typographyRoles`, `typographyRoleMap` (types `TypographyRoleId`, `TypographyRoleSpec`) from `typography-role-data`; `kineticMotionIds`, `typographyFontClassNames`, `typographyFonts` (types `TypographyFontId`, `TypographyFontMeta`, `TypographyCategory`, `KineticMotionId`) re-exported from `../../typography/typography-fonts`

---

### Sourcing rule (authoritative)
Every component in `src/app/ui-primitives/` must:
1. Pull all color/surface/type/space/radius/motion/icon/sizing values from the `--primitive-*` tokens in §1 — no hardcoded literals where a token exists.
2. Reuse the 20 primitives (§2), foundation-dna classes (§3), button DNA (§4), `PageHeader` (§5), motion wrappers (§6), and typography roles/fonts (§7) instead of re-implementing them.
3. Treat scale tokens as theme-agnostic and color/surface tokens as theme-switched via `html[data-primitive-theme="light"]`.

---

# Unified-Alignment Report

All three canonical DNA sources are confirmed on disk. The audit data is grounded. Now I'll synthesize the unified report from the aggregate totals and the 7 cluster JSON blocks (the 8th cluster — file-browser/forms/foundations/hermes — is truncated mid-stream in the input).

# Unified DNA-Alignment Report — Oak Flats Mufflermen UI-Primitives Surface

> One design system, one source of truth. Consolidated from 17 per-cluster audits across 150 areas.
> Root: `src/app/ui-primitives/` · Authoritative registry: `ui-primitives.module.css` (~195 `--primitive-*` tokens)

---

## 1. Executive Summary

| Metric | Value |
|---|---|
| Components scanned | **2,176** |
| DNA-compliant | **1,422** |
| Violating | **754** |
| Distinct findings logged | **272** |
| **Overall DNA-compliance** | **65.3%** (1,422 / 2,176) |
| Clusters / areas covered | 17 clusters / 150 areas |

**Headline gaps to "one unified system":**

1. **Spacing is the single biggest fracture.** The overwhelming majority of violations are raw-px `gap`/`padding`/`margin`/`border-radius` literals where a `--primitive-space-*` / `--primitive-radius-*` token already exists. Off-scale values (14px, 18px, 22px, 28px) recur in nearly every page-level `.module.css` — these are interpolations *between* existing tokens, meaning the 4px/2px-step scale exists but is not being consumed.
2. **Bimodal compliance — the system works where it's adopted, and is absent where it isn't.** Clusters range from **0%** (calendar/chrome/cms/commerce/compliance — 164/164 violating) and **3%** (ab-runtime/account/accounting) up to **98.4%** (billing/block-editor/booking-widget) and **92.9%** (db-admin/emails). This is not uniform drift; it is **per-cluster adoption**. The component-level primitives (`components/*`) and the newer page surfaces source DNA correctly; the older per-route page CSS does not.
3. **Light-theme tokens are being re-derived from hardcoded hex/rgba** instead of composed from `--primitive-*` via `color-mix()`. `brand-assets.module.css` alone carries 6 CRITICAL hardcoded-color findings rebuilding the entire `html[data-primitive-theme="light"]` token block from raw `#000`/`#fff`/`rgba()` — defeating the theme-agnostic scale contract.
4. **Data/content colors leak in as undocumented locals.** Email-builder and emails areas embed `#1f2230`, `#6b7080`, `#f4f2ee`, `#c084fc` as ad-hoc CSS vars or literals. These are *real* content-preview needs, but they bypass the single source of truth — they should be promoted to named `--primitive-*` tokens.
5. **No reported ad-hoc button re-implementations** surfaced in the covered findings — the Button DNA (`button-primitive.tsx`, `button-dna-link.tsx`) appears respected. The fracture is in **tokens and surfaces, not in the button layer.** That is the good news: closing the gap is mechanical token substitution, not architectural rework.

**Verdict:** The DNA registry is complete and correct (canonical sources confirmed on disk: `components/actions/button-primitive.tsx`, `components/button-dna-link.tsx`, `brand-assets.module.css`). The system is ~two-thirds adopted. Reaching "one unified system" is a **token-substitution sweep**, not a redesign — but it must hit the zero-compliance clusters wholesale.

---

## 2. Shared DNA Inventory (source of truth)

**Tokens — ~195 `--primitive-*`, all defined on `.dashboard`, re-valued under `html[data-primitive-theme="light"]`:**

| Group | Count | Notes |
|---|---|---|
| Color | 24 | Core palette + named brand colors; theme-switched |
| Surface / Card | 40 | Panels, glass, neumorphism, fields, code, nav/chrome, card aliases; theme-switched |
| Typography | 37 | 5 families · 18-step type scale · 5 weights · 5 line-heights · 5 tracking |
| Spacing | 21 | 4px base / 2px micro-step (`-0` … `-24`) — **theme-agnostic** |
| Radius | 9 | `none`→`round` (incl. `pill` 999px, `round` 50%) |
| Motion | 8 | 5 durations · 3 easings |
| Iconography | 7 | 6 sizes + `--primitive-icon-stroke` |
| Component Sizing | 30 | controls, command, icon-buttons, pills, rows, fields, icon-wells, cards, media |
| Brand DNA (carbon/metallic) | 8 | surfaces/buttons consume these, never raw colors |
| Button DNA | 11 | `--primitive-btn-*` → metallic gradients |

Scale tokens (type/space/radius/motion/icon/sizing/brand/button) are **theme-agnostic**; color/surface flip per theme.

**20 Shared Primitives** (`components/primitives/index.ts`, each with its own `*.module.css` consuming only tokens):
`Avatar` · `Chip` · `Kbd`(+`KbdGroup`) · `Skeleton` · `ProgressRadial` · `ProgressLinear` · `StatTile` · `EmptyState` · `Toast` · `Popover` · `Drawer` · `CommandBar` · `TagInput` · `Breadcrumb` · `Pagination` · `CodeBlock` · `QuoteBubble` · `Marquee` · `CountUp` · `ConfettiBurst`.

**Foundation DNA** (`foundation-dna.module.css`): layout shell (`.board`/`.section`/`.sectionHeader`), section type (`.kicker`/`.index`/`.meta`/`.token`/`.rule`/`.note`), grids (`.grid`/`.threeGrid`/`.twoGrid`/`.patternGrid`), neumorphic surface cards (`.card`/`.pattern`/`.sizeGroup`/`.matrix`), chips/tags, full blueprint/wireframe kit, layout-spec diagrams (`.split5050`/`.split6040`/`.split7030`/rail/band/stack), sizing showcase (`--size-box`-driven), token tables, responsive collapse at 1180px/720px.

**Button DNA** (single shared system):
- `components/actions/button-primitive.tsx` → `ActionButton`, `LiquidButton`, `MetalButton` (variants `default|primary|success|error|gold|bronze`).
- `components/button-dna-link.tsx` → `ButtonDnaLink` reference skin: min-height `--primitive-size-command-sm` (44px), `--primitive-radius-sm`, mono/bold/uppercase `--primitive-text-2xs`, glass-over-recessed, hover→`--primitive-btn-primary-bg`, `--primitive-duration-fast`/`--primitive-ease-out`.

**Plus:** shared `PageHeader` (`components/page-header.tsx`), Motion DNA (`components/motion/index.ts` — tokens + 12 wrappers), Typography DNA (`components/typography/index.ts` — 10 font wrappers, 19 role components, `KineticText` engine).

---

## 3. Violation Breakdown

### 3a. Histogram by violation type (counted across all reported findings)

```
raw-spacing            ████████████████████████████████████  ~78 findings  (gap/padding/margin/border-radius/dimension literals)
hardcoded-color        █████████                              ~19 findings  (light-theme re-derivation, content/data colors, collab tones)
non-token-typography   ████████                               ~17 findings  (11/13/14/16/18/22/28/30/34/36px font-size literals)
inline-literal-style   ██                                     ~4  findings  (inline style={{}} px in .tsx + module locals)
```

> *Counts are the explicit per-finding records in the cluster JSON. The aggregate `findings:272` is the full population; the sampled findings above are representative — raw-spacing dominates by a wide margin in every cluster, typically 4–6:1 over color, with typography third. Note: zero `ad-hoc-button` and zero `reimplemented-primitive` findings were reported in covered clusters — the gap is tokens/surfaces, not components.*

**By severity (reported findings):** CRITICAL ≈ 11 (all hardcoded-color, concentrated in `brand-assets` light-theme block + a handful of off-scale `height` dimensions in calendar/chrome/cms cluster) · HIGH = the bulk of raw-spacing + typography · MEDIUM = between-token spacing + a11y-neutral inline px · LOW = a couple of inline `margin:0`.

### 3b. 12 worst-offender areas, ranked by violation density

Density = violating / scanned within the area's cluster (cluster score used where per-area split not isolated).

| # | Area / Cluster | Compliance | Density | Dominant violation |
|---|---|---|---|---|
| 1 | **calendar** (calendar/chrome/cms… cluster) | **0%** | 164/164 violating | raw-spacing (28/22/18/14px epidemic) + off-scale heights (124/132px) |
| 2 | **chrome** | 0% | (cluster 0%) | raw-spacing + non-token type (36/22/14px) + 1480/1280px widths |
| 3 | **cms** | 0% | (cluster 0%) | raw-spacing + 1480px width + 8px dimensions |
| 4 | **commerce** | 0% | (cluster 0%) | raw-spacing + 36px/9px type + 132px thumb |
| 5 | **collab-deep** | 0% | (cluster 0%) | raw-spacing + hardcoded collab tones `#ff8db1`/`#ff9450` + 132px/12px heights |
| 6 | **compliance** | 0% | (cluster 0%) | raw-spacing (28/22/18/14px) |
| 7 | **code-diff** | 0% | (cluster 0%) | raw-spacing + 12.5/21/26px off-scale type + 22/32px control dims |
| 8 | **cloud-costs** | 0% | (cluster 0%) | raw-spacing (CRITICAL layout-shell gaps) + 124px thumb + 30/20/13px type |
| 9 | **ab-runtime / account / accounting** | **3%** | 96/99 violating | raw-spacing + 11px type + 96px/40px/10px/3px hardcoded dimensions |
| 10 | **api-explorer / asset-* / audio / auth / backups / bay-display** | **9.6%** | 122/135 violating | raw-spacing (18/28/14px) + 11/12px type |
| 11 | **crm / customer-portal / content-studio / data-import / dashboards / data-display / customer-success** | 74.6% | 32/126 violating | raw-spacing + 14px radius + raw 240ms motion + 34px type |
| 12 | **file-browser / forms-platform** (forms cluster) | 85% | 14/94 violating | non-token type (11/13/18px) + 18px padding |

**Cleanest clusters (for contrast):** billing/block-editor/booking-widget **98.4%** · db-admin/emails **92.9%** · file-browser/forms **85%** · connectors/crm group **74.6%**.

---

## 4. Rogue Components (consolidated, de-duplicated)

Components that **re-implement DNA values instead of sourcing tokens/primitives.** Paths normalized to repo-relative under `src/app/ui-primitives/`.

**Critical — re-derive theme/color tokens from hardcoded literals:**
- `brand-assets/brand-assets.module.css` — rebuilds the entire light-theme `--primitive-*` block from raw `#000`/`#fff`/`rgba()`/hex (6× CRITICAL). **Highest-priority rogue.**
- `brand-assets/page.tsx` — inline `style={{}}` px (`gap`, `fontSize`) bypassing tokens.

**Content/data colors leaked as locals (promote to `--primitive-*`):**
- `components/docs-suite/api-reference-card.module.css` (`--primitive-method-put: #c084fc`)
- `components/email-builder/click-heat-map.module.css` (`#1f2230`)
- `components/email-builder/footer-assembler.module.css` (`#6b7080`/`#1f2230`/`#fff` + 10px radius / 18px gap)
- `components/email-builder/personalization-token-picker.module.css` (`rgba(170,132,255,…)`)
- `components/email-builder/preheader-editor.module.css` (`#1f2230`/`#0a0a0a`/`#6b7080`/`#fff`)
- `components/emails/email-preview-frame.module.css` (`--email-preview-paper` locals)
- `emails/emails.module.css` (`#fbfaf7`/`#1f2230`/`#cfc8bd`/`#e5e1da`)

**Per-route page CSS re-implementing spacing/type/radius/motion (raw-px, no tokens):**
- `ab-runtime/*` (allocation-slider, decision-recommendation-card, early-stopping-card, experiment-dashboard-card, experiment-history-row, feature-flag-link-row, funnel-impact-row, holdout-audience-card, lift-chart, primary-metric-tile, segment-breakdown-row, srm-warning-banner, stat-sig-calculator, variant-editor-pair)
- `account/*` (api-token-row, audit-log-row, danger-action-card, integration-tile, notification-channel-row, plan-badge, profile-card, session-row, settings-sidebar, team-member-row, usage-meter-card)
- `accounting/account-balance-tile.module.css`
- `admin-hub/daily-summary-card.module.css`, `admin-hub/kpi-tile.module.css`
- `adr-compliance/adr-sound-meter-card.module.css`
- `ai-workflow/agent-loop-card.module.css`
- `api-console/endpoint-card.module.css`
- `crm/crm.module.css`, `customer-portal/customer-portal.module.css`, `content-studio/content-studio.module.css`, `data-import/data-import.module.css`, `dashboards/dashboards.module.css`, `data-display/data-display.module.css`, `customer-success/customer-success.module.css`
- `calendar/calendar.module.css`, `chrome/chrome.module.css`, `cloud-costs/cloud-costs.module.css`, `cms/cms.module.css`, `code-diff/code-diff.module.css`, `collab-deep/collab-deep.module.css`, `comments/comments.module.css`, `commerce/commerce.module.css`, `compliance/compliance.module.css`
- `collab-deep/full-collab/page.tsx` (inline `margin:0`)
- `api-explorer/api-explorer.module.css`, `asset-cdn/asset-cdn.module.css`, `asset-library/asset-library.module.css`, `audio/audio.module.css`, `auth-deep/auth-deep.module.css`, `auth/login/login.module.css`, `auth/onboarding/onboarding.module.css`, `backups/backups.module.css`, `bay-display/bay-display.module.css`
- `forms-platform/forms-platform.module.css`, `file-browser/file-browser.module.css`
- `booking-widget/reschedule-modal/showcase.tsx` (inline px)

> **No rogue *button* components and no rogue *primitive* re-implementations** were found in covered clusters — the 20 primitives and the Button DNA are being reused, not cloned. All rogues are **CSS/inline-style token bypasses.**

---

## 5. Remediation Plan

Three waves, ordered by blast-radius and theme-correctness risk. Each names the concrete swap.

### Wave 1 — CRITICAL: hardcoded colors + theme re-derivation (and any ad-hoc buttons)
*Goal: restore the single color/theme source of truth. These break light-theme and brand fidelity.*

| Target files | Swap |
|---|---|
| `brand-assets/brand-assets.module.css` (6× CRITICAL) | Replace `#000`/`#fff`/raw `rgba()` in the `html[data-primitive-theme="light"]` block with `color-mix(in srgb, var(--primitive-canvas)/var(--primitive-text-strong) …)` derivations; never re-declare a token's value from a literal. Light-theme code/link colors → `var(--primitive-text-strong)` / `color-mix(…var(--primitive-teal))`. |
| `collab-deep/collab-deep.module.css` | `#ff8db1`/`#ff9450` collaborator tones → define `--collab-tone-*` as `color-mix(in oklab, var(--primitive-red) …, var(--primitive-amber))`. |
| Email content-color locals (7 files in §4) | Promote each leaked literal to a named token in `ui-primitives.module.css` (`--primitive-email-paper`, `--primitive-email-thumb-bg`, `--primitive-method-put`, `--primitive-heat-spot-dark-ink`, `--primitive-token-picker-accent`, …) and reference the token everywhere. |
| Buttons | **None found** — Button DNA is clean. No ad-hoc button work in this wave. |

*Ad-hoc buttons were a planned Wave-1 target; the covered audits report none. If the truncated cluster (forms/foundations/hermes) surfaces any, fold them in here.*

### Wave 2 — inline-literal styles + ad-hoc surfaces
*Goal: kill inline `style={{}}` px and surface literals that bypass foundation-dna.*

| Target files | Swap |
|---|---|
| `brand-assets/page.tsx` | Inline `gap`/`fontSize` px → `var(--primitive-space-*)` / `var(--primitive-text-*)`, or move to module CSS using `.card`/foundation classes. |
| `booking-widget/reschedule-modal/showcase.tsx` | `borderRadius:'10px'`→`var(--primitive-radius-md)`; `padding:'10px 16px'`→`var(--primitive-space-2) var(--primitive-space-4)`. |
| `collab-deep/full-collab/page.tsx` | Drop inline `margin:0`; rely on module reset. |
| `footer-assembler.module.css` / `preheader-editor.module.css` toggle/preview rows | `border-radius:10px`→`var(--primitive-radius-md)`; `gap:18px`→`var(--primitive-space-4)`. Recompose ad-hoc preview panels onto foundation `.card`/`.pattern` surfaces where they are chrome (not email-content simulation). |

### Wave 3 — raw spacing / radius / type / motion sweep (highest volume)
*Goal: the mechanical token substitution that lifts the 0–10% clusters. ~78+ raw-spacing findings + typography.*

**Canonical swap table (apply globally):**

| Raw literal | Token |
|---|---|
| `gap/padding 28px` | `var(--primitive-space-7)` |
| `24px` | `var(--primitive-space-6)` |
| `20px` | `var(--primitive-space-5)` |
| `16px` | `var(--primitive-space-4)` |
| `12px` | `var(--primitive-space-3)` |
| `10px` | `var(--primitive-space-2-5)` |
| `8px` | `var(--primitive-space-2)` |
| `6px` | `var(--primitive-space-1-5)` |
| `4px` | `var(--primitive-space-1)` |
| `2px` / 3px indicator | `var(--primitive-space-0-5)` |
| `border-radius 14px` | `var(--primitive-radius-lg)` (12) — confirm intent vs `-xl` (16) |
| `radius 10px` | `var(--primitive-radius-md)` · `radius 50%` → `var(--primitive-radius-round)` |
| `font 11px` | `var(--primitive-text-xs)` (12) / `-2xs` (10) |
| `13px` | `var(--primitive-text-sm)` · `16px`→`-md` · `18px`→`-lg` · `22px`→`-xl` · `28px`→`-2xl` |
| `36px` | `var(--primitive-h3)` · `30/34px` → fluid `clamp()` to nearest `h*` |
| `font-weight:700` | `var(--primitive-weight-bold)` |
| `transition 240ms cubic-bezier(0.16,1,0.3,1)` | `var(--primitive-duration-normal) var(--primitive-ease-out)` |
| icon/control dims `40/32/28/24px` | `--primitive-size-ui-*` / `--primitive-size-icon-button-*` |
| thumb heights `124/132px` | `var(--primitive-media-card)` (168) or `aspect-ratio` (off-scale — see caps) |

**Off-scale values that need a design decision (not a 1:1 swap):**
14px / 18px / 22px gaps & paddings, 124px / 132px / 360px heights, 1280/1480px container widths, 12.5/21/26/30/34px type, 9px micro-type. These sit *between* tokens — either round to the nearest token (preferred) or, if the design genuinely needs them, **add the token to the registry first** (e.g. responsive breakpoint tokens `--primitive-breakpoint-*`, container-width tokens) so the value still routes through the single source.

**Wave-3 file order (by impact):** the 0% cluster first — `calendar`, `chrome`, `cms`, `commerce`, `collab-deep`, `compliance`, `code-diff`, `cloud-costs` — then the 3% `ab-runtime/account/accounting` rogue list, then the 9.6% `api-explorer/asset-*/audio/auth/backups/bay-display` set, then the 74.6% / 85% remainder.

---

### Silent caps / under-covered areas (call-outs)

- **One cluster is truncated in the input** (`file-browser, form-builder, forms-gallery, forms-platform, forms, foundations, help-docs, hermes, hermes-agent` — 94 scanned, 85% score). Only the first ~9 findings are visible; **`foundations`, `hermes`, `hermes-agent`, `form-builder`, `forms-gallery` carry no enumerated findings here** and are effectively uncovered. Re-run that cluster's audit to completion before declaring Wave 3 done.
- **Per-area splits collapse into cluster scores** for the 0% and 9.6% clusters (no per-area breakdown), so individual area density within them is inferred from the cluster, not measured. Worst-offender ranks 1–8 share a single cluster score.
- **`findings:272` aggregate vs. ~118 enumerated** in the JSON: roughly 57% of individual findings are summarized at cluster level, not itemized. The histogram reflects the *pattern* faithfully (raw-spacing-dominant) but exact per-type totals will shift once the full 272 are itemized.
- **`rogueComponents` was empty for the 0% and 9.6% clusters** despite 286 violating components — those rogue lists must be regenerated; §4 lists the *files named in findings*, which undercounts the true rogue set for calendar/chrome/cms/commerce/etc.
- **Button & primitive layers report zero violations** across covered clusters — high confidence the gap is tokens/surfaces only, but confirm against the truncated `foundations`/`hermes` cluster before closing Wave 1.
