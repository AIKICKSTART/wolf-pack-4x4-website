import type { Metadata } from "next"

import { TrackRowHeader } from "../../components/video-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../video-editor.module.css"

export const metadata: Metadata = {
  title: "Track row header | Video editor",
  description:
    "Primitive 05 — compact track header with kind icon (Video / Audio / Subtitles / Effect), name, mute / solo / lock / arm-record buttons.",
}

export default function TrackRowHeaderScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Track row header"
        title="Track row header"
        description="The compact left-rail header for a track row: icon (Video / Audio / Subtitles / Effect), short name, descriptive name, then mute / solo / lock and optional arm-record button on audio."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Video editor", href: "/ui-primitives/video-editor" },
          { label: "Track row header" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Idle states · all four kinds</span>
        <div style={{ display: "grid", gap: "10px", maxWidth: 360 }}>
          <TrackRowHeader kind="video" shortName="V1" name="Cam A · BMPCC 6K" />
          <TrackRowHeader kind="video" shortName="V2" name="Cam B · GoPro overhead" />
          <TrackRowHeader kind="audio" shortName="A1" name="Boom · Sennheiser 416" />
          <TrackRowHeader kind="audio" shortName="A2" name="Lav · Brodie wireless" />
          <TrackRowHeader kind="subtitles" shortName="SUB" name="EN-AU · auto + review" />
          <TrackRowHeader kind="effect" shortName="FX" name="Cinematic LUT — Workshop Steel" />
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Toggled states · solo / mute / lock / arm</span>
        <div style={{ display: "grid", gap: "10px", maxWidth: 360 }}>
          <TrackRowHeader kind="audio" shortName="A1" name="Boom mic" solo />
          <TrackRowHeader kind="audio" shortName="A2" name="Wireless lav" muted />
          <TrackRowHeader kind="audio" shortName="A3" name="Foley · workshop ambient" armed />
          <TrackRowHeader kind="video" shortName="V1" name="Cam A" locked />
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Compact density</span>
        <div style={{ display: "grid", gap: "6px", maxWidth: 320 }}>
          <TrackRowHeader compact kind="video" shortName="V1" name="Cam A" />
          <TrackRowHeader compact kind="audio" shortName="A1" name="Boom mic" />
          <TrackRowHeader compact kind="subtitles" shortName="SUB" name="EN-AU" />
        </div>
      </section>
    </main>
  )
}
