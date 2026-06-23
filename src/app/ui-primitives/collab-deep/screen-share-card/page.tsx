import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ScreenShareCard } from "../../components/collab-deep"

import { USER_DANIEL, USER_MIA, USER_TIM, VIEWER_SAMPLE } from "../_mock-data"
import styles from "../collab-deep.module.css"

export const metadata: Metadata = {
  title: "Screen share card | Collab deep",
  description:
    "Primitive 13 — screen-share initiator card with preview frame, presenter, and viewer roster.",
}

export default function ScreenShareCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Share"
        title="Screen share card"
        description="Card surfacing an in-progress screen share. Mock window preview, presenter avatar with tone ring, state chip, duration badge, viewer stack, and a Join action."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Collab deep", href: "/ui-primitives/collab-deep" },
          { label: "Screen share card" },
        ]}
      />

      <section className={styles.stageFrame}>
        <div className={styles.stageRow}>
          <ScreenShareCard
            presenter={USER_DANIEL}
            sharing="Falcon parts CMS — description"
            source="Window · Chrome · 2 of 6 monitors"
            viewers={5}
            viewerSample={VIEWER_SAMPLE}
            state="live"
            durationLabel="08:12"
          />
          <ScreenShareCard
            presenter={USER_MIA}
            sharing="Hero shot — colour grade"
            source="App · Capture One"
            viewers={2}
            viewerSample={VIEWER_SAMPLE.slice(0, 2)}
            state="starting"
          />
          <ScreenShareCard
            presenter={USER_TIM}
            sharing="Pricing spreadsheet"
            source="Tab · Google Sheets"
            viewers={3}
            viewerSample={VIEWER_SAMPLE.slice(0, 3)}
            state="paused"
            durationLabel="22:04"
          />
        </div>
      </section>
    </main>
  )
}
