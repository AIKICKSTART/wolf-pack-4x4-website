import type { Metadata } from "next"

import {
  AudioChapterMarkers,
  AudioPlayer,
  AudioQueueList,
  EqualizerBars,
  NowPlayingCard,
} from "../../components/audio"
import { PageHeader } from "../../components/page-header"

import {
  DEMO_CHAPTERS,
  DEMO_DEVICES,
  DEMO_NOW_PLAYING,
  DEMO_QUEUE,
  DEMO_TRACK,
} from "../demo-data"
import styles from "../audio.module.css"

export const metadata: Metadata = {
  title: "Full audio scene | Audio Primitives",
  description:
    "Composition — NowPlayingCard, AudioPlayer, AudioQueueList, AudioChapterMarkers, and EqualizerBars wired into a single audio surface.",
}

export default function FullAudioSceneScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full audio scene"
        title="Full audio scene"
        description="A composition exercise — NowPlayingCard at the top, the full AudioPlayer below it, AudioQueueList alongside, AudioChapterMarkers wired into the player, and a decorative equalizer for atmosphere. Every primitive renders against its real props."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Audio", href: "/ui-primitives/audio" },
          { label: "Full scene" },
        ]}
      />

      <section className={styles.demoSurface} aria-label="Full audio scene">
        <div className={styles.scene}>
          <div className={styles.sceneTop}>
            <NowPlayingCard track={DEMO_NOW_PLAYING} liked />
          </div>

          <div className={styles.sceneMain}>
            <AudioPlayer
              track={DEMO_TRACK}
              devices={DEMO_DEVICES}
              activeDeviceId="dev-macbook"
            />
            <AudioChapterMarkers
              chapters={DEMO_CHAPTERS}
              duration={DEMO_TRACK.duration}
              currentTime={92}
            />
          </div>

          <aside className={styles.sceneSide}>
            <AudioQueueList tracks={DEMO_QUEUE} activeTrackId="q-2" />
          </aside>

          <footer className={styles.sceneFooter} aria-hidden="true">
            <EqualizerBars bars={14} active tone="amber" height={36} />
          </footer>
        </div>
      </section>
    </main>
  )
}
