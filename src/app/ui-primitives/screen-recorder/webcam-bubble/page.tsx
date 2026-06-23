import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { WebcamBubble } from "../../components/screen-recorder"

import styles from "../screen-recorder.module.css"

export const metadata: Metadata = {
  title: "Webcam bubble | Screen recorder",
  description:
    "Primitive 05 — round webcam picture-in-picture bubble with a 2x2 position picker, size slider and mirror toggle.",
}

export default function WebcamBubbleScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Webcam bubble"
        title="Webcam bubble"
        description="The presenter PIP — round bubble with a corner-position picker, size slider and mirror toggle. Mirrored is on by default for walkthroughs so the presenter sees a natural left-right preview."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Screen recorder", href: "/ui-primitives/screen-recorder" },
          { label: "Webcam bubble" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Brodie — Bay 2 walkthrough · bottom-right</span>
        <WebcamBubble position="bottom-right" sizePx={108} mirrored />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Small bubble · top-left · un-mirrored</span>
        <WebcamBubble position="top-left" sizePx={72} mirrored={false} speakerName="Kelsey — Quotes" />
      </section>
    </main>
  )
}
