import type { ReactNode } from "react"

import { GlassSurface } from "../surfaces"
import styles from "./empty-state.module.css"

export type EmptyStateTone = "obsidian" | "amber" | "chrome"

interface EmptyStateProps {
  title: string
  description?: string
  illustration?: ReactNode
  action?: ReactNode
  secondaryAction?: ReactNode
  tone?: EmptyStateTone
  align?: "center" | "start"
  className?: string
}

export function EmptyState({
  title,
  description,
  illustration,
  action,
  secondaryAction,
  tone = "obsidian",
  align = "center",
  className,
}: EmptyStateProps) {
  const classes = [
    styles.state,
    align === "start" ? styles.alignStart : styles.alignCenter,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <GlassSurface tone={tone} intensity="med" className={classes}>
      {illustration && (
        <div className={styles.illustration} aria-hidden="true">
          {illustration}
        </div>
      )}
      <div className={styles.text}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {(action || secondaryAction) && (
        <div className={styles.actions}>
          {action}
          {secondaryAction}
        </div>
      )}
    </GlassSurface>
  )
}

export default EmptyState
