import type { Metadata } from "next"

import { ChecklistProgressTile } from "../../components/system-onboarding"
import { PageHeader } from "../../components/page-header"

import {
  CHECKLIST_COMPLETE,
  CHECKLIST_EMPTY,
  CHECKLIST_PARTIAL,
} from "../_mock-data"
import styles from "../system-onboarding.module.css"

export const metadata: Metadata = {
  title: "Checklist progress | System onboarding",
  description:
    "Primitive 10 — onboarding checklist progress tile. Three states: just-started, in-progress (2 of 6 done), and complete.",
}

export default function ChecklistProgressTileScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Onboarding / Progress"
        title="Checklist progress tile"
        description="A compact tile rendering % complete, time-to-complete, a segmented progress bar and the per-step list. Persisted on the customer-success dashboard."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System onboarding", href: "/ui-primitives/system-onboarding" },
          { label: "Checklist progress" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 1 · Just started — first step is active</span>
        <ChecklistProgressTile
          kicker="Onboarding · Progress"
          title="Welcome — let's get you live"
          description="You've signed up — first step is to confirm your admin profile. About 14 minutes of work all up."
          items={CHECKLIST_EMPTY}
          remainingTime="14 min"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 2 · Partial — 2 of 6 done, integrations active</span>
        <ChecklistProgressTile
          kicker="Onboarding · Progress"
          title="You're 2 of 6 steps in"
          description="Workshop profile is locked in. Hermes is mid-connect on Stripe AU — the rest of the steps should take about 9 minutes."
          items={CHECKLIST_PARTIAL}
          remainingTime="9 min"
          resumeHref="/ui-primitives/system-onboarding/integration-wizard-row"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 3 · Complete — all 6 steps done</span>
        <ChecklistProgressTile
          kicker="Onboarding · Complete"
          title="Onboarding complete — Illawarra TB is live"
          description="Every step is locked in. Quotes go out branded as your workshop, your phone forwards to Hermes after-hours and the bay schedule is open for bookings."
          items={CHECKLIST_COMPLETE}
          remainingTime="0 min"
        />
      </section>
    </main>
  )
}
