import type { Metadata } from "next"

import { SetupChecklist } from "../../components/onboarding"
import { PageHeader } from "../../components/page-header"

import styles from "../onboarding.module.css"

export const metadata: Metadata = {
  title: "Setup checklist | Onboarding",
  description:
    "Primitive 02 — vertical workshop setup checklist with circular check-state, progress bar, expandable detail and complete-now CTA per step.",
}

export default function SetupChecklistScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Setup checklist"
        title="Setup checklist"
        description="A vertical setup checklist with per-step status circles (todo / in-progress with spinner / done with tick), a percentage progress bar across the top, optional expanded detail copy, and an inline Complete-now CTA on the expanded step."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Onboarding", href: "/ui-primitives/onboarding" },
          { label: "Setup checklist" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — 5 step Oak Flats workshop setup</span>
        <SetupChecklist
          kicker="Workshop setup"
          title="Get Oak Flats workshop live"
          steps={[
            {
              id: "workshop",
              title: "Configure workshop profile",
              description: "Bay layout, opening hours, NSW ABN 41 102 568 779.",
              status: "done",
              duration: "3 min",
            },
            {
              id: "parts",
              title: "Import parts catalogue",
              description: "Mufflers, midpipes, ADR-compliant cats, hardware.",
              status: "done",
              duration: "5 min",
            },
            {
              id: "stripe",
              title: "Connect Stripe payouts",
              description: "Accept card + Apple Pay at the front desk.",
              status: "in-progress",
              duration: "4 min",
              href: "/ui-primitives/onboarding/connect-integration",
              expanded: true,
              details:
                "We've created your Stripe account. You'll need to provide bank details and confirm your driver licence to activate payouts to the Mufflermen trust.",
            },
            {
              id: "team",
              title: "Invite the crew",
              description: "Bay leads, parts receivers, front desk.",
              status: "todo",
              duration: "2 min",
              href: "/ui-primitives/onboarding/empty-team-prompt",
            },
            {
              id: "first-job",
              title: "Book your first job",
              description: "Rego, vehicle, ADR notes, scheduled bay.",
              status: "todo",
              duration: "6 min",
              href: "/ui-primitives/onboarding/first-actions",
            },
          ]}
        />
      </section>
    </main>
  )
}
