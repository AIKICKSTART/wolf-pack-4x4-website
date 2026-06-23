"use client"

import { useId } from "react"

import styles from "./torque-mascot.module.css"
import {
  TORQUE_STATE_PHRASE,
  type TorqueMascotBadgeProps,
  type TorqueMascotProps,
  type TorqueMascotSize,
  type TorqueMascotState,
} from "./torque-mascot-types"

const SIZE_CLASS: Record<TorqueMascotSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
}

const STATE_CLASS: Record<TorqueMascotState, string> = {
  idle: styles.stateIdle,
  thinking: styles.stateThinking,
  typing: styles.stateTyping,
  working: styles.stateWorking,
  analysing: styles.stateAnalysing,
  generating: styles.stateGenerating,
  deploying: styles.stateDeploying,
  approval: styles.stateApproval,
  warning: styles.stateWarning,
  success: styles.stateSuccess,
}

const BADGE_ACCENT_CLASS: Record<TorqueMascotState, string> = {
  idle: styles.badgeAccentIdle,
  thinking: styles.badgeAccentThinking,
  typing: styles.badgeAccentTyping,
  working: styles.badgeAccentWorking,
  analysing: styles.badgeAccentAnalysing,
  generating: styles.badgeAccentGenerating,
  deploying: styles.badgeAccentDeploying,
  approval: styles.badgeAccentApproval,
  warning: styles.badgeAccentWarning,
  success: styles.badgeAccentSuccess,
}

function buildAriaLabel(state: TorqueMascotState, label?: string): string {
  const who = label && label.trim().length > 0 ? label.trim() : "Torque"
  return `${who}, your Mufflermen assistant — ${TORQUE_STATE_PHRASE[state]}`
}

function cx(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(" ")
}

/**
 * Torque — the customer-facing Mufflermen AI-assistant avatar.
 * A premium chrome + matte-black mechanic robot rendered from
 * SVG shapes. Each `state` gets a distinct, compositor-friendly
 * animation, fully neutralised under prefers-reduced-motion.
 */
export function TorqueMascot({
  state,
  size = "md",
  label,
  className,
}: TorqueMascotProps) {
  const uid = useId().replace(/:/g, "")
  const bodyGrad = `tm-body-${uid}`
  const chromeGrad = `tm-chrome-${uid}`
  const eyeGrad = `tm-eye-${uid}`
  const redGrad = `tm-red-${uid}`

  return (
    <span
      className={cx(styles.root, SIZE_CLASS[size], STATE_CLASS[state], className)}
      role="img"
      aria-label={buildAriaLabel(state, label)}
    >
      <span className={styles.glow} aria-hidden="true" />
      <span className={styles.ring} aria-hidden="true" />
      <span className={styles.orbit} aria-hidden="true">
        <span />
        <span />
        <span />
      </span>

      <svg
        className={styles.svg}
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={bodyGrad} x1="50" y1="14" x2="50" y2="92" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--tm-matte-edge)" />
            <stop offset="0.5" stopColor="var(--tm-matte)" />
            <stop offset="1" stopColor="var(--tm-matte-deep)" />
          </linearGradient>
          <linearGradient id={chromeGrad} x1="26" y1="22" x2="74" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--tm-chrome-hi)" />
            <stop offset="0.5" stopColor="var(--tm-chrome-mid)" />
            <stop offset="1" stopColor="var(--tm-chrome-lo-solid)" />
          </linearGradient>
          <radialGradient id={eyeGrad} cx="0.42" cy="0.38" r="0.7">
            <stop offset="0" stopColor="var(--tm-spec-hi)" />
            <stop offset="0.4" stopColor="var(--tm-eye)" />
            <stop offset="1" stopColor="var(--tm-ink)" />
          </radialGradient>
          <linearGradient id={redGrad} x1="50" y1="58" x2="50" y2="74" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--tm-red)" />
            <stop offset="1" stopColor="var(--tm-red-deep)" />
          </linearGradient>
        </defs>

        {/* shoulders / torso base — chrome shell */}
        <path
          d="M22 78c0-10 12-16 28-16s28 6 28 16v6a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4z"
          fill={`url(#${chromeGrad})`}
          stroke="var(--tm-matte-edge)"
          strokeWidth="1.2"
        />
        {/* red chest vent — brand accent */}
        <rect x="42" y="70" width="16" height="9" rx="2.5" fill={`url(#${redGrad})`} />
        <rect x="44.5" y="72" width="2" height="5" rx="1" fill="color-mix(in srgb, white 45%, transparent)" />
        <rect x="49" y="72" width="2" height="5" rx="1" fill="color-mix(in srgb, white 30%, transparent)" />
        <rect x="53.5" y="72" width="2" height="5" rx="1" fill="color-mix(in srgb, white 45%, transparent)" />

        {/* head group — matte black helmet */}
        <g className={styles.head}>
          {/* antenna */}
          <g className={styles.antenna}>
            <rect x="48.6" y="9" width="2.8" height="12" rx="1.4" fill="var(--tm-steel)" />
            <circle cx="50" cy="9" r="3.4" fill="var(--tm-accent)" />
            <circle cx="48.8" cy="7.8" r="1.1" fill="color-mix(in srgb, white 85%, transparent)" />
          </g>

          {/* helmet shell */}
          <rect
            x="26"
            y="20"
            width="48"
            height="42"
            rx="15"
            fill={`url(#${bodyGrad})`}
            stroke="var(--tm-matte-edge)"
            strokeWidth="1.3"
          />
          {/* chrome brow trim */}
          <path
            d="M30 32c4-7 12-10 20-10s16 3 20 10"
            stroke={`url(#${chromeGrad})`}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* visor glass */}
          <rect x="31" y="33" width="38" height="22" rx="11" fill="var(--tm-ink)" opacity="0.9" />
          <rect
            x="31"
            y="33"
            width="38"
            height="22"
            rx="11"
            fill="none"
            stroke="var(--tm-matte-edge)"
            strokeWidth="1"
          />
          {/* visor sheen */}
          <path d="M34 37c3-2.5 8-3 12-3" stroke="color-mix(in srgb, white 28%, transparent)" strokeWidth="1.6" strokeLinecap="round" />

          {/* scanning beam (analysing) */}
          <rect
            className={styles.scanBeam}
            x="32"
            y="34"
            width="36"
            height="3.5"
            rx="1.75"
            fill="var(--tm-accent)"
          />

          {/* the eye */}
          <g className={styles.eye}>
            <ellipse className={styles.eyeGlow} cx="50" cy="44" rx="13" ry="9" fill="var(--tm-eye-glow)" opacity="0.55" />
            <circle cx="50" cy="44" r="7.5" fill={`url(#${eyeGrad})`} />
            <circle cx="47.4" cy="41.6" r="2.2" fill="color-mix(in srgb, white 92%, transparent)" />
          </g>
        </g>

        {/* spinning gear (working) — lower right shoulder */}
        <g className={styles.gear} opacity="0">
          <g transform="translate(72 70)">
            <path
              d="M0 -9 1.8 -7.4 4.2 -8.2 4.6 -5.6 7 -4.8 5.8 -2.6 7.8 -1 5.8 0.6 6.6 3 4 3.2 3.2 5.6 1 4.4 -0.6 6.4 -2.6 5.4 -4.2 6.8 -5 4.4 -7.4 4.6 -7 2.2 -9 0.8 -7.4 -1 -8.8 -3 -6.4 -3.4 -6.6 -5.8 -4.2 -5.2 -3 -7.4 -1.2 -5.8 0 -8z"
              fill="var(--tm-steel)"
              stroke="var(--tm-matte-edge)"
              strokeWidth="0.8"
            />
            <circle r="2.4" fill="var(--tm-matte)" />
          </g>
        </g>

        {/* generating sparkles */}
        <g>
          <path className={cx(styles.spark, styles.sparkA)} d="M76 26l1.4 4.2 4.2 1.4-4.2 1.4L76 37l-1.4-4.2L70.4 31.4 74.6 30z" fill="var(--tm-amber)" />
          <path className={cx(styles.spark, styles.sparkB)} d="M22 30l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="var(--tm-amber)" />
          <path className={cx(styles.spark, styles.sparkC)} d="M80 50l0.8 2.4 2.4 0.8-2.4 0.8L80 57.2l-0.8-2.4L76.8 54l2.4-0.8z" fill="var(--tm-amber)" />
        </g>

        {/* deploying exhaust puff under torso */}
        <g className={styles.exhaust}>
          <ellipse cx="50" cy="90" rx="9" ry="5" fill="var(--tm-amber)" opacity="0.5" />
          <ellipse cx="50" cy="92" rx="5.5" ry="3.2" fill="var(--tm-spec-hi)" opacity="0.55" />
        </g>

        {/* status glyphs — check / warn / tick */}
        <g className={cx(styles.statusGlyph, styles.glyphCheck)} transform="translate(70 26)">
          <circle r="9" fill="var(--tm-amber)" />
          <path d="M-4 0l3 3 5.5-6" stroke="var(--tm-glyph-ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
        <g className={cx(styles.statusGlyph, styles.glyphWarn)} transform="translate(70 26)">
          <path d="M0 -9L9 7H-9z" fill="var(--tm-amber)" stroke="var(--tm-glyph-ink)" strokeWidth="0.8" strokeLinejoin="round" />
          <rect x="-1.4" y="-3" width="2.8" height="6" rx="1.4" fill="var(--tm-glyph-ink)" />
          <circle cx="0" cy="5" r="1.5" fill="var(--tm-glyph-ink)" />
        </g>
        <g className={cx(styles.statusGlyph, styles.glyphTick)} transform="translate(70 26)">
          <circle r="9" fill="var(--tm-green)" />
          <path d="M-4 0l3 3 5.5-6" stroke="var(--tm-glyph-ink-green)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      </svg>
    </span>
  )
}

/**
 * Compact inline badge pairing a small Torque avatar with a
 * name + live state label. Handy for chat headers and toasts.
 */
export function TorqueMascotBadge({
  state,
  label = "Torque",
  className,
}: TorqueMascotBadgeProps) {
  return (
    <span className={cx(styles.badge, BADGE_ACCENT_CLASS[state], className)}>
      <TorqueMascot state={state} size="sm" label={label} />
      <span className={styles.badgeText}>
        <span className={styles.badgeName}>{label}</span>
        <span className={styles.badgeState}>{TORQUE_STATE_PHRASE[state]}</span>
      </span>
    </span>
  )
}
