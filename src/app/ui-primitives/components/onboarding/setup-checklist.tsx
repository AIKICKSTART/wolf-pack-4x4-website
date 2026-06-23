import styles from "./setup-checklist.module.css"

export type SetupChecklistStatus = "todo" | "in-progress" | "done"

export interface SetupChecklistStep {
  id: string
  title: string
  description: string
  status: SetupChecklistStatus
  /** Short duration chip text, e.g. "2 min". */
  duration?: string
  /** href for the "complete now" CTA. */
  href?: string
  /** Visible only when the step is expanded. */
  expanded?: boolean
  /** Long-form helper copy revealed when expanded. */
  details?: string
}

interface SetupChecklistProps {
  /** Eyebrow label, e.g. "Workshop setup". */
  kicker: string
  /** Big headline above the list, e.g. "Get Oak Flats workshop live". */
  title: string
  steps: ReadonlyArray<SetupChecklistStep>
  /** ARIA-friendly label for the progress bar. */
  progressLabel?: string
  className?: string
}

const STATUS_LABEL: Record<SetupChecklistStatus, string> = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
}

function computeProgress(steps: ReadonlyArray<SetupChecklistStep>): number {
  if (steps.length === 0) {
    return 0
  }
  const done = steps.filter((s) => s.status === "done").length
  return Math.round((done / steps.length) * 100)
}

export function SetupChecklist({
  kicker,
  title,
  steps,
  progressLabel = "Setup progress",
  className,
}: SetupChecklistProps) {
  const percent = computeProgress(steps)
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={title}>
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>{kicker}</span>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.progressWrap}>
          <span className={styles.progressValue}>{percent}%</span>
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-label={progressLabel}
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span
              className={styles.progressFill}
              style={{ width: `${percent}%` }}
              aria-hidden="true"
            />
          </div>
        </div>
      </header>

      <ol className={styles.list}>
        {steps.map((step, index) => {
          const stepClasses = [
            styles.step,
            styles[`status_${step.status.replace("-", "_")}`],
            step.expanded ? styles.stepExpanded : null,
          ]
            .filter(Boolean)
            .join(" ")
          return (
            <li key={step.id} className={stepClasses}>
              <div className={styles.stepHead}>
                <span className={styles.stepIndex} aria-hidden="true">
                  {index + 1}
                </span>
                <span className={styles.stepCircle} aria-hidden="true">
                  {step.status === "done" ? (
                    <svg viewBox="0 0 16 16" width="14" height="14">
                      <path
                        d="M3 8 L7 12 L13 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : step.status === "in-progress" ? (
                    <span className={styles.spinner} />
                  ) : null}
                </span>
                <div className={styles.stepBody}>
                  <span className={styles.stepTitleRow}>
                    <span className={styles.stepTitle}>{step.title}</span>
                    {step.duration ? (
                      <span className={styles.duration}>{step.duration}</span>
                    ) : null}
                  </span>
                  <span className={styles.stepDescription}>{step.description}</span>
                </div>
                <span className={styles.stepStatus}>{STATUS_LABEL[step.status]}</span>
              </div>
              {step.expanded && step.details ? (
                <p className={styles.details}>{step.details}</p>
              ) : null}
              {step.expanded && step.status !== "done" && step.href ? (
                <a className={styles.completeCta} href={step.href}>
                  Complete now <span aria-hidden="true">→</span>
                </a>
              ) : null}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default SetupChecklist
