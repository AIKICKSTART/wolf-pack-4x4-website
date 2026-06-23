import type { LogicAction, LogicRule } from "./form-builder-types"
import styles from "./conditional-logic-visualizer.module.css"

interface ConditionalLogicVisualizerProps {
  rules: ReadonlyArray<LogicRule>
  /** All fields by id with display labels. */
  fields: ReadonlyArray<{ id: string; label: string }>
  className?: string
}

const NODE_HEIGHT = 44
const NODE_GAP = 14
const COLUMN_WIDTH = 200
const STAGE_PADDING = 24

const ACTION_TONE: Record<LogicAction, string> = {
  show: "green",
  hide: "red",
  skip: "amber",
  require: "teal",
}

export function ConditionalLogicVisualizer({
  rules,
  fields,
  className,
}: ConditionalLogicVisualizerProps) {
  const classes = [styles.visualizer, className].filter(Boolean).join(" ")

  const sourceIds = uniquePreserveOrder(rules.map((rule) => rule.sourceField))
  const targetIds = uniquePreserveOrder(rules.map((rule) => rule.targetField))

  const labelFor = (id: string) =>
    fields.find((field) => field.id === id)?.label ?? id

  const totalRows = Math.max(sourceIds.length, targetIds.length, 1)
  const stageHeight = totalRows * NODE_HEIGHT + (totalRows - 1) * NODE_GAP + STAGE_PADDING * 2
  const stageWidth = COLUMN_WIDTH * 2 + 220
  const sourceX = STAGE_PADDING
  const targetX = stageWidth - STAGE_PADDING - COLUMN_WIDTH
  const conditionX = (sourceX + COLUMN_WIDTH + targetX) / 2

  const positions = {
    source: sourceIds.map((id, index) => ({
      id,
      x: sourceX,
      y: STAGE_PADDING + index * (NODE_HEIGHT + NODE_GAP),
    })),
    target: targetIds.map((id, index) => ({
      id,
      x: targetX,
      y: STAGE_PADDING + index * (NODE_HEIGHT + NODE_GAP),
    })),
  }

  const sourceYFor = (id: string) =>
    positions.source.find((entry) => entry.id === id)?.y ?? STAGE_PADDING
  const targetYFor = (id: string) =>
    positions.target.find((entry) => entry.id === id)?.y ?? STAGE_PADDING

  return (
    <section className={classes} aria-label="Conditional logic flow visualizer">
      <header className={styles.head}>
        <span className={styles.kicker}>Logic flow</span>
        <div>
          <h3 className={styles.title}>Visualised dependencies</h3>
          <p className={styles.subtitle}>
            Source fields drive conditions which toggle target visibility.
          </p>
        </div>
      </header>

      <div className={styles.stage}>
        <svg
          className={styles.canvas}
          viewBox={`0 0 ${stageWidth} ${stageHeight}`}
          role="img"
          aria-label="Logic dependency graph"
        >
          {rules.map((rule) => {
            const fromX = sourceX + COLUMN_WIDTH
            const fromY = sourceYFor(rule.sourceField) + NODE_HEIGHT / 2
            const toX = targetX
            const toY = targetYFor(rule.targetField) + NODE_HEIGHT / 2
            const midX = (fromX + toX) / 2
            const tone = ACTION_TONE[rule.action]

            const path = `M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`

            return (
              <g key={rule.id} className={[styles.edge, styles[`edge-${tone}`]].join(" ")}>
                <path d={path} fill="none" />
                <circle cx={conditionX} cy={(fromY + toY) / 2} r={3} />
              </g>
            )
          })}
        </svg>

        <div className={styles.column} style={{ left: sourceX, width: COLUMN_WIDTH }}>
          <span className={styles.columnTitle}>Source</span>
          {positions.source.map((entry) => (
            <div
              key={entry.id}
              className={styles.node}
              style={{ transform: `translateY(${entry.y - STAGE_PADDING}px)` }}
            >
              <span className={styles.nodeDot} aria-hidden="true" />
              <span className={styles.nodeLabel}>{labelFor(entry.id)}</span>
            </div>
          ))}
        </div>

        <div
          className={styles.condition}
          style={{ left: conditionX - 56 }}
        >
          <span className={styles.conditionLabel}>Conditions</span>
          <span className={styles.conditionCount}>{rules.length}</span>
        </div>

        <div className={styles.column} style={{ left: targetX, width: COLUMN_WIDTH }}>
          <span className={styles.columnTitle}>Target</span>
          {positions.target.map((entry) => (
            <div
              key={entry.id}
              className={styles.node}
              style={{ transform: `translateY(${entry.y - STAGE_PADDING}px)` }}
            >
              <span className={[styles.nodeDot, styles.nodeDotTarget].join(" ")} aria-hidden="true" />
              <span className={styles.nodeLabel}>{labelFor(entry.id)}</span>
            </div>
          ))}
        </div>
      </div>

      <footer className={styles.legend}>
        <span className={[styles.legendChip, styles["edge-green"]].join(" ")}>show</span>
        <span className={[styles.legendChip, styles["edge-red"]].join(" ")}>hide</span>
        <span className={[styles.legendChip, styles["edge-amber"]].join(" ")}>skip to</span>
        <span className={[styles.legendChip, styles["edge-teal"]].join(" ")}>require</span>
      </footer>
    </section>
  )
}

function uniquePreserveOrder(values: ReadonlyArray<string>): ReadonlyArray<string> {
  const seen = new Set<string>()
  const out: string[] = []
  for (const value of values) {
    if (!seen.has(value)) {
      seen.add(value)
      out.push(value)
    }
  }
  return out
}
