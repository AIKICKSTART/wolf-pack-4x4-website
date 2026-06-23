import { Cloud, Users } from "lucide-react"

import { Chip } from "../primitives/chip"
import styles from "./live-doc-version-indicator.module.css"

export type VersionSaveState = "saved" | "saving" | "dirty" | "offline"

interface LiveDocVersionIndicatorProps {
  /** Current version label e.g. "v18". */
  version: string
  /** Human relative timestamp e.g. "Saved 4s ago". */
  savedLabel: string
  /** Collaborators online count. */
  collaboratorsOnline: number
  /** Save / sync state — drives chip tone + dot colour. */
  state?: VersionSaveState
  className?: string
}

const STATE_LABEL: Record<VersionSaveState, string> = {
  saved: "Saved",
  saving: "Saving",
  dirty: "Unsaved",
  offline: "Offline",
}

const STATE_CLASS: Record<VersionSaveState, string> = {
  saved: styles.stateSaved,
  saving: styles.stateSaving,
  dirty: styles.stateDirty,
  offline: styles.stateOffline,
}

export function LiveDocVersionIndicator({
  version,
  savedLabel,
  collaboratorsOnline,
  state = "saved",
  className,
}: LiveDocVersionIndicatorProps) {
  const classes = [styles.bar, STATE_CLASS[state], className]
    .filter(Boolean)
    .join(" ")
  const liveCopy = `${STATE_LABEL[state]} · ${savedLabel} · ${collaboratorsOnline} online`

  return (
    <div className={classes} role="status" aria-live="polite">
      <Chip label={`Version ${version}`} tone="teal" />
      <span className={styles.divider} aria-hidden="true" />
      <span className={styles.state}>
        <span className={styles.stateDot} aria-hidden="true" />
        <span className={styles.stateLabel}>{STATE_LABEL[state]}</span>
      </span>
      <span className={styles.cloud} aria-hidden="true">
        <Cloud size={12} strokeWidth={2.2} />
      </span>
      <span className={styles.saved}>{savedLabel}</span>
      <span className={styles.divider} aria-hidden="true" />
      <span className={styles.online} aria-hidden="true">
        <Users size={12} strokeWidth={2.4} />
      </span>
      <span className={styles.onlineCount}>
        {collaboratorsOnline} online
      </span>
      <span className={styles.live}>{liveCopy}</span>
    </div>
  )
}

export default LiveDocVersionIndicator
