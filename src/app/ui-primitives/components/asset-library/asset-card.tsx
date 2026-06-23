"use client"

import Image from "next/image"
import type { MouseEvent, KeyboardEvent } from "react"

import { LicenseChip } from "./license-chip"
import {
  ASSET_KIND_GLYPH,
  ASSET_KIND_LABEL,
  formatDimensions,
  formatDuration,
  type AssetItem,
  type AssetKind,
} from "./asset-library-types"

import styles from "./asset-card.module.css"

interface AssetCardProps {
  asset: AssetItem
  selected?: boolean
  onSelect?: (asset: AssetItem, event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void
  className?: string
}

const KIND_CLASS: Record<AssetKind, string> = {
  image: styles.kindImage,
  video: styles.kindVideo,
  audio: styles.kindAudio,
  doc: styles.kindDoc,
  "3d-model": styles.kindModel,
  animation: styles.kindAnimation,
  vector: styles.kindVector,
}

export function AssetCard({
  asset,
  selected = false,
  onSelect,
  className,
}: AssetCardProps) {
  const classes = [
    styles.card,
    KIND_CLASS[asset.kind],
    selected ? styles.selected : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    onSelect?.(asset, event)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onSelect?.(asset, event)
    }
  }

  const dimensionChip = asset.dimensions
    ? formatDimensions(asset.dimensions.width, asset.dimensions.height)
    : asset.durationSec !== undefined
      ? formatDuration(asset.durationSec)
      : null

  return (
    <div
      role="option"
      tabIndex={0}
      aria-selected={selected}
      aria-label={`${ASSET_KIND_LABEL[asset.kind]}: ${asset.name}`}
      className={classes}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.thumb} aria-hidden="true">
        {asset.thumb ? (
          <Image
            src={asset.thumb}
            alt=""
            width={240}
            height={150}
            className={styles.thumbImage}
            unoptimized
          />
        ) : (
          <span className={styles.thumbFallback}>
            {ASSET_KIND_GLYPH[asset.kind]}
          </span>
        )}
        <span className={styles.scrim} />
        <span className={styles.kindBadge}>
          {ASSET_KIND_LABEL[asset.kind]}
        </span>
        {selected ? (
          <span className={styles.tick} aria-hidden="true">
            ✓
          </span>
        ) : null}
      </div>

      <div className={styles.body}>
        <span className={styles.name} title={asset.name}>
          {asset.name}
        </span>
        <div className={styles.metaRow}>
          {dimensionChip ? (
            <span className={styles.metaChip}>{dimensionChip}</span>
          ) : null}
          <LicenseChip license={asset.license} />
        </div>
      </div>
    </div>
  )
}

export default AssetCard
