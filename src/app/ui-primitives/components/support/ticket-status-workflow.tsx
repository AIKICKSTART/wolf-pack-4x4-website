import {
  TICKET_STATUS_LABEL,
  TICKET_STATUS_ORDER,
  TICKET_STATUS_TONE,
  TICKET_STATUS_TRANSITIONS,
  type SupportTone,
  type TicketStatus,
} from "./support-types"
import styles from "./ticket-status-workflow.module.css"

export interface TicketStatusWorkflowProps {
  current: TicketStatus
  /** Override the auto-derived allowed transitions. */
  allowedTransitions?: ReadonlyArray<TicketStatus>
  className?: string
}

const TONE_CLASS: Record<SupportTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

export function TicketStatusWorkflow({
  current,
  allowedTransitions,
  className,
}: TicketStatusWorkflowProps) {
  const transitions =
    allowedTransitions ?? TICKET_STATUS_TRANSITIONS[current]
  const classes = [styles.workflow, className].filter(Boolean).join(" ")
  const currentIndex = TICKET_STATUS_ORDER.indexOf(current)

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Ticket workflow — currently ${TICKET_STATUS_LABEL[current]}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Workflow</span>
        <h3 className={styles.title}>Ticket status</h3>
      </header>

      <ol className={styles.steps}>
        {TICKET_STATUS_ORDER.map((status, idx) => {
          const tone = TICKET_STATUS_TONE[status]
          const isCurrent = status === current
          const isPast = idx < currentIndex
          const stepClass = [
            styles.step,
            TONE_CLASS[tone],
            isCurrent ? styles.current : "",
            isPast ? styles.past : "",
          ]
            .filter(Boolean)
            .join(" ")
          return (
            <li key={status} className={stepClass}>
              <span className={styles.node} aria-hidden="true">
                <span className={styles.nodeInner} />
              </span>
              <span className={styles.stepLabel}>{TICKET_STATUS_LABEL[status]}</span>
              {isCurrent ? (
                <span className={styles.currentTag}>Now</span>
              ) : null}
            </li>
          )
        })}
      </ol>

      <footer className={styles.foot}>
        <span className={styles.footLabel}>Allowed transitions</span>
        <div className={styles.transitions}>
          {transitions.length === 0 ? (
            <span className={styles.transitionsEmpty}>Terminal state</span>
          ) : (
            transitions.map((next) => {
              const tone = TICKET_STATUS_TONE[next]
              return (
                <span
                  key={next}
                  className={[styles.transitionChip, TONE_CLASS[tone]].join(" ")}
                >
                  → {TICKET_STATUS_LABEL[next]}
                </span>
              )
            })
          )}
        </div>
      </footer>
    </section>
  )
}

export default TicketStatusWorkflow
