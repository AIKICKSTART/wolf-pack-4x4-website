"use client"

import { ChevronDown, ChevronUp, GripVertical, X } from "lucide-react"
import { useCallback, useState, type ReactNode } from "react"

import { adminToneToVar, type PinnedWidget } from "./admin-hub-types"

import styles from "./pinned-board.module.css"

interface PinnedBoardProps {
  widgets: ReadonlyArray<PinnedWidget>
  /** Render-prop the widget body for each pinned widget. */
  renderWidget?: (widget: PinnedWidget) => ReactNode
  /** Title for the board. */
  title?: string
  className?: string
}

function defaultRender(widget: PinnedWidget): ReactNode {
  return (
    <div className={styles.placeholder}>
      <span className={styles.placeholderLabel}>{widget.kind}</span>
      <span className={styles.placeholderHint}>Widget renderer not provided</span>
    </div>
  )
}

export function PinnedBoard({
  widgets,
  renderWidget,
  title = "Pinned widgets",
  className,
}: PinnedBoardProps) {
  const [order, setOrder] = useState<ReadonlyArray<string>>(() =>
    [...widgets].sort((a, b) => a.order - b.order).map((w) => w.id),
  )

  const moveUp = useCallback((id: string) => {
    setOrder((prev) => {
      const index = prev.indexOf(id)
      if (index <= 0) return prev
      const next = [...prev]
      ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
      return next
    })
  }, [])

  const moveDown = useCallback((id: string) => {
    setOrder((prev) => {
      const index = prev.indexOf(id)
      if (index === -1 || index >= prev.length - 1) return prev
      const next = [...prev]
      ;[next[index + 1], next[index]] = [next[index], next[index + 1]]
      return next
    })
  }, [])

  const widgetMap = new Map(widgets.map((w) => [w.id, w] as const))
  const renderItem = renderWidget ?? defaultRender

  return (
    <section
      className={[styles.board, className].filter(Boolean).join(" ")}
      aria-label={title}
    >
      <header className={styles.boardHead}>
        <span className={styles.kicker}>{title}</span>
        <span className={styles.hint}>Drag handle · keyboard arrows to reorder</span>
      </header>

      <ul className={styles.canvas} role="list">
        {order.map((id, idx) => {
          const widget = widgetMap.get(id)
          if (!widget) return null
          return (
            <li
              key={widget.id}
              className={[
                styles.card,
                widget.span === 2 ? styles.span2 : styles.span1,
              ].join(" ")}
              style={{ "--card-tone": adminToneToVar(widget.tone) } as React.CSSProperties}
              aria-label={`${widget.title} pinned widget`}
            >
              <header className={styles.cardHead}>
                <span
                  className={styles.handle}
                  role="button"
                  tabIndex={0}
                  aria-label={`Reorder ${widget.title}`}
                  draggable="true"
                >
                  <GripVertical size={14} strokeWidth={2.2} aria-hidden="true" />
                </span>
                <h4 className={styles.cardTitle}>{widget.title}</h4>
                <div className={styles.cardActions}>
                  <button
                    type="button"
                    className={styles.iconButton}
                    aria-label={`Move ${widget.title} up`}
                    onClick={() => moveUp(widget.id)}
                    disabled={idx === 0}
                  >
                    <ChevronUp size={12} strokeWidth={2.2} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={styles.iconButton}
                    aria-label={`Move ${widget.title} down`}
                    onClick={() => moveDown(widget.id)}
                    disabled={idx === order.length - 1}
                  >
                    <ChevronDown size={12} strokeWidth={2.2} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={styles.iconButton}
                    aria-label={`Unpin ${widget.title}`}
                  >
                    <X size={12} strokeWidth={2.2} aria-hidden="true" />
                  </button>
                </div>
              </header>
              <div className={styles.cardBody}>{renderItem(widget)}</div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default PinnedBoard
