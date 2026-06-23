"use client"

import { useMemo, useState } from "react"

import {
  CartDrawer,
  CouponInputCard,
  FacetedFilterPanel,
  MiniCartBadge,
  OrderSummaryRail,
  ProductListGrid,
  ProductSearchBar,
} from "../../components/storefront"
import type {
  CartTotals,
  CouponApplication,
  FacetGroup,
  StorefrontCartLine,
} from "../../components/storefront"

import {
  CART_LINES_FULL,
  FACET_GROUPS,
  SEARCH_RECENT,
  SEARCH_SUGGESTIONS,
  SEARCH_TRENDING,
  SHIPPING_ESTIMATE,
  SHOWCASE_PRODUCTS,
} from "../_mock-data"
import styles from "../storefront.module.css"

function calculateTotals(lines: ReadonlyArray<StorefrontCartLine>, discount: number): CartTotals {
  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0)
  const freight = subtotal >= 250 ? 0 : 18.5
  const totalBeforeDiscount = subtotal + freight
  const total = Math.max(0, totalBeforeDiscount - discount)
  const gst = +(total / 11).toFixed(2)
  return {
    subtotal,
    freight,
    gst,
    discount: discount > 0 ? discount : undefined,
    total,
  }
}

export function FullShopScene() {
  const [cartOpen, setCartOpen] = useState<boolean>(false)
  const [lines, setLines] = useState<ReadonlyArray<StorefrontCartLine>>(CART_LINES_FULL)
  const [coupons, setCoupons] = useState<ReadonlyArray<CouponApplication>>([])
  const [filters, setFilters] = useState<FacetGroup[]>(() =>
    FACET_GROUPS.map((g) => ({
      ...g,
      options: g.options?.map((o) => ({ ...o })),
      rangeValue: g.rangeValue ? ([g.rangeValue[0], g.rangeValue[1]] as [number, number]) : undefined,
    })),
  )

  const totals = useMemo(() => {
    const discount = coupons.reduce((sum, c) => sum + c.discount, 0)
    return calculateTotals(lines, discount)
  }, [lines, coupons])

  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0)

  const formattedTotal = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
  }).format(totals.total)

  const handleAddToCart = (id: string, quantity: number) => {
    const product = SHOWCASE_PRODUCTS.find((p) => p.id === id)
    if (!product) {
      return
    }
    setLines((prev) => {
      const existing = prev.find((line) => line.id === id)
      if (existing) {
        return prev.map((line) =>
          line.id === id ? { ...line, quantity: line.quantity + quantity } : line,
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          sku: product.sku,
          brand: product.brand,
          title: product.title,
          unitPrice: product.price,
          quantity,
          stock: product.stock,
          thumbnailGlyph: product.sku.slice(0, 3),
        },
      ]
    })
    setCartOpen(true)
  }

  const handleQuantityChange = (id: string, quantity: number) => {
    setLines((prev) =>
      prev.map((line) => (line.id === id ? { ...line, quantity } : line)),
    )
  }

  const handleRemove = (id: string) => {
    setLines((prev) => prev.filter((line) => line.id !== id))
  }

  const applyCoupon = (code: string): CouponApplication | null => {
    const upper = code.toUpperCase()
    if (upper === "MUFFLER10") {
      const coupon: CouponApplication = {
        code: upper,
        label: "10% off exhaust hardware",
        discount: 200,
      }
      setCoupons((prev) => (prev.find((c) => c.code === upper) ? prev : [...prev, coupon]))
      return coupon
    }
    if (upper === "TRADE15") {
      const coupon: CouponApplication = {
        code: upper,
        label: "Trade · 15% off extractors",
        discount: 133.5,
        autoApplied: false,
      }
      setCoupons((prev) => (prev.find((c) => c.code === upper) ? prev : [...prev, coupon]))
      return coupon
    }
    return null
  }

  const removeCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((coupon) => coupon.code !== code))
  }

  const toggleFacet = (groupKey: string, optionId: string) => {
    setFilters((prev) =>
      prev.map((group) => {
        if (group.key !== groupKey || !group.options) {
          return group
        }
        return {
          ...group,
          options: group.options.map((option) =>
            option.id === optionId ? { ...option, selected: !option.selected } : option,
          ),
        }
      }),
    )
  }

  const resetFilters = () => {
    setFilters(
      FACET_GROUPS.map((g) => ({
        ...g,
        options: g.options?.map((o) => ({ ...o, selected: false })),
        rangeValue: g.rangeValue ? ([g.rangeValue[0], g.rangeValue[1]] as [number, number]) : undefined,
      })),
    )
  }

  const updateRange = (groupKey: string, value: [number, number]) => {
    setFilters((prev) =>
      prev.map((group) => (group.key === groupKey ? { ...group, rangeValue: value } : group)),
    )
  }

  return (
    <div className={styles.shopLayout}>
      <FacetedFilterPanel
        groups={filters}
        resultCount={SHOWCASE_PRODUCTS.length}
        onToggleOption={toggleFacet}
        onRangeChange={updateRange}
        onClear={resetFilters}
      />

      <div className={styles.shopMain}>
        <header className={styles.shopHeader}>
          <span className={styles.stageCaption}>
            {SHOWCASE_PRODUCTS.length} parts · Oak Flats Mufflermen
          </span>
          <MiniCartBadge count={itemCount} totalLabel={formattedTotal} onOpen={() => setCartOpen(true)} />
        </header>
        <ProductSearchBar
          suggestions={SEARCH_SUGGESTIONS}
          trending={SEARCH_TRENDING}
          recent={SEARCH_RECENT}
        />
        <ProductListGrid products={SHOWCASE_PRODUCTS} onAddToCart={handleAddToCart} />
      </div>

      <div className={styles.shopMain}>
        <OrderSummaryRail
          lines={lines}
          totals={totals}
          couponCode={coupons[0]?.code}
          shippingService={SHIPPING_ESTIMATE.carrier}
          freightEtaLabel={SHIPPING_ESTIMATE.etaLabel}
        />
        <CouponInputCard
          applied={coupons}
          suggestion={{ code: "MUFFLER10", label: "10% off exhaust hardware" }}
          onApply={applyCoupon}
          onRemove={removeCoupon}
        />
      </div>

      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        lines={lines}
        totals={totals}
        estimate={SHIPPING_ESTIMATE}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemove}
      />
    </div>
  )
}

export default FullShopScene
