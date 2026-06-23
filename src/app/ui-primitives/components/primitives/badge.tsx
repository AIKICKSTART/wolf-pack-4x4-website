import type { CSSProperties, ReactNode } from "react"

import styles from "./badge.module.css"

/**
 * Badge — premium status / label indicator (Carbon & Red DNA).
 *
 * Pill-shaped tone chip in three depth treatments: `solid` (filled, on-accent
 * fg), `soft` (~14% tinted bg + tone fg) and `outline` (tone border + tone fg).
 * Optional leading status dot and lucide leading icon. Token-only styling gives
 * automatic light/dark parity.
 *
 * `StatusDot` is the standalone sibling: a bare tone dot with an optional
 * animated pulse ring (reduced-motion-safe) for live / synced / error markers.
 *
 * @example
 * <Badge tone="green" variant="soft" dot>Synced</Badge>
 * <Badge tone="red" variant="solid" leadingIcon={<TriangleAlert />}>Error</Badge>
 * <Badge tone="teal" variant="outline" size="sm">Live</Badge>
 *
 * <StatusDot tone="green" pulse aria-label="Live" />
 */

export type BadgeTone =
  | "red"
  | "amber"
  | "teal"
  | "green"
  | "neutral"
  | "violet"

export type BadgeVariant = "solid" | "soft" | "outline"
export type BadgeSize = "sm" | "md"

interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  variant?: BadgeVariant
  size?: BadgeSize
  /** Leading status dot (inherits the badge tone). */
  dot?: boolean
  /** Optional leading lucide icon (rendered decorative, aria-hidden). */
  leadingIcon?: ReactNode
  /** Accessible label when the badge content is non-textual. */
  "aria-label"?: string
  className?: string
}

interface StatusDotProps {
  tone?: BadgeTone
  /** Animated ring pulse — used for live / active markers. */
  pulse?: boolean
  size?: BadgeSize
  /** Required: the dot is decorative without it. */
  "aria-label"?: string
  className?: string
}

const TONE_VAR: Record<BadgeTone, string> = {
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
  violet: "var(--primitive-violet)",
  neutral: "var(--primitive-icon-obsidian)",
}

/**
 * On-solid ink per tone. Light tones (amber/teal/green/neutral) need dark ink
 * for readable contrast; deep tones (red/violet) keep the on-accent token.
 */
const SOLID_INK_VAR: Record<BadgeTone, string> = {
  red: "var(--primitive-text-on-accent)",
  violet: "var(--primitive-text-on-accent)",
  amber: "var(--primitive-canvas)",
  teal: "var(--primitive-canvas)",
  green: "var(--primitive-canvas)",
  neutral: "var(--primitive-canvas)",
}

const VARIANT_CLASS: Record<BadgeVariant, string> = {
  solid: styles.solid,
  soft: styles.soft,
  outline: styles.outline,
}

const SIZE_CLASS: Record<BadgeSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
}

export function Badge({
  children,
  tone = "neutral",
  variant = "soft",
  size = "md",
  dot = false,
  leadingIcon,
  "aria-label": ariaLabel,
  className,
}: BadgeProps) {
  const classes = [
    styles.badge,
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <span
      className={classes}
      style={
        {
          "--badge-tone": TONE_VAR[tone],
          "--badge-on-solid": SOLID_INK_VAR[tone],
        } as CSSProperties
      }
      aria-label={ariaLabel}
    >
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {leadingIcon && (
        <span className={styles.icon} aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      <span className={styles.label}>{children}</span>
    </span>
  )
}

export function StatusDot({
  tone = "neutral",
  pulse = false,
  size = "md",
  "aria-label": ariaLabel,
  className,
}: StatusDotProps) {
  const classes = [
    styles.statusDot,
    SIZE_CLASS[size],
    pulse && styles.pulse,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <span
      className={classes}
      style={{ "--badge-tone": TONE_VAR[tone] } as CSSProperties}
      role="status"
      aria-label={ariaLabel}
    >
      <span className={styles.statusCore} aria-hidden="true" />
    </span>
  )
}

export default Badge
