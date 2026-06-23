import type { Metadata } from "next"

import { LeadCard } from "../../components/sales-leads"
import { PageHeader } from "../../components/page-header"

import styles from "../sales-leads.module.css"

export const metadata: Metadata = {
  title: "Lead card | Sales leads",
  description:
    "Primitive 01 — lead card with name, vehicle, source chip, score chip, first-touch, and assigned-to row.",
}

export default function LeadCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Lead card"
        title="Lead card"
        description="A self-contained inbound lead — vehicle, source chip, live score, first-touch timestamp, and who currently owns the follow-up."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Sales leads", href: "/ui-primitives/sales-leads" },
          { label: "Lead card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoStack}>
          <LeadCard
            id="lead-001"
            name="Mick Davis"
            vehicle="2022 Toyota Hilux SR5"
            source="website"
            score={88}
            scoreBreakdown={[
              { factor: "engagement", score: 92 },
              { factor: "fit", score: 95 },
              { factor: "intent", score: 86 },
              { factor: "recency", score: 80 },
            ]}
            firstTouch="Today 09:14"
            firstTouchIso="2026-05-29T09:14:00+10:00"
            assignedToName="Jordan Pham"
            assignedToInitials="JP"
            inquiryAbout="Manta 2.5in cat-back system — wants tone improvement before Mudgee trip."
          />
          <LeadCard
            id="lead-002"
            name="Sarah Pope"
            vehicle="2024 Ford Ranger Wildtrak"
            source="phone"
            score={74}
            scoreBreakdown={[
              { factor: "engagement", score: 80 },
              { factor: "fit", score: 88 },
              { factor: "intent", score: 65 },
              { factor: "recency", score: 62 },
            ]}
            firstTouch="Yesterday 14:22"
            firstTouchIso="2026-05-28T14:22:00+10:00"
            assignedToName="Marcus Wells"
            assignedToInitials="MW"
            inquiryAbout="DPF delete + replacement turbo-back."
          />
          <LeadCard
            id="lead-003"
            name="Albion Park Couriers"
            vehicle="Fleet of 6 Toyota Hiace"
            source="referral"
            score={92}
            scoreBreakdown={[
              { factor: "engagement", score: 88 },
              { factor: "fit", score: 99 },
              { factor: "intent", score: 95 },
              { factor: "recency", score: 90 },
            ]}
            firstTouch="2 days ago"
            firstTouchIso="2026-05-27T10:00:00+10:00"
            assignedToName="Jordan Pham"
            assignedToInitials="JP"
            inquiryAbout="6× Hiace muffler swap — fleet maintenance schedule, awaiting quote."
          />
        </div>
      </section>
    </main>
  )
}
