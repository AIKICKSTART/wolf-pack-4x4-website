import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./product-tours.module.css"

export const metadata: Metadata = {
  title: "Product tours | UI Primitives",
  description:
    "Product-tour, announcement, and in-app-messaging primitives — Appcues/Pendo-style builder canvas, step inspector, audience targeting, trigger conditions, analytics, tooltip composer, announcement card, NPS prompt, tooltip preview overlay, tour library, progress dots, survey prompt, and feature hint spotlight.",
}

interface ProductTourScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<ProductTourScene> = [
  {
    kicker: "Primitive 01",
    title: "Tour builder canvas",
    body: "Visual flow editor — drag-ready nodes with animated dashed connectors and step glyphs.",
    href: "/ui-primitives/product-tours/tour-builder-canvas",
    accent: "teal",
    glyph: "◉─◉",
    state: "Stateful · select",
  },
  {
    kicker: "Primitive 02",
    title: "Step config pane",
    body: "Right inspector — target selector, copy fields, direction/align, skip toggle, delay presets.",
    href: "/ui-primitives/product-tours/step-config-pane",
    accent: "teal",
    glyph: "▤",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 03",
    title: "Tour step thumbnail",
    body: "Step card for the builder list — index, shape glyph, target selector code, delay tag.",
    href: "/ui-primitives/product-tours/tour-step-thumbnail",
    accent: "teal",
    glyph: "▣",
    state: "Stateful · select",
  },
  {
    kicker: "Primitive 04",
    title: "Audience targeting rules",
    body: "Who sees the tour — URL / segment / role / first-time / device chips with match-all toggle.",
    href: "/ui-primitives/product-tours/audience-targeting-rules",
    accent: "violet",
    glyph: "◷",
    state: "Stateful · rules",
  },
  {
    kicker: "Primitive 05",
    title: "Trigger condition",
    body: "When the tour fires — page visit, time delay, scroll depth, element seen, custom event, exit intent.",
    href: "/ui-primitives/product-tours/tour-trigger-condition",
    accent: "amber",
    glyph: "⟁",
    state: "Stateful · kind",
  },
  {
    kicker: "Primitive 06",
    title: "Tour analytics card",
    body: "Starts / completions / drop-off step + completion rate radial gauge and step funnel.",
    href: "/ui-primitives/product-tours/tour-analytics-card",
    accent: "green",
    glyph: "◐",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Inline tooltip builder",
    body: "Tooltip composer — position picker, alignment chips, close-CTA toggle, CTA copy.",
    href: "/ui-primitives/product-tours/inline-tooltip-builder",
    accent: "teal",
    glyph: "◉↘",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 08",
    title: "Announcement card",
    body: "In-app announcement — image + title + body + dismiss + CTA, plus compact bar variant.",
    href: "/ui-primitives/product-tours/announcement-card",
    accent: "amber",
    glyph: "✉",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "NPS prompt trigger",
    body: "NPS configurator — timing rule, segment, question, sampling slider, cool-down presets.",
    href: "/ui-primitives/product-tours/nps-prompt-trigger",
    accent: "green",
    glyph: "0–10",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 10",
    title: "Tooltip preview overlay",
    body: "Preview frame — anchored CoachMark on a sample target with direction + align modifiers.",
    href: "/ui-primitives/product-tours/tooltip-preview-overlay",
    accent: "teal",
    glyph: "◎",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Tour library grid",
    body: "Library — status dot, last-run, engagement chip, recent-completion sparkline per tour.",
    href: "/ui-primitives/product-tours/tour-library-grid",
    accent: "violet",
    glyph: "▥",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Step progress dots",
    body: "End-user progress — dots, bars, or counter variants showing tour position.",
    href: "/ui-primitives/product-tours/step-progress-dots",
    accent: "teal",
    glyph: "● ● ◌",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Survey prompt card",
    body: "One-question embedded survey — multi-choice toggles + send CTA; multi-select supported.",
    href: "/ui-primitives/product-tours/survey-prompt-card",
    accent: "teal",
    glyph: "▢ ▢",
    state: "Stateful · choices",
  },
  {
    kicker: "Primitive 14",
    title: "Feature hint spotlight",
    body: "Larger-than-coach-mark hint — animated halo + 'what's new' badge + CTA.",
    href: "/ui-primitives/product-tours/feature-hint-spotlight",
    accent: "violet",
    glyph: "✨",
    state: "Stateless · motion",
  },
  {
    kicker: "Composition",
    title: "Full tour console",
    body:
      "Composes every primitive — builder canvas, step inspector, audience rules, triggers, analytics, library.",
    href: "/ui-primitives/product-tours/full-console",
    accent: "violet",
    glyph: "◉▣◎",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<ProductTourScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
}

export default function ProductToursIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Product tours / 14 primitives + composition"
        title="Product-tour primitives"
        description="The in-app onboarding stack — Appcues/Pendo-style tour builder, audience and trigger rules, tooltip composer, announcement cards, NPS prompt, survey prompt, library, analytics, end-user progress dots, and feature hint spotlight. Realistic Mufflermen tours teaching the quote-instant-pricing flow, ADR cheatsheet, and bay-availability widget. Distinct from auth onboarding and help-docs tour-controller."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Product tours" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no live in-app messaging wired
      </span>

      <section className={styles.grid} aria-label="Product tours primitives">
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
