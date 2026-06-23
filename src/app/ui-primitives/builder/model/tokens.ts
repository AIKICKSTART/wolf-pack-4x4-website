/**
 * Token reference contract for the builder data model.
 *
 * TOKEN-DRIVEN ONLY: blocks never carry raw color/size/space/radius/motion
 * values. A block declares the central `--primitive-*` CSS custom properties it
 * depends on (its `tokenDependencies`) using the string names below. The
 * renderer maps these to `var(--primitive-*)` at paint time, so re-theming the
 * central token block in `ui-primitives.module.css` re-themes every block.
 *
 * See `docs/tokenization-sweep-contract.md` for the single source of truth.
 */

/** A `--primitive-*` custom-property name (without the `var(...)` wrapper). */
export type PrimitiveTokenName = `--primitive-${string}`

/**
 * The categories a token belongs to. Used to validate that a block only
 * declares dependencies of the kinds it actually consumes, and to group the
 * theme/style picker.
 */
export type TokenCategory =
  | "color"
  | "typography"
  | "radius"
  | "space"
  | "motion"
  | "icon"
  | "shadow"
  | "texture"
  | "button"

/**
 * A declared dependency on one central token. The builder treats this as
 * read-only metadata — it documents what the block reads, never a literal.
 */
export interface TokenDependency {
  /** The `--primitive-*` custom property the block reads. */
  token: PrimitiveTokenName
  category: TokenCategory
  /** What the token drives in this block, e.g. "card background". */
  usage: string
}

/**
 * The well-known central token names, grouped by category. This is the
 * vocabulary a block author selects from; it mirrors the `.dashboard` token
 * block. Not exhaustive of every alias, but covers the documented contract.
 */
export const PRIMITIVE_TOKENS: Readonly<Record<TokenCategory, readonly PrimitiveTokenName[]>> = {
  color: [
    "--primitive-canvas",
    "--primitive-panel",
    "--primitive-panel-strong",
    "--primitive-card-bg",
    "--primitive-line",
    "--primitive-line-strong",
    "--primitive-line-muted",
    "--primitive-glass-soft",
    "--primitive-glass-strong",
    "--primitive-body",
    "--primitive-muted",
    "--primitive-text-strong",
    "--primitive-text-on-accent",
    "--primitive-red",
    "--primitive-red-dark",
    "--primitive-amber",
    "--primitive-teal",
    "--primitive-green",
    "--primitive-field-bg",
    "--primitive-field-hover",
    "--primitive-field-strong",
    "--primitive-overlay",
    "--primitive-media-overlay",
    "--primitive-recessed",
    "--primitive-focus-ring",
    "--primitive-focus-shadow",
  ],
  typography: [
    "--primitive-font-display",
    "--primitive-font-body",
    "--primitive-font-mono",
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
    "--primitive-weight-regular",
    "--primitive-weight-medium",
    "--primitive-weight-semibold",
    "--primitive-weight-bold",
    "--primitive-weight-black",
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
  ],
  radius: [
    "--primitive-radius-none",
    "--primitive-radius-xs",
    "--primitive-radius-sm",
    "--primitive-radius-md",
    "--primitive-radius-lg",
    "--primitive-radius-xl",
    "--primitive-radius-2xl",
    "--primitive-radius-pill",
    "--primitive-radius-round",
  ],
  space: [
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
  ],
  motion: [
    "--primitive-duration-instant",
    "--primitive-duration-fast",
    "--primitive-duration-normal",
    "--primitive-duration-slow",
    "--primitive-duration-slower",
    "--primitive-ease-out",
    "--primitive-ease-in-out",
    "--primitive-ease-standard",
  ],
  icon: [
    "--primitive-icon-xs",
    "--primitive-icon-sm",
    "--primitive-icon-md",
    "--primitive-icon-lg",
    "--primitive-icon-xl",
    "--primitive-icon-2xl",
    "--primitive-icon-stroke",
    "--primitive-icon-obsidian",
  ],
  shadow: [
    "--primitive-shadow-soft",
    "--primitive-shadow-deep",
    "--primitive-shadow-raised",
    "--primitive-shadow-inset",
    "--primitive-surface-shadow",
    "--primitive-surface-hover-shadow",
    "--primitive-card-shadow",
    "--primitive-card-hover-shadow",
  ],
  texture: [
    "--primitive-carbon-weave",
    "--primitive-metallic-red",
    "--primitive-metallic-amber",
    "--primitive-metallic-black",
    "--primitive-metallic-sheen",
    "--primitive-texture-stroke",
  ],
  button: [
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
  ],
} as const

/** Every known central token, flattened. */
export const ALL_PRIMITIVE_TOKENS: readonly PrimitiveTokenName[] = Object.values(
  PRIMITIVE_TOKENS,
).flat()

/** Type guard: is this string a recognised central token? */
export function isPrimitiveToken(value: string): value is PrimitiveTokenName {
  return ALL_PRIMITIVE_TOKENS.includes(value as PrimitiveTokenName)
}

/** Wrap a token name in a `var(...)` reference for inline styles. */
export function tokenVar(token: PrimitiveTokenName): string {
  return `var(${token})`
}
