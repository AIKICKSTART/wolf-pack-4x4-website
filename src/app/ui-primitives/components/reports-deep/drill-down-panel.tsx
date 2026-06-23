"use client"

import { useCallback, useMemo, useState } from "react"

import type { DrillDownEntry } from "./reports-deep-types"
import styles from "./drill-down-panel.module.css"

interface DrillLevel {
  readonly id: string
  readonly label: string
  readonly summaryMetric: string
  readonly summaryValue: string
  readonly entries: ReadonlyArray<DrillDownEntry>
}

interface DrillDownPanelProps {
  readonly title: string
  readonly levels: ReadonlyArray<DrillLevel>
  readonly initialIndex?: number
  readonly className?: string
}

export function DrillDownPanel({
  title,
  levels,
  initialIndex = 0,
  className,
}: DrillDownPanelProps) {
  const safeInitial = Math.max(0, Math.min(initialIndex, levels.length - 1))
  const [activeIndex, setActiveIndex] = useState<number>(safeInitial)

  const breadcrumb = useMemo(() => levels.slice(0, activeIndex + 1), [activeIndex, levels])
  const current = levels[activeIndex]

  const handleCrumb = useCallback(
    (index: number) => () => {
      setActiveIndex(index)
    },
    [],
  )

  const handleDrillInto = useCallback(() => {
    setActiveIndex((current) => Math.min(levels.length - 1, current + 1))
  }, [levels.length])

  const canDrillIn = activeIndex < levels.length - 1

  const classes = [styles.panel, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={`Drill down: ${title}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Drill stack</span>
        <h3 className={styles.title}>{title}</h3>
      </header>

      <nav aria-label="Drill breadcrumb" className={styles.breadcrumb}>
        {breadcrumb.map((level, index) => {
          const isLast = index === breadcrumb.length - 1
          return (
            <span key={level.id} className={styles.crumbWrap}>
              <button
                type="button"
                className={`${styles.crumb} ${isLast ? styles.crumbActive : ""}`.trim()}
                onClick={handleCrumb(index)}
                aria-current={isLast ? "step" : undefined}
              >
                {level.label}
              </button>
              {!isLast ? (
                <span className={styles.crumbSep} aria-hidden="true">
                  ›
                </span>
              ) : null}
            </span>
          )
        })}
      </nav>

      {current ? (
        <>
          <div className={styles.summary}>
            <span className={styles.summaryLabel}>{current.summaryMetric}</span>
            <span className={styles.summaryValue}>{current.summaryValue}</span>
            <span className={styles.summaryHint}>
              {current.entries.length} contributing rows
            </span>
          </div>

          <ul className={styles.entries} aria-label="Contributing rows">
            {current.entries.map((entry) => {
              const clampedShare = Math.max(0, Math.min(100, entry.contribution))
              return (
                <li key={entry.id} className={styles.entry}>
                  <div className={styles.entryHead}>
                    <span className={styles.entryDim}>{entry.dimensionLabel}</span>
                    <strong className={styles.entryValue}>{entry.metricValue}</strong>
                  </div>
                  <div className={styles.entryLabel}>
                    <span className={styles.entryName}>{entry.dimensionValue}</span>
                    <span className={styles.entryMetric}>{entry.metric}</span>
                  </div>
                  <div className={styles.barTrack} aria-hidden="true">
                    <span
                      className={styles.barFill}
                      style={{ width: `${clampedShare.toFixed(1)}%` }}
                    />
                  </div>
                  <span className={styles.entryShare}>{clampedShare.toFixed(1)}%</span>
                </li>
              )
            })}
          </ul>

          {canDrillIn ? (
            <button type="button" className={styles.drillIn} onClick={handleDrillInto}>
              Drill into next dimension →
            </button>
          ) : (
            <span className={styles.terminal}>Leaf level reached</span>
          )}
        </>
      ) : null}
    </section>
  )
}

export default DrillDownPanel
