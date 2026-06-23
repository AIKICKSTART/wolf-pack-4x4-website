/**
 * Central motion manifest for the umbrella motion system.
 *
 * Every motion primitive in this folder consumes from here. Editing one
 * easing/duration cascades through the entire subtree wrapped by MotionConfig.
 */

/** Cubic-bezier control tuple — [x1, y1, x2, y2]. */
export type CubicBezier = readonly [number, number, number, number]

export interface EasingTokens {
  /** Balanced ease for ambient motion. */
  readonly standard: CubicBezier
  /** Quick deceleration into a rest state. */
  readonly decel: CubicBezier
  /** Sharp acceleration out of a rest state. */
  readonly accel: CubicBezier
  /** Emphasised pop with a small overshoot tail. */
  readonly emphasized: CubicBezier
  /** Springy overshoot for celebratory micro-motion. */
  readonly bounce: CubicBezier
}

export const easings: EasingTokens = {
  standard: [0.32, 0.72, 0.24, 1],
  decel: [0.16, 1, 0.3, 1],
  accel: [0.55, 0, 0.7, 0.2],
  emphasized: [0.2, 0.8, 0.2, 1.05],
  bounce: [0.34, 1.56, 0.64, 1],
}

export interface DurationTokens {
  /** Instant — sub-perceptual feedback. */
  readonly instant: number
  /** Fast — taps and quick hovers. */
  readonly fast: number
  /** Normal — default for component-level motion. */
  readonly normal: number
  /** Slow — section reveals. */
  readonly slow: number
  /** Hero — page-load grand entrance. */
  readonly hero: number
}

/** All durations expressed in milliseconds. */
export const durations: DurationTokens = {
  instant: 100,
  fast: 180,
  normal: 240,
  slow: 380,
  hero: 720,
}

/**
 * A framer-motion `Transition`-shaped preset. Kept as a structural type so
 * primitives can drop it directly into `transition` props without importing
 * heavy framer-motion types at the token site.
 */
export interface TransitionPreset {
  readonly duration: number
  readonly ease: CubicBezier
}

export interface TransitionTokens {
  /** Snap — fast + accel, for press feedback. */
  readonly snap: TransitionPreset
  /** Smooth — normal + standard, the default. */
  readonly smooth: TransitionPreset
  /** Hero — hero + decel, used for page reveals. */
  readonly hero: TransitionPreset
  /** Micro — instant + standard, used for tiny state flips. */
  readonly micro: TransitionPreset
}

export const transitions: TransitionTokens = {
  snap: {
    duration: durations.fast / 1000,
    ease: easings.accel,
  },
  smooth: {
    duration: durations.normal / 1000,
    ease: easings.standard,
  },
  hero: {
    duration: durations.hero / 1000,
    ease: easings.decel,
  },
  micro: {
    duration: durations.instant / 1000,
    ease: easings.standard,
  },
}

export type EasingTokenId = keyof EasingTokens
export type DurationTokenId = keyof DurationTokens
export type TransitionTokenId = keyof TransitionTokens

/** Format an easing tuple as a CSS `cubic-bezier(...)` value. */
export function formatEasing(easing: CubicBezier): string {
  return `cubic-bezier(${easing.join(", ")})`
}
