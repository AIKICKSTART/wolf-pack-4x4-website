import type { IndexRecord, IndexType } from "./db-admin-types"
import styles from "./index-inspector.module.css"

interface IndexInspectorProps {
  index: IndexRecord
  className?: string
}

const TYPE_LABEL: Record<IndexType, string> = {
  btree: "BTree",
  gin: "GIN",
  gist: "GIST",
  hash: "Hash",
  brin: "BRIN",
}

const TYPE_CLASS: Record<IndexType, string> = {
  btree: styles.typeBtree,
  gin: styles.typeGin,
  gist: styles.typeGist,
  hash: styles.typeHash,
  brin: styles.typeBrin,
}

const USAGE_CLASS: Record<IndexRecord["usage"], string> = {
  high: styles.usageHigh,
  medium: styles.usageMedium,
  low: styles.usageLow,
  unused: styles.usageUnused,
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`
  }
  const units = ["KB", "MB", "GB", "TB"]
  let value = bytes / 1024
  let unitIndex = 0
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex += 1
  }
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`
}

export function IndexInspector({ index, className }: IndexInspectorProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`Index ${index.name}`}>
      <header className={styles.head}>
        <span className={styles.name}>{index.name}</span>
        <span className={`${styles.typeChip} ${TYPE_CLASS[index.type]}`}>
          {TYPE_LABEL[index.type]}
        </span>
        {index.unique ? <span className={styles.uniqueChip}>Unique</span> : null}
      </header>
      <div className={styles.body}>
        <div className={styles.columns} aria-label="Indexed columns">
          {index.columns.map((column) => (
            <span key={column} className={styles.columnChip}>
              {column}
            </span>
          ))}
        </div>
        <div className={styles.stats}>
          <span>
            Size <span className={styles.statValue}>{formatBytes(index.sizeBytes)}</span>
          </span>
          <span className={`${styles.usageChip} ${USAGE_CLASS[index.usage]}`}>
            {index.usage}
          </span>
        </div>
      </div>
    </article>
  )
}

export default IndexInspector
