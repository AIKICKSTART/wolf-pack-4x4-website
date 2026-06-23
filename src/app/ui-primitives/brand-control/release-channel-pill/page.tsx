import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  MOCK_CHANNELS,
  ReleaseChannelPill,
} from "../../components/brand-control"

import styles from "../brand-control.module.css"

export const metadata: Metadata = {
  title: "Release channel pill | Brand control",
}

const ALIGNED = MOCK_CHANNELS.map((channel) =>
  channel.id === "alpha" || channel.id === "beta"
    ? { ...channel, diffCount: 0, version: "v0.90.4" }
    : channel
)

const HEAVY_DIFF = MOCK_CHANNELS.map((channel) =>
  channel.id === "alpha"
    ? { ...channel, diffCount: 142, version: "v0.93.1" }
    : channel
)

export default function ReleaseChannelPillRoute() {
  return (
    <main className={styles.subRoute}>
      <div className={styles.shellNarrow}>
        <PageHeader
          kicker="Primitive 14"
          title="Release channel pill"
          description="Segmented selector for alpha / beta / production channels. The diff badge surfaces how far the active channel is ahead of production."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Brand control", href: "/ui-primitives/brand-control" },
            { label: "Release channel pill" },
          ]}
        />

        <div className={styles.note}>
          <span>Three states</span>
          <p>
            Default Alpha selection (24 ahead), all channels aligned to production, and a heavy-diff alpha at +142 commits ahead.
          </p>
        </div>

        <section className={styles.stateWrap} aria-label="Default alpha">
          <span className={styles.stateLabel}>State 01 · Alpha default</span>
          <ReleaseChannelPill channels={MOCK_CHANNELS} defaultChannelId="alpha" />
        </section>

        <section className={styles.stateWrap} aria-label="Aligned channels">
          <span className={styles.stateLabel}>State 02 · Aligned</span>
          <ReleaseChannelPill channels={ALIGNED} defaultChannelId="beta" />
        </section>

        <section className={styles.stateWrap} aria-label="Heavy alpha diff">
          <span className={styles.stateLabel}>State 03 · +142 ahead</span>
          <ReleaseChannelPill channels={HEAVY_DIFF} defaultChannelId="alpha" />
        </section>
      </div>
    </main>
  )
}
