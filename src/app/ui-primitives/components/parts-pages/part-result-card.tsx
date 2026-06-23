import Link from "next/link"

import { Chip } from "../primitives/chip"
import { PriceTag } from "../commerce/price-tag"

import type { PartCardSummary, PartTone, SupplierTone } from "./parts-pages-types"

import styles from "./part-result-card.module.css"

export interface PartResultCardProps extends PartCardSummary {
  className?: string
}

const CATEGORY_TONE_CLASS: Record<PartTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

const SUPPLIER_TONE_CLASS: Record<SupplierTone, string> = {
  manta: styles.supplierManta,
  redback: styles.supplierRedback,
  xforce: styles.supplierXforce,
  pacemaker: styles.supplierPacemaker,
  lukey: styles.supplierLukey,
  hushpower: styles.supplierHushpower,
  neutral: styles.supplierNeutral,
}

function categoryMark(category: string): string {
  return category.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase() || "PRT"
}

export function PartResultCard({
  sku,
  title,
  supplier,
  supplierTone,
  category,
  categoryTone,
  image,
  imageAlt,
  supplierWatermark,
  price,
  fitment,
  href,
  className,
}: PartResultCardProps) {
  const sectionClass = [
    styles.card,
    CATEGORY_TONE_CLASS[categoryTone],
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const discounted = price.currentCents != null && price.currentCents < price.rrpCents

  return (
    <article className={sectionClass}>
      <Link href={href} className={styles.media} aria-label={`${title} by ${supplier}`}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={imageAlt}
            width={480}
            height={480}
            loading="lazy"
            decoding="async"
            className={styles.image}
          />
        ) : (
          <div className={styles.fallback} aria-hidden="true">
            <span>{categoryMark(category)}</span>
          </div>
        )}
        {supplierWatermark && (
          <span className={styles.watermark} aria-hidden="true">
            Supplier image
          </span>
        )}
        <span className={`${styles.supplierTag} ${SUPPLIER_TONE_CLASS[supplierTone]}`}>
          {supplier}
        </span>
      </Link>

      <div className={styles.body}>
        <span className={styles.sku}>SKU {sku}</span>
        <h3 className={styles.title}>
          <Link href={href}>{title}</Link>
        </h3>

        <PriceTag
          amount={(price.currentCents ?? price.rrpCents) / 100}
          compareAt={discounted ? price.rrpCents / 100 : undefined}
          currency="AUD"
          size="sm"
        />

        {fitment.length > 0 && (
          <div className={styles.fitment} aria-label="Fitment">
            {fitment.slice(0, 4).map((label) => (
              <Chip key={label} label={label} tone="green" />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default PartResultCard
