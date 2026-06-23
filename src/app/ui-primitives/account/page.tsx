import type { Metadata } from "next"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"
import { PlanBadge } from "../components/account/plan-badge"
import { ProfileCard } from "../components/account/profile-card"
import { UsageMeterCard } from "../components/account/usage-meter-card"
import { ActivityFeed, type ActivityFeedItem } from "../components/data-display/activity-feed"

import styles from "./account.module.css"

export const metadata: Metadata = {
  title: "Account overview | UI Primitives",
}

const ACTIVITY: ReadonlyArray<ActivityFeedItem> = [
  {
    id: "act-01",
    title: "Workshop owner accepted the Fleet plan",
    description: "Workspace billing tier upgraded for the Oak Flats — Albion Park bay.",
    timestamp: "12 min ago",
    tone: "success",
    actor: { name: "Daniel F." },
  },
  {
    id: "act-02",
    title: "Mara K. invited darren@oakflats.exhaust",
    description: "Bay manager invitation — Shellharbour bay 02.",
    timestamp: "1 hr ago",
    tone: "info",
    actor: { name: "Mara K." },
  },
  {
    id: "act-03",
    title: "Stripe webhook recovered after retry",
    description: "Connected integration restored for the parts-cost pipeline.",
    timestamp: "Today, 09:14",
    tone: "warn",
    actor: { name: "Pipeline" },
  },
  {
    id: "act-04",
    title: "Audit log retention bumped to 180 days",
    description: "Workspace policy committed by Daniel F.",
    timestamp: "Yesterday, 17:02",
    tone: "info",
    actor: { name: "Daniel F." },
  },
]

export default function AccountOverviewPage() {
  return (
    <>
      <PageHeader
        kicker="18 / Account"
        title="Account overview"
        description="Workshop control surface — profile, plan, usage and the recent operator activity that touches every bay."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Account" },
        ]}
      />

      <span className={styles.notice}>Visual reference only — no real account data wired</span>

      <FormPatternReferences
        ids={["account-team-settings", "notification-permissions", "billing-payment-tax"]}
      />

      <ProfileCard
        name="Daniel Fleuren"
        role="Workshop owner"
        email="daniel@mufflermen.com.au"
        location="Oak Flats — Albion Park bay"
        avatarTone="red"
        roleChipTone="amber"
        editHref="/ui-primitives/account/profile"
        stats={[
          { label: "Active bays", value: "04", tone: "amber" },
          { label: "Members", value: "12", tone: "teal" },
          { label: "Open jobs", value: "37", tone: "green" },
        ]}
      />

      <section className={styles.section} aria-labelledby="overview-plan-heading">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>01 / Plan + usage</span>
          <h2 id="overview-plan-heading" className={styles.sectionTitle}>
            Plan, usage, and consumption
          </h2>
        </header>

        <div className={styles.gridThreeUp}>
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <h3 className={styles.cardTitle}>Workspace plan</h3>
              <p className={styles.cardSub}>Renews 12 Jun 2026</p>
            </div>
            <PlanBadge tier="fleet" size="lg" caption="3 bays · 12 seats" />
          </div>

          <UsageMeterCard
            label="Quote credits"
            used={1840}
            limit={2500}
            unit="quotes"
            resetDate="1 Jun"
            caption="660 quotes remaining — pace held since last week"
            tone="teal"
          />

          <UsageMeterCard
            label="Telemetry pings"
            used={9410}
            limit={10000}
            unit="pings"
            resetDate="1 Jun"
            tone="amber"
          />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="overview-activity-heading">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>02 / Recent activity</span>
          <h2 id="overview-activity-heading" className={styles.sectionTitle}>
            Operator activity feed
          </h2>
          <p className={styles.sectionLead}>
            Last ten workspace events — invites, billing transitions, integration recoveries.
          </p>
        </header>
        <ActivityFeed items={ACTIVITY} ariaLabel="Workspace activity" className={styles.overviewActivity} />
      </section>
    </>
  )
}
