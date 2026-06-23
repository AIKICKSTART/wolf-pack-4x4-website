"use client"

import Image from "next/image"
import { Download } from "lucide-react"

import {
  RENDITION_LABEL,
  formatBytes,
  formatDimensions,
  type AssetRendition,
} from "./asset-library-types"

import styles from "./renditions-list.module.css"

interface RenditionsListProps {
  renditions: ReadonlyArray<AssetRendition>
  onDownload?: (rendition: AssetRendition) => void
  className?: string
}

export function RenditionsList({
  renditions,
  onDownload,
  className,
}: RenditionsListProps) {
  return (
    <section
      className={[styles.surface, className].filter(Boolean).join(" ")}
      aria-label="Renditions"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Renditions</span>
        <h3 className={styles.title}>{renditions.length} presets</h3>
      </header>

      <ul className={styles.list}>
        {renditions.map((rendition) => (
          <li key={rendition.id} className={styles.row}>
            <span className={styles.thumb} aria-hidden="true">
              {rendition.thumb ? (
                <Image
                  src={rendition.thumb}
                  alt=""
                  width={64}
                  height={48}
                  unoptimized
                />
              ) : (
                <span className={styles.thumbFallback}>▢</span>
              )}
            </span>

            <div className={styles.meta}>
              <span className={styles.label}>
                {RENDITION_LABEL[rendition.preset]}
              </span>
              <div className={styles.chipRow}>
                <span className={styles.chip}>
                  {formatDimensions(rendition.width, rendition.height)}
                </span>
                <span className={styles.chip}>
                  {formatBytes(rendition.size)}
                </span>
                <span className={[styles.chip, styles.chipAccent].join(" ")}>
                  {rendition.format.toUpperCase()}
                </span>
              </div>
            </div>

            <button
              type="button"
              className={styles.downloadBtn}
              onClick={() => onDownload?.(rendition)}
              aria-label={`Download ${RENDITION_LABEL[rendition.preset]} rendition`}
            >
              <Download size={14} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RenditionsList
