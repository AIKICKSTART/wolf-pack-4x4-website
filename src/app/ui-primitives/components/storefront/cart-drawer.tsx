"use client"

import { Minus, Plus, Trash2, Truck, X } from "lucide-react"
import { useMemo, useState, type ChangeEvent } from "react"

import { Chip } from "../primitives/chip"
import { PriceTag } from "../commerce/price-tag"

import type {
  CartTotals,
  ShippingEstimate,
  StorefrontCartLine,
  StockStatus,
  StorefrontTone,
} from "./storefront-types"
import {
  STORE_DEFAULT_CURRENCY,
  STORE_FREE_SHIPPING_THRESHOLD,
  STORE_LOCALE,
} from "./storefront-types"
import styles from "./cart-drawer.module.css"

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lines: ReadonlyArray<StorefrontCartLine>
  totals: CartTotals
  estimate?: ShippingEstimate
  currency?: string
  locale?: string
  freeShippingThreshold?: number
  onQuantityChange?: (id: string, quantity: number) => void
  onRemove?: (id: string) => void
  onCheckout?: () => void
  onEstimate?: (postcode: string) => void
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
  "low-stock": "Low",
  "back-order": "Back-order",
  "out-of-stock": "OOS",
  "pre-order": "Pre-order",
}

function formatCurrency(amount: number, currency: string, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

function clampQuantity(next: number): number {
  if (Number.isNaN(next)) {
    return 1
  }
  return Math.max(1, Math.min(99, next))
}

export function CartDrawer({
  open,
  onOpenChange,
  lines,
  totals,
  estimate,
  currency = STORE_DEFAULT_CURRENCY,
  locale = STORE_LOCALE,
  freeShippingThreshold = STORE_FREE_SHIPPING_THRESHOLD,
  onQuantityChange,
  onRemove,
  onCheckout,
  onEstimate,
}: CartDrawerProps) {
  const [postcode, setPostcode] = useState<string>(estimate?.postcode ?? "")

  const freeShippingProgress = useMemo(() => {
    if (freeShippingThreshold <= 0) {
      return 100
    }
    return Math.min(100, Math.round((totals.subtotal / freeShippingThreshold) * 100))
  }, [totals.subtotal, freeShippingThreshold])

  const freeShippingRemaining = Math.max(0, freeShippingThreshold - totals.subtotal)
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0)

  if (!open) {
    return null
  }

  return (
    <div className={styles.shell} role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button
        type="button"
        className={styles.backdrop}
        onClick={() => onOpenChange(false)}
        aria-label="Close cart"
      />
      <aside className={styles.panel}>
        <header className={styles.head}>
          <div className={styles.headInner}>
            <span className={styles.kicker}>Your cart</span>
            <h2 className={styles.title}>
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </h2>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => onOpenChange(false)}
            aria-label="Close cart drawer"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className={styles.empty}>
            <p>Your cart is empty.</p>
            <p className={styles.emptyMeta}>
              Browse the catalogue and chuck a Manta cat-back in.
            </p>
          </div>
        ) : (
          <>
            <div className={styles.shippingProgress}>
              <span className={styles.shipKicker}>
                <Truck size={12} aria-hidden="true" />
                {freeShippingRemaining > 0
                  ? `${formatCurrency(freeShippingRemaining, currency, locale)} to free shipping`
                  : "Free shipping unlocked"}
              </span>
              <div
                className={styles.shipTrack}
                role="progressbar"
                aria-valuenow={freeShippingProgress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progress to free shipping"
              >
                <span
                  className={styles.shipFill}
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            <ul className={styles.lines}>
              {lines.map((line) => {
                const lineTotal = line.unitPrice * line.quantity
                return (
                  <li key={line.id} className={styles.line}>
                    <div className={styles.thumb} aria-hidden="true">
                      <span>{line.thumbnailGlyph ?? line.sku.slice(0, 3)}</span>
                    </div>
                    <div className={styles.lineBody}>
                      <span className={styles.lineBrand}>{line.brand}</span>
                      <h3 className={styles.lineTitle}>{line.title}</h3>
                      <div className={styles.lineMeta}>
                        <span className={styles.lineSku}>SKU · {line.sku}</span>
                        <Chip
                          label={STOCK_LABEL[line.stock]}
                          tone={STOCK_TONE[line.stock]}
                        />
                      </div>
                      {line.variantLabel && (
                        <span className={styles.lineVariant}>{line.variantLabel}</span>
                      )}
                    </div>
                    <div className={styles.lineCtrl}>
                      <div className={styles.stepper} role="group" aria-label={`Quantity ${line.title}`}>
                        <button
                          type="button"
                          className={styles.stepperBtn}
                          disabled={line.quantity <= 1}
                          onClick={() => onQuantityChange?.(line.id, clampQuantity(line.quantity - 1))}
                          aria-label={`Decrease quantity of ${line.title}`}
                        >
                          <Minus size={12} aria-hidden="true" />
                        </button>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={line.quantity}
                          className={styles.stepperInput}
                          aria-label={`Quantity of ${line.title}`}
                          onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            const next = Number.parseInt(event.target.value, 10)
                            onQuantityChange?.(
                              line.id,
                              Number.isNaN(next) ? line.quantity : clampQuantity(next),
                            )
                          }}
                        />
                        <button
                          type="button"
                          className={styles.stepperBtn}
                          disabled={line.quantity >= 99}
                          onClick={() => onQuantityChange?.(line.id, clampQuantity(line.quantity + 1))}
                          aria-label={`Increase quantity of ${line.title}`}
                        >
                          <Plus size={12} aria-hidden="true" />
                        </button>
                      </div>
                      <span className={styles.lineTotal}>
                        {formatCurrency(lineTotal, currency, locale)}
                      </span>
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => onRemove?.(line.id)}
                        aria-label={`Remove ${line.title}`}
                      >
                        <Trash2 size={12} aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className={styles.estimateBlock}>
              <span className={styles.eyebrow}>Estimate shipping</span>
              <div className={styles.estimateRow}>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{4}"
                  maxLength={4}
                  className={styles.estimateInput}
                  placeholder="2527"
                  value={postcode}
                  onChange={(event) => setPostcode(event.target.value)}
                  aria-label="Postcode for shipping estimate"
                />
                <button
                  type="button"
                  className={styles.estimateBtn}
                  onClick={() => onEstimate?.(postcode)}
                >
                  Estimate
                </button>
              </div>
              {estimate && (
                <div className={styles.estimateResult}>
                  <div className={styles.estimateBody}>
                    <span className={styles.estimateCarrier}>
                      {estimate.carrier} · {estimate.serviceLabel}
                    </span>
                    <span className={styles.estimateRegion}>
                      {estimate.region} {estimate.postcode}
                    </span>
                    <span className={styles.estimateEta}>{estimate.etaLabel}</span>
                  </div>
                  <span className={styles.estimateCost}>
                    {estimate.cost === 0
                      ? "Free"
                      : formatCurrency(estimate.cost, currency, locale)}
                  </span>
                </div>
              )}
            </div>

            <footer className={styles.foot}>
              <dl className={styles.totals}>
                <div>
                  <dt>Subtotal</dt>
                  <dd>{formatCurrency(totals.subtotal, currency, locale)}</dd>
                </div>
                <div>
                  <dt>Freight</dt>
                  <dd>
                    {totals.freight === 0
                      ? "Free"
                      : formatCurrency(totals.freight, currency, locale)}
                  </dd>
                </div>
                <div>
                  <dt>GST inc</dt>
                  <dd>{formatCurrency(totals.gst, currency, locale)}</dd>
                </div>
                {totals.discount && totals.discount > 0 ? (
                  <div className={styles.discount}>
                    <dt>Discount</dt>
                    <dd>−{formatCurrency(totals.discount, currency, locale)}</dd>
                  </div>
                ) : null}
              </dl>
              <div className={styles.grandRow}>
                <span className={styles.grandLabel}>Total</span>
                <PriceTag amount={totals.total} currency={currency} locale={locale} size="md" />
              </div>
              <button
                type="button"
                className={styles.checkoutBtn}
                onClick={onCheckout}
              >
                Checkout securely
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer
