import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LastJobCompletedCard } from "../../components/locations-pages"

import styles from "../locations-pages.module.css"

export const metadata: Metadata = {
  title: "Last job completed card | Locations & Suburbs",
  description:
    "Primitive 09 — recent-work card. Composes MaterialSurface + primitives/Chip.",
}

export default function LastJobCompletedCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Last job completed card"
        title="Last job completed card"
        description="Materials-elevation card with a stylised exhaust placeholder, vehicle + suburb metadata, and a status Chip pulled from the primitive library."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Locations & suburbs", href: "/ui-primitives/locations-pages" },
          { label: "Last job completed card" },
        ]}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        <LastJobCompletedCard
          vehicle="Toyota HiLux SR5"
          service="Manta 3-inch catback"
          suburbName="Albion Park Rail"
          daysAgo={1}
          tone="red"
        />
        <LastJobCompletedCard
          vehicle="Ford Ranger Wildtrak"
          service="Stainless TIG repair"
          suburbName="Warilla"
          daysAgo={3}
          tone="amber"
        />
        <LastJobCompletedCard
          vehicle="Nissan Patrol Y62"
          service="Dyno-tuned twin tip"
          suburbName="Kiama"
          daysAgo={5}
          tone="teal"
          status="Dyno signed"
        />
        <LastJobCompletedCard
          vehicle="Holden Commodore VE"
          service="Sports muffler swap"
          suburbName="Dapto"
          daysAgo={6}
          tone="green"
        />
      </div>
    </main>
  )
}
