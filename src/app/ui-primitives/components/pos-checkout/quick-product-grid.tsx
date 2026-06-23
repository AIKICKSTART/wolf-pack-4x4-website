"use client"

import type { QuickProduct } from "./pos-checkout-types"
import styles from "./quick-product-grid.module.css"

interface QuickProductGridProps {
  /** Header kicker. */
  kicker?: string
  /** Header title. */
  title?: string
  /** Tiles to render. */
  products: ReadonlyArray<QuickProduct>
  /** Fires when a tile is tapped. */
  onSelect?: (sku: string) => void
}

function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function QuickProductGrid({
  kicker = "Top sellers",
  title = "Quick add",
  products,
  onSelect,
}: QuickProductGridProps) {
  return (
    <section className={styles.grid} aria-label="Quick add product grid">
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>{kicker}</span>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <span className={styles.tileMeta}>
          {products.length} tiles
        </span>
      </header>
      <div className={styles.tiles}>
        {products.map((product) => (
          <button
            key={product.sku}
            type="button"
            className={styles.tile}
            onClick={() => onSelect?.(product.sku)}
            aria-label={`Add ${product.title} · ${formatAud(product.price)}`}
          >
            {product.tag && <span className={styles.tag}>{product.tag}</span>}
            <span className={styles.glyph} aria-hidden="true">
              {product.glyph}
            </span>
            <h3 className={styles.tileTitle}>{product.title}</h3>
            <div className={styles.tileMeta}>
              <span>{product.sku}</span>
              <span className={styles.tilePrice}>{formatAud(product.price)}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

export default QuickProductGrid
