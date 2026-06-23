"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import { CartDrawer } from "../../components/storefront"
import type { StorefrontCartLine } from "../../components/storefront"

import {
  CART_LINES_FULL,
  CART_LINES_LITE,
  CART_TOTALS_FULL,
  CART_TOTALS_LITE,
  SHIPPING_ESTIMATE,
} from "../_mock-data"
import styles from "../storefront.module.css"

interface DemoSurfaceProps {
  initial: ReadonlyArray<StorefrontCartLine>
  totalLabel: string
  withEstimate?: boolean
  triggerLabel: string
  emptyLabel?: string
}

function DemoSurface({ initial, totalLabel, withEstimate, triggerLabel, emptyLabel }: DemoSurfaceProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [lines, setLines] = useState<ReadonlyArray<StorefrontCartLine>>(initial)

  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0)
  const freight = subtotal >= 250 ? 0 : 18.5
  const gst = +(subtotal / 11).toFixed(2)
  const totals = {
    subtotal,
    freight,
    gst,
    total: subtotal + freight,
  }

  return (
    <div className={styles.miniHeader}>
      <span className={styles.stageCaption}>{emptyLabel ?? `Click to open · subtotal ${totalLabel}`}</span>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          padding: "10px 18px",
          borderRadius: "var(--primitive-btn-radius)",
          border: 0,
          background: "var(--primitive-btn-primary-bg)",
          boxShadow: "var(--primitive-btn-primary-shadow)",
          color: "var(--primitive-btn-primary-fg)",
          fontFamily: "var(--primitive-font-mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        {triggerLabel}
      </button>
      <CartDrawer
        open={open}
        onOpenChange={setOpen}
        lines={lines}
        totals={totals}
        estimate={withEstimate ? SHIPPING_ESTIMATE : undefined}
        onQuantityChange={(id, quantity) =>
          setLines((prev) =>
            prev.map((line) => (line.id === id ? { ...line, quantity } : line)),
          )
        }
        onRemove={(id) => setLines((prev) => prev.filter((line) => line.id !== id))}
      />
    </div>
  )
}

export default function CartDrawerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Cart drawer"
        title="Cart drawer"
        description="Slide-out cart with line edit, swipe-to-remove, free-shipping progress, postcode shipping estimate and grand total."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Storefront", href: "/ui-primitives/storefront" },
          { label: "Cart drawer" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · full cart · 3 line items · shipping estimate</span>
        <DemoSurface
          initial={CART_LINES_FULL}
          totalLabel={`$${CART_TOTALS_FULL.total.toFixed(2)}`}
          triggerLabel="Open full cart"
          withEstimate
        />
        <span className={styles.stageCaption}>State 02 · lite cart · single line · below free-ship</span>
        <DemoSurface
          initial={CART_LINES_LITE}
          totalLabel={`$${CART_TOTALS_LITE.total.toFixed(2)}`}
          triggerLabel="Open lite cart"
        />
        <span className={styles.stageCaption}>State 03 · empty drawer</span>
        <DemoSurface initial={[]} totalLabel="$0.00" triggerLabel="Open empty cart" emptyLabel="Empty state demo" />
      </section>
    </main>
  )
}
