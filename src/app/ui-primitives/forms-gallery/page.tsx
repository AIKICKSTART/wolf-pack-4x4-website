import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"

import styles from "./forms-gallery.module.css"

export const metadata: Metadata = {
  title: "Forms Gallery | UI Primitives",
  description:
    "Reference library of every production form pattern shipped from the Oak Flats Mufflermen workshop — contact, booking, intake, quotes, feedback, and more.",
}

interface FormScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  glyph: string
  state: string
  preview: ReadonlyArray<{ label: string; value: string }>
}

const SCENES: ReadonlyArray<FormScene> = [
  {
    kicker: "Pattern 01",
    title: "Contact",
    body: "Workshop contact form — name, email, phone, subject select, message, attachment, consent.",
    href: "/ui-primitives/forms-gallery/contact",
    accent: "amber",
    glyph: "@",
    state: "Visual only",
    preview: [
      { label: "Name", value: "Jordan" },
      { label: "Email", value: "you@…" },
    ],
  },
  {
    kicker: "Pattern 02",
    title: "Booking",
    body: "Bay booking with month-grid date picker, slot chips, drop / wait toggle, and callback option.",
    href: "/ui-primitives/forms-gallery/booking",
    accent: "teal",
    glyph: "📅",
    state: "Stateful · picker",
    preview: [
      { label: "Date", value: "WED 14" },
      { label: "Slot", value: "Midday" },
    ],
  },
  {
    kicker: "Pattern 03",
    title: "Vehicle intake",
    body: "Rego lookup + cascading vehicle selects, fuel radio chips, four-slot photo tray, notes.",
    href: "/ui-primitives/forms-gallery/vehicle-intake",
    accent: "red",
    glyph: "VE",
    state: "Stateful · cascade",
    preview: [
      { label: "Rego", value: "OFM 042" },
      { label: "Fuel", value: "Petrol" },
    ],
  },
  {
    kicker: "Pattern 04",
    title: "Quote request",
    body: "Three-step wizard — vehicle, service multi-select chips, contact + private vs fleet audience.",
    href: "/ui-primitives/forms-gallery/quote-request",
    accent: "amber",
    glyph: "01·02·03",
    state: "Stateful · stepper",
    preview: [
      { label: "Step", value: "02 / 03" },
      { label: "Services", value: "3 on" },
    ],
  },
  {
    kicker: "Pattern 05",
    title: "Feedback",
    body: "Star rating with hover preview, category chips, title + message, anonymity toggle.",
    href: "/ui-primitives/forms-gallery/feedback",
    accent: "amber",
    glyph: "★★★★★",
    state: "Stateful · rating",
    preview: [
      { label: "Rating", value: "4 / 5" },
      { label: "Category", value: "Service" },
    ],
  },
  {
    kicker: "Pattern 06",
    title: "Newsletter",
    body: "Compact inline signup with animated tick success state and follow-on CTA.",
    href: "/ui-primitives/forms-gallery/newsletter",
    accent: "teal",
    glyph: "✉",
    state: "Two-state",
    preview: [
      { label: "Field", value: "Email" },
      { label: "State", value: "Idle" },
    ],
  },
  {
    kicker: "Pattern 07",
    title: "Survey",
    body: "Single-page survey — 1-10 scale, multi-select chips, ranked list, free text, slider.",
    href: "/ui-primitives/forms-gallery/survey",
    accent: "green",
    glyph: "1 → 10",
    state: "Stateful · progress",
    preview: [
      { label: "Score", value: "9 / 10" },
      { label: "Progress", value: "4 / 5" },
    ],
  },
  {
    kicker: "Pattern 08",
    title: "File upload",
    body: "Drag-drop zone, per-file progress, type / size validation chips, remove + total size.",
    href: "/ui-primitives/forms-gallery/file-upload",
    accent: "teal",
    glyph: "↑",
    state: "Stateful · uploads",
    preview: [
      { label: "Queued", value: "3 files" },
      { label: "Size", value: "23.3 MB" },
    ],
  },
  {
    kicker: "Pattern 09",
    title: "Address",
    body: "Country flag select, street autocomplete preview, suburb chip, postcode mask, deliver-to toggle.",
    href: "/ui-primitives/forms-gallery/address",
    accent: "amber",
    glyph: "AU",
    state: "Stateful · expand",
    preview: [
      { label: "Country", value: "AU" },
      { label: "Postcode", value: "2529" },
    ],
  },
  {
    kicker: "Pattern 10",
    title: "Search filter",
    body: "Keyword input with kbd hint, collapsible price / category / vehicle / supplier groups, sort menu.",
    href: "/ui-primitives/forms-gallery/search-filter",
    accent: "teal",
    glyph: "⌘ K",
    state: "Stateful · filters",
    preview: [
      { label: "Sort", value: "Newest" },
      { label: "Groups", value: "4" },
    ],
  },
]

const ACCENT_CLASS: Record<FormScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export default function FormsGalleryIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="17 / Forms gallery"
        title="Forms gallery — production form patterns"
        description="Ten polished form patterns used across the Oak Flats workshop site — contact, booking, intake, quotes, feedback, surveys, uploads, address, and search. These are visual references — no real submissions are wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms gallery" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real form handlers wired
      </span>

      <FormPatternReferences
        ids={[
          "contact",
          "booking",
          "vehicle-intake",
          "quote-request",
          "feedback-review",
          "newsletter",
          "survey-nps",
          "file-upload",
          "address",
          "search-filter",
        ]}
        title="Promoted into the forms atlas"
        description="These gallery scenes are the canonical full-size demos reused by /ui-primitives/forms."
      />

      <section
        className={styles.grid}
        aria-label="Forms gallery patterns"
        data-forms-gallery-shared-dna="true"
      >
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
