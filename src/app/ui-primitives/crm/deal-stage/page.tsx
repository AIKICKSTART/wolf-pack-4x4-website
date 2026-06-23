import type { Metadata } from "next"

import { DealStageCard } from "../../components/crm"
import { PageHeader } from "../../components/page-header"

import styles from "../crm.module.css"

export const metadata: Metadata = {
  title: "Deal stage card | CRM",
  description:
    "Primitive 03 — single deal-stage card with deal name, customer, value, expected close date, probability, and stage colour coding.",
}

export default function DealStageScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Deal stage card"
        title="Deal stage card"
        description="A single card in the deal pipeline. Stage drives the left-border accent; probability sits in the top-right; value and close date split the footer."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CRM", href: "/ui-primitives/crm" },
          { label: "Deal stage" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>One per stage</span>
        <div className={styles.demoStack}>
          <DealStageCard
            id="d1"
            dealName="Hilux SR5 — turbo-back system"
            customerName="Mick Davis"
            vehicle="2022 Toyota Hilux SR5"
            value="$2,400"
            expectedClose="12 Jun"
            expectedCloseIso="2026-06-12"
            probability={10}
            stage="new"
            ownerInitials="JP"
          />
          <DealStageCard
            id="d2"
            dealName="Ranger Wildtrak — DPF delete"
            customerName="Sarah Pope"
            vehicle="2024 Ford Ranger Wildtrak"
            value="$1,850"
            expectedClose="16 Jun"
            expectedCloseIso="2026-06-16"
            probability={25}
            stage="qualified"
            ownerInitials="JP"
          />
          <DealStageCard
            id="d3"
            dealName="Patrol Y62 — full custom 3in"
            customerName="Trent Williams"
            vehicle="2019 Nissan Patrol Y62"
            value="$3,650"
            expectedClose="08 Jun"
            expectedCloseIso="2026-06-08"
            probability={50}
            stage="quoted"
            ownerInitials="MW"
          />
          <DealStageCard
            id="d4"
            dealName="Commodore VE — cat-back"
            customerName="Sarah Pope"
            value="$1,420"
            expectedClose="05 Jun"
            expectedCloseIso="2026-06-05"
            probability={80}
            stage="verbal"
            ownerInitials="MW"
          />
          <DealStageCard
            id="d5"
            dealName="Triton MQ — exhaust headers"
            customerName="Mick Davis"
            vehicle="2018 Mitsubishi Triton MQ"
            value="$2,180"
            expectedClose="03 Jun"
            expectedCloseIso="2026-06-03"
            probability={100}
            stage="won"
            ownerInitials="JP"
          />
        </div>
      </section>
    </main>
  )
}
