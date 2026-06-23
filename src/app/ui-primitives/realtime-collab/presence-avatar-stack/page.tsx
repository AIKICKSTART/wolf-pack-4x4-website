import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PresenceAvatarStack } from "../../components/realtime-collab"
import type { CollabUser } from "../../components/realtime-collab"
import { BEC, COLLABORATORS, DANIEL, JORDAN, MARCUS, SOPHIE } from "../mock-data"
import styles from "../realtime-collab.module.css"

export const metadata: Metadata = {
  title: "Presence avatar stack | UI Primitives - Realtime collab",
}

const EXTRA_OFFLINE: CollabUser = {
  id: "u-priya",
  name: "Priya N.",
  role: "Senior tech",
  status: "offline",
  tone: "obsidian",
}

const BIG_GROUP: ReadonlyArray<CollabUser> = [
  ...COLLABORATORS,
  EXTRA_OFFLINE,
  { ...BEC, id: "u-bec-clone", name: "Bec L." },
]

const MIXED_STATUS: ReadonlyArray<CollabUser> = [
  { ...MARCUS, status: "online" },
  { ...SOPHIE, status: "online" },
  { ...JORDAN, status: "idle" },
  { ...DANIEL, status: "busy" },
]

export default function PresenceAvatarStackPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Realtime collab · 01"
        title="Presence avatar stack"
        description="Stacked avatars of currently-online collaborators on a doc, with a tone-coded ring per presence status and an overflow chip when the active-user count exceeds the visible max."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Realtime collab", href: "/ui-primitives/realtime-collab" },
          { label: "Presence avatar stack" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Live on Quote #Q-1408 · default size</span>
          <div className={styles.demoRowJustified}>
            <PresenceAvatarStack users={COLLABORATORS} max={4} />
          </div>
        </div>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Status ring tones · large</span>
          <div className={styles.demoRowJustified}>
            <PresenceAvatarStack users={MIXED_STATUS} max={4} size="lg" />
          </div>
        </div>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Compact stack with overflow chip</span>
          <div className={styles.demoRowJustified}>
            <PresenceAvatarStack users={BIG_GROUP} max={3} size="sm" />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Stack is a single <code>role=&quot;group&quot;</code> with an aria-live
            offscreen summary listing every online name. Hovering raises the slot
            with a translateY for clarity. Each avatar slot encodes presence via a
            tone ring rather than relying on a dot, so the stack keeps its compact
            rhythm even at the smallest size.
          </p>
        </div>
      </section>
    </main>
  )
}
