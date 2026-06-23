import Image from "next/image"
import { Archive, Download, RefreshCcw, Share2 } from "lucide-react"

import { LicenseChip } from "./license-chip"
import {
  ASSET_KIND_GLYPH,
  ASSET_KIND_LABEL,
  formatBytes,
  formatDimensions,
  formatDuration,
  type AssetItem,
} from "./asset-library-types"

import styles from "./dam-preview-pane.module.css"

export interface PreviewProperty {
  label: string
  value: string
}

interface DamPreviewPaneProps {
  asset: AssetItem
  /** EXIF / general property pairs surfaced below the metadata block. */
  properties?: ReadonlyArray<PreviewProperty>
  /** Collection names the asset is currently linked to. */
  linkedCollections?: ReadonlyArray<string>
  className?: string
}

export function DamPreviewPane({
  asset,
  properties = [],
  linkedCollections = [],
  className,
}: DamPreviewPaneProps) {
  const sizeChip = asset.size !== undefined ? formatBytes(asset.size) : null
  const dimensionChip = asset.dimensions
    ? formatDimensions(asset.dimensions.width, asset.dimensions.height)
    : asset.durationSec !== undefined
      ? formatDuration(asset.durationSec)
      : null

  return (
    <aside
      className={[styles.pane, className].filter(Boolean).join(" ")}
      role="region"
      aria-label={`Asset preview for ${asset.name}`}
    >
      <div className={styles.media}>
        {asset.thumb ? (
          <Image
            src={asset.thumb}
            alt=""
            width={520}
            height={336}
            className={styles.mediaImage}
            unoptimized
          />
        ) : (
          <span className={styles.mediaFallback}>
            {ASSET_KIND_GLYPH[asset.kind]}
          </span>
        )}
        <span className={styles.mediaKind}>
          {ASSET_KIND_LABEL[asset.kind]}
        </span>
      </div>

      <header className={styles.head}>
        <span className={styles.kicker}>Selected asset</span>
        <h3 className={styles.title} title={asset.name}>
          {asset.name}
        </h3>
        <div className={styles.chipRow}>
          {dimensionChip ? (
            <span className={styles.chip}>{dimensionChip}</span>
          ) : null}
          {sizeChip ? <span className={styles.chip}>{sizeChip}</span> : null}
          <LicenseChip license={asset.license} />
        </div>
      </header>

      {properties.length > 0 ? (
        <dl className={styles.properties}>
          {properties.map((property) => (
            <div key={property.label} className={styles.propertyRow}>
              <dt>{property.label}</dt>
              <dd>{property.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {linkedCollections.length > 0 ? (
        <section
          className={styles.collections}
          aria-label="Linked collections"
        >
          <span className={styles.kicker}>In collections</span>
          <ul className={styles.collectionList}>
            {linkedCollections.map((collection) => (
              <li key={collection} className={styles.collectionChip}>
                {collection}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className={styles.actions}>
        <button type="button" className={styles.primaryBtn}>
          <Download size={14} strokeWidth={2.2} aria-hidden="true" />
          Download
        </button>
        <button type="button" className={styles.secondaryBtn}>
          <Share2 size={14} strokeWidth={2.2} aria-hidden="true" />
          Share
        </button>
        <button type="button" className={styles.secondaryBtn}>
          <RefreshCcw size={14} strokeWidth={2.2} aria-hidden="true" />
          Replace
        </button>
        <button type="button" className={styles.dangerBtn}>
          <Archive size={14} strokeWidth={2.2} aria-hidden="true" />
          Archive
        </button>
      </div>
    </aside>
  )
}

export default DamPreviewPane
