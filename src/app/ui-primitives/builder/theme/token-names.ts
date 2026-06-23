/**
 * Canonical `--primitive-*` token names.
 *
 * This is the single allow-list of CSS custom properties a style profile may
 * override. The values mirror the `.dashboard` token block in
 * `src/app/ui-primitives/ui-primitives.module.css` — this module owns ONLY the
 * names, never the values. A profile is a partial map from one of these names
 * to a value (which itself must reference other `--primitive-*` tokens or sit
 * inside a `color-mix(... var(--primitive-*) ...)`), so the system stays
 * token-driven end to end.
 */

export const PRIMITIVE_TOKEN_NAMES = [
  // ---- Surfaces / canvas -------------------------------------------------
  "--primitive-canvas",
  "--primitive-panel",
  "--primitive-panel-strong",
  "--primitive-surface-1",
  "--primitive-surface-2",
  "--primitive-surface-3",
  "--primitive-surface-hover",
  "--primitive-dashboard-background",
  "--primitive-sidebar-background",
  "--primitive-footer-surface",
  "--primitive-recessed",
  "--primitive-code-bg",
  "--primitive-code-fg",

  // ---- Lines / hairlines -------------------------------------------------
  "--primitive-line",
  "--primitive-line-strong",
  "--primitive-line-muted",
  "--primitive-texture-stroke",

  // ---- Glass / neumorphic ------------------------------------------------
  "--primitive-glass-soft",
  "--primitive-glass-strong",
  "--primitive-neumo-light",
  "--primitive-neumo-dark",

  // ---- Shadows -----------------------------------------------------------
  "--primitive-shadow-soft",
  "--primitive-shadow-deep",
  "--primitive-shadow-raised",
  "--primitive-shadow-inset",
  "--primitive-shadow-outline",
  "--primitive-surface-shadow",
  "--primitive-surface-hover-shadow",

  // ---- Text colours ------------------------------------------------------
  "--primitive-body",
  "--primitive-muted",
  "--primitive-text-strong",
  "--primitive-text-on-accent",

  // ---- Brand / accent colours -------------------------------------------
  "--primitive-red",
  "--primitive-red-dark",
  "--primitive-amber",
  "--primitive-teal",
  "--primitive-green",

  // ---- Fields ------------------------------------------------------------
  "--primitive-field-bg",
  "--primitive-field-hover",
  "--primitive-field-strong",

  // ---- Overlays / scrims -------------------------------------------------
  "--primitive-overlay",
  "--primitive-media-overlay",

  // ---- Focus -------------------------------------------------------------
  "--primitive-focus-ring",
  "--primitive-focus-shadow",

  // ---- Shimmer / loading -------------------------------------------------
  "--primitive-shimmer-base",
  "--primitive-shimmer-peak",

  // ---- Nav / chrome ------------------------------------------------------
  "--primitive-nav-border",
  "--primitive-nav-surface",
  "--primitive-nav-hover-surface",
  "--primitive-nav-active-surface",
  "--primitive-control-surface",
  "--primitive-control-active",
  "--primitive-meter-track",

  // ---- Cards -------------------------------------------------------------
  "--primitive-card-bg",
  "--primitive-card-border",
  "--primitive-card-shadow",
  "--primitive-card-hover-shadow",

  // ---- Icons -------------------------------------------------------------
  "--primitive-icon-obsidian",
  "--primitive-icon-xs",
  "--primitive-icon-sm",
  "--primitive-icon-md",
  "--primitive-icon-lg",
  "--primitive-icon-xl",
  "--primitive-icon-2xl",
  "--primitive-icon-stroke",

  // ---- Typography: families ---------------------------------------------
  "--primitive-font-display",
  "--primitive-font-display-alt",
  "--primitive-font-body",
  "--primitive-font-mono",
  "--primitive-font-mono-techno",

  // ---- Typography: sizes -------------------------------------------------
  "--primitive-display",
  "--primitive-h1",
  "--primitive-h2",
  "--primitive-h3",
  "--primitive-h4",
  "--primitive-h5",
  "--primitive-h6",
  "--primitive-text-2xs",
  "--primitive-text-xs",
  "--primitive-text-sm",
  "--primitive-text-base",
  "--primitive-text-md",
  "--primitive-text-lg",
  "--primitive-text-xl",
  "--primitive-text-2xl",
  "--primitive-text-3xl",

  // ---- Typography: weights ----------------------------------------------
  "--primitive-weight-regular",
  "--primitive-weight-medium",
  "--primitive-weight-semibold",
  "--primitive-weight-bold",
  "--primitive-weight-black",

  // ---- Typography: leading / tracking -----------------------------------
  "--primitive-leading-none",
  "--primitive-leading-tight",
  "--primitive-leading-snug",
  "--primitive-leading-normal",
  "--primitive-leading-relaxed",
  "--primitive-tracking-tight",
  "--primitive-tracking-normal",
  "--primitive-tracking-wide",
  "--primitive-tracking-wider",
  "--primitive-tracking-widest",

  // ---- Spacing scale -----------------------------------------------------
  "--primitive-space-0",
  "--primitive-space-px",
  "--primitive-space-0-5",
  "--primitive-space-1",
  "--primitive-space-1-5",
  "--primitive-space-2",
  "--primitive-space-2-5",
  "--primitive-space-3",
  "--primitive-space-4",
  "--primitive-space-5",
  "--primitive-space-6",
  "--primitive-space-7",
  "--primitive-space-8",
  "--primitive-space-9",
  "--primitive-space-10",
  "--primitive-space-11",
  "--primitive-space-12",
  "--primitive-space-14",
  "--primitive-space-16",
  "--primitive-space-20",
  "--primitive-space-24",

  // ---- Radius scale ------------------------------------------------------
  "--primitive-radius-none",
  "--primitive-radius-xs",
  "--primitive-radius-sm",
  "--primitive-radius-md",
  "--primitive-radius-lg",
  "--primitive-radius-xl",
  "--primitive-radius-2xl",
  "--primitive-radius-pill",
  "--primitive-radius-round",

  // ---- Motion ------------------------------------------------------------
  "--primitive-duration-instant",
  "--primitive-duration-fast",
  "--primitive-duration-normal",
  "--primitive-duration-slow",
  "--primitive-duration-slower",
  "--primitive-ease-out",
  "--primitive-ease-in-out",
  "--primitive-ease-standard",

  // ---- Carbon / metallic brand DNA --------------------------------------
  "--primitive-carbon-weave",
  "--primitive-carbon-weave-size",
  "--primitive-metallic-red",
  "--primitive-metallic-amber",
  "--primitive-metallic-black",
  "--primitive-metallic-sheen",

  // ---- Button DNA --------------------------------------------------------
  "--primitive-btn-radius",
  "--primitive-btn-primary-bg",
  "--primitive-btn-primary-fg",
  "--primitive-btn-primary-hover-bg",
  "--primitive-btn-primary-hover-fg",
  "--primitive-btn-primary-shadow",
  "--primitive-btn-primary-hover-shadow",
  "--primitive-btn-secondary-bg",
  "--primitive-btn-secondary-fg",
  "--primitive-btn-secondary-border",
] as const

/** A single overridable `--primitive-*` custom-property name. */
export type PrimitiveTokenName = (typeof PRIMITIVE_TOKEN_NAMES)[number]

/** Fast membership set for runtime validation of incoming override maps. */
const TOKEN_NAME_SET: ReadonlySet<string> = new Set(PRIMITIVE_TOKEN_NAMES)

/** Narrows an arbitrary string to a known `--primitive-*` token name. */
export function isPrimitiveTokenName(value: string): value is PrimitiveTokenName {
  return TOKEN_NAME_SET.has(value)
}
