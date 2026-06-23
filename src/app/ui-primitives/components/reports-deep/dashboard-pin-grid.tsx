"use client"

import { useCallback, useMemo, useState } from "react"

import type { DashboardWidget } from "./reports-deep-types"
import styles from "./dashboard-pin-grid.module.css"

interface DashboardPinGridProps {
  readonly widgets: ReadonlyArray<DashboardWidget>
  readonly className?: string
}

const ACCENT_CLASS: Record<DashboardWidget["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
}

export function DashboardPinGrid({ widgets, className }: DashboardPinGridProps) {
  const initialPinned = useMemo(() => new Set(widgets.map((w) => w.id)), [widgets])
  const [pinned, setPinned] = useState<ReadonlySet<string>>(initialPinned)

  const togglePin = useCallback(
    (id: string) => () => {
      setPinned((current) => {
        const next = new Set(current)
        if (next.has(id)) {
          next.delete(id)
        } else {
          next.add(id)
        }
        return next
      })
    },
    [],
  )

  const ordered = useMemo(() => {
    const pinnedList = widgets.filter((widget) => pinned.has(widget.id))
    const unpinnedList = widgets.filter((widget) => !pinned.has(widget.id))
    return [...pinnedList, ...unpinnedList]
  }, [pinned, widgets])

  const classes = [styles.grid, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Pinnable dashboard widgets">
      {ordered.map((widget) => {
        const isPinned = pinned.has(widget.id)
        return (
          <article
            key={widget.id}
            className={[
              styles.widget,
              ACCENT_CLASS[widget.accent],
              isPinned ? styles.widgetPinned : styles.widgetUnpinned,
              styles[`span${widget.span}`],
              widget.heightUnits === 2 ? styles.tall : styles.short,
            ]
              .filter(Boolean)
              .join(" ")}
            data-pinned={isPinned}
          >
            <header className={styles.widgetHead}>
              <span className={styles.widgetKicker}>{widget.subtitle}</span>
              <button
                type="button"
                className={styles.pinBtn}
                aria-label={`${isPinned ? "Unpin" : "Pin"} ${widget.title}`}
                aria-pressed={isPinned}
                onClick={togglePin(widget.id)}
              >
                <span aria-hidden="true">{isPinned ? "★" : "☆"}</span>
              </button>
            </header>
            <h3 className={styles.widgetTitle}>{widget.title}</h3>
            <p className={styles.widgetValue}>{widget.value}</p>
            {widget.delta ? <span className={styles.widgetDelta}>{widget.delta}</span> : null}
            <div className={styles.widgetSheen} aria-hidden="true" />
          </article>
        )
      })}
    </section>
  )
}

export default DashboardPinGrid
