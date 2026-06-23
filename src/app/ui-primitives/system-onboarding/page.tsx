import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./system-onboarding.module.css"

export const metadata: Metadata = {
  title: "System onboarding | UI Primitives",
  description:
    "System-onboarding primitives for new Mufflermen tenants — welcome hero, account setup, workshop config, integration wizard, team invites, brand setup, first-deploy gauge, migration import, template picker, checklist progress, mentor chat, success state, skip confirmation modal and an onboarding step rail.",
}

interface Scene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green" | "violet" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<Scene> = [
  {
    kicker: "Primitive 01",
    title: "Welcome hero",
    body:
      "Multi-tenant onboarding welcome card — shop logo placeholder, owner identity, trial / bay / setup-cost stat row and dual CTA.",
    href: "/ui-primitives/system-onboarding/welcome-hero",
    accent: "red",
    glyph: "G'day",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Account setup form",
    body:
      "Wizard step — full name, work email, role, timezone, product-updates opt-in. Validates and surfaces field-level errors.",
    href: "/ui-primitives/system-onboarding/account-setup-form",
    accent: "teal",
    glyph: "①",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 03",
    title: "Workshop config card",
    body:
      "ABN, address, bay count, weekly hours and services-offered chip cloud. Pre-populated for Illawarra TB.",
    href: "/ui-primitives/system-onboarding/workshop-config-card",
    accent: "red",
    glyph: "▣",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 04",
    title: "Integration wizard row",
    body:
      "Per-vendor step row — Stripe / Twilio / Shopify / MYOB — with a vendor mark, region chip, status pill and connect CTA.",
    href: "/ui-primitives/system-onboarding/integration-wizard-row",
    accent: "violet",
    glyph: "⟷",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Team invite panel",
    body:
      "Bulk-invite the crew — pre-seeded rows for Jake, Dean and Mia plus a draft row to add another teammate.",
    href: "/ui-primitives/system-onboarding/team-invite-panel",
    accent: "teal",
    glyph: "👥",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 06",
    title: "Brand setup card",
    body:
      "Logo upload tile, palette swatch picker and typography pairing radio group with live preview.",
    href: "/ui-primitives/system-onboarding/brand-setup-card",
    accent: "amber",
    glyph: "✦",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 07",
    title: "First-deploy tile",
    body:
      "Deploy readiness gauge with environment + target URL meta, a 5-row checklist and a tone-shifting launch CTA.",
    href: "/ui-primitives/system-onboarding/first-deploy-tile",
    accent: "green",
    glyph: "▶",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Migration import card",
    body:
      "Source picker — CSV / Shopify / Square / MYOB / Xero — with counts, progress bar and tone-shifting status chip.",
    href: "/ui-primitives/system-onboarding/migration-import-card",
    accent: "teal",
    glyph: "⇧",
    state: "Stateful · progress",
  },
  {
    kicker: "Primitive 09",
    title: "Template pick grid",
    body:
      "Starter template chooser — Workshop / Parts retailer / Fleet manager — with feature lists and a recommended chip.",
    href: "/ui-primitives/system-onboarding/template-pick-grid",
    accent: "red",
    glyph: "▦",
    state: "Stateful · select",
  },
  {
    kicker: "Primitive 10",
    title: "Checklist progress tile",
    body:
      "% complete, time-to-complete, segmented progress bar and a per-step row with tone-shifting chips.",
    href: "/ui-primitives/system-onboarding/checklist-progress-tile",
    accent: "teal",
    glyph: "▤",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Mentor chat card",
    body:
      "Conversation with Hermes — transcript, typing indicator, suggested next-step chips and a send-message field.",
    href: "/ui-primitives/system-onboarding/mentor-chat-card",
    accent: "teal",
    glyph: "✺",
    state: "Stateful · chat",
  },
  {
    kicker: "Primitive 12",
    title: "Success state card",
    body:
      "Confetti-backed onboarding-complete card with medal, three-up stats, next-step list and primary/ghost CTAs.",
    href: "/ui-primitives/system-onboarding/success-state-card",
    accent: "green",
    glyph: "♔",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Skip confirmation modal",
    body:
      "Modal warning the user what breaks when they skip a step — flagged consequences plus back / remind-later / confirm.",
    href: "/ui-primitives/system-onboarding/skip-confirmation-modal",
    accent: "amber",
    glyph: "⚠",
    state: "Stateful · modal",
  },
  {
    kicker: "Primitive 14",
    title: "Onboarding step rail",
    body:
      "Vertical rail showing every step state — todo / active / done / skipped — with caption + duration per entry.",
    href: "/ui-primitives/system-onboarding/onboarding-step-rail",
    accent: "neutral",
    glyph: "│",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full onboarding flow",
    body:
      "Composed activation flow for Illawarra TB — step rail + welcome + checklist + integration + team + brand + deploy + success.",
    href: "/ui-primitives/system-onboarding/full-onboarding",
    accent: "red",
    glyph: "≣▶",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<Scene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
  violet: styles.accentViolet,
  neutral: styles.accentNeutral,
}

export default function SystemOnboardingIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="System onboarding / 14 primitives + composition"
        title="System-onboarding primitives"
        description="Tenant activation flow for new Mufflermen Pro customers — sample tenant is Illawarra Tyres & Brakes (Albion Park, NSW). Sarah Wallace signs up, configures her workshop, connects Stripe AU + Twilio AU, invites her crew, brands the install and ships her first deploy. Hermes the mentor agent nudges her along the way. Visual reference only — no real backend wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System onboarding" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real backend wired
      </span>

      <section className={styles.grid} aria-label="System onboarding primitives">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            prefetch={false}
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
