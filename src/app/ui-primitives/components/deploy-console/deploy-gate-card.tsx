import { ProgressRadial } from "../primitives/progress-radial"

import { GATE_STATUS_LABEL, type GateCheck } from "./deploy-console-types"
import styles from "./deploy-gate-card.module.css"
import shell from "./deploy-console.module.css"

export interface DeployGateCardProps {
  title: string
  /** Human description of what this gate guards. */
  description: string
  checks: ReadonlyArray<GateCheck>
  /** Optional kicker rendered above the title. */
  kicker?: string
  /** Display ready-to-deploy CTA when all checks pass. */
  deployHref?: string
  className?: string
}

const STATUS_TONE_CLASS: Record<GateCheck["status"], string> = {
  pending: shell.toneNeutral,
  running: shell.toneTeal,
  passed: shell.toneGreen,
  failed: shell.toneRed,
  skipped: shell.toneAmber,
}

function StatusGlyph({ status }: { status: GateCheck["status"] }) {
  switch (status) {
    case "passed":
      return (
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M2.5 7.5L6 11l5.5-8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case "failed":
      return (
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M3 3l8 8M11 3l-8 8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case "running":
      return (
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" aria-hidden="true">
          <circle cx="7" cy="7" r="5" strokeWidth="1.5" strokeDasharray="20 10" />
        </svg>
      )
    case "skipped":
      return (
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M3 3v8M7 3v8M11 3v8" strokeWidth="1.5" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" aria-hidden="true">
          <circle cx="7" cy="7" r="5" strokeWidth="1.5" />
        </svg>
      )
  }
}

function summarise(
  checks: ReadonlyArray<GateCheck>,
): {
  passed: number
  failed: number
  running: number
  pending: number
  skipped: number
  ratio: number
  cleared: boolean
} {
  let passed = 0
  let failed = 0
  let running = 0
  let pending = 0
  let skipped = 0
  for (const check of checks) {
    if (check.status === "passed") passed += 1
    else if (check.status === "failed") failed += 1
    else if (check.status === "running") running += 1
    else if (check.status === "skipped") skipped += 1
    else pending += 1
  }
  const total = checks.length || 1
  const ratio = Math.round((passed / total) * 100)
  const cleared = failed === 0 && running === 0 && pending === 0 && passed > 0
  return { passed, failed, running, pending, skipped, ratio, cleared }
}

export function DeployGateCard({
  title,
  description,
  checks,
  kicker,
  deployHref,
  className,
}: DeployGateCardProps) {
  const summary = summarise(checks)
  const headlineTone = summary.failed > 0
    ? shell.toneRed
    : summary.running > 0
    ? shell.toneTeal
    : summary.cleared
    ? shell.toneGreen
    : shell.toneAmber
  const radialTone = summary.failed > 0
    ? "red"
    : summary.running > 0
    ? "teal"
    : summary.cleared
    ? "green"
    : "amber"

  return (
    <article
      className={[shell.shell, headlineTone, styles.card, className]
        .filter(Boolean)
        .join(" ")}
      aria-label={`Deploy gate — ${title}`}
    >
      <header className={styles.head}>
        <div className={shell.shellIdentity}>
          {kicker ? <span className={shell.kicker}>{kicker}</span> : null}
          <h3 className={shell.title}>{title}</h3>
          <p className={shell.subtitle}>{description}</p>
        </div>
        <div className={styles.score}>
          <ProgressRadial
            value={summary.ratio}
            tone={radialTone}
            size="md"
            thickness={6}
            showLabel
            label={`${summary.passed} of ${checks.length} checks passed`}
          />
        </div>
      </header>

      <ul className={styles.checks}>
        {checks.map((check) => (
          <li
            key={check.id}
            className={[styles.check, STATUS_TONE_CLASS[check.status]].join(" ")}
          >
            <span className={styles.glyph} aria-hidden="true">
              <StatusGlyph status={check.status} />
            </span>
            <div className={styles.checkBody}>
              <span className={styles.checkLabel}>{check.label}</span>
              {check.detail ? (
                <span className={styles.checkDetail}>{check.detail}</span>
              ) : null}
            </div>
            <div className={styles.checkMeta}>
              {check.duration ? (
                <span className={styles.duration}>{check.duration}</span>
              ) : null}
              <span
                className={[shell.chip, STATUS_TONE_CLASS[check.status]].join(" ")}
                aria-label={`${check.label} ${GATE_STATUS_LABEL[check.status]}`}
              >
                {GATE_STATUS_LABEL[check.status]}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <footer className={styles.foot}>
        <dl className={styles.summary}>
          <div>
            <dt>Passed</dt>
            <dd className={shell.tabular}>{summary.passed}</dd>
          </div>
          <div>
            <dt>Failed</dt>
            <dd className={shell.tabular}>{summary.failed}</dd>
          </div>
          <div>
            <dt>Running</dt>
            <dd className={shell.tabular}>{summary.running}</dd>
          </div>
          <div>
            <dt>Pending</dt>
            <dd className={shell.tabular}>{summary.pending + summary.skipped}</dd>
          </div>
        </dl>
        {deployHref ? (
          <a
            className={[shell.button, shell.buttonPrimary, headlineTone].join(" ")}
            href={summary.cleared ? deployHref : undefined}
            aria-disabled={!summary.cleared}
            tabIndex={summary.cleared ? 0 : -1}
            data-disabled={summary.cleared ? undefined : true}
          >
            {summary.cleared
              ? "Promote to production →"
              : summary.failed > 0
              ? "Gate failed — block"
              : "Awaiting checks"}
          </a>
        ) : null}
      </footer>
    </article>
  )
}

export default DeployGateCard
