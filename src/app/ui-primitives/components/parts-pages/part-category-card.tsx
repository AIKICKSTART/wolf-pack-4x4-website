import Link from "next/link"

import { Chip, type ChipTone } from "../primitives/chip"

import type { PartTone, SupplierTone } from "./parts-pages-types"

import styles from "./part-category-card.module.css"

export interface PartCategoryCardSupplier {
  id: string
  label: string
  tone: SupplierTone
}

export interface PartCategoryCardProps {
  title: string
  description: string
  href: string
  tone: PartTone
  partCount: number
  /** Up to 5 popular supplier chips, rendered via the Chip primitive. */
  popularSuppliers: ReadonlyArray<PartCategoryCardSupplier>
  /** Optional 3-letter category mark — defaults to first three uppercase letters of title. */
  mark?: string
}

const TONE_CLASS: Record<PartTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

const SUPPLIER_TO_CHIP_TONE: Record<SupplierTone, ChipTone> = {
  manta: "red",
  redback: "red",
  xforce: "teal",
  pacemaker: "amber",
  lukey: "amber",
  hushpower: "green",
  neutral: "neutral",
}

function defaultMark(title: string): string {
  return title.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase() || "PRT"
}

export function PartCategoryCard({
  title,
  description,
  href,
  tone,
  partCount,
  popularSuppliers,
  mark,
}: PartCategoryCardProps) {
  return (
    <article className={`${styles.card} ${TONE_CLASS[tone]}`}>
      <div className={styles.thumb} aria-hidden="true">
        <span className={styles.thumbMark}>{mark ?? defaultMark(title)}</span>
        <span className={styles.thumbRule} />
      </div>

      <div className={styles.body}>
        <span className={styles.partCount}>{partCount.toLocaleString()} parts</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.copy}>{description}</p>

        {popularSuppliers.length > 0 && (
          <div className={styles.suppliers} aria-label="Popular suppliers">
            {popularSuppliers.slice(0, 5).map((supplier) => (
              <Chip
                key={supplier.id}
                label={supplier.label}
                tone={SUPPLIER_TO_CHIP_TONE[supplier.tone]}
              />
            ))}
          </div>
        )}

        <Link href={href} className={styles.cta}>
          View category
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}

export default PartCategoryCard
