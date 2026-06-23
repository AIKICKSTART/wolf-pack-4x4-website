"use client"

import { useId } from "react"

import styles from "./reactions-strip.module.css"
import type { ReactionKind, ReactionPulse } from "./live-broadcast-types"

interface ReactionsStripProps {
  /** Floating reaction pulses currently animating. Pass empty when idle. */
  pulses: ReadonlyArray<ReactionPulse>
  /** Aria-label describing the reaction stream. */
  ariaLabel?: string
  /** Anchor side — drives the floating direction. */
  anchor?: "left" | "right"
  className?: string
}

const REACTION_GLYPH: Record<ReactionKind, string> = {
  "muffler-flame": "🔥",
  wrench: "🔧",
  dyno: "📈",
  smoke: "💨",
  "aussie-flag": "🇦🇺",
}

const REACTION_LABEL: Record<ReactionKind, string> = {
  "muffler-flame": "Muffler flame",
  wrench: "Wrench",
  dyno: "Dyno",
  smoke: "Smoke",
  "aussie-flag": "Aussie flag",
}

export function ReactionsStrip({
  pulses,
  ariaLabel = "Reactions stream",
  anchor = "right",
  className,
}: ReactionsStripProps) {
  const stripId = useId()
  const classes = [
    styles.strip,
    anchor === "left" ? styles.anchorLeft : styles.anchorRight,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div
      id={stripId}
      className={classes}
      role="presentation"
      aria-label={ariaLabel}
      aria-hidden={pulses.length === 0}
    >
      {pulses.map((pulse, index) => (
        <span
          key={pulse.id}
          className={[styles.pulse, styles[`kind-${pulse.kind}`]].join(" ")}
          style={{
            animationDelay: `${(index % 6) * 120}ms`,
            ["--pulse-offset" as string]: `${((index * 17) % 80) - 40}px`,
          }}
          title={`${REACTION_LABEL[pulse.kind]} from ${pulse.fromHandle}`}
        >
          <span aria-hidden="true">{REACTION_GLYPH[pulse.kind]}</span>
          <span className={styles.visuallyHidden}>
            {REACTION_LABEL[pulse.kind]} from {pulse.fromHandle}
          </span>
        </span>
      ))}
    </div>
  )
}

export default ReactionsStrip
