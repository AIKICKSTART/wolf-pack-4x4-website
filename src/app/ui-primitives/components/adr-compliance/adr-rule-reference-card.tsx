import { DashboardCard } from "../data-display/dashboard-card"
import { Chip } from "../primitives/chip"

import {
  ADR_RULES,
  type AdrRuleId,
} from "./adr-compliance-types"
import styles from "./adr-rule-reference-card.module.css"

interface AdrRuleReferenceCardProps {
  /** Which rule to surface. */
  rule: AdrRuleId
  /** Optional override summary (uses ADR_RULES default). */
  summary?: string
  /** Optional override link (uses ADR_RULES default). */
  href?: string
  /** Optional chip badges, e.g. "Stationary test", "Light vehicle". */
  badges?: ReadonlyArray<{ label: string; tone?: "neutral" | "amber" | "teal" | "green" | "red" }>
  className?: string
  /** Render mode — "card" pulls in DashboardCard wrapper, "plain" renders the body only. */
  variant?: "card" | "plain"
}

function CardBody({
  rule,
  summary,
  href,
  badges,
}: Omit<AdrRuleReferenceCardProps, "className" | "variant">) {
  const detail = ADR_RULES[rule]
  const finalSummary = summary ?? detail.summary
  const finalHref = href ?? detail.href

  return (
    <article className={styles.card}>
      <div className={styles.numberPill} aria-hidden="true">
        <span className={styles.numberPillLabel}>Rule</span>
        <span className={styles.numberPillValue}>{detail.number}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{detail.title}</h3>
        <p className={styles.summary}>{finalSummary}</p>
        <div className={styles.footer}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--primitive-space-1-5)" }}>
            {(badges ?? []).map((badge) => (
              <Chip key={badge.label} label={badge.label} tone={badge.tone ?? "neutral"} />
            ))}
          </div>
          <a
            className={styles.link}
            href={finalHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${detail.number} official PDF`}
          >
            Open PDF <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  )
}

export function AdrRuleReferenceCard({
  rule,
  summary,
  href,
  badges,
  className,
  variant = "plain",
}: AdrRuleReferenceCardProps) {
  if (variant === "card") {
    const detail = ADR_RULES[rule]
    return (
      <DashboardCard
        label="ADR reference"
        value={detail.number}
        surface="material"
        className={className}
        meta={detail.title}
        spark={
          <CardBody
            rule={rule}
            summary={summary}
            href={href}
            badges={badges}
          />
        }
      />
    )
  }
  return (
    <div className={className}>
      <CardBody rule={rule} summary={summary} href={href} badges={badges} />
    </div>
  )
}

export default AdrRuleReferenceCard
