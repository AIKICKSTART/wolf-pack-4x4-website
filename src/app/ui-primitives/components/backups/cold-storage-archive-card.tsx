"use client"

import type { ColdArchiveInfo, StorageTier } from "./backup-types"

import styles from "./cold-storage-archive-card.module.css"

const TIER_LABEL: Record<StorageTier, string> = {
  hot: "Hot",
  warm: "Warm",
  cold: "Cold",
  glacier: "Glacier",
  deep_archive: "Deep Archive",
  archive_tier: "Archive Tier",
}

const TIER_TONE: Record<StorageTier, string> = {
  hot: styles.toneRed,
  warm: styles.toneAmber,
  cold: styles.toneTeal,
  glacier: styles.toneIce,
  deep_archive: styles.toneDeep,
  archive_tier: styles.toneViolet,
}

interface ColdStorageArchiveCardProps {
  archive: ColdArchiveInfo
  onThaw?: (archiveId: string) => void
  className?: string
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const units = ["KB", "MB", "GB", "TB"]
  let v = bytes / 1024
  let i = 0
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024
    i += 1
  }
  return `${v.toFixed(v >= 10 ? 0 : 1)} ${units[i]}`
}

export function ColdStorageArchiveCard({
  archive,
  onThaw,
  className,
}: ColdStorageArchiveCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <article
      className={classes}
      aria-label={`Cold archive ${archive.id} for ${archive.resourceName}`}
    >
      <header className={styles.head}>
        <span className={styles.glacierGlyph} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
            <path
              d="M12 3l2.5 4.3 5 .6-3.7 3.4.8 5-4.6-2.4-4.6 2.4.8-5-3.7-3.4 5-.6L12 3Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className={styles.titles}>
          <span className={styles.kicker}>Cold archive</span>
          <span className={styles.archiveId}>{archive.id}</span>
        </div>
        <span className={[styles.tierChip, TIER_TONE[archive.tier]].join(" ")}>
          {TIER_LABEL[archive.tier]}
        </span>
      </header>

      <div className={styles.resource}>{archive.resourceName}</div>

      <dl className={styles.meta}>
        <div>
          <dt>Archived</dt>
          <dd>
            <time dateTime={archive.archivedAt}>{archive.archivedAt}</time>
          </dd>
        </div>
        <div>
          <dt>Size</dt>
          <dd>{formatBytes(archive.sizeBytes)}</dd>
        </div>
        <div>
          <dt>Retrieval</dt>
          <dd>
            <span className={styles.retrievalChip}>{archive.retrievalEstimate}</span>
          </dd>
        </div>
      </dl>

      <footer className={styles.footer}>
        <button
          type="button"
          className={styles.thawBtn}
          onClick={() => onThaw?.(archive.id)}
        >
          Request thaw
        </button>
      </footer>
    </article>
  )
}

export default ColdStorageArchiveCard
