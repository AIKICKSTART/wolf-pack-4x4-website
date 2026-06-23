import type { Metadata } from "next"

import { SampleDataBanner } from "../../components/onboarding"
import { PageHeader } from "../../components/page-header"

import styles from "../onboarding.module.css"

export const metadata: Metadata = {
  title: "Sample-data banner | Onboarding",
  description:
    "Primitive 04 — amber top banner warning the user they're viewing sample data, with an inline toggle to switch to the live Oak Flats workspace.",
}

export default function SampleDataBannerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Sample data"
        title="Sample-data banner"
        description="A top-of-app amber banner that tells the user they're looking at sample data. Includes an inline toggle (aria-pressed) that swaps to the live Mufflermen workspace and a dismissible × button. The banner switches to a green palette when toggled off."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Onboarding", href: "/ui-primitives/onboarding" },
          { label: "Sample-data banner" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — interact with the toggle</span>
        <SampleDataBanner />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Initial state set to off (live workspace)</span>
        <SampleDataBanner
          initialActive={false}
          kicker="Live workspace"
          headline="You're on the Mufflermen HQ workspace"
          body="Real bookings, real parts, real payouts. Switch to sample data if you want to demo features safely without touching the books."
          toggleOnLabel="Sample · ON"
          toggleOffLabel="Live · ON"
        />
      </section>
    </main>
  )
}
