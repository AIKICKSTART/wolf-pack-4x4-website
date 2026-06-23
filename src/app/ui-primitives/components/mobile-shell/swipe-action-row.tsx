import type { ReactNode } from "react"

import styles from "./swipe-action-row.module.css"

export type SwipeActionTone = "neutral" | "amber" | "red" | "green" | "teal"

export interface SwipeAction {
  id: string
  label: string
  icon: ReactNode
  tone?: SwipeActionTone
}

export type SwipeRowState = "rest" | "demo-leading" | "demo-trailing"

interface SwipeActionRowProps {
  primary: ReactNode
  secondary?: ReactNode
  meta?: ReactNode
  leading?: ReadonlyArray<SwipeAction>
  trailing?: ReadonlyArray<SwipeAction>
  state?: SwipeRowState
  className?: string
}

const TONE_CLASS: Record<SwipeActionTone, string> = {
  neutral: styles.toneNeutral,
  amber: styles.toneAmber,
  red: styles.toneRed,
  green: styles.toneGreen,
  teal: styles.toneTeal,
}

const STATE_CLASS: Record<SwipeRowState, string> = {
  rest: styles.stateRest,
  "demo-leading": styles.stateLeading,
  "demo-trailing": styles.stateTrailing,
}

export function SwipeActionRow({
  primary,
  secondary,
  meta,
  leading,
  trailing,
  state = "rest",
  className,
}: SwipeActionRowProps) {
  const wrapClasses = [styles.row, STATE_CLASS[state], className].filter(Boolean).join(" ")
  return (
    <div className={wrapClasses}>
      {leading && leading.length > 0 ? (
        <div className={[styles.actions, styles.actionsLeading].join(" ")}>
          {leading.map((action) => (
            <span
              key={action.id}
              className={[styles.action, TONE_CLASS[action.tone ?? "teal"]].join(" ")}
              aria-label={action.label}
              role="img"
            >
              <span className={styles.actionIcon} aria-hidden="true">
                {action.icon}
              </span>
              <span className={styles.actionLabel}>{action.label}</span>
            </span>
          ))}
        </div>
      ) : null}
      <div className={styles.surface}>
        <div className={styles.body}>
          <div className={styles.primary}>{primary}</div>
          {secondary ? <div className={styles.secondary}>{secondary}</div> : null}
        </div>
        {meta ? <div className={styles.meta}>{meta}</div> : null}
      </div>
      {trailing && trailing.length > 0 ? (
        <div className={[styles.actions, styles.actionsTrailing].join(" ")}>
          {trailing.map((action) => (
            <span
              key={action.id}
              className={[styles.action, TONE_CLASS[action.tone ?? "red"]].join(" ")}
              aria-label={action.label}
              role="img"
            >
              <span className={styles.actionIcon} aria-hidden="true">
                {action.icon}
              </span>
              <span className={styles.actionLabel}>{action.label}</span>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default SwipeActionRow
