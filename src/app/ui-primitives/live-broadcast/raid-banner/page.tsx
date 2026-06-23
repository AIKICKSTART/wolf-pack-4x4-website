import type { Metadata } from "next"

import { RaidBanner } from "../../components/live-broadcast"
import { PageHeader } from "../../components/page-header"

import { RAID_EVENT } from "../_mock-data"
import styles from "../live-broadcast.module.css"

export const metadata: Metadata = {
  title: "Raid banner | Live broadcast",
  description:
    "Primitive 13 — incoming raid banner with raider channel, viewer count, shimmer animation, greet and dismiss actions.",
}

const SMALL_RAID = {
  ...RAID_EVENT,
  id: "raid-small",
  fromChannel: "Holden VF Mafia",
  fromHandle: "@holden_vf_mafia",
  viewerCount: 84,
  message: undefined,
}

const QUIET_RAID = {
  ...RAID_EVENT,
  id: "raid-quiet",
  fromChannel: "Coastal Caravans AU",
  fromHandle: "@coastal_caravans_au",
  viewerCount: 22,
  message: undefined,
}

export default function RaidBannerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Raid banner"
        title="Raid banner"
        description="Notification shown when another channel raids the Mufflermen stream — used during supplier collabs and end-of-stream handoffs. Shimmer respects the reduced-motion preference."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live broadcast", href: "/ui-primitives/live-broadcast" },
          { label: "Raid banner" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Big raid · 1,840 viewers + message</span>
        <RaidBanner raid={RAID_EVENT} />

        <span className={styles.demoLabel}>Medium raid · ~80 viewers · no message</span>
        <RaidBanner raid={SMALL_RAID} />

        <span className={styles.demoLabel}>Small raid · 22 viewers</span>
        <RaidBanner raid={QUIET_RAID} />
      </section>
    </main>
  )
}
