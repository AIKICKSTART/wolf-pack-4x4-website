import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AccessibilityGateCard,
  MOCK_A11Y_CHECKS,
} from "../../components/brand-control"

import styles from "../brand-control.module.css"

export const metadata: Metadata = {
  title: "Accessibility gate | Brand control",
}

const ALL_PASS = MOCK_A11Y_CHECKS.map((check) => ({
  ...check,
  verdict: "pass" as const,
  passing: check.total,
}))

const REGRESSED = MOCK_A11Y_CHECKS.map((check) =>
  check.id === "contrast"
    ? { ...check, verdict: "fail" as const, passing: 9, note: "amber on canvas dropped to 3.8:1 after token edit." }
    : check.id === "motion"
      ? { ...check, verdict: "fail" as const, passing: 16 }
      : check
)

export default function AccessibilityGateCardRoute() {
  return (
    <main className={styles.subRoute}>
      <div className={styles.shellNarrow}>
        <PageHeader
          kicker="Primitive 13"
          title="Accessibility gate"
          description="WCAG 2.2 audit summary surfaced beside the theme deploy panel. A fail blocks production promotion."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Brand control", href: "/ui-primitives/brand-control" },
            { label: "Accessibility gate" },
          ]}
        />

        <div className={styles.note}>
          <span>Three states</span>
          <p>
            Default mixed state with a motion warning, a full-pass green state, and a regressed state where the gate would block the deploy.
          </p>
        </div>

        <section className={styles.stateWrap} aria-label="Default mixed state">
          <span className={styles.stateLabel}>State 01 · Default</span>
          <AccessibilityGateCard checks={MOCK_A11Y_CHECKS} />
        </section>

        <section className={styles.stateWrap} aria-label="All pass">
          <span className={styles.stateLabel}>State 02 · All pass</span>
          <AccessibilityGateCard checks={ALL_PASS} />
        </section>

        <section className={styles.stateWrap} aria-label="Regressed">
          <span className={styles.stateLabel}>State 03 · Regressed</span>
          <AccessibilityGateCard checks={REGRESSED} />
        </section>
      </div>
    </main>
  )
}
