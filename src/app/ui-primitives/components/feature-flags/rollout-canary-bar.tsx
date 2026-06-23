import styles from "./rollout-canary-bar.module.css"

export interface CanaryStepSpec {
  percent: number
  /** Whether this step has already been deployed. */
  reached: boolean
  /** Label override. */
  label?: string
}

export interface RolloutCanaryBarProps {
  /** Steps ordered low → high. Default 1/5/25/50/100. */
  steps?: ReadonlyArray<CanaryStepSpec>
  /** Optional ETA text rendered as a chip. */
  eta?: string
  /** Currently active step (highlighted) — must be an entry in steps. */
  currentStepPercent: number
  className?: string
}

const DEFAULT_STEPS: ReadonlyArray<CanaryStepSpec> = [
  { percent: 1, reached: false },
  { percent: 5, reached: false },
  { percent: 25, reached: false },
  { percent: 50, reached: false },
  { percent: 100, reached: false },
]

export function RolloutCanaryBar({
  steps = DEFAULT_STEPS,
  eta,
  currentStepPercent,
  className,
}: RolloutCanaryBarProps) {
  return (
    <section
      className={[styles.wrap, className].filter(Boolean).join(" ")}
      aria-label="Canary rollout progression"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Canary rollout</span>
        {eta ? (
          <span className={styles.eta}>
            <span className={styles.etaLabel}>Next step</span>
            <span className={styles.etaValue}>{eta}</span>
          </span>
        ) : null}
      </header>

      <ol className={styles.steps}>
        {steps.map((step, index) => {
          const isCurrent = step.percent === currentStepPercent
          const isLast = index === steps.length - 1
          return (
            <li
              key={step.percent}
              className={[
                styles.step,
                step.reached ? styles.reached : "",
                isCurrent ? styles.current : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span className={styles.stepPercent}>{step.percent}%</span>
              {step.label ? (
                <span className={styles.stepLabel}>{step.label}</span>
              ) : null}
              {!isLast ? (
                <span className={styles.connector} aria-hidden="true" />
              ) : null}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default RolloutCanaryBar
