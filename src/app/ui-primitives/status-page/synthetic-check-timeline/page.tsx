import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SyntheticCheckTimeline } from "../../components/status-page"

import { SYNTHETIC_TRACKS } from "../_mock-data"
import styles from "../status-page.module.css"

export const metadata: Metadata = {
  title: "Synthetic check timeline | Status page",
  description:
    "Primitive 12 — per-region synthetic check timeline with pass / fail / timeout dots on a 24h axis.",
}

export default function SyntheticCheckTimelineScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Timeline"
        title="Synthetic check timeline"
        description="A horizontal 24-hour timeline for a single synthetic check (in this case the public booking flow). Each row is a region. Dots are tone-coded — green pass, amber timeout, red fail — with a small legend underneath."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Status page", href: "/ui-primitives/status-page" },
          { label: "Synthetic check timeline" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · /booking · 6 regions · 24h</span>
        <SyntheticCheckTimeline
          checkName="GET /booking · 200 OK · TTI under 2.5s"
          tracks={SYNTHETIC_TRACKS}
        />
      </section>
    </main>
  )
}
