"use client"

import { useMemo, useState } from "react"

import { CartLineItem, type CartLineItemOption } from "../../components/commerce/cart-line-item"
import { CartSummary } from "../../components/commerce/cart-summary"
import { CouponField, type AppliedCoupon } from "../../components/commerce/coupon-field"

import styles from "../commerce.module.css"

interface CartLine {
  id: string
  title: string
  sku: string
  unitPrice: number
  quantity: number
  options: ReadonlyArray<CartLineItemOption>
  thumbnail?: string
}

const INITIAL_LINES: ReadonlyArray<CartLine> = [
  {
    id: "manta-2-5-cat-back-vf-ute",
    title: "Manta 2.5\" Cat-Back · VF SS Ute",
    sku: "MK6010",
    unitPrice: 1149.0,
    quantity: 1,
    options: [
      { label: "Fitment", value: "VF SS 6.0L" },
      { label: "Finish", value: "Aluminised" },
    ],
  },
  {
    id: "manta-headers-ls1-vt-vz",
    title: "Manta 1-3/4\" Headers · VT-VZ LS1",
    sku: "MK7710",
    unitPrice: 689.0,
    quantity: 1,
    options: [
      { label: "Bore", value: "1-3/4\"" },
      { label: "Material", value: "409 Stainless" },
    ],
  },
  {
    id: "manta-resonator-3in-stainless",
    title: "Manta 3\" Straight-Through Resonator",
    sku: "RS3030SS",
    unitPrice: 142.5,
    quantity: 2,
    options: [
      { label: "Inlet", value: "3\" V-band" },
      { label: "Length", value: "450 mm" },
    ],
  },
  {
    id: "manta-vband-clamp-3in",
    title: "Manta V-Band Clamp · 3\" Stainless",
    sku: "VB3030",
    unitPrice: 38.95,
    quantity: 4,
    options: [
      { label: "Material", value: "304 SS" },
    ],
  },
  {
    id: "manta-tip-quad-90mm-blue",
    title: "Manta Quad Tip · 90 mm Blue Burnt",
    sku: "TP90B",
    unitPrice: 285.0,
    quantity: 1,
    options: [
      { label: "Finish", value: "Blue Burnt" },
      { label: "Outlet", value: "4 × 90 mm" },
    ],
  },
]

const SAVED_FOR_LATER: ReadonlyArray<{ id: string; title: string; sku: string; price: number; glyph: string }> = [
  {
    id: "saved-manta-3in-flange",
    title: "Manta 3\" Slip Flange Kit",
    sku: "FK3030",
    price: 64.5,
    glyph: "FK",
  },
  {
    id: "saved-manta-hi-flow-cat",
    title: "Hi-Flow Cat 3\" · 200 cell",
    sku: "HF3200",
    price: 348.0,
    glyph: "HF",
  },
  {
    id: "saved-manta-decat-pipe-vt",
    title: "VT Decat Pipe Pair",
    sku: "DC0212",
    price: 219.0,
    glyph: "DC",
  },
  {
    id: "saved-manta-heat-wrap-50mm",
    title: "Heat Wrap · 50 mm × 15 m",
    sku: "HW5015",
    price: 89.0,
    glyph: "HW",
  },
]

const FREIGHT = 0
const GST_RATE = 0.1

export function CartScene() {
  const [lines, setLines] = useState<ReadonlyArray<CartLine>>(INITIAL_LINES)
  const [coupon, setCoupon] = useState<AppliedCoupon | undefined>(undefined)
  const [couponError, setCouponError] = useState<string | undefined>(undefined)

  const subtotal = useMemo(
    () => lines.reduce((acc, line) => acc + line.unitPrice * line.quantity, 0),
    [lines],
  )
  const discount = coupon?.discount ?? 0
  const taxable = Math.max(0, subtotal - discount + FREIGHT)
  const gst = taxable * GST_RATE
  const total = taxable + gst

  const handleQuantityChange = (id: string, quantity: number) => {
    setLines((current) =>
      current.map((line) => (line.id === id ? { ...line, quantity } : line)),
    )
  }

  const handleRemove = (id: string) => {
    setLines((current) => current.filter((line) => line.id !== id))
  }

  const handleCouponApply = (code: string) => {
    setCouponError(undefined)
    if (code === "MUFFLER10") {
      setCoupon({
        code,
        description: "10% off exhaust hardware",
        discount: subtotal * 0.1,
      })
      return
    }
    if (code === "VTVZ50") {
      setCoupon({
        code,
        description: "$50 off VT-VZ headers",
        discount: 50,
      })
      return
    }
    setCouponError("Code not recognised.")
  }

  return (
    <div className={styles.cartLayout}>
      <div>
        <div className={styles.cartList}>
          {lines.map((line) => (
            <CartLineItem
              key={line.id}
              id={line.id}
              title={line.title}
              sku={line.sku}
              unitPrice={line.unitPrice}
              quantity={line.quantity}
              options={line.options}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          ))}
        </div>

        <section className={styles.cartSavedRail} aria-labelledby="cart-saved-title">
          <header className={styles.cartSavedHead}>
            <h2 id="cart-saved-title" className={styles.cartSavedTitle}>Saved for later</h2>
            <span className={styles.cartSavedHint}>{SAVED_FOR_LATER.length} items</span>
          </header>
          <div className={styles.cartSavedGrid}>
            {SAVED_FOR_LATER.map((item) => (
              <article key={item.id} className={styles.savedTile}>
                <div className={styles.savedThumb} aria-hidden="true">{item.glyph}</div>
                <h3 className={styles.savedTitle}>{item.title}</h3>
                <span className={styles.savedPrice}>
                  ${item.price.toFixed(2)} AUD · SKU {item.sku}
                </span>
              </article>
            ))}
          </div>
        </section>
      </div>

      <CartSummary
        subtotal={subtotal}
        freight={FREIGHT}
        gst={gst}
        total={total}
        discount={discount > 0 ? discount : undefined}
        discountSlot={
          <CouponField
            applied={coupon}
            onApply={handleCouponApply}
            onRemove={() => {
              setCoupon(undefined)
              setCouponError(undefined)
            }}
            error={couponError}
          />
        }
        checkoutLabel="Proceed to checkout"
      />
    </div>
  )
}
