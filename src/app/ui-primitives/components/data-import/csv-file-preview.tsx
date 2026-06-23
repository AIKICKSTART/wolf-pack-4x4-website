import type { CsvRowPreview, DelimiterLabel, EncodingLabel } from "./import-types"
import styles from "./csv-file-preview.module.css"

interface CsvFilePreviewProps {
  filename: string
  headers: ReadonlyArray<string>
  rows: ReadonlyArray<CsvRowPreview>
  delimiter: DelimiterLabel
  encoding: EncodingLabel
  rowCountLabel: string
  byteSizeLabel: string
  className?: string
}

const DELIMITER_GLYPH: Record<DelimiterLabel, string> = {
  comma: ",",
  semicolon: ";",
  tab: "⇥",
  pipe: "|",
}

export function CsvFilePreview({
  filename,
  headers,
  rows,
  delimiter,
  encoding,
  rowCountLabel,
  byteSizeLabel,
  className,
}: CsvFilePreviewProps) {
  return (
    <section
      className={[styles.preview, className].filter(Boolean).join(" ")}
      aria-label={`Preview of ${filename}`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.fileGlyph} aria-hidden="true">
            ⌗
          </span>
          <div className={styles.identityText}>
            <span className={styles.filename}>{filename}</span>
            <span className={styles.subline}>
              {rowCountLabel} · {byteSizeLabel}
            </span>
          </div>
        </div>
        <div className={styles.chipRow}>
          <span className={styles.chip}>
            <span className={styles.chipKey}>Delimiter</span>
            <span className={styles.chipValue}>
              <span aria-hidden="true">{DELIMITER_GLYPH[delimiter]}</span>
              <span>{delimiter}</span>
            </span>
          </span>
          <span className={styles.chip}>
            <span className={styles.chipKey}>Encoding</span>
            <span className={styles.chipValue}>{encoding}</span>
          </span>
          <span className={styles.chip} data-tone="info">
            <span className={styles.chipKey}>Header row</span>
            <span className={styles.chipValue}>auto-detected</span>
          </span>
        </div>
      </header>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <caption className={styles.caption}>
            First {rows.length} rows of {filename} — read-only preview
          </caption>
          <thead>
            <tr>
              <th scope="col" className={styles.rowNumberCell}>#</th>
              {headers.map((header) => (
                <th key={header} scope="col" className={styles.headerCell}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.rowNumber}>
                <th scope="row" className={styles.rowNumberCell}>
                  {row.rowNumber.toString().padStart(2, "0")}
                </th>
                {row.cells.map((cell, index) => (
                  <td
                    key={`${row.rowNumber}-${index}`}
                    className={[
                      styles.cell,
                      cell.flagged ? styles.cellFlagged : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {cell.value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CsvFilePreview
