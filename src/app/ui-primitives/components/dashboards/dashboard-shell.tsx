import type { CSSProperties, ReactNode } from "react"

import styles from "./dashboard-shell.module.css"

export type DashboardDensity = "compact" | "comfortable"

interface DashboardShellProps {
  /** Top-line eyebrow label, e.g. "Workshop manager / Bay 1". */
  kicker: string
  /** Dashboard title, e.g. "Today at Oak Flats". */
  title: string
  /** Optional subtitle / description copy. */
  subtitle?: string
  /** Right-aligned toolbar slot (filters, sync status, etc.). */
  toolbar?: ReactNode
  /** Optional footer slot (legend, audit line, last updated). */
  footer?: ReactNode
  /** Aria-label for the section landmark — describes the persona view. */
  ariaLabel: string
  /** Grid density (gap between tiles). */
  density?: DashboardDensity
  /** Body grid column count (CSS template columns of equal width). Defaults to 4. */
  columns?: number
  children: ReactNode
  className?: string
}

const DENSITY_CLASS: Record<DashboardDensity, string> = {
  compact: styles.densityCompact,
  comfortable: styles.densityComfortable,
}

export function DashboardShell({
  kicker,
  title,
  subtitle,
  toolbar,
  footer,
  ariaLabel,
  density = "comfortable",
  columns = 4,
  children,
  className,
}: DashboardShellProps) {
  const shellClasses = [styles.shell, className].filter(Boolean).join(" ")
  const gridClasses = [styles.grid, DENSITY_CLASS[density]].filter(Boolean).join(" ")
  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  }

  return (
    <section className={shellClasses} aria-label={ariaLabel}>
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>{kicker}</span>
          <h2 className={styles.title}>{title}</h2>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </div>
        {toolbar ? (
          <div className={styles.toolbar}>
            <span className={styles.statusDot}>Live · synced</span>
            {toolbar}
          </div>
        ) : (
          <div className={styles.toolbar}>
            <span className={styles.statusDot}>Live · synced</span>
          </div>
        )}
      </header>

      <div className={gridClasses} style={gridStyle}>
        {children}
      </div>

      {footer ? <footer className={styles.footer}>{footer}</footer> : null}
    </section>
  )
}

export default DashboardShell
