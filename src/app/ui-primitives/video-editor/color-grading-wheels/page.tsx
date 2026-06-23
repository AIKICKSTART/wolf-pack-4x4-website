import type { Metadata } from "next"

import { ColorGradingWheels } from "../../components/video-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../video-editor.module.css"

export const metadata: Metadata = {
  title: "Color grading wheels | Video editor",
  description:
    "Primitive 11 — three color grading wheels (Shadows / Midtones / Highlights) with hue, saturation and lift indicators.",
}

export default function ColorGradingWheelsScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Color grading wheels"
        title="Color grading wheels"
        description="Three color grading wheels — Shadows / Midtones / Highlights — each showing a hue/saturation indicator inside a conic-gradient wheel plus a lift track underneath."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Video editor", href: "/ui-primitives/video-editor" },
          { label: "Color grading wheels" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Workshop Steel grade — teal shadows, neutral mids, warm highlights</span>
        <ColorGradingWheels
          shadows={{ hueDegrees: 198, saturation: 0.62, lift: 0.42 }}
          midtones={{ hueDegrees: 20, saturation: 0.12, lift: 0.5 }}
          highlights={{ hueDegrees: 36, saturation: 0.48, lift: 0.68 }}
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Mufflermen red push — dyno run punch</span>
        <ColorGradingWheels
          title="Dyno run grade"
          shadows={{ hueDegrees: 220, saturation: 0.34, lift: 0.32 }}
          midtones={{ hueDegrees: 8, saturation: 0.58, lift: 0.6 }}
          highlights={{ hueDegrees: 0, saturation: 0.78, lift: 0.86 }}
        />
      </section>
    </main>
  )
}
