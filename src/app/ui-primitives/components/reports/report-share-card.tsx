import { CodeBlock } from "../primitives/code-block"

import type { AccessScope } from "./reports-types"
import styles from "./report-share-card.module.css"

const ALL_SCOPES: ReadonlyArray<{ id: AccessScope; label: string }> = [
  { id: "private", label: "Private" },
  { id: "team", label: "Team" },
  { id: "organisation", label: "Org" },
  { id: "public", label: "Public" },
]

interface ReportShareCardProps {
  reportTitle: string
  publicUrl: string
  expiresOn: string
  activeScopes: ReadonlyArray<AccessScope>
  embedCode: string
  className?: string
}

export function ReportShareCard({
  reportTitle,
  publicUrl,
  expiresOn,
  activeScopes,
  embedCode,
  className,
}: ReportShareCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const activeSet = new Set<AccessScope>(activeScopes)

  return (
    <section className={classes} aria-label={`Share: ${reportTitle}`}>
      <div>
        <span className={styles.kicker}>Share report</span>
        <h3 className={styles.title}>{reportTitle}</h3>
      </div>

      <div className={styles.urlRow}>
        <span className={styles.url}>{publicUrl}</span>
        <button type="button" className={styles.copyBtn} aria-label="Copy public URL">
          Copy
        </button>
      </div>

      <div className={styles.metaGrid}>
        <div className={styles.metaCell}>
          <span className={styles.metaLabel}>Expires on</span>
          <span className={styles.metaValue}>{expiresOn}</span>
        </div>
        <div className={styles.metaCell}>
          <span className={styles.metaLabel}>Access scope</span>
          <div className={styles.scopeChips}>
            {ALL_SCOPES.map((scope) => (
              <span
                key={scope.id}
                className={`${styles.scopeChip} ${
                  activeSet.has(scope.id) ? styles.scopeChipActive : ""
                }`}
              >
                {scope.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.embedSection}>
        <span className={styles.metaLabel}>Embed code</span>
        <CodeBlock
          code={embedCode}
          language="html"
          fileName="embed.html"
          showLineNumbers={false}
          maxHeight={140}
        />
      </div>
    </section>
  )
}

export default ReportShareCard
