import { RadialMeter } from "../charts/radial-meter"
import { MetricBlock, type MetricBlockItem } from "../data-display/metric-block"

import styles from "./pass-fail-counter.module.css"

export interface PassFailWindow {
  label: string
  passed: number
  failed: number
}

interface PassFailCounterProps {
  /** Today / week / month windows. */
  windows: ReadonlyArray<PassFailWindow>
  /** Optional title override. */
  title?: string
  className?: string
}

function ratio(passed: number, failed: number): number {
  const total = passed + failed
  if (total === 0) return 0
  return passed / total
}

export function PassFailCounter({
  windows,
  title = "Pass / fail counter",
  className,
}: PassFailCounterProps) {
  const totals = windows.reduce(
    (acc, window) => ({
      passed: acc.passed + window.passed,
      failed: acc.failed + window.failed,
    }),
    { passed: 0, failed: 0 },
  )
  const passRate = ratio(totals.passed, totals.failed)
  const passRatePct = Math.round(passRate * 100)
  const tone: "green" | "amber" | "red" =
    passRatePct >= 92 ? "green" : passRatePct >= 80 ? "amber" : "red"

  const metrics: ReadonlyArray<MetricBlockItem> = windows.map((window) => {
    const windowRate = Math.round(ratio(window.passed, window.failed) * 100)
    return {
      id: window.label,
      label: window.label,
      value: `${window.passed}`,
      unit: `/ ${window.passed + window.failed}`,
      delta: {
        label: `${windowRate}%`,
        direction: windowRate >= 92 ? "up" : windowRate >= 80 ? "flat" : "down",
      },
    }
  })

  const ariaLabel = `Pass rate ${passRatePct} percent across ${totals.passed + totals.failed} tests.`

  return (
    <section
      className={`${styles.panel} ${className ?? ""}`.trim()}
      aria-label={title}
    >
      <div className={styles.body}>
        <div className={styles.head}>
          <span className={styles.kicker}>ADR test outcomes</span>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <MetricBlock metrics={metrics} />
        <div className={styles.legend}>
          <span className={`${styles.swatch} ${styles.swatchPass}`}>
            Passed · {totals.passed}
          </span>
          <span className={`${styles.swatch} ${styles.swatchFail}`}>
            Failed · {totals.failed}
          </span>
        </div>
      </div>

      <div className={styles.meter}>
        <div
          role="meter"
          aria-valuenow={passRatePct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={ariaLabel}
        >
          <RadialMeter
            value={passRatePct}
            max={100}
            label="Pass rate"
            tone={tone}
            ariaLabel={ariaLabel}
            unit="%"
            size={140}
            caption={`${totals.passed + totals.failed} tests · trailing window`}
          />
        </div>
      </div>
    </section>
  )
}

export default PassFailCounter
