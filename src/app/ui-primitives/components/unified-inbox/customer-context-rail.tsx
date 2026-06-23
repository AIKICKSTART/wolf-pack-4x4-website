import { Avatar } from "../primitives/avatar"

import {
  formatAud,
  type UnifiedCustomerProfile,
  type UnifiedRecentJob,
} from "./unified-inbox-types"
import styles from "./customer-context-rail.module.css"

interface CustomerContextRailProps {
  customer: UnifiedCustomerProfile
  /** Most recent jobs, newest first. */
  recentJobs: ReadonlyArray<UnifiedRecentJob>
  /** Optional persona chip text, e.g. "Returning · Hilux community". */
  persona?: string
  className?: string
}

export function CustomerContextRail({
  customer,
  recentJobs,
  persona = "Returning customer",
  className,
}: CustomerContextRailProps) {
  const classes = [styles.rail, className].filter(Boolean).join(" ")

  return (
    <aside
      className={classes}
      aria-label={`Customer context for ${customer.name}`}
    >
      <header className={styles.head}>
        <Avatar
          name={customer.name}
          src={customer.avatarSrc}
          size="lg"
          tone="amber"
        />
        <div className={styles.identity}>
          <span className={styles.kicker}>Customer</span>
          <h3 className={styles.name}>{customer.name}</h3>
          {customer.locality ? (
            <span className={styles.locality}>{customer.locality}</span>
          ) : null}
          {persona ? (
            <span className={styles.persona}>{persona}</span>
          ) : null}
        </div>
      </header>

      {(customer.email || customer.phone) && (
        <dl className={styles.contactBlock}>
          {customer.phone ? (
            <div className={styles.contactRow}>
              <dt className={styles.contactLabel}>Phone</dt>
              <dd className={styles.contactValue}>{customer.phone}</dd>
            </div>
          ) : null}
          {customer.email ? (
            <div className={styles.contactRow}>
              <dt className={styles.contactLabel}>Email</dt>
              <dd className={styles.contactValue}>{customer.email}</dd>
            </div>
          ) : null}
        </dl>
      )}

      <ul className={styles.stats}>
        <li className={styles.stat}>
          <span className={styles.statValue}>
            {formatAud(customer.lifetimeValueCents)}
          </span>
          <span className={styles.statLabel}>Lifetime value</span>
        </li>
        <li className={styles.stat}>
          <span className={styles.statValue}>{customer.jobCount}</span>
          <span className={styles.statLabel}>Past jobs</span>
        </li>
        <li className={styles.stat}>
          <span className={styles.statValue}>{recentJobs.length}</span>
          <span className={styles.statLabel}>Recent</span>
        </li>
      </ul>

      <section className={styles.jobs}>
        <header className={styles.jobsHead}>
          <span className={styles.jobsKicker}>Recent jobs</span>
        </header>
        {recentJobs.length === 0 ? (
          <p className={styles.empty}>No jobs in the last 12 months.</p>
        ) : (
          <ul className={styles.jobsList}>
            {recentJobs.map((job) => (
              <li key={job.id} className={styles.jobRow}>
                <span className={styles.jobTitle}>{job.title}</span>
                <span className={styles.jobMeta}>
                  <span>{job.completedAt}</span>
                  <span>·</span>
                  <span className={styles.jobAmount}>
                    {formatAud(job.totalCents)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </aside>
  )
}

export default CustomerContextRail
