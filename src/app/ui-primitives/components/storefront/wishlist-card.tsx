"use client"

import { Bell, BellOff, Heart, ShoppingCart } from "lucide-react"
import { useState } from "react"

import { Chip } from "../primitives/chip"
import { PriceTag } from "../commerce/price-tag"

import type { StockStatus, StorefrontTone, WishlistEntry } from "./storefront-types"
import { STORE_DEFAULT_CURRENCY, STORE_LOCALE } from "./storefront-types"
import styles from "./wishlist-card.module.css"

interface WishlistCardProps {
  entry: WishlistEntry
  currency?: string
  locale?: string
  onRemove?: (id: string) => void
  onMoveToCart?: (id: string) => void
  onToggleAlert?: (id: string, alertOn: boolean) => void
}

const STOCK_TONE: Record<StockStatus, StorefrontTone> = {
  "in-stock": "green",
  "low-stock": "amber",
  "back-order": "amber",
  "out-of-stock": "red",
  "pre-order": "teal",
}

const STOCK_LABEL: Record<StockStatus, string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "back-order": "Back-order",
  "out-of-stock": "Out of stock",
  "pre-order": "Pre-order",
}

export function WishlistCard({
  entry,
  currency = STORE_DEFAULT_CURRENCY,
  locale = STORE_LOCALE,
  onRemove,
  onMoveToCart,
  onToggleAlert,
}: WishlistCardProps) {
  const [alertEnabled, setAlertEnabled] = useState<boolean>(entry.alertEnabled ?? false)

  const isOos = entry.stock === "out-of-stock"

  const handleAlertToggle = () => {
    const next = !alertEnabled
    setAlertEnabled(next)
    onToggleAlert?.(entry.id, next)
  }

  return (
    <article className={styles.card} aria-labelledby={`wl-${entry.id}-title`}>
      <div className={styles.media} aria-hidden="true">
        <span className={styles.glyph}>{entry.sku.slice(0, 3)}</span>
      </div>
      <div className={styles.body}>
        <header className={styles.head}>
          <span className={styles.brand}>{entry.brand}</span>
          <h3 id={`wl-${entry.id}-title`} className={styles.title}>
            {entry.title}
          </h3>
          {entry.fitment && (
            <p className={styles.fitment}>
              Fits {entry.fitment.make} {entry.fitment.model}
              {entry.fitment.series ? ` ${entry.fitment.series}` : ""}
            </p>
          )}
        </header>

        <div className={styles.statusRow}>
          <Chip label={STOCK_LABEL[entry.stock]} tone={STOCK_TONE[entry.stock]} />
          <span className={styles.added}>Saved {entry.addedAtLabel}</span>
        </div>

        <div className={styles.priceRow}>
          <PriceTag amount={entry.price} currency={currency} locale={locale} size="md" />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.alertBtn} ${alertEnabled ? styles.alertOn : ""}`}
            aria-pressed={alertEnabled}
            onClick={handleAlertToggle}
          >
            {alertEnabled ? (
              <>
                <Bell size={12} aria-hidden="true" /> Stock alert on
              </>
            ) : (
              <>
                <BellOff size={12} aria-hidden="true" /> Set stock alert
              </>
            )}
          </button>
          <button
            type="button"
            className={styles.moveBtn}
            onClick={() => onMoveToCart?.(entry.id)}
            disabled={isOos}
          >
            <ShoppingCart size={12} aria-hidden="true" />
            {isOos ? "Sold out" : "Move to cart"}
          </button>
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => onRemove?.(entry.id)}
            aria-label={`Remove ${entry.title} from wishlist`}
          >
            <Heart size={12} aria-hidden="true" fill="currentColor" />
          </button>
        </div>
      </div>
    </article>
  )
}

export default WishlistCard
