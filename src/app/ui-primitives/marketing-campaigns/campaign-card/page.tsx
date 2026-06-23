import type { Metadata } from "next"

import { CampaignCard } from "../../components/marketing-campaigns"
import { PageHeader } from "../../components/page-header"

import styles from "../marketing-campaigns.module.css"

export const metadata: Metadata = {
  title: "Campaign card | Marketing campaigns",
  description:
    "Primitive 01 — campaign list row with status, channels, audience size and send window.",
}

export default function CampaignCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Campaign card"
        title="Campaign card"
        description="A single campaign row composed onto a glass DashboardCard with status, channel, audience size and send-window chips. Use as the primary row in campaign-list tables and overview boards."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing campaigns", href: "/ui-primitives/marketing-campaigns" },
          { label: "Campaign card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoStack}>
          <CampaignCard
            name="Winter exhaust deals"
            objective="Drive Bay 2 dyno bookings before EOFY"
            status="running"
            channels={["email", "sms"]}
            audienceSize={8420}
            sendWindow="Tue 6:30pm AEST"
            badge="A/B"
          />
          <CampaignCard
            name="Manta launch announcement"
            objective="Convert Hilux owners in Illawarra to Manta cat-back"
            status="scheduled"
            channels={["email", "social", "banner"]}
            audienceSize={12480}
            sendWindow="Thu 7:00pm AEST"
          />
          <CampaignCard
            name="Bay 2 availability blast"
            objective="Fill last-minute Bay 2 slots Friday"
            status="draft"
            channels={["sms", "push"]}
            audienceSize={2840}
            sendWindow="Fri 11:00am AEST"
          />
          <CampaignCard
            name="Win-back · lapsed >180d"
            objective="Re-engage lapsed Hilux & Ranger owners"
            status="paused"
            channels={["email", "push"]}
            audienceSize={6120}
            sendWindow="Mon 9:30am AEST"
          />
        </div>
      </section>
    </main>
  )
}
