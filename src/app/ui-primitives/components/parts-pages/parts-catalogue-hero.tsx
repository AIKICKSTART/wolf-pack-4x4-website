import { Chip } from "../primitives/chip"

import { SupplierBadge } from "./supplier-badge"

import type { PartSupplierBadge, PartTone } from "./parts-pages-types"

import styles from "./parts-catalogue-hero.module.css"

export interface PartsCatalogueHeroProps {
  kicker: string
  headline: string
  description: string
  /** Optional tone override — defaults to amber. */
  tone?: PartTone
  /** Supplier coverage line, e.g. "5 supplier feeds connected". */
  supplierCoverageLabel: string
  /** Part count chip text, e.g. "19,412 parts indexed". */
  partCountLabel: string
  /** Inline supplier badges row. */
  suppliers: ReadonlyArray<Pick<PartSupplierBadge, "id" | "name" | "tone">>
  className?: string
}

const TONE_CLASS: Record<PartTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

export function PartsCatalogueHero({
  kicker,
  headline,
  description,
  tone = "amber",
  supplierCoverageLabel,
  partCountLabel,
  suppliers,
  className,
}: PartsCatalogueHeroProps) {
  const sectionClass = [styles.section, TONE_CLASS[tone], className].filter(Boolean).join(" ")

  return (
    <section
      className={sectionClass}
      role="region"
      aria-label={`Parts catalogue hero — ${headline}`}
    >
      <div className={styles.copy}>
        <span className={styles.kicker}>{kicker}</span>
        <h1 className={styles.headline}>{headline}</h1>
        <p className={styles.body}>{description}</p>

        <div className={styles.chips} aria-label="Catalogue coverage">
          <Chip label={partCountLabel} tone="green" />
          <Chip label={supplierCoverageLabel} tone="teal" />
        </div>
      </div>

      <aside className={styles.suppliers} aria-label="Supplier coverage">
        <span className={styles.suppliersLabel}>Stocked brands</span>
        <ul className={styles.supplierList}>
          {suppliers.map((supplier) => (
            <li key={supplier.id}>
              <SupplierBadge name={supplier.name} tone={supplier.tone} variant="inline" />
            </li>
          ))}
        </ul>
      </aside>
    </section>
  )
}

export default PartsCatalogueHero
