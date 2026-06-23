import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CollabRoomCard } from "../../components/realtime-collab"
import type { CollabRoomDoc } from "../../components/realtime-collab"
import { BEC, JORDAN, MARCUS, SOPHIE } from "../mock-data"
import styles from "../realtime-collab.module.css"

export const metadata: Metadata = {
  title: "Collab room card | UI Primitives - Realtime collab",
}

const ROOMS: ReadonlyArray<CollabRoomDoc> = [
  {
    id: "room-q-1408",
    title: "Quote #Q-1408 · Hilux exhaust",
    kind: "QUOTE",
    activeUsers: [MARCUS, SOPHIE, JORDAN, BEC],
    lastEditedLabel: "Edited 12s ago",
  },
  {
    id: "room-j-2204",
    title: "Job card #J-2204 · Bay 2",
    kind: "JOB CARD",
    activeUsers: [SOPHIE, JORDAN],
    lastEditedLabel: "Edited 4m ago",
  },
  {
    id: "room-i-0817",
    title: "Invoice #I-0817 · Magnaflow x4",
    kind: "INVOICE",
    activeUsers: [MARCUS, BEC, SOPHIE, JORDAN, { ...MARCUS, id: "u-marcus-clone" }],
    lastEditedLabel: "Edited 22m ago",
    overflow: 2,
  },
]

export default function CollabRoomCardPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Realtime collab · 06"
        title="Collab room card"
        description="Glass-surface card representing an active collab room — doc title, kind chip, last-edited stamp, active-user avatar stack, and an open-room CTA."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Realtime collab", href: "/ui-primitives/realtime-collab" },
          { label: "Collab room card" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Active rooms across the workshop</span>
          <div className={styles.demoRowJustified}>
            {ROOMS.map((room) => (
              <CollabRoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Built on top of <code>surfaces/GlassSurface</code> and composes
            <code> PresenceAvatarStack</code> for the active users row. CTA is a
            native button so it can receive keyboard focus directly; the surface
            itself is not the click target so the heading stays readable.
          </p>
        </div>
      </section>
    </main>
  )
}
