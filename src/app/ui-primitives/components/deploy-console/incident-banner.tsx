import {
  INCIDENT_BANNER_TONE,
  type ActiveIncidentSummary,
} from "./deploy-console-types"
import styles from "./incident-banner.module.css"
import shell from "./deploy-console.module.css"

export interface IncidentBannerProps {
  incident: ActiveIncidentSummary
  /** Whether to render the muted/no-incident state. */
  paused?: boolean
  className?: string
}

function toneClassFor(severity: ActiveIncidentSummary["severity"]): string {
  switch (INCIDENT_BANNER_TONE[severity]) {
    case "red":
      return shell.toneRed
    case "amber":
      return shell.toneAmber
    case "teal":
      return shell.toneTeal
    default:
      return shell.toneAmber
  }
}

const SEVERITY_LABEL: Record<ActiveIncidentSummary["severity"], string> = {
  sev1: "SEV1",
  sev2: "SEV2",
  sev3: "SEV3",
}

export function IncidentBanner({
  incident,
  paused = false,
  className,
}: IncidentBannerProps) {
  const toneCls = toneClassFor(incident.severity)
  return (
    <aside
      className={[
        shell.shell,
        toneCls,
        styles.banner,
        paused ? styles.paused : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="alert"
      aria-live="polite"
      aria-label={`Active incident — ${incident.title}`}
    >
      <span className={styles.pulse} aria-hidden="true" />
      <div className={styles.body}>
        <header className={styles.head}>
          <span className={[shell.chip, toneCls].join(" ")}>
            {SEVERITY_LABEL[incident.severity]} · {incident.id}
          </span>
          <h3 className={styles.title}>{incident.title}</h3>
        </header>
        <p className={styles.status}>{incident.status}</p>
      </div>
      <div className={styles.foot}>
        <span className={styles.eta}>
          <span className={shell.sectionLabel}>ETA</span>
          <strong className={shell.tabular}>{incident.eta}</strong>
        </span>
        {incident.href ? (
          <a
            className={[shell.button, shell.buttonPrimary, toneCls].join(" ")}
            href={incident.href}
            aria-label={`Open the incident report for ${incident.title}`}
          >
            Open report →
          </a>
        ) : null}
      </div>
    </aside>
  )
}

export default IncidentBanner
