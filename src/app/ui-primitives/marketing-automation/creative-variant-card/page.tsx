import type { Metadata } from "next"

import { CreativeVariantCard } from "../../components/marketing-automation"
import { PageHeader } from "../../components/page-header"

import styles from "../marketing-automation.module.css"

export const metadata: Metadata = {
  title: "Creative variant card | Marketing automation",
  description:
    "Primitive 11 — A/B variant card with subject + preview, open/click/conversion metrics and traffic-split bar.",
}

export default function CreativeVariantCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Creative variant card"
        title="Creative variant card"
        description="Single A/B variant card with subject + body preview, the three rate metrics (open / click / convert), traffic-split bar and a clear winner indicator."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          {
            label: "Marketing automation",
            href: "/ui-primitives/marketing-automation",
          },
          { label: "Creative variant card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 1 · Running A/B</h2>
        <div className={styles.variantGrid}>
          <CreativeVariantCard
            variant="A"
            subject="Bay 2 slots open this week"
            body="G'day {{first_name}}, Bay 2 has slots Thu + Fri this week. Lock in your dyno tune online."
            openRate={42.1}
            clickRate={4.2}
            conversionRate={1.6}
            weight={50}
            signal="running"
          />
          <CreativeVariantCard
            variant="B"
            subject="Hot lap this Thursday?"
            body="Spare a hot lap this Thursday? Mufflermen Bay 2 is taking dyno bookings — same-day fit on most cat-back kits."
            openRate={38.4}
            clickRate={5.1}
            conversionRate={1.8}
            weight={50}
            signal="running"
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 2 · Winner declared</h2>
        <div className={styles.variantGrid}>
          <CreativeVariantCard
            variant="A"
            subject="Bay 2 slots open this week"
            body="G'day {{first_name}}, Bay 2 has slots Thu + Fri this week. Lock in your dyno tune online."
            openRate={42.1}
            clickRate={4.2}
            conversionRate={1.6}
            weight={20}
            signal="loser"
          />
          <CreativeVariantCard
            variant="B"
            subject="Hot lap this Thursday?"
            body="Spare a hot lap this Thursday? Mufflermen Bay 2 is taking dyno bookings — same-day fit on most cat-back kits."
            openRate={46.8}
            clickRate={6.4}
            conversionRate={2.4}
            weight={80}
            signal="winner"
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 3 · Three-way tied test</h2>
        <div className={styles.variantGrid}>
          <CreativeVariantCard
            variant="A"
            subject="Manta cat-back fitted same-day"
            body="Bay 2 has same-day fit on Manta cat-back this Thursday — first 12 bookings get a free baseline dyno."
            openRate={41.2}
            clickRate={4.6}
            conversionRate={1.7}
            weight={34}
            signal="tied"
          />
          <CreativeVariantCard
            variant="B"
            subject="Locking in your tune?"
            body="Quick reminder — your Bay 2 dyno appointment is still open. Click through to confirm."
            openRate={41.5}
            clickRate={4.5}
            conversionRate={1.6}
            weight={33}
            signal="tied"
          />
          <CreativeVariantCard
            variant="C"
            subject="Workshop is filling up"
            body="The Bay 2 dyno is filling up this week. If you're keen, lock it in now."
            openRate={41.0}
            clickRate={4.4}
            conversionRate={1.6}
            weight={33}
            signal="tied"
          />
        </div>
      </section>
    </main>
  )
}
