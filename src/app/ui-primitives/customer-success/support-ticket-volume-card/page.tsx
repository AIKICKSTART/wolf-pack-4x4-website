import type { Metadata } from "next"

import { SupportTicketVolumeCard } from "../../components/customer-success"
import { PageHeader } from "../../components/page-header"
import { SAMPLE_VOLUME_POINTS, SAMPLE_SENTIMENT_POINTS } from "../fixtures"

import styles from "../customer-success.module.css"

export const metadata: Metadata = {
  title: "Support ticket volume | Customer success",
  description:
    "Primitive 12 — per-customer support ticket volume with sparkline and sentiment trend direction.",
}

export default function SupportTicketVolumeCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Support volume"
        title="Support ticket volume card"
        description="Composes the Sparkline chart with ticket volume and sentiment so the success lead can see both dimensions in a single card. Sentiment direction shifts the tone."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer success", href: "/ui-primitives/customer-success" },
          { label: "Support ticket volume" },
        ]}
      />

      <div className={styles.demoTwo}>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Wollongong Express Fleet · improving</span>
          <SupportTicketVolumeCard
            customerName="Wollongong Express Fleet"
            openTickets={1}
            trailingTickets={76}
            window="last 90 days"
            volumePoints={SAMPLE_VOLUME_POINTS}
            sentimentPoints={SAMPLE_SENTIMENT_POINTS}
            sentimentDirection="up"
            sentimentDelta="+12"
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Bayside Tow Co. · declining</span>
          <SupportTicketVolumeCard
            customerName="Bayside Tow Co."
            openTickets={5}
            trailingTickets={42}
            window="last 60 days"
            volumePoints={[3, 4, 5, 6, 7, 8, 9, 11, 12, 14, 13, 16]}
            sentimentPoints={[18, 14, 10, 6, 2, -4, -10, -14, -20, -26, -32, -38]}
            sentimentDirection="down"
            sentimentDelta="-22"
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Mick Davis · steady</span>
          <SupportTicketVolumeCard
            customerName="Mick Davis"
            openTickets={0}
            trailingTickets={4}
            window="last 30 days"
            volumePoints={[1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0]}
            sentimentPoints={[20, 22, 20, 18, 22, 24, 22, 20, 24, 22, 20, 22]}
            sentimentDirection="flat"
            sentimentDelta="+1"
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Trent Williams · declining</span>
          <SupportTicketVolumeCard
            customerName="Trent Williams"
            openTickets={2}
            trailingTickets={11}
            window="last 30 days"
            volumePoints={[0, 1, 1, 2, 1, 2, 1, 0, 1, 1, 2, 2]}
            sentimentPoints={[10, 4, 0, -4, -6, -10, -12, -14, -18, -22, -26, -30]}
            sentimentDirection="down"
            sentimentDelta="-18"
          />
        </section>
      </div>
    </main>
  )
}
