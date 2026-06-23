"use client"

import { Chip } from "../primitives/chip"
import { PriceTagIcon } from "../icons/price-tag"
import { ShieldTickIcon } from "../icons/shield-tick"
import { DynoCurveIcon } from "../icons/dyno-curve"
import { ClipboardCheckIcon } from "../icons/clipboard-check"
import { MufflerIcon } from "../icons/muffler"
import {
  DOC_KIND_LABEL,
  DOC_KIND_TONE,
  portalToneToChip,
  type PortalDocKind,
  type PortalDocument,
} from "./customer-portal-types"

import styles from "./doc-download-row.module.css"

interface DocDownloadRowProps {
  doc: PortalDocument
  /** Optional click handler. When omitted, renders as visual-only row. */
  onDownload?: (id: string) => void
  className?: string
}

const KIND_ICON: Readonly<Record<PortalDocKind, typeof PriceTagIcon>> = {
  receipt: PriceTagIcon,
  roadworthy: ShieldTickIcon,
  "dyno-chart": DynoCurveIcon,
  warranty: ClipboardCheckIcon,
  manual: MufflerIcon,
}

function formatSize(kb: number): string {
  if (kb >= 1024) {
    return `${(kb / 1024).toFixed(1)} MB`
  }
  return `${kb} kB`
}

export function DocDownloadRow({
  doc,
  onDownload,
  className,
}: DocDownloadRowProps) {
  const Icon = KIND_ICON[doc.kind]
  const tone = portalToneToChip(DOC_KIND_TONE[doc.kind])
  const kindLabel = DOC_KIND_LABEL[doc.kind]
  const interactive = Boolean(onDownload)

  const classes = [
    styles.row,
    interactive ? styles.rowInteractive : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const aria = `${kindLabel} document: ${doc.title}, issued ${doc.issuedAt}, ${formatSize(doc.byteSizeKb)}`

  const inner = (
    <>
      <span className={styles.iconWrap} aria-hidden="true">
        <Icon size={22} tone="currentColor" motion="none" />
      </span>
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <span className={styles.title}>{doc.title}</span>
          <Chip label={kindLabel} tone={tone} />
        </div>
        <dl className={styles.facts}>
          {doc.vehicleLabel ? (
            <div>
              <dt>Vehicle</dt>
              <dd>{doc.vehicleLabel}</dd>
            </div>
          ) : null}
          <div>
            <dt>Issued</dt>
            <dd>
              <time>{doc.issuedAt}</time>
            </dd>
          </div>
          <div>
            <dt>Size</dt>
            <dd>{formatSize(doc.byteSizeKb)}</dd>
          </div>
          {doc.pageCount ? (
            <div>
              <dt>Pages</dt>
              <dd>{doc.pageCount}</dd>
            </div>
          ) : null}
        </dl>
      </div>
      <span className={styles.cta} aria-hidden={interactive ? "true" : undefined}>
        {interactive ? (
          <span className={styles.ctaText}>Download</span>
        ) : (
          <span className={styles.ctaText}>PDF</span>
        )}
        <span className={styles.ctaArrow}>↓</span>
      </span>
    </>
  )

  if (interactive) {
    return (
      <button
        type="button"
        className={classes}
        onClick={() => onDownload?.(doc.id)}
        aria-label={`Download ${aria}`}
        data-doc={doc.id}
      >
        {inner}
      </button>
    )
  }

  return (
    <article
      className={classes}
      aria-label={aria}
      data-doc={doc.id}
    >
      {inner}
    </article>
  )
}

export default DocDownloadRow
