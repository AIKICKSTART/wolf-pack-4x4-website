import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"

import styles from "./commerce.module.css"

export const metadata: Metadata = {
  title: "Commerce | UI Primitives",
  description:
    "Reference library of every commerce primitive shipped from the Oak Flats Mufflermen workshop — cart, checkout, shipping, pricing, wallet, gift cards.",
}

interface CommerceScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  glyph: string
  state: string
  preview: ReadonlyArray<{ label: string; value: string }>
}

const SCENES: ReadonlyArray<CommerceScene> = [
  {
    kicker: "Scene 01",
    title: "Cart",
    body: "Live cart scene — five exhaust system rows, quantity steppers, summary aside, save-for-later tray.",
    href: "/ui-primitives/commerce/cart",
    accent: "red",
    glyph: "$",
    state: "Stateful · quantity",
    preview: [
      { label: "Items", value: "5 lines" },
      { label: "Total", value: "$2,341.40" },
    ],
  },
  {
    kicker: "Scene 02",
    title: "Checkout",
    body: "Horizontal stepper with address recap, payment method row, and order review surface.",
    href: "/ui-primitives/commerce/checkout",
    accent: "amber",
    glyph: "01·02·03·04",
    state: "Stateful · stepper",
    preview: [
      { label: "Step", value: "03 / 04" },
      { label: "Payment", value: "Visa" },
    ],
  },
  {
    kicker: "Scene 03",
    title: "Order confirmation",
    body: "Post-order confirmation, shipping progress, recommended-products row, invoice download CTA.",
    href: "/ui-primitives/commerce/order-confirmation",
    accent: "green",
    glyph: "OK",
    state: "Visual only",
    preview: [
      { label: "Order", value: "OFM 30418" },
      { label: "ETA", value: "Wed 28 May" },
    ],
  },
  {
    kicker: "Scene 04",
    title: "Shipping tracker",
    body: "Standalone tracker — shipping progress, carrier event feed, dispatch map placeholder.",
    href: "/ui-primitives/commerce/shipping-tracker",
    accent: "teal",
    glyph: "→",
    state: "Visual only",
    preview: [
      { label: "Stage", value: "Dispatched" },
      { label: "Carrier", value: "TOLL" },
    ],
  },
  {
    kicker: "Scene 05",
    title: "Pricing",
    body: "Workshop subscription tiers — monthly / annual / lifetime toggle, three feature-matched tier cards.",
    href: "/ui-primitives/commerce/pricing",
    accent: "amber",
    glyph: "M · A · L",
    state: "Stateful · toggle",
    preview: [
      { label: "Cycle", value: "Annual" },
      { label: "Save", value: "−25%" },
    ],
  },
  {
    kicker: "Scene 06",
    title: "Gift card",
    body: "Gift card redeem hero with segmented code input, balance reveal, and recent redemptions list.",
    href: "/ui-primitives/commerce/gift-card",
    accent: "amber",
    glyph: "GIFT",
    state: "Stateful · paste",
    preview: [
      { label: "Code", value: "4 × 4" },
      { label: "Reveal", value: "Spring" },
    ],
  },
  {
    kicker: "Scene 07",
    title: "Wallet",
    body: "Customer wallet — credit balance hero, multi-currency rows, top-up CTA, payout options.",
    href: "/ui-primitives/commerce/wallet",
    accent: "green",
    glyph: "$$",
    state: "Visual only",
    preview: [
      { label: "Balance", value: "$340.00" },
      { label: "Rows", value: "5" },
    ],
  },
  {
    kicker: "Scene 08",
    title: "Payments",
    body: "Saved payment methods — Visa, Mastercard, Amex, PayPal, Afterpay tiles + add-method CTA.",
    href: "/ui-primitives/commerce/payments",
    accent: "teal",
    glyph: "VISA",
    state: "Visual only",
    preview: [
      { label: "Cards", value: "4 saved" },
      { label: "Default", value: "Visa 4242" },
    ],
  },
]

const ACCENT_CLASS: Record<CommerceScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export default function CommerceIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="18 / Commerce"
        title="Commerce — checkout, payments, shipping"
        description="Eight commerce scenes used across the Oak Flats workshop site. Cart, checkout, order confirmation, shipping tracker, pricing, gift cards, wallet, and saved payment methods — built from twelve focused commerce primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Commerce" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real transactions wired
      </span>

      <FormPatternReferences
        ids={["commerce-checkout", "billing-payment-tax", "address"]}
      />

      <section className={styles.grid} aria-label="Commerce gallery patterns">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <div className={styles.thumbInner}>
                <span className={styles.thumbGlyph}>{scene.glyph}</span>
                {scene.preview.map((row) => (
                  <span key={row.label} className={styles.thumbField}>
                    <span>{row.label}</span>
                    <span>{row.value}</span>
                  </span>
                ))}
              </div>
            </div>
            <header className={styles.head}>
              <span className={styles.cardKicker}>{scene.kicker}</span>
              <h2 className={styles.cardTitle}>{scene.title}</h2>
              <p className={styles.cardBody}>{scene.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{scene.state}</span>
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
