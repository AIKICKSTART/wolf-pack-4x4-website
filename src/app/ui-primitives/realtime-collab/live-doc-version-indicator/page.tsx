import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LiveDocVersionIndicator } from "../../components/realtime-collab"
import styles from "../realtime-collab.module.css"

export const metadata: Metadata = {
  title: "Live doc version indicator | UI Primitives - Realtime collab",
}

export default function LiveDocVersionIndicatorPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Realtime collab · 14"
        title="Live doc version indicator"
        description="Pill bar with current version chip + save state dot + saved-X-secs-ago + collaborators-online count. Four save states drive both the dot colour and the pulse."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Realtime collab", href: "/ui-primitives/realtime-collab" },
          { label: "Live doc version indicator" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Quote #Q-1408 · saved</span>
          <div className={styles.demoStack}>
            <LiveDocVersionIndicator
              version="v18"
              savedLabel="Saved 4s ago"
              collaboratorsOnline={4}
              state="saved"
            />
          </div>
        </div>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Mid-save · syncing to server</span>
          <div className={styles.demoStack}>
            <LiveDocVersionIndicator
              version="v19"
              savedLabel="Saving labour line 3..."
              collaboratorsOnline={4}
              state="saving"
            />
          </div>
        </div>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Unsaved · dirty changes</span>
          <div className={styles.demoStack}>
            <LiveDocVersionIndicator
              version="v19"
              savedLabel="Unsaved · 2 changes pending"
              collaboratorsOnline={3}
              state="dirty"
            />
          </div>
        </div>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Offline · last saved while connected</span>
          <div className={styles.demoStack}>
            <LiveDocVersionIndicator
              version="v17"
              savedLabel="Saved offline 22s ago"
              collaboratorsOnline={0}
              state="offline"
            />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Pulse on the state dot only applies to <code>saving</code> +
            <code>dirty</code> states so a fully-saved doc reads as calm. The
            element is <code>role=&quot;status&quot;</code> with an offscreen
            polite summary so screen readers hear &quot;Saving · Saving labour
            line 3 · 4 online&quot; without focus theft.
          </p>
        </div>
      </section>
    </main>
  )
}
