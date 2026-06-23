import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RecordingWatermarkBadge } from "../../components/screen-recorder"

import styles from "../screen-recorder.module.css"

export const metadata: Metadata = {
  title: "Recording watermark badge | Screen recorder",
  description:
    "Primitive 11 — recorded clip watermark with a corner-position picker and an opacity slider preview.",
}

export default function RecordingWatermarkBadgeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Recording watermark badge"
        title="Recording watermark badge"
        description="A discreet customer-logo watermark baked into the recorded output. Position picker for each corner plus an opacity slider that lets the operator dial it back when the workshop scene already has plenty going on."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Screen recorder", href: "/ui-primitives/screen-recorder" },
          { label: "Recording watermark badge" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Bottom-right · 74% — Workshop tour</span>
        <RecordingWatermarkBadge
          brand="Oak Flats Mufflermen"
          tagline="Workshop tour"
          position="bottom-right"
          opacity={0.74}
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Top-left · 42% — ADR refresher</span>
        <RecordingWatermarkBadge
          brand="Oak Flats Mufflermen"
          tagline="ADR refresher"
          position="top-left"
          opacity={0.42}
        />
      </section>
    </main>
  )
}
