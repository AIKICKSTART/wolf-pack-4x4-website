import type { Metadata } from "next"

import { ApprovalStageTracker } from "../../components/social-scheduler"
import { PageHeader } from "../../components/page-header"

import { CalendarBoard } from "./_calendar-board"
import { CalendarHeaderBand, RailSection } from "./_components"
import {
  APPROVAL_STAGES,
  PENDING_APPROVAL_POSTS,
  PLATFORMS,
  POSTURE_STATS,
  UPCOMING_POSTS,
} from "./_demo-data"
import styles from "./social-calendar.module.css"

export const metadata: Metadata = {
  title: "Social content calendar | Torque",
  description:
    "The Oak Flats Muffler Men monthly social plan — scheduled posts per channel with status chips, a campaign filter, and an owner approval gate before anything posts. Composed entirely from UI primitives.",
}

export default function SocialCalendarPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Social content calendar"
        title="Social content calendar"
        description="One screen to plan the month across Facebook, Instagram, TikTok and YouTube. Scheduled posts sit in a drag-to-reschedule month grid with status chips, a side rail tracks what's upcoming and what's waiting on you, and nothing publishes before you approve it. Live, light + dark, built only from registered primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque" },
          { label: "Social content calendar" },
        ]}
      />

      <CalendarHeaderBand stats={POSTURE_STATS} />

      <div className={styles.layout}>
        <CalendarBoard platforms={PLATFORMS} />

        <aside className={styles.rail} aria-label="Upcoming posts and approvals">
          <section className={styles.approvalFrame} aria-labelledby="social-calendar-gate-title">
            <header className={styles.approvalIntro}>
              <span className={styles.approvalKicker}>Approval before posting</span>
              <h2 id="social-calendar-gate-title" className={styles.approvalHeading}>
                Owner gate
              </h2>
              <p className={styles.approvalCopy}>
                Torque drafts and Mia checks the voice — but the Dyno Tuesday post stays held until
                you sign off.
              </p>
            </header>
            <ApprovalStageTracker
              title="Dyno Tuesday: 200 Series"
              stages={[...APPROVAL_STAGES]}
            />
          </section>

          <RailSection
            id="social-calendar-pending-title"
            kicker="Needs your call"
            title="Pending approval"
            variant="approval"
            count={PENDING_APPROVAL_POSTS.length}
            posts={PENDING_APPROVAL_POSTS}
            platforms={PLATFORMS}
          />

          <RailSection
            id="social-calendar-upcoming-title"
            kicker="Next out the door"
            title="Upcoming posts"
            variant="upcoming"
            count={UPCOMING_POSTS.length}
            posts={UPCOMING_POSTS}
            platforms={PLATFORMS}
          />
        </aside>
      </div>
    </main>
  )
}
