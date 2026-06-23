import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"

import styles from "./billing.module.css"

export const metadata: Metadata = {
  title: "Billing | UI Primitives",
  description:
    "Stripe-style subscription management primitives for Oak Flats Mufflermen — overview, plan switching, invoicing, payment methods, tax, dunning, usage billing.",
}

interface BillingScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  glyph: string
  state: string
  preview: ReadonlyArray<{ label: string; value: string }>
}

const SCENES: ReadonlyArray<BillingScene> = [
  {
    kicker: "Primitive 01",
    title: "Subscription overview",
    body: "Plan name, status chip, renewal date, amount, and manage CTAs in one summary card.",
    href: "/ui-primitives/billing/subscription-overview",
    accent: "amber",
    glyph: "PLAN",
    state: "Visual only",
    preview: [
      { label: "Plan", value: "Workshop Pro" },
      { label: "Status", value: "Active" },
    ],
  },
  {
    kicker: "Primitive 02",
    title: "Plan switcher",
    body: "Side-by-side plans with current badge, feature matrix, and monthly/annual toggle.",
    href: "/ui-primitives/billing/plan-switcher",
    accent: "red",
    glyph: "M·A",
    state: "Stateful · toggle",
    preview: [
      { label: "Plans", value: "3 tiers" },
      { label: "Cycle", value: "M / A" },
    ],
  },
  {
    kicker: "Primitive 03",
    title: "Invoice viewer",
    body: "Line items table with subtotal, GST 10%, total, status chip, and PDF / mark-paid actions.",
    href: "/ui-primitives/billing/invoice-viewer",
    accent: "teal",
    glyph: "$",
    state: "Visual only",
    preview: [
      { label: "Lines", value: "4" },
      { label: "Status", value: "Open" },
    ],
  },
  {
    kicker: "Primitive 04",
    title: "Payment method update",
    body: "Card form with brand-detection chip, billing address, 3DS preview banner, default toggle.",
    href: "/ui-primitives/billing/payment-method-update",
    accent: "red",
    glyph: "CARD",
    state: "Stateful · form",
    preview: [
      { label: "Brand", value: "Auto" },
      { label: "3DS", value: "Yes" },
    ],
  },
  {
    kicker: "Primitive 05",
    title: "Tax info",
    body: "Country, business name, ABN/TFN with validation chip, reverse-charge VAT toggle.",
    href: "/ui-primitives/billing/tax-info-edit",
    accent: "amber",
    glyph: "ABN",
    state: "Stateful · validate",
    preview: [
      { label: "Country", value: "AU" },
      { label: "ID", value: "ABN 11" },
    ],
  },
  {
    kicker: "Primitive 06",
    title: "ACH mandate",
    body: "BSB + account + bank, mandate agreement text, signature input, revoke action.",
    href: "/ui-primitives/billing/ach-mandate",
    accent: "green",
    glyph: "DDA",
    state: "Stateful · sign",
    preview: [
      { label: "BSB", value: "062-005" },
      { label: "Status", value: "Active" },
    ],
  },
  {
    kicker: "Primitive 07",
    title: "Refund flow",
    body: "Two-step flow — choose invoice, then choose full / partial amount with reason and note.",
    href: "/ui-primitives/billing/refund-flow",
    accent: "red",
    glyph: "↺",
    state: "Stateful · steps",
    preview: [
      { label: "Step", value: "1 of 2" },
      { label: "Type", value: "Full" },
    ],
  },
  {
    kicker: "Primitive 08",
    title: "Credit balance",
    body: "Available credit hero, recent credit ledger, apply-to-invoice CTA.",
    href: "/ui-primitives/billing/credit-balance",
    accent: "green",
    glyph: "$$$",
    state: "Visual only",
    preview: [
      { label: "Available", value: "$184.50" },
      { label: "Entries", value: "4" },
    ],
  },
  {
    kicker: "Primitive 09",
    title: "Promo code redeem",
    body: "Code entry with applied-state chip, benefit chip, expiry date, remove action.",
    href: "/ui-primitives/billing/promo-code",
    accent: "amber",
    glyph: "10%",
    state: "Stateful · apply",
    preview: [
      { label: "Codes", value: "Demo: MUFFLER10" },
      { label: "Off", value: "10%" },
    ],
  },
  {
    kicker: "Primitive 10",
    title: "Dunning notice",
    body: "Past-due alert with stage chip, retry schedule, grace period, pay & update CTAs.",
    href: "/ui-primitives/billing/dunning-notice",
    accent: "red",
    glyph: "!",
    state: "Visual · alert",
    preview: [
      { label: "Stage", value: "Final" },
      { label: "Days", value: "12 past" },
    ],
  },
  {
    kicker: "Primitive 11",
    title: "Usage dashboard",
    body: "Metered features with usage meter, 30-day sparkline trend, projected overage charge.",
    href: "/ui-primitives/billing/usage-dashboard",
    accent: "teal",
    glyph: "Σ",
    state: "Visual only",
    preview: [
      { label: "Metrics", value: "4 tracked" },
      { label: "Overage", value: "$42.18" },
    ],
  },
  {
    kicker: "Primitive 12",
    title: "Proration preview",
    body: "Unused credit, new cycle charge, effective date, and net due — for plan changes.",
    href: "/ui-primitives/billing/proration-preview",
    accent: "teal",
    glyph: "Δ",
    state: "Visual · live",
    preview: [
      { label: "Credit", value: "−$36.00" },
      { label: "Charge", value: "+$129.00" },
    ],
  },
  {
    kicker: "Primitive 13",
    title: "Tax exemption",
    body: "Certificate upload, jurisdiction, expiry, and status chip — pending / active / expired.",
    href: "/ui-primitives/billing/tax-exemption",
    accent: "amber",
    glyph: "GST*",
    state: "Stateful · upload",
    preview: [
      { label: "Region", value: "NSW" },
      { label: "Status", value: "Active" },
    ],
  },
  {
    kicker: "Primitive 14",
    title: "Receipt modal",
    body: "Post-payment confirmation modal with amount, last-4, transaction ID, download / email.",
    href: "/ui-primitives/billing/payment-receipt",
    accent: "green",
    glyph: "✓",
    state: "Stateful · dialog",
    preview: [
      { label: "Amount", value: "$329.00" },
      { label: "Card", value: "Visa 4242" },
    ],
  },
]

const ACCENT_CLASS: Record<BillingScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export default function BillingIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Billing primitives"
        title="Billing — subscription management"
        description="Fourteen Stripe-style billing primitives for the Oak Flats Mufflermen admin and customer-facing surfaces. Subscription summary, plan switching, invoicing, payment methods, ACH mandates, refunds, usage-based billing, dunning, tax exemptions, and receipts."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Billing" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no live Stripe wiring
      </span>

      <FormPatternReferences ids={["billing-payment-tax", "address", "file-upload"]} />

      <Link className={styles.fullCenterCta} href="/ui-primitives/billing/full-center">
        Open full billing center composition <span aria-hidden="true">→</span>
      </Link>

      <section className={styles.grid} aria-label="Billing primitives gallery">
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
