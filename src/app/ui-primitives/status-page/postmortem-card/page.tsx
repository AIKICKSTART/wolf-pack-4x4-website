import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PostmortemCard } from "../../components/status-page"

import { POSTMORTEM_ACTION_ITEMS } from "../_mock-data"
import styles from "../status-page.module.css"

export const metadata: Metadata = {
  title: "Postmortem card | Status page",
  description:
    "Primitive 09 — postmortem card with 5-whys, action items and lessons learned.",
}

export default function PostmortemCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Postmortem"
        title="Postmortem card"
        description="The structured public postmortem we publish after a Sev2-and-above incident. Title, date, author, a numbered 5-Whys list, an action-items block with owners and due-dates, and a lessons-learned panel."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Status page", href: "/ui-primitives/status-page" },
          { label: "Postmortem card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · SMS delivery delay postmortem</span>
        <PostmortemCard
          title="Customer SMS delivery delays in APAC-1"
          date="27 May 2026"
          author="Sasha B · SRE"
          fiveWhys={[
            "Customers in APAC-1 saw 5-minute booking confirmation delays.",
            "Because the carrier's primary route returned 5xx at 14:32 UTC.",
            "Because the carrier failed over without honouring our route-pinning header.",
            "Because the route-pin extension is opt-in and our APAC account wasn't enrolled.",
            "Because the enrollment task slipped during the 2025 carrier-consolidation epic.",
          ]}
          actionItems={POSTMORTEM_ACTION_ITEMS}
          lessonsLearned="We over-trusted the carrier's primary route and treated a multi-region SMS partner as a single dependency. From now on every customer-impacting carrier dependency must have an automated failover test in the on-call game-day."
        />
      </section>
    </main>
  )
}
