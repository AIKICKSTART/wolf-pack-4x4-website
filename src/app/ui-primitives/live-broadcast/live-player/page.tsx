import type { Metadata } from "next"

import { LivePlayer } from "../../components/live-broadcast"
import { PageHeader } from "../../components/page-header"

import {
  HOSTS,
  REPLAY_BROADCASTS,
  SCHEDULED_MANTA_LAUNCH,
  STREAM_HEALTH_DEGRADED,
  STREAM_HEALTH_STABLE,
} from "../_mock-data"
import styles from "../live-broadcast.module.css"

export const metadata: Metadata = {
  title: "Live player | Live broadcast",
  description:
    "Primitive 01 — broadcast viewport with LIVE badge, viewer count, bitrate indicator, stream-health chip and chrome controls.",
}

const REPLAY_PRIMARY = REPLAY_BROADCASTS[0]

export default function LivePlayerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Live player"
        title="Live player"
        description="Broadcast viewport with state badge, viewer count, bitrate chip, stream-health indicator, and chrome controls. Player never auto-plays — viewer taps to start audio."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live broadcast", href: "/ui-primitives/live-broadcast" },
          { label: "Live player" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live · stable encoder · 240 viewers</span>
        <LivePlayer
          title="Dyno Tuesday — Falcon GT-HO baseline pulls"
          state="live"
          viewerCount={240}
          bitrateKbps={STREAM_HEALTH_STABLE.bitrateKbps}
          resolutionLabel={STREAM_HEALTH_STABLE.resolutionLabel}
          bitrateHistory={STREAM_HEALTH_STABLE.bitrateHistory}
          health="good"
          host={HOSTS.daniel}
          description={`Bay 1 dyno cell · stainless 3.5" twin · AFR + boost live, customer Q&A in the second half.`}
        />

        <span className={styles.demoLabel}>Live · degraded encoder · big supplier launch · 1,247 viewers</span>
        <LivePlayer
          title={`Manta supplier launch — 3.5" v-band drop`}
          state="live"
          viewerCount={1247}
          bitrateKbps={STREAM_HEALTH_DEGRADED.bitrateKbps}
          resolutionLabel={STREAM_HEALTH_DEGRADED.resolutionLabel}
          bitrateHistory={STREAM_HEALTH_DEGRADED.bitrateHistory}
          health="degraded"
          host={HOSTS.manta}
          description="Manta walks the new VE/VF + Falcon kit. Bay 2 install live with weld review at the half."
        />

        <span className={styles.demoLabel}>Scheduled · not started · upcoming Q&A</span>
        <LivePlayer
          title={SCHEDULED_MANTA_LAUNCH.title}
          state="scheduled"
          viewerCount={0}
          bitrateKbps={0}
          resolutionLabel="1080p60"
          health="excellent"
          host={SCHEDULED_MANTA_LAUNCH.host}
          description={`Starts ${SCHEDULED_MANTA_LAUNCH.localTimeLabel}. ${SCHEDULED_MANTA_LAUNCH.blurb}`}
        />

        <span className={styles.demoLabel}>Replay · ended broadcast</span>
        <LivePlayer
          title={REPLAY_PRIMARY.title}
          state="ended"
          viewerCount={REPLAY_PRIMARY.viewCount}
          bitrateKbps={6000}
          resolutionLabel="1080p60"
          health="excellent"
          host={REPLAY_PRIMARY.host}
          description={`${REPLAY_PRIMARY.airedLabel} · ${REPLAY_PRIMARY.runtimeLabel} runtime.`}
        />
      </section>
    </main>
  )
}
