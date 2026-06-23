import type { Metadata } from "next"

import { ToastStack } from "../../components/notifications-system"
import { PageHeader } from "../../components/page-header"

import { MOCK_TOASTS } from "../_mock-data"
import styles from "../notifications-system.module.css"

export const metadata: Metadata = {
  title: "Toast stack | Notifications system",
  description:
    "Primitive 01 — corner toast stack with placement options and collapse / expand for overflow.",
}

const STACK_SHORT = MOCK_TOASTS.slice(0, 2)
const STACK_OVERFLOW = MOCK_TOASTS
const STACK_BOTTOM = MOCK_TOASTS.slice(1, 4)

export default function ToastStackScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Toast stack"
        title="Toast stack"
        description="A pinned stack of toasts that anchors to a screen corner or top-center. When the stack grows past the threshold, the overflow collapses into a single expand control."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications system", href: "/ui-primitives/notifications-system" },
          { label: "Toast stack" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A — Quiet (2 toasts, top-right)</span>
        <div className={styles.demoCorner}>
          <span className={styles.demoCornerLabel}>Anchor · top-right</span>
          <ToastStack toasts={STACK_SHORT} placement="top-right" />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State B — Overflow (5 toasts collapsed to 2)
        </span>
        <div className={styles.demoCorner}>
          <span className={styles.demoCornerLabel}>Anchor · top-right · overflow</span>
          <ToastStack toasts={STACK_OVERFLOW} placement="top-right" collapsedCount={2} />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C — Mobile bottom-center stack</span>
        <div className={styles.demoCorner} style={{ alignContent: "end", justifyContent: "center" }}>
          <span className={styles.demoCornerLabel}>Anchor · bottom-center</span>
          <ToastStack toasts={STACK_BOTTOM} placement="bottom-center" collapsedCount={5} />
        </div>
      </section>
    </main>
  )
}
