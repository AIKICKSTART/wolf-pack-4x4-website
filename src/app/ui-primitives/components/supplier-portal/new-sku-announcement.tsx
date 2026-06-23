"use client"

import Image from "next/image"
import { Plus, Sparkles } from "lucide-react"

import { PriceTag } from "../commerce/price-tag"
import { Reveal } from "../motion/reveal"
import { Chip } from "../primitives/chip"

import styles from "./new-sku-announcement.module.css"

export interface NewSkuAnnouncementProps {
  sku: string
  title: string
  /** One-paragraph supplier-written description. */
  description: string
  /** Hero image URL. Falls back to a placeholder swatch when omitted. */
  imageSrc?: string
  /** Suggested RRP, ex GST, AUD. */
  suggestedRrp: number
  /** Launch-date chip label, e.g. "Launches 12 Jul". */
  launchLabel: string
  /** Add-to-catalog CTA target. */
  onAdd?: (sku: string) => void
}

export function NewSkuAnnouncement({
  sku,
  title,
  description,
  imageSrc,
  suggestedRrp,
  launchLabel,
  onAdd,
}: NewSkuAnnouncementProps) {
  return (
    <Reveal as="article" from="below" className={styles.card}>
      <div
        className={styles.media}
        role="region"
        aria-label={`Hero image for ${sku}`}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            width={520}
            height={320}
            className={styles.image}
            unoptimized
          />
        ) : (
          <span className={styles.placeholder} aria-hidden="true">
            {sku.split("-").pop() ?? "NEW"}
          </span>
        )}
        <span className={styles.badge}>
          <Sparkles size={12} aria-hidden="true" />
          New
        </span>
      </div>

      <div className={styles.body}>
        <header className={styles.head}>
          <span className={styles.kicker}>{sku}</span>
          <h3 className={styles.title}>{title}</h3>
          <Chip label={launchLabel} tone="amber" />
        </header>

        <p className={styles.description}>{description}</p>

        <div className={styles.footer}>
          <div className={styles.rrp}>
            <span className={styles.rrpLabel}>Suggested RRP</span>
            <PriceTag amount={suggestedRrp} size="md" />
          </div>
          <button
            type="button"
            className={styles.cta}
            onClick={() => onAdd?.(sku)}
          >
            <Plus size={14} aria-hidden="true" />
            Add to catalog
          </button>
        </div>
      </div>
    </Reveal>
  )
}

export default NewSkuAnnouncement
