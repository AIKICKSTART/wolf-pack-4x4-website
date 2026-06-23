import type { Metadata } from "next"

import { PageHeader } from "@/app/ui-primitives/components/page-header"

import styles from "../../chrome.module.css"

import { MultiStepDemo } from "./multi-step-demo"

export const metadata: Metadata = {
  title: "Slide-up · Multi-step | UI Primitives — Chrome",
}

export default function SlideUpMultiStepRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Slide 18 / Chrome"
        title="Multi-step"
        description="Three-step wizard with stepper chips, body content, and a progress-bar foot row. Use for bookings, quotes, and onboarding."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Multi-step" },
        ]}
      />

      <div className={styles.demoFrame}>
        <span className={styles.demoFrameLabel}>
          Live wizard preview
          <span>Wizard · 3 steps</span>
        </span>
        <div className={styles.demoFrameBody} style={{ minHeight: 620 }}>
          <MultiStepDemo />
        </div>
      </div>
    </main>
  )
}
