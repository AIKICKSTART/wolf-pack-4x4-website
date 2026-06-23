import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { StartRecordButton } from "../../components/screen-recorder"

import styles from "../screen-recorder.module.css"

export const metadata: Metadata = {
  title: "Start record button | Screen recorder",
  description:
    "Primitive 01 — large circular Start Record button with rest / arming / recording states and a 3-2-1 countdown overlay.",
}

export default function StartRecordButtonScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Start record button"
        title="Start record button"
        description="The hero call-to-action that starts a capture session. Four display states — idle (the calm red dot), arming (amber spinner ring while sources warm up), countdown (3-2-1 overlay with role=alert), and recording (rounded square inside a pulsing ring)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Screen recorder", href: "/ui-primitives/screen-recorder" },
          { label: "Start record button" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Display states</span>
        <div className={styles.demoInline}>
          <StartRecordButton state="idle" />
          <StartRecordButton state="arming" />
          <StartRecordButton state="countdown" countdownDigit={3} />
          <StartRecordButton state="countdown" countdownDigit={2} />
          <StartRecordButton state="countdown" countdownDigit={1} />
          <StartRecordButton state="recording" />
        </div>
      </section>
    </main>
  )
}
