import {
  SEVERITY_LABEL,
  type IncidentSeverity,
} from "./compliance-types"
import styles from "./incident-disclosure-banner.module.css"

export type IncidentTimelineStatus = "done" | "current" | "pending"

export interface IncidentTimelineStep {
  id: string
  label: string
  status: IncidentTimelineStatus
}

export interface IncidentDisclosureBannerProps {
  /** Severity classification. */
  severity: IncidentSeverity
  /** Incident reference, e.g. "MUF-INC-2026-051". */
  incidentId: string
  /** Headline, e.g. "Booking API degraded — investigating". */
  headline: string
  /** Public-friendly description. */
  body: string
  /** Status timeline steps. */
  timeline: ReadonlyArray<IncidentTimelineStep>
  /** Latest mitigation update text. */
  mitigationUpdate: string
  /** Mitigation update timestamp. */
  updatedAt: string
  /** Statuspage / live updates URL. */
  statuspageHref: string
  /** Statuspage button label. */
  statuspageLabel?: string
  className?: string
}

const SEV_CLASS: Record<IncidentSeverity, string> = {
  "sev-1": styles.sev1,
  "sev-2": styles.sev2,
  "sev-3": styles.sev3,
  "sev-4": styles.sev4,
}

const STEP_CLASS: Record<IncidentTimelineStatus, string> = {
  done: styles.timelineDone,
  current: styles.timelineCurrent,
  pending: "",
}

export function IncidentDisclosureBanner({
  severity,
  incidentId,
  headline,
  body,
  timeline,
  mitigationUpdate,
  updatedAt,
  statuspageHref,
  statuspageLabel = "Live updates",
  className,
}: IncidentDisclosureBannerProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className={[styles.banner, SEV_CLASS[severity], className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.shell}>
        <div className={styles.copy}>
          <div className={styles.header}>
            <span className={styles.severityChip}>
              <span className={styles.severityDot} aria-hidden="true" />
              {SEVERITY_LABEL[severity]}
            </span>
            <code style={{ fontFamily: "var(--primitive-font-mono)", fontSize: 11, color: "var(--primitive-muted)" }}>
              {incidentId}
            </code>
          </div>
          <h3 className={styles.title}>{headline}</h3>
          <p className={styles.body}>{body}</p>
          <ol className={styles.timeline} aria-label="Incident status timeline">
            {timeline.map((step) => (
              <li
                key={step.id}
                className={[styles.timelineItem, STEP_CLASS[step.status]].join(" ")}
                aria-current={step.status === "current" ? "step" : undefined}
              >
                <span className={styles.timelineDot} aria-hidden="true" />
                {step.label}
              </li>
            ))}
          </ol>
        </div>
        <a
          className={styles.statuspage}
          href={statuspageHref}
          target="_blank"
          rel="noreferrer"
        >
          {statuspageLabel} →
        </a>
      </div>

      <div className={styles.sub}>
        <span className={styles.subLabel}>Mitigation update · {updatedAt}</span>
        <p className={styles.subBody}>{mitigationUpdate}</p>
      </div>
    </div>
  )
}

export default IncidentDisclosureBanner
