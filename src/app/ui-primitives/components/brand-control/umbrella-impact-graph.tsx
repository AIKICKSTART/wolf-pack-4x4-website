import { Network } from "lucide-react"

import type { UmbrellaImpactNode } from "./brand-control-types"
import styles from "./brand-control.module.css"

interface UmbrellaImpactGraphProps {
  rootLabel: string
  rootCssVar: string
  nodes: ReadonlyArray<UmbrellaImpactNode>
  className?: string
}

const TONE_DOT: Record<UmbrellaImpactNode["tone"], string> = {
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
  neutral: "var(--primitive-muted)",
}

/**
 * Umbrella impact graph — a single token at the root with branches showing
 * every primitive family that consumes it. The graph is rendered as a
 * styled list with pseudo-element rules drawing the connector lines, so it
 * scales cleanly on small screens.
 */
export function UmbrellaImpactGraph({
  rootLabel,
  rootCssVar,
  nodes,
  className,
}: UmbrellaImpactGraphProps) {
  const totalConsumers = nodes.reduce((sum, node) => sum + node.consumers, 0)

  return (
    <article
      className={[styles.card, styles.cardWide, className].filter(Boolean).join(" ")}
      aria-label={`Umbrella impact graph for ${rootLabel}`}
    >
      <header className={styles.head}>
        <div className={styles.headStack}>
          <span className={styles.kicker}>
            <Network size={12} aria-hidden="true" /> Umbrella · Impact
          </span>
          <h3 className={styles.title}>Token cascade</h3>
          <p className={styles.subtitle}>
            One edit reaches {totalConsumers} consumers across {nodes.length}{" "}
            primitive families.
          </p>
        </div>
      </header>

      <div className={styles.graph}>
        <span className={styles.graphRoot}>
          <span
            aria-hidden="true"
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--primitive-red)",
              boxShadow: "0 0 8px var(--primitive-red)",
            }}
          />
          <code className={styles.mono}>{rootCssVar}</code>
          <span style={{ color: "var(--primitive-muted)" }}>· {rootLabel}</span>
        </span>
        {nodes.map((node, index) => {
          const isLast = index === nodes.length - 1
          const branchClasses = [styles.graphBranch, isLast && styles.graphLast]
            .filter(Boolean)
            .join(" ")
          return (
            <div key={node.id} className={branchClasses} role="presentation">
              <span aria-hidden="true">
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: TONE_DOT[node.tone],
                  }}
                />
              </span>
              <span className={styles.graphNode}>{node.label}</span>
              <span className={styles.graphConsumers}>
                {node.consumers} consumers
              </span>
            </div>
          )
        })}
      </div>
    </article>
  )
}

export default UmbrellaImpactGraph
