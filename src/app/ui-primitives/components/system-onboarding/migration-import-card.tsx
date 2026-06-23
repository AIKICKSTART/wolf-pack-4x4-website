import { ProgressLinear } from "../primitives/progress-linear"

import {
  MIGRATION_SOURCE_LABEL,
  MIGRATION_STATUS_LABEL,
  MIGRATION_STATUS_TONE,
  type MigrationImportCounts,
  type MigrationSource,
  type MigrationStatus,
} from "./system-onboarding-types"
import shell from "./system-onboarding.module.css"
import styles from "./migration-import-card.module.css"

export interface MigrationImportCardProps {
  /** Eyebrow eg "Optional / Migration". */
  kicker: string
  /** Big title eg "Bring your MYOB history with you". */
  title: string
  /** Supporting paragraph below the title. */
  description: string
  /** Source the user has picked. */
  source: MigrationSource
  /** Available source options. */
  sources?: ReadonlyArray<MigrationSource>
  /** Current migration status. */
  status: MigrationStatus
  /** Counts the user is bringing across. */
  counts: MigrationImportCounts
  /** Optional explicit % when status is running. */
  progressPercent?: number
  /** Optional error message — only rendered when status is failed. */
  errorMessage?: string
  /** Primary CTA label. */
  importLabel?: string
  className?: string
}

const DEFAULT_SOURCES: ReadonlyArray<MigrationSource> = [
  "csv",
  "shopify",
  "square",
  "myob",
  "xero",
]

const TONE_CLASS = {
  red: shell.toneRed,
  amber: shell.toneAmber,
  teal: shell.toneTeal,
  green: shell.toneGreen,
  neutral: shell.toneNeutral,
  violet: shell.toneViolet,
} as const

const SOURCE_GLYPH: Record<MigrationSource, string> = {
  csv: "▤",
  shopify: "S",
  square: "□",
  myob: "M",
  xero: "X",
}

const STATUS_PROGRESS_TONE: Record<
  MigrationStatus,
  "red" | "amber" | "teal" | "green"
> = {
  idle: "teal",
  uploading: "teal",
  mapping: "teal",
  running: "amber",
  done: "green",
  failed: "red",
}

function computeProgress(
  status: MigrationStatus,
  explicit: number | undefined,
): number {
  if (typeof explicit === "number") {
    return Math.max(0, Math.min(100, explicit))
  }
  switch (status) {
    case "uploading":
      return 22
    case "mapping":
      return 48
    case "running":
      return 72
    case "done":
      return 100
    case "failed":
      return 64
    default:
      return 0
  }
}

export function MigrationImportCard({
  kicker,
  title,
  description,
  source,
  sources = DEFAULT_SOURCES,
  status,
  counts,
  progressPercent,
  errorMessage,
  importLabel = "Start import",
  className,
}: MigrationImportCardProps) {
  const tone = MIGRATION_STATUS_TONE[status]
  const classes = [shell.shell, TONE_CLASS[tone], styles.card, className]
    .filter(Boolean)
    .join(" ")
  const progress = computeProgress(status, progressPercent)
  const showProgress = status !== "idle"
  const importing = status === "uploading" || status === "mapping" || status === "running"

  return (
    <article className={classes} aria-label={title}>
      <header className={shell.shellHead}>
        <span className={shell.kicker}>{kicker}</span>
        <h2 className={shell.title}>{title}</h2>
        <p className={shell.subtitle}>{description}</p>
      </header>

      <ul className={styles.sourceRow} role="radiogroup" aria-label="Migration source">
        {sources.map((id) => {
          const selected = id === source
          return (
            <li key={id}>
              <button
                type="button"
                role="radio"
                aria-checked={selected}
                className={[
                  styles.sourceChip,
                  selected ? styles.sourceChipSelected : null,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className={styles.sourceGlyph} aria-hidden="true">
                  {SOURCE_GLYPH[id]}
                </span>
                <span>{MIGRATION_SOURCE_LABEL[id]}</span>
              </button>
            </li>
          )
        })}
      </ul>

      <dl className={styles.counts}>
        <div>
          <dt>Customers</dt>
          <dd className={shell.tabular}>{counts.customers.toLocaleString("en-AU")}</dd>
        </div>
        <div>
          <dt>Vehicles</dt>
          <dd className={shell.tabular}>{counts.vehicles.toLocaleString("en-AU")}</dd>
        </div>
        <div>
          <dt>Invoices</dt>
          <dd className={shell.tabular}>{counts.invoices.toLocaleString("en-AU")}</dd>
        </div>
        <div>
          <dt>Parts</dt>
          <dd className={shell.tabular}>{counts.parts.toLocaleString("en-AU")}</dd>
        </div>
      </dl>

      {showProgress ? (
        <ProgressLinear
          value={progress}
          tone={STATUS_PROGRESS_TONE[status]}
          variant={importing ? "striped" : "solid"}
          showLabel
          label={`Migration ${MIGRATION_STATUS_LABEL[status]}`}
        />
      ) : null}

      {status === "failed" && errorMessage ? (
        <p className={styles.error}>{errorMessage}</p>
      ) : null}

      <footer className={styles.foot}>
        <span
          className={[shell.chip, TONE_CLASS[tone]].join(" ")}
          aria-label={`Status ${MIGRATION_STATUS_LABEL[status]}`}
        >
          {MIGRATION_STATUS_LABEL[status]}
        </span>
        <button
          type="button"
          className={[shell.button, shell.buttonPrimary].join(" ")}
          disabled={importing || status === "done"}
        >
          {status === "done"
            ? "Imported"
            : status === "failed"
            ? "Retry import"
            : importLabel}
        </button>
      </footer>
    </article>
  )
}

export default MigrationImportCard
