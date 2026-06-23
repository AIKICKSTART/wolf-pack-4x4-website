import {
  FrameworkStatusCard,
  type FrameworkStatusCardProps,
} from "./framework-status-card"
import styles from "./compliance-dashboard.module.css"

export interface ComplianceDashboardProps {
  /** Optional kicker label, defaults to "Compliance / Live". */
  kicker?: string
  /** Heading, e.g. "Governance posture". */
  title: string
  /** Short summary line. */
  tagline?: string
  /** Framework cards to render. */
  frameworks: ReadonlyArray<FrameworkStatusCardProps>
  /** Optional small summary tiles shown in the head strip. */
  summary?: ReadonlyArray<ComplianceDashboardSummary>
  className?: string
}

export interface ComplianceDashboardSummary {
  label: string
  value: string
  unit?: string
}

function deriveSummary(
  frameworks: ReadonlyArray<FrameworkStatusCardProps>,
): ReadonlyArray<ComplianceDashboardSummary> {
  if (frameworks.length === 0) return []
  const total = frameworks.length
  const compliant = frameworks.filter((f) => f.status === "compliant").length
  const lapsed = frameworks.filter((f) => f.status === "lapsed").length
  const avg = Math.round(
    frameworks.reduce((sum, f) => sum + Math.max(0, Math.min(100, f.percent)), 0) /
      total,
  )

  return [
    { label: "Frameworks", value: String(total) },
    { label: "Compliant", value: `${compliant}/${total}` },
    { label: "Lapsed", value: String(lapsed) },
    { label: "Avg complete", value: String(avg), unit: "%" },
  ]
}

export function ComplianceDashboard({
  kicker = "Compliance / Live",
  title,
  tagline,
  frameworks,
  summary,
  className,
}: ComplianceDashboardProps) {
  const tiles = summary ?? deriveSummary(frameworks)

  return (
    <section
      className={[styles.dashboard, className].filter(Boolean).join(" ")}
      role="region"
      aria-label="Compliance dashboard"
    >
      <header className={styles.head}>
        <div className={styles.titleBlock}>
          <span className={styles.kicker}>{kicker}</span>
          <h2 className={styles.title}>{title}</h2>
          {tagline ? <p className={styles.tagline}>{tagline}</p> : null}
        </div>
      </header>

      {tiles.length > 0 ? (
        <ul className={styles.summaryStrip} aria-label="Compliance summary">
          {tiles.map((tile) => (
            <li key={tile.label} className={styles.summary}>
              <span className={styles.summaryLabel}>{tile.label}</span>
              <span>
                <span className={styles.summaryValue}>{tile.value}</span>
                {tile.unit ? (
                  <span className={styles.summaryUnit}>{tile.unit}</span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className={styles.frameworkGrid}>
        {frameworks.map((f) => (
          <FrameworkStatusCard key={f.framework} {...f} />
        ))}
      </div>
    </section>
  )
}

export default ComplianceDashboard
