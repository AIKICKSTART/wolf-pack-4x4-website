"use client"

import { Minus, Plus, Trash2 } from "lucide-react"
import { useState, type ChangeEvent } from "react"

import { Chip } from "../primitives/chip"

import { PriceTag } from "./price-tag"
import styles from "./cart-line-item.module.css"

export interface CartLineItemOption {
  label: string
  value: string
}

interface CartLineItemProps {
  id: string
  title: string
  sku: string
  unitPrice: number
  quantity: number
  thumbnail?: string
  thumbnailAlt?: string
  options?: ReadonlyArray<CartLineItemOption>
  currency?: string
  minQuantity?: number
  maxQuantity?: number
  onQuantityChange?: (id: string, quantity: number) => void
  onRemove?: (id: string) => void
}

function formatCurrency(value: number, currency: string): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value)
}

export function CartLineItem({
  id,
  title,
  sku,
  unitPrice,
  quantity,
  thumbnail,
  thumbnailAlt,
  options,
  currency = "AUD",
  minQuantity = 1,
  maxQuantity = 99,
  onQuantityChange,
  onRemove,
}: CartLineItemProps) {
  const [draft, setDraft] = useState<string>(String(quantity))

  const clampQuantity = (next: number): number => {
    if (Number.isNaN(next)) {
      return minQuantity
    }
    return Math.max(minQuantity, Math.min(maxQuantity, next))
  }

  const commitQuantity = (next: number) => {
    const clamped = clampQuantity(next)
    setDraft(String(clamped))
    if (clamped !== quantity) {
      onQuantityChange?.(id, clamped)
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value
    if (next === "" || /^\d+$/.test(next)) {
      setDraft(next)
    }
  }

  const handleBlur = () => {
    const next = Number.parseInt(draft, 10)
    commitQuantity(Number.isNaN(next) ? quantity : next)
  }

  const lineTotal = unitPrice * quantity
  const titleId = `cart-line-${id}-title`
  const quantityId = `cart-line-${id}-qty`

  return (
    <article className={styles.row} aria-labelledby={titleId}>
      <div className={styles.media} aria-hidden="true">
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumbnail} alt={thumbnailAlt ?? ""} className={styles.thumb} />
        ) : (
          <span className={styles.placeholder}>{sku.slice(0, 2).toUpperCase()}</span>
        )}
      </div>
      <div className={styles.body}>
        <header className={styles.head}>
          <h3 id={titleId} className={styles.title}>{title}</h3>
          <span className={styles.sku}>SKU · {sku}</span>
        </header>
        {options && options.length > 0 && (
          <ul className={styles.options}>
            {options.map((option) => (
              <li key={option.label}>
                <Chip
                  label={`${option.label}: ${option.value}`}
                  tone="neutral"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.controls}>
        <div className={styles.stepper} role="group" aria-labelledby={titleId}>
          <button
            type="button"
            className={styles.stepperBtn}
            aria-label={`Decrease quantity of ${title}`}
            disabled={quantity <= minQuantity}
            onClick={() => commitQuantity(quantity - 1)}
          >
            <Minus size={14} aria-hidden="true" />
          </button>
          <input
            id={quantityId}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className={styles.stepperInput}
            value={draft}
            aria-label={`Quantity of ${title}`}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <button
            type="button"
            className={styles.stepperBtn}
            aria-label={`Increase quantity of ${title}`}
            disabled={quantity >= maxQuantity}
            onClick={() => commitQuantity(quantity + 1)}
          >
            <Plus size={14} aria-hidden="true" />
          </button>
        </div>
        <span className={styles.unit}>{formatCurrency(unitPrice, currency)} ea</span>
      </div>
      <div className={styles.total}>
        <PriceTag amount={lineTotal} currency={currency} size="sm" />
      </div>
      <button
        type="button"
        className={styles.remove}
        aria-label={`Remove ${title} from cart`}
        onClick={() => onRemove?.(id)}
      >
        <Trash2 size={14} aria-hidden="true" />
      </button>
    </article>
  )
}

export default CartLineItem
