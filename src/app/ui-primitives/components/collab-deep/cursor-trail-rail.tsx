import type {
  CollabCursorPoint,
  CollabUser,
  CursorTone,
  CursorTrailStep,
} from "./collab-deep-types"
import { COLLAB_DEEP_TONE_HEX } from "./collab-deep-types"
import { defaultCursorTone } from "../realtime-collab/realtime-collab-types"
import styles from "./cursor-trail-rail.module.css"

interface CursorTrailRailProps {
  /** Trails (one per collaborator), oldest sample first → newest last. */
  trails: ReadonlyArray<CursorTrailStep>
  /** Optional caption above the rail. */
  caption?: string
  /** Optional aspect ratio override (default ~ 22 : 5). */
  ratio?: string
  className?: string
}

function toneHex(user: CollabUser): string {
  const tone: CursorTone = user.cursorTone ?? defaultCursorTone(user.tone)
  return COLLAB_DEEP_TONE_HEX[tone]
}

function clamp(value: number): number {
  if (Number.isNaN(value)) {
    return 0
  }
  if (value < 0) {
    return 0
  }
  if (value > 100) {
    return 100
  }
  return value
}

function buildPath(samples: ReadonlyArray<CollabCursorPoint>): string {
  if (samples.length === 0) {
    return ""
  }
  return samples
    .map((point, index) => {
      const prefix = index === 0 ? "M" : "L"
      return `${prefix}${clamp(point.x).toFixed(2)},${clamp(point.y).toFixed(2)}`
    })
    .join(" ")
}

/** Heat trail of every recent cursor position on the doc. */
export function CursorTrailRail({
  trails,
  caption,
  ratio = "22 / 5",
  className,
}: CursorTrailRailProps) {
  const classes = [styles.rail, className].filter(Boolean).join(" ")
  const description = caption
    ? `${caption} – ${trails.length} cursor trails`
    : `${trails.length} cursor trails`

  return (
    <figure className={classes} style={{ aspectRatio: ratio }} aria-label={description}>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      <svg
        className={styles.svg}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        role="presentation"
        aria-hidden="true"
      >
        <defs>
          {trails.map((trail) => {
            const tint = toneHex(trail.user)
            return (
              <linearGradient
                key={`grad-${trail.id}`}
                id={`trail-grad-${trail.id}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor={tint} stopOpacity="0" />
                <stop offset="60%" stopColor={tint} stopOpacity="0.55" />
                <stop offset="100%" stopColor={tint} stopOpacity="1" />
              </linearGradient>
            )
          })}
        </defs>
        {trails.map((trail) => {
          const path = buildPath(trail.samples)
          const last = trail.samples[trail.samples.length - 1]
          if (!path || !last) {
            return null
          }
          const tint = toneHex(trail.user)
          return (
            <g key={trail.id}>
              <path
                d={path}
                stroke={`url(#trail-grad-${trail.id})`}
                strokeWidth="0.9"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
              <circle
                className={styles.trailDot}
                cx={clamp(last.x)}
                cy={clamp(last.y)}
                r="1.1"
                fill={tint}
                strokeWidth="0.35"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          )
        })}
      </svg>
      <ul className={styles.legend}>
        {trails.map((trail) => (
          <li
            key={trail.id}
            className={styles.legendItem}
            style={{ "--legend-tint": toneHex(trail.user) } as React.CSSProperties}
          >
            <span className={styles.legendSwatch} aria-hidden="true" />
            <span className={styles.legendName}>{trail.user.name}</span>
            <span className={styles.legendCount}>{trail.samples.length} pts</span>
          </li>
        ))}
      </ul>
    </figure>
  )
}

export default CursorTrailRail
