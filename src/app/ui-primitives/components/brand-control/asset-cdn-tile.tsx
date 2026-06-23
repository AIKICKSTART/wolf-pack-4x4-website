import { CloudUpload, FileCheck, Layers, Sparkles } from "lucide-react"
import type { ReactNode } from "react"

import type { AssetKind, BrandAsset } from "./brand-control-types"
import styles from "./brand-control.module.css"

interface AssetCdnTileProps {
  asset: BrandAsset
  preview?: ReactNode
  className?: string
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

const KIND_LABEL: Record<AssetKind, string> = {
  logo: "Logo",
  wordmark: "Wordmark",
  monogram: "Monogram",
  pattern: "Pattern",
  photo: "Photo",
  icon: "Icon",
}

function DefaultKnightThumbnail() {
  return (
    <svg viewBox="0 0 64 64" width={56} height={56} aria-hidden="true">
      <rect x="6" y="6" width="52" height="52" rx="10" fill="var(--primitive-red)" />
      <path
        d="M22 22 L32 12 L42 22 L42 38 L32 48 L22 38 Z"
        fill="color-mix(in oklab, var(--primitive-text-on-accent) 12%, transparent)"
        stroke="color-mix(in oklab, var(--primitive-text-on-accent) 40%, transparent)"
        strokeWidth="1.5"
      />
      <circle cx={32} cy={28} r={5} fill="var(--primitive-amber)" />
      <rect x={28} y={32} width={8} height={12} rx={2} fill="color-mix(in oklab, var(--primitive-text-on-accent) 85%, transparent)" />
    </svg>
  )
}

/**
 * Asset CDN tile — a single brand asset card with usage count, variant
 * detector, byte size, and uploader provenance. Variants render as chips
 * so QA can spot when the SVG/PNG/WebP set is incomplete.
 */
export function AssetCdnTile({ asset, preview, className }: AssetCdnTileProps) {
  return (
    <article
      className={[styles.card, className].filter(Boolean).join(" ")}
      aria-label={`Brand asset — ${asset.name}`}
    >
      <div className={styles.assetPreview} aria-hidden="true">
        {preview ?? <DefaultKnightThumbnail />}
      </div>

      <header className={styles.headStack}>
        <span className={styles.kicker}>
          <CloudUpload size={12} aria-hidden="true" /> {KIND_LABEL[asset.kind]}
        </span>
        <h3 className={styles.title} style={{ fontSize: "var(--primitive-text-lg)" }}>
          {asset.name}
        </h3>
        <p className={styles.subtitle}>
          <code className={styles.mono}>{asset.cdnPath}</code>
        </p>
      </header>

      <div className={styles.metaRow}>
        <span className={styles.metaItem}>
          <Layers size={11} aria-hidden="true" /> Variants
          <strong>{asset.variants.length}</strong>
        </span>
        <span className={styles.metaItem}>
          <Sparkles size={11} aria-hidden="true" /> Usage
          <strong>{asset.usageCount}</strong>
        </span>
        <span className={styles.metaItem}>
          <FileCheck size={11} aria-hidden="true" /> Master
          <strong>{formatBytes(asset.bytes)}</strong>
        </span>
      </div>

      <div className={styles.assetVariantRow}>
        {asset.variants.map((variant) => (
          <span key={variant.id} className={styles.tokenChip}>
            <strong>{variant.label}</strong>
            <code>{formatBytes(variant.bytes)}</code>
          </span>
        ))}
      </div>

      <footer className={styles.foot}>
        <span className={styles.tinyLabel}>Uploaded by {asset.uploadedBy}</span>
        <time className={styles.tinyLabel} dateTime={asset.uploadedAt}>
          {new Date(asset.uploadedAt).toLocaleDateString("en-AU", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </time>
      </footer>
    </article>
  )
}

export default AssetCdnTile
