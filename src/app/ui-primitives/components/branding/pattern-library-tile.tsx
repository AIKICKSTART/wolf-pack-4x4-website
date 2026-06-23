import styles from "./pattern-library-tile.module.css"

export type PatternId =
  | "carbon-fibre"
  | "diamond-plate"
  | "herringbone"
  | "dots"
  | "hatch"
  | "brushed-metal"

export interface PatternLibraryTileProps {
  pattern: PatternId
  name: string
  usage: string
}

function PatternSvg({ pattern }: { pattern: PatternId }) {
  switch (pattern) {
    case "carbon-fibre":
      return (
        <svg viewBox="0 0 80 80" className={styles.svg} aria-hidden="true">
          <defs>
            <pattern id="carbon" width="16" height="16" patternUnits="userSpaceOnUse">
              <rect width="16" height="16" fill="var(--primitive-canvas)" />
              <rect x="0" y="0" width="8" height="8" fill="color-mix(in oklab, var(--primitive-canvas) 86%, var(--primitive-text-strong))" />
              <rect x="8" y="8" width="8" height="8" fill="color-mix(in oklab, var(--primitive-canvas) 86%, var(--primitive-text-strong))" />
              <rect x="0" y="0" width="8" height="8" fill="url(#carbonShine)" opacity="0.5" />
            </pattern>
            <linearGradient id="carbonShine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="color-mix(in oklab, var(--primitive-text-strong) 18%, transparent)" />
              <stop offset="1" stopColor="transparent" />
            </linearGradient>
          </defs>
          <rect width="80" height="80" fill="url(#carbon)" />
        </svg>
      )
    case "diamond-plate":
      return (
        <svg viewBox="0 0 80 80" className={styles.svg} aria-hidden="true">
          <defs>
            <pattern id="diamond" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="color-mix(in oklab, var(--primitive-canvas) 82%, var(--primitive-text-strong))" />
              <path d="M10 2 L18 10 L10 18 L2 10 Z" fill="none" stroke="color-mix(in oklab, var(--primitive-canvas) 60%, var(--primitive-text-strong))" strokeWidth="1.4" />
              <path d="M10 2 L18 10 L10 18 L2 10 Z" fill="url(#diamondShine)" opacity="0.4" />
            </pattern>
            <linearGradient id="diamondShine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="color-mix(in oklab, var(--primitive-text-strong) 22%, transparent)" />
              <stop offset="1" stopColor="transparent" />
            </linearGradient>
          </defs>
          <rect width="80" height="80" fill="url(#diamond)" />
        </svg>
      )
    case "herringbone":
      return (
        <svg viewBox="0 0 80 80" className={styles.svg} aria-hidden="true">
          <defs>
            <pattern id="herring" width="16" height="16" patternUnits="userSpaceOnUse">
              <rect width="16" height="16" fill="color-mix(in oklab, var(--primitive-canvas) 92%, var(--primitive-text-strong))" />
              <path d="M0 0 L8 16" stroke="var(--primitive-red)" strokeWidth="2" />
              <path d="M8 0 L16 16" stroke="var(--primitive-red)" strokeWidth="2" />
              <path d="M16 0 L8 16" stroke="var(--primitive-amber)" strokeWidth="1.4" opacity="0.7" />
            </pattern>
          </defs>
          <rect width="80" height="80" fill="url(#herring)" />
        </svg>
      )
    case "dots":
      return (
        <svg viewBox="0 0 80 80" className={styles.svg} aria-hidden="true">
          <defs>
            <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
              <rect width="14" height="14" fill="var(--primitive-canvas)" />
              <circle cx="7" cy="7" r="2.4" fill="var(--primitive-teal)" />
            </pattern>
          </defs>
          <rect width="80" height="80" fill="url(#dots)" />
        </svg>
      )
    case "hatch":
      return (
        <svg viewBox="0 0 80 80" className={styles.svg} aria-hidden="true">
          <defs>
            <pattern id="hatch" width="12" height="12" patternUnits="userSpaceOnUse">
              <rect width="12" height="12" fill="color-mix(in oklab, var(--primitive-canvas) 90%, var(--primitive-text-strong))" />
              <line x1="0" y1="0" x2="12" y2="12" stroke="var(--primitive-amber)" strokeWidth="1.4" />
            </pattern>
          </defs>
          <rect width="80" height="80" fill="url(#hatch)" />
        </svg>
      )
    case "brushed-metal":
      return (
        <svg viewBox="0 0 80 80" className={styles.svg} aria-hidden="true">
          <defs>
            <linearGradient id="brushed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="color-mix(in oklab, var(--primitive-canvas) 56%, var(--primitive-text-strong))" />
              <stop offset="0.5" stopColor="color-mix(in oklab, var(--primitive-canvas) 28%, var(--primitive-text-strong))" />
              <stop offset="1" stopColor="color-mix(in oklab, var(--primitive-canvas) 64%, var(--primitive-text-strong))" />
            </linearGradient>
            <pattern id="lines" width="2" height="80" patternUnits="userSpaceOnUse">
              <rect width="1" height="80" fill="color-mix(in oklab, var(--primitive-text-strong) 6%, transparent)" />
            </pattern>
          </defs>
          <rect width="80" height="80" fill="url(#brushed)" />
          <rect width="80" height="80" fill="url(#lines)" />
        </svg>
      )
    default:
      return null
  }
}

export function PatternLibraryTile({ pattern, name, usage }: PatternLibraryTileProps) {
  return (
    <article className={styles.card}>
      <div className={styles.frame} aria-hidden="true">
        <PatternSvg pattern={pattern} />
      </div>
      <div className={styles.body}>
        <strong className={styles.name}>{name}</strong>
        <p className={styles.usage}>{usage}</p>
      </div>
      <code className={styles.id}>{pattern}</code>
    </article>
  )
}
