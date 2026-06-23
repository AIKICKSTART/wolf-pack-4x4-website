import { ExternalLink, FileSearch } from "lucide-react"

import type { AssetUsage } from "./asset-library-types"

import styles from "./usage-tracker.module.css"

interface UsageTrackerProps {
  /** Where this asset is referenced across the product. */
  usages: ReadonlyArray<AssetUsage>
  className?: string
}

export function UsageTracker({ usages, className }: UsageTrackerProps) {
  return (
    <section
      className={[styles.surface, className].filter(Boolean).join(" ")}
      aria-label="Where this asset is used"
    >
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <FileSearch size={14} strokeWidth={2.2} />
        </span>
        <div>
          <span className={styles.kicker}>Where used</span>
          <h3 className={styles.title}>
            Referenced in {usages.length} {usages.length === 1 ? "place" : "places"}
          </h3>
        </div>
      </header>

      {usages.length === 0 ? (
        <p className={styles.empty}>
          Not currently referenced anywhere — safe to archive.
        </p>
      ) : (
        <ul className={styles.list}>
          {usages.map((usage) => (
            <li key={usage.id} className={styles.row}>
              <div className={styles.rowMain}>
                <span className={styles.surfaceTag}>{usage.surface}</span>
                <span className={styles.path}>{usage.path}</span>
              </div>
              <div className={styles.rowMeta}>
                <time className={styles.time} dateTime={usage.lastModified}>
                  {usage.lastModified}
                </time>
                <ExternalLink
                  size={12}
                  strokeWidth={2.2}
                  aria-hidden="true"
                  className={styles.linkIcon}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default UsageTracker
