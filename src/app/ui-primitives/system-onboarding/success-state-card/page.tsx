import type { Metadata } from "next"

import { SuccessStateCard } from "../../components/system-onboarding"
import { PageHeader } from "../../components/page-header"

import { SUCCESS_NEXT_STEPS, SUCCESS_STATS } from "../_mock-data"
import styles from "../system-onboarding.module.css"

export const metadata: Metadata = {
  title: "Success state | System onboarding",
  description:
    "Primitive 12 — onboarding-complete confetti card. Three states: full success with stats, minimal success without stats, and a tenant-specific success for Illawarra TB.",
}

export default function SuccessStateCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Onboarding / Complete"
        title="Success state card"
        description="Renders right after the first deploy lands — confetti, medal, success copy, three-up stats and recommended next steps. Primary CTA opens the workshop dashboard."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System onboarding", href: "/ui-primitives/system-onboarding" },
          { label: "Success state" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 1 · Full success — stats + next steps</span>
        <SuccessStateCard
          kicker="Onboarding · Complete"
          headline="Illawarra TB is live."
          body="Quotes go out branded as your workshop, your phone forwards to Hermes after-hours, and your first bay booking is on the schedule for tomorrow at 09:00."
          stats={SUCCESS_STATS}
          nextSteps={SUCCESS_NEXT_STEPS}
          primaryCtaHref="#dashboard"
          secondaryCtaHref="/ui-primitives/system-onboarding/team-invite-panel"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 2 · Minimal — no stats, single next step</span>
        <SuccessStateCard
          kicker="Trial · Live"
          headline="You're live."
          body="Setup is done. We've parked Hermes alongside you for the first week — keep an eye on the inbox for the daily nudge."
          nextSteps={[SUCCESS_NEXT_STEPS[0]]}
          primaryCtaHref="#dashboard"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 3 · Tenant-specific — Illawarra TB launch summary</span>
        <SuccessStateCard
          kicker="Launch · v1.0.0"
          headline="Welcome to Mufflermen Pro, Sarah."
          body="14 minutes flat. The crew (Jake, Dean and Mia) have invites in their inboxes. Stripe AU and Twilio AU are wired. The first job is booked for tomorrow morning."
          stats={[
            { label: "First job", value: "09:00 tomorrow" },
            { label: "Crew", value: "3 / 3" },
            { label: "Bays online", value: "5 / 5" },
          ]}
          nextSteps={SUCCESS_NEXT_STEPS}
          primaryCtaLabel="Open Illawarra TB dashboard"
          primaryCtaHref="#dashboard"
        />
      </section>
    </main>
  )
}
