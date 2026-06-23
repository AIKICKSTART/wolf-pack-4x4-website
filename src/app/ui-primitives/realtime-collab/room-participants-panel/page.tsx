import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RoomParticipantsPanel } from "../../components/realtime-collab"
import { BEC, DANIEL, JORDAN, MARCUS, SOPHIE } from "../mock-data"
import styles from "../realtime-collab.module.css"

export const metadata: Metadata = {
  title: "Room participants panel | UI Primitives - Realtime collab",
}

const PARTICIPANTS = [
  { ...MARCUS, focus: "Labour totals" },
  { ...SOPHIE, focus: "Parts line 5" },
  { ...JORDAN, focus: "Watching · idle" },
  { ...BEC, focus: "Customer notes" },
  { ...DANIEL, focus: "Share + perms" },
]

export default function RoomParticipantsPanelPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Realtime collab · 11"
        title="Room participants panel"
        description="Side panel listing everyone currently in the room - avatar, name, role chip, current focus area, presence dot overlay, and a leave-room button."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Realtime collab", href: "/ui-primitives/realtime-collab" },
          { label: "Room participants panel" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Quote #Q-1408 · 5 participants</span>
          <div className={styles.demoRowJustified}>
            <RoomParticipantsPanel
              title="Quote #Q-1408"
              participants={PARTICIPANTS}
            />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Panel sits on a <code>GlassSurface intensity=&quot;high&quot;</code>
            so it reads as a layer rather than another card. Each row composes
            <code> OnlineStatusDot</code> as an overlay on the avatar so the
            presence state is part of the identity rather than a separate column.
            Offline rows drop to 62% opacity to recede.
          </p>
        </div>
      </section>
    </main>
  )
}
