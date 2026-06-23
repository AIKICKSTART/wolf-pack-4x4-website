import type { ReactNode } from "react"
import Link from "next/link"

import styles from "./dashboard-card.module.css"

export type DashboardCardSurface = "glass" | "neuo" | "material"
export type DashboardCardDeltaDirection = "up" | "down" | "flat"

interface DashboardCardDelta {
  label: string
  direction: DashboardCardDeltaDirection
}

interface DashboardCardFooterLink {
  label: string
  href: string
}

interface DashboardCardProps {
  label: string
  value: string
  unit?: string
  icon?: ReactNode
  delta?: DashboardCardDelta
  spark?: ReactNode
  footer?: DashboardCardFooterLink
  meta?: string
  surface?: DashboardCardSurface
  className?: string
}

const SURFACE_CLASS: Record<DashboardCardSurface, string> = {
  glass: styles.surfaceGlass,
  neuo: styles.surfaceNeuo,
  material: styles.surfaceMaterial,
}

const DELTA_CLASS: Record<DashboardCardDeltaDirection, string> = {
  up: styles.deltaUp,
  down: styles.deltaDown,
  flat: styles.deltaFlat,
}

const DELTA_GLYPH: Record<DashboardCardDeltaDirection, string> = {
  up: "▲",
  down: "▼",
  flat: "—",
}

export function DashboardCard({
  label,
  value,
  unit,
  icon,
  delta,
  spark,
  footer,
  meta,
  surface = "glass",
  className,
}: DashboardCardProps) {
  const classes = [styles.card, SURFACE_CLASS[surface], className].filter(Boolean).join(" ")

  return (
    <article className={classes}>
      <div className={styles.header}>
        <span className={styles.iconWrap} aria-hidden="true">
          {icon}
        </span>
        <span className={styles.label}>{label}</span>
        {delta && (
          <span
            className={`${styles.delta} ${DELTA_CLASS[delta.direction]}`}
            aria-label={`Change: ${delta.label}`}
          >
            <span aria-hidden="true">{DELTA_GLYPH[delta.direction]}</span>
            {delta.label}
          </span>
        )}
      </div>
      <div>
        <span className={styles.value}>{value}</span>
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>
      {spark && <div className={styles.sparkSlot}>{spark}</div>}
      {(footer || meta) && (
        <div className={styles.footer}>
          {meta && <span>{meta}</span>}
          {footer && (
            <Link href={footer.href}>
              {footer.label}
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      )}
    </article>
  )
}

export default DashboardCard
