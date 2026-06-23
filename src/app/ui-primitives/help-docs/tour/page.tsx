import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../help-docs.module.css"

import { TourDemo } from "./tour-demo"

export const metadata: Metadata = {
  title: "Guided tour | UI Primitives — Help & Docs",
}

export default function TourPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="22 / Help & Docs · 03"
        title="Guided tour"
        description="Multi-step controller that walks through an ordered list of targets. Each step dims everything else with the spotlight cutout and anchors a coach mark near the target."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Help & Docs", href: "/ui-primitives/help-docs" },
          { label: "Guided tour" },
        ]}
      />
      <section className={styles.canvas} aria-label="Guided tour demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            First-run experience after a workshop staffer logs in. Skip ends the tour and stores
            a flag so it never replays. Reduced-motion shortens transitions.
          </p>
        </div>
        <TourDemo />
      </section>
    </main>
  )
}
