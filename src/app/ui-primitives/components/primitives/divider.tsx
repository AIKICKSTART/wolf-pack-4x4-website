import type { CSSProperties } from "react"

import styles from "./divider.module.css"

/**
 * Divider — the shared separator primitive for the Oak Flats Mufflermen
 * UI-primitives system (Carbon & Red DNA).
 *
 * A token-driven hairline rule. The horizontal variant can split around a
 * centered mono-uppercase label chip; accent tones tint the rule with a
 * subtle directional fade. Decorative by default (role="presentation"); set
 * `decorative={false}` to expose it as a real `separator` with the correct
 * aria-orientation.
 *
 * @example
 * // Plain horizontal rule
 * <Divider />
 *
 * @example
 * // Labeled section break, red-toned, exposed to AT
 * <Divider label="Service Bay" tone="red" decorative={false} />
 *
 * @example
 * // Inset vertical rule between toolbar groups
 * <div style={{ display: "flex", height: 28 }}>
 *   <span>A</span>
 *   <Divider orientation="vertical" inset />
 *   <span>B</span>
 * </div>
 */

export type DividerOrientation = "horizontal" | "vertical"
export type DividerTone = "line" | "red" | "amber" | "teal" | "green"

interface DividerProps {
  orientation?: DividerOrientation
  /** Centered text chip; horizontal orientation only. */
  label?: string
  tone?: DividerTone
  /** Pulls the rule away from its container edges. */
  inset?: boolean
  /** When false, exposes role="separator" + aria-orientation to AT. */
  decorative?: boolean
  className?: string
}

const TONE_VAR: Record<DividerTone, string> = {
  line: "var(--primitive-line-strong)",
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
}

const TONE_CLASS: Record<DividerTone, string> = {
  line: styles.toneLine,
  red: styles.toneAccent,
  amber: styles.toneAccent,
  teal: styles.toneAccent,
  green: styles.toneAccent,
}

export function Divider({
  orientation = "horizontal",
  label,
  tone = "line",
  inset = false,
  decorative = true,
  className,
}: DividerProps) {
  const isVertical = orientation === "vertical"
  const hasLabel = !isVertical && Boolean(label)

  const classes = [
    styles.root,
    isVertical ? styles.vertical : styles.horizontal,
    TONE_CLASS[tone],
    hasLabel && styles.labeled,
    inset && styles.inset,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  // Decorative → fully hidden from AT. Otherwise a real separator that must
  // declare its orientation per the ARIA spec.
  const semantics = decorative
    ? ({ role: "presentation" } as const)
    : ({ role: "separator", "aria-orientation": orientation } as const)

  if (hasLabel) {
    return (
      <div
        className={classes}
        style={{ "--divider-tone": TONE_VAR[tone] } as CSSProperties}
        {...semantics}
      >
        <span className={styles.rule} aria-hidden="true" />
        <span className={styles.label}>{label}</span>
        <span className={styles.rule} aria-hidden="true" />
      </div>
    )
  }

  return (
    <div
      className={classes}
      style={{ "--divider-tone": TONE_VAR[tone] } as CSSProperties}
      {...semantics}
    >
      <span className={styles.rule} aria-hidden="true" />
    </div>
  )
}

export default Divider
