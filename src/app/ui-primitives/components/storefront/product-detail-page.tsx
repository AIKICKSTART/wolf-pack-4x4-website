"use client"

import { Heart, Minus, Plus, ShoppingCart, Star, Truck } from "lucide-react"
import { useState, type ChangeEvent } from "react"

import { Chip } from "../primitives/chip"
import { PriceTag } from "../commerce/price-tag"

import type {
  ProductCard,
  ProductMediaItem,
  ProductReviewItem,
  ProductSpecRow,
  ProductVariantGroup,
  StockStatus,
  StorefrontTone,
} from "./storefront-types"
import { STORE_DEFAULT_CURRENCY, STORE_LOCALE } from "./storefront-types"
import styles from "./product-detail-page.module.css"

interface ProductDetailPageProps {
  product: ProductCard
  media: ReadonlyArray<ProductMediaItem>
  description: string
  specs: ReadonlyArray<ProductSpecRow>
  variants?: ReadonlyArray<ProductVariantGroup>
  reviews?: ReadonlyArray<ProductReviewItem>
  reviewSummary?: { average: number; total: number; recommendPct: number }
  initialSelection?: Record<string, string>
  initialQuantity?: number
  currency?: string
  locale?: string
  onAddToCart?: (id: string, quantity: number, selection: Record<string, string>) => void
  onWishlist?: (id: string) => void
}

const STOCK_TONE: Record<StockStatus, StorefrontTone> = {
  "in-stock": "green",
  "low-stock": "amber",
  "back-order": "amber",
  "out-of-stock": "red",
  "pre-order": "teal",
}

const STOCK_LABEL: Record<StockStatus, string> = {
  "in-stock": "In stock — Albion Park",
  "low-stock": "Low stock",
  "back-order": "Back-order (10 day ETA)",
  "out-of-stock": "Out of stock",
  "pre-order": "Pre-order",
}

function clampQuantity(next: number): number {
  if (Number.isNaN(next)) {
    return 1
  }
  return Math.max(1, Math.min(99, next))
}

function formatCurrency(amount: number, currency: string, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export function ProductDetailPage({
  product,
  media,
  description,
  specs,
  variants,
  reviews,
  reviewSummary,
  initialSelection,
  initialQuantity = 1,
  currency = STORE_DEFAULT_CURRENCY,
  locale = STORE_LOCALE,
  onAddToCart,
  onWishlist,
}: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState<number>(clampQuantity(initialQuantity))
  const [activeMedia, setActiveMedia] = useState<string>(media[0]?.id ?? "")
  const [selection, setSelection] = useState<Record<string, string>>(() => {
    if (initialSelection) {
      return { ...initialSelection }
    }
    const defaults: Record<string, string> = {}
    if (variants) {
      for (const group of variants) {
        const first = group.options.find((option) => option.available)
        if (first) {
          defaults[group.key] = first.id
        }
      }
    }
    return defaults
  })

  const handleQuantityInput = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Number.parseInt(event.target.value, 10)
    setQuantity(clampQuantity(next))
  }

  const isOos = product.stock === "out-of-stock"
  const activeMediaItem = media.find((item) => item.id === activeMedia) ?? media[0]

  return (
    <article className={styles.layout} aria-label={`${product.brand} ${product.title}`}>
      <section className={styles.gallery} aria-label="Product images">
        <div className={styles.heroFrame} aria-hidden="true">
          <span className={styles.heroGlyph}>
            {activeMediaItem?.glyph ?? product.sku.slice(0, 3)}
          </span>
          <span className={styles.heroCaption}>{activeMediaItem?.alt ?? product.title}</span>
        </div>
        <ul className={styles.thumbs} role="tablist" aria-label="Image thumbnails">
          {media.map((item) => {
            const isActive = item.id === activeMediaItem?.id
            return (
              <li key={item.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="product-hero"
                  className={`${styles.thumbBtn} ${isActive ? styles.thumbActive : ""}`}
                  onClick={() => setActiveMedia(item.id)}
                >
                  <span aria-hidden="true">{item.glyph ?? item.kind.slice(0, 3).toUpperCase()}</span>
                  <span className={styles.thumbKind}>{item.kind}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.info} aria-label="Product info">
        <header className={styles.head}>
          <span className={styles.brand}>{product.brand}</span>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.sku}>SKU · {product.sku}</p>
          {reviewSummary && (
            <div className={styles.reviewSummary} aria-label={`Rated ${reviewSummary.average} of 5`}>
              <span className={styles.starRow} aria-hidden="true">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <Star
                    key={idx}
                    size={14}
                    fill={idx < Math.round(reviewSummary.average) ? "currentColor" : "transparent"}
                  />
                ))}
              </span>
              <span className={styles.numeric}>{reviewSummary.average.toFixed(1)}</span>
              <span className={styles.reviewCount}>
                ({reviewSummary.total} reviews · {reviewSummary.recommendPct}% recommend)
              </span>
            </div>
          )}
        </header>

        <div className={styles.priceBlock}>
          <PriceTag
            amount={product.price}
            compareAt={product.compareAt}
            currency={currency}
            locale={locale}
            size="lg"
          />
          {product.afterpay && (
            <span className={styles.afterpay}>
              or 4× {formatCurrency(product.price / 4, currency, locale)} fortnightly with Afterpay
            </span>
          )}
        </div>

        <Chip
          label={`${STOCK_LABEL[product.stock]}${
            product.stockCount && product.stock !== "out-of-stock" ? ` · ${product.stockCount} units` : ""
          }`}
          tone={STOCK_TONE[product.stock]}
        />

        {variants && variants.length > 0 && (
          <div className={styles.variants}>
            {variants.map((group) => (
              <fieldset key={group.key} className={styles.variantGroup}>
                <legend className={styles.variantLabel}>{group.label}</legend>
                <div className={styles.variantOptions} role="radiogroup" aria-label={group.label}>
                  {group.options.map((option) => {
                    const isSelected = selection[group.key] === option.id
                    return (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        disabled={!option.available}
                        className={`${styles.variantOption} ${isSelected ? styles.variantSelected : ""}`}
                        onClick={() => setSelection((prev) => ({ ...prev, [group.key]: option.id }))}
                      >
                        {option.swatch && (
                          <span className={styles.swatch} style={{ background: option.swatch }} aria-hidden="true" />
                        )}
                        <span>{option.label}</span>
                        {option.priceDelta !== undefined && option.priceDelta !== 0 && (
                          <span className={styles.priceDelta}>
                            {option.priceDelta > 0 ? "+" : "−"}
                            {formatCurrency(Math.abs(option.priceDelta), currency, locale)}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            ))}
          </div>
        )}

        <div className={styles.actionRow}>
          <div className={styles.stepper} role="group" aria-label="Quantity">
            <button
              type="button"
              className={styles.stepperBtn}
              disabled={quantity <= 1 || isOos}
              onClick={() => setQuantity(clampQuantity(quantity - 1))}
              aria-label="Decrease quantity"
            >
              <Minus size={14} aria-hidden="true" />
            </button>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className={styles.stepperInput}
              value={quantity}
              disabled={isOos}
              onChange={handleQuantityInput}
              aria-label="Quantity"
            />
            <button
              type="button"
              className={styles.stepperBtn}
              disabled={quantity >= 99 || isOos}
              onClick={() => setQuantity(clampQuantity(quantity + 1))}
              aria-label="Increase quantity"
            >
              <Plus size={14} aria-hidden="true" />
            </button>
          </div>
          <button
            type="button"
            className={styles.cta}
            disabled={isOos}
            onClick={() => onAddToCart?.(product.id, quantity, selection)}
          >
            <ShoppingCart size={16} aria-hidden="true" />
            {isOos ? "Out of stock" : `Add ${quantity} to cart`}
          </button>
          <button
            type="button"
            className={styles.wishlistBtn}
            onClick={() => onWishlist?.(product.id)}
            aria-label="Add to wishlist"
          >
            <Heart size={16} aria-hidden="true" />
          </button>
        </div>

        {product.freeShipping && (
          <p className={styles.shipNote}>
            <Truck size={14} aria-hidden="true" /> Free metro shipping · Albion Park warehouse · pick-up
            ready in 2 hrs
          </p>
        )}

        <section className={styles.section} aria-labelledby="pdp-overview-title">
          <h2 id="pdp-overview-title" className={styles.sectionTitle}>
            Overview
          </h2>
          <p className={styles.description}>{description}</p>
        </section>

        <section className={styles.section} aria-labelledby="pdp-specs-title">
          <h2 id="pdp-specs-title" className={styles.sectionTitle}>
            Specifications
          </h2>
          <dl className={styles.specs}>
            {specs.map((row) => (
              <div key={row.label} className={styles.specRow}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {reviews && reviews.length > 0 && (
          <section className={styles.section} aria-labelledby="pdp-reviews-title">
            <h2 id="pdp-reviews-title" className={styles.sectionTitle}>
              Customer reviews
            </h2>
            <ul className={styles.reviews}>
              {reviews.map((review) => (
                <li key={review.id} className={styles.reviewItem}>
                  <header className={styles.reviewHeader}>
                    <span className={styles.reviewAuthor}>{review.author}</span>
                    {review.verified && (
                      <Chip label="Verified buyer" tone="green" />
                    )}
                    <span className={styles.reviewDate}>{review.postedAt}</span>
                  </header>
                  <div className={styles.reviewStars} aria-label={`Rated ${review.rating} of 5`}>
                    {[0, 1, 2, 3, 4].map((idx) => (
                      <Star
                        key={idx}
                        size={12}
                        fill={idx < review.rating ? "currentColor" : "transparent"}
                      />
                    ))}
                  </div>
                  <h3 className={styles.reviewTitle}>{review.title}</h3>
                  <p className={styles.reviewBody}>{review.body}</p>
                  {review.vehicle && (
                    <p className={styles.reviewVehicle}>Vehicle · {review.vehicle}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </section>
    </article>
  )
}

export default ProductDetailPage
