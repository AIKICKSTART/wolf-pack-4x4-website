import { Download } from "lucide-react"
import type { Metadata } from "next"

import { OrderSummary, type OrderSummaryItem } from "../../components/commerce/order-summary"
import { ShippingProgress, type ShippingStep } from "../../components/commerce/shipping-progress"
import { PageHeader } from "../../components/page-header"
import styles from "../commerce.module.css"

export const metadata: Metadata = {
  title: "Order confirmed | Commerce | UI Primitives",
  description:
    "Post-order confirmation surface with order summary card, shipping progress, recommended-products row, and invoice download CTA.",
}

const ORDER_ITEMS: ReadonlyArray<OrderSummaryItem> = [
  { id: "1", title: "Manta 2.5\" Cat-Back · VF SS Ute", sku: "MK6010", quantity: 1, unitPrice: 1149.0 },
  { id: "2", title: "Manta 1-3/4\" Headers · VT-VZ LS1", sku: "MK7710", quantity: 1, unitPrice: 689.0 },
  { id: "3", title: "Manta 3\" Resonator", sku: "RS3030SS", quantity: 2, unitPrice: 142.5 },
  { id: "4", title: "Manta Quad Tip · Blue Burnt", sku: "TP90B", quantity: 1, unitPrice: 285.0 },
]

const SHIPPING_STEPS: ReadonlyArray<ShippingStep> = [
  { key: "placed", label: "Placed", description: "Order received", timestamp: "Tue 27 May · 09:14", status: "complete" },
  { key: "picking", label: "Picking", description: "Workshop floor", timestamp: "Tue 27 May · 11:02", status: "complete" },
  { key: "packed", label: "Packed", description: "Crated · 2 boxes", timestamp: "Tue 27 May · 14:48", status: "complete" },
  { key: "dispatched", label: "Dispatched", description: "TOLL IPEC · TQA 8841", timestamp: "Tue 27 May · 16:30", status: "current" },
  { key: "delivered", label: "Delivered", description: "Signature on arrival", status: "upcoming" },
]

const RECOMMENDED: ReadonlyArray<{ id: string; title: string; price: string; glyph: string }> = [
  { id: "r1", title: "Manta 3\" Slip Flange Kit", price: "$64.50", glyph: "FK" },
  { id: "r2", title: "Hi-Flow Cat · 200 cell", price: "$348.00", glyph: "HF" },
  { id: "r3", title: "Heat Wrap · 50 mm × 15 m", price: "$89.00", glyph: "HW" },
  { id: "r4", title: "Diff Bushings · VT-VZ", price: "$124.00", glyph: "DB" },
]

export default function OrderConfirmationPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 03"
        title="Order confirmed"
        description="Order OFM 30418 placed for delivery to Oak Flats NSW. Shipping progress, recommended fitments, and invoice download below."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Commerce", href: "/ui-primitives/commerce" },
          { label: "Order confirmation" },
        ]}
      />

      <div className={styles.confirmGrid}>
        <OrderSummary
          orderNumber="OFM 30418"
          placedAt="Tuesday 27 May, 9:14 am AEST"
          eta="Thursday 29 May · before 5pm"
          customerName="Mick Bartelle"
          shippingAddress={{
            name: "Mick Bartelle",
            line1: "Unit 4 / 12 Yallah Road",
            city: "Oak Flats",
            state: "NSW",
            postcode: "2529",
            country: "Australia",
          }}
          items={ORDER_ITEMS}
          subtotal={2407.5}
          freight={12.95}
          gst={242.05}
          total={2662.5}
        />

        <ShippingProgress steps={SHIPPING_STEPS} orientation="vertical" />
      </div>

      <section className={styles.recommended} aria-labelledby="recommended-title">
        <header className={styles.sectionHeader}>
          <h2 id="recommended-title" className={styles.sectionTitle}>Workshop pairs well with</h2>
          <span className={styles.sectionMeta}>4 picks · same fitment</span>
        </header>
        <div className={styles.recommendedGrid}>
          {RECOMMENDED.map((item) => (
            <article key={item.id} className={styles.recommendCard}>
              <div className={styles.recommendThumb} aria-hidden="true">{item.glyph}</div>
              <h3 className={styles.savedTitle}>{item.title}</h3>
              <span className={styles.savedPrice}>{item.price} AUD</span>
            </article>
          ))}
        </div>
      </section>

      <button type="button" className={styles.invoiceCta}>
        <Download size={14} aria-hidden="true" />
        <span>Download tax invoice (PDF)</span>
      </button>
    </main>
  )
}
