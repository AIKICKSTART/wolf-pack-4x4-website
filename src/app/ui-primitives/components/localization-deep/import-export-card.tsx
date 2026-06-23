"use client"

import { ProgressLinear } from "../primitives/progress-linear"

import styles from "./import-export-card.module.css"
import {
  EXCHANGE_FORMAT_LABEL,
  type ExchangeFormat,
  type ExchangeOperation,
} from "./localization-deep-types"

export interface ImportExportStat {
  /** Stat label, e.g. "Strings". */
  label: string
  /** Stat value rendered as-is. */
  value: string
}

export interface ImportExportCardProps {
  /** Operation type — import or export. */
  operation: ExchangeOperation
  /** Wire format. */
  format: ExchangeFormat
  /** Target locales involved. */
  locales: ReadonlyArray<string>
  /** Optional progress 0–1 for in-flight transfers. */
  progress?: number
  /** Optional descriptive note. */
  note?: string
  /** Optional summary statistics. */
  stats?: ReadonlyArray<ImportExportStat>
  /** Action button label. */
  actionLabel: string
  /** Optional click handler. */
  onAction?: () => void
}

const OPERATION_LABEL: Record<ExchangeOperation, string> = {
  import: "Import",
  export: "Export",
}

const FORMAT_HINT: Record<ExchangeFormat, string> = {
  xliff: "Industry standard. Best for vendor handoff.",
  csv: "Spreadsheet-friendly. Strips structure.",
  json: "App-native. Round-trips back into the build.",
  po: "Gettext PO. Good for OSS toolchains.",
  tmx: "Translation memory. For TM sync only.",
}

export function ImportExportCard({
  operation,
  format,
  locales,
  progress,
  note,
  stats,
  actionLabel,
  onAction,
}: ImportExportCardProps) {
  const inFlight = typeof progress === "number" && progress < 1
  const complete = typeof progress === "number" && progress >= 1
  const tone: "teal" | "amber" | "green" = complete
    ? "green"
    : inFlight
      ? "amber"
      : "teal"

  return (
    <article
      className={styles.wrap}
      data-operation={operation}
      aria-label={`${OPERATION_LABEL[operation]} ${EXCHANGE_FORMAT_LABEL[format]}`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>
            {OPERATION_LABEL[operation]} · {EXCHANGE_FORMAT_LABEL[format]}
          </span>
          <h3 className={styles.title}>
            {OPERATION_LABEL[operation]} <span className={styles.format}>{format.toUpperCase()}</span>
          </h3>
        </div>
        <span className={styles.directionPill} data-direction={operation}>
          {operation === "import" ? "↓ Inbound" : "↑ Outbound"}
        </span>
      </header>

      <p className={styles.hint}>{FORMAT_HINT[format]}</p>

      <section className={styles.locales} aria-label="Locales">
        <span className={styles.localesKicker}>Locales</span>
        <ul className={styles.localeList}>
          {locales.map((locale) => (
            <li key={locale} className={styles.localePill}>
              {locale}
            </li>
          ))}
        </ul>
      </section>

      {stats && stats.length > 0 ? (
        <dl className={styles.stats}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statCell}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {typeof progress === "number" ? (
        <div className={styles.progressBlock}>
          <ProgressLinear
            value={Math.round(progress * 100)}
            max={100}
            tone={tone}
            variant={complete ? "solid" : "striped"}
            label={complete ? "Complete" : `${OPERATION_LABEL[operation]} progress`}
            showLabel
          />
        </div>
      ) : null}

      {note ? <p className={styles.note}>{note}</p> : null}

      <footer className={styles.actions}>
        <button type="button" className={styles.action} onClick={onAction}>
          {actionLabel}
        </button>
      </footer>
    </article>
  )
}

export default ImportExportCard
