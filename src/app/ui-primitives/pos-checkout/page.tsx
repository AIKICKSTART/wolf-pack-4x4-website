import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./pos-checkout.module.css"

export const metadata: Metadata = {
  title: "POS checkout | UI Primitives",
  description:
    "Fourteen reusable point-of-sale primitives for the Oak Flats Mufflermen Bay 1 counter — cart panel, barcode scanner, Tyro EFTPOS prompt, split tender, receipt printer queue, refund flow, customer lookup, discount picker, GST tax tile, quick product grid, void with manager PIN, daily drawer tally, accepted payment strip, and A6 receipt preview.",
}

interface Block {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  state: string
}

const BLOCKS: ReadonlyArray<Block> = [
  {
    kicker: "Primitive 01",
    title: "Cart panel",
    body: "Running register with line items, +/- qty steppers and swipe-to-remove. Inc/ex GST totals printed live with tabular-nums.",
    href: "/ui-primitives/pos-checkout/cart-panel",
    accent: "amber",
    state: "Cart",
  },
  {
    kicker: "Primitive 02",
    title: "Barcode scanner",
    body: "Bay 1 camera viewport with scanline + manual SKU fallback. Idle / active / error states + recent-scan tail.",
    href: "/ui-primitives/pos-checkout/barcode-scanner-card",
    accent: "teal",
    state: "Scan",
  },
  {
    kicker: "Primitive 03",
    title: "EFTPOS terminal",
    body: "Tyro / Square / Stripe prompt — waiting / approved / declined / offline states with indeterminate progress.",
    href: "/ui-primitives/pos-checkout/eftpos-terminal-panel",
    accent: "green",
    state: "Tender",
  },
  {
    kicker: "Primitive 04",
    title: "Split tender",
    body: "Cash $X + card $Y + voucher $Z editor with tendered vs total ProgressLinear and change-due summary.",
    href: "/ui-primitives/pos-checkout/split-tender-card",
    accent: "amber",
    state: "Split",
  },
  {
    kicker: "Primitive 05",
    title: "Receipt printer row",
    body: "Print queue row — queued / printing / printed / failed with reprint CTA enabled on resolved states.",
    href: "/ui-primitives/pos-checkout/receipt-printer-row",
    accent: "teal",
    state: "Print",
  },
  {
    kicker: "Primitive 06",
    title: "Refund flow",
    body: "Four-step refund stepper — select items, reason, method, confirm. Disabled forward when prerequisite missing.",
    href: "/ui-primitives/pos-checkout/refund-flow-card",
    accent: "red",
    state: "Refund",
  },
  {
    kicker: "Primitive 07",
    title: "Customer lookup",
    body: "Phone / email / rego search with loyalty-tier badge, lifetime spend and attach-to-sale CTA.",
    href: "/ui-primitives/pos-checkout/customer-lookup-card",
    accent: "amber",
    state: "Lookup",
  },
  {
    kicker: "Primitive 08",
    title: "Discount picker",
    body: "Percent / dollar / coupon kinds with required reason chip and live final-total preview.",
    href: "/ui-primitives/pos-checkout/discount-picker",
    accent: "teal",
    state: "Discount",
  },
  {
    kicker: "Primitive 09",
    title: "Tax summary tile",
    body: "GST inc / ex / 1A breakdown with ABN capture and trading-name field for trade tax invoices.",
    href: "/ui-primitives/pos-checkout/tax-summary-tile",
    accent: "green",
    state: "Tax",
  },
  {
    kicker: "Primitive 10",
    title: "Quick product grid",
    body: "Top-seller tile grid for fast adding — oil, washer fluid, wipers, muffler-themed air freshener.",
    href: "/ui-primitives/pos-checkout/quick-product-grid",
    accent: "teal",
    state: "Grid",
  },
  {
    kicker: "Primitive 11",
    title: "Void action",
    body: "Manager-approval void with PIN keypad, dot indicators and error tone-coding on incorrect PIN.",
    href: "/ui-primitives/pos-checkout/void-action-card",
    accent: "red",
    state: "Void",
  },
  {
    kicker: "Primitive 12",
    title: "Daily tally",
    body: "Open / close cash drawer with declared vs system delta, denomination-by-denomination counting.",
    href: "/ui-primitives/pos-checkout/daily-tally-panel",
    accent: "green",
    state: "Drawer",
  },
  {
    kicker: "Primitive 13",
    title: "Payment icon strip",
    body: "Accepted methods strip — Visa / Mastercard / Amex / Apple Pay / Google Pay / EFTPOS with disabled-method support.",
    href: "/ui-primitives/pos-checkout/payment-icon-strip",
    accent: "amber",
    state: "Strip",
  },
  {
    kicker: "Primitive 14",
    title: "Receipt preview",
    body: "A6-ish thermal receipt preview with OFM logo, line items, GST footer and pseudo-random barcode glyph.",
    href: "/ui-primitives/pos-checkout/receipt-preview-card",
    accent: "amber",
    state: "Preview",
  },
  {
    kicker: "Bonus",
    title: "Full register",
    body: "Composes the scanner, cart panel, quick product grid, customer lookup, split tender, EFTPOS prompt, receipt queue, void card and receipt preview into a live Bay 1 register.",
    href: "/ui-primitives/pos-checkout/full-register",
    accent: "red",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<Block["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export default function PosCheckoutIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="POS · checkout pack"
        title="Point-of-sale primitive pack"
        description="Fourteen reusable POS surfaces for the Oak Flats Mufflermen Bay 1 counter — cart, scanner, Tyro EFTPOS, split tender, receipt printer, refund flow, customer lookup, discount picker, tax tile, quick grid, void, drawer tally, accepted brand strip, and A6 receipt preview. Bonus: a full register composition route."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "POS checkout" },
        ]}
      />

      <span className={styles.notice}>
        POS primitives — composed for the Bay 1 counter
      </span>

      <section className={styles.grid} aria-label="POS primitives index">
        {BLOCKS.map((block) => (
          <Link
            key={block.href}
            href={block.href}
            className={[styles.card, ACCENT_CLASS[block.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <div className={styles.thumbInner}>
                <span className={styles.thumbHeadline} />
                <div className={styles.thumbRows}>
                  <span className={styles.thumbRow} />
                  <span className={styles.thumbRow} />
                  <span className={styles.thumbRow} />
                </div>
              </div>
            </div>
            <header className={styles.head}>
              <span className={styles.cardKicker}>{block.kicker}</span>
              <h2 className={styles.cardTitle}>{block.title}</h2>
              <p className={styles.cardBody}>{block.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{block.state}</span>
              <span className={styles.metaAction}>
                Open <span aria-hidden="true">→</span>
              </span>
            </footer>
          </Link>
        ))}
      </section>
    </main>
  )
}
