"use client"

import { ChevronDown, Package } from "lucide-react"
import { useState } from "react"

import { Chip } from "../primitives/chip"

import { formatCurrency } from "./quote-types"
import styles from "./quote-bundle-option.module.css"

export interface BundleIncludedItem {
  sku: string
  title: string
  quantity: number
}

interface QuoteBundleOptionProps {
  id: string
  name: string
  description: string
  items: ReadonlyArray<BundleIncludedItem>
  bundlePrice: number
  savings: number
  currency?: string
  defaultExpanded?: boolean
}

export function QuoteBundleOption({
  id,
  name,
  description,
  items,
  bundlePrice,
  savings,
  currency = "AUD",
  defaultExpanded = false,
}: QuoteBundleOptionProps) {
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded)
  const listId = `bundle-${id}-items`
  const headingId = `bundle-${id}-title`

  return (
    <section className={styles.card} aria-labelledby={headingId}>
      <header className={styles.head}>
        <div className={styles.icon} aria-hidden="true">
          <Package size={20} strokeWidth={1.6} />
        </div>
        <div className={styles.headBody}>
          <span className={styles.kicker}>Bundle</span>
          <h3 id={headingId} className={styles.title}>{name}</h3>
          <p className={styles.desc}>{description}</p>
        </div>
        <div className={styles.pricing}>
          <strong className={styles.price}>{formatCurrency(bundlePrice, currency)}</strong>
          <Chip label={`Save ${formatCurrency(savings, currency)}`} tone="green" />
        </div>
      </header>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={expanded}
        aria-controls={listId}
        onClick={() => setExpanded((next) => !next)}
      >
        <span>{expanded ? "Hide" : "Show"} {items.length} included items</span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={expanded ? styles.chevronOpen : styles.chevron}
        />
      </button>
      {expanded && (
        <ul id={listId} className={styles.items}>
          {items.map((item) => (
            <li key={item.sku} className={styles.item}>
              <span className={styles.itemTitle}>{item.title}</span>
              <span className={styles.itemMeta}>
                SKU · {item.sku} · Qty {item.quantity}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default QuoteBundleOption
