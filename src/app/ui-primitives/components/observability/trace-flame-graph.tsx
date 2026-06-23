"use client"

import { useMemo, useState, type CSSProperties } from "react"

import { GlassSurface } from "../surfaces/glass-surface"

import styles from "./trace-flame-graph.module.css"

export interface FlameSpan {
  id: string
  /** Service the span belongs to, e.g. "quotes-api". */
  service: string
  /** Operation name. */
  name: string
  /** Span start in ms from trace start. */
  startMs: number
  /** Span duration in ms. */
  durationMs: number
  /** Depth in call stack (0 is root). */
  depth: number
  /** Did the span error? */
  hasError?: boolean
}

export interface TraceFlameGraphProps {
  spans: ReadonlyArray<FlameSpan>
  /** Total trace duration in ms — for the x-axis. */
  totalMs: number
  caption?: string
  /** Notify parent when a span is selected. */
  onSpanSelect?: (spanId: string | null) => void
  /** Optional initial selection. */
  initialSelectedId?: string
  className?: string
}

const PALETTE: ReadonlyArray<string> = [
  "var(--primitive-teal)",
  "var(--primitive-violet)",
  "var(--primitive-amber)",
  "var(--primitive-green)",
  "color-mix(in oklab, var(--primitive-amber) 58%, var(--primitive-red))",
  "color-mix(in oklab, var(--primitive-teal) 68%, white)",
  "color-mix(in oklab, var(--primitive-red) 64%, white)",
]

function colorForService(service: string): string {
  let hash = 0
  for (let i = 0; i < service.length; i += 1) {
    hash = (hash * 31 + service.charCodeAt(i)) >>> 0
  }
  return PALETTE[hash % PALETTE.length]
}

export function TraceFlameGraph({
  spans,
  totalMs,
  caption,
  onSpanSelect,
  initialSelectedId,
  className,
}: TraceFlameGraphProps) {
  const [selectedId, setSelectedId] = useState<string | null>(initialSelectedId ?? null)

  const maxDepth = useMemo(() => {
    let m = 0
    spans.forEach((s) => {
      if (s.depth > m) m = s.depth
    })
    return m
  }, [spans])

  const handleClick = (id: string) => {
    const next = selectedId === id ? null : id
    setSelectedId(next)
    onSpanSelect?.(next)
  }

  const classes = [styles.wrap, className].filter(Boolean).join(" ")
  const safeTotal = totalMs <= 0 ? 1 : totalMs

  return (
    <GlassSurface tone="obsidian" intensity="med" className={classes}>
      <section
        role="region"
        aria-label={caption ?? "Trace flame graph"}
        className={styles.inner}
      >
        {caption ? <header className={styles.caption}>{caption}</header> : null}
        <div
          className={styles.canvas}
          style={{ "--depth-count": `${maxDepth + 1}` } as CSSProperties}
        >
          <div className={styles.bars} role="group" aria-label="Trace spans">
            {spans.map((span) => {
              const left = (span.startMs / safeTotal) * 100
              const width = Math.max(0.5, (span.durationMs / safeTotal) * 100)
              const top = span.depth * 22
              const fill = span.hasError ? "var(--primitive-red)" : colorForService(span.service)
              const isSelected = selectedId === span.id
              return (
                <button
                  key={span.id}
                  type="button"
                  className={[styles.span, isSelected ? styles.spanActive : ""].filter(Boolean).join(" ")}
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                    top: `${top}px`,
                    background: fill,
                  }}
                  onClick={() => handleClick(span.id)}
                  aria-label={`${span.service} ${span.name}, ${span.durationMs}ms, depth ${span.depth}${span.hasError ? ", error" : ""}`}
                  aria-pressed={isSelected}
                >
                  <span className={styles.spanLabel}>
                    {span.service}.{span.name}
                  </span>
                  <span className={styles.spanDur}>{span.durationMs}ms</span>
                </button>
              )
            })}
          </div>
          <footer className={styles.axis} aria-hidden="true">
            <span>0</span>
            <span>{Math.round(safeTotal / 4)}ms</span>
            <span>{Math.round(safeTotal / 2)}ms</span>
            <span>{Math.round((safeTotal * 3) / 4)}ms</span>
            <span>{safeTotal}ms</span>
          </footer>
        </div>
      </section>
    </GlassSurface>
  )
}

export default TraceFlameGraph
