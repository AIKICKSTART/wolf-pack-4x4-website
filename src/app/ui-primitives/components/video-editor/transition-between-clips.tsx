import styles from "./transition-between-clips.module.css"
import type { TransitionKind } from "./video-editor-types"

interface TransitionBetweenClipsProps {
  /** Transition family — drives icon + accent. */
  kind: TransitionKind
  /** Duration in seconds. */
  durationSec: number
  /** Whether transition is currently selected — slight highlight. */
  selected?: boolean
  /** Optional descriptive label e.g. "Cross-dissolve 0.5s". */
  label?: string
}

const KIND_LABEL: Record<TransitionKind, string> = {
  cut: "Cut",
  "cross-fade": "Cross-fade",
  dissolve: "Dissolve",
  wipe: "Wipe",
}

function TransitionGlyph({ kind }: { kind: TransitionKind }) {
  if (kind === "cut") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M3 4 L11 4 L11 20 L3 20 Z" fill="color-mix(in oklab, var(--primitive-teal) 62%, transparent)" />
        <path d="M13 4 L21 4 L21 20 L13 20 Z" fill="color-mix(in oklab, var(--primitive-amber) 62%, transparent)" />
      </svg>
    )
  }
  if (kind === "cross-fade") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="xfade" x1="0" x2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="color-mix(in oklab, var(--primitive-teal) 92%, transparent)" />
            <stop offset="100%" stopColor="color-mix(in oklab, var(--primitive-amber) 92%, transparent)" />
          </linearGradient>
        </defs>
        <rect x="3" y="4" width="18" height="16" fill="url(#xfade)" />
      </svg>
    )
  }
  if (kind === "dissolve") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="8" cy="12" r="6" fill="color-mix(in oklab, var(--primitive-teal) 62%, transparent)" />
        <circle cx="16" cy="12" r="6" fill="color-mix(in oklab, var(--primitive-amber) 62%, transparent)" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M3 4 L21 4 L13 20 L3 20 Z" fill="color-mix(in oklab, var(--primitive-teal) 62%, transparent)" />
      <path d="M13 4 L21 4 L21 20 L13 20 Z" fill="color-mix(in oklab, var(--primitive-green) 74%, transparent)" />
    </svg>
  )
}

function formatDuration(secs: number): string {
  if (secs < 1) {
    return `${Math.round(secs * 1000)}ms`
  }
  return `${secs.toFixed(1)}s`
}

export function TransitionBetweenClips({
  kind,
  durationSec,
  selected = false,
  label,
}: TransitionBetweenClipsProps) {
  const classes = [styles.wrap, styles[`kind-${kind}`]]
  if (selected) classes.push(styles.selected)

  return (
    <div
      className={classes.join(" ")}
      role="img"
      aria-label={`${KIND_LABEL[kind]} transition, ${formatDuration(durationSec)}`}
    >
      <span className={styles.glyph} aria-hidden="true">
        <TransitionGlyph kind={kind} />
      </span>
      <span className={styles.copy}>
        <strong className={styles.kindLabel}>{KIND_LABEL[kind]}</strong>
        <span className={styles.durationChip}>{formatDuration(durationSec)}</span>
      </span>
      {label ? <span className={styles.sub}>{label}</span> : null}
    </div>
  )
}
