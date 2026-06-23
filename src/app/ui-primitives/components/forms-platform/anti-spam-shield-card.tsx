import type {
  SpamDefence,
  SpamDefenceState,
  SpamShieldRule,
} from "./forms-platform-types"
import styles from "./anti-spam-shield-card.module.css"

interface AntiSpamShieldCardProps {
  /** Display title — e.g. "Anti-spam shield". */
  title: string
  /** Subtitle / scope hint. */
  subtitle?: string
  /** Aggregated 24h block count surfaced top-right. */
  totalBlocked: number
  /** Rule rows. */
  rules: ReadonlyArray<SpamShieldRule>
  className?: string
}

const STATE_LABEL: Record<SpamDefenceState, string> = {
  armed: "Armed",
  disabled: "Off",
  warning: "Warn",
}

const STATE_CLASS: Record<SpamDefenceState, string> = {
  armed: styles.stateArmed,
  disabled: styles.stateDisabled,
  warning: styles.stateWarning,
}

const DEFENCE_LABEL: Record<SpamDefence, string> = {
  honeypot: "Honeypot",
  turnstile: "Cloudflare Turnstile",
  "rate-limit": "Rate limit",
  "captcha-v3": "reCAPTCHA v3",
}

function DefenceGlyph({ defence }: { defence: SpamDefence }) {
  if (defence === "honeypot") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M7 1 2 4v3c0 3 2 5 5 6 3-1 5-3 5-6V4L7 1z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M5 7l1.5 1.5L9 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (defence === "turnstile") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5 7l1.5 1.5L9 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (defence === "rate-limit") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 4v3l2 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7c2-3 6-3 8 0M2 7c2 3 6 3 8 0" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6" cy="7" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function AntiSpamShieldCard({
  title,
  subtitle,
  totalBlocked,
  rules,
  className,
}: AntiSpamShieldCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={title}>
      <header className={styles.head}>
        <span className={styles.shield} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 1.5 2.5 4.2v5C2.5 13 5.4 15.4 9 16.5c3.6-1.1 6.5-3.5 6.5-7.3v-5L9 1.5z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="m6 9 2 2 4-4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className={styles.headBody}>
          <span className={styles.kicker}>Anti-spam</span>
          <h3 className={styles.title}>{title}</h3>
          {subtitle ? <span className={styles.subtitle}>{subtitle}</span> : null}
        </div>
        <div className={styles.blockedTotal}>
          <span className={styles.blockedTotalValue}>
            {totalBlocked.toLocaleString("en-AU")}
          </span>
          <span className={styles.blockedTotalLabel}>Blocked · 24h</span>
        </div>
      </header>

      <ul className={styles.rules}>
        {rules.map((rule) => (
          <li key={rule.id} className={styles.rule}>
            <span className={styles.ruleIcon}>
              <DefenceGlyph defence={rule.defence} />
            </span>
            <div className={styles.ruleBody}>
              <span className={styles.ruleLabel}>
                {rule.label || DEFENCE_LABEL[rule.defence]}
              </span>
              {rule.hint ? (
                <span className={styles.ruleHint}>{rule.hint}</span>
              ) : null}
            </div>
            <div className={styles.ruleStatus}>
              <span
                className={`${styles.stateChip} ${STATE_CLASS[rule.state]}`}
                aria-label={`${rule.label} status ${STATE_LABEL[rule.state]}`}
              >
                <span className={styles.stateDot} aria-hidden="true" />
                {STATE_LABEL[rule.state]}
              </span>
              <span className={styles.blockedCount}>
                {rule.blocked.toLocaleString("en-AU")} blocked
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
