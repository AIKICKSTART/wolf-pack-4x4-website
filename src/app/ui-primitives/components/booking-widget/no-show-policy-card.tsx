import { AlertOctagon, PhoneCall, ShieldAlert } from "lucide-react"

import styles from "./no-show-policy-card.module.css"

interface NoShowPolicyCardProps {
  /** Rules in order of importance — rendered as a numbered list. */
  rules: ReadonlyArray<string>
  /** How long before the slot the customer must cancel without fee, e.g. "24 hours". */
  cancellationDeadline: string
  /** How many reschedules are included free, e.g. "1 free reschedule". */
  rescheduleAllowance: string
  /** Phone number rendered as the tel: contact CTA. */
  contactPhone: string
  /** When true, the card renders with alert tone and role="alert". Default false. */
  warning?: boolean
}

export function NoShowPolicyCard({
  rules,
  cancellationDeadline,
  rescheduleAllowance,
  contactPhone,
  warning = false,
}: NoShowPolicyCardProps) {
  return (
    <aside
      className={[styles.card, warning && styles.warning].filter(Boolean).join(" ")}
      role={warning ? "alert" : undefined}
      aria-label="No-show policy"
    >
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          {warning ? (
            <AlertOctagon size={18} strokeWidth={2.4} />
          ) : (
            <ShieldAlert size={18} strokeWidth={2.4} />
          )}
        </span>
        <div>
          <span className={styles.kicker}>No-show policy</span>
          <h3 className={styles.title}>What happens if you don&apos;t turn up</h3>
        </div>
      </header>

      <ol className={styles.rules}>
        {rules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ol>

      <div className={styles.chips}>
        <span className={styles.chip}>
          <strong>Cancel by</strong> {cancellationDeadline}
        </span>
        <span className={styles.chip}>
          <strong>Reschedules</strong> {rescheduleAllowance}
        </span>
      </div>

      <a className={styles.contact} href={`tel:${contactPhone.replace(/\s/g, "")}`}>
        <PhoneCall size={14} strokeWidth={2.4} aria-hidden="true" />
        Call the workshop {contactPhone}
      </a>
    </aside>
  )
}

export default NoShowPolicyCard
