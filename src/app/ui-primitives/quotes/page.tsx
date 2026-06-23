import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"

import styles from "./quotes.module.css"

export const metadata: Metadata = {
  title: "Quotes & proposals | UI Primitives",
  description:
    "Fourteen in-app quote and proposal primitives — line items, bundles, discounts, tax, terms, e-signature, acceptance tracking, counter-offers, proposal cover pages, pricing comparisons, and duplicate detection.",
}

interface QuoteScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  glyph: string
  state: string
  preview: ReadonlyArray<{ label: string; value: string }>
}

const SCENES: ReadonlyArray<QuoteScene> = [
  {
    kicker: "Quote 01",
    title: "Line item",
    body: "Editable quote line — product select, quantity, unit price, discount chip, live line total calc.",
    href: "/ui-primitives/quotes/quote-line-item",
    accent: "amber",
    glyph: "Q · LINE",
    state: "Stateful · edits",
    preview: [
      { label: "Title", value: "Manta DPF-back" },
      { label: "Total", value: "$2,395.00" },
    ],
  },
  {
    kicker: "Quote 02",
    title: "Bundle option",
    body: "Bundled exhaust package — collapsible included-items list, bundle price hero, savings chip.",
    href: "/ui-primitives/quotes/quote-bundle-option",
    accent: "amber",
    glyph: "BUNDLE",
    state: "Stateful · expand",
    preview: [
      { label: "Items", value: "6 included" },
      { label: "Save", value: "$340.00" },
    ],
  },
  {
    kicker: "Quote 03",
    title: "Discount editor",
    body: "Discount picker — percentage / fixed / bulk tier toggle, scope chip, internal reason note.",
    href: "/ui-primitives/quotes/discount-editor",
    accent: "green",
    glyph: "−10%",
    state: "Stateful · editor",
    preview: [
      { label: "Type", value: "Percentage" },
      { label: "Scope", value: "Whole quote" },
    ],
  },
  {
    kicker: "Quote 04",
    title: "Tax calc strip",
    body: "Tax breakdown — subtotal, GST 10% AU, total, and tax-inclusive toggle.",
    href: "/ui-primitives/quotes/tax-calc-strip",
    accent: "teal",
    glyph: "GST 10%",
    state: "Stateful · toggle",
    preview: [
      { label: "GST", value: "$268.50" },
      { label: "Total", value: "$2,953.50" },
    ],
  },
  {
    kicker: "Quote 05",
    title: "Terms editor",
    body: "Rich-text terms — bold / italic / bullet / link toolbar, version chip showing last edit.",
    href: "/ui-primitives/quotes/terms-conditions-editor",
    accent: "teal",
    glyph: "T&C",
    state: "Stateful · editor",
    preview: [
      { label: "Version", value: "v2.1" },
      { label: "Tools", value: "B · I · • · ⌘" },
    ],
  },
  {
    kicker: "Quote 06",
    title: "Send for signature",
    body: "Email send-out — signer details, subject, cover note, and Send CTA.",
    href: "/ui-primitives/quotes/send-for-signature-card",
    accent: "teal",
    glyph: "SEND →",
    state: "Stateful · form",
    preview: [
      { label: "Signer", value: "M. Petrov" },
      { label: "Subject", value: "Quote OFM-2641" },
    ],
  },
  {
    kicker: "Quote 07",
    title: "E-signature pad",
    body: "Sign quote — type / draw / upload tabs, signature preview frame, binding checkbox.",
    href: "/ui-primitives/quotes/e-signature-pad",
    accent: "green",
    glyph: "SIGN",
    state: "Stateful · tabs",
    preview: [
      { label: "Method", value: "Typed" },
      { label: "Binding", value: "Required" },
    ],
  },
  {
    kicker: "Quote 08",
    title: "Acceptance tracker",
    body: "Sent → Opened → Viewed → Accepted timeline with timestamps and reminder CTA.",
    href: "/ui-primitives/quotes/quote-acceptance-tracker",
    accent: "green",
    glyph: "→ ACCEPT",
    state: "Visual only",
    preview: [
      { label: "Stage", value: "Viewed" },
      { label: "Stamp", value: "Thu 12:08" },
    ],
  },
  {
    kicker: "Quote 09",
    title: "Counter-offer",
    body: "Counter-offer card — changed lines, revised total delta, customer note, accept / counter / reject.",
    href: "/ui-primitives/quotes/counter-offer-card",
    accent: "amber",
    glyph: "↔ OFFER",
    state: "Visual only",
    preview: [
      { label: "Delta", value: "−$220.00" },
      { label: "Lines", value: "2 changed" },
    ],
  },
  {
    kicker: "Quote 10",
    title: "Validity countdown",
    body: "Live expiry countdown — tone shifts in last 24h, extend-validity CTA.",
    href: "/ui-primitives/quotes/quote-validity-countdown",
    accent: "teal",
    glyph: "4D 02H",
    state: "Stateful · timer",
    preview: [
      { label: "Expires", value: "11 Jun 2026" },
      { label: "Status", value: "Active" },
    ],
  },
  {
    kicker: "Quote 11",
    title: "Proposal cover",
    body: "Cover page — hero band, project title, client name, proposal date, author, footer.",
    href: "/ui-primitives/quotes/proposal-cover-page",
    accent: "red",
    glyph: "OFM",
    state: "Visual only",
    preview: [
      { label: "Project", value: "Hilux N80" },
      { label: "Author", value: "B. Cassidy" },
    ],
  },
  {
    kicker: "Quote 12",
    title: "Section divider",
    body: "Long-proposal divider — section number, title, subtitle, accent gradient rule.",
    href: "/ui-primitives/quotes/proposal-section-divider",
    accent: "amber",
    glyph: "§ 04",
    state: "Visual only",
    preview: [
      { label: "Number", value: "04" },
      { label: "Title", value: "Scope" },
    ],
  },
  {
    kicker: "Quote 13",
    title: "Pricing comparison",
    body: "In-quote plan comparison — 3 columns, feature checks, recommended badge, select per plan.",
    href: "/ui-primitives/quotes/pricing-comparison-block",
    accent: "amber",
    glyph: "A · B · C",
    state: "Stateful · select",
    preview: [
      { label: "Plans", value: "3 tiers" },
      { label: "Pick", value: "Mid" },
    ],
  },
  {
    kicker: "Quote 14",
    title: "Duplicate banner",
    body: "Duplicate-quote alert — similar quote summary, open existing CTA, create-new override.",
    href: "/ui-primitives/quotes/duplicate-detection-banner",
    accent: "red",
    glyph: "DUP ?",
    state: "Visual only",
    preview: [
      { label: "Match", value: "92%" },
      { label: "Quote", value: "OFM-2638" },
    ],
  },
  {
    kicker: "Quote 15",
    title: "Full quote flow",
    body: "End-to-end composition — cover, sections, line stack, bundle, discount, tax, terms, send.",
    href: "/ui-primitives/quotes/full-quote-flow",
    accent: "red",
    glyph: "FLOW",
    state: "Composition",
    preview: [
      { label: "Primitives", value: "7 in stack" },
      { label: "Total", value: "$2,953.50" },
    ],
  },
]

const ACCENT_CLASS: Record<QuoteScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export default function QuotesIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="19 / Quotes"
        title="Quotes & proposals — authoring + acceptance"
        description="Fourteen reusable in-app primitives for the digital quote authoring and proposal acceptance flow. Line item editing, bundle options, discounts, tax math, terms, e-signature, acceptance tracking, counter-offers, expiry countdowns, proposal cover and section dividers, pricing comparisons, and duplicate detection."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Quotes" },
        ]}
      />

      <span className={styles.notice}>
        In-app authoring + acceptance — distinct from /print-docs/print-quote and /workshop-scenes
      </span>

      <FormPatternReferences
        ids={[
          "quote-request",
          "quote-authoring-signature",
          "billing-payment-tax",
          "contact",
        ]}
      />

      <section className={styles.grid} aria-label="Quotes gallery patterns">
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
