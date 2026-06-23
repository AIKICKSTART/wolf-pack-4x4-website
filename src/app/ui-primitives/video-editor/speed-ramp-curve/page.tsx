import type { Metadata } from "next"

import { SpeedRampCurve } from "../../components/video-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../video-editor.module.css"

export const metadata: Metadata = {
  title: "Speed ramp curve | Video editor",
  description:
    "Primitive 10 — SVG curve editor for clip playback speed (0.25× → 4×) with anchor points and a log midline at 1.0×.",
}

export default function SpeedRampCurveScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Speed ramp curve"
        title="Speed ramp curve"
        description="SVG-based curve editor for clip playback speed across the 0.25× → 4× range. Anchor points snap to the curve with a smoothed cubic path; midline marks 1.0× on a log scale."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Video editor", href: "/ui-primitives/video-editor" },
          { label: "Speed ramp curve" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Dyno run — slow-mo into full-speed ramp</span>
        <SpeedRampCurve
          width={520}
          height={140}
          anchors={[
            { t: 0, speed: 1 },
            { t: 0.18, speed: 0.5 },
            { t: 0.42, speed: 0.5 },
            { t: 0.62, speed: 1 },
            { t: 0.84, speed: 2 },
            { t: 1, speed: 1 },
          ]}
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Owner reaction — punch in fast then ease out</span>
        <SpeedRampCurve
          width={520}
          height={140}
          title="Reaction beat"
          anchors={[
            { t: 0, speed: 4 },
            { t: 0.25, speed: 2 },
            { t: 0.5, speed: 1 },
            { t: 0.75, speed: 0.5 },
            { t: 1, speed: 0.25 },
          ]}
        />
      </section>
    </main>
  )
}
