import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PresenceAvatarStack } from "../../components/collab-deep"

import { ALL_USERS } from "../_mock-data"
import styles from "../collab-deep.module.css"

export const metadata: Metadata = {
  title: "Presence avatar stack | Collab deep",
  description:
    "Primitive 02 — overlapping avatar stack with per-collaborator halos and optional caption.",
}

export default function PresenceAvatarStackPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Presence"
        title="Presence avatar stack"
        description="Overlapping avatar stack with a tinted halo per collaborator. Caption + overflow chip kick in at 4+ collaborators."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Collab deep", href: "/ui-primitives/collab-deep" },
          { label: "Presence avatar stack" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Large · 6 collaborators</span>
        <PresenceAvatarStack
          users={ALL_USERS}
          size="lg"
          caption="On Falcon FG cat-back"
          docTitle="Falcon FG cat-back"
        />

        <span className={styles.stageCaption}>Medium · 4 visible + overflow</span>
        <PresenceAvatarStack users={ALL_USERS} size="md" max={4} />

        <span className={styles.stageCaption}>Small · 3 visible</span>
        <PresenceAvatarStack users={ALL_USERS.slice(0, 3)} size="sm" />
      </section>
    </main>
  )
}
