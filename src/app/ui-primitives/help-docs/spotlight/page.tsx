import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SpotlightCutout } from "../../components/help-docs"
import styles from "../help-docs.module.css"

export const metadata: Metadata = {
  title: "Spotlight cutout | UI Primitives — Help & Docs",
}

export default function SpotlightPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="22 / Help & Docs · 01"
        title="Spotlight cutout"
        description="Full-screen SVG mask that dims everything except a rectangular cutout aligned to a target element. Drives the dark layer of a guided tour."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Help & Docs", href: "/ui-primitives/help-docs" },
          { label: "Spotlight cutout" },
        ]}
      />
      <section className={styles.canvas} aria-label="Spotlight cutout demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            First frame of every onboarding tour. The cutout draws focus to a single button or
            card while the rest of the UI sits behind a calm dim layer.
          </p>
        </div>
        <div className={styles.stage} style={{ minHeight: 360 }}>
          <span className={styles.stageHelp}>Static demo · cutout fixed at 120 / 80 / 320 × 140</span>
          <SpotlightCutout
            target={{ top: 120, left: 80, width: 320, height: 140 }}
            cornerRadius={12}
          />
        </div>
      </section>
    </main>
  )
}
