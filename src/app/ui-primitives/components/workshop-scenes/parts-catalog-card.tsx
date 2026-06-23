"use client"

import { Plus } from "lucide-react"
import Image from "next/image"
import type { ReactNode } from "react"

import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"
import styles from "./parts-catalog-card.module.css"

export type StockState = "in-stock" | "low" | "back-order" | "special"

export interface PartsCatalogCardProps {
  sku: string
  title: string
  supplier: string
  fitment: string
  /** Price in AUD, dollars with optional cents (e.g. 1289 or 1289.95). */
  rrp: number
  stockState: StockState
  /** Optional thumbnail image URL. */
  thumbSrc?: string
  /** Placeholder character/text when no image is provided. */
  thumbPlaceholder?: string
  onAddToQuote?: () => void
  /** Optional extra action slot rendered next to the price. */
  trailing?: ReactNode
}

const STOCK_LABEL: Record<StockState, string> = {
  "in-stock": "In stock",
  low: "Low stock",
  "back-order": "Back order",
  special: "Special order",
}

const STOCK_TONE: Record<StockState, ChipTone> = {
  "in-stock": "green",
  low: "amber",
  "back-order": "red",
  special: "teal",
}

function formatAud(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
  }).format(amount)
}

export function PartsCatalogCard({
  sku,
  title,
  supplier,
  fitment,
  rrp,
  stockState,
  thumbSrc,
  thumbPlaceholder,
  onAddToQuote,
  trailing,
}: PartsCatalogCardProps) {
  const placeholder = thumbPlaceholder ?? sku.split("-").pop() ?? "PART"

  return (
    <article className={styles.card}>
      <div className={styles.thumb}>
        <span className={styles.sku}>{sku}</span>
        {thumbSrc ? (
          <Image
            src={thumbSrc}
            alt={title}
            width={320}
            height={220}
            unoptimized
          />
        ) : (
          <span className={styles.placeholder} aria-hidden="true">
            {placeholder}
          </span>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.metaRow}>
          <Chip label={supplier} tone="neutral" />
          <Chip label={fitment} tone="teal" />
          <Chip label={STOCK_LABEL[stockState]} tone={STOCK_TONE[stockState]} />
        </div>
      </div>
      <footer className={styles.foot}>
        <div className={styles.price}>
          <strong className={styles.priceAmount}>{formatAud(rrp)}</strong>
          <span className={styles.priceLabel}>RRP · ex GST</span>
        </div>
        {trailing ?? (
          <button
            type="button"
            className={styles.cta}
            onClick={onAddToQuote}
            aria-label={`Add ${title} to quote`}
          >
            <Plus size={12} strokeWidth={2.6} aria-hidden="true" />
            Add to quote
          </button>
        )}
      </footer>
    </article>
  )
}

export default PartsCatalogCard
