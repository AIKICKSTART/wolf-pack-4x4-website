import styles from "./status-badge-grid.module.css"

export type StatusBadgeTone = "info" | "success" | "warn" | "error" | "neutral" | "brand"
export type StatusBadgeSize = "sm" | "md" | "lg"
export type StatusBadgeShape = "pill" | "square" | "dot"

export interface StatusBadgeSpec {
  tone: StatusBadgeTone
  label: string
}

interface StatusBadgeGridProps {
  badges?: ReadonlyArray<StatusBadgeSpec>
  className?: string
}

const TONE_CLASS: Record<StatusBadgeTone, string> = {
  info: styles.toneInfo,
  success: styles.toneSuccess,
  warn: styles.toneWarn,
  error: styles.toneError,
  neutral: styles.toneNeutral,
  brand: styles.toneBrand,
}

const SIZE_CLASS: Record<StatusBadgeSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
}

const SHAPE_CLASS: Record<StatusBadgeShape, string> = {
  pill: styles.shapePill,
  square: styles.shapeSquare,
  dot: styles.shapeDot,
}

const SIZE_ORDER: ReadonlyArray<StatusBadgeSize> = ["sm", "md", "lg"]
const SHAPE_ORDER: ReadonlyArray<StatusBadgeShape> = ["pill", "square", "dot"]

const DEFAULT_BADGES: ReadonlyArray<StatusBadgeSpec> = [
  { tone: "info", label: "Scheduled" },
  { tone: "success", label: "Approved" },
  { tone: "warn", label: "Pending" },
  { tone: "error", label: "Failed" },
  { tone: "neutral", label: "Draft" },
  { tone: "brand", label: "Featured" },
]

interface StatusBadgeProps {
  tone: StatusBadgeTone
  size: StatusBadgeSize
  shape: StatusBadgeShape
  label: string
}

export function StatusBadge({ tone, size, shape, label }: StatusBadgeProps) {
  const classes = [styles.badge, TONE_CLASS[tone], SIZE_CLASS[size], SHAPE_CLASS[shape]]
    .filter(Boolean)
    .join(" ")
  return <span className={classes}>{label}</span>
}

export function StatusBadgeGrid({
  badges = DEFAULT_BADGES,
  className,
}: StatusBadgeGridProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      {SHAPE_ORDER.map((shape) => (
        <section key={shape} className={styles.section} aria-label={`${shape} status badges`}>
          <h3 className={styles.heading}>
            Shape · <strong>{shape}</strong>
          </h3>
          {SIZE_ORDER.map((size) => (
            <div key={size} className={styles.row}>
              {badges.map((badge) => (
                <StatusBadge
                  key={`${shape}-${size}-${badge.tone}`}
                  tone={badge.tone}
                  size={size}
                  shape={shape}
                  label={badge.label}
                />
              ))}
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}

export default StatusBadgeGrid
