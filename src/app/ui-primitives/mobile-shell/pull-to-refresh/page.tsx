import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../mobile-shell.module.css"

import { PullToRefreshDemo } from "./pull-to-refresh-demo"

export const metadata: Metadata = {
  title: "Pull to refresh | UI Primitives — Mobile Shell",
}

export default function PullToRefreshPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Mobile / Shell · 07"
        title="Pull to refresh"
        description="A pull indicator that rotates an arrow into an armed state and then locks into a refresh spinner once loading starts. Reduced-motion shows a static refresh icon."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Mobile Shell", href: "/ui-primitives/mobile-shell" },
          { label: "Pull to refresh" },
        ]}
      />
      <section className={styles.canvas} aria-label="Pull to refresh demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Re-poll the Jobs board from the tablet without forcing the mechanic to find a refresh
            button. Indicator stays out of the bay-lit screen until pull is detected.
          </p>
        </div>
        <PullToRefreshDemo />
      </section>
    </main>
  )
}
