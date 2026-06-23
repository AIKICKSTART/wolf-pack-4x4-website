import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { AchievementToastDemo } from "./achievement-toast-demo"
import styles from "../onboarding.module.css"

export const metadata: Metadata = {
  title: "Achievement-unlock toast | Onboarding",
  description:
    "Primitive 08 — gold-bordered toast announcing an achievement unlock with trophy SVG, points chip and confetti burst on appear.",
}

export default function AchievementUnlockScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Achievement"
        title="Achievement-unlock toast"
        description="A specialised celebration toast: gold border with shimmer, hand-drawn trophy SVG, achievement title + body, points chip, and a confetti burst triggered on appear (suppressed under reduced motion). Announces itself politely via aria-live."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Onboarding", href: "/ui-primitives/onboarding" },
          { label: "Achievement-unlock" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — fires confetti on open</span>
        <div className={styles.toastStage}>
          <AchievementToastDemo />
        </div>
      </section>
    </main>
  )
}
