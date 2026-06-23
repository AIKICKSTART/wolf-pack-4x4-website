import type { StyleProfile } from "../profile-types"

/**
 * Glass Garage — frosted, layered transparency. Surfaces become translucent
 * glass with soft hairlines and floating shadows; red/yellow accents glow
 * through the frost. Radii open up, motion eases longer, and panels read as
 * stacked sheets of tinted glass over the canvas.
 */
const glassGarage: StyleProfile = {
  id: "glass-garage",
  name: "Glass Garage",
  description:
    "Frosted layered transparency — translucent glass panels, soft hairlines, floating shadows, red/yellow accents glowing through the frost.",
  scheme: "dark",
  tokens: {
    // Panels become tinted glass sheets rather than solid metal.
    "--primitive-panel":
      "color-mix(in oklab, var(--primitive-glass-strong) 80%, transparent)",
    "--primitive-panel-strong":
      "color-mix(in oklab, var(--primitive-glass-strong) 92%, transparent)",
    "--primitive-surface-3": "var(--primitive-glass-soft)",
    "--primitive-card-bg":
      "linear-gradient(145deg, var(--primitive-glass-strong), var(--primitive-glass-soft))",
    "--primitive-control-surface":
      "linear-gradient(145deg, var(--primitive-glass-strong), transparent)",

    // Hairlines soften; the frost carries the edge instead of a hard line.
    "--primitive-line":
      "color-mix(in oklab, var(--primitive-text-strong) 12%, transparent)",
    "--primitive-line-strong":
      "color-mix(in oklab, var(--primitive-text-strong) 20%, transparent)",
    "--primitive-line-muted":
      "color-mix(in oklab, var(--primitive-text-strong) 6%, transparent)",

    // Floating glass shadows — wider, softer drops.
    "--primitive-shadow-soft":
      "0 18px 60px color-mix(in oklab, var(--primitive-canvas) 70%, transparent)",
    "--primitive-shadow-deep":
      "0 44px 130px color-mix(in oklab, var(--primitive-canvas) 78%, transparent)",
    "--primitive-card-shadow":
      "0 18px 60px color-mix(in oklab, var(--primitive-canvas) 70%, transparent)",

    // Accents glow through: red/amber tints picked up by focus + cards.
    "--primitive-focus-ring": "var(--primitive-amber)",
    "--primitive-focus-shadow":
      "0 0 0 3px color-mix(in oklab, var(--primitive-amber) 30%, transparent)",
    "--primitive-card-border":
      "color-mix(in oklab, var(--primitive-red) 22%, var(--primitive-glass-strong))",

    // Open, rounded glass radii.
    "--primitive-btn-radius": "var(--primitive-radius-lg)",

    // Slightly slower easing reads as glass settling into place.
    "--primitive-duration-normal": "var(--primitive-duration-slow)",
    "--primitive-ease-standard": "var(--primitive-ease-out)",
  },
}

export default glassGarage
