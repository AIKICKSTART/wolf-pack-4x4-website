import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RecordModePicker } from "../../components/screen-recorder"

import styles from "../screen-recorder.module.css"

export const metadata: Metadata = {
  title: "Record mode picker | Screen recorder",
  description:
    "Primitive 02 — mode picker grid for Screen + Camera / Screen only / Camera only / Audio only with a mini preview per tile.",
}

export default function RecordModePickerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Record mode picker"
        title="Record mode picker"
        description="Choose what gets captured. Four tiles with a mini preview each — workshop screen capture, camera-only piece-to-camera, or audio-only ADR refresher. Uses role=radiogroup with aria-checked tiles."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Screen recorder", href: "/ui-primitives/screen-recorder" },
          { label: "Record mode picker" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Screen + Camera selected</span>
        <RecordModePicker value="screen+camera" />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Audio only selected — ADR refresher</span>
        <RecordModePicker value="audio-only" />
      </section>
    </main>
  )
}
