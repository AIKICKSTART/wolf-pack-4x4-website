import type { StyleProfile } from "../profile-types"

/**
 * Clean Light — premium light mode. Sets the light colour scheme (the
 * primitives CSS swaps every base value to its light counterpart via
 * `data-primitive-theme="light"`) and layers a refined editorial treatment:
 * airy panels, crisp thin hairlines, restrained shadows, and red/amber
 * accents kept disciplined against the pale canvas.
 */
const cleanLight: StyleProfile = {
  id: "clean-light",
  name: "Clean Light",
  description:
    "Premium light mode — airy panels, crisp hairlines, restrained shadows, and disciplined red/amber accents on a pale editorial canvas.",
  scheme: "light",
  tokens: {
    // Brighter, near-white panels lifted off the canvas.
    "--primitive-panel":
      "color-mix(in oklab, var(--primitive-text-strong) 4%, var(--primitive-canvas))",
    "--primitive-panel-strong":
      "color-mix(in oklab, var(--primitive-text-strong) 1%, var(--primitive-canvas))",
    "--primitive-card-bg":
      "color-mix(in oklab, var(--primitive-text-strong) 2%, var(--primitive-canvas))",
    "--primitive-control-surface":
      "color-mix(in oklab, var(--primitive-text-strong) 3%, var(--primitive-canvas))",

    // Crisp thin hairlines — editorial rule lines.
    "--primitive-line":
      "color-mix(in oklab, var(--primitive-text-strong) 12%, transparent)",
    "--primitive-line-strong":
      "color-mix(in oklab, var(--primitive-text-strong) 22%, transparent)",
    "--primitive-card-border":
      "color-mix(in oklab, var(--primitive-text-strong) 12%, transparent)",

    // Restrained, soft daylight shadows.
    "--primitive-shadow-soft":
      "0 12px 32px color-mix(in oklab, var(--primitive-text-strong) 10%, transparent)",
    "--primitive-shadow-deep":
      "0 28px 70px color-mix(in oklab, var(--primitive-text-strong) 14%, transparent)",
    "--primitive-card-shadow":
      "0 12px 32px color-mix(in oklab, var(--primitive-text-strong) 8%, transparent)",

    // Disciplined accent — red focus ring, soft tint.
    "--primitive-focus-ring": "var(--primitive-red)",
    "--primitive-focus-shadow":
      "0 0 0 3px color-mix(in oklab, var(--primitive-red) 22%, transparent)",

    // Calm, slightly rounded radii suit the light surfaces.
    "--primitive-btn-radius": "var(--primitive-radius-md)",
  },
}

export default cleanLight
