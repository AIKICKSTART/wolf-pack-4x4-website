import type { Metadata } from "next"

import {
  AccountHealthMeter,
  CustomerCard,
  LeadScoreChip,
  NextActionCard,
  NoteComposer,
  PipelineKanban,
  TouchPointTimeline,
} from "../../components/crm"
import { PageHeader } from "../../components/page-header"
import { MICK_TOUCH_POINTS, MUFFLERMEN_DEALS } from "../demo-data"

import styles from "../crm.module.css"

export const metadata: Metadata = {
  title: "Full CRM workspace | CRM",
  description:
    "Composition — full CRM workspace combining customer card, account health meter, touch-point timeline, pipeline kanban, note composer, next action, and a row of lead score chips.",
}

const WORKSPACE_MENTIONS = [
  { id: "jp", name: "Jordan Pham", role: "Workshop lead" },
  { id: "mw", name: "Marcus Wells", role: "Front of house" },
  { id: "rt", name: "Rita Tan", role: "Bookings" },
] as const

export default function FullCrmWorkspacePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full CRM workspace"
        title="Full CRM workspace"
        description="Composes every primitive in this folder into a working customer-detail surface. CustomerCard headers the page; account health, lead scores, and next-action sit aside; touch points and the pipeline kanban anchor the body; note composer closes it out."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CRM", href: "/ui-primitives/crm" },
          { label: "Full workspace" },
        ]}
      />

      <div className={styles.workspace}>
        <div className={styles.workspaceMain}>
          <CustomerCard
            id="cust-001"
            name="Mick Davis"
            phone="0414 882 197"
            email="mick.davis@oakflatsfab.com.au"
            suburb="Oak Flats NSW"
            status="vip"
            segment="performance"
            lifetimeValue="$18,420"
            lastContact="Today 09:14"
            lastContactIso="2026-05-28T09:14:00+10:00"
            actions={[
              { label: "Call", variant: "primary" },
              { label: "Email", variant: "ghost" },
              { label: "Quote", variant: "ghost" },
              { label: "Book", variant: "ghost" },
            ]}
          />

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Recent touch points</span>
            <TouchPointTimeline points={MICK_TOUCH_POINTS.slice(0, 5)} />
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Deal pipeline</span>
            <PipelineKanban deals={MUFFLERMEN_DEALS} />
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Capture a note</span>
            <NoteComposer
              mentionDirectory={WORKSPACE_MENTIONS}
              placeholder="Write a note about Mick — @mention a teammate, tag with #vehicle, #followup…"
              initial={{
                body: "Confirmed Tue 4 Jun fitment for Hilux turbo-back. ",
                tags: ["hilux", "booked"],
                mentions: [],
                pinned: false,
              }}
            />
          </section>
        </div>

        <aside className={styles.workspaceSide}>
          <AccountHealthMeter
            score={94}
            factors={[
              { label: "Recency", score: 96 },
              { label: "Frequency", score: 92 },
              { label: "Monetary", score: 98 },
              { label: "Engagement", score: 91 },
            ]}
          />

          <NextActionCard
            id="na-mick-1"
            headline="Call Mick about Hilux SR5 fitment"
            rationale="Last contact today — confirm hardware kit lands Monday before the Tue 4 Jun fitment."
            urgency="now"
            primaryActionLabel="Call Mick"
          />

          <div className={styles.demoSurface}>
            <span className={styles.demoLabel}>Open lead scores</span>
            <div className={styles.scoreRow}>
              <LeadScoreChip
                score={88}
                breakdown={[
                  { factor: "engagement", score: 92 },
                  { factor: "fit", score: 95 },
                  { factor: "intent", score: 86 },
                  { factor: "recency", score: 80 },
                ]}
              />
              <LeadScoreChip
                score={74}
                breakdown={[
                  { factor: "engagement", score: 80 },
                  { factor: "fit", score: 88 },
                  { factor: "intent", score: 65 },
                  { factor: "recency", score: 62 },
                ]}
              />
              <LeadScoreChip
                score={42}
                breakdown={[
                  { factor: "engagement", score: 48 },
                  { factor: "fit", score: 55 },
                  { factor: "intent", score: 38 },
                  { factor: "recency", score: 28 },
                ]}
              />
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
