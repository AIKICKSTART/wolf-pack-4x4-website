import type {
  DataExportPreset,
  DataExportRange,
  ExportFormat,
} from "./forms-platform-types"
import styles from "./data-export-card.module.css"

interface DataExportCardProps {
  /** Card title — e.g. "Export submissions". */
  title: string
  /** Selected date range. */
  range: DataExportRange
  /** Format presets — render as a grid. */
  presets: ReadonlyArray<DataExportPreset>
  /** Id of the currently selected preset. */
  selectedPresetId?: string
  /** Total submission row count for the chosen range. */
  totalRows: number
  className?: string
}

const FORMAT_LABEL: Record<ExportFormat, string> = {
  csv: "CSV",
  json: "JSON",
  xls: "XLS",
  pdf: "PDF",
}

const ROW_FORMATTER = new Intl.NumberFormat("en-AU")

export function DataExportCard({
  title,
  range,
  presets,
  selectedPresetId,
  totalRows,
  className,
}: DataExportCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={title}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Data export</span>
          <h3 className={styles.title}>{title}</h3>
          {range.caption ? (
            <span className={styles.rangeCaption}>{range.caption}</span>
          ) : null}
        </div>
        <span className={styles.rangeBadge} aria-label={`Range ${range.from} to ${range.to}`}>
          <time dateTime={range.from}>{range.from}</time>
          <span aria-hidden="true">→</span>
          <time dateTime={range.to}>{range.to}</time>
        </span>
      </header>

      <div
        className={styles.formats}
        role="radiogroup"
        aria-label="Export format"
      >
        {presets.map((preset) => {
          const isActive = selectedPresetId === preset.id
          const tileClass = [
            styles.formatTile,
            isActive ? styles.formatTileActive : "",
          ]
            .filter(Boolean)
            .join(" ")
          return (
            <button
              key={preset.id}
              type="button"
              className={tileClass}
              role="radio"
              aria-checked={isActive}
            >
              <span className={styles.formatBadge}>
                {FORMAT_LABEL[preset.format]}
              </span>
              <span className={styles.formatLabel}>{preset.label}</span>
              <span className={styles.formatMeta}>
                ≈ {ROW_FORMATTER.format(preset.rowsEstimate)} rows
              </span>
            </button>
          )
        })}
      </div>

      <footer className={styles.footer}>
        <span className={styles.note}>
          {ROW_FORMATTER.format(totalRows)} rows · GDPR safe
        </span>
        <button type="button" className={styles.exportBtn}>
          Export
        </button>
      </footer>
    </section>
  )
}
