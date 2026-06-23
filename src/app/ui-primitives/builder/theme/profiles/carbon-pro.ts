import type { StyleProfile } from "../profile-types"

/**
 * Carbon Pro — the house default. Machined carbon-fibre surfaces, metallic
 * black panels, metallic-red CTAs, metallic-amber (yellow) hover, chrome
 * hairlines. This is the canonical Mufflermen look, so its overrides mostly
 * re-state the central DNA tokens to make the profile explicit and to give
 * the other profiles a clear baseline to diverge from.
 */
const carbonPro: StyleProfile = {
  id: "carbon-pro",
  name: "Carbon Pro",
  description:
    "Machined carbon-fibre surfaces, metallic-black panels, metallic-red CTAs with amber hover, and chrome hairlines.",
  scheme: "dark",
  tokens: {
    // Surfaces lean on the carbon weave + metallic black for a milled feel.
    "--primitive-panel":
      "color-mix(in oklab, var(--primitive-canvas) 78%, var(--primitive-text-strong) 4%)",
    "--primitive-panel-strong":
      "color-mix(in oklab, var(--primitive-canvas) 64%, var(--primitive-text-strong) 7%)",
    "--primitive-card-bg": "var(--primitive-metallic-black)",
    "--primitive-control-surface":
      "color-mix(in oklab, var(--primitive-canvas) 70%, var(--primitive-text-strong) 6%)",

    // Chrome hairlines — brighter, more metallic than the default.
    "--primitive-line":
      "color-mix(in oklab, var(--primitive-text-strong) 16%, transparent)",
    "--primitive-line-strong":
      "color-mix(in oklab, var(--primitive-text-strong) 28%, transparent)",

    // Focus picks up the brand red so the whole console reads red/black/chrome.
    "--primitive-focus-ring": "var(--primitive-red)",
    "--primitive-focus-shadow":
      "0 0 0 3px color-mix(in oklab, var(--primitive-red) 32%, transparent)",

    // Carbon body, metallic-red primary, amber hover — re-stated explicitly.
    "--primitive-btn-secondary-bg": "var(--primitive-metallic-black)",
    "--primitive-btn-primary-bg": "var(--primitive-metallic-red)",
    "--primitive-btn-primary-hover-bg": "var(--primitive-metallic-amber)",
    "--primitive-btn-radius": "var(--primitive-radius-sm)",

    // Tighter, more industrial radii across cards/nav.
    "--primitive-card-border":
      "color-mix(in oklab, var(--primitive-text-strong) 18%, transparent)",
  },
}

export default carbonPro
