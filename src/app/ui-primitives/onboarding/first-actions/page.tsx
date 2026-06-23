import type { Metadata } from "next"

import { FirstActionGrid } from "../../components/onboarding"
import { PageHeader } from "../../components/page-header"

import styles from "../onboarding.module.css"

export const metadata: Metadata = {
  title: "First-action grid | Onboarding",
  description:
    "Primitive 03 — grid of first-thing-to-do CTA cards: create workshop, add vehicle, schedule job, invite team, connect Stripe, configure ADR settings.",
}

export default function FirstActionsScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / First actions"
        title="First-action grid"
        description="A grid of CTA cards covering the things a fresh Oak Flats workshop should do first. Each card carries an icon, title, supporting description, optional badge (Recommended / ADR required) and a duration chip in the footer."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Onboarding", href: "/ui-primitives/onboarding" },
          { label: "First actions" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — 6 first-action cards</span>
        <FirstActionGrid
          kicker="First things to do"
          title="Pick somewhere to start"
          cards={[
            {
              id: "workshop",
              title: "Create your first workshop",
              description: "Bay layout, opening hours, postal address.",
              duration: "3 min",
              glyph: "▦",
              href: "#workshop",
              accent: "red",
              badge: "Recommended",
            },
            {
              id: "vehicle",
              title: "Add a vehicle",
              description: "Capture rego, make, model, ADR build date.",
              duration: "1 min",
              glyph: "▤",
              href: "#vehicle",
              accent: "amber",
            },
            {
              id: "job",
              title: "Schedule a job",
              description: "Pick a bay, slot a customer in, set the SLA.",
              duration: "2 min",
              glyph: "◷",
              href: "#job",
              accent: "teal",
            },
            {
              id: "team",
              title: "Invite a team member",
              description: "Bay lead, parts receiver, front desk.",
              duration: "2 min",
              glyph: "✦",
              href: "/ui-primitives/onboarding/empty-team-prompt",
              accent: "green",
            },
            {
              id: "stripe",
              title: "Connect Stripe",
              description: "Card + Apple Pay payouts to the trust.",
              duration: "4 min",
              glyph: "$",
              href: "/ui-primitives/onboarding/connect-integration",
              accent: "amber",
            },
            {
              id: "adr",
              title: "Configure ADR settings",
              description: "Sound-level thresholds and rego compliance.",
              duration: "5 min",
              glyph: "⚙",
              href: "#adr",
              accent: "red",
              badge: "ADR required",
            },
          ]}
        />
      </section>
    </main>
  )
}
