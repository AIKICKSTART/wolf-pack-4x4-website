"use client"

import Image from "next/image"
import { RotateCcw } from "lucide-react"

import { Avatar } from "../primitives/avatar"

import { ASSET_KIND_GLYPH, type AssetVersion } from "./asset-library-types"

import styles from "./asset-version-timeline.module.css"

interface AssetVersionTimelineProps {
  versions: ReadonlyArray<AssetVersion>
  onRestore?: (version: AssetVersion) => void
  className?: string
}

export function AssetVersionTimeline({
  versions,
  onRestore,
  className,
}: AssetVersionTimelineProps) {
  return (
    <section
      className={[styles.section, className].filter(Boolean).join(" ")}
      aria-label="Asset version timeline"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Versions</span>
        <h3 className={styles.title}>{versions.length} revisions</h3>
      </header>

      <ol className={styles.timeline}>
        {versions.map((version) => (
          <li
            key={version.id}
            className={[
              styles.item,
              version.current ? styles.itemCurrent : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className={styles.node} aria-hidden="true">
              <span className={styles.nodeDot} />
            </span>

            <div className={styles.body}>
              <div className={styles.row}>
                <span className={styles.thumb}>
                  {version.thumb ? (
                    <Image
                      src={version.thumb}
                      alt=""
                      width={56}
                      height={42}
                      unoptimized
                    />
                  ) : (
                    <span className={styles.thumbFallback} aria-hidden="true">
                      {ASSET_KIND_GLYPH.image}
                    </span>
                  )}
                </span>
                <div className={styles.metaCol}>
                  <span className={styles.label}>
                    {version.label}
                    {version.current ? (
                      <span className={styles.currentTag}>Current</span>
                    ) : null}
                  </span>
                  <time className={styles.time} dateTime={version.timestamp}>
                    {version.timestamp}
                  </time>
                </div>
              </div>
              <p className={styles.comment}>{version.comment}</p>
              <div className={styles.footRow}>
                <span className={styles.uploader}>
                  <Avatar
                    name={version.uploader.name}
                    src={version.uploader.avatar}
                    size="sm"
                    tone="obsidian"
                  />
                  <span>{version.uploader.name}</span>
                </span>
                {!version.current ? (
                  <button
                    type="button"
                    className={styles.restoreBtn}
                    onClick={() => onRestore?.(version)}
                  >
                    <RotateCcw size={12} strokeWidth={2.2} aria-hidden="true" />
                    Restore
                  </button>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default AssetVersionTimeline
