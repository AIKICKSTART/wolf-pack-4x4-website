import type { Metadata } from "next"

import { TourInvitationCard } from "../../components/onboarding"
import { PageHeader } from "../../components/page-header"

import styles from "../onboarding.module.css"

export const metadata: Metadata = {
  title: "Tour invitation | Onboarding",
  description:
    "Primitive 05 — card inviting the user to take the product tour, with a thumbnail rail of tour stops, duration chip, start-tour CTA and a dismiss link.",
}

export default function TourInvitationScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Tour invitation"
        title="Tour invitation card"
        description="A card that invites the user to start the product tour. Distinct from the help-docs TourController itself — this is the entry point. Thumbnail rail shows the upcoming tour stops, duration chip sets expectation, start-tour CTA fires the tour, and a quiet dismiss link defers it."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Onboarding", href: "/ui-primitives/onboarding" },
          { label: "Tour invitation" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — Oak Flats workshop walk</span>
        <TourInvitationCard
          kicker="Product tour"
          title="Walk the Oak Flats workshop in 90 seconds"
          body="A guided walk through bays, scheduling, parts movement, and the customer-facing portal. You can pause and replay any stop."
          duration="90 seconds"
          stops={[
            { label: "Bay 1 — current jobs", glyph: "▦" },
            { label: "Parts movement", glyph: "▤" },
            { label: "Booking calendar", glyph: "◷" },
            { label: "Customer portal", glyph: "★" },
          ]}
          startHref="#tour"
        />
      </section>
    </main>
  )
}
