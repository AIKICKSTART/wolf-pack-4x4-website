import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./customer-portal.module.css"

export const metadata: Metadata = {
  title: "Customer portal | UI Primitives",
  description:
    "Customer-facing portal primitives for Oak Flats Mufflermen — booking wizard, quote viewer, invoice pay, garage, service history, loyalty card, doc downloads, referral, NPS feedback, addresses, notification prefs, account summary, appointments and the workshop chat.",
}

interface PortalPrimitiveScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<PortalPrimitiveScene> = [
  {
    kicker: "Primitive 01",
    title: "Booking wizard",
    body: "Four-step wizard — pick service, pick vehicle, pick date, confirm. SMS reminders auto-fire on confirm.",
    href: "/ui-primitives/customer-portal/booking-wizard",
    accent: "amber",
    glyph: "▸",
    state: "Stateful · step",
  },
  {
    kicker: "Primitive 02",
    title: "Quote viewer",
    body: "Itemised quote with parts/labour/fees, GST math, accept or decline buttons, PDF download.",
    href: "/ui-primitives/customer-portal/quote-viewer",
    accent: "amber",
    glyph: "$",
    state: "Stateful · decide",
  },
  {
    kicker: "Primitive 03",
    title: "Invoice pay card",
    body: "Outstanding invoice with Apple Pay, Google Pay, card and bank transfer selector — Stripe-wired copy.",
    href: "/ui-primitives/customer-portal/invoice-pay-card",
    accent: "green",
    glyph: "₿",
    state: "Stateful · pay",
  },
  {
    kicker: "Primitive 04",
    title: "Vehicle garage grid",
    body: "Saved-vehicles grid — rego, body colour, last service, next service due, roadworthy, recall flag.",
    href: "/ui-primitives/customer-portal/vehicle-garage-grid",
    accent: "teal",
    glyph: "▦",
    state: "Stateful · select",
  },
  {
    kicker: "Primitive 05",
    title: "Service history timeline",
    body: "Chronological service ledger — each entry with tech, kms, invoice and a PDF download.",
    href: "/ui-primitives/customer-portal/service-history-timeline",
    accent: "violet",
    glyph: "│",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Loyalty card",
    body: "Customer-side stamp card — current/total stamps, tier chip, progress bar, next reward.",
    href: "/ui-primitives/customer-portal/loyalty-card",
    accent: "amber",
    glyph: "★",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Doc download row",
    body: "Single document row — receipt, pink-slip, dyno chart, warranty, manual — size + page count.",
    href: "/ui-primitives/customer-portal/doc-download-row",
    accent: "violet",
    glyph: "↓",
    state: "Stateful · click",
  },
  {
    kicker: "Primitive 08",
    title: "Referral share card",
    body: "Refer-a-mate program with copyable code + URL, stats and most-recent activity ledger.",
    href: "/ui-primitives/customer-portal/referral-share-card",
    accent: "red",
    glyph: "→",
    state: "Stateful · copy",
  },
  {
    kicker: "Primitive 09",
    title: "Feedback prompt",
    body: "Post-service NPS prompt — 5-star rating + free-text — submits to a thank-you state.",
    href: "/ui-primitives/customer-portal/feedback-prompt",
    accent: "amber",
    glyph: "★",
    state: "Stateful · rate",
  },
  {
    kicker: "Primitive 10",
    title: "Address book row",
    body: "Saved address row — use chip (service / billing / delivery), default flag, edit + remove.",
    href: "/ui-primitives/customer-portal/address-book-row",
    accent: "teal",
    glyph: "○",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Notification preferences",
    body: "Topic × channel matrix — SMS, email, push toggles. Quiet hours footer.",
    href: "/ui-primitives/customer-portal/notification-pref-panel",
    accent: "teal",
    glyph: "▤",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 12",
    title: "Account summary tile",
    body: "Header tile — avatar, member-since, loyalty tier, vehicle count, next reward progress.",
    href: "/ui-primitives/customer-portal/account-summary-tile",
    accent: "amber",
    glyph: "○",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Appointment card",
    body: "Upcoming booking card — date stamp, bay, tech, duration, reschedule + cancel buttons.",
    href: "/ui-primitives/customer-portal/appointment-card",
    accent: "teal",
    glyph: "◧",
    state: "Stateful · act",
  },
  {
    kicker: "Primitive 14",
    title: "Chat with workshop",
    body: "Customer-side message thread to the workshop — Hermes branded, Brad replies inline.",
    href: "/ui-primitives/customer-portal/chat-with-workshop",
    accent: "red",
    glyph: "”",
    state: "Stateful · type",
  },
  {
    kicker: "Composition",
    title: "Full portal",
    body: "Live customer dashboard — all 14 portal primitives composed into the mufflermen.com.au surface.",
    href: "/ui-primitives/customer-portal/full-portal",
    accent: "red",
    glyph: "▦",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<PortalPrimitiveScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
  neutral: styles.accentNeutral,
}

export default function CustomerPortalIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Customer portal / 14 primitives + composition"
        title="Customer portal primitives"
        description="Customer-facing self-serve family for Oak Flats Mufflermen — what Mick sees on mufflermen.com.au after he logs in. Booking, quotes, invoices, garage, service history, loyalty, documents, referral, NPS feedback, addresses, notification preferences, account summary, appointments and the workshop chat thread. Visual references only — no real customer data wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer portal" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — customer portal is not wired
      </span>

      <section className={styles.grid} aria-label="Customer portal primitives">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <span className={styles.thumbGlyph}>{scene.glyph}</span>
            </div>
            <header>
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
