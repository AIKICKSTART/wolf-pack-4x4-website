import type { Metadata } from "next"

import { WorkshopConfigCard } from "../../components/system-onboarding"
import { PageHeader } from "../../components/page-header"

import {
  WORKSHOP_SERVICE_CATALOGUE,
  WORKSHOP_VALUES_BLANK,
  WORKSHOP_VALUES_DRAFT,
} from "../_mock-data"
import styles from "../system-onboarding.module.css"

export const metadata: Metadata = {
  title: "Workshop config | System onboarding",
  description:
    "Primitive 03 — workshop profile capture step. Three states: pre-filled, blank, and Sunday-only opening.",
}

export default function WorkshopConfigCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Workshop"
        title="Workshop config card"
        description="Captures the workshop fundamentals — trading name, ABN, address, bay count, weekly hours and services offered. Pre-populates from the tenant's signup details where it can."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System onboarding", href: "/ui-primitives/system-onboarding" },
          { label: "Workshop config" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 1 · Pre-filled — Illawarra TB · 5 bays · Mon-Sat</span>
        <WorkshopConfigCard
          kicker="Step 2 of 6 · Workshop"
          title="Tell us about Illawarra Tyres & Brakes"
          description="ABN, address, hours and what you can quote and deliver. We'll fold this into your quote header and your local-SEO pages."
          values={WORKSHOP_VALUES_DRAFT}
          serviceCatalogue={WORKSHOP_SERVICE_CATALOGUE}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 2 · Blank — first ever load</span>
        <WorkshopConfigCard
          kicker="Step 2 of 6 · Workshop"
          title="Tell us about your workshop"
          description="We'll fold this into your quote header and your local-SEO pages. You can swap services on or off later from settings."
          values={WORKSHOP_VALUES_BLANK}
          serviceCatalogue={WORKSHOP_SERVICE_CATALOGUE}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 3 · Sunday opening — extended trading hours</span>
        <WorkshopConfigCard
          kicker="Step 2 of 6 · Workshop"
          title="Tell us about Illawarra Tyres & Brakes"
          description="ABN, address, hours and what you can quote and deliver. We'll fold this into your quote header and your local-SEO pages."
          values={{
            ...WORKSHOP_VALUES_DRAFT,
            hours: WORKSHOP_VALUES_DRAFT.hours.map((day) =>
              day.day === "Sun" ? { ...day, open: "10:00", close: "14:00", closed: false } : day,
            ),
            services: [...WORKSHOP_VALUES_DRAFT.services, "diagnostics", "tuning"],
          }}
          serviceCatalogue={WORKSHOP_SERVICE_CATALOGUE}
        />
      </section>
    </main>
  )
}
