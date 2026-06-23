import type { Metadata } from "next"

import { DemoWorkspaceSwitcher } from "../../components/onboarding"
import { PageHeader } from "../../components/page-header"

import styles from "../onboarding.module.css"

export const metadata: Metadata = {
  title: "Demo workspace switcher | Onboarding",
  description:
    "Primitive 13 — banner that offers to swap the user into a demo workspace with pre-filled data and a return-to-real-data toggle.",
}

export default function DemoWorkspaceScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Demo workspace"
        title="Demo workspace switcher"
        description="A surfaced banner that offers the user a one-tap swap into a pre-filled demo workspace (Oak Flats demo bay) for exploration. Toggle returns them to their real Mufflermen HQ workspace without losing any data. Shows the current workspace name inline so they always know where they are."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Onboarding", href: "/ui-primitives/onboarding" },
          { label: "Demo workspace" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — interact with the toggle</span>
        <DemoWorkspaceSwitcher />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Initial state active — user is in the demo</span>
        <DemoWorkspaceSwitcher
          initialActive
          headline="You're in the Oak Flats demo bay"
          body="Everything you see here is sample data — your real workshop, Mufflermen HQ, is untouched. Flip the switch to head back any time."
        />
      </section>
    </main>
  )
}
