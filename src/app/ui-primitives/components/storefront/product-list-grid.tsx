"use client"

import { Eye, Minus, Plus, ShoppingCart, Star, Truck } from "lucide-react"
import { useState, type ChangeEvent } from "react"

import { Chip } from "../primitives/chip"
import { PriceTag } from "../commerce/price-tag"

import type { ProductCard, StorefrontTone, StockStatus } from "./storefront-types"
import { STORE_DEFAULT_CURRENCY, STORE_LOCALE } from "./storefront-types"
import styles from "./product-list-grid.module.css"

interface ProductListGridProps {
  products: ReadonlyArray<ProductCard>
  currency?: string
  locale?: string
  initialQuantities?: Record<string, number>
  onQuickView?: (id: string) => void
  onAddToCart?: (id: string, quantity: number) => void
  emptyLabel?: string
  ariaLabel?: string
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

const TONE_CLASS: Record<StorefrontTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
}

function formatAfterpay(amount: number, locale: string, currency: string): string {
  const installment = amount / 4
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(installment)
}

function clampQuantity(next: number): number {
  if (Number.isNaN(next)) {
    return 1
  }
  return Math.max(1, Math.min(99, next))
}

export function ProductListGrid({
  products,
  currency = STORE_DEFAULT_CURRENCY,
  locale = STORE_LOCALE,
  initialQuantities,
  onQuickView,
  onAddToCart,
  emptyLabel = "No parts match. Adjust filters or check your fitment.",
  ariaLabel = "Product list grid",
}: ProductListGridProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    () => ({ ...(initialQuantities ?? {}) }),
  )

  const setQty = (id: string, next: number) => {
    setQuantities((prev) => ({ ...prev, [id]: clampQuantity(next) }))
  }

  const getQty = (id: string): number => quantities[id] ?? 1

  const onInputChange = (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const next = Number.parseInt(event.target.value, 10)
    setQty(id, Number.isNaN(next) ? 1 : next)
  }

  if (products.length === 0) {
    return (
      <div className={styles.empty} role="status" aria-label={ariaLabel}>
        {emptyLabel}
      </div>
    )
  }

  return (
    <ul className={styles.grid} aria-label={ariaLabel}>
      {products.map((product) => {
        const qty = getQty(product.id)
        const cardId = `product-${product.id}`
        const titleId = `${cardId}-title`
        const qtyId = `${cardId}-qty`
        const isOos = product.stock === "out-of-stock"
        const stockTone = STOCK_TONE[product.stock]

        return (
          <li
            key={product.id}
            className={styles.card}
            aria-labelledby={titleId}
          >
            <div className={styles.media} aria-hidden="true">
              <span className={styles.glyph}>{product.sku.slice(0, 3)}</span>
              <div className={styles.mediaScanline} />
              {product.badges && product.badges.length > 0 && (
                <ul className={styles.badges}>
                  {product.badges.map((badge) => (
                    <li key={badge.label} className={TONE_CLASS[badge.tone]}>
                      {badge.label}
                    </li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                className={styles.quickView}
                onClick={() => onQuickView?.(product.id)}
                aria-label={`Quick view ${product.title}`}
              >
                <Eye size={14} aria-hidden="true" />
                <span>Quick view</span>
              </button>
            </div>

            <div className={styles.body}>
              <span className={styles.brand}>{product.brand}</span>
              <h3 id={titleId} className={styles.title}>
                {product.title}
              </h3>

              {product.fitment && (
                <p className={styles.fitment}>
                  Fits {product.fitment.make} {product.fitment.model}
                  {product.fitment.series ? ` ${product.fitment.series}` : ""}
                  {product.fitment.years ? ` · ${product.fitment.years}` : ""}
                </p>
              )}

              <div className={styles.statusRow}>
                <Chip
                  label={`${STOCK_LABEL[product.stock]}${
                    product.stockCount !== undefined && product.stock !== "out-of-stock"
                      ? ` · ${product.stockCount}`
                      : ""
                  }`}
                  tone={stockTone}
                />
                {product.rating !== undefined && (
                  <span className={styles.rating} aria-label={`Rated ${product.rating} out of 5`}>
                    <Star size={12} aria-hidden="true" fill="currentColor" />
                    <span className={styles.numeric}>{product.rating.toFixed(1)}</span>
                    {product.reviewCount !== undefined && (
                      <span className={styles.reviewCount}>({product.reviewCount})</span>
                    )}
                  </span>
                )}
              </div>

              <div className={styles.priceRow}>
                <PriceTag
                  amount={product.price}
                  compareAt={product.compareAt}
                  currency={currency}
                  locale={locale}
                  size="md"
                />
                {product.afterpay && (
                  <span className={styles.afterpay}>
                    or 4× {formatAfterpay(product.price, locale, currency)} with Afterpay
                  </span>
                )}
                {product.freeShipping && (
                  <span className={styles.freeShip}>
                    <Truck size={12} aria-hidden="true" /> Free shipping
                  </span>
                )}
              </div>
            </div>

            <div className={styles.actions}>
              <div className={styles.stepper} role="group" aria-labelledby={titleId}>
                <button
                  type="button"
                  className={styles.stepperBtn}
                  disabled={qty <= 1 || isOos}
                  onClick={() => setQty(product.id, qty - 1)}
                  aria-label={`Decrease quantity of ${product.title}`}
                >
                  <Minus size={12} aria-hidden="true" />
                </button>
                <input
                  id={qtyId}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className={styles.stepperInput}
                  value={qty}
                  disabled={isOos}
                  onChange={onInputChange(product.id)}
                  aria-label={`Quantity of ${product.title}`}
                />
                <button
                  type="button"
                  className={styles.stepperBtn}
                  disabled={qty >= 99 || isOos}
                  onClick={() => setQty(product.id, qty + 1)}
                  aria-label={`Increase quantity of ${product.title}`}
                >
                  <Plus size={12} aria-hidden="true" />
                </button>
              </div>
              <button
                type="button"
                className={styles.addBtn}
                disabled={isOos}
                onClick={() => onAddToCart?.(product.id, qty)}
                aria-label={
                  isOos
                    ? `${product.title} is out of stock`
                    : `Add ${qty} × ${product.title} to cart`
                }
              >
                <ShoppingCart size={14} aria-hidden="true" />
                <span>{isOos ? "Sold out" : "Add to cart"}</span>
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default ProductListGrid
