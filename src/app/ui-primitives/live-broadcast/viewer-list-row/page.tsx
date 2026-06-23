import type { Metadata } from "next"

import { ViewerListRow } from "../../components/live-broadcast"
import { PageHeader } from "../../components/page-header"

import { VIEWERS } from "../_mock-data"
import styles from "../live-broadcast.module.css"

export const metadata: Metadata = {
  title: "Viewer list row | Live broadcast",
  description:
    "Primitive 07 — viewer row with avatar, handle, region, watch-duration, supporter tier badge, and host actions.",
}

export default function ViewerListRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Viewer list row"
        title="Viewer list row"
        description="One viewer in the side rail or host's backstage list. Tier badge controls accent; the host-actions cluster (raise / kick / more) only appears when the panel runs in host mode."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live broadcast", href: "/ui-primitives/live-broadcast" },
          { label: "Viewer list row" },
        ]}
      />

      <section className={[styles.demoSurface, styles.demoDouble].join(" ")}>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Viewer mode · no actions</span>
          <ul className={styles.list}>
            {VIEWERS.map((viewer) => (
              <ViewerListRow key={viewer.id} viewer={viewer} />
            ))}
          </ul>
        </div>

        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Host backstage mode · row actions</span>
          <ul className={styles.list}>
            {VIEWERS.slice(0, 5).map((viewer) => (
              <ViewerListRow key={viewer.id} viewer={viewer} showHostActions />
            ))}
          </ul>

          <span className={styles.demoLabel}>Flagged viewer · host actions</span>
          <ul className={styles.list}>
            <ViewerListRow viewer={VIEWERS[5]} showHostActions />
          </ul>
        </div>
      </section>
    </main>
  )
}
