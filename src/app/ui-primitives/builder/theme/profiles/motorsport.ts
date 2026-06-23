import type { StyleProfile } from "../profile-types"

/**
 * Motorsport — aggressive race livery. Deep matte-carbon surfaces, hard red
 * and amber accent lines, sharp radii, and snappier motion so interactions
 * feel quick and reactive (like telemetry). The most high-energy profile:
 * accents are loud, edges are tight, transitions are fast.
 */
const motorsport: StyleProfile = {
  id: "motorsport",
  name: "Motorsport",
  description:
    "Aggressive race livery — deep matte carbon, hard red/amber accent lines, sharp edges, and snappy reactive motion.",
  scheme: "dark",
  tokens: {
    // Darker, matte carbon surfaces — less sheen than Carbon Pro.
    "--primitive-panel":
      "color-mix(in oklab, var(--primitive-canvas) 88%, var(--primitive-text-strong) 2%)",
    "--primitive-panel-strong":
      "color-mix(in oklab, var(--primitive-canvas) 78%, var(--primitive-text-strong) 4%)",
    "--primitive-card-bg": "var(--primitive-metallic-black)",
    "--primitive-control-surface":
      "color-mix(in oklab, var(--primitive-canvas) 82%, var(--primitive-text-strong) 4%)",

    // Hard red accent lines — racing-stripe edges.
    "--primitive-line":
      "color-mix(in oklab, var(--primitive-red) 24%, var(--primitive-text-strong) 6%)",
    "--primitive-line-strong":
      "color-mix(in oklab, var(--primitive-red) 40%, var(--primitive-text-strong) 10%)",
    "--primitive-card-border":
      "color-mix(in oklab, var(--primitive-red) 30%, transparent)",

    // Amber meter / progress reads like a tachometer sweep.
    "--primitive-meter-track":
      "color-mix(in oklab, var(--primitive-canvas) 70%, var(--primitive-amber) 8%)",

    // Loud focus + accent glow.
    "--primitive-focus-ring": "var(--primitive-amber)",
    "--primitive-focus-shadow":
      "0 0 0 3px color-mix(in oklab, var(--primitive-amber) 40%, transparent)",

    // Sharp, tight radii — no soft corners.
    "--primitive-btn-radius": "var(--primitive-radius-xs)",

    // Snappier motion across the board.
    "--primitive-duration-normal": "var(--primitive-duration-fast)",
    "--primitive-duration-slow": "var(--primitive-duration-normal)",
    "--primitive-ease-standard": "var(--primitive-ease-in-out)",

    // Tighter heading tracking for a stamped, technical feel.
    "--primitive-tracking-wide": "var(--primitive-tracking-wider)",

    // CTAs stay metallic red → amber, the brand signature.
    "--primitive-btn-primary-bg": "var(--primitive-metallic-red)",
    "--primitive-btn-primary-hover-bg": "var(--primitive-metallic-amber)",
  },
}

export default motorsport
