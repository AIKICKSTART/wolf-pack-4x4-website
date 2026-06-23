import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../overlays.module.css"

import { WizardModalDemo } from "./wizard-modal-demo"

export const metadata: Metadata = {
  title: "Wizard modal | UI Primitives — Overlays",
}

export default function WizardModalPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="11 / Overlays · 10"
        title="Wizard modal"
        description="Multi-step modal with an inline stepper, back / next / skip / finish actions, and per-step content. Generic step ids let the parent track which step is current."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Overlays", href: "/ui-primitives/overlays" },
          { label: "Wizard modal" },
        ]}
      />
      <section className={styles.canvas} aria-label="Wizard modal demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            New-customer onboarding, supplier onboarding, or any multi-stage form that benefits
            from a visible progress indicator and a back-step affordance.
          </p>
        </div>
        <WizardModalDemo />
      </section>
    </main>
  )
}
