import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { VoiceRoomTile } from "../../components/collab-deep"

import { VOICE_PARTICIPANTS } from "../_mock-data"
import styles from "../collab-deep.module.css"

export const metadata: Metadata = {
  title: "Voice room tile | Collab deep",
  description:
    "Primitive 14 — voice / audio room tile with active speaker rings, raised-hand state, and join control.",
}

export default function VoiceRoomTilePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Voice"
        title="Voice room tile"
        description="Voice / audio room tile. Active-speaker rings pulse around each speaker; muted participants are desaturated; raised hands get a glyph. Footer surfaces listener count + join / leave."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Collab deep", href: "/ui-primitives/collab-deep" },
          { label: "Voice room tile" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Bay floor · 5 participants · joined</span>
        <VoiceRoomTile
          roomName="Bay floor"
          subtitle="Workshop · 5 in room"
          participants={VOICE_PARTICIPANTS}
          listenerCount={5}
          joined
        />

        <span className={styles.stageCaption}>Office · 3 participants · not joined</span>
        <VoiceRoomTile
          roomName="Office sync"
          subtitle="Quote review · 3 in room"
          participants={VOICE_PARTICIPANTS.slice(0, 3)}
          listenerCount={3}
        />
      </section>
    </main>
  )
}
