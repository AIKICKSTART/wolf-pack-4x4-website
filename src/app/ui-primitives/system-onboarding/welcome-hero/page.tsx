import type { Metadata } from "next"

import { WelcomeHero } from "../../components/system-onboarding"
import { PageHeader } from "../../components/page-header"

import {
  WELCOME_CTAS,
  WELCOME_OWNER,
  WELCOME_STATS,
} from "../_mock-data"
import styles from "../system-onboarding.module.css"

export const metadata: Metadata = {
  title: "Welcome hero | System onboarding",
  description:
    "Primitive 01 — multi-tenant onboarding welcome card with shop logo placeholder, owner identity and dual CTA. Rendered in three states: fresh tenant, returning tenant, and minimal stat-less variant.",
}

export default function WelcomeHeroScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Welcome hero"
        title="Welcome hero"
        description="A first-render welcome card for a new Mufflermen Pro tenant. Carries the shop logo placeholder, the primary admin (owner Sarah Wallace), a stat row covering bays / trial / setup cost and two CTAs. Rendered for Illawarra Tyres & Brakes (Albion Park, NSW)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System onboarding", href: "/ui-primitives/system-onboarding" },
          { label: "Welcome hero" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 1 · Fresh tenant — Illawarra TB just signed up</span>
        <WelcomeHero
          kicker="Welcome to Mufflermen Pro"
          tenantName="Illawarra Tyres & Brakes"
          headline="G'day Sarah — let's spin up Illawarra TB"
          body="We've got a 6-step path to getting Illawarra Tyres & Brakes booking jobs and taking payments. Roughly 14 minutes if you bring an ABN and a logo. Hermes will keep you on track."
          owner={WELCOME_OWNER}
          stats={WELCOME_STATS}
          ctas={WELCOME_CTAS}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 2 · Returning tenant — picking up where they left off</span>
        <WelcomeHero
          kicker="Welcome back"
          tenantName="Illawarra Tyres & Brakes"
          headline="Welcome back, Sarah"
          body="You're 4 of 6 steps in. Hermes has held your spot — let's wrap up the integrations step and get you live before lunch."
          owner={WELCOME_OWNER}
          stats={[
            { label: "Progress", value: "4 / 6" },
            { label: "Time left", value: "5 min" },
            { label: "Crew invited", value: "3" },
          ]}
          ctas={[
            {
              label: "Resume onboarding",
              intent: "primary",
              href: "/ui-primitives/system-onboarding/checklist-progress-tile",
            },
          ]}
          logoHint="Logo uploaded · illawarra-tyres-brakes-logo.svg"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 3 · Minimal — no stats, single CTA</span>
        <WelcomeHero
          kicker="Trial · Day 1"
          tenantName="Illawarra Tyres & Brakes"
          headline="Welcome aboard."
          body="Let's start by confirming a few details about your workshop. The whole setup takes about a quarter-hour."
          owner={WELCOME_OWNER}
          ctas={[
            {
              label: "Get started",
              intent: "primary",
              href: "/ui-primitives/system-onboarding/account-setup-form",
            },
          ]}
        />
      </section>
    </main>
  )
}
