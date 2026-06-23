import type { Metadata } from "next"

import { RevisionTimeline } from "../../components/cms"
import { PageHeader } from "../../components/page-header"

import { CMS_REVISIONS } from "../_mock-data"
import styles from "../cms.module.css"

export const metadata: Metadata = {
  title: "Revision timeline | CMS",
  description:
    "Primitive 09 — version history with author avatars, diff buttons and live-version pinning.",
}

export default function RevisionTimelineScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / History"
        title="Revision timeline"
        description="Version history for a CMS page. Each entry shows the editor's initials, action tag (created / edited / restored / published / scheduled), human-readable timestamp and per-entry view / diff buttons. The live version is pinned."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CMS", href: "/ui-primitives/cms" },
          { label: "Revision timeline" },
        ]}
      />
      <section className={styles.demoStates}>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateIdle}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Idle · loading entries
          </span>
          <RevisionTimeline entries={[]} loading />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateLoaded}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Loaded · 6 revisions
          </span>
          <RevisionTimeline entries={CMS_REVISIONS} />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateError}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Error · history unreachable
          </span>
          <RevisionTimeline
            entries={CMS_REVISIONS}
            error="History service returned 503 — revisions older than 7 days unavailable."
          />
        </div>
      </section>
    </main>
  )
}
