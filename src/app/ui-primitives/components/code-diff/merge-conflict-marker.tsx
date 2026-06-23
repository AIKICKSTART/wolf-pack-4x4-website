"use client"

import { CircleAlert } from "lucide-react"

import styles from "./merge-conflict-marker.module.css"

export interface MergeConflictMarkerProps {
  /** "HEAD" or branch label for the left/ours side. */
  oursLabel: string
  /** Branch label for the right/theirs side. */
  theirsLabel: string
  /** Code lines from the ours side. */
  oursLines: ReadonlyArray<string>
  /** Code lines from the theirs side. */
  theirsLines: ReadonlyArray<string>
  /** Optional file path shown in header. */
  filePath?: string
  /** Accept-ours handler. */
  onAcceptOurs?: () => void
  /** Accept-theirs handler. */
  onAcceptTheirs?: () => void
  /** Manual resolve handler. */
  onResolveManually?: () => void
  className?: string
}

export function MergeConflictMarker({
  oursLabel,
  theirsLabel,
  oursLines,
  theirsLines,
  filePath,
  onAcceptOurs,
  onAcceptTheirs,
  onResolveManually,
  className,
}: MergeConflictMarkerProps) {
  const classes = [styles.marker, className].filter(Boolean).join(" ")
  const ariaLabel = filePath
    ? `Merge conflict in ${filePath} between ${oursLabel} and ${theirsLabel}`
    : `Merge conflict between ${oursLabel} and ${theirsLabel}`

  return (
    <section role="region" aria-label={ariaLabel} className={classes}>
      <header className={styles.head}>
        <span className={styles.headTitle}>
          <CircleAlert aria-hidden="true" />
          Merge conflict
        </span>
        {filePath ? <span className={styles.path}>{filePath}</span> : null}
      </header>
      <div className={styles.zone}>
        <div className={`${styles.zoneStrip} ${styles.zoneOurs}`}>
          <span>{`<<<<<<< ${oursLabel}`}</span>
          <span className={styles.chip}>Ours</span>
        </div>
        <div className={styles.lines}>
          {oursLines.map((line, index) => (
            <div key={`ours-${index}-${line.slice(0, 10)}`} className={`${styles.line} ${styles.ours}`}>
              <span className={styles.lineMarker} aria-hidden="true">
                +
              </span>
              <span>{line === "" ? " " : line}</span>
            </div>
          ))}
        </div>
        <div className={`${styles.zoneStrip} ${styles.zoneSeparator}`}>
          <span>=======</span>
          <span className={styles.chip}>Conflict</span>
        </div>
        <div className={styles.lines}>
          {theirsLines.map((line, index) => (
            <div key={`theirs-${index}-${line.slice(0, 10)}`} className={`${styles.line} ${styles.theirs}`}>
              <span className={styles.lineMarker} aria-hidden="true">
                +
              </span>
              <span>{line === "" ? " " : line}</span>
            </div>
          ))}
        </div>
        <div className={`${styles.zoneStrip} ${styles.zoneTheirs}`}>
          <span>{`>>>>>>> ${theirsLabel}`}</span>
          <span className={styles.chip}>Theirs</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.action} ${styles.actionOurs}`}
          onClick={onAcceptOurs}
        >
          Accept ours
        </button>
        <button
          type="button"
          className={`${styles.action} ${styles.actionTheirs}`}
          onClick={onAcceptTheirs}
        >
          Accept theirs
        </button>
        <button
          type="button"
          className={`${styles.action} ${styles.actionManual}`}
          onClick={onResolveManually}
        >
          Resolve manually
        </button>
      </div>
    </section>
  )
}

export default MergeConflictMarker
