import { ArrowRight, Box } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./search-result-product.module.css"

export interface SearchResultProductProps {
  title: string
  sku: string
  price: string
  supplier: string
  fitment?: string
  inStock?: boolean
  stockCount?: number
  thumbnail?: ReactNode
  href?: string
  ctaLabel?: string
  ariaPriceLabel?: string
  className?: string
}

export function SearchResultProduct({
  title,
  sku,
  price,
  supplier,
  fitment,
  inStock = true,
  stockCount,
  thumbnail,
  href,
  ctaLabel = "View part",
  ariaPriceLabel,
  className,
}: SearchResultProductProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <article className={classes}>
      <div className={styles.thumb} aria-hidden="true">
        {thumbnail ?? <Box size={28} strokeWidth={1.6} />}
        <div className={styles.thumbGrid} />
      </div>
      <div className={styles.body}>
        <header className={styles.head}>
          <span className={styles.sku}>SKU · {sku}</span>
          {fitment ? <span className={styles.fitment}>{fitment}</span> : null}
        </header>
        <h3 className={styles.title}>{title}</h3>
        <dl className={styles.metaRow}>
          <div>
            <dt>Supplier</dt>
            <dd>{supplier}</dd>
          </div>
          <div>
            <dt>Stock</dt>
            <dd
              className={inStock ? styles.stockIn : styles.stockOut}
            >
              {inStock
                ? typeof stockCount === "number"
                  ? `${stockCount} on hand`
                  : "In stock"
                : "Back-order"}
            </dd>
          </div>
        </dl>
      </div>
      <div className={styles.aside}>
        <div className={styles.priceBlock}>
          <span className={styles.priceLabel}>{ariaPriceLabel ?? "Price"}</span>
          <strong className={styles.price}>{price}</strong>
        </div>
        {href ? (
          <a href={href} className={styles.cta}>
            {ctaLabel}
            <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  )
}

export default SearchResultProduct
