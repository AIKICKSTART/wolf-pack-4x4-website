import { AlertTriangle, Shield, ShieldCheck } from "lucide-react"

import { Chip } from "../primitives/chip"
import { toneForScore, type HermesFilterPhase, type HermesTone } from "./hermes-agent-types"
import styles from "./safety-filter-strip.module.css"

export interface SafetyFilterStep {
  id: string
  /** Filter name, e.g. "PII redactor". */
  name: string
  /** Phase: pre-input or post-output. */
  phase: HermesFilterPhase
  /** Hit count over the last 24h. */
  hits24h: number
  /** Total inspected count for context. */
  inspected24h: number
  /** Override the inferred tone. */
  tone?: HermesTone
  /** Short detail line. */
  detail?: string
}

interface SafetyFilterStripProps {
  filters: ReadonlyArray<SafetyFilterStep>
  /** Total messages inspected end-to-end. */
  totalInspected: number
  /** Total messages blocked end-to-end. */
  totalBlocked: number
  /** Total escalations triggered. */
  totalEscalated: number
  className?: string
}

const PHASE_LABEL: Record<HermesFilterPhase, string> = {
  pre: "Pre · input",
  post: "Post · output",
}

function hitRate(hits: number, inspected: number): number {
  if (inspected <= 0) return 0
  return hits / inspected
}

export function SafetyFilterStrip({
  filters,
  totalInspected,
  totalBlocked,
  totalEscalated,
  className,
}: SafetyFilterStripProps) {
  const classes = [styles.strip, className].filter(Boolean).join(" ")
  const overallTone: HermesTone = toneForScore(
    100 - Math.round((totalBlocked / Math.max(1, totalInspected)) * 1000),
  )

  return (
    <section
      className={classes}
      role="region"
      aria-label="Safety filter chain"
    >
      <header className={styles.head}>
        <div>
          <h3 className={styles.title}>
            <Shield
              size={13}
              strokeWidth={2.4}
              aria-hidden="true"
              style={{ marginInlineEnd: 6 }}
            />
            Safety filter chain
          </h3>
          <span className={styles.kicker}>
            Pre-input → moderation → grounding → post-output
          </span>
        </div>
        <Chip
          label={overallTone === "green" ? "All clear" : "Active filtering"}
          tone={overallTone}
        />
      </header>

      <ol
        className={styles.chain}
        aria-label="Filter pipeline"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        {filters.map((filter) => {
          const rate = hitRate(filter.hits24h, filter.inspected24h)
          const inferredTone: HermesTone =
            filter.tone ?? (rate < 0.001 ? "green" : rate < 0.01 ? "teal" : rate < 0.05 ? "amber" : "red")
          return (
            <li
              key={filter.id}
              className={styles.filter}
              data-phase={filter.phase}
            >
              <span className={styles.phaseLabel}>
                {filter.phase === "pre" ? (
                  <ShieldCheck
                    size={11}
                    strokeWidth={2.4}
                    aria-hidden="true"
                  />
                ) : (
                  <AlertTriangle
                    size={11}
                    strokeWidth={2.4}
                    aria-hidden="true"
                  />
                )}
                {PHASE_LABEL[filter.phase]}
              </span>
              <h4 className={styles.name}>{filter.name}</h4>
              {filter.detail ? (
                <span className={styles.detail}>{filter.detail}</span>
              ) : null}
              <div className={styles.row}>
                <span className={styles.hitCount}>
                  {filter.hits24h.toLocaleString()}
                  <small>Hits · 24h</small>
                </span>
                <Chip
                  label={`${(rate * 100).toFixed(2)}%`}
                  tone={inferredTone}
                />
              </div>
            </li>
          )
        })}
      </ol>

      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Inspected</span>
          <span className={styles.summaryValue}>
            {totalInspected.toLocaleString()}
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Blocked</span>
          <span className={styles.summaryValue}>
            {totalBlocked.toLocaleString()}
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Escalated</span>
          <span className={styles.summaryValue}>
            {totalEscalated.toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  )
}

export default SafetyFilterStrip
