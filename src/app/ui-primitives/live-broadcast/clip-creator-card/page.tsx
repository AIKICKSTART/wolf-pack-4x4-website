import type { Metadata } from "next"

import { ClipCreatorCard } from "../../components/live-broadcast"
import { PageHeader } from "../../components/page-header"

import { CLIP_MOMENT } from "../_mock-data"
import styles from "../live-broadcast.module.css"

export const metadata: Metadata = {
  title: "Clip creator card | Live broadcast",
  description:
    "Primitive 14 — moment-clipper card with 15/30/60/90s pre+post window selector, copy link, download MP4, share to FB/IG/X/YT.",
}

const MID_CLIP = {
  ...CLIP_MOMENT,
  id: "clip-vf-launch",
  label: "VF Commodore — first crack on tune",
  creator: "VF_Holden_Loz",
  capturedAt: "20:32:18 AEST",
  windowSeconds: 60,
}

const LONG_CLIP = {
  ...CLIP_MOMENT,
  id: "clip-q-and-a",
  label: "Daniel walks DPF cleaning rig",
  creator: "DieselDad_Mick",
  capturedAt: "21:04:51 AEST",
  windowSeconds: 90,
}

export default function ClipCreatorCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Clip creator card"
        title="Clip creator card"
        description="Compact moment-clipper for the in-broadcast clip rail. Viewer picks a 15/30/60/90s window around an anchor frame, then copies a link, downloads MP4, or shares to FB/IG/X/YT."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live broadcast", href: "/ui-primitives/live-broadcast" },
          { label: "Clip creator card" },
        ]}
      />

      <section className={[styles.demoSurface, styles.demoStack].join(" ")}>
        <span className={styles.demoLabel}>30s window · Falcon GT-HO peak</span>
        <ClipCreatorCard moment={CLIP_MOMENT} />

        <span className={styles.demoLabel}>60s window · VF Commodore first crack</span>
        <ClipCreatorCard moment={MID_CLIP} initialWindow={60} />

        <span className={styles.demoLabel}>90s window · DPF rig walkthrough</span>
        <ClipCreatorCard moment={LONG_CLIP} initialWindow={90} />
      </section>
    </main>
  )
}
