import styles from "./dpa-viewer.module.css"

export interface DpaClauseSummary {
  /** Section / clause reference, e.g. "§4.2". */
  ref: string
  /** One-line summary of the clause. */
  summary: string
}

export interface DpaViewerProps {
  vendorName: string
  /** Signed date, e.g. "2026-02-14". */
  signedDate: string
  /** Term, e.g. "36 months · auto-renew". */
  term: string
  /** Document version, e.g. "v3.1". */
  version: string
  /** Optional standard contractual clauses indicator. */
  scc?: string
  /** Sub-processor count snapshot. */
  subprocessorCount: number
  /** Key clauses summary. */
  keyClauses: ReadonlyArray<DpaClauseSummary>
  /** Download URL. */
  downloadHref: string
  /** Optional download label override. */
  downloadLabel?: string
  className?: string
}

export function DpaViewer({
  vendorName,
  signedDate,
  term,
  version,
  scc,
  subprocessorCount,
  keyClauses,
  downloadHref,
  downloadLabel = "Download DPA (PDF)",
  className,
}: DpaViewerProps) {
  return (
    <section
      className={[styles.viewer, className].filter(Boolean).join(" ")}
      aria-label={`Data processing agreement with ${vendorName}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Data processing agreement</span>
        <h3 className={styles.title}>{vendorName}</h3>
        <span className={styles.vendor}>
          DPA covering processor obligations under the Privacy Act 1988 and
          GDPR Art. 28.
        </span>
      </header>

      <dl className={styles.meta}>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>Version</dt>
          <dd className={styles.metaValue}>{version}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>Term</dt>
          <dd className={styles.metaValue}>{term}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>Sub-processors</dt>
          <dd className={styles.metaValue}>{subprocessorCount}</dd>
        </div>
        {scc ? (
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>SCC</dt>
            <dd className={styles.metaValue}>{scc}</dd>
          </div>
        ) : null}
      </dl>

      <div className={styles.clauseBlock}>
        <h4 className={styles.clauseTitle}>Key clauses</h4>
        <ul className={styles.clauseList}>
          {keyClauses.map((clause) => (
            <li key={clause.ref} className={styles.clauseItem}>
              <code className={styles.clauseRef}>{clause.ref}</code>
              <span className={styles.clauseSummary}>{clause.summary}</span>
            </li>
          ))}
        </ul>
      </div>

      <footer className={styles.foot}>
        <span className={styles.signed}>
          Signed
          <span className={styles.signedValue}>{signedDate}</span>
        </span>
        <a
          className={styles.downloadButton}
          href={downloadHref}
          download
          aria-label={`Download data processing agreement for ${vendorName}`}
        >
          <span className={styles.downloadGlyph} aria-hidden="true">
            ↓
          </span>
          {downloadLabel}
        </a>
      </footer>
    </section>
  )
}

export default DpaViewer
