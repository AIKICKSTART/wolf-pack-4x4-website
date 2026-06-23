import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./onboarding.module.css"

export const metadata: Metadata = {
  title: "Onboarding | UI Primitives",
  description:
    "Product onboarding primitives — welcome modal, setup checklist, first-action grid, sample-data banner, tour invitation, milestone tracker, feature highlight, achievement-unlock toast, integration step, profile completion meter, empty team prompt, onboarding email reminder, demo workspace switcher, and a compositional get-started template.",
}

interface OnboardingScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<OnboardingScene> = [
  {
    kicker: "Primitive 01",
    title: "Welcome modal",
    body: "First-login welcome modal with garage-door SVG illustration, three next-step CTAs, and a skip link.",
    href: "/ui-primitives/onboarding/welcome",
    accent: "red",
    glyph: "✦",
    state: "Stateful · open",
  },
  {
    kicker: "Primitive 02",
    title: "Setup checklist",
    body: "Vertical workshop-setup checklist with circular check-state, progress bar, expandable details, complete-now CTAs.",
    href: "/ui-primitives/onboarding/setup-checklist",
    accent: "amber",
    glyph: "☑",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "First-action grid",
    body: "Grid of first-thing-to-do CTA cards — add a vehicle, schedule a job, invite the crew, connect Stripe, ADR settings.",
    href: "/ui-primitives/onboarding/first-actions",
    accent: "red",
    glyph: "▦",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Sample-data banner",
    body: "Amber top banner with inline toggle that swaps between sample data and the live Oak Flats workspace.",
    href: "/ui-primitives/onboarding/sample-data-banner",
    accent: "amber",
    glyph: "⚠",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 05",
    title: "Tour invitation",
    body: "Card inviting the user to take the product tour — thumbnail rail of tour stops, duration chip, start-tour CTA.",
    href: "/ui-primitives/onboarding/tour-invitation",
    accent: "teal",
    glyph: "↝",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Milestone tracker",
    body: "Horizontal tracker of 5 onboarding milestones with progress fill and an animated You-Are-Here marker.",
    href: "/ui-primitives/onboarding/milestone-tracker",
    accent: "red",
    glyph: "◯◉◯",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Feature highlight",
    body: "Card highlighting one new feature — pulsing kicker chip, headline, supporting body, try-it CTA, dismiss chevron.",
    href: "/ui-primitives/onboarding/feature-highlight",
    accent: "amber",
    glyph: "✦",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Achievement-unlock toast",
    body: "Gold-bordered toast with trophy SVG and points chip — triggers a confetti burst on appear.",
    href: "/ui-primitives/onboarding/achievement-unlock",
    accent: "amber",
    glyph: "♔",
    state: "Stateful · timer",
  },
  {
    kicker: "Primitive 09",
    title: "Connect integration",
    body: "Single integration setup step — abstract SVG mark, status chip cycle, Connect / Manage CTA.",
    href: "/ui-primitives/onboarding/connect-integration",
    accent: "teal",
    glyph: "⟷",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Profile completion",
    body: "Profile completion meter — N / M fields filled, percent fill, remaining-field chips, complete-profile CTA.",
    href: "/ui-primitives/onboarding/profile-completion",
    accent: "green",
    glyph: "%",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Empty team prompt",
    body: "Empty-state when no crew exists — friendly SVG, invite-team CTA, import-from-CSV alternative.",
    href: "/ui-primitives/onboarding/empty-team-prompt",
    accent: "neutral",
    glyph: "◌",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Email reminder",
    body: "Inline reminder card showing the next onboarding email — subject, sender, preview, send-time chip.",
    href: "/ui-primitives/onboarding/email-reminder",
    accent: "teal",
    glyph: "✉",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Demo workspace switcher",
    body: "Banner offering to swap into a demo workspace with sample data — toggle returns to real data anytime.",
    href: "/ui-primitives/onboarding/demo-workspace",
    accent: "teal",
    glyph: "★",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 14",
    title: "Get-started template",
    body: "Compositional template wrapping welcome, checklist, first-actions, and milestones into a Getting Started surface.",
    href: "/ui-primitives/onboarding/get-started-template",
    accent: "red",
    glyph: "≣",
    state: "Composition",
  },
  {
    kicker: "Composition",
    title: "Full first-run scene",
    body: "Sample banner + welcome modal + checklist + first-actions + milestones + feature highlight + achievement toast.",
    href: "/ui-primitives/onboarding/full-scene",
    accent: "red",
    glyph: "✦≣☑",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<OnboardingScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
  neutral: styles.accentNeutral,
}

export default function OnboardingIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Onboarding / 14 primitives + composition"
        title="Product onboarding primitives"
        description="Visual primitives for the post-signup activation flow — welcome modal, setup checklist, first-action grid, sample-data banner, tour invitation, milestone tracker, feature highlight, achievement toast, integration steps, profile meter, empty team prompt, email reminder, demo workspace switcher, and a full get-started template. Visual reference only — no real backend wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Onboarding" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real backend wired
      </span>

      <section className={styles.grid} aria-label="Onboarding primitives">
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
