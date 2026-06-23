import {
  TICKET_PRIORITY_LABEL,
  TICKET_PRIORITY_TONE,
  type SupportTone,
  type TicketPriority,
} from "./support-types"
import styles from "./triage-rules-card.module.css"

export interface TriageRuleProps {
  name: string
  /** Plain-language predicate, e.g. "Subject contains \"warranty\"". */
  condition: string
  /** Team route, e.g. "Workshop · Bay 2". */
  route: string
  setPriority: TicketPriority
  /** Optional tags applied by the rule. */
  tags?: ReadonlyArray<string>
  /** Whether the rule is currently active. */
  enabled?: boolean
  /** Match count in the period. */
  matchCount?: number
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

export function TriageRulesCard({
  name,
  condition,
  route,
  setPriority,
  tags = [],
  enabled = true,
  matchCount,
  className,
}: TriageRuleProps) {
  const priorityTone = TICKET_PRIORITY_TONE[setPriority]
  const classes = [
    styles.card,
    enabled ? styles.enabled : styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article
      className={classes}
      aria-label={`Triage rule — ${name}${enabled ? "" : ", disabled"}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Triage rule</span>
        <h3 className={styles.title}>{name}</h3>
        <span
          className={[styles.enabledChip, enabled ? styles.on : styles.off].join(" ")}
        >
          {enabled ? "Active" : "Paused"}
        </span>
      </header>

      <ol className={styles.steps}>
        <li className={styles.step}>
          <span className={styles.stepKicker}>If</span>
          <p className={styles.stepBody}>{condition}</p>
        </li>
        <li className={styles.step}>
          <span className={styles.stepKicker}>Then route to</span>
          <p className={styles.stepBody}>{route}</p>
        </li>
        <li className={styles.step}>
          <span className={styles.stepKicker}>And set priority</span>
          <p className={styles.stepBody}>
            <span
              className={[styles.priorityChip, TONE_CLASS[priorityTone]].join(" ")}
            >
              {TICKET_PRIORITY_LABEL[setPriority]}
            </span>
          </p>
        </li>
        {tags.length > 0 ? (
          <li className={styles.step}>
            <span className={styles.stepKicker}>And tag with</span>
            <p className={styles.stepBody}>
              <span className={styles.tagList}>
                {tags.map((tag) => (
                  <span key={tag} className={styles.tagChip}>
                    #{tag}
                  </span>
                ))}
              </span>
            </p>
          </li>
        ) : null}
      </ol>

      {typeof matchCount === "number" ? (
        <footer className={styles.foot}>
          <span className={styles.footLabel}>Matched</span>
          <span className={styles.footValue}>{matchCount} this week</span>
        </footer>
      ) : null}
    </article>
  )
}

export default TriageRulesCard
