import type { StyleProfile } from "../profile-types"

/**
 * Neo Workshop — neumorphic, soft-extruded controls. Surfaces share the canvas
 * tone and gain depth purely from dual-light inset/extrude shadows (raised and
 * pressed). Contrast is pushed so the embossed forms stay legible; accents stay
 * red/amber but sit quietly under the sculpted surfaces.
 */
const neoWorkshop: StyleProfile = {
  id: "neo-workshop",
  name: "Neo Workshop",
  description:
    "Neumorphic soft-extruded controls — raised and pressed surfaces sculpted from dual-light inset shadows, strong contrast, quiet red/amber accents.",
  scheme: "dark",
  tokens: {
    // Surfaces match the canvas so depth comes only from light, not fills.
    "--primitive-panel": "var(--primitive-canvas)",
    "--primitive-panel-strong":
      "color-mix(in oklab, var(--primitive-canvas) 92%, var(--primitive-text-strong) 4%)",
    "--primitive-card-bg": "var(--primitive-canvas)",
    "--primitive-control-surface": "var(--primitive-canvas)",
    "--primitive-control-active":
      "color-mix(in oklab, var(--primitive-canvas) 88%, var(--primitive-red) 12%)",

    // Stronger dual-light so the extrude reads clearly.
    "--primitive-neumo-light":
      "color-mix(in oklab, var(--primitive-text-strong) 12%, transparent)",
    "--primitive-neumo-dark":
      "color-mix(in oklab, var(--primitive-canvas) 0%, transparent 44%)",

    // Raised + pressed: cards/buttons use the inset extrude shadow pair.
    "--primitive-shadow-raised":
      "8px 8px 18px var(--primitive-neumo-dark), -8px -8px 18px var(--primitive-neumo-light)",
    "--primitive-card-shadow":
      "8px 8px 18px var(--primitive-neumo-dark), -8px -8px 18px var(--primitive-neumo-light)",
    "--primitive-card-hover-shadow":
      "10px 10px 24px var(--primitive-neumo-dark), -10px -10px 24px var(--primitive-neumo-light)",
    "--primitive-surface-shadow":
      "inset 6px 6px 12px var(--primitive-neumo-dark), inset -6px -6px 12px var(--primitive-neumo-light)",

    // Hairlines nearly vanish — the form is the shadow, not the border.
    "--primitive-line":
      "color-mix(in oklab, var(--primitive-text-strong) 6%, transparent)",
    "--primitive-card-border": "transparent",

    // Higher text contrast keeps embossed labels readable.
    "--primitive-body":
      "color-mix(in oklab, var(--primitive-text-strong) 82%, var(--primitive-canvas))",

    // Soft, pillowy radii.
    "--primitive-btn-radius": "var(--primitive-radius-xl)",

    "--primitive-focus-ring": "var(--primitive-red)",
    "--primitive-focus-shadow":
      "0 0 0 3px color-mix(in oklab, var(--primitive-red) 30%, transparent)",
  },
}

export default neoWorkshop
