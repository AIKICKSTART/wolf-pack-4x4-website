import type { ReactNode } from "react"

import { Chip } from "../primitives/chip"

import { PartPriceChip } from "./part-price-chip"
import { SupplierBadge } from "./supplier-badge"

import type { PartGalleryImage, PartPrice, PartTone, SupplierTone } from "./parts-pages-types"

import styles from "./part-detail-hero.module.css"

export interface PartDetailHeroProps {
  sku: string
  title: string
  supplier: string
  supplierTone: SupplierTone
  /** Short product summary above price/CTA. */
  summary: string
  price: PartPrice
  /** Category tone for the accent rail. */
  tone: PartTone
  inStock: boolean
  installTime: string
  fitment: ReadonlyArray<string>
  /** Optional gallery slot — drop in <PartImageGallery />. */
  gallerySlot: ReactNode
  /** Primary CTA — defaults to "Get a quote". */
  ctaLabel?: string
  ctaHref?: string
}

const TONE_CLASS: Record<PartTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

export function PartDetailHero({
  sku,
  title,
  supplier,
  supplierTone,
  summary,
  price,
  tone,
  inStock,
  installTime,
  fitment,
  gallerySlot,
  ctaLabel = "Get a quote",
  ctaHref = "#quote",
}: PartDetailHeroProps) {
  return (
    <section
      className={`${styles.section} ${TONE_CLASS[tone]}`}
      role="region"
      aria-label={`Product detail — ${title}`}
    >
      <div className={styles.gallery}>{gallerySlot}</div>

      <div className={styles.summary}>
        <span className={styles.sku}>SKU {sku}</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.summaryText}>{summary}</p>

        <PartPriceChip price={price} variant="stacked" label="Pricing" />

        <div className={styles.metaChips} aria-label="Product meta">
          <SupplierBadge name={supplier} tone={supplierTone} variant="inline" verified />
          <Chip label={inStock ? "In stock" : "Backorder"} tone={inStock ? "green" : "red"} />
          <Chip label={`Install · ${installTime}`} tone="teal" />
        </div>

        {fitment.length > 0 && (
          <div className={styles.fitment} aria-label="Confirmed fitment">
            {fitment.slice(0, 6).map((label) => (
              <Chip key={label} label={label} tone="green" />
            ))}
          </div>
        )}

        <a className={styles.cta} href={ctaHref}>
          {ctaLabel}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}

export type { PartGalleryImage }
export default PartDetailHero
