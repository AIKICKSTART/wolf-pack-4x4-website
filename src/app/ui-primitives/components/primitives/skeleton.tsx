import type { CSSProperties } from "react"

import styles from "./skeleton.module.css"

export type SkeletonVariant = "rect" | "circle" | "text" | "paragraph"

interface SkeletonProps {
  variant?: SkeletonVariant
  width?: number | string
  height?: number | string
  radius?: number | string
  lines?: number
  className?: string
  label?: string
}

const VARIANT_CLASS: Record<SkeletonVariant, string> = {
  rect: styles.rect,
  circle: styles.circle,
  text: styles.text,
  paragraph: styles.paragraph,
}

function cssLen(value: number | string | undefined): string | undefined {
  if (value === undefined) {
    return undefined
  }
  return typeof value === "number" ? `${value}px` : value
}

export function Skeleton({
  variant = "rect",
  width,
  height,
  radius,
  lines = 3,
  className,
  label = "Loading content",
}: SkeletonProps) {
  const classes = [styles.skeleton, VARIANT_CLASS[variant], className].filter(Boolean).join(" ")
  const style: CSSProperties = {
    width: cssLen(width),
    height: cssLen(height),
    borderRadius: cssLen(radius),
  }

  if (variant === "paragraph") {
    const safeLines = Math.max(1, Math.min(lines, 8))
    const rows = Array.from({ length: safeLines }, (_, index) => index)
    return (
      <div
        className={classes}
        style={{ width: cssLen(width) }}
        role="status"
        aria-busy="true"
        aria-label={label}
      >
        {rows.map((row) => (
          <span
            key={row}
            className={styles.paragraphLine}
            style={{ width: row === safeLines - 1 ? "58%" : "100%" }}
          />
        ))}
      </div>
    )
  }

  return (
    <span
      className={classes}
      style={style}
      role="status"
      aria-busy="true"
      aria-label={label}
    />
  )
}

export default Skeleton
