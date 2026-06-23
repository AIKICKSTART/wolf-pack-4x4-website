import { ShieldCheck } from "lucide-react"

import { ProgressRadial } from "../primitives/progress-radial"

import type {
  AccessibilityCheckResult,
  AccessibilityCheckId,
} from "./brand-control-types"
import styles from "./brand-control.module.css"

interface AccessibilityGateCardProps {
  checks: ReadonlyArray<AccessibilityCheckResult>
  className?: string
}

const VERDICT_TONE: Record<AccessibilityCheckResult["verdict"], "red" | "amber" | "teal" | "green"> = {
  pass: "green",
  warn: "amber",
  fail: "red",
}

const VERDICT_LABEL: Record<AccessibilityCheckResult["verdict"], string> = {
  pass: "Pass",
  warn: "Warn",
  fail: "Fail",
}

const CHECK_DESC: Record<AccessibilityCheckId, string> = {
  contrast: "Foreground × background ratios",
  focus: "Visible focus rings on interactives",
  motion: "Honour prefers-reduced-motion",
  aria: "Semantic / ARIA coverage",
}

/**
 * Accessibility gate card — WCAG check summary (contrast / focus / motion /
 * ARIA) with a per-check pass count and an overall radial.
 */
export function AccessibilityGateCard({
  checks,
  className,
}: AccessibilityGateCardProps) {
  const totals = checks.reduce(
    (acc, check) => ({
      passing: acc.passing + check.passing,
      total: acc.total + check.total,
      worst:
        check.verdict === "fail"
          ? "fail"
          : check.verdict === "warn" && acc.worst !== "fail"
            ? "warn"
            : acc.worst,
    }),
    { passing: 0, total: 0, worst: "pass" as AccessibilityCheckResult["verdict"] }
  )
  const overallPct = totals.total > 0 ? Math.round((totals.passing / totals.total) * 100) : 0

  return (
    <article
      className={[styles.card, styles.cardWide, className].filter(Boolean).join(" ")}
      aria-label="Accessibility gate summary"
    >
      <header className={styles.head}>
        <div className={styles.headStack}>
          <span className={styles.kicker}>
            <ShieldCheck size={12} aria-hidden="true" /> Umbrella · Gate
          </span>
          <h3 className={styles.title}>Accessibility gate</h3>
          <p className={styles.subtitle}>
            WCAG 2.2 audit summary. Failing checks block production deploy.
          </p>
        </div>
        <ProgressRadial
          value={overallPct}
          max={100}
          size="md"
          tone={VERDICT_TONE[totals.worst]}
          showLabel
          label={`${overallPct}% gate score`}
        />
      </header>

      <div className={styles.list}>
        {checks.map((check) => (
          <div key={check.id} className={styles.row}>
            <span
              className={styles.swatch}
              style={{
                background:
                  check.verdict === "pass"
                    ? "var(--primitive-green)"
                    : check.verdict === "warn"
                      ? "var(--primitive-amber)"
                      : "var(--primitive-red)",
                width: 14,
                height: 14,
              }}
              aria-hidden="true"
            />
            <div className={styles.rowMain}>
              <strong>{check.label}</strong>
              <span>{check.note ?? CHECK_DESC[check.id]}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={`${styles.tag} ${getVerdictClass(check.verdict)}`}>
                {VERDICT_LABEL[check.verdict]}
              </span>
              <span className={`${styles.tokenChip} ${styles.numeric}`}>
                {check.passing}/{check.total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

function getVerdictClass(verdict: AccessibilityCheckResult["verdict"]): string {
  if (verdict === "pass") return styles.tagGreen
  if (verdict === "warn") return styles.tagAmber
  return styles.tagRed
}

export default AccessibilityGateCard
