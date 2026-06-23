import styles from "./compliance-disclosure-block.module.css"

export interface CompliancePolicy {
  id: string
  /** Short policy label, e.g. "Australian Privacy Principles (APP)". */
  label: string
  /** Optional href to the full document. */
  href?: string
}

export interface ComplianceDisclosureBlockProps {
  /** Top headline, e.g. "How we handle your information". */
  title: string
  /** Privacy paragraph copy. */
  privacyBody: string
  /** Bullet list of governing policies. */
  policies: ReadonlyArray<CompliancePolicy>
  /** Retention policy summary. */
  retentionLabel: string
  retentionDetail: string
  /** Contact email shown at the foot. */
  contactEmail: string
  /** Last updated text, e.g. "Last updated 12 March 2026". */
  lastUpdated: string
  className?: string
}

export function ComplianceDisclosureBlock({
  title,
  privacyBody,
  policies,
  retentionLabel,
  retentionDetail,
  contactEmail,
  lastUpdated,
  className,
}: ComplianceDisclosureBlockProps) {
  const classes = [styles.block, className].filter(Boolean).join(" ")

  return (
    <aside className={classes} aria-label="Compliance disclosure">
      <header className={styles.head}>
        <span className={styles.kicker}>Legal & Compliance</span>
        <h3 className={styles.title}>{title}</h3>
      </header>

      <p className={styles.body}>{privacyBody}</p>

      <ul className={styles.policyList}>
        {policies.map((policy) => (
          <li key={policy.id} className={styles.policyItem}>
            <span className={styles.policyDot} aria-hidden="true" />
            {policy.href ? (
              <a className={styles.policyLink} href={policy.href}>
                {policy.label}
                <span aria-hidden="true" className={styles.policyArrow}>
                  ↗
                </span>
              </a>
            ) : (
              <span className={styles.policyLabel}>{policy.label}</span>
            )}
          </li>
        ))}
      </ul>

      <dl className={styles.retention}>
        <dt>{retentionLabel}</dt>
        <dd>{retentionDetail}</dd>
      </dl>

      <footer className={styles.foot}>
        <span className={styles.contactLabel}>
          Privacy contact{" "}
          <a className={styles.contactLink} href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
        </span>
        <span className={styles.lastUpdated}>{lastUpdated}</span>
      </footer>
    </aside>
  )
}

export default ComplianceDisclosureBlock
